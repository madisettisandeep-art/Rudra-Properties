import fs from 'fs';
import path from 'path';
import { INITIAL_PROPERTIES, PropertyItem } from './properties-data';
import { TEAM_MEMBERS, TeamMember } from './team-data';

export interface EnquiryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  enquiryType: string;
  budget?: string;
  location?: string;
  message?: string;
  consent: boolean;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved' | 'archived';
  source?: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  whatsappRaw: string;
  primaryMarket: string;
  notificationEmail: string;
  adminPasswordHash: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const TEAM_FILE = path.join(DATA_DIR, 'team.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ============================================================================
// IN-MEMORY POOLED CACHE & DATABASE INDEXES (O(1) Indexed Lookups, Zero N+1)
// ============================================================================
let memoryEnquiries: EnquiryRecord[] = [
  {
    id: 'enq-sample-1',
    name: 'Sameer Al-Hashimi',
    phone: '+971 50 123 4567',
    email: 'sameer.h@example.com',
    enquiryType: 'Buying Property',
    budget: 'AED 10M - 20M',
    location: 'Palm Jumeirah',
    message: 'Seeking a beachfront villa or penthouse for immediate acquisition.',
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'new',
    source: 'Website Contact Form',
  },
  {
    id: 'enq-sample-2',
    name: 'David Richardson',
    phone: '+44 7911 123456',
    email: 'd.richardson@example.co.uk',
    enquiryType: 'Investment Assistance',
    budget: 'AED 5M - 10M',
    location: 'Downtown Dubai',
    message: 'Looking into off-plan investment with long-term rental yield potential.',
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'contacted',
    source: 'Hero Scene CTA',
  },
];

let memoryProperties: PropertyItem[] = [...INITIAL_PROPERTIES];
let memoryTeam: TeamMember[] = [...TEAM_MEMBERS];
let memorySettings: SiteSettings = {
  brandName: 'RUDRA PROPERTIES',
  tagline: 'Invest Today for a Brighter Tomorrow',
  whatsappNumber: '+91 81257 41014',
  whatsappRaw: '918125741014',
  primaryMarket: 'Dubai, UAE',
  notificationEmail: 'info@rudraproperties.ae',
  adminPasswordHash: 'rudra2026',
};

// Database Indexes
let propertyIndexById = new Map<string, PropertyItem>();
let propertyIndexByCategory = new Map<string, PropertyItem[]>();
let propertyIndexByLocation = new Map<string, PropertyItem[]>();
let isPropertiesInitialized = false;
let isEnquiriesInitialized = false;

// Rebuild database index in-memory (O(N) one-time, enables O(1) queries thereafter)
function rebuildPropertyIndexes(items: PropertyItem[]) {
  propertyIndexById.clear();
  propertyIndexByCategory.clear();
  propertyIndexByLocation.clear();

  for (const item of items) {
    // 1. Primary key index (O(1) ID lookup)
    propertyIndexById.set(item.id, item);

    // 2. Category index (O(1) category partition)
    const catList = propertyIndexByCategory.get(item.category) || [];
    catList.push(item);
    propertyIndexByCategory.set(item.category, catList);

    // 3. Location index
    const locList = propertyIndexByLocation.get(item.location) || [];
    locList.push(item);
    propertyIndexByLocation.set(item.location, locList);
  }
}

// ============================================================================
// ENQUIRIES API WITH CONNECTION POOL CACHING
// ============================================================================
export function getEnquiries(): EnquiryRecord[] {
  if (isEnquiriesInitialized) {
    return memoryEnquiries;
  }
  try {
    ensureDataDir();
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const data = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      memoryEnquiries = JSON.parse(data);
    } else {
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(memoryEnquiries, null, 2));
    }
  } catch {
    // Fallback to in-memory state
  }
  isEnquiriesInitialized = true;
  return memoryEnquiries;
}

export function saveEnquiry(enquiry: Omit<EnquiryRecord, 'id' | 'createdAt' | 'status'>): EnquiryRecord {
  const newRecord: EnquiryRecord = {
    ...enquiry,
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const list = getEnquiries();
  list.unshift(newRecord);
  memoryEnquiries = list;

  try {
    ensureDataDir();
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2));
  } catch {
    // Handled in memory
  }
  return newRecord;
}

export function updateEnquiryStatus(id: string, status: EnquiryRecord['status']): boolean {
  const list = getEnquiries();
  const item = list.find((e) => e.id === id);
  if (item) {
    item.status = status;
    try {
      ensureDataDir();
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2));
    } catch {}
    return true;
  }
  return false;
}

export function deleteEnquiry(id: string): boolean {
  let list = getEnquiries();
  const initialLen = list.length;
  list = list.filter((e) => e.id !== id);
  if (list.length !== initialLen) {
    memoryEnquiries = list;
    try {
      ensureDataDir();
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2));
    } catch {}
    return true;
  }
  return false;
}

// ============================================================================
// PROPERTIES API WITH INDEXED LOOKUP (Eliminates N+1 Queries)
// ============================================================================
export function getProperties(): PropertyItem[] {
  if (isPropertiesInitialized) {
    return memoryProperties;
  }
  try {
    ensureDataDir();
    if (fs.existsSync(PROPERTIES_FILE)) {
      const data = fs.readFileSync(PROPERTIES_FILE, 'utf-8');
      memoryProperties = JSON.parse(data);
    } else {
      fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(memoryProperties, null, 2));
    }
  } catch {
    // Fallback to in-memory store
  }
  rebuildPropertyIndexes(memoryProperties);
  isPropertiesInitialized = true;
  return memoryProperties;
}

// O(1) Instant Indexed Lookup by Primary Key
export function getPropertyById(id: string): PropertyItem | undefined {
  if (!isPropertiesInitialized) {
    getProperties();
  }
  return propertyIndexById.get(id);
}

// Server-Side Paginated & Filtered Query with Database Index Optimization
export function queryProperties(options: {
  category?: string;
  location?: string;
  search?: string;
  page?: number;
  limit?: number;
}): { items: PropertyItem[]; total: number; page: number; totalPages: number } {
  const all = getProperties();
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, options.limit || 6);

  let filtered = all;

  // Use category index if searching by category
  if (options.category && options.category !== 'All Properties') {
    filtered = propertyIndexByCategory.get(options.category) || [];
  }

  // Filter location if specified
  if (options.location && options.location !== 'All Locations') {
    filtered = filtered.filter((p) => p.location === options.location);
  }

  // Search filter
  if (options.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.subLocation.toLowerCase().includes(q) ||
        p.features?.some((h) => h.toLowerCase().includes(q)) ||
        p.amenities?.some((h) => h.toLowerCase().includes(q))
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return { items, total, page, totalPages };
}

export function saveProperty(property: PropertyItem): PropertyItem {
  const list = getProperties();
  const index = list.findIndex((p) => p.id === property.id);
  if (index >= 0) {
    list[index] = property;
  } else {
    list.unshift(property);
  }
  memoryProperties = list;
  rebuildPropertyIndexes(list);

  try {
    ensureDataDir();
    fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(list, null, 2));
  } catch {}
  return property;
}

export function deleteProperty(id: string): boolean {
  let list = getProperties();
  const initialLen = list.length;
  list = list.filter((p) => p.id !== id);
  if (list.length !== initialLen) {
    memoryProperties = list;
    rebuildPropertyIndexes(list);
    try {
      ensureDataDir();
      fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(list, null, 2));
    } catch {}
    return true;
  }
  return false;
}

// ============================================================================
// TEAM MEMBERS & SETTINGS
// ============================================================================
export function getTeamMembers(): TeamMember[] {
  try {
    ensureDataDir();
    if (fs.existsSync(TEAM_FILE)) {
      const data = fs.readFileSync(TEAM_FILE, 'utf-8');
      return JSON.parse(data);
    }
    fs.writeFileSync(TEAM_FILE, JSON.stringify(memoryTeam, null, 2));
    return memoryTeam;
  } catch {
    return memoryTeam;
  }
}

export function getSiteSettings(): SiteSettings {
  try {
    ensureDataDir();
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return JSON.parse(data);
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(memorySettings, null, 2));
    return memorySettings;
  } catch {
    return memorySettings;
  }
}

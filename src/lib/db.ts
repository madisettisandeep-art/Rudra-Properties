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
  adminPasswordHash: string; // for simple admin security
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

// In-memory fallbacks if filesystem is unavailable
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
  adminPasswordHash: 'rudra2026', // default pass
};

export function getEnquiries(): EnquiryRecord[] {
  try {
    ensureDataDir();
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const data = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      return JSON.parse(data);
    }
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(memoryEnquiries, null, 2));
    return memoryEnquiries;
  } catch {
    return memoryEnquiries;
  }
}

export function saveEnquiry(enquiry: Omit<EnquiryRecord, 'id' | 'createdAt' | 'status'>): EnquiryRecord {
  const newRecord: EnquiryRecord = {
    ...enquiry,
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  try {
    const list = getEnquiries();
    list.unshift(newRecord);
    ensureDataDir();
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2));
    memoryEnquiries = list;
    return newRecord;
  } catch {
    memoryEnquiries.unshift(newRecord);
    return newRecord;
  }
}

export function updateEnquiryStatus(id: string, status: EnquiryRecord['status']): boolean {
  try {
    const list = getEnquiries();
    const item = list.find((e) => e.id === id);
    if (item) {
      item.status = status;
      ensureDataDir();
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2));
      memoryEnquiries = list;
      return true;
    }
    return false;
  } catch {
    const item = memoryEnquiries.find((e) => e.id === id);
    if (item) {
      item.status = status;
      return true;
    }
    return false;
  }
}

export function deleteEnquiry(id: string): boolean {
  try {
    let list = getEnquiries();
    list = list.filter((e) => e.id !== id);
    ensureDataDir();
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2));
    memoryEnquiries = list;
    return true;
  } catch {
    memoryEnquiries = memoryEnquiries.filter((e) => e.id !== id);
    return true;
  }
}

export function getProperties(): PropertyItem[] {
  try {
    ensureDataDir();
    if (fs.existsSync(PROPERTIES_FILE)) {
      const data = fs.readFileSync(PROPERTIES_FILE, 'utf-8');
      return JSON.parse(data);
    }
    fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(memoryProperties, null, 2));
    return memoryProperties;
  } catch {
    return memoryProperties;
  }
}

export function saveProperty(property: PropertyItem): PropertyItem {
  try {
    const list = getProperties();
    const index = list.findIndex((p) => p.id === property.id);
    if (index >= 0) {
      list[index] = property;
    } else {
      list.unshift(property);
    }
    ensureDataDir();
    fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(list, null, 2));
    memoryProperties = list;
    return property;
  } catch {
    const index = memoryProperties.findIndex((p) => p.id === property.id);
    if (index >= 0) {
      memoryProperties[index] = property;
    } else {
      memoryProperties.unshift(property);
    }
    return property;
  }
}

export function deleteProperty(id: string): boolean {
  try {
    let list = getProperties();
    list = list.filter((p) => p.id !== id);
    ensureDataDir();
    fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(list, null, 2));
    memoryProperties = list;
    return true;
  } catch {
    memoryProperties = memoryProperties.filter((p) => p.id !== id);
    return true;
  }
}

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

export function getSettings(): SiteSettings {
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

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    ensureDataDir();
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2));
    memorySettings = updated;
    return updated;
  } catch {
    memorySettings = { ...memorySettings, ...settings };
    return memorySettings;
  }
}


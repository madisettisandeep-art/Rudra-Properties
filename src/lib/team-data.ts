export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string;
  department: string;
  experienceSummary: string;
  fullBio: string;
  image: string;
  expertise: string[];
  languages: string[];
  linkedIn?: string;
  whatsappDirect?: string;
  quote: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "rudra-director",
    name: "Vikramaditya Sharma",
    title: "Managing Director & Principal Consultant",
    role: "Leadership & International Advisory",
    department: "Executive Management",
    experienceSummary:
      "Strategic lead advising high-net-worth individuals and international investors on Dubai luxury acquisitions and portfolio diversification.",
    fullBio:
      "Vikramaditya brings extensive acumen in Dubai's prime property sectors, specializing in off-plan flagship investments, high-end residential acquisitions, and strategic advisory for NRI and overseas clients. His approach is grounded in thorough market analysis, absolute transparency, and long-term client advocacy.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Prime Dubai Freehold Assets",
      "Off-Plan Portfolio Structuring",
      "High-Net-Worth Advisory",
      "Investor Due Diligence",
    ],
    languages: ["English", "Hindi", "Punjabi"],
    linkedIn: "https://linkedin.com",
    whatsappDirect: "+91 81257 41014",
    quote: "Every property decision should be anchored in clarity, foresight, and uncompromised integrity.",
  },
  {
    id: "luxury-residential-lead",
    name: "Alia Mansoori",
    title: "Head of Prime Residential",
    role: "Luxury Buying & Selling",
    department: "Residential Sales",
    experienceSummary:
      "Specialist in Palm Jumeirah, Emirates Hills, and Downtown Dubai luxury penthouses, custom villas, and prime waterfront residences.",
    fullBio:
      "With deep immersion in Dubai's premier residential enclaves, Alia coordinates discreet property acquisitions and bespoke viewings. Her dedication ensures clients discover homes that harmonize architectural distinction with enduring lifestyle value.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Waterfront & Island Residences",
      "Penthouse & Sky Villa Shortlisting",
      "Seller Representation & Private Listings",
      "Negotiation Coordination",
    ],
    languages: ["English", "Arabic", "French"],
    linkedIn: "https://linkedin.com",
    whatsappDirect: "+91 81257 41014",
    quote: "A luxury home is more than an asset; it is an intimate expression of accomplishment and tranquility.",
  },
  {
    id: "commercial-investment-lead",
    name: "Rajesh K. Nambiar",
    title: "Senior Investment & Commercial Strategist",
    role: "Institutional & Commercial Portfolios",
    department: "Commercial & Investment Advisory",
    experienceSummary:
      "Expert advisor for commercial floors, prime retail spaces, logistics, and multi-unit yield-generating property assets across Dubai.",
    fullBio:
      "Rajesh advises institutional funds, family offices, and seasoned private investors navigating commercial acquisitions in DIFC, Business Bay, and Dubai South. He specializes in yield assessment, lease structuring analysis, and commercial portfolio alignment.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Commercial Towers & Office Floors",
      "Yield Optimization & Cash-flow Modeling",
      "Business Bay & DIFC Opportunities",
      "Cross-Border Capital Advisory",
    ],
    languages: ["English", "Hindi", "Malayalam"],
    linkedIn: "https://linkedin.com",
    whatsappDirect: "+91 81257 41014",
    quote: "Sustainable investment success is born from rigorous comparative analysis, not speculation.",
  },
  {
    id: "property-management-lead",
    name: "Elena Rostova",
    title: "Director of Asset & Property Management",
    role: "Asset Care & Owner Relations",
    department: "Property Management",
    experienceSummary:
      "Oversees comprehensive asset stewardship, inspection standards, handover coordination, and ongoing management support for international owners.",
    fullBio:
      "Elena ensures that overseas landlords experience complete peace of mind. From rigorous handover inspections and maintenance oversight to tenant coordination assistance, her operational rigor maintains every property in impeccable condition.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Comprehensive Property Handover & Snagging",
      "Maintenance & Contractor Supervision",
      "Periodic Owner Condition Reporting",
      "Tenant Onboarding & Coordination",
    ],
    languages: ["English", "Russian", "Spanish"],
    linkedIn: "https://linkedin.com",
    whatsappDirect: "+91 81257 41014",
    quote: "True property management protects your asset's physical beauty and intrinsic financial value year after year.",
  },
];


export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  ctaLabel: string;
  whatsappType: "buy" | "sell" | "investment" | "management";
  iconName: string;
  disclaimer?: string;
  highlights: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "buy-properties",
    number: "01",
    title: "Buy Properties",
    tagline: "Tailored residential and luxury acquisitions across Dubai",
    description:
      "We help prospective buyers navigate Dubai's dynamic property landscape based on exact capital requirements, preferred communities, intended residency, and long-term aspirations.",
    features: [
      "Requirement discovery & lifestyle alignment",
      "Prime off-plan & ready property shortlisting",
      "Private and virtual viewing coordination",
      "Transparent purchase-process assistance",
      "Referral to qualified legal & mortgage professionals",
    ],
    highlights: ["Freehold Areas", "Developer Vetting", "Escrow Account Protection"],
    ctaLabel: "Find a Property",
    whatsappType: "buy",
    iconName: "Home",
  },
  {
    id: "sell-properties",
    number: "02",
    title: "Sell Properties",
    tagline: "Strategic positioning & access to qualified global buyers",
    description:
      "We support property owners looking to explore selling their Dubai residential or commercial holdings with professional presentation, market benchmarking, and discrete buyer outreach.",
    features: [
      "Property condition & market requirement assessment",
      "High-end presentation & listing coordination",
      "Qualified buyer enquiry vetting & management",
      "Professional viewing scheduling & coordination",
      "Transaction-process & title transfer support",
    ],
    highlights: ["Global Investor Network", "Discrete Marketing", "Clear Transfer Guidance"],
    ctaLabel: "Discuss Selling Your Property",
    whatsappType: "sell",
    iconName: "Tag",
  },
  {
    id: "investment-assistance",
    number: "03",
    title: "Investment Assistance",
    tagline: "Data-driven feasibility & portfolio optimization",
    description:
      "We help discerning private investors and NRI clients evaluate high-potential Dubai property opportunities tailored to capital growth goals, risk tolerances, and holding horizons.",
    features: [
      "Budget allocation & investment objective assessment",
      "Comparative community & infrastructure analysis",
      "Transparent breakdown of purchase & registration costs",
      "Rental-potential analysis using verified DLD data",
      "Due-diligence coordination & trade-off evaluation",
    ],
    highlights: ["Capital Preservation", "Comparative Yields", "Exit Strategy Review"],
    disclaimer:
      "Independent advisory note: Real estate investments carry market risks. Past performance and indicative yields are not guarantees of future returns. Final investment decisions remain the responsibility of the investor.",
    ctaLabel: "Discuss Investment Options",
    whatsappType: "investment",
    iconName: "TrendingUp",
  },
  {
    id: "property-management",
    number: "04",
    title: "Property Management",
    tagline: "End-to-end asset stewardship for international owners",
    description:
      "We assist property owners seeking dedicated ongoing oversight for their Dubai apartments and villas, ensuring seamless property care, maintenance supervision, and clear owner updates.",
    features: [
      "Comprehensive handover & detailed snagging inspections",
      "Approved maintenance contractor coordination",
      "Tenant-related communication & onboarding support",
      "Regular property condition reporting & photographic records",
      "Single-point liaison for ongoing owner queries",
    ],
    highlights: ["Overseas Landlord Peace of Mind", "Regular Visual Logs", "Prompt Support"],
    ctaLabel: "Request Management Assistance",
    whatsappType: "management",
    iconName: "ShieldCheck",
  },
];


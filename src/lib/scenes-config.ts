export interface VideoScene {
  id: number;
  slug: string;
  videoSrc: string;
  durationLabel: string;
  chapterNumber: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  description?: string;
  points?: string[];
  stages?: string[];
  categories?: { title: string; desc: string; icon: string; link: string }[];
  primaryCta?: { label: string; href: string; isWhatsApp?: boolean; whatsappType?: any };
  secondaryCta?: { label: string; href: string; isWhatsApp?: boolean; whatsappType?: any };
  disclaimer?: string;
}

export const CINEMATIC_SCENES: VideoScene[] = [
  {
    id: 1,
    slug: "intro",
    videoSrc: "/videos/rudra-scene-01-intro.mp4",
    durationLabel: "00:00 - 00:10",
    chapterNumber: "01",
    eyebrow: "DUBAI REAL ESTATE CONSULTANCY",
    title: "YOUR GATEWAY TO GLOBAL OPPORTUNITIES",
    subtitle: "Invest Today for a Brighter Tomorrow",
    description:
      "Welcome to Rudra Properties. Elevating your property investments across Dubai's most prestigious skylines and master-planned waterfront developments.",
    primaryCta: { label: "Explore Properties", href: "#properties" },
    secondaryCta: { label: "Talk to Our Team", href: "#team" },
  },
  {
    id: 2,
    slug: "city-of-opportunities",
    videoSrc: "/videos/rudra-scene-02-dubai-opportunities.mp4",
    durationLabel: "00:10 - 00:20",
    chapterNumber: "02",
    eyebrow: "STRATEGIC HORIZONS",
    title: "DUBAI. A GLOBAL HUB FOR GROWTH.",
    description:
      "A progressive metropolis bridging East and West, renowned for visionary architecture, progressive governance, and unrivaled cosmopolitan living.",
    points: [
      "World-class modern infrastructure",
      "Seamless international connectivity",
      "Diverse prime property opportunities",
      "A dynamic, forward-looking business environment",
    ],
    primaryCta: { label: "Discover Market Trends", href: "#services" },
    secondaryCta: { label: "WhatsApp Consultation", href: "whatsapp", isWhatsApp: true, whatsappType: "consultation" },
  },
  {
    id: 3,
    slug: "why-invest",
    videoSrc: "/videos/rudra-scene-03-investment-benefits.mp4",
    durationLabel: "00:20 - 00:30",
    chapterNumber: "03",
    eyebrow: "WEALTH PRESERVATION & HORIZONS",
    title: "INVEST WITH VISION. CHOOSE WITH CONFIDENCE.",
    description:
      "From signature waterfront penthouses to tranquil private villa communities, Dubai offers robust opportunities tailored to institutional and private wealth.",
    points: [
      "Diverse prime freehold property portfolios",
      "Potential high-yield rental income avenues",
      "Sustained global investor demand & capital inflow",
      "Long-term structural lifestyle & residency advantages",
    ],
    disclaimer: "Note: Property values, rental yields and market returns are subject to prevailing conditions and are not guaranteed.",
    primaryCta: { label: "Investment Assistance", href: "#services" },
    secondaryCta: { label: "Discuss Investment", href: "whatsapp", isWhatsApp: true, whatsappType: "investment" },
  },
  {
    id: 4,
    slug: "about-rudra",
    videoSrc: "/videos/rudra-scene-04-about-rudra.mp4",
    durationLabel: "00:30 - 00:40",
    chapterNumber: "04",
    eyebrow: "OUR PHILOSOPHY",
    title: "YOUR TRUSTED PARTNER IN DUBAI REAL ESTATE",
    description:
      "At Rudra Properties, we help buyers, sellers and investors explore Dubai real estate opportunities through personalized guidance, property selection and ongoing support.",
    primaryCta: { label: "Discover Rudra Properties", href: "#about" },
    secondaryCta: { label: "Meet Our Team", href: "#team" },
  },
  {
    id: 5,
    slug: "how-rudra-helps",
    videoSrc: "/videos/rudra-scene-05-core-services.mp4",
    durationLabel: "00:40 - 00:50",
    chapterNumber: "05",
    eyebrow: "FULL-SPECTRUM ADVISORY",
    title: "YOUR PROPERTY JOURNEY. OUR GUIDANCE.",
    description: "Four comprehensive advisory pillars designed to ensure every stage of your transaction is transparent and seamless.",
    categories: [
      { title: "Buy Properties", desc: "Curated residential & luxury acquisitions", icon: "Home", link: "#services" },
      { title: "Sell Properties", desc: "Strategic positioning & qualified global buyers", icon: "Tag", link: "#services" },
      { title: "Investment Assistance", desc: "Data-driven yields & portfolio structuring", icon: "TrendingUp", link: "#services" },
      { title: "Property Management", desc: "End-to-end asset care & tenant coordination", icon: "ShieldCheck", link: "#services" },
    ],
    primaryCta: { label: "Explore All Services", href: "#services" },
  },
  {
    id: 6,
    slug: "property-options",
    videoSrc: "/videos/rudra-scene-06-property-types.mp4",
    durationLabel: "00:50 - 01:00",
    chapterNumber: "06",
    eyebrow: "PORTFOLIO VARIETIES",
    title: "FIND A PROPERTY THAT FITS YOUR VISION.",
    description: "Carefully vetted developments matching your lifestyle standards and capital allocation goals.",
    categories: [
      { title: "Luxury Apartments", desc: "Skyline views, Downtown & Marina towers", icon: "Building2", link: "#properties" },
      { title: "Exclusive Villas", desc: "Private enclaves, waterfront & golf estates", icon: "Castle", link: "#properties" },
      { title: "Modern Townhouses", desc: "Master-planned family-oriented sanctuaries", icon: "LayoutGrid", link: "#properties" },
      { title: "Commercial Properties", desc: "Prime office towers & retail hubs", icon: "Briefcase", link: "#properties" },
    ],
    primaryCta: { label: "View Property Catalog", href: "#properties" },
  },
  {
    id: 7,
    slug: "investment-journey",
    videoSrc: "/videos/rudra-scene-07-investment-journey.mp4",
    durationLabel: "01:00 - 01:10",
    chapterNumber: "07",
    eyebrow: "STRUCTURED ADVISORY ROADMAP",
    title: "FROM YOUR FIRST ENQUIRY TO ONGOING SUPPORT.",
    description: "A disciplined, step-by-step roadmap to eliminate uncertainty at every milestone.",
    stages: [
      "1. Understand Your Goals",
      "2. Present Suitable Options",
      "3. Coordinate Property Visits",
      "4. Support Due Diligence",
      "5. Provide Ongoing Management",
    ],
    primaryCta: { label: "Start Your Journey", href: "#contact" },
  },
  {
    id: 8,
    slug: "investor-vision",
    videoSrc: "/videos/rudra-scene-08-investor-vision.mp4",
    durationLabel: "01:10 - 01:20",
    chapterNumber: "08",
    eyebrow: "STRATEGIC FORESIGHT",
    title: "YOUR VISION. YOUR STRATEGY. YOUR FUTURE.",
    description:
      "Make informed property decisions with clear guidance and a strategy aligned with your objectives. Our seasoned advisors ensure every transaction supports long-term prosperity.",
    primaryCta: { label: "Schedule A Strategy Session", href: "#contact" },
    secondaryCta: { label: "Direct WhatsApp", href: "whatsapp", isWhatsApp: true, whatsappType: "consultation" },
  },
  {
    id: 9,
    slug: "closing-reveal",
    videoSrc: "/videos/rudra-scene-09-brand-closing.mp4",
    durationLabel: "01:20 - 01:30",
    chapterNumber: "09",
    eyebrow: "RUDRA PROPERTIES DUBAI",
    title: "INVEST IN DUBAI. BUILD A BRIGHTER TOMORROW.",
    subtitle: "Dubai Real Estate Consultancy | Invest Today for a Brighter Tomorrow",
    description:
      "Ready to explore Dubai's premier real estate opportunities? Connect with our dedicated advisory team today for personalized assistance.",
    primaryCta: { label: "Book Your Consultation", href: "#contact" },
    secondaryCta: { label: "WhatsApp Us Now", href: "whatsapp", isWhatsApp: true, whatsappType: "general" },
  },
];


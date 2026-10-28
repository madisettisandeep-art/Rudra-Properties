export interface PropertyItem {
  id: string;
  title: string;
  slug: string;
  category: "Apartments" | "Villas" | "Townhouses" | "Commercial";
  location: string;
  subLocation: string;
  priceAED: number;
  priceFormattedAED: string;
  priceFormattedUSD: string;
  bedrooms: number | string;
  bathrooms: number;
  areaSqFt: number;
  featured: boolean;
  status: "Consultancy Available" | "Off-Plan Exclusive" | "Ready for Handover" | "Sample Reference";
  shortDescription: string;
  fullDescription: string;
  images: string[];
  features: string[];
  amenities: string[];
  completionYear?: string;
  developer?: string;
  paymentPlan?: string;
}

export const INITIAL_PROPERTIES: PropertyItem[] = [
  {
    id: "prop-1",
    title: "The Sky Penthouse at Downtown Horizon",
    slug: "the-sky-penthouse-downtown-horizon",
    category: "Apartments",
    location: "Downtown Dubai",
    subLocation: "Burj Crown Boulevard",
    priceAED: 14500000,
    priceFormattedAED: "AED 14,500,000",
    priceFormattedUSD: "$3,950,000",
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 5400,
    featured: true,
    status: "Consultancy Available",
    shortDescription:
      "A transcendent full-floor sky residence boasting unobstructed panoramic views of the Burj Khalifa and Dubai Opera.",
    fullDescription:
      "Crafted for the global connoisseur, this penthouse features double-height 6.5m ceiling galleries, bespoke Italian marble flooring, a private elevator foyer, and a sprawling 1,200 sq.ft wrap-around terrace with an infinity-edge jacuzzi overlooking Downtown Dubai.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Full-floor panoramic penthouse with direct Burj Khalifa vista",
      "Private climate-controlled double garage & private elevator",
      "Gaggenau designer show kitchen & separate wet prep kitchen",
      "Spacious primary suite with his-and-hers walk-in boutique closets",
    ],
    amenities: [
      "24/7 White-Glove Concierge",
      "Private Sky Lounge",
      "Valet Parking",
      "State-of-the-art Gym & Spa",
      "Temperature-Controlled Pool",
    ],
    completionYear: "Ready for Handover",
    developer: "Tier-1 Master Developer",
    paymentPlan: "Attractive 60/40 Post-Handover Available",
  },
  {
    id: "prop-2",
    title: "Signature Waterfront Villa on Palm Jumeirah",
    slug: "signature-waterfront-villa-palm-jumeirah",
    category: "Villas",
    location: "Palm Jumeirah",
    subLocation: "Frond G (Billionaires' Row)",
    priceAED: 48000000,
    priceFormattedAED: "AED 48,000,000",
    priceFormattedUSD: "$13,070,000",
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 11200,
    featured: true,
    status: "Off-Plan Exclusive",
    shortDescription:
      "Palatial beachfront masterpiece with private white-sand beach access, infinity pool, and sunset skyline views.",
    fullDescription:
      "Positioned on the prestigious Frond G of Palm Jumeirah, this ultra-luxury architectural estate features organic limestone facades, seamless indoor-outdoor living glass walls, a private boat mooring pontoon, and resort-grade subterranean wellness retreat.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Direct 120ft private pristine beach frontage",
      "Infinity edge pool with sunken fire pit lounge",
      "Subterranean 8-vehicle showcase gallery & private cinema",
      "Smart home automation with integrated bioclimatic shades",
    ],
    amenities: [
      "Private Beach Access",
      "Private Cinema",
      "Sauna & Cold Plunge",
      "Chef's Gourmet Kitchen",
      "Staff Quarters (Driver & Maid)",
    ],
    completionYear: "Q4 2026",
    developer: "Ultra-Prime Boutique Developer",
    paymentPlan: "Milestone-Linked Construction Plan",
  },
  {
    id: "prop-3",
    title: "Elysian Park Villa at Dubai Hills Estate",
    slug: "elysian-park-villa-dubai-hills",
    category: "Villas",
    location: "Dubai Hills Estate",
    subLocation: "Fairway Vistas",
    priceAED: 22000000,
    priceFormattedAED: "AED 22,000,000",
    priceFormattedUSD: "$5,990,000",
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 8400,
    featured: false,
    status: "Consultancy Available",
    shortDescription:
      "Contemporary golf-facing sanctuary surrounded by manicured fairways, private landscaped gardens, and infinity pool.",
    fullDescription:
      "Nestled along the 18-hole championship golf course in Dubai Hills Estate, this modern villa boasts double-height glass corridors, expansive entertainer terraces, internal courtyard green spaces, and minutes-away access to Dubai Hills Mall and King's College Hospital.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Direct frontage onto 18-hole championship golf course",
      "Private swimming pool with sunken outdoor BBQ kitchen",
      "Rooftop terrace commanding panoramic Dubai skyline sunset",
      "Separate maid's and driver's suites",
    ],
    amenities: [
      "Championship Golf Club",
      "Clubhouse & Tennis Courts",
      "Jogging & Bicycle Tracks",
      "International Schools Nearby",
      "Dubai Hills Park Access",
    ],
    completionYear: "Ready to Move",
    developer: "Emaar Properties Reference",
    paymentPlan: "Cash / Mortgage Support Available",
  },
  {
    id: "prop-4",
    title: "Marina Pinnacle Waterfront Residence",
    slug: "marina-pinnacle-waterfront-residence",
    category: "Apartments",
    location: "Dubai Marina",
    subLocation: "Marina Promenade",
    priceAED: 4950000,
    priceFormattedAED: "AED 4,950,000",
    priceFormattedUSD: "$1,350,000",
    bedrooms: 2,
    bathrooms: 3,
    areaSqFt: 1850,
    featured: true,
    status: "Consultancy Available",
    shortDescription:
      "High-floor duplex apartment with direct yacht harbor views, floor-to-ceiling glass, and seamless promenade access.",
    fullDescription:
      "Situated on the vibrant waterfront of Dubai Marina, this designer duplex offers refined urban waterfront living. Featuring open-concept entertaining spaces, premium German appliances, two generous ensuite bedrooms, and private balcony overlooking luxury mega-yachts.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Sweeping floor-to-ceiling marina & sea views",
      "High-specification bespoke built-in cabinetry",
      "Direct walking access to Marina Walk & JBR Beach",
      "High rental yield potential for short/long stay",
    ],
    amenities: [
      "Marina Berth Concierge",
      "Infinity Marina Pool",
      "Modern Fitness Suite & Sauna",
      "Secure Underground Parking",
    ],
    completionYear: "Ready to Move",
    developer: "Premier Waterfront Developer",
    paymentPlan: "Standard Resale / Mortgage Eligible",
  },
  {
    id: "prop-5",
    title: "Serenity Modern Townhouse at Tilal Al Ghaf",
    slug: "serenity-modern-townhouse-tilal-al-ghaf",
    category: "Townhouses",
    location: "Tilal Al Ghaf",
    subLocation: "Elan Lagoon Community",
    priceAED: 3850000,
    priceFormattedAED: "AED 3,850,000",
    priceFormattedUSD: "$1,050,000",
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3100,
    featured: false,
    status: "Off-Plan Exclusive",
    shortDescription:
      "Contemporary family townhouse centered around a crystal lagoon, white sand beaches, and lush cycling trails.",
    fullDescription:
      "Designed for idyllic family living, this 4-bedroom townhouse combines Scandinavian minimalism with Dubai's resort ambiance. Featuring floor-to-ceiling windows, private rear landscaped garden, smart solar-ready infrastructure, and footsteps from Lagoon Al Ghaf.",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Moments away from recreational crystal lagoon & sandy beach",
      "Private garden terrace with pergola",
      "Double covered parking bays",
      "Spacious family lounge on upper level",
    ],
    amenities: [
      "Crystal Lagoon & Water Sports",
      "Community Wellness Center",
      "Kids Splash Parks & Playgrounds",
      "GEMS International School Nearby",
    ],
    completionYear: "Q1 2027",
    developer: "Majid Al Futtaim Reference",
    paymentPlan: "50/50 Payment Plan",
  },
  {
    id: "prop-6",
    title: "Corporate Grade-A Office Floor at Business Bay",
    slug: "corporate-office-floor-business-bay",
    category: "Commercial",
    location: "Business Bay",
    subLocation: "Marasi Bay Canal",
    priceAED: 18200000,
    priceFormattedAED: "AED 18,200,000",
    priceFormattedUSD: "$4,950,000",
    bedrooms: "Commercial",
    bathrooms: 6,
    areaSqFt: 6200,
    featured: false,
    status: "Consultancy Available",
    shortDescription:
      "Fitted Grade-A commercial office floor commanding canal and Downtown skyline views, ideal for regional headquarters.",
    fullDescription:
      "A rare full commercial floor offering in a marquee Business Bay tower. Features high-speed optical infrastructure, LEED Gold sustainability certification, 14 allocated covered parking spaces, dedicated executive boardrooms, and waterfront dining concourse below.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Grade-A LEED Gold certified commercial tower",
      "14 dedicated basement parking bays",
      "Panoramic views of Dubai Canal & Burj Khalifa",
      "Flexible column-free open floor layout",
    ],
    amenities: [
      "High-Speed Destination Elevators",
      "24/7 Monitored Access Control",
      "Conference Facilities",
      "Direct Canal Boardwalk Access",
    ],
    completionYear: "Ready to Move",
    developer: "Institutional Grade Commercial Tower",
    paymentPlan: "Commercial Financing Assistance Available",
  },
];


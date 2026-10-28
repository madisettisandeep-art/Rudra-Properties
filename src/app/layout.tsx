import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#071426",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "RUDRA PROPERTIES — Luxury Dubai Real Estate Consultancy",
  description:
    "Invest Today for a Brighter Tomorrow. Rudra Properties specializes in Dubai real estate consultancy, luxury property buying, selling, investment guidance, and property management.",
  keywords: [
    "Dubai real estate consultancy",
    "Buy property in Dubai",
    "Sell property in Dubai",
    "Dubai property investment assistance",
    "Dubai property management",
    "Dubai real estate investment guidance",
    "Palm Jumeirah villas",
    "Downtown Dubai penthouses",
    "Rudra Properties",
  ],
  authors: [{ name: "Rudra Properties Dubai" }],
  creator: "Rudra Properties",
  publisher: "Rudra Properties",
  metadataBase: new URL("https://rudraproperties.ae"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://rudraproperties.ae",
    title: "RUDRA PROPERTIES — Luxury Dubai Real Estate Consultancy",
    description: "Invest Today for a Brighter Tomorrow. Premier Dubai real estate consultancy for discerning investors.",
    siteName: "Rudra Properties",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Rudra Properties Luxury Dubai Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RUDRA PROPERTIES — Luxury Dubai Real Estate Consultancy",
    description: "Invest Today for a Brighter Tomorrow. Expert guidance in Dubai prime real estate.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Rudra Properties",
    image: "https://rudraproperties.ae/images/logo.png",
    description: "Dubai real estate consultancy specializing in property buying, selling, investment assistance, and asset management.",
    telephone: "+91 81257 41014",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    slogan: "Invest Today for a Brighter Tomorrow",
    url: "https://rudraproperties.ae",
    priceRange: "$$$$",
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#080A0F] text-[#F8F5EE] antialiased selection:bg-[#D4AF62]/30 selection:text-white">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}


import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#E5C887",
          DEFAULT: "#D4AF62",
          dark: "#A98746",
          accent: "#F1DB9B",
        },
        navy: {
          light: "#12253E",
          DEFAULT: "#071426",
          dark: "#040B15",
        },
        luxury: {
          black: "#080A0F",
          charcoal: "#141721",
          ivory: "#F8F5EE",
          champagne: "#E8D8B0",
          bronze: "#8B6F3E",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "Manrope", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F1DB9B 0%, #D4AF62 50%, #A98746 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(212, 175, 98, 0.4), transparent)",
        "glass-gradient": "linear-gradient(135deg, rgba(7, 20, 38, 0.75) 0%, rgba(8, 10, 15, 0.85) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(212, 175, 98, 0.35)",
        "gold-glow-lg": "0 0 45px -5px rgba(212, 175, 98, 0.45)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;


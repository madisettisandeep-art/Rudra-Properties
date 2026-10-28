# RUDRA PROPERTIES — LUXURY DUBAI REAL ESTATE WEB APPLICATION

> **"Invest Today for a Brighter Tomorrow"**  
> Dubai Real Estate Consultancy | Primary Market: Dubai, UAE  
> Official WhatsApp: **+91 81257 41014** (https://wa.me/918125741014)

---

## 1. Overview & Architectural Highlights

Rudra Properties is a high-end luxury real estate consultancy web application designed specifically for Dubai prime properties, international investors, NRIs, and luxury homebuyers.

### Key Features
- **9-Video Cinematic Experience:** A continuous 650vh scroll-driven brand film mapping 9 consecutive high-definition video clips (from Dubai sunrise & Burj Khalifa to Downtown infrastructure, penthouses, roadmap, and closing reveal). Includes chapter timeline scrubbing, mute/unmute, and playback controls.
- **Glassmorphic Architecture over Dubai Skyline:** In compliance with the creative direction, the hero section showcases the 9 cinematic videos, while all subsequent sections (About Us, Our Team, Properties, Services, Contact Us, Footer, Admin) feature a fixed luxury background using the supplied Dubai skyline and marina imagery, viewed through frosted glassmorphism layers (`backdrop-blur`, semi-transparent midnight navy, delicate gold borders).
- **Custom Directional Scroll "Our Team" Animation:** Faithfully implemented from the provided handwritten sketch, featuring a central glowing "OUR TEAM" node with a dynamic curved SVG directional arrow pointing directly to the active team profile, alongside a responsive mobile vertical timeline and detail modal.
- **Curated Property Discovery:** Interactive filter tabs (All, Apartments, Villas, Townhouses, Commercial), location selector, search bar, verified pricing in both AED and USD, and an interactive detail modal with multi-image gallery.
- **Context-Aware WhatsApp Integration:** Centralized helper linking to `+91 81257 41014` with prefilled, URL-encoded messages tailored for general advisory, buying, selling, investment assistance, property management, and property-specific inquiries.
- **Enquiry Form & API Persistence:** Full client-side validation, secure submission to `/api/enquiry`, status tracking, and optional WhatsApp redirection.
- **Management Portal (`/admin`):** Executive management console with passcode authentication (`rudra2026`), lead status management, property listings manager, 9 video scenes inspector, and site settings.

---

## 2. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom Champagne Gold (`#D4AF62`) and Midnight Navy (`#071426`) palette
- **Icons:** Lucide React
- **Typography:** Cormorant Garamond (Editorial Serif) & Inter (Modern Sans)
- **State & Data Store:** Server-side API with file-based persistence in `data/` and in-memory fallbacks

---

## 3. Running the Application Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build & Start Production Server:**
   ```bash
   npm run build
   npm run start
   ```

4. **Access Management Console:**
   - URL: [http://localhost:3000/admin](http://localhost:3000/admin)
   - Passcode: `rudra2026`

---

## 4. Asset Manifest

- `public/images/logo.png` — Official Rudra Properties Emblem & Typography
- `public/favicon.png` — High-resolution Favicon
- `public/images/bg-dubai-skyscrapers.png` — Pngtree Luxury Dubai Skyline
- `public/images/bg-dubai-marina.png` — Pngtree Luxury Dubai Marina
- `public/videos/rudra-scene-01-intro.mp4` to `rudra-scene-09-brand-closing.mp4` — The 9 Supplied Cinematic Video Clips


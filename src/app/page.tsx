import React from "react";
import Navbar from "@/components/Navbar";
import HeroCinematic from "@/components/HeroCinematic";
import AboutUs from "@/components/AboutUs";
import OurTeam from "@/components/OurTeam";
import PropertiesSection from "@/components/PropertiesSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Sticky Luxury Navigation */}
      <Navbar />

      {/* Hero: 9-Video Cinematic Experience (Clean & Pure HD Video, Zero Background Bleed) */}
      <HeroCinematic />

      {/* 
        Rest of the Application: LUXURY DUBAI BEACHFRONT BACKGROUND
        Using ONLY the second uploaded image as the background for the entire application below Hero.
        Zero background in Hero section.
      */}
      <div
        className="relative w-full text-[#071426] bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{
          backgroundImage: "url('/images/bg-dubai-luxury-beach.jpg')",
        }}
      >
        {/* Content Sections */}
        <div className="relative z-10">
          <AboutUs />

          {/* Subtle Champagne Gold Section Divider */}
          <div className="max-w-7xl mx-auto px-8">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF62]/50 to-transparent" />
          </div>

          <OurTeam />

          <div className="max-w-7xl mx-auto px-8">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF62]/50 to-transparent" />
          </div>

          <PropertiesSection />

          <div className="max-w-7xl mx-auto px-8">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF62]/50 to-transparent" />
          </div>

          <ServicesSection />

          <div className="max-w-7xl mx-auto px-8">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF62]/50 to-transparent" />
          </div>

          <ContactSection />
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </main>
  );
}

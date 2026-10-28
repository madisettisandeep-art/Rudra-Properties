"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowUpRight, Youtube, Instagram, Facebook } from "lucide-react";
import { getWhatsAppUrl, RUDRA_YOUTUBE_URL, RUDRA_INSTAGRAM_URL, RUDRA_FACEBOOK_URL } from "@/lib/whatsapp";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ["home", "about", "team", "properties", "services", "contact"];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-transparent py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 
              Complete Logo with generous margin to prevent overlapping with navigation links
            */}
            <Link
              href="#home"
              className="flex items-center flex-shrink-0 mr-6 md:mr-8 lg:mr-10 xl:mr-14 focus:outline-none transition-transform hover:scale-105"
              aria-label="Rudra Properties Home"
            >
              <Image
                src="/images/logo.png"
                alt="Rudra Properties Logo"
                width={150}
                height={75}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-8 flex-shrink-0">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative text-xs tracking-widest uppercase font-semibold transition-colors py-1.5 outline-none focus:outline-none ring-0 focus:ring-0 border-none select-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] ${
                      isActive
                        ? "text-[#D4AF62] font-bold"
                        : "text-white hover:text-[#D4AF62]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF62] to-transparent animate-fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Clean Icon-Only Social Links (Logos Only, No WhatsApp CTA) */}
            <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0 ml-auto">
              {/* Facebook Logo Only */}
              <a
                href={RUDRA_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#1877F2] text-white border border-white/20 hover:border-[#1877F2] transition-all duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] hover:scale-110 active:scale-95 shadow-sm"
                title="Follow Rudra Properties on Facebook"
                aria-label="Rudra Properties Facebook Profile"
              >
                <Facebook size={16} className="fill-current" />
              </a>

              {/* Instagram Logo Only */}
              <a
                href={RUDRA_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F56040] text-white border border-white/20 hover:border-pink-500 transition-all duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] hover:scale-110 active:scale-95 shadow-sm"
                title="Follow Rudra Properties on Instagram"
                aria-label="Rudra Properties Instagram Profile"
              >
                <Instagram size={16} />
              </a>

              {/* YouTube Logo Only */}
              <a
                href={RUDRA_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-600 text-white border border-white/20 hover:border-red-600 transition-all duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] hover:scale-110 active:scale-95 shadow-sm"
                title="Watch Rudra Properties on YouTube"
                aria-label="Rudra Properties YouTube Channel"
              >
                <Youtube size={16} className="fill-current" />
              </a>
            </div>

            {/* Mobile Actions: Facebook, Instagram, YouTube Logos & Hamburger (No WhatsApp icon) */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={RUDRA_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1877F2] text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                title="Facebook Profile"
                aria-label="Facebook Profile"
              >
                <Facebook size={15} className="fill-current" />
              </a>
              <a
                href={RUDRA_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                title="Instagram Profile"
                aria-label="Instagram Profile"
              >
                <Instagram size={15} />
              </a>
              <a
                href={RUDRA_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-red-600 text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                title="YouTube Channel"
                aria-label="YouTube Channel"
              >
                <Youtube size={15} className="fill-current" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF62] text-white hover:bg-white/10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-20 right-4 left-4 max-w-sm ml-auto glass-panel p-6 rounded-2xl shadow-2xl border border-[#D4AF62]/40 animate-fade-in bg-white/95">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center pb-3 border-b border-gray-200">
                <Image
                  src="/images/logo.png"
                  alt="Rudra Properties Logo"
                  width={160}
                  height={80}
                  className="h-10 w-auto object-contain"
                />
              </div>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-serif tracking-wide text-[#071426] hover:text-[#D4AF62] hover:translate-x-1 transition-all py-1.5 font-medium"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={16} className="text-[#D4AF62]" />
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-2.5">
                <a
                  href={RUDRA_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-xs uppercase tracking-widest shadow-md transition-all"
                >
                  <Facebook size={17} className="fill-current" />
                  <span>Connect on Facebook</span>
                </a>
                <a
                  href={RUDRA_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-semibold text-xs uppercase tracking-widest shadow-md transition-all"
                >
                  <Instagram size={17} />
                  <span>Follow on Instagram</span>
                </a>
                <a
                  href={RUDRA_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-widest shadow-md transition-colors"
                >
                  <Youtube size={17} className="fill-current" />
                  <span>Watch on YouTube</span>
                </a>
                <a
                  href={getWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#D4AF62] to-[#A98746] text-[#071426] font-semibold text-xs uppercase tracking-widest shadow-lg"
                >
                  <MessageCircle size={16} className="fill-[#071426]" />
                  <span>WhatsApp (+91 81257 41014)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

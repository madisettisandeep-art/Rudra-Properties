"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowUp, ShieldCheck, Phone, MapPin, X, Youtube, Instagram, Facebook } from "lucide-react";
import { getWhatsAppUrl, RUDRA_WHATSAPP_NUMBER, RUDRA_YOUTUBE_URL, RUDRA_INSTAGRAM_URL, RUDRA_FACEBOOK_URL } from "@/lib/whatsapp";

export default function Footer() {
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#D4AF62]/40 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#D4AF62]/30">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Rudra Properties Logo"
                  width={200}
                  height={100}
                  className="h-12 w-auto object-contain"
                />
              </div>

              <p className="font-serif italic text-sm text-[#A98746] font-semibold">
                Invest Today for a Brighter Tomorrow
              </p>

              <p className="text-xs text-gray-600 leading-relaxed font-normal max-w-sm">
                Empowering international investors, buyers, and sellers with bespoke advisory, verified Dubai property opportunities, and continuous asset stewardship.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href={getWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF62] to-[#A98746] text-[#071426] font-bold text-xs uppercase tracking-wider shadow hover:brightness-105 transition-all"
                >
                  <MessageCircle size={15} className="fill-[#071426]" />
                  <span>WhatsApp Advisory</span>
                </a>
                <a
                  href={RUDRA_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                  title="Follow Rudra Properties on Facebook"
                  aria-label="Rudra Properties Facebook Profile"
                >
                  <Facebook size={14} className="fill-current" />
                  <span>Facebook</span>
                </a>
                <a
                  href={RUDRA_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                  title="Follow Rudra Properties on Instagram"
                  aria-label="Rudra Properties Instagram Profile"
                >
                  <Instagram size={14} />
                  <span>Instagram</span>
                </a>
                <a
                  href={RUDRA_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                  title="Subscribe to Rudra Properties on YouTube"
                  aria-label="Rudra Properties YouTube Channel"
                >
                  <Youtube size={14} className="fill-current" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#071426] font-bold">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs text-gray-600 font-medium">
                <li>
                  <Link href="#home" className="hover:text-[#A98746] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-[#A98746] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#team" className="hover:text-[#A98746] transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#properties" className="hover:text-[#A98746] transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-[#A98746] transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-[#A98746] transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Core Services */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#071426] font-bold">
                Advisory Pillars
              </h4>
              <ul className="space-y-2 text-xs text-gray-600 font-medium">
                <li>
                  <Link href="#services" className="hover:text-[#A98746] transition-colors">
                    Buy Properties in Dubai
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-[#A98746] transition-colors">
                    Sell Properties & Discrete Listings
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-[#A98746] transition-colors">
                    Investment Feasibility & Yield Analysis
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-[#A98746] transition-colors">
                    Property Management & Overseas Handover
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info & Market */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#071426] font-bold">
                Direct Contact
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-[#A98746]" />
                  <a
                    href="tel:+918125741014"
                    className="hover:text-[#A98746] transition-colors font-bold text-[#071426]"
                  >
                    {RUDRA_WHATSAPP_NUMBER}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#A98746]" />
                  <span className="font-medium">Dubai, United Arab Emirates</span>
                </li>
                <li className="flex items-center gap-2 text-gray-500">
                  <ShieldCheck size={14} className="text-[#A98746]" />
                  <span>Verified Dubai Real Estate Consultancy</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#071426] transition-colors font-semibold"
                >
                  <ArrowUp size={14} />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
            <p>
              &copy; {new Date().getFullYear()} RUDRA PROPERTIES. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setLegalModal("privacy")}
                className="hover:text-[#071426] transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalModal("terms")}
                className="hover:text-[#071426] transition-colors"
              >
                Terms and Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {legalModal === "privacy" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl max-w-2xl w-full border border-[#D4AF62]/50 max-h-[85vh] overflow-y-auto text-[#071426] shadow-2xl">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-700 hover:text-black"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <h3 className="font-serif text-2xl font-bold text-[#071426] mb-4">
              Privacy Policy
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-normal leading-relaxed">
              <p>
                <strong>Rudra Properties</strong> respects your privacy and is committed to protecting your personal information. This Privacy Policy details our practices regarding information collected through our web application and consultancy communications.
              </p>
              <h4 className="text-xs uppercase font-mono text-[#A98746] font-bold pt-2">
                Information We Collect
              </h4>
              <p>
                When you submit an enquiry form or message us via WhatsApp, we collect your name, phone number, optional email address, target budget, and property preferences to deliver customized property consultancy.
              </p>
              <h4 className="text-xs uppercase font-mono text-[#A98746] font-bold pt-2">
                Use of Information
              </h4>
              <p>
                Information is utilized strictly to provide personalized property advisory, arrange property viewings with verified developers, coordinate transaction assistance, and reply to client inquiries. We do not sell, rent, or distribute personal data to unaffiliated third parties.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {legalModal === "terms" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl max-w-2xl w-full border border-[#D4AF62]/50 max-h-[85vh] overflow-y-auto text-[#071426] shadow-2xl">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-700 hover:text-black"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <h3 className="font-serif text-2xl font-bold text-[#071426] mb-4">
              Terms & Conditions
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-normal leading-relaxed">
              <p>
                Welcome to <strong>Rudra Properties</strong>. By accessing our web application and utilizing our Dubai real estate consultancy services, you agree to these Terms and Conditions.
              </p>
              <h4 className="text-xs uppercase font-mono text-[#A98746] font-bold pt-2">
                Nature of Consultancy Services
              </h4>
              <p>
                Rudra Properties acts as a real estate consultancy assisting clients in discovering, evaluating, and acquiring real estate properties in Dubai, UAE. Information presented on this website is for advisory and informational reference.
              </p>
              <h4 className="text-xs uppercase font-mono text-[#A98746] font-bold pt-2">
                No Financial Guarantee
              </h4>
              <p>
                Real estate values, rental returns, and capital appreciation fluctuate with market conditions and cannot be guaranteed. Prospective buyers and investors are encouraged to conduct independent due diligence and seek certified legal or financial advice before executing purchase contracts.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

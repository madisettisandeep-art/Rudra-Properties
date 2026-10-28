"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppUrl, RUDRA_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="mb-3 relative max-w-xs animate-fade-in">
          <div className="bg-[#071426]/90 backdrop-blur-md border border-[#D4AF62]/40 rounded-xl p-3 shadow-xl text-xs text-[#F8F5EE] relative pr-7">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close tooltip"
            >
              <X size={14} />
            </button>
            <p className="font-semibold text-[#D4AF62] text-[13px] mb-1">
              Direct Dubai Advisory
            </p>
            <p className="text-gray-300 leading-relaxed">
              Connect directly with our senior consultant on WhatsApp:{" "}
              <span className="text-white font-medium">{RUDRA_WHATSAPP_NUMBER}</span>
            </p>
          </div>
          {/* Tooltip arrow */}
          <div className="w-3 h-3 bg-[#071426]/90 border-r border-b border-[#D4AF62]/40 transform rotate-45 absolute -bottom-1.5 right-6" />
        </div>
      )}

      {/* Main WhatsApp Button */}
      <a
        href={getWhatsAppUrl("general")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rudra Properties on WhatsApp (+91 81257 41014)"
        className="group relative flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline-block font-medium text-sm tracking-wide">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}


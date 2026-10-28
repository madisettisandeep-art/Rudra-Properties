"use client";

import React from "react";
import {
  Home,
  Tag,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function ServicesSection() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Home":
        return <Home size={24} />;
      case "Tag":
        return <Tag size={24} />;
      case "TrendingUp":
        return <TrendingUp size={24} />;
      case "ShieldCheck":
      default:
        return <ShieldCheck size={24} />;
    }
  };

  return (
    <section id="services" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF62]/20 border border-[#D4AF62]/50 text-[#071426] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm font-semibold">
            <Briefcase size={14} className="text-[#A98746]" />
            <span>Comprehensive Real Estate Advisory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-wide mb-4">
            OUR CORE <span className="text-gold-gradient font-semibold">SERVICES</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-normal">
            End-to-end guidance tailored to international investors, prospective homeowners, and landlords across Dubai.
          </p>
        </div>

        {/* Four Connected Service Cards with Golden Linking Line */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF62]/40 to-transparent -translate-y-12 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES_DATA.map((srv) => (
              <div
                key={srv.id}
                className="glass-card rounded-3xl p-7 border border-[#D4AF62]/35 shadow-xl flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF62] bg-transparent"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-bold text-[#A98746]/60 group-hover:text-[#A98746] transition-colors">
                      {srv.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF62]/25 border border-[#D4AF62]/50 text-[#A98746] flex items-center justify-center group-hover:bg-[#D4AF62] group-hover:text-[#071426] transition-all duration-300 shadow-sm">
                      {getIcon(srv.iconName)}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#071426] mb-2 group-hover:text-[#A98746] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#A98746] font-mono mb-4 font-semibold">
                    {srv.tagline}
                  </p>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-[#D4AF62]/20 mb-6">
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#071426] font-medium">
                        <CheckCircle2 size={13} className="text-[#A98746] mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {srv.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-transparent border border-[#D4AF62]/30 text-[#071426] font-semibold"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Disclaimer if present */}
                  {srv.disclaimer && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-[#D4AF62]/30 text-[10px] text-gray-800 italic mb-6 flex items-start gap-1.5">
                      <AlertCircle size={12} className="text-[#A98746] mt-0.5 flex-shrink-0" />
                      <span>{srv.disclaimer}</span>
                    </div>
                  )}
                </div>

                {/* Service Action Button */}
                <a
                  href={getWhatsAppUrl(srv.whatsappType)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-transparent hover:bg-gradient-to-r hover:from-[#D4AF62] hover:to-[#A98746] text-[#071426] border border-[#D4AF62]/40 hover:border-transparent text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <MessageCircle size={14} className="group-hover:fill-[#071426]" />
                  <span>{srv.ctaLabel}</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

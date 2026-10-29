"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, CheckCircle2, Shield, Users, ArrowRight, MessageCircle, Youtube, Instagram, Facebook } from "lucide-react";
import { getWhatsAppUrl, RUDRA_YOUTUBE_URL, RUDRA_INSTAGRAM_URL, RUDRA_FACEBOOK_URL } from "@/lib/whatsapp";

export default function AboutUs() {
  return (
    <section id="about" className="content-visibility-auto relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF62]/20 border border-[#D4AF62]/50 text-[#071426] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm font-semibold">
            <Compass size={14} className="text-[#A98746]" />
            <span>Consultancy Philosophy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-wide mb-6">
            ABOUT <span className="text-gold-gradient font-semibold">RUDRA PROPERTIES</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-normal">
            Invest Today for a Brighter Tomorrow. We bridge ambitious global investors and homebuyers with Dubai&apos;s most compelling real estate assets through transparency, discipline, and personalized advisory.
          </p>
        </div>

        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Architectural Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-panel p-3 border border-[#D4AF62]/40 shadow-xl group">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                  alt="Dubai Iconic Architecture"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Floating Highlight Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 p-4 rounded-2xl border border-[#D4AF62]/40 shadow-lg text-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#D4AF62]/25 text-[#D4AF62]">
                      <Shield size={20} className="text-[#D4AF62]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white font-bold">
                        Dubai Land Department Compliant
                      </p>
                      <p className="text-[11px] text-gray-300">
                        Official procedures & certified transactions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Gold Accent */}
            <div className="absolute -top-6 -left-6 w-36 h-36 bg-[#D4AF62]/25 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right Column: Brand Storytelling & 3 Value Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#D4AF62]/40 shadow-xl space-y-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#071426] font-normal leading-snug">
                Navigating Dubai’s Prime Real Estate with{" "}
                <span className="text-gold-gradient font-semibold">Clarity and Care</span>
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                <p>
                  <strong className="text-[#071426] font-bold">Rudra Properties</strong> is a Dubai-focused real estate consultancy helping clients explore property opportunities through personalized assistance, informed property selection and ongoing support.
                </p>
                <p>
                  Whether you are looking to buy a home, sell a property, evaluate an investment opportunity or arrange property management, our goal is to make the process clearer, more organized and aligned with your objectives.
                </p>
                <p>
                  Our approach is built around understanding your requirements, presenting relevant options, coordinating next steps and maintaining clear communication throughout the property journey.
                </p>
              </div>

              {/* Three Value Pillars */}
              <div className="pt-4 border-t border-[#D4AF62]/30 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-transparent border border-[#D4AF62]/40 hover:border-[#D4AF62] hover:bg-white/10 transition-colors shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF62]/20 text-[#A98746] flex items-center justify-center mb-3">
                    <Compass size={16} />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#071426] mb-1">
                    Personalized Guidance
                  </h4>
                  <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                    Customized shortlists aligned with your lifestyle & capital roadmap.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-transparent border border-[#D4AF62]/40 hover:border-[#D4AF62] hover:bg-white/10 transition-colors shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF62]/20 text-[#A98746] flex items-center justify-center mb-3">
                    <CheckCircle2 size={16} />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#071426] mb-1">
                    Informed Decisions
                  </h4>
                  <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                    Objective data, escrow account verification, and clear market metrics.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-transparent border border-[#D4AF62]/40 hover:border-[#D4AF62] hover:bg-white/10 transition-colors shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF62]/20 text-[#A98746] flex items-center justify-center mb-3">
                    <Users size={16} />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#071426] mb-1">
                    Ongoing Support
                  </h4>
                  <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                    Continued post-handover liaison, snagging coordination, and management.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF62] via-[#E5C887] to-[#A98746] text-[#071426] font-semibold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(212,175,98,0.4)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Discuss Your Property Goals</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href={getWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-[#071426] border border-[#D4AF62]/60 hover:border-[#D4AF62] font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>Direct WhatsApp (+91 81257 41014)</span>
                </a>

                <a
                  href={RUDRA_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1877F2]/15 hover:bg-[#1877F2] text-[#071426] hover:text-white border border-[#1877F2]/40 hover:border-[#1877F2] font-semibold text-xs uppercase tracking-wider transition-all shadow-sm group"
                  title="Connect with Rudra Properties on Facebook"
                >
                  <Facebook size={16} className="text-[#1877F2] group-hover:text-white transition-colors fill-current" />
                  <span>Facebook</span>
                </a>

                <a
                  href={RUDRA_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-tr from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#F56040]/20 hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F56040] text-[#071426] hover:text-white border border-pink-500/50 hover:border-pink-600 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm group"
                  title="Follow Rudra Properties on Instagram"
                >
                  <Instagram size={16} className="text-pink-600 group-hover:text-white transition-colors" />
                  <span>Instagram</span>
                </a>

                <a
                  href={RUDRA_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-red-600/15 hover:bg-red-600 text-[#071426] hover:text-white border border-red-500/50 hover:border-red-600 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm group"
                  title="Watch Rudra Properties Videos"
                >
                  <Youtube size={16} className="text-red-600 group-hover:text-white transition-colors fill-current" />
                  <span>YouTube Channel</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

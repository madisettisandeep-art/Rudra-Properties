"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Users, ArrowRight, MessageCircle, Linkedin, ExternalLink } from "lucide-react";
import { TEAM_MEMBERS, TeamMember } from "@/lib/team-data";
import TeamModal from "./TeamModal";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function OurTeam() {
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [activeModalMember, setActiveModalMember] = useState<TeamMember | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync scroll progress through team section to highlight active card
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const total = rect.height + windowHeight;
        const current = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, current / total));
        setScrollProgress(progress);

        // Dynamically select member based on progress
        const memberIdx = Math.min(
          TEAM_MEMBERS.length - 1,
          Math.floor(progress * TEAM_MEMBERS.length)
        );
        setSelectedMemberIndex(memberIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeMember = TEAM_MEMBERS[selectedMemberIndex];

  // Coordinates for curved SVG arrow from Central Node (x:120, y:220) to Member Cards (x:390, y:80 + index * 105)
  const nodeCenter = { x: 120, y: 220 };
  const targetY = 80 + selectedMemberIndex * 105;
  const targetX = 390;
  const pathD = `M ${nodeCenter.x} ${nodeCenter.y} C 220 ${nodeCenter.y}, 260 ${targetY}, ${targetX} ${targetY}`;

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF62]/20 border border-[#D4AF62]/50 text-[#071426] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm font-semibold">
            <Users size={14} className="text-[#A98746]" />
            <span>Dedicated Dubai Advisors</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-wide mb-4">
            MEET THE PEOPLE BEHIND YOUR{" "}
            <span className="text-gold-gradient font-semibold">PROPERTY JOURNEY</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-normal">
            Professional guidance. Personal attention. A shared vision.
          </p>

          {/* Gold Decorative SVG Line across section */}
          <div className="mt-8 mx-auto w-32 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF62] to-transparent" />
        </div>

        {/* Desktop Layout: Central Focus Node + Animated Directional Arrow + Member Cards */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
          {/* Left Column: Central Focus Node & Interactive Selector */}
          <div className="col-span-4 flex flex-col items-center justify-center relative">
            {/* The Central Circular Focus Node from the handwritten sketch */}
            <div className="relative group">
              {/* Outer pulsing gold halo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#D4AF62]/30 to-[#E5C887]/20 blur-xl animate-pulse" />

              <div className="relative w-48 h-48 rounded-full glass-panel border-2 border-[#D4AF62] flex flex-col items-center justify-center p-4 text-center shadow-xl group-hover:scale-105 transition-transform duration-500 bg-transparent">
                <div className="w-12 h-12 rounded-full bg-[#D4AF62]/25 flex items-center justify-center text-[#A98746] mb-2 border border-[#D4AF62]/50">
                  <Users size={22} />
                </div>
                <span className="font-serif text-lg font-bold tracking-widest text-[#071426] uppercase">
                  OUR TEAM
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A98746] mt-0.5 font-bold">
                  Advisory Focus
                </span>
                <div className="mt-2 text-[10px] text-gray-700 font-medium">
                  Select a member to view trajectory
                </div>
              </div>
            </div>

            {/* Quick Index Selector Buttons */}
            <div className="mt-8 flex items-center gap-2">
              {TEAM_MEMBERS.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMemberIndex(idx)}
                  className={`w-9 h-9 rounded-full text-xs font-mono font-medium transition-all duration-300 border ${
                    idx === selectedMemberIndex
                      ? "bg-[#D4AF62] text-[#071426] border-[#D4AF62] font-bold shadow-[0_0_15px_rgba(212,175,98,0.5)] scale-110"
                      : "bg-transparent text-[#071426] border-[#D4AF62]/40 hover:border-[#D4AF62] hover:bg-[#D4AF62]/20 font-semibold"
                  }`}
                  aria-label={`Select ${m.name}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Middle Column: Dynamic Curved SVG Directional Arrow */}
          <div className="col-span-2 relative h-[480px] flex items-center justify-center pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 400 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="goldArrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A98746" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#D4AF62" stopOpacity="1" />
                  <stop offset="100%" stopColor="#A98746" stopOpacity="1" />
                </linearGradient>
                <marker
                  id="arrowHead"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#A98746" />
                </marker>
              </defs>

              {/* Guide subtle backdrop path */}
              <path
                d={pathD}
                stroke="rgba(212, 175, 98, 0.25)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />

              {/* Active Animated Directional Arrow Path */}
              <path
                d={pathD}
                stroke="url(#goldArrowGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 6"
                markerEnd="url(#arrowHead)"
                className="transition-all duration-700 ease-out"
              />
            </svg>
          </div>

          {/* Right Column: Interactive Team Member Cards */}
          <div className="col-span-6 space-y-4">
            {TEAM_MEMBERS.map((member, index) => {
              const isSelected = index === selectedMemberIndex;
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMemberIndex(index)}
                  className={`glass-card p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-500 border ${
                    isSelected
                      ? "border-[#D4AF62] bg-[#D4AF62]/15 shadow-xl translate-x-2"
                      : "border-[#D4AF62]/35 bg-transparent hover:border-[#D4AF62] hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#D4AF62]/50 flex-shrink-0 shadow-sm">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-lg font-bold text-[#071426] truncate">
                          {member.name}
                        </h3>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#071426] bg-[#D4AF62]/20 px-2 py-0.5 rounded border border-[#D4AF62]/40 flex-shrink-0 font-semibold">
                          {member.department.split(" ")[0]}
                        </span>
                      </div>
                      <p className="text-xs text-[#A98746] font-semibold mt-0.5">
                        {member.title}
                      </p>
                      <p className="text-xs text-gray-700 mt-1 line-clamp-2 font-normal leading-relaxed">
                        {member.experienceSummary}
                      </p>

                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#D4AF62]/25 text-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalMember(member);
                          }}
                          className="inline-flex items-center gap-1.5 text-[#071426] hover:text-[#A98746] font-semibold transition-colors"
                        >
                          <span>View Full Profile</span>
                          <ExternalLink size={13} className="text-[#A98746]" />
                        </button>

                        <div className="flex items-center gap-3">
                          <a
                            href={getWhatsAppUrl({
                              type: "team",
                              teamMemberName: member.name,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#071426] hover:text-[#25D366] transition-colors p-1"
                            title="Direct WhatsApp"
                          >
                            <MessageCircle size={16} />
                          </a>
                          {member.linkedIn && (
                            <a
                              href={member.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[#071426] hover:text-[#0077B5] transition-colors p-1"
                              title="LinkedIn Profile"
                            >
                              <Linkedin size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline Adapted Layout */}
        <div className="lg:hidden space-y-8">
          {/* Central Anchor Node on top */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40 rounded-full glass-panel border-2 border-[#D4AF62] flex flex-col items-center justify-center p-4 text-center shadow-xl bg-transparent">
              <div className="w-10 h-10 rounded-full bg-[#D4AF62]/20 flex items-center justify-center text-[#A98746] mb-1 border border-[#D4AF62]/40">
                <Users size={18} />
              </div>
              <span className="font-serif text-base font-bold tracking-widest text-[#071426] uppercase">
                OUR TEAM
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#A98746] font-bold">
                Guiding Your Path
              </span>
            </div>
          </div>

          {/* Vertical Connecting Line */}
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#D4AF62] to-transparent mx-auto" />

          {/* Team Cards in Vertical Flow */}
          <div className="space-y-4">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="glass-card p-5 rounded-2xl border border-[#D4AF62]/40 shadow-md bg-transparent"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#D4AF62]/40 flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#071426]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#A98746] font-semibold">
                      {member.title}
                    </p>
                    <span className="text-[10px] font-mono text-gray-500 font-medium">
                      {member.department}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-4 line-clamp-3 font-normal leading-relaxed">
                  {member.experienceSummary}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                  <button
                    onClick={() => setActiveModalMember(member)}
                    className="inline-flex items-center gap-1.5 text-[#071426] font-bold hover:text-[#A98746]"
                  >
                    <span>View Profile</span>
                    <ArrowRight size={13} className="text-[#A98746]" />
                  </button>

                  <a
                    href={getWhatsAppUrl({
                      type: "team",
                      teamMemberName: member.name,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-semibold shadow-sm"
                  >
                    <MessageCircle size={14} className="fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Detail Dialog */}
      <TeamModal
        member={activeModalMember}
        onClose={() => setActiveModalMember(null)}
      />
    </section>
  );
}

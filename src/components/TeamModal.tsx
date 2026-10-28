"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, MessageCircle, Linkedin, CheckCircle2, ShieldCheck } from "lucide-react";
import { TeamMember } from "@/lib/team-data";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface TeamModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamModal({ member, onClose }: TeamModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (member) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [member]);

  // Fallback for light-dismiss on browsers without native closedby support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isContentClick =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isContentClick) {
        onClose();
      }
    };

    dialog.addEventListener("click", handleBackdropClick);
    return () => dialog.removeEventListener("click", handleBackdropClick);
  }, [onClose]);

  if (!member) return null;

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      onClose={onClose}
      aria-labelledby="team-dialog-title"
      className="m-auto fixed inset-0 z-50 p-4 max-w-3xl w-full focus:outline-none bg-transparent"
    >
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-[#D4AF62]/50 shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto animate-fade-in text-[#071426]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-600 hover:text-[#071426] hover:bg-gray-200 transition-all border border-gray-200"
          aria-label="Close profile details"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Portrait column */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#D4AF62] shadow-xl mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#071426] bg-[#D4AF62]/20 border border-[#D4AF62]/50 px-3 py-1 rounded-full mb-2 font-bold">
              {member.department}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <ShieldCheck size={14} className="text-[#A98746]" />
              <span>Certified UAE Advisor</span>
            </div>
          </div>

          {/* Details column */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <h3 id="team-dialog-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#071426]">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-[#A98746] mt-0.5">
                {member.title}
              </p>
            </div>

            {/* Quote */}
            <div className="p-3.5 rounded-xl bg-gray-50 border-l-2 border-[#D4AF62] italic text-xs text-gray-700">
              &ldquo;{member.quote}&rdquo;
            </div>

            {/* Bio */}
            <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
              <p>{member.fullBio}</p>
            </div>

            {/* Areas of Expertise */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#071426] font-bold mb-2">
                Areas of Expertise
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {member.expertise.map((exp, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 size={13} className="text-[#A98746] flex-shrink-0" />
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                Languages Spoken
              </h4>
              <p className="text-xs text-[#071426] font-medium">
                {member.languages.join(" • ")}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl({
                  type: "team",
                  teamMemberName: member.name,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF62] to-[#A98746] text-[#071426] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
              >
                <MessageCircle size={15} className="fill-[#071426]" />
                <span>Enquire via WhatsApp</span>
              </a>

              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#071426] border border-gray-200 text-xs font-semibold transition-all"
                >
                  <Linkedin size={14} className="text-[#0077B5]" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

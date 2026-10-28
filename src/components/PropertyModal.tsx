"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Building,
  CheckCircle2,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { PropertyItem } from "@/lib/properties-data";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface PropertyModalProps {
  property: PropertyItem | null;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (property) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [property]);

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

  if (!property) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      onClose={onClose}
      aria-labelledby="property-dialog-title"
      className="m-auto fixed inset-0 z-50 p-4 max-w-4xl w-full focus:outline-none bg-transparent"
    >
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-[#D4AF62]/50 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto animate-fade-in text-[#071426]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/80 text-gray-700 hover:text-black hover:bg-white transition-all border border-gray-200 shadow-md"
          aria-label="Close property details"
        >
          <X size={20} />
        </button>

        {/* Gallery Carousel */}
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-6 border border-[#D4AF62]/40 shadow-md">
          <Image
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-auto">
              <button
                onClick={() =>
                  setActiveImageIndex((prev) =>
                    prev === 0 ? property.images.length - 1 : prev - 1
                  )
                }
                className="p-2 rounded-full bg-black/60 hover:bg-[#D4AF62] text-white hover:text-[#071426] transition-all"
                aria-label="Previous Image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() =>
                  setActiveImageIndex((prev) =>
                    prev === property.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="p-2 rounded-full bg-black/60 hover:bg-[#D4AF62] text-white hover:text-[#071426] transition-all"
                aria-label="Next Image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Image Dots */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeImageIndex ? "w-6 bg-[#D4AF62]" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF62]/50 text-[#071426] text-xs font-mono tracking-wider uppercase font-bold shadow-sm">
              {property.status}
            </span>
          </div>
        </div>

        {/* Header Details */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#A98746] mb-1 font-mono font-bold">
              <MapPin size={14} />
              <span>
                {property.location} • {property.subLocation}
              </span>
            </div>
            <h2 id="property-dialog-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#071426]">
              {property.title}
            </h2>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#071426]">
              {property.priceFormattedAED}
            </span>
            <span className="text-xs text-[#A98746] font-mono font-semibold">
              Approx. {property.priceFormattedUSD}
            </span>
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-gray-200">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#D4AF62]/20 text-[#A98746]">
              <Bed size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-500 font-bold">Bedrooms</p>
              <p className="text-xs sm:text-sm font-bold text-[#071426]">
                {typeof property.bedrooms === "number" ? `${property.bedrooms} Beds` : property.bedrooms}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#D4AF62]/20 text-[#A98746]">
              <Bath size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-500 font-bold">Bathrooms</p>
              <p className="text-xs sm:text-sm font-bold text-[#071426]">
                {property.bathrooms} Baths
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#D4AF62]/20 text-[#A98746]">
              <Maximize2 size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-500 font-bold">Total Area</p>
              <p className="text-xs sm:text-sm font-bold text-[#071426]">
                {property.areaSqFt.toLocaleString()} Sq.Ft.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#D4AF62]/20 text-[#A98746]">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-500 font-bold">Timeline</p>
              <p className="text-xs sm:text-sm font-bold text-[#071426] truncate">
                {property.completionYear || "Verified Status"}
              </p>
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="py-6 border-b border-gray-200 space-y-3">
          <h3 className="text-sm uppercase tracking-widest text-[#071426] font-bold">
            Property Overview
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
            {property.fullDescription}
          </p>
        </div>

        {/* Highlights & Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-gray-200">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#071426] font-bold mb-3">
              Key Features
            </h3>
            <div className="space-y-2">
              {property.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle2 size={14} className="text-[#A98746] mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#071426] font-bold mb-3">
              Community Amenities
            </h3>
            <div className="space-y-2">
              {property.amenities.map((amenity, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                  <Building size={14} className="text-[#A98746] mt-0.5 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Developer & Payment Plan Note */}
        {(property.developer || property.paymentPlan) && (
          <div className="py-4 border-b border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2 font-medium">
            {property.developer && (
              <div>
                <span className="text-[#A98746] font-bold">Developer / Tier: </span>
                {property.developer}
              </div>
            )}
            {property.paymentPlan && (
              <div>
                <span className="text-[#A98746] font-bold">Payment Structure: </span>
                {property.paymentPlan}
              </div>
            )}
          </div>
        )}

        {/* Consultation Notice */}
        <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-[#D4AF62]/40 text-[11px] text-gray-800 flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#A98746] flex-shrink-0" />
          <span>
            Rudra Properties Dubai acts as an authorized consultancy liaison. Property specifications and developer pricing are verified at time of consultation.
          </span>
        </div>

        {/* Actions Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs text-[#071426] border border-gray-300 transition-all font-semibold"
          >
            <Share2 size={14} />
            <span>{copiedLink ? "Link Copied!" : "Share Property"}</span>
          </button>

          <a
            href={getWhatsAppUrl({
              type: "property",
              propertyName: property.title,
              propertyLocation: property.location,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF62] via-[#E5C887] to-[#A98746] text-[#071426] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
          >
            <MessageCircle size={16} className="fill-[#071426]" />
            <span>WhatsApp Enquiry for this Property</span>
          </a>
        </div>
      </div>
    </dialog>
  );
}

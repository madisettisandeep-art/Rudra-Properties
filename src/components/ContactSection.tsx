"use client";

import React, { useState } from "react";
import {
  Send,
  MessageCircle,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Mail,
  Youtube,
  Instagram,
  Facebook,
} from "lucide-react";
import {
  getWhatsAppUrl,
  RUDRA_WHATSAPP_NUMBER,
  RUDRA_YOUTUBE_URL,
  RUDRA_INSTAGRAM_URL,
  RUDRA_FACEBOOK_URL,
} from "@/lib/whatsapp";

const ENQUIRY_TYPES = [
  "Buying Property",
  "Selling Property",
  "Investment Assistance",
  "Property Management",
  "General Enquiry",
];

const BUDGET_RANGES = [
  "AED 1.5M - 3M ($400K - $800K)",
  "AED 3M - 7M ($800K - $1.9M)",
  "AED 7M - 15M ($1.9M - $4M)",
  "AED 15M - 35M ($4M - $9.5M)",
  "AED 35M+ (Ultra-Prime & Palatial)",
  "Under Evaluation",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+971",
    email: "",
    enquiryType: "Buying Property",
    budget: "",
    location: "",
    message: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please provide your full name.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please provide a valid contact phone number.");
      return;
    }
    if (!formData.consent) {
      setErrorMessage("Please agree to the privacy consent to proceed.");
      return;
    }

    setLoading(true);

    try {
      const fullPhone = `${formData.countryCode} ${formData.phone.trim()}`;
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: fullPhone,
          email: formData.email.trim() || undefined,
          enquiryType: formData.enquiryType,
          budget: formData.budget || undefined,
          location: formData.location.trim() || undefined,
          message: formData.message.trim() || undefined,
          consent: formData.consent,
          source: "Contact Us Form",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. You may also contact us directly via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const fullPhone = formData.phone ? `${formData.countryCode} ${formData.phone}` : "";
    const waUrl = getWhatsAppUrl({
      formData: {
        name: formData.name,
        phone: fullPhone,
        enquiryType: formData.enquiryType,
        budget: formData.budget,
        location: formData.location,
        message: formData.message,
      },
    });
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF62]/20 border border-[#D4AF62]/50 text-[#071426] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm font-semibold">
            <Mail size={14} className="text-[#A98746]" />
            <span>Direct Client Consultation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-wide mb-4">
            LET&apos;S DISCUSS YOUR{" "}
            <span className="text-gold-gradient font-semibold">DUBAI PROPERTY GOALS</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-normal">
            Tell us what you are looking for, and our team can help you understand the next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Contact Info & Protocols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-[#D4AF62]/40 shadow-xl space-y-6 bg-transparent">
              <h3 className="font-serif text-2xl text-[#071426] font-bold">
                Personalized Dubai Advisory
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                Whether assessing prime off-plan launches, seeking private secondary residences, or coordinating overseas property management, our senior partners are available for confidential consultations.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#D4AF62]/30">
                {/* Official WhatsApp */}
                <a
                  href={getWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-transparent border border-[#D4AF62]/35 hover:border-[#D4AF62] hover:bg-white/10 transition-colors group shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-700 font-bold">
                      Official WhatsApp Channel
                    </p>
                    <p className="text-sm font-bold text-[#071426] group-hover:text-[#A98746] transition-colors">
                      {RUDRA_WHATSAPP_NUMBER}
                    </p>
                    <span className="text-[11px] text-[#25D366] font-semibold">Available for prompt enquiries</span>
                  </div>
                </a>

                {/* Official YouTube Channel */}
                <a
                  href={RUDRA_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-transparent border border-[#D4AF62]/35 hover:border-red-600 hover:bg-red-500/10 transition-colors group shadow-sm"
                  title="Subscribe to Rudra Properties on YouTube"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-600/15 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Youtube size={22} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-700 font-bold">
                      Official YouTube Channel
                    </p>
                    <p className="text-sm font-bold text-[#071426] group-hover:text-red-600 transition-colors">
                      @RudrapropertiesDubai
                    </p>
                    <span className="text-[11px] text-gray-700 font-medium">Watch luxury tours & project walkthroughs</span>
                  </div>
                </a>

                {/* Official Instagram Profile */}
                <a
                  href={RUDRA_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-transparent border border-[#D4AF62]/35 hover:border-pink-500 hover:bg-pink-500/10 transition-colors group shadow-sm"
                  title="Follow Rudra Properties on Instagram"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#F56040]/20 text-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Instagram size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-700 font-bold">
                      Official Instagram
                    </p>
                    <p className="text-sm font-bold text-[#071426] group-hover:text-pink-600 transition-colors">
                      @rudrapropertiesdubai
                    </p>
                    <span className="text-[11px] text-gray-700 font-medium">Follow daily market insights & prime launches</span>
                  </div>
                </a>

                {/* Official Facebook Profile */}
                <a
                  href={RUDRA_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-transparent border border-[#D4AF62]/35 hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-colors group shadow-sm"
                  title="Connect with Rudra Properties on Facebook"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Facebook size={22} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-700 font-bold">
                      Official Facebook Page
                    </p>
                    <p className="text-sm font-bold text-[#071426] group-hover:text-[#1877F2] transition-colors">
                      Rudra Properties Dubai
                    </p>
                    <span className="text-[11px] text-gray-700 font-medium">Community discussions & official news</span>
                  </div>
                </a>

                {/* Primary Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-transparent border border-[#D4AF62]/35">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF62]/20 text-[#A98746] flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-700 font-bold">
                      Primary Market
                    </p>
                    <p className="text-sm font-bold text-[#071426]">
                      Dubai, United Arab Emirates
                    </p>
                    <span className="text-[11px] text-gray-700 font-medium">Prime Freehold Communities</span>
                  </div>
                </div>

                {/* Response Commitment */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-transparent border border-[#D4AF62]/35">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF62]/20 text-[#A98746] flex items-center justify-center flex-shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-700 font-bold">
                      Advisory Response
                    </p>
                    <p className="text-sm font-bold text-[#071426]">
                      Prompt Consultation Within 24 Hours
                    </p>
                    <span className="text-[11px] text-gray-700 font-medium">Dedicated Senior Partner Follow-Up</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#D4AF62]/40 text-xs text-gray-800 flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#A98746] flex-shrink-0" />
                <span>
                  Strict privacy protocol: your contact details are held in strictest confidence and never disclosed to unsolicited third parties.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#D4AF62]/40 shadow-xl bg-transparent">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-[#071426] font-bold">
                    Enquiry Successfully Submitted
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#071426]">{formData.name}</strong>. Your enquiry has been received and securely logged in our system. A senior Rudra Properties advisor will review your goals and connect with you shortly.
                  </p>
                  <div className="pt-6 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          countryCode: "+971",
                          email: "",
                          enquiryType: "Buying Property",
                          budget: "",
                          location: "",
                          message: "",
                          consent: false,
                        });
                      }}
                      className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs text-[#071426] border border-gray-300 font-semibold"
                    >
                      Submit Another Enquiry
                    </button>
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF62] to-[#A98746] text-[#071426] font-bold text-xs uppercase tracking-wider shadow"
                    >
                      <MessageCircle size={15} className="fill-[#071426]" />
                      <span>Continue to WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#071426] font-bold mb-1.5">
                      Full Name <span className="text-[#A98746]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border border-[#D4AF62]/40 focus:border-[#D4AF62] rounded-xl px-4 py-3 text-sm text-[#071426] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF62] transition-colors shadow-sm font-semibold"
                    />
                  </div>

                  {/* Phone with Country Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs uppercase tracking-wider text-[#071426] font-bold mb-1.5">
                        Code
                      </label>
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="w-full bg-transparent border border-[#D4AF62]/40 focus:border-[#D4AF62] rounded-xl px-3 py-3 text-sm text-[#071426] focus:outline-none cursor-pointer shadow-sm font-semibold"
                      >
                        <option value="+971" className="bg-white text-[#071426]">+971 (UAE)</option>
                        <option value="+91" className="bg-white text-[#071426]">+91 (India)</option>
                        <option value="+44" className="bg-white text-[#071426]">+44 (UK)</option>
                        <option value="+1" className="bg-white text-[#071426]">+1 (US/CA)</option>
                        <option value="+966" className="bg-white text-[#071426]">+966 (KSA)</option>
                        <option value="+974" className="bg-white text-[#071426]">+974 (Qatar)</option>
                        <option value="+65" className="bg-white text-[#071426]">+65 (SG)</option>
                        <option value="+49" className="bg-white text-[#071426]">+49 (DE)</option>
                        <option value="+33" className="bg-white text-[#071426]">+33 (FR)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs uppercase tracking-wider text-[#071426] font-bold mb-1.5">
                        Phone Number <span className="text-[#A98746]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border border-[#D4AF62]/40 focus:border-[#D4AF62] rounded-xl px-4 py-3 text-sm text-[#071426] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF62] transition-colors shadow-sm font-semibold"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#071426] font-bold mb-1.5">
                      Email Address <span className="text-gray-500 text-[10px] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="investor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border border-[#D4AF62]/40 focus:border-[#D4AF62] rounded-xl px-4 py-3 text-sm text-[#071426] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF62] transition-colors shadow-sm font-semibold"
                    />
                  </div>

                  {/* Enquiry Type & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#071426] font-bold mb-1.5">
                        Enquiry Type
                      </label>
                      <select
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className="w-full bg-transparent border border-[#D4AF62]/40 focus:border-[#D4AF62] rounded-xl px-4 py-3 text-sm text-[#071426] focus:outline-none cursor-pointer shadow-sm font-semibold"
                      >
                        {ENQUIRY_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-white text-[#071426]">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#071426] font-bold mb-1.5">
                        Target Budget <span className="text-gray-500 text-[10px] font-normal lowercase">(optional)</span>
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-transparent border border-[#D4AF62]/40 focus:border-[#D4AF62] rounded-xl px-4 py-3 text-sm text-[#071426] focus:outline-none cursor-pointer shadow-sm font-semibold"
                      >
                        <option value="" className="bg-white text-gray-500">Select Budget Range</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b} className="bg-white text-[#071426]">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#071426] font-bold mb-1.5">
                      Preferred Community / Location <span className="text-gray-500 text-[10px] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Palm Jumeirah, Downtown Dubai, Dubai Hills..."
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-transparent border border-[#D4AF62]/40 focus:border-[#D4AF62] rounded-xl px-4 py-3 text-sm text-[#071426] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF62] transition-colors shadow-sm font-semibold"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#071426] font-bold mb-1.5">
                      Consultation Note / Message <span className="text-gray-500 text-[10px] font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share any specific requirements, timing, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border border-[#D4AF62]/40 focus:border-[#D4AF62] rounded-xl px-4 py-3 text-sm text-[#071426] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF62] transition-colors resize-none shadow-sm font-semibold"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-[#D4AF62] text-[#D4AF62] focus:ring-[#D4AF62] cursor-pointer"
                    />
                    <label htmlFor="privacyConsent" className="text-xs text-gray-800 leading-relaxed cursor-pointer font-medium">
                      I consent to Rudra Properties contacting me regarding my real estate enquiry in accordance with the Privacy Policy.
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF62] via-[#E5C887] to-[#A98746] text-[#071426] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                      <Send size={15} />
                      <span>{loading ? "Submitting Enquiry..." : "Send Enquiry"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppRedirect}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-transparent hover:bg-white/10 text-[#071426] border border-[#D4AF62]/60 hover:border-[#D4AF62] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                    >
                      <MessageCircle size={15} className="text-[#25D366]" />
                      <span>Continue on WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Lock,
  LogOut,
  Users,
  Building2,
  Mail,
  Film,
  Settings,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Clock,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { EnquiryRecord } from "@/lib/db";
import { INITIAL_PROPERTIES, PropertyItem } from "@/lib/properties-data";
import { TEAM_MEMBERS, TeamMember } from "@/lib/team-data";
import { CINEMATIC_SCENES } from "@/lib/scenes-config";
import { RUDRA_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"enquiries" | "properties" | "scenes" | "team" | "settings">("enquiries");

  // Enquiries State
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [enquiryFilter, setEnquiryFilter] = useState("all");

  // Properties State
  const [properties, setProperties] = useState<PropertyItem[]>(INITIAL_PROPERTIES);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: "",
    category: "Apartments" as const,
    location: "Downtown Dubai",
    subLocation: "",
    priceAED: 5000000,
    priceFormattedAED: "AED 5,000,000",
    priceFormattedUSD: "$1,360,000",
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1600,
    shortDescription: "",
    status: "Consultancy Available" as const,
  });

  // Settings State
  const [settings, setSettings] = useState({
    whatsappNumber: RUDRA_WHATSAPP_NUMBER,
    brandName: "RUDRA PROPERTIES",
    tagline: "Invest Today for a Brighter Tomorrow",
    market: "Dubai, UAE",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "rudra2026" || passcode.trim() === "admin") {
      setIsAuthenticated(true);
      setLoginError("");
      fetchEnquiries();
    } else {
      setLoginError("Invalid management passcode. Please try again.");
    }
  };

  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch("/api/enquiry");
      const data = await res.json();
      if (data.success && data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch {
      // Use fallback
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: EnquiryRecord["status"]) => {
    try {
      await fetch("/api/enquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
    } catch {
      // Local fallback
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to remove this enquiry?")) return;
    try {
      await fetch(`/api/enquiry?id=${id}`, { method: "DELETE" });
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const item: PropertyItem = {
      id: `prop-${Date.now()}`,
      title: newProperty.title,
      slug: newProperty.title.toLowerCase().replace(/\s+/g, "-"),
      category: newProperty.category,
      location: newProperty.location,
      subLocation: newProperty.subLocation || "Prime District",
      priceAED: newProperty.priceAED,
      priceFormattedAED: newProperty.priceFormattedAED,
      priceFormattedUSD: newProperty.priceFormattedUSD,
      bedrooms: newProperty.bedrooms,
      bathrooms: newProperty.bathrooms,
      areaSqFt: newProperty.areaSqFt,
      featured: false,
      status: newProperty.status,
      shortDescription: newProperty.shortDescription || "Prime Dubai luxury residence with panoramic city views.",
      fullDescription: "Detailed property specifications available upon confidential advisor consultation.",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      ],
      features: ["Prime freehold location", "High quality fitouts", "Panoramic views"],
      amenities: ["Swimming pool", "Fitness club", "Covered parking", "24/7 Security"],
      completionYear: "Ready for Handover",
      developer: "Tier-1 Master Developer",
    };

    setProperties([item, ...properties]);
    setShowAddProperty(false);
    setNewProperty({
      title: "",
      category: "Apartments",
      location: "Downtown Dubai",
      subLocation: "",
      priceAED: 5000000,
      priceFormattedAED: "AED 5,000,000",
      priceFormattedUSD: "$1,360,000",
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1600,
      shortDescription: "",
      status: "Consultancy Available",
    });
  };

  const handleDeleteProperty = (id: string) => {
    if (!confirm("Remove this property listing?")) return;
    setProperties(properties.filter((p) => p.id !== id));
  };

  // If not logged in, show elegant login card
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080A0F] text-[#F8F5EE] flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute w-96 h-96 bg-[#D4AF62]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-[#D4AF62]/35 shadow-2xl relative z-10 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Rudra Properties"
              width={200}
              height={100}
              className="h-14 w-auto object-contain"
            />
          </div>

          <h1 className="font-serif text-2xl font-medium text-white mb-1">
            RUDRA PROPERTIES
          </h1>
          <p className="text-xs uppercase font-mono tracking-widest text-[#D4AF62] mb-6">
            Executive Management Portal
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-xs text-red-200">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1.5">
                Management Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter passcode (default: rudra2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-black/50 border border-white/20 focus:border-[#D4AF62] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF62]"
                />
                <Lock size={16} className="absolute right-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF62] via-[#E5C887] to-[#A98746] text-[#071426] font-semibold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 transition-all"
            >
              Sign In to Management
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#D4AF62] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#F8F5EE]">
      {/* Top Admin Header */}
      <header className="glass-nav sticky top-0 z-40 px-6 py-4 border-b border-[#D4AF62]/25 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/images/logo.png" alt="Rudra Logo" width={160} height={80} className="h-9 w-auto object-contain" />
            <span className="text-xs text-[#D4AF62] font-mono uppercase tracking-wider font-semibold">
              Management Console
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-[#D4AF62] transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink size={12} />
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-gray-300 hover:text-white transition-colors border border-white/10"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pb-4 mb-8 border-b border-white/10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
              activeTab === "enquiries"
                ? "bg-[#D4AF62] text-[#071426] border-[#D4AF62]"
                : "bg-white/5 text-gray-300 border-white/10 hover:border-[#D4AF62]"
            }`}
          >
            <Mail size={14} />
            <span>Client Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("properties")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
              activeTab === "properties"
                ? "bg-[#D4AF62] text-[#071426] border-[#D4AF62]"
                : "bg-white/5 text-gray-300 border-white/10 hover:border-[#D4AF62]"
            }`}
          >
            <Building2 size={14} />
            <span>Properties ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("scenes")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
              activeTab === "scenes"
                ? "bg-[#D4AF62] text-[#071426] border-[#D4AF62]"
                : "bg-white/5 text-gray-300 border-white/10 hover:border-[#D4AF62]"
            }`}
          >
            <Film size={14} />
            <span>9 Video Scenes</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
              activeTab === "team"
                ? "bg-[#D4AF62] text-[#071426] border-[#D4AF62]"
                : "bg-white/5 text-gray-300 border-white/10 hover:border-[#D4AF62]"
            }`}
          >
            <Users size={14} />
            <span>Our Team</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
              activeTab === "settings"
                ? "bg-[#D4AF62] text-[#071426] border-[#D4AF62]"
                : "bg-white/5 text-gray-300 border-white/10 hover:border-[#D4AF62]"
            }`}
          >
            <Settings size={14} />
            <span>Settings</span>
          </button>
        </div>

        {/* Tab 1: Enquiries */}
        {activeTab === "enquiries" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-medium text-white">
                  Incoming Client Leads & Enquiries
                </h2>
                <p className="text-xs text-gray-400">
                  Real-time submissions from contact form, WhatsApp triggers, and property cards.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchEnquiries}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-gray-300"
                >
                  <RefreshCw size={13} className={loadingEnquiries ? "animate-spin" : ""} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/50 text-[#D4AF62] font-mono uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Contact Details</th>
                      <th className="p-4">Enquiry Type</th>
                      <th className="p-4">Budget / Location</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {enquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500">
                          No client enquiries logged yet.
                        </td>
                      </tr>
                    ) : (
                      enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-medium text-white">
                            <div>{enq.name}</div>
                            <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-[#D4AF62]">{enq.phone}</div>
                            {enq.email && <div className="text-gray-400 text-[11px]">{enq.email}</div>}
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white font-medium">
                              {enq.enquiryType}
                            </span>
                          </td>
                          <td className="p-4">
                            <div>{enq.budget || "Budget not specified"}</div>
                            <div className="text-[11px] text-gray-400">{enq.location || "Location open"}</div>
                          </td>
                          <td className="p-4">
                            <select
                              value={enq.status}
                              onChange={(e) =>
                                handleUpdateStatus(enq.id, e.target.value as EnquiryRecord["status"])
                              }
                              className={`text-[11px] rounded-lg px-2.5 py-1 font-mono uppercase font-semibold cursor-pointer border ${
                                enq.status === "new"
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                  : enq.status === "contacted"
                                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                  : "bg-blue-500/20 text-blue-300 border-blue-500/40"
                              }`}
                            >
                              <option value="new" className="bg-[#071426] text-white">NEW</option>
                              <option value="contacted" className="bg-[#071426] text-white">CONTACTED</option>
                              <option value="resolved" className="bg-[#071426] text-white">RESOLVED</option>
                              <option value="archived" className="bg-[#071426] text-white">ARCHIVED</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="p-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Properties */}
        {activeTab === "properties" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-medium text-white">
                  Property Portfolio Management
                </h2>
                <p className="text-xs text-gray-400">
                  Manage active listings, indicative pricing, and property specifications.
                </p>
              </div>

              <button
                onClick={() => setShowAddProperty(!showAddProperty)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4AF62] text-[#071426] font-semibold text-xs uppercase tracking-wider shadow hover:brightness-110"
              >
                <Plus size={14} />
                <span>{showAddProperty ? "Cancel" : "Add Property"}</span>
              </button>
            </div>

            {/* Add Property Form Drawer */}
            {showAddProperty && (
              <form
                onSubmit={handleAddProperty}
                className="glass-panel p-6 rounded-2xl border border-[#D4AF62]/40 space-y-4"
              >
                <h3 className="font-serif text-lg text-white font-medium">Add New Property Reference</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marina Horizon Residence"
                      value={newProperty.title}
                      onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Category</label>
                    <select
                      value={newProperty.category}
                      onChange={(e) =>
                        setNewProperty({ ...newProperty, category: e.target.value as any })
                      }
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-2.5 text-white"
                    >
                      <option value="Apartments">Apartments</option>
                      <option value="Villas">Villas</option>
                      <option value="Townhouses">Townhouses</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dubai Marina"
                      value={newProperty.location}
                      onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Price (AED)</label>
                    <input
                      type="text"
                      required
                      placeholder="AED 5,000,000"
                      value={newProperty.priceFormattedAED}
                      onChange={(e) => setNewProperty({ ...newProperty, priceFormattedAED: e.target.value })}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Price (USD)</label>
                    <input
                      type="text"
                      required
                      placeholder="$1,360,000"
                      value={newProperty.priceFormattedUSD}
                      onChange={(e) => setNewProperty({ ...newProperty, priceFormattedUSD: e.target.value })}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      required
                      value={newProperty.bedrooms}
                      onChange={(e) => setNewProperty({ ...newProperty, bedrooms: Number(e.target.value) })}
                      className="w-full bg-black/40 border border-white/20 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProperty(false)}
                    className="px-4 py-2 rounded-lg bg-white/10 text-xs text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#D4AF62] text-[#071426] text-xs font-semibold"
                  >
                    Save Property Listing
                  </button>
                </div>
              </form>
            )}

            {/* Property Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3">
                      <Image
                        src={prop.images[0]}
                        alt={prop.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#D4AF62]">
                        {prop.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-medium text-white line-clamp-1">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-gray-400">{prop.location}</p>
                    <p className="text-sm font-semibold text-[#D4AF62] mt-2">
                      {prop.priceFormattedAED}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs mt-3">
                    <span className="text-gray-400 text-[11px]">{prop.status}</span>
                    <button
                      onClick={() => handleDeleteProperty(prop.id)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 9 Video Scenes */}
        {activeTab === "scenes" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif text-2xl font-medium text-white">
                The 9 Cinematic Homepage Video Scenes
              </h2>
              <p className="text-xs text-gray-400">
                Configured video files, chapter timings, headings, and CTAs across the 650vh cinematic scroll journey.
              </p>
            </div>

            <div className="space-y-4">
              {CINEMATIC_SCENES.map((scene) => (
                <div
                  key={scene.id}
                  className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF62]/20 text-[#D4AF62] flex items-center justify-center font-mono font-bold flex-shrink-0">
                      {scene.chapterNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#D4AF62] uppercase tracking-wider">
                          {scene.durationLabel}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {scene.videoSrc}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-medium text-white mt-0.5">
                        {scene.title}
                      </h3>
                      <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                        {scene.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                      Active Scene
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Team */}
        {activeTab === "team" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif text-2xl font-medium text-white">
                Advisory Leadership & Team
              </h2>
              <p className="text-xs text-gray-400">
                Team profiles featured in the custom directional-arrow interactive section.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEAM_MEMBERS.map((m) => (
                <div
                  key={m.id}
                  className="glass-card p-5 rounded-2xl border border-white/10 flex items-start gap-4"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-[#D4AF62]/40 flex-shrink-0">
                    <Image src={m.image} alt={m.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base font-medium text-white">{m.name}</h3>
                    <p className="text-xs text-[#D4AF62]">{m.title}</p>
                    <span className="text-[10px] font-mono text-gray-400 block mb-2">{m.department}</span>
                    <p className="text-xs text-gray-300 line-clamp-2">{m.experienceSummary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === "settings" && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <div>
              <h2 className="font-serif text-2xl font-medium text-white">
                Consultancy Configuration & Channels
              </h2>
              <p className="text-xs text-gray-400">
                Official contact numbers, brand metadata, and primary market settings.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Official WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  disabled
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white opacity-80"
                />
                <p className="text-[10px] text-[#D4AF62] mt-1 font-mono">
                  Configured across all property and enquiry triggers (+91 81257 41014).
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={settings.brandName}
                  disabled
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white opacity-80"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  disabled
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white opacity-80"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                  Primary Market
                </label>
                <input
                  type="text"
                  value={settings.market}
                  disabled
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white opacity-80"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


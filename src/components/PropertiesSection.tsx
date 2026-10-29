"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Filter,
  Search,
  MessageCircle,
  ExternalLink,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { INITIAL_PROPERTIES, PropertyItem } from "@/lib/properties-data";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useDebounce } from "@/lib/hooks";

// Split code into chunks: Dynamically import heavy modal on-demand
const PropertyModal = dynamic(() => import("./PropertyModal"), {
  ssr: false,
});

const CATEGORIES = ["All Properties", "Apartments", "Villas", "Townhouses", "Commercial"];
const INITIAL_PAGE_SIZE = 6;

// Reusable Loading Skeleton for Property Card
function PropertyCardSkeleton() {
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-[#D4AF62]/20 flex flex-col justify-between shadow-lg bg-transparent animate-pulse">
      <div className="h-64 w-full skeleton-shimmer" />
      <div className="p-6 space-y-4">
        <div className="h-4 w-1/3 rounded-full skeleton-shimmer" />
        <div className="h-6 w-3/4 rounded-full skeleton-shimmer" />
        <div className="h-10 w-full rounded-xl skeleton-shimmer" />
        <div className="h-12 w-full rounded-2xl skeleton-shimmer" />
      </div>
    </div>
  );
}

// Memoized Property Card to eliminate unnecessary re-renders
const PropertyCard = React.memo(function PropertyCard({
  prop,
  onOpenModal,
}: {
  prop: PropertyItem;
  onOpenModal: (p: PropertyItem) => void;
}) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-[#D4AF62]/35 group flex flex-col justify-between shadow-xl transition-all duration-500 hover:-translate-y-1.5 bg-transparent">
      <div>
        {/* Image Showcase with Responsive WebP/AVIF Image Compression */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={prop.images[0]}
            alt={prop.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90" />

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-[#D4AF62]/40 text-white text-[10px] font-mono uppercase tracking-wider font-bold shadow-sm">
              {prop.category}
            </span>
            {prop.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF62] to-[#A98746] text-[#071426] text-[10px] font-bold uppercase tracking-wider shadow-md">
                <Sparkles size={11} />
                Featured
              </span>
            )}
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-mono text-gray-200 uppercase tracking-wider">
                Indicative Price
              </p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                {prop.priceFormattedAED}
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#071426] bg-[#D4AF62] font-bold px-2 py-0.5 rounded shadow">
              {prop.priceFormattedUSD}
            </span>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#A98746] font-mono mb-1 font-semibold">
              <MapPin size={13} />
              <span className="truncate">
                {prop.location} • {prop.subLocation}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#071426] group-hover:text-[#A98746] transition-colors line-clamp-1">
              {prop.title}
            </h3>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-normal">
            {prop.shortDescription}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#D4AF62]/25 text-center text-xs">
            <div className="flex flex-col items-center">
              <Bed size={15} className="text-[#A98746] mb-1" />
              <span className="text-[#071426] font-semibold">
                {typeof prop.bedrooms === "number" ? `${prop.bedrooms} Bed` : prop.bedrooms}
              </span>
            </div>
            <div className="flex flex-col items-center border-x border-[#D4AF62]/25">
              <Bath size={15} className="text-[#A98746] mb-1" />
              <span className="text-[#071426] font-semibold">{prop.bathrooms} Bath</span>
            </div>
            <div className="flex flex-col items-center">
              <Maximize2 size={15} className="text-[#A98746] mb-1" />
              <span className="text-[#071426] font-semibold">{prop.areaSqFt.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0 flex items-center gap-3">
        <button
          onClick={() => onOpenModal(prop)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-transparent hover:bg-white/10 text-[#071426] text-xs font-semibold border border-[#D4AF62]/40 hover:border-[#D4AF62] transition-all shadow-sm"
        >
          <span>View Details</span>
          <ExternalLink size={13} className="text-[#A98746]" />
        </button>

        <a
          href={getWhatsAppUrl({
            type: "property",
            propertyName: prop.title,
            propertyLocation: prop.location,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF62] to-[#A98746] text-[#071426] text-xs font-bold uppercase tracking-wider shadow hover:brightness-105 transition-all flex-shrink-0"
          title="WhatsApp Enquiry for this property"
        >
          <MessageCircle size={15} className="fill-[#071426]" />
          <span>Enquire</span>
        </a>
      </div>
    </div>
  );
});

export default function PropertiesSection() {
  const [properties] = useState<PropertyItem[]>(INITIAL_PROPERTIES);
  const [selectedCategory, setSelectedCategory] = useState("All Properties");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchInput, setSearchInput] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
  const [activeModalProperty, setActiveModalProperty] = useState<PropertyItem | null>(null);

  // Debounced input handler (250ms) to eliminate keystroke lag
  const debouncedSearch = useDebounce(searchInput, 250);

  // Extract distinct locations
  const locations = useMemo(() => {
    const locs = Array.from(new Set(properties.map((p) => p.location)));
    return ["All Locations", ...locs];
  }, [properties]);

  // Filtered properties with memoization
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Category filter
      if (selectedCategory !== "All Properties" && p.category !== selectedCategory) {
        return false;
      }
      // Location filter
      if (selectedLocation !== "All Locations" && p.location !== selectedLocation) {
        return false;
      }
      // Debounced search query
      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query);
        const matchesSub = p.subLocation.toLowerCase().includes(query);
        const matchesFeat = p.features?.some((h) => h.toLowerCase().includes(query));
        const matchesAmen = p.amenities?.some((h) => h.toLowerCase().includes(query));
        if (!matchesTitle && !matchesLoc && !matchesSub && !matchesFeat && !matchesAmen) return false;
      }
      return true;
    });
  }, [properties, selectedCategory, selectedLocation, debouncedSearch]);

  // Paginated list slice for fast initial render
  const paginatedProperties = useMemo(() => {
    return filteredProperties.slice(0, visibleCount);
  }, [filteredProperties, visibleCount]);

  const hasMore = visibleCount < filteredProperties.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 6);
  }, []);

  const handleOpenModal = useCallback((prop: PropertyItem) => {
    setActiveModalProperty(prop);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModalProperty(null);
  }, []);

  return (
    <section
      id="properties"
      className="content-visibility-auto relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF62]/20 border border-[#D4AF62]/50 text-[#071426] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm font-semibold">
            <Building2 size={14} className="text-[#A98746]" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-wide mb-4">
            EXPLORE <span className="text-gold-gradient font-semibold">DUBAI REAL ESTATE</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-normal">
            Prime residential towers, signature waterfront estates, and institutional commercial spaces across Dubai.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-6 rounded-3xl border border-[#D4AF62]/40 mb-12 shadow-xl bg-transparent">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setVisibleCount(INITIAL_PAGE_SIZE);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
                      isActive
                        ? "bg-[#D4AF62] text-[#071426] border-[#D4AF62] shadow-md"
                        : "bg-transparent text-[#071426] border-[#D4AF62]/40 hover:border-[#D4AF62] hover:bg-[#D4AF62]/20"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Location & Search Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Location Select */}
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setVisibleCount(INITIAL_PAGE_SIZE);
                  }}
                  className="w-full sm:w-48 appearance-none bg-transparent border border-[#D4AF62]/40 rounded-full px-4 py-2 text-xs text-[#071426] focus:outline-none focus:ring-1 focus:ring-[#D4AF62] cursor-pointer shadow-sm font-semibold"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="bg-white text-[#071426]">
                      {loc}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#A98746]">
                  <Filter size={13} />
                </div>
              </div>

              {/* Debounced Search Field */}
              <div className="relative flex-1 sm:flex-initial">
                <input
                  type="text"
                  placeholder="Search location, title..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setVisibleCount(INITIAL_PAGE_SIZE);
                  }}
                  className="w-full sm:w-60 bg-transparent border border-[#D4AF62]/40 rounded-full pl-9 pr-4 py-2 text-xs text-[#071426] placeholder-gray-500 focus:outline-none focus:border-[#D4AF62] shadow-sm font-medium"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-[#A98746]" />
              </div>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProperties.map((prop) => (
            <PropertyCard key={prop.id} prop={prop} onOpenModal={handleOpenModal} />
          ))}
        </div>

        {/* Paginate Large Lists: Smooth "Load More" Control */}
        {hasMore && (
          <div className="mt-12 text-center flex flex-col items-center gap-3">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF62] via-[#E5C887] to-[#A98746] text-[#071426] text-xs font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Explore More Properties</span>
              <ChevronDown size={16} />
            </button>
            <p className="text-xs text-gray-600 font-mono">
              Showing {paginatedProperties.length} of {filteredProperties.length} curated residences
            </p>
          </div>
        )}

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="glass-panel p-12 rounded-3xl text-center max-w-md mx-auto my-12 border border-[#D4AF62]/40">
            <Building2 size={36} className="text-[#A98746] mx-auto mb-4 opacity-75" />
            <h3 className="font-serif text-xl font-bold text-[#071426] mb-2">No Properties Found</h3>
            <p className="text-xs text-gray-600 mb-6 font-normal">
              No matching luxury residences found for your selected criteria. Try resetting your search filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Properties");
                setSelectedLocation("All Locations");
                setSearchInput("");
                setVisibleCount(INITIAL_PAGE_SIZE);
              }}
              className="px-6 py-2.5 rounded-full bg-[#D4AF62] text-[#071426] text-xs font-bold uppercase tracking-wider shadow"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Modal - Loaded on demand */}
      {activeModalProperty && (
        <PropertyModal property={activeModalProperty} onClose={handleCloseModal} />
      )}
    </section>
  );
}

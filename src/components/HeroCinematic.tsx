"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { CINEMATIC_SCENES } from "@/lib/scenes-config";

export default function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Performance guards against unnecessary re-renders & layout thrashing
  const activeIndexRef = useRef(0);
  const isTickingRef = useRef(false);

  // Throttled scroll handling with requestAnimationFrame (60/120fps lock)
  useEffect(() => {
    const handleScroll = () => {
      if (isTickingRef.current) return;
      isTickingRef.current = true;

      window.requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const containerHeight = containerRef.current.offsetHeight;
          const windowHeight = window.innerHeight;

          const totalScrollable = containerHeight - windowHeight;
          const currentScroll = -rect.top;

          if (totalScrollable > 0) {
            const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
            const sceneIndex = Math.min(
              CINEMATIC_SCENES.length - 1,
              Math.floor(progress * CINEMATIC_SCENES.length)
            );

            // ONLY trigger state re-render if the scene actually changed!
            if (sceneIndex !== activeIndexRef.current) {
              activeIndexRef.current = sceneIndex;
              setActiveSceneIndex(sceneIndex);
            }
          }
        }
        isTickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync mute and play across video elements with zero redundant calls
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (vid.muted !== isMuted) {
          vid.muted = isMuted;
        }
        if (idx === activeSceneIndex) {
          if (vid.paused) {
            vid.play().catch(() => {});
          }
        } else {
          if (!vid.paused) {
            vid.pause();
          }
        }
      }
    });
  }, [activeSceneIndex, isMuted]);

  // Jump to specific scene with memoized callback
  const jumpToScene = useCallback((index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = containerHeight - windowHeight;
    const targetScroll = containerTop + (index / CINEMATIC_SCENES.length) * totalScrollable + 50;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full bg-black z-20"
      style={{ height: "650vh" }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 
          Render 9 Clean HD Video Layers with Adaptive Bandwidth Preloading
          Zero text overlays, zero dark cards, zero background bleed.
        */}
        <div className="absolute inset-0 w-full h-full bg-black">
          {CINEMATIC_SCENES.map((scene, idx) => {
            // Adaptive buffering: Only preload the active scene and immediate neighbors
            const isNearActive = Math.abs(idx - activeSceneIndex) <= 1;
            const preloadStrategy = idx === 0 ? "auto" : isNearActive ? "auto" : "none";

            return (
              <video
                key={scene.id}
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={scene.videoSrc}
                muted={isMuted}
                autoPlay={idx === 0}
                loop
                playsInline
                preload={preloadStrategy}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  idx === activeSceneIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              />
            );
          })}
        </div>

        {/* 
          Only Simple Line Slides Floating Cleanly Without Any Enclosing Structure/Box
          Super hairline-thin lines (negligible & sleek)
          Scoped strictly to the Hero Section (absolute inside sticky hero container)
        */}
        <div className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 pointer-events-auto">
          {/* Simple ultra-thin vertical line slides */}
          <div className="flex flex-col items-center gap-1.5">
            {CINEMATIC_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => jumpToScene(idx)}
                className="group py-0.5 focus:outline-none"
                aria-label={`Slide ${idx + 1}`}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    idx === activeSceneIndex
                      ? "w-[1.5px] h-6 sm:h-7 bg-[#D4AF62] shadow-[0_0_6px_rgba(212,175,98,0.8)]"
                      : "w-[1px] h-3 sm:h-3.5 bg-white/30 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mute/Unmute Icon Floating Cleanly Directly Below the Lines */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="mt-3 p-1 text-white/50 hover:text-[#D4AF62] transition-colors focus:outline-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
            title={isMuted ? "Unmute audio" : "Mute audio"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}

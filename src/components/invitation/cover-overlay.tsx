"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEDIA } from "@/lib/invitation-data";

interface CoverOverlayProps {
  opening: boolean;
  onOpen: () => void;
}

export default function CoverOverlay({ opening, onOpen }: CoverOverlayProps) {
  // Video is cached locally, so it is ready almost instantly. Show it with a
  // quick fade the moment it can play; a soft spinner covers the tiny wait.
  const [videoReady, setVideoReady] = useState(false);
  // The Open button appears once the video has been showing for ~1 second,
  // then stays on screen until it is tapped.
  const [showOpen, setShowOpen] = useState(false);

  useEffect(() => {
    if (!videoReady) return;
    const t = window.setTimeout(() => setShowOpen(true), 1000);
    return () => window.clearTimeout(t);
  }, [videoReady]);

  // Fallback: if the video somehow never becomes playable, still reveal the
  // button after a few seconds so the invitation is never stuck.
  useEffect(() => {
    const t = window.setTimeout(() => setShowOpen(true), 5000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex justify-center overflow-hidden bg-maroon-dark transition-all duration-700 ease-out",
        opening ? "pointer-events-none scale-[1.03] opacity-0" : "opacity-100"
      )}
      aria-hidden={opening}
    >
      <div className="relative h-full w-full max-w-[430px] overflow-hidden bg-[#efe0d0]">
        <video
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            videoReady ? "opacity-100" : "opacity-0"
          )}
          src={MEDIA.coverVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          aria-label="Video pembuka undangan pernikahan Maestro dan Septi"
        />

        {!videoReady && (
          <div
            className="absolute inset-0 grid place-items-center bg-[#efe0d0]"
            role="status"
            aria-label="Memuat undangan"
          >
            <Loader2
              className="h-7 w-7 animate-spin text-maroon/50"
              strokeWidth={2}
              aria-hidden
            />
          </div>
        )}

        {/* Soft vignette so the button pops */}
        <div className="absolute inset-x-0 top-[56%] h-40 bg-gradient-to-b from-transparent via-[#efe0d0]/35 to-transparent" />

        {/* Positioned right below the "Kepada Yth. Bapak/Ibu/Saudara/i" text baked into the video (~58% height) */}
        <div
          className={cn(
            "absolute inset-x-0 top-[63%] z-10 flex flex-col items-center px-8 transition-all duration-1000 ease-out",
            opening
              ? "pointer-events-none translate-y-8 opacity-0"
              : showOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-6 opacity-0"
          )}
        >
          {showOpen && (
            <button
              type="button"
              onClick={onOpen}
              className="animate-pulse-soft rounded-full bg-maroon px-5 py-1.5 font-body text-xs font-medium uppercase tracking-[0.25em] text-white ring-1 ring-white/40 transition-colors duration-200 hover:bg-maroon-deep active:scale-95"
              aria-label="Buka undangan"
            >
              Open
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

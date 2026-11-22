"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CoverOverlay from "./cover-overlay";
import OpeningSequence from "./opening-sequence";
import FullscreenVideoSection from "./fullscreen-video-section";
import BrideGroomSection from "./bride-groom-section";
import EventsSection from "./events-section";
import LoveStorySection from "./love-story-section";
import GallerySection from "./gallery-section";
import GiftRsvpSection from "./gift-rsvp-section";
import { MEDIA } from "@/lib/invitation-data";

type CoverPhase = "cover" | "opening" | "done";

/**
 * The Wedding of Maestro & Septi — 10.07.2027
 *
 * Slide 1  cover video + Open button (scroll locked, disappears after Open)
 * Slide 2  3-session opening sequence (video -> video -> image), full page
 * Slide 3  couple photo & prayer (video, freezes on last frame)
 * Slide 4  bride & groom
 * Slide 5  event details (maroon wallpaper)
 * Slide 6  love story (video, freezes on last frame)
 * Slide 7  our gallery
 * Slide 8  gift & RSVP (wallpaper stays still while scrolling)
 * Slide 9  closing (video, freezes on last frame)
 *
 * Slides 2..9 are simply reached by smooth scrolling down.
 */
export default function Invitation() {
  const [coverPhase, setCoverPhase] = useState<CoverPhase>("cover");
  const musicRef = useRef<HTMLAudioElement>(null);

  const handleOpen = useCallback(() => {
    setCoverPhase("opening");
    // Background music starts as the guest enters slide 2. The click itself
    // is the user gesture that allows audio playback.
    void musicRef.current?.play().catch(() => {
      /* ignore — retried silently, music is decorative */
    });
    window.setTimeout(() => setCoverPhase("done"), 750);
  }, []);

  // Never let the browser restore a previous scroll position (e.g. landing on
  // Our Gallery after a reload) — the invitation always starts at the top so
  // that opening it reveals slide 2 in order.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  // Lock page scroll while the cover is shown; slide 1 never appears again
  // after Open within this visit.
  useEffect(() => {
    const locked = coverPhase !== "done";
    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.body.style.overflow = locked ? "hidden" : "";
    if (!locked) {
      // Instant (not the global smooth behaviour) so we land straight on slide 2
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [coverPhase]);

  return (
    <main className="relative min-h-svh bg-maroon-dark font-body">
      {/* Background music — starts playing when the guest opens the invitation */}
      <audio
        ref={musicRef}
        src="/media/background-music.mp3"
        loop
        preload="auto"
        className="hidden"
      />
      {/* Desktop backdrop: keeps the mobile-designed column centered */}
      <div aria-hidden className="fixed inset-0 hidden sm:block">
        <img
          src={MEDIA.wallpaperRed}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-25 blur-[6px]"
        />
        <div className="absolute inset-0 bg-maroon-dark/70" />
      </div>

      <div className="relative mx-auto w-full max-w-[430px] shadow-[0_0_80px_rgba(0,0,0,0.55)]">
        {/* Slide 2 */}
        <OpeningSequence active={coverPhase !== "cover"} />

        {/* Slide 3 — foto & doa */}
        <FullscreenVideoSection
          src={MEDIA.blessingVideo}
          ariaLabel="Foto kami dan doa"
          bgColor="#eed6c4"
        />

        {/* Slide 4 — bride & groom */}
        <BrideGroomSection />

        {/* Slide 5 — detail acara */}
        <EventsSection />

        {/* Slide 6 — love story */}
        <LoveStorySection />

        {/* Slide 7 — our gallery */}
        <GallerySection />

        {/* Slide 8 — gift & rsvp */}
        <GiftRsvpSection />

        {/* Slide 9 — penutup */}
        <FullscreenVideoSection
          src={MEDIA.closingVideo}
          ariaLabel="Penutup undangan"
          bgColor="#f2e0d0"
        />
      </div>

      {/* Slide 1 — cover */}
      {coverPhase !== "done" && (
        <CoverOverlay
          opening={coverPhase === "opening"}
          onOpen={handleOpen}
        />
      )}
    </main>
  );
}

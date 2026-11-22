"use client";

import { usePlayInView } from "@/hooks/use-play-in-view";
import { MEDIA } from "@/lib/invitation-data";

/**
 * Slide 6 — Love Story. Rendered at the video's natural aspect ratio and
 * plays exactly once when scrolled into view; when the duration ends it
 * stops (freezes) on the very last frame instead of looping.
 */
export default function LoveStorySection() {
  const videoRef = usePlayInView(0.3);

  return (
    <section
      aria-label="Kisah cinta kami"
      className="relative w-full overflow-hidden bg-[#f6e7da]"
    >
      <video
        ref={videoRef}
        src={MEDIA.loveStoryVideo}
        muted
        playsInline
        preload="metadata"
        className="block h-auto w-full"
        style={{ aspectRatio: "1080 / 2578" }}
        aria-label="Video kisah cinta Maestro dan Septi"
      />
    </section>
  );
}

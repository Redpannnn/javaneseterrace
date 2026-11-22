"use client";

import { usePlayInView } from "@/hooks/use-play-in-view";

interface FullscreenVideoSectionProps {
  src: string;
  ariaLabel: string;
  /** Background color that blends with the video edges (letterbox-free look) */
  bgColor?: string;
}

/**
 * Full-page video section (100svh). The video keeps its own aspect ratio
 * (object-contain) so no part of the design is ever cropped, plays once
 * when scrolled into view and freezes on its last frame.
 */
export default function FullscreenVideoSection({
  src,
  ariaLabel,
  bgColor = "#efe0d0",
}: FullscreenVideoSectionProps) {
  const videoRef = usePlayInView();

  return (
    <section
      aria-label={ariaLabel}
      className="relative h-svh overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-contain"
      />
    </section>
  );
}

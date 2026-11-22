"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplays a muted inline video when it scrolls into view,
 * pauses when it leaves the viewport, and freezes on the last frame
 * once it has ended (no looping).
 */
export function usePlayInView(threshold = 0.35) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          if (video.paused && !video.ended) {
            video.play().catch(() => {
              /* ignore autoplay rejection */
            });
          }
        } else if (!video.ended) {
          video.pause();
        }
      },
      { threshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold]);

  return videoRef;
}

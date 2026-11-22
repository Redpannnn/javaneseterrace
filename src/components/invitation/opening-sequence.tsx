"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MEDIA } from "@/lib/invitation-data";

interface OpeningSequenceProps {
  /** Starts the 3-session playback once the guest presses Open */
  active: boolean;
}

/**
 * Slide 2 — one full-page section that plays 3 sessions in sequence:
 * session 1 video -> session 2 video -> session 3 image (stays until the end).
 */
export default function OpeningSequence({ active }: OpeningSequenceProps) {
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Play session 1 as soon as the invitation is opened
  useEffect(() => {
    if (!active) return;
    video1Ref.current?.play().catch(() => {
      /* ignore — muted autoplay should always succeed */
    });
  }, [active]);

  // Advance the sequence: when a session's duration ends, move to the next one
  useEffect(() => {
    if (stage === 2) {
      video2Ref.current?.play().catch(() => {});
    }
    if (stage === 3) {
      video1Ref.current?.pause();
      video2Ref.current?.pause();
    }
  }, [stage]);

  return (
    <section
      aria-label="Pembukaan undangan"
      className="relative h-svh overflow-hidden bg-[#efe0d0]"
    >
      {/* Session 1 */}
      <video
        ref={video1Ref}
        src={MEDIA.seqVideo1}
        muted
        playsInline
        preload="auto"
        onEnded={() => setStage((s) => (s === 1 ? 2 : s))}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          stage === 1 ? "opacity-100" : "opacity-0"
        )}
        aria-label="Sesi pembuka satu"
      />

      {/* Session 2 */}
      <video
        ref={video2Ref}
        src={MEDIA.seqVideo2}
        muted
        playsInline
        preload="auto"
        onEnded={() => setStage((s) => (s === 2 ? 3 : s))}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          stage === 2 ? "opacity-100" : "opacity-0"
        )}
        aria-label="Sesi pembuka dua"
      />

      {/* Session 3 — stays visible until the end */}
      <img
        src={MEDIA.seqImage3}
        alt="The Wedding of Maestro & Septi, 10 Juli 2027"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          stage === 3 ? "opacity-100" : "opacity-0"
        )}
      />
    </section>
  );
}

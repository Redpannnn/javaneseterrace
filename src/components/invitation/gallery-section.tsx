"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEDIA } from "@/lib/invitation-data";

/**
 * Slide 7 — Our Gallery. Cream-tinted cover wallpaper background, a large
 * preview with prev/next arrows and a single-row thumbnail strip; tapping a
 * thumbnail shows it in the large preview.
 */
export default function GallerySection() {
  const photos = MEDIA.galleryPhotos;
  const [index, setIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const showPrev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const showNext = () => setIndex((i) => (i + 1) % photos.length);

  // Keep the active thumbnail visible in the one-row strip. Scrolling is done
  // manually on the strip itself (horizontal only) — scrollIntoView would also
  // scroll the whole page down to this section, which broke the opening order.
  useEffect(() => {
    const strip = thumbsRef.current;
    const activeThumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !activeThumb) return;
    const target =
      activeThumb.offsetLeft - (strip.clientWidth - activeThumb.clientWidth) / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [index]);

  return (
    <section
      aria-label="Galeri foto"
      className="relative w-full overflow-hidden bg-cream"
    >
      <img
        src={MEDIA.galleryBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* #f1dccd tint at 85% opacity over the wallpaper */}
      <div className="absolute inset-0 bg-[#f1dccd]/85" aria-hidden />

      <div className="relative z-10 flex flex-col items-center gap-6 px-5 py-14">
        <h2 className="animate-fade-in font-script text-[40px] leading-tight text-maroon-deep drop-shadow-sm">
          Our Gallery
        </h2>

        {/* Large preview */}
        <div className="relative w-full">
          <div
            key={index}
            className="animate-fade-in overflow-hidden rounded-2xl shadow-[0_18px_45px_rgba(43,11,16,0.28)] ring-1 ring-maroon/15"
          >
            <img
              src={photos[index]}
              alt={`Foto prewedding Maestro & Septi ${index + 1} dari ${photos.length}`}
              className="aspect-[2/3] w-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={showPrev}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-maroon-deep shadow-md backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Foto berikutnya"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-maroon-deep shadow-md backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <span className="absolute bottom-3 right-3 rounded-full bg-maroon-deep/70 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur">
            {index + 1} / {photos.length}
          </span>
        </div>

        {/* One-row thumbnail strip */}
        <div
          ref={thumbsRef}
          role="listbox"
          aria-label="Pilih foto galeri"
          className="scrollbar-thin flex w-full gap-2 overflow-x-auto rounded-xl pb-1"
        >
          {photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              role="option"
              aria-selected={i === index}
              aria-label={`Lihat foto ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-20 w-[54px] flex-none overflow-hidden rounded-lg transition-all duration-200",
                i === index
                  ? "opacity-100 ring-2 ring-maroon ring-offset-2 ring-offset-[#f1dccd]"
                  : "opacity-70 ring-1 ring-maroon/15 hover:opacity-100"
              )}
            >
              <img
                src={photo}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

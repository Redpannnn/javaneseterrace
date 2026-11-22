import { MEDIA } from "@/lib/invitation-data";

/**
 * Slide 5 — Event details. Maroon wayang wallpaper background with the two
 * transparent arch-shaped event cards (Akad Nikah & Resepsi) stacked below
 * each other.
 */
export default function EventsSection() {
  return (
    <section
      aria-label="Detail acara"
      className="relative w-full overflow-hidden bg-maroon"
    >
      <img
        src={MEDIA.wallpaperRed}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-16 sm:py-20">
        <img
          src={MEDIA.eventAkad}
          alt="Akad Nikah — Sabtu, 10 Juli 2027, Pukul 08.00 - 09.00 WIB, Tempat: Kediaman Mempelai Wanita, Jl. Pondok Indah, Pademangan, Jakarta Utara"
          className="w-full max-w-[330px] drop-shadow-[0_14px_30px_rgba(43,11,16,0.5)]"
          loading="lazy"
        />
        <img
          src={MEDIA.eventResepsi}
          alt="Resepsi — Sabtu, 10 Juli 2027, Pukul 09.00 - Selesai, Tempat: Kediaman Mempelai Wanita, Jl. Pondok Indah, Pademangan, Jakarta Utara"
          className="w-full max-w-[330px] drop-shadow-[0_14px_30px_rgba(43,11,16,0.5)]"
          loading="lazy"
        />
      </div>
    </section>
  );
}

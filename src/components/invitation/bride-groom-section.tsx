import { MEDIA } from "@/lib/invitation-data";

/**
 * Slide 4 — Bride & Groom. Rendered at its natural aspect ratio so the
 * complete design (names, parents, portraits) is always fully visible.
 */
export default function BrideGroomSection() {
  return (
    <section
      aria-label="Mempelai"
      className="relative w-full overflow-hidden bg-[#f5e5d6]"
    >
      <img
        src={MEDIA.brideGroomImage}
        alt="Bride & Groom — Maestro Ade Pratama, putra dari Bapak Arif & Ibu Dewi, dan Farida Septiani, putri dari Bapak Anto & Ibu Umi"
        className="block h-auto w-full"
        style={{ aspectRatio: "656 / 1600" }}
        loading="lazy"
      />
    </section>
  );
}

export const MEDIA = {
  // Videos are cached locally in /public/media so they appear instantly
  // (previously streamed from imglinkv-3.vercel.app which loaded slowly).

  // Slide 1 — cover video (looping)
  coverVideo: "/media/cover-video.mp4",

  // Slide 2 — opening sequence: video 1 -> video 2 -> image
  seqVideo1: "/media/seq-video-1.mp4",
  seqVideo2: "/media/seq-video-2.mp4",
  seqImage3:
    "https://ik.imagekit.io/au8q7zdvt/JAVANESE%20TERRACE/SLIDE%202-3%20JAVANESE%20TERRACE.jpg?tr=f-auto,q-80",

  // Slide 3 — couple photo + prayer (video, freeze at last frame)
  blessingVideo: "/media/blessing.mp4",

  // Slide 4 — bride & groom
  brideGroomImage:
    "https://ik.imagekit.io/au8q7zdvt/JAVANESE%20TERRACE/SLIDE%204%20JAVANESE%20TERRACE.jpg?tr=f-auto,q-80",

  // Slide 5 — event details
  wallpaperRed:
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-REDD-BACK-SCALED-PII.png",
  eventAkad:
    "https://ik.imagekit.io/au8q7zdvt/JAVANESE%20TERRACE/SLIDE%205-1%20JAVANESE%20TERRACE.png",
  eventResepsi:
    "https://ik.imagekit.io/au8q7zdvt/JAVANESE%20TERRACE/SLIDE%205-2%20JAVANESE%20TERRACE.png",

  // Slide 6 — love story (video, freeze at last frame)
  loveStoryVideo: "/media/love-story.mp4",

  // Slide 7 — gallery
  galleryBg:
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-CVR-MOBILE-PII.webp",
  galleryPhotos: [
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-1-1.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-14.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-13.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-12.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-11.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-9-1.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-8-1.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-7-1.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-6-1.jpg",
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-24SK1173-PII-4-1.jpg",
  ],

  // Slide 8 — gift & rsvp cards
  cardBg:
    "https://inv.punakawandigital.id/wp-content/uploads/2026/06/SUJA-ACARA-BG2-PII.webp",

  // Slide 9 — closing (video, freeze at last frame)
  closingVideo: "/media/closing.mp4",
} as const;

export const GIFT = {
  bank: "Bank BCA",
  accountNumber: "12345678",
  accountName: "a.n Maestro Ade Pratama",
} as const;

export const ATTENDANCE_OPTIONS = ["Hadir", "Tidak Hadir", "Belum Pasti"] as const;

export type AttendanceValue = (typeof ATTENDANCE_OPTIONS)[number];

export interface WishItem {
  id: string;
  name: string;
  attendance: string;
  message: string;
  createdAt: string;
}

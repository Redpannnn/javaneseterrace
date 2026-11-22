"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Copy,
  Gift,
  HeartHandshake,
  Loader2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  ATTENDANCE_OPTIONS,
  GIFT,
  MEDIA,
  type WishItem,
} from "@/lib/invitation-data";

/**
 * Slide 8 — Gift & RSVP. The maroon wallpaper stays still (sticky) while the
 * guest scrolls through this section only. Contains a digital envelope card
 * (toggleable bank account) and an RSVP card whose wishes appear on the site.
 */
export default function GiftRsvpSection() {
  return (
    <section aria-label="Hadiah dan RSVP" className="relative">
      {/* Wallpaper that stays still while scrolling through this slide */}
      <div aria-hidden className="sticky top-0 h-svh w-full overflow-hidden">
        <img
          src={MEDIA.wallpaperRed}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 -mt-[100svh] flex flex-col items-center gap-6 px-5 pb-24 pt-16">
        <DigitalEnvelopeCard />
        <RsvpCard />
      </div>
    </section>
  );
}

/** Card shell: SUJA-ACARA background tinted #f1dccd at 85% opacity */
function CoverCard({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <div
      aria-label={ariaLabel}
      className="relative w-full overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(43,11,16,0.4)] ring-1 ring-white/40"
    >
      <img
        src={MEDIA.cardBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#f1dccd]/85" aria-hidden />
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}

function DigitalEnvelopeCard() {
  const [showGift, setShowGift] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAccount = useCallback(async () => {
    const text = GIFT.accountNumber;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const helper = document.createElement("textarea");
      helper.value = text;
      document.body.appendChild(helper);
      helper.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(helper);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <CoverCard ariaLabel="Amplop digital">
      <div className="flex flex-col items-center gap-4 text-center">
        <Gift className="h-8 w-8 text-maroon-deep" strokeWidth={1.6} />
        <h3 className="font-script text-[36px] leading-tight text-maroon-deep">
          Amplop Digital
        </h3>
        <p className="max-w-[310px] text-[12px] leading-relaxed text-stone-700">
          Doa restu anda merupakan karunia yang sangat berarti bagi kami, dan
          jika memberi adalah tanda kasih, anda dapat memberikan kado secara
          online.
        </p>

        <Button
          type="button"
          onClick={() => setShowGift((v) => !v)}
          aria-expanded={showGift}
          className="mt-1 h-11 rounded-full bg-maroon px-8 text-[13px] text-white shadow-md ring-1 ring-white/30 transition-colors hover:bg-maroon-deep active:scale-95"
        >
          <Gift className="mr-2 h-4 w-4" />
          Hadiah
          <ChevronDown
            className={cn(
              "ml-1 h-4 w-4 transition-transform duration-300",
              showGift && "rotate-180"
            )}
          />
        </Button>

        <AnimatePresence initial={false}>
          {showGift && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full overflow-hidden"
            >
              <div className="mt-2 rounded-2xl bg-white/90 p-6 shadow-inner ring-1 ring-maroon/10">
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-stone-500">
                  {GIFT.bank}
                </p>
                <p className="mt-2 font-display text-[24px] font-semibold tracking-[0.16em] text-stone-900">
                  {GIFT.accountNumber}
                </p>
                <p className="mt-1 text-[13px] text-stone-600">
                  {GIFT.accountName}
                </p>
                <button
                  type="button"
                  onClick={copyAccount}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-maroon/35 px-4 py-1.5 text-[11px] font-medium text-maroon-deep transition-colors hover:bg-maroon hover:text-white"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Tersalin" : "Salin No. Rekening"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CoverCard>
  );
}

function RsvpCard() {
  const { toast } = useToast();
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<string>("Hadir");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/wishes");
        const json = await res.json();
        if (!cancelled && res.ok) {
          setWishes(Array.isArray(json.data) ? json.data : []);
        }
      } catch {
        /* keep empty list */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Belum lengkap",
        description: "Nama dan ucapan wajib diisi ya.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attendance, message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Gagal mengirim ucapan");
      setWishes((prev) => [json.data as WishItem, ...prev]);
      setName("");
      setAttendance("Hadir");
      setMessage("");
      toast({
        title: "Ucapan terkirim",
        description: "Terima kasih atas doa dan restunya.",
      });
    } catch (err) {
      toast({
        title: "Gagal mengirim",
        description:
          err instanceof Error ? err.message : "Coba lagi sebentar lagi.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <CoverCard ariaLabel="RSVP dan ucapan">
      <div className="flex flex-col items-center gap-4">
        <HeartHandshake
          className="h-8 w-8 text-maroon-deep"
          strokeWidth={1.6}
        />
        <h3 className="text-center font-script text-[36px] leading-tight text-maroon-deep">
          RSVP
        </h3>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Anda"
            aria-label="Nama Anda"
            maxLength={100}
            className="h-11 border-maroon/20 bg-white/80 text-[13px] text-stone-800 placeholder:text-stone-400 focus-visible:ring-maroon/40"
          />
          <Select value={attendance} onValueChange={setAttendance}>
            <SelectTrigger
              aria-label="Konfirmasi kehadiran"
              className="h-11 w-full border-maroon/20 bg-white/80 text-[13px] text-stone-800 focus:ring-maroon/40"
            >
              <SelectValue placeholder="Konfirmasi kehadiran" />
            </SelectTrigger>
            <SelectContent>
              {ATTENDANCE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ucapan & doa restu"
            aria-label="Ucapan dan doa restu"
            rows={4}
            maxLength={1000}
            className="border-maroon/20 bg-white/80 text-[13px] text-stone-800 placeholder:text-stone-400 focus-visible:ring-maroon/40"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="h-11 rounded-full bg-maroon text-[13px] text-white shadow-md ring-1 ring-white/30 transition-colors hover:bg-maroon-deep active:scale-[0.98]"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Kirim Ucapan
              </>
            )}
          </Button>
        </form>

        <div className="mt-2 w-full">
          <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
            Ucapan {loading ? "" : `(${wishes.length})`}
          </p>

          <div
            aria-label="Daftar ucapan"
            aria-live="polite"
            className="scrollbar-thin max-h-72 space-y-3 overflow-y-auto pr-1"
          >
            {loading ? (
              <>
                <Skeleton className="h-20 w-full rounded-xl bg-white/60" />
                <Skeleton className="h-20 w-full rounded-xl bg-white/60" />
                <Skeleton className="h-20 w-full rounded-xl bg-white/60" />
              </>
            ) : wishes.length === 0 ? (
              <p className="rounded-xl bg-white/60 px-4 py-6 text-center text-[12px] text-stone-500">
                Jadilah yang pertama mengirim ucapan &amp; doa.
              </p>
            ) : (
              wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="rounded-xl bg-white/85 p-3.5 ring-1 ring-maroon/10"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[13px] font-semibold text-stone-800">
                      {wish.name}
                    </p>
                    <AttendanceBadge value={wish.attendance} />
                  </div>
                  <p className="mt-1.5 whitespace-pre-wrap text-[12px] leading-relaxed text-stone-600">
                    {wish.message}
                  </p>
                  <p className="mt-1.5 text-[10px] text-stone-400">
                    {formatWishDate(wish.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </CoverCard>
  );
}

function AttendanceBadge({ value }: { value: string }) {
  const styles =
    value === "Hadir"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : value === "Tidak Hadir"
        ? "bg-rose-100 text-rose-700 border-rose-200"
        : "bg-amber-100 text-amber-700 border-amber-200";
  return (
    <Badge
      variant="outline"
      className={cn(
        "flex-none rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
        styles
      )}
    >
      {value}
    </Badge>
  );
}

function formatWishDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

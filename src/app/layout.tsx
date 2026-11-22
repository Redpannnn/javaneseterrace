import type { Metadata, Viewport } from "next";
import { Great_Vibes, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "The Wedding of Maestro & Septi | 10.07.2027",
  description:
    "Undangan pernikahan Maestro Ade Pratama & Farida Septiani — Sabtu, 10 Juli 2027, Kediaman Mempelai Wanita, Pademangan, Jakarta Utara.",
  keywords: [
    "undangan pernikahan",
    "wedding invitation",
    "Maestro & Septi",
    "10 Juli 2027",
  ],
  openGraph: {
    title: "The Wedding of Maestro & Septi",
    description:
      "Undangan pernikahan Maestro Ade Pratama & Farida Septiani — Sabtu, 10 Juli 2027.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2b0b10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${playfair.variable} ${greatVibes.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

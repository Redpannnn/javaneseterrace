import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
      <head>
        {/* Google Fonts dimuat langsung oleh browser (runtime), bukan diproses
            saat build — menghindari bug font loader Turbopack di Vercel */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

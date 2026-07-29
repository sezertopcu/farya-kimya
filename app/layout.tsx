import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import SiteChrome from "./components/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Farya Kimya | Temizlik ve Ambalaj Malzemeleri",
    template: "%s | Farya Kimya",
  },
  description:
    "Farya Kimya; temizlik, hijyen, otomotiv bakım ürünleri ve ambalaj malzemeleri üretimi yapan yerli üretici firmadır.",
  keywords: [
    "Farya Kimya",
    "Pall",
    "temizlik ürünleri",
    "oto köpüğü",
    "AdBlue",
    "Erzurum kimya",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Farya Kimya",
    description: "Temizlikte güç, üretimde güven.",
    type: "website",
    locale: "tr_TR",
    siteName: "Farya Kimya",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

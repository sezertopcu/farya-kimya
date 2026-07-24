import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Farya Kimya | Temizlik ve Ambalaj Malzemeleri",
  description:
    "Farya Kimya; temizlik, hijyen, otomotiv bakım ürünleri ve ambalaj malzemeleri üretimi yapan yerli üretici firmadır.",
  keywords: [
    "Farya Kimya",
    "temizlik ürünleri",
    "ambalaj malzemeleri",
    "yüzey temizleyici",
    "çamaşır suyu",
    "sıvı sabun",
    "oto köpüğü",
    "AdBlue",
    "Erzurum kimya",
  ],
  authors: [{ name: "Farya Kimya" }],
  creator: "Farya Kimya",
  publisher: "Farya Kimya",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Farya Kimya",
    description:
      "Temizlikte güç, üretimde güven. Temizlik, hijyen ve otomotiv ürünlerinde yerli üretim çözümleri.",
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
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
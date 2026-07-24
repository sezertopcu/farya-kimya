"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ArrowIcon } from "./Icons";
import { whatsappUrl } from "./constants";

const links = [
  {
    label: "Ana Sayfa",
    href: "/",
  },
  {
    label: "Hakkımızda",
    href: "/hakkimizda",
  },
  {
    label: "Ürünlerimiz",
    href: "/urunlerimiz",
  },
  {
    label: "Üretim",
    href: "/uretim",
  },
  {
    label: "İletişim",
    href: "/#iletisim",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.includes("#")) {
      return false;
    }

    return pathname === href;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/90 shadow-[0_10px_35px_rgba(10,65,75,0.07)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-14 w-14 shrink-0">
            <Image
              src="/images/farya-logo.png"
              alt="Farya Kimya logosu"
              fill
              priority
              loading="eager"
              sizes="56px"
              className="object-contain"
            />
          </div>

          <div>
            <p className="text-lg font-black tracking-[0.04em] text-[#12394a]">
              FARYA KİMYA
            </p>

            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.19em] text-[#6f8b94] sm:block">
              Temizlik ve Ambalaj Malzemeleri
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-2 text-sm font-bold transition ${
                  active
                    ? "text-[#078c8e]"
                    : "text-[#496672] hover:text-[#078c8e]"
                }`}
              >
                {link.label}

                {active && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#0a8588]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#0a8588] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#0a8588]/20 transition hover:-translate-y-0.5 hover:bg-[#086f78] sm:inline-flex"
          >
            Bilgi Al
            <ArrowIcon />
          </a>

          <button
            type="button"
            aria-label="Menüyü aç veya kapat"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-[#d8e7e8] bg-white lg:hidden"
          >
            <span
              className={`h-0.5 w-5 bg-[#173f4c] transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`h-0.5 w-5 bg-[#173f4c] transition ${
                open ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-0.5 w-5 bg-[#173f4c] transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu lg:hidden ${
          open ? "mobile-menu-open" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 pb-5">
          <div className="rounded-[28px] border border-[#dbe9ea] bg-white p-3 shadow-2xl">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-bold text-[#335965] transition hover:bg-[#edf8f6] hover:text-[#078c8e]"
              >
                {link.label}
                <ArrowIcon />
              </Link>
            ))}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3.5 font-black text-white transition hover:bg-[#20bd5a]"
            >
              WhatsApp&apos;tan Yaz
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
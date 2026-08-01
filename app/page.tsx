import Image from "next/image";
import Link from "next/link";

import Reveal from "./components/Reveal";
import {
  ArrowIcon,
  LocationIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./components/Icons";
import {
  bekirPhoneUrl,
  bekirWhatsappUrl,
  mapUrl,
  omerPhoneUrl,
  omerWhatsappUrl,
} from "./components/constants";

const heroParticles = [
  { left: "8%", top: "18%", delay: "0s", duration: "9s", size: "5px" },
  { left: "18%", top: "72%", delay: "-2s", duration: "11s", size: "7px" },
  { left: "33%", top: "12%", delay: "-4s", duration: "10s", size: "4px" },
  { left: "46%", top: "82%", delay: "-1s", duration: "13s", size: "6px" },
  { left: "62%", top: "20%", delay: "-5s", duration: "12s", size: "5px" },
  { left: "74%", top: "76%", delay: "-3s", duration: "14s", size: "7px" },
  { left: "88%", top: "24%", delay: "-6s", duration: "10s", size: "4px" },
  { left: "94%", top: "64%", delay: "-2.5s", duration: "12s", size: "6px" },
];

const heroProducts = [
  {
    src: "/images/hero-products/pall-camasir-suyu.webp",
    name: "Pall Çamaşır Suyu",
  },
  {
    src: "/images/hero-products/pall-sivi-bulasik-deterjani.webp",
    name: "Pall Sıvı Bulaşık Deterjanı",
  },
  {
    src: "/images/hero-products/pall-sivi-el-sabunu.webp",
    name: "Pall Sıvı El Sabunu",
  },
  {
    src: "/images/hero-products/pall-yuzey-temizleyici.webp",
    name: "Pall Yüzey Temizleyici",
  },
  {
    src: "/images/hero-products/pall-tuz-ruhu.webp",
    name: "Pall Tuz Ruhu",
  },
  {
    src: "/images/hero-products/pall-kirec-cozucu.webp",
    name: "Pall Kireç Çözücü",
  },
  {
    src: "/images/hero-products/pall-otomotiv-urunleri.webp",
    name: "Pall Otomotiv Ürünleri",
  },
  {
    src: "/images/hero-products/pall-kirmizi-guc.webp",
    name: "Pall Kırmızı Güç",
  },
  {
    src: "/images/hero-products/pall-mavi-guc.webp",
    name: "Pall Mavi Güç",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbfc] text-[#173042]">
      <section className="hero-noise hero-stage relative flex min-h-screen items-center overflow-hidden pt-28">
        <div className="hero-aurora hero-aurora-one" />
        <div className="hero-aurora hero-aurora-two" />
        <div className="hero-aurora hero-aurora-three" />

        <div className="hero-grid-motion" />
        <div className="hero-light-sweep" />

        <div className="hero-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="hero-particles" aria-hidden="true">
          {heroParticles.map((particle, index) => (
            <span
              key={index}
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                width: particle.size,
                height: particle.size,
              }}
            />
          ))}
        </div>

        <div className="hero-line hero-line-one" />
        <div className="hero-line hero-line-two" />
        <div className="hero-line hero-line-three" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-16 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b9dfda] bg-white/80 px-4 py-2 text-sm font-bold text-[#08797e] shadow-[0_12px_35px_rgba(15,98,102,.08)] backdrop-blur-xl">
              <span className="hero-status-dot h-2 w-2 rounded-full bg-[#21aa93]" />
              Yerli üretim, güvenilir çözümler
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.04] tracking-[-.05em] text-[#113747] sm:text-6xl lg:text-7xl">
              Temizlikte güç,
              <span className="block bg-gradient-to-r from-[#078b8c] via-[#19a79d] to-[#32a986] bg-clip-text text-transparent">
                üretimde güven.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5e7882]">
              Farya Kimya; ev, iş yeri, endüstriyel kullanım ve otomotiv
              sektörüne yönelik Pall markalı temizlik ürünleri üretir.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/urunlerimiz" className="primary-button hero-shine-button">
                Ürünlerimizi İnceleyin
                <ArrowIcon />
              </Link>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                <LocationIcon />
                Konumumuzu Görün
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-[#d8e8e9] pt-7">
              {[
                ["20+", "Ürün çeşidi"],
                ["3", "Ana kategori"],
                ["%100", "Yerli üretim"],
              ].map(([value, label]) => (
                <div key={label} className="hero-stat">
                  <p className="text-3xl font-black text-[#0b8083]">{value}</p>
                  <p className="mt-1 text-sm text-[#708993]">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140} className="relative mx-auto w-full max-w-[620px]">
            <div className="hero-card-halo absolute -inset-10 rounded-[70px]" />
            <div className="hero-card-orbit hero-card-orbit-one" />
            <div className="hero-card-orbit hero-card-orbit-two" />

            <div className="floating-card hero-product-card relative overflow-hidden rounded-[48px] border border-white/80 bg-white/90 p-4 shadow-[0_35px_100px_rgba(14,76,85,.18)] backdrop-blur-xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[36px]">
                <Image
                  src="/images/farya-hero-products.webp"
                  alt="Farya Kimya Pall ürün ailesi"
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw,620px"
                  className="object-cover"
                />

                <div className="hero-image-gloss" />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c3e4b]/75 to-transparent px-7 pb-7 pt-24 text-white">
                  <p className="text-xs font-black uppercase tracking-[.22em] text-[#96ead8]">
                    Farya Kimya
                  </p>
                  <p className="mt-2 text-2xl font-black">Pall ürün ailesi</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 px-2 pb-2 pt-4">
                {["Hijyen", "Kalite", "Güven"].map((item) => (
                  <div
                    key={item}
                    className="hero-chip rounded-2xl bg-[#edf8f6] px-3 py-3 text-center text-xs font-bold text-[#41646d]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          </div>

          <div className="hero-product-marquee mt-12" aria-label="Pall ürünleri">
            <div className="hero-product-marquee-mask">
              <div className="hero-product-marquee-track">
                {[...heroProducts, ...heroProducts].map((product, index) => (
                  <div
                    key={`${product.src}-${index}`}
                    className="hero-product-marquee-card"
                    aria-hidden={index >= heroProducts.length}
                  >
                    <div className="hero-product-marquee-image">
                      <Image
                        src={product.src}
                        alt={index < heroProducts.length ? product.name : ""}
                        fill
                        sizes="(max-width: 640px) 180px, 230px"
                        className="object-contain"
                      />
                    </div>

                    <p>{product.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <Reveal>
            <p className="eyebrow">Farya Kimya</p>
            <h2 className="section-title">
              İhtiyacınız olan bölüme doğrudan ulaşın.
            </h2>
            <p className="section-copy">
              Hakkımızda, ürünlerimiz ve üretim süreçlerimiz ayrı sayfalarda.
              Mobil kullanım daha hızlı ve daha düzenli.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Bizi Tanıyın", "/hakkimizda"],
              ["02", "Ürünleri Görün", "/urunlerimiz"],
              ["03", "Üretimi İnceleyin", "/uretim"],
            ].map(([number, title, href], index) => (
              <Reveal key={title} delay={index * 90}>
                <Link href={href} className="portal-link">
                  <span className="text-xs font-black tracking-[.2em] text-[#0a8588]">
                    {number}
                  </span>
                  <h3 className="mt-8 text-2xl font-black text-[#173f4c]">
                    {title}
                  </h3>
                  <span className="mt-16 inline-flex items-center gap-2 font-black text-[#0a8588]">
                    Sayfaya Git
                    <ArrowIcon />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="iletisim" className="bg-[#f5fafb] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-[42px] bg-[#113f4d] shadow-[0_30px_90px_rgba(12,65,75,.2)]">
              <div className="grid lg:grid-cols-[1.05fr_.95fr]">
                <div className="p-8 text-white sm:p-12 lg:p-14">
                  <p className="eyebrow !text-[#76d8c4]">İletişim</p>
                  <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                    Ürünlerimiz hakkında bilgi alın.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-white/65">
                    Ürün çeşitleri, toplu talepler ve kurumsal çözümler hakkında
                    bizimle iletişime geçebilirsiniz.
                  </p>

                  <div className="mt-9 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Bekir Ardahanlı", bekirPhoneUrl, bekirWhatsappUrl],
                      ["Ömer Faruk Ardahanlı", omerPhoneUrl, omerWhatsappUrl],
                    ].map(([name, phone, whatsapp]) => (
                      <div
                        key={name}
                        className="rounded-2xl border border-white/10 bg-white/[.06] p-4"
                      >
                        <p className="font-black">{name}</p>
                        <div className="mt-3 flex gap-2">
                          <a href={phone} className="contact-icon">
                            <PhoneIcon />
                          </a>
                          <a
                            href={whatsapp}
                            target="_blank"
                            rel="noreferrer"
                            className="contact-icon whatsapp"
                          >
                            <WhatsAppIcon />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#75d5c1] px-7 py-4 font-black text-[#103f4b]"
                  >
                    Haritada Aç
                    <ArrowIcon />
                  </a>
                </div>

                <div className="flex items-center justify-center bg-[#eef5f5] p-4 sm:p-6">
                  <div className="overflow-hidden rounded-[28px] bg-white shadow-xl">
                    <Image
                      src="/images/farya-facility-exterior.webp"
                      alt="Farya Kimya mağazası"
                      width={1600}
                      height={900}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

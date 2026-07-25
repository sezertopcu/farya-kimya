import type { Metadata } from "next";
import Image from "next/image";

import Reveal from "../components/Reveal";
import { ArrowIcon } from "../components/Icons";
import { whatsappUrl } from "../components/constants";

export const metadata: Metadata = {
  title: "Ürünlerimiz",
  description:
    "Pall markalı genel temizlik, güçlü temizlik ve otomotiv ürünleri.",
};

const categories = [
  {
    image: "/images/farya-general-cleaning-products.webp",
    title: "Genel Temizlik",
    description:
      "Yüzey temizleyici, sıvı sabun, köpük sabun, bulaşık deterjanı ve çamaşır suyu çözümleri.",
  },
  {
    image: "/images/farya-power-cleaning-products.webp",
    title: "Güçlü Temizlik",
    description:
      "Sarı Güç, Mavi Güç, Kırmızı Güç, kireç çözücü ve tuz ruhu gibi profesyonel ürünler.",
  },
  {
    image: "/images/farya-automotive-products.webp",
    title: "Otomotiv",
    description:
      "Yazlık ve kışlık oto cam suyu, AdBlue ve oto yıkama köpüğü.",
  },
];

const featuredProducts = [
  {
    image: "/images/farya-sari-guc.webp",
    title: "Sarı Güç",
  },
  {
    image: "/images/farya-mavi-guc.webp",
    title: "Mavi Güç",
  },
  {
    image: "/images/farya-ado-jet.webp",
    title: "Kırmızı Güç",
  },
];

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <section className="subhero">
        <div className="subhero-grid" />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow">Ürünlerimiz</p>

            <h1 className="page-title">
              Pall markalı gerçek ürünler, farklı kullanım alanlarına özel
              çözümler.
            </h1>

            <p className="page-intro">
              Günlük kullanımdan profesyonel işletmelere, otomotiv bakımından
              kurumsal taleplere kadar geniş ürün seçenekleri.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="space-y-8">
            {categories.map((category, index) => (
              <Reveal key={category.title} delay={index * 80}>
                <article
                  className={`editorial-row ${
                    index % 2 === 1 ? "editorial-row-reverse" : ""
                  }`}
                >
                  <div className="relative min-h-[320px] overflow-hidden rounded-[34px]">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-3 sm:p-8">
                    <span className="text-sm font-black tracking-[0.22em] text-[#0a8588]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-[#173f4c]">
                      {category.title}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-[#6c838b]">
                      {category.description}
                    </p>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center gap-2 font-black text-[#0a8588]"
                    >
                      Ürün Bilgisi Al
                      <ArrowIcon />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f8f9] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Öne Çıkan Ürünler</p>

              <h2 className="section-title">
                Profesyonel temizlik gücü
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.title} delay={index * 90}>
                <article className="spotlight-product group">
                  <div className="relative aspect-[5/6] overflow-hidden rounded-[26px] bg-white">
                    <Image
                      src={product.image}
                      alt={`Pall ${product.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex items-center justify-between px-2 pb-1 pt-5">
                    <h3 className="text-2xl font-black text-[#193f4c]">
                      {product.title}
                    </h3>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-black text-[#0a8588]"
                    >
                      Bilgi Al
                      <ArrowIcon />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0e3d4b] py-20 text-white sm:py-28">
        <div className="soft-grid" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="grid items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="eyebrow !text-[#70d5c3]">
                  Otomotiv Ürünleri
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                  Aracınız için güçlü bakım çözümleri
                </h2>
              </div>

              <p className="max-w-xl text-lg leading-8 text-white/65 lg:justify-self-end">
                Yazlık ve kışlık oto cam suyu, AdBlue ve profesyonel oto
                yıkama köpüğü.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[14/9] overflow-hidden rounded-[34px]">
                <Image
                  src="/images/farya-automotive-products.webp"
                  alt="Pall otomotiv ürünleri"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative aspect-[14/9] overflow-hidden rounded-[34px]">
                <Image
                  src="/images/farya-car-foam-action.webp"
                  alt="Pall oto köpüğü uygulaması"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
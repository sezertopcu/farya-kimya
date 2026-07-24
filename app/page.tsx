import Image from "next/image";

const automotiveProducts = [
  {
    name: "Yazlık Oto Cam Suyu",
    description:
      "Yaz aylarında cam yüzeylerde biriken kir ve izlerin temizlenmesine yardımcı olur.",
    icon: "summer",
  },
  {
    name: "Kışlık Oto Cam Suyu",
    description:
      "Soğuk hava koşullarında araç camlarının temiz ve görüşün açık kalmasını destekler.",
    icon: "winter",
  },
  {
    name: "AdBlue",
    description:
      "Dizel araçların emisyon sistemlerinde kullanılmak üzere sunulan otomotiv ürünü.",
    icon: "adblue",
  },
  {
    name: "Oto Köpüğü",
    description:
      "Araç dış yüzeylerinde yoğun köpük oluşturarak etkili temizlik sağlar.",
    icon: "car",
  },
];

const sectors = [
  "Temizlik Firmaları",
  "Marketler",
  "Oteller",
  "Restoranlar",
  "Akaryakıt İstasyonları",
  "Oto Yıkama İşletmeleri",
  "Fabrikalar",
  "Kamu Kurumları",
];

const mapUrl =
  "https://www.google.com/maps/place/FARYA+K%C4%B0MYA+TEM%C4%B0ZL%C4%B0K+VE+AMBALAJ+MALZEMELER%C4%B0/@39.957222,41.2867338,17z/data=!3m1!4b1!4m6!3m5!1s0x406ef7de4399e871:0x146212066517d52e!8m2!3d39.957222!4d41.2867338!16s%2Fg%2F11nq1q4rvn!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D";

const bekirPhoneUrl = "tel:+905313482500";
const bekirWhatsappUrl =
  "https://wa.me/905313482500?text=Merhaba%20Farya%20Kimya%2C%20%C3%BCr%C3%BCnleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

const omerPhoneUrl = "tel:+905050702137";
const omerWhatsappUrl =
  "https://wa.me/905050702137?text=Merhaba%20Farya%20Kimya%2C%20%C3%BCr%C3%BCnleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

const whatsappUrl = bekirWhatsappUrl;

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M7.2 3.8 9.7 8a2 2 0 0 1-.3 2.4l-1.2 1.2a15.5 15.5 0 0 0 4.2 4.2l1.2-1.2a2 2 0 0 1 2.4-.3l4.2 2.5a2 2 0 0 1 .9 2.2l-.4 1.7a2 2 0 0 1-2 1.5C9.4 22.2 1.8 14.6 1.8 5.3a2 2 0 0 1 1.5-2l1.7-.4a2 2 0 0 1 2.2.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M16.04 3C8.84 3 3 8.77 3 15.89c0 2.27.6 4.48 1.73 6.42L3 28.64l6.53-1.7a13.15 13.15 0 0 0 6.5 1.67C23.23 28.61 29 22.84 29 15.9 29 8.77 23.24 3 16.04 3Zm0 23.43c-2.02 0-4-.54-5.72-1.56l-.41-.24-3.88 1.01 1.04-3.75-.26-.42a10.46 10.46 0 0 1-1.62-5.58c0-5.9 4.86-10.7 10.85-10.7 5.98 0 10.84 4.8 10.84 10.7 0 5.82-4.78 10.54-10.84 10.54Zm5.95-7.9c-.33-.16-1.94-.95-2.24-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.21-.38.24-.71.08-.33-.16-1.38-.5-2.63-1.61a9.82 9.82 0 0 1-1.82-2.24c-.19-.32-.02-.5.14-.66.15-.14.33-.37.49-.56.17-.19.22-.32.33-.54.11-.21.05-.4-.03-.56-.08-.16-.74-1.77-1.01-2.42-.27-.64-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.4-.3.32-1.15 1.11-1.15 2.71s1.18 3.15 1.34 3.37c.17.21 2.31 3.49 5.59 4.89.78.33 1.39.53 1.87.68.79.25 1.5.21 2.06.13.63-.09 1.94-.78 2.21-1.54.28-.76.28-1.41.2-1.54-.08-.14-.3-.22-.63-.38Z" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M3 21V10l6 3V9l6 4V5h4l2 16H3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M7 17h2m3 0h2m3 0h2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M12 3 20 6v5c0 5-3.3 8.4-8 10-4.7-1.6-8-5-8-10V6l8-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m8.5 12 2.2 2.2 4.8-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductIcon({ type }: { type: string }) {
  if (type === "car") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="m9 29 4-11c.6-1.7 2.2-3 4.2-3h13.6c2 0 3.6 1.3 4.2 3l4 11"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M8 29h32v8H8v-8Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="38" r="3" fill="currentColor" />
        <circle cx="34" cy="38" r="3" fill="currentColor" />
        <path
          d="M14 25h20"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "winter") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M24 7v34M10 15l28 18M38 15 10 33"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="m19 10 5 4 5-4M19 38l5-4 5 4"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "summer") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <circle
          cx="24"
          cy="24"
          r="8"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path
          d="M24 6v6m0 24v6M6 24h6m24 0h6M11.3 11.3l4.2 4.2m17 17 4.2 4.2m0-25.4-4.2 4.2m-17 17-4.2 4.2"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "adblue") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M24 7s12 13.2 12 23a12 12 0 1 1-24 0C12 20.2 24 7 24 7Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M18 31c2 3 6 4 9 2"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "spray" || type === "jet") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M19 17h15l3 7v17H17V24l2-7Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M22 17v-5h9l5 3M38 14h5M38 10l4-2M38 18l4 2"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "soap" || type === "foam") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M17 18h18v23H13V22l4-4Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M21 18v-6h10m0 0v4m0-4h6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="29" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "dish") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M14 16h20l4 25H10l4-25Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M19 16v-5h10v5M18 28h12"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "drop") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M24 7s12 13.2 12 23a12 12 0 1 1-24 0C12 20.2 24 7 24 7Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "power") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="m27 5-15 23h12l-3 15 15-24H24l3-14Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "warning") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M24 7 43 40H5L24 7Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M24 18v10m0 6h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "oil" || type === "lime") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M24 7s12 13.2 12 23a12 12 0 1 1-24 0C12 20.2 24 7 24 7Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="m19 30 3 3 7-8"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
      <path
        d="M17 8h14v6l4 5v22H13V19l4-5V8Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M17 14h14M18 28h12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbfc] text-[#173042]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/85 shadow-[0_8px_30px_rgba(15,67,78,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#anasayfa" className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0">
              <Image
                src="/images/farya-logo.png"
                alt="Farya Kimya logosu"
                fill
                priority
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
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {[
              ["Ana Sayfa", "#anasayfa"],
              ["Hakkımızda", "#hakkimizda"],
              ["Ürünlerimiz", "#urunler"],
              ["Üretim", "#uretim"],
              ["İletişim", "#iletisim"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-semibold text-[#496672] transition hover:text-[#078c8e]"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a8588] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#0a8588]/20 transition hover:-translate-y-0.5 hover:bg-[#086f78]"
          >
            Bilgi Al
            <ArrowIcon />
          </a>
        </div>
      </header>

      <section
        id="anasayfa"
        className="relative flex min-h-screen items-center overflow-hidden pt-28"
      >
        <div className="absolute -left-40 top-28 h-[430px] w-[430px] rounded-full bg-[#c8f2e6]/60 blur-3xl" />
        <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#c9eefa]/70 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[900px] -translate-x-1/2 rounded-full bg-white blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b9dfda] bg-white/80 px-4 py-2 text-sm font-bold text-[#08797e] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#21aa93]" />
              Yerli üretim, güvenilir çözümler
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.06] tracking-[-0.045em] text-[#113747] sm:text-6xl lg:text-7xl">
              Temizlikte güç,
              <span className="block bg-gradient-to-r from-[#078b8c] to-[#32a986] bg-clip-text text-transparent">
                üretimde güven.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5e7882]">
              Farya Kimya; ev, iş yeri, endüstriyel kullanım ve otomotiv
              sektörüne yönelik temizlik ürünleri üretir. Kaliteli üretim
              anlayışımızla güçlü, etkili ve güvenilir çözümler sunarız.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#urunler"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a8588] px-7 py-4 font-bold text-white shadow-xl shadow-[#0a8588]/20 transition hover:-translate-y-1 hover:bg-[#086f78]"
              >
                Ürünlerimizi İnceleyin
                <ArrowIcon />
              </a>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9dcdf] bg-white px-7 py-4 font-bold text-[#315361] shadow-sm transition hover:-translate-y-1 hover:border-[#79bdb9]"
              >
                <LocationIcon />
                Konumumuzu Görün
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-[#d8e8e9] pt-7">
              <div>
                <p className="text-3xl font-black text-[#0b8083]">20+</p>
                <p className="mt-1 text-sm text-[#708993]">Ürün çeşidi</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#0b8083]">3</p>
                <p className="mt-1 text-sm text-[#708993]">Ana kategori</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#0b8083]">%100</p>
                <p className="mt-1 text-sm text-[#708993]">Yerli üretim</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px]">
            <div className="absolute -inset-8 rounded-[60px] bg-gradient-to-br from-[#a6e8d6]/50 to-[#b9e4f4]/50 blur-2xl" />

            <div className="relative overflow-hidden rounded-[48px] border border-white/80 bg-white p-4 shadow-[0_35px_100px_rgba(14,76,85,0.18)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[36px] bg-[#edf7f6]">
                <Image
                  src="/images/farya-hero-products.webp"
                  alt="Farya Kimya temizlik ve otomotiv ürünleri"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c3e4b]/85 via-[#0c3e4b]/30 to-transparent px-7 pb-7 pt-24 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#96ead8]">
                    Farya Kimya
                  </p>
                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/75">
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 px-2 pb-2 pt-4">
                {["Hijyen", "Kalite", "Güven"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#edf8f6] px-3 py-3 text-center text-xs font-bold text-[#41646d]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section
        id="hakkimizda"
        className="relative bg-white py-24 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[#dff7f0] blur-2xl" />
            <div className="relative overflow-hidden rounded-[40px] border border-[#dceced] bg-white p-3 shadow-[0_25px_70px_rgba(20,72,80,0.13)]">
              <div className="relative aspect-[8/5] overflow-hidden rounded-[30px]">
                <Image
                  src="/images/farya-production-facility.webp"
                  alt="Farya Kimya üretim tesisi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d3e4b]/85 to-transparent px-7 pb-7 pt-20 text-white">
                  <p className="text-3xl font-black">Güvenilir Üretim</p>
                  <p className="mt-2 text-sm text-white/75">
                    Kontrollü süreçler, modern dolum hattı ve düzenli üretim.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 p-3">
                <div className="rounded-2xl bg-[#edf8f6] p-4 text-center">
                  <p className="text-2xl font-black text-[#0a8588]">20+</p>
                  <p className="mt-1 text-xs text-[#6d858d]">Ürün çeşidi</p>
                </div>
                <div className="rounded-2xl bg-[#edf8f6] p-4 text-center">
                  <p className="text-2xl font-black text-[#0a8588]">%100</p>
                  <p className="mt-1 text-xs text-[#6d858d]">Yerli üretim</p>
                </div>
                <div className="rounded-2xl bg-[#edf8f6] p-4 text-center">
                  <p className="text-2xl font-black text-[#0a8588]">3</p>
                  <p className="mt-1 text-xs text-[#6d858d]">Ana kategori</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#078b87]">
              Hakkımızda
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.035em] text-[#143b49] sm:text-5xl">
              Güvenilir üretimle temizliğe değer katıyoruz.
            </h2>

            <p className="mt-7 text-lg leading-8 text-[#647d86]">
              Farya Kimya Temizlik ve Ambalaj Malzemeleri; temizlik, hijyen ve
              otomotiv bakım ürünlerinin üretimini gerçekleştiren yerli bir
              üretici firmadır.
            </p>

            <p className="mt-4 leading-7 text-[#708991]">
              Farklı kullanım alanlarına yönelik geniş ürün çeşitliliğimiz,
              üretim tecrübemiz ve müşteri odaklı hizmet anlayışımızla bireysel
              ve kurumsal müşterilerimize güvenilir çözümler sunuyoruz.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Geniş ürün yelpazesi ve güçlü üretim kapasitesi",
                "Ev, iş yeri ve endüstriyel kullanıma uygun çözümler",
                "Otomotiv bakım ve temizlik ürünleri",
                "Kurumsal ve toplu taleplere yönelik hizmet",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e0f5ef] text-[#07867f]">
                    <CheckIcon />
                  </span>
                  <p className="font-semibold text-[#3f606b]">{item}</p>
                </div>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#123e4c] px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#0a8588]"
            >
              Bizimle İletişime Geçin
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section id="urunler" className="bg-[#f3f9f9] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#078b87]">
              Ürünlerimiz
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-[#143b49] sm:text-5xl">
              Her alana uygun temizlik çözümleri
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#69818a]">
              Günlük temizlikten profesyonel kullanıma kadar farklı ihtiyaçlara
              yönelik geniş ürün seçeneklerimizi keşfedin.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {[
              {
                src: "/images/farya-general-cleaning-products.webp",
                title: "Genel Temizlik",
                text: "Günlük kullanım ve profesyonel alanlar için hijyen çözümleri.",
              },
              {
                src: "/images/farya-power-cleaning-products.webp",
                title: "Güçlü Temizlik",
                text: "Zorlu kir, yağ ve kireç kalıntılarına karşı etkili ürünler.",
              },
              {
                src: "/images/farya-automotive-products.webp",
                title: "Otomotiv Ürünleri",
                text: "Araç bakımına ve farklı mevsim şartlarına uygun ürünler.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[30px] bg-white shadow-[0_16px_45px_rgba(20,72,80,0.09)]"
              >
                <div className="relative aspect-[14/9] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-[#193f4c]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#748a92]">{item.text}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#078b87]">
              Öne Çıkan Ürünler
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-[#143b49] sm:text-5xl">
              Profesyonel temizlik gücü
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { src: "/images/farya-sari-guc.webp", title: "Sarı Güç" },
              { src: "/images/farya-mavi-guc.webp", title: "Mavi Güç" },
              { src: "/images/farya-ado-jet.webp", title: "Kırmızı Güç" },
            ].map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[32px] border border-[#dcebec] bg-[#f8fbfc] p-4 transition hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(20,100,103,0.14)]"
              >
                <div className="relative aspect-[5/6] overflow-hidden rounded-[24px] bg-white">
                  <Image
                    src={item.src}
                    alt={`Farya ${item.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center justify-between px-3 pb-2 pt-5">
                  <h3 className="text-2xl font-black text-[#193f4c]">{item.title}</h3>
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
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0e3d4b] py-24 text-white sm:py-32">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#0f9090]/25 blur-3xl" />
        <div className="absolute -bottom-48 -left-40 h-[500px] w-[500px] rounded-full bg-[#37a78e]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#70d5c3]">
                Otomotiv Ürünleri
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                Aracınız için güçlü bakım çözümleri
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-8 text-white/65 lg:justify-self-end">
              Farklı mevsim ve kullanım şartlarına uygun otomotiv temizlik ve
              bakım ürünleri.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="relative aspect-[14/9] overflow-hidden rounded-[34px] border border-white/10">
              <Image
                src="/images/farya-automotive-products.webp"
                alt="Farya otomotiv bakım ürünleri"
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[14/9] overflow-hidden rounded-[34px] border border-white/10">
              <Image
                src="/images/farya-car-foam-action.webp"
                alt="Farya oto köpüğü uygulaması"
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {automotiveProducts.map((product) => (
              <article
                key={product.name}
                className="rounded-[30px] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm transition hover:-translate-y-2 hover:bg-white/[0.11]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#85e0d0]">
                  <ProductIcon type={product.icon} />
                </div>

                <h3 className="mt-7 text-xl font-black">{product.name}</h3>

                <p className="mt-4 text-sm leading-6 text-white/60">
                  {product.description}
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#83ddcc]"
                >
                  Ürün Bilgisi
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="uretim" className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#078b87]">
              Üretim ve Kalite
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-[#143b49] sm:text-5xl">
              Kontrollü süreç, etkili sonuç
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#677f88]">
              Ürünlerimizi kullanım alanlarına uygun formüller ve kontrollü
              üretim süreçleriyle hazırlıyoruz. Kaliteyi yalnızca bir hedef
              değil, üretimimizin temel parçası olarak görüyoruz.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Kontrollü Üretim",
                  text: "Üretimin her aşamasında düzenli süreç yönetimi.",
                },
                {
                  title: "Geniş Ürün Seçeneği",
                  text: "Farklı alanlara ve ihtiyaçlara uygun çözümler.",
                },
                {
                  title: "Profesyonel Ambalaj",
                  text: "Kullanım amacına uygun dolum ve ambalaj seçenekleri.",
                },
                {
                  title: "Sürekli Tedarik",
                  text: "Kurumsal ve toplu ihtiyaçlara güvenilir destek.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#dfebec] bg-[#f9fcfc] p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#def4ef] text-sm font-black text-[#087f7e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-black text-[#214955]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#778d94]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[40px] bg-gradient-to-br from-[#e5f7f2] to-[#dceff5] p-4 shadow-[0_25px_70px_rgba(27,81,89,0.12)]">
              <div className="relative aspect-[8/5] overflow-hidden rounded-[30px]">
                <Image
                  src="/images/farya-filling-line.webp"
                  alt="Farya Kimya dolum hattı"
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5">
                  <p className="font-black text-[#214955]">Modern Dolum Hattı</p>
                  <p className="mt-2 text-sm leading-6 text-[#778d94]">
                    Düzenli ve kontrollü dolum süreci.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5">
                  <p className="font-black text-[#214955]">Kalite Kontrolü</p>
                  <p className="mt-2 text-sm leading-6 text-[#778d94]">
                    Üretimin her aşamasında tutarlı standartlar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f3f4c] py-24 text-white sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-[8/5] overflow-hidden rounded-[38px]">
            <Image
              src="/images/farya-packaging-shipping.webp"
              alt="Farya Kimya paketleme ve sevkiyat"
              fill
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#76d8c4]">
              Paketleme ve Sevkiyat
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              Kurumsal ve toplu taleplere hazır
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/65">
              Ürünlerimizi düzenli paketleme süreçleriyle sevkiyata hazırlıyor,
              işletmelerin ve toplu alım yapan müşterilerin ihtiyaçlarına
              güvenilir tedarik desteği sunuyoruz.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#75d5c1] px-7 py-4 font-black text-[#103f4b] transition hover:-translate-y-1 hover:bg-white"
            >
              Toplu Alım Bilgisi
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f8f8] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#078b87]">
              Hizmet Verdiğimiz Alanlar
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-[#143b49] sm:text-5xl">
              İşletmenize uygun çözümler
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6b838b]">
              Farklı sektörlerin temizlik ve hijyen ihtiyaçlarına yönelik geniş
              ürün seçenekleri sunuyoruz.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector, index) => (
              <div
                key={sector}
                className="group flex items-center gap-4 rounded-2xl border border-[#dce9ea] bg-white p-5 transition hover:-translate-y-1 hover:border-[#9ccfc9] hover:shadow-lg"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e2f5f0] text-sm font-black text-[#0a8584] transition group-hover:bg-[#0a8584] group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-bold text-[#365965]">{sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="iletisim"
        className="relative overflow-hidden bg-white py-24 sm:py-32"
      >
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#dff6f0] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="overflow-hidden rounded-[40px] bg-[#113f4d] shadow-[0_30px_90px_rgba(12,65,75,0.2)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 text-white sm:p-12 lg:p-16">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#76d8c4]">
                  İletişim
                </p>
                <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                  Ürünlerimiz hakkında bilgi alın.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                  Ürün çeşitleri, toplu talepler ve kurumsal çözümler hakkında
                  detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
                </p>

                <div className="mt-10 space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#7bddca]">
                      <LocationIcon />
                    </span>
                    <div>
                      <p className="text-sm text-white/50">Adres ve konum</p>
                      <p className="mt-1 font-bold">
                        Farya Kimya Temizlik ve Ambalaj Malzemeleri
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        Erzurum, Türkiye
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#7bddca]">
                      <FactoryIcon />
                    </span>
                    <div>
                      <p className="text-sm text-white/50">Hizmetlerimiz</p>
                      <p className="mt-1 font-bold">
                        Üretim, toplu satış ve kurumsal ürün çözümleri
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <p className="font-black text-white">Bekir Ardahanlı</p>
                      <div className="mt-3 flex items-center gap-2">
                        <a href={bekirPhoneUrl} aria-label="Bekir Ardahanlı'yı ara" title="Telefon" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#7bddca] transition hover:-translate-y-0.5 hover:bg-white/20">
                          <PhoneIcon />
                        </a>
                        <a href={bekirWhatsappUrl} target="_blank" rel="noreferrer" aria-label="Bekir Ardahanlı'ya WhatsApp üzerinden yaz" title="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white transition hover:-translate-y-0.5 hover:bg-[#20bd5a]">
                          <WhatsAppIcon />
                        </a>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <p className="font-black text-white">Ömer Faruk Ardahanlı</p>
                      <div className="mt-3 flex items-center gap-2">
                        <a href={omerPhoneUrl} aria-label="Ömer Faruk Ardahanlı'yı ara" title="Telefon" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#7bddca] transition hover:-translate-y-0.5 hover:bg-white/20">
                          <PhoneIcon />
                        </a>
                        <a href={omerWhatsappUrl} target="_blank" rel="noreferrer" aria-label="Ömer Faruk Ardahanlı'ya WhatsApp üzerinden yaz" title="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white transition hover:-translate-y-0.5 hover:bg-[#20bd5a]">
                          <WhatsAppIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#75d5c1] px-7 py-4 font-black text-[#103f4b] transition hover:-translate-y-1 hover:bg-white"
                  >
                    Haritada Aç
                    <ArrowIcon />
                  </a>
                </div>
              </div>

              <div className="flex min-h-[460px] items-center justify-center bg-[#eef5f5] p-4 sm:p-6">
                <div className="relative w-full overflow-hidden rounded-[28px] bg-white shadow-xl">
                  <Image
                    src="/images/farya-facility-exterior.webp"
                    alt="Farya Kimya tesis dış görünümü"
                    width={1600}
                    height={900}
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp üzerinden Farya Kimya ile iletişime geçin"
        className="group fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_14px_40px_rgba(37,211,102,0.38)] transition duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] sm:px-5"
      >
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-7 w-7 shrink-0"
          aria-hidden="true"
        >
          <path d="M16.04 3C8.84 3 3 8.77 3 15.89c0 2.27.6 4.48 1.73 6.42L3 28.64l6.53-1.7a13.15 13.15 0 0 0 6.5 1.67C23.23 28.61 29 22.84 29 15.9 29 8.77 23.24 3 16.04 3Zm0 23.43c-2.02 0-4-.54-5.72-1.56l-.41-.24-3.88 1.01 1.04-3.75-.26-.42a10.46 10.46 0 0 1-1.62-5.58c0-5.9 4.86-10.7 10.85-10.7 5.98 0 10.84 4.8 10.84 10.7 0 5.82-4.78 10.54-10.84 10.54Zm5.95-7.9c-.33-.16-1.94-.95-2.24-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.21-.38.24-.71.08-.33-.16-1.38-.5-2.63-1.61a9.82 9.82 0 0 1-1.82-2.24c-.19-.32-.02-.5.14-.66.15-.14.33-.37.49-.56.17-.19.22-.32.33-.54.11-.21.05-.4-.03-.56-.08-.16-.74-1.77-1.01-2.42-.27-.64-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.4-.3.32-1.15 1.11-1.15 2.71s1.18 3.15 1.34 3.37c.17.21 2.31 3.49 5.59 4.89.78.33 1.39.53 1.87.68.79.25 1.5.21 2.06.13.63-.09 1.94-.78 2.21-1.54.28-.76.28-1.41.2-1.54-.08-.14-.3-.22-.63-.38Z" />
        </svg>
        <span className="hidden text-sm font-black sm:block">WhatsApp</span>
      </a>

      <footer className="border-t border-[#dce9ea] bg-[#f7fbfb]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src="/images/farya-logo.png"
                  alt="Farya Kimya logosu"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-black tracking-wide text-[#153e4b]">
                  FARYA KİMYA
                </p>
                <p className="text-xs text-[#799097]">
                  Temizlik ve Ambalaj Malzemeleri
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#718990]">
              Temizlik, hijyen ve otomotiv sektörüne yönelik güçlü ve güvenilir
              yerli üretim çözümleri.
            </p>
          </div>

          <div>
            <p className="font-black text-[#204955]">Hızlı Bağlantılar</p>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-[#6c858d]">
              <a href="#anasayfa" className="hover:text-[#0a8588]">
                Ana Sayfa
              </a>
              <a href="#hakkimizda" className="hover:text-[#0a8588]">
                Hakkımızda
              </a>
              <a href="#urunler" className="hover:text-[#0a8588]">
                Ürünlerimiz
              </a>
              <a href="#uretim" className="hover:text-[#0a8588]">
                Üretim
              </a>
            </div>
          </div>

          <div>
            <p className="font-black text-[#204955]">Konum</p>
            <p className="mt-5 text-sm leading-6 text-[#708990]">
              Farya Kimya Temizlik ve Ambalaj Malzemeleri
              <br />
              Erzurum, Türkiye
            </p>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0a8588]"
            >
              Yol Tarifi Al
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="border-t border-[#dce9ea]">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-[#80949a] sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p>
              © {new Date().getFullYear()} Farya Kimya. Tüm hakları saklıdır.
            </p>
            <p>Temizlikte güç, üretimde güven.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
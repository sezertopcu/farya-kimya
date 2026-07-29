"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkExistingSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      if (!user) {
        setCheckingSession(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      if (profile?.role === "admin") {
        router.replace("/admin/panel");
        return;
      }

      await supabase.auth.signOut();
      setCheckingSession(false);
    }

    void checkExistingSession();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("E-posta ve şifre alanlarını doldurun.");
      return;
    }

    setSubmitting(true);
    setError("");

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (signInError || !data.user) {
      setError("E-posta veya şifre hatalı.");
      setSubmitting(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError || profile?.role !== "admin") {
      await supabase.auth.signOut();
      setError("Bu hesabın admin paneline erişim yetkisi bulunmuyor.");
      setSubmitting(false);
      return;
    }

    router.replace("/admin/panel");
    router.refresh();
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eef7f7] px-5">
        <div className="text-center">
          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-[#cce7e3] border-t-[#0a8588]" />
          <p className="mt-4 font-bold text-[#5f7b83]">Oturum kontrol ediliyor...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#eef7f7] px-5 py-10">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#bcebdd]/70 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#c9e8f4]/70 blur-3xl" />

      <section className="relative w-full max-w-md overflow-hidden rounded-[34px] border border-white/80 bg-white p-7 shadow-[0_30px_90px_rgba(14,76,85,.18)] sm:p-9">
        <div className="text-center">
          <div className="relative mx-auto h-20 w-20">
            <Image
              src="/images/farya-logo.png"
              alt="Farya Kimya logosu"
              fill
              priority
              sizes="80px"
              className="object-contain"
            />
          </div>

          <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-[#0a8588]">
            Farya Kimya
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#173f4c]">
            Yönetim Paneli
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#728990]">
            Kategori, ürün ve ürün görsellerini yönetmek için giriş yapın.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-black text-[#315763]"
            >
              E-posta
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ornek@faryakimya.com"
              className="w-full rounded-2xl border border-[#d3e4e5] bg-[#f9fcfc] px-4 py-3.5 text-[#173f4c] outline-none transition focus:border-[#0a8588] focus:bg-white focus:ring-4 focus:ring-[#0a8588]/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-black text-[#315763]"
            >
              Şifre
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Şifrenizi girin"
              className="w-full rounded-2xl border border-[#d3e4e5] bg-[#f9fcfc] px-4 py-3.5 text-[#173f4c] outline-none transition focus:border-[#0a8588] focus:bg-white focus:ring-4 focus:ring-[#0a8588]/10"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center rounded-2xl bg-[#0a8588] px-5 py-4 font-black text-white shadow-[0_14px_35px_rgba(10,133,136,.24)] transition hover:-translate-y-0.5 hover:bg-[#087377] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center text-sm font-bold text-[#668089] transition hover:text-[#0a8588]"
        >
          Siteye geri dön
        </a>
      </section>
    </main>
  );
}

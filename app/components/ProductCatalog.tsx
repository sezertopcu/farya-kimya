"use client";

import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase";

type CategoryRow = {
  id: string;
  name: string;
  sort_order: number;
};

type ProductRow = {
  id: string;
  category_id: string;
  name: string;
  image_url: string | null;
  image_path: string | null;
  sort_order: number;
};

export default function ProductCatalog() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCatalog() {
      setLoading(true);
      setError("");

      const [{ data: categoryData, error: categoryError }, { data: productData, error: productError }] =
        await Promise.all([
          supabase
            .from("product_categories")
            .select("id, name, sort_order")
            .order("sort_order", { ascending: true })
            .order("name", { ascending: true }),
          supabase
            .from("catalog_products")
            .select("id, category_id, name, image_url, image_path, sort_order")
            .order("sort_order", { ascending: true })
            .order("name", { ascending: true }),
        ]);

      if (cancelled) return;

      if (categoryError || productError) {
        setError(
          categoryError?.message ||
            productError?.message ||
            "Ürün kataloğu yüklenirken bir hata oluştu."
        );
        setLoading(false);
        return;
      }

      const nextCategories = categoryData ?? [];
      const nextProducts = productData ?? [];

      setCategories(nextCategories);
      setProducts(nextProducts);

      setActiveCategoryId((current) => {
        if (current && nextCategories.some((category) => category.id === current)) {
          return current;
        }

        return nextCategories[0]?.id ?? "";
      });

      setLoading(false);
    }

    void loadCatalog();

    const channel = supabase
      .channel("public-product-catalog")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_categories" },
        () => void loadCatalog()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "catalog_products" },
        () => void loadCatalog()
      )
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, []);

  const productCounts = useMemo(() => {
    return products.reduce<Record<string, number>>((counts, product) => {
      counts[product.category_id] = (counts[product.category_id] ?? 0) + 1;
      return counts;
    }, {});
  }, [products]);

  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId
  );

  const visibleProducts = products.filter(
    (product) => product.category_id === activeCategoryId
  );

  return (
    <section className="relative z-10 -mt-12 pb-20 sm:-mt-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-[#d6e8e8] bg-white shadow-[0_28px_80px_rgba(15,78,86,.14)]">
          <div className="border-b border-[#deebec] bg-gradient-to-r from-[#effaf7] to-[#edf6fb] px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0a8588]">
                  Ürün Kataloğu
                </p>
              </div>

              <p className="text-sm font-bold text-[#68838b]">
                {categories.length} kategori · {products.length} ürün
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[420px] items-center justify-center px-6 py-16 text-center">
              <div>
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#d5ece8] border-t-[#0a8588]" />
                <p className="mt-4 font-bold text-[#5f7b83]">Katalog yükleniyor...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex min-h-[420px] items-center justify-center px-6 py-16 text-center">
              <div className="max-w-md rounded-3xl border border-red-200 bg-red-50 p-6">
                <p className="font-black text-red-700">Katalog yüklenemedi</p>
                <p className="mt-2 text-sm leading-6 text-red-600">{error}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="border-b border-[#deebec] p-4 lg:hidden">
                <label
                  htmlFor="mobile-category"
                  className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-[#5d7b84]"
                >
                  Kategori seçin
                </label>

                <select
                  id="mobile-category"
                  value={activeCategoryId}
                  onChange={(event) => setActiveCategoryId(event.target.value)}
                  className="w-full rounded-2xl border border-[#cfe2e3] bg-white px-4 py-3.5 font-bold text-[#173f4c] outline-none focus:border-[#0a8588]"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({productCounts[category.id] ?? 0})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid h-[640px] lg:grid-cols-[300px_minmax(0,1fr)]">
                <aside className="hidden min-h-0 border-r border-[#deebec] bg-[#f7fbfb] lg:block">
                  <div className="border-b border-[#deebec] px-5 py-4">
                    <p className="text-sm font-black text-[#173f4c]">Kategoriler</p>
                    <p className="mt-1 text-xs text-[#789098]">
                    </p>
                  </div>

                  <div className="h-[566px] overflow-y-auto p-3">
                    {categories.map((category) => {
                      const active = category.id === activeCategoryId;

                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setActiveCategoryId(category.id)}
                          className={`mb-2 flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition ${
                            active
                              ? "bg-[#bfeee5] text-[#123f49] shadow-sm"
                              : "bg-white text-[#47656f] hover:bg-[#eaf7f4] hover:text-[#0a8588]"
                          }`}
                        >
                          <span className="line-clamp-2 text-sm font-black">
                            {category.name}
                          </span>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${
                              active
                                ? "bg-white/80 text-[#0a8588]"
                                : "bg-[#edf5f5] text-[#6d858d]"
                            }`}
                          >
                            {productCounts[category.id] ?? 0}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                <div className="min-h-0 bg-white">
                  <div className="flex h-full min-h-0 flex-col">
                    <div className="border-b border-[#deebec] px-5 py-4 sm:px-6">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-xl font-black text-[#173f4c]">
                          {activeCategory?.name ?? "Ürünler"}
                        </h3>

                        <p className="text-sm font-bold text-[#6f878f]">
                          {visibleProducts.length} ürün
                        </p>
                      </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                      {visibleProducts.length === 0 ? (
                        <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-[#cfe2e3] bg-[#f8fbfb] p-8 text-center">
                          <div>
                            <p className="font-black text-[#315864]">
                              Bu kategoride henüz ürün bulunmuyor.
                            </p>
                            <p className="mt-2 text-sm text-[#748c93]">
                              Yeni ürünler admin panelinden eklenebilir.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {visibleProducts.map((product) => (
                            <article
                              key={product.id}
                              className="overflow-hidden rounded-[26px] border border-[#dce9ea] bg-[#fbfdfd] transition hover:-translate-y-1 hover:border-[#a9d9d1] hover:shadow-[0_18px_45px_rgba(15,97,99,.1)]"
                            >
                              <div className="flex h-44 items-center justify-center overflow-hidden bg-white p-4">
                                {product.image_url ? (
                                  <img
                                    src={product.image_url}
                                    alt={product.name}
                                    loading="lazy"
                                    className="h-full w-full object-contain"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-[#cfe0e2] bg-[#f4f8f8] px-4 text-center">
                                    <p className="text-sm font-bold leading-6 text-[#84979d]">
                                      Ürün görseli mevcut değil
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="border-t border-[#e4eeee] px-4 py-4">
                                <h4 className="min-h-[48px] text-[15px] font-black leading-6 text-[#234b57]">
                                  {product.name}
                                </h4>
                              </div>
                            </article>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

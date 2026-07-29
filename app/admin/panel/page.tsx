"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

type Notice =
  | {
      type: "success" | "error";
      message: string;
    }
  | null;

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AdminPanelPage() {
  const router = useRouter();

  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [email, setEmail] = useState("");

  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState("");

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newProductName, setNewProductName] = useState("");

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProductName, setEditingProductName] = useState("");

  const [workingKey, setWorkingKey] = useState("");
  const [notice, setNotice] = useState<Notice>(null);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const loadCatalog = useCallback(async () => {
    setDataLoading(true);

    const [
      { data: categoryData, error: categoryError },
      { data: productData, error: productError },
    ] = await Promise.all([
      supabase
        .from("product_categories")
        .select("id, name, sort_order")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),
      supabase
        .from("catalog_products")
        .select(
          "id, category_id, name, image_url, image_path, sort_order"
        )
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),
    ]);

    if (categoryError || productError) {
      setNotice({
        type: "error",
        message:
          categoryError?.message ||
          productError?.message ||
          "Katalog verileri yüklenemedi.",
      });
      setDataLoading(false);
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

    setDataLoading(false);
  }, []);

  useEffect(() => {
    let active = true;

    async function protectPage() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      if (!user) {
        router.replace("/admin");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      if (error || profile?.role !== "admin") {
        await supabase.auth.signOut();
        router.replace("/admin");
        return;
      }

      setEmail(user.email ?? "");
      setAuthLoading(false);
      await loadCatalog();
    }

    void protectPage();

    return () => {
      active = false;
    };
  }, [loadCatalog, router]);

  useEffect(() => {
    if (authLoading) return;

    const channel = supabase
      .channel("admin-catalog-realtime")
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
      void supabase.removeChannel(channel);
    };
  }, [authLoading, loadCatalog]);

  useEffect(() => {
    if (!notice) return;

    const timeout = window.setTimeout(() => {
      setNotice(null);
    }, 4200);

    return () => window.clearTimeout(timeout);
  }, [notice]);

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

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin");
    router.refresh();
  }

  async function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = newCategoryName.trim();

    if (!name) {
      setNotice({
        type: "error",
        message: "Kategori adını yazın.",
      });
      return;
    }

    setWorkingKey("create-category");

    const maxSortOrder = categories.reduce(
      (max, category) => Math.max(max, category.sort_order),
      0
    );

    const { data, error } = await supabase
      .from("product_categories")
      .insert({
        name,
        sort_order: maxSortOrder + 1,
      })
      .select("id, name, sort_order")
      .single();

    setWorkingKey("");

    if (error || !data) {
      setNotice({
        type: "error",
        message: error?.message || "Kategori oluşturulamadı.",
      });
      return;
    }

    setNewCategoryName("");
    setActiveCategoryId(data.id);
    setNotice({
      type: "success",
      message: "Yeni kategori oluşturuldu.",
    });

    await loadCatalog();
  }

  function startCategoryEdit(category: CategoryRow) {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
  }

  async function handleUpdateCategory(categoryId: string) {
    const name = editingCategoryName.trim();

    if (!name) {
      setNotice({
        type: "error",
        message: "Kategori adı boş bırakılamaz.",
      });
      return;
    }

    setWorkingKey(`update-category-${categoryId}`);

    const { error } = await supabase
      .from("product_categories")
      .update({ name })
      .eq("id", categoryId);

    setWorkingKey("");

    if (error) {
      setNotice({
        type: "error",
        message: error.message || "Kategori güncellenemedi.",
      });
      return;
    }

    setEditingCategoryId(null);
    setEditingCategoryName("");
    setNotice({
      type: "success",
      message: "Kategori adı güncellendi.",
    });

    await loadCatalog();
  }

  async function handleDeleteCategory(category: CategoryRow) {
    const categoryProducts = products.filter(
      (product) => product.category_id === category.id
    );

    const approved = window.confirm(
      `"${category.name}" kategorisini ve içindeki ${categoryProducts.length} ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`
    );

    if (!approved) return;

    setWorkingKey(`delete-category-${category.id}`);

    const storagePaths = categoryProducts
      .map((product) => product.image_path)
      .filter((path): path is string => Boolean(path));

    if (storagePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("product-images")
        .remove(storagePaths);

      if (storageError) {
        setWorkingKey("");
        setNotice({
          type: "error",
          message:
            "Kategori silinemedi çünkü bazı ürün görselleri Storage alanından kaldırılamadı.",
        });
        return;
      }
    }

    const { error } = await supabase
      .from("product_categories")
      .delete()
      .eq("id", category.id);

    setWorkingKey("");

    if (error) {
      setNotice({
        type: "error",
        message: error.message || "Kategori silinemedi.",
      });
      return;
    }

    setNotice({
      type: "success",
      message: "Kategori ve içindeki ürünler silindi.",
    });

    await loadCatalog();
  }

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = newProductName.trim();

    if (!activeCategoryId) {
      setNotice({
        type: "error",
        message: "Önce bir kategori seçin.",
      });
      return;
    }

    if (!name) {
      setNotice({
        type: "error",
        message: "Ürün adını yazın.",
      });
      return;
    }

    setWorkingKey("create-product");

    const categoryProducts = products.filter(
      (product) => product.category_id === activeCategoryId
    );

    const maxSortOrder = categoryProducts.reduce(
      (max, product) => Math.max(max, product.sort_order),
      0
    );

    const { error } = await supabase.from("catalog_products").insert({
      category_id: activeCategoryId,
      name,
      sort_order: maxSortOrder + 1,
    });

    setWorkingKey("");

    if (error) {
      setNotice({
        type: "error",
        message: error.message || "Ürün oluşturulamadı.",
      });
      return;
    }

    setNewProductName("");
    setNotice({
      type: "success",
      message: "Yeni ürün oluşturuldu.",
    });

    await loadCatalog();
  }

  function startProductEdit(product: ProductRow) {
    setEditingProductId(product.id);
    setEditingProductName(product.name);
  }

  async function handleUpdateProduct(productId: string) {
    const name = editingProductName.trim();

    if (!name) {
      setNotice({
        type: "error",
        message: "Ürün adı boş bırakılamaz.",
      });
      return;
    }

    setWorkingKey(`update-product-${productId}`);

    const { error } = await supabase
      .from("catalog_products")
      .update({ name })
      .eq("id", productId);

    setWorkingKey("");

    if (error) {
      setNotice({
        type: "error",
        message: error.message || "Ürün güncellenemedi.",
      });
      return;
    }

    setEditingProductId(null);
    setEditingProductName("");
    setNotice({
      type: "success",
      message: "Ürün adı güncellendi.",
    });

    await loadCatalog();
  }

  async function handleDeleteProduct(product: ProductRow) {
    const approved = window.confirm(
      `"${product.name}" ürününü silmek istediğinize emin misiniz?`
    );

    if (!approved) return;

    setWorkingKey(`delete-product-${product.id}`);

    if (product.image_path) {
      const { error: storageError } = await supabase.storage
        .from("product-images")
        .remove([product.image_path]);

      if (storageError) {
        setWorkingKey("");
        setNotice({
          type: "error",
          message: "Ürün görseli Storage alanından silinemedi.",
        });
        return;
      }
    }

    const { error } = await supabase
      .from("catalog_products")
      .delete()
      .eq("id", product.id);

    setWorkingKey("");

    if (error) {
      setNotice({
        type: "error",
        message: error.message || "Ürün silinemedi.",
      });
      return;
    }

    setNotice({
      type: "success",
      message: "Ürün silindi.",
    });

    await loadCatalog();
  }

  function getFileExtension(file: File) {
    if (file.type === "image/png") return "png";
    if (file.type === "image/webp") return "webp";
    return "jpg";
  }

  async function handleImageUpload(
    product: ProductRow,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setNotice({
        type: "error",
        message: "Yalnızca JPG, JPEG, PNG veya WEBP görseller yüklenebilir.",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setNotice({
        type: "error",
        message: "Görsel dosyası en fazla 10 MB olabilir.",
      });
      return;
    }

    setWorkingKey(`upload-image-${product.id}`);

    const extension = getFileExtension(file);
    const newPath = `products/${product.id}-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(newPath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      setWorkingKey("");
      setNotice({
        type: "error",
        message: uploadError.message || "Görsel yüklenemedi.",
      });
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(newPath);

    const { error: updateError } = await supabase
      .from("catalog_products")
      .update({
        image_url: publicUrl,
        image_path: newPath,
      })
      .eq("id", product.id);

    if (updateError) {
      await supabase.storage.from("product-images").remove([newPath]);
      setWorkingKey("");
      setNotice({
        type: "error",
        message:
          updateError.message ||
          "Görsel yüklendi ancak ürün kaydı güncellenemedi.",
      });
      return;
    }

    if (product.image_path) {
      await supabase.storage
        .from("product-images")
        .remove([product.image_path]);
    }

    setWorkingKey("");
    setNotice({
      type: "success",
      message: "Ürün görseli başarıyla yüklendi.",
    });

    await loadCatalog();
  }

  async function handleDeleteImage(product: ProductRow) {
    if (!product.image_path) return;

    const approved = window.confirm(
      `"${product.name}" ürününün görselini silmek istediğinize emin misiniz?`
    );

    if (!approved) return;

    setWorkingKey(`delete-image-${product.id}`);

    const { error: storageError } = await supabase.storage
      .from("product-images")
      .remove([product.image_path]);

    if (storageError) {
      setWorkingKey("");
      setNotice({
        type: "error",
        message: storageError.message || "Görsel Storage alanından silinemedi.",
      });
      return;
    }

    const { error: updateError } = await supabase
      .from("catalog_products")
      .update({
        image_url: null,
        image_path: null,
      })
      .eq("id", product.id);

    setWorkingKey("");

    if (updateError) {
      setNotice({
        type: "error",
        message:
          updateError.message ||
          "Görsel silindi ancak ürün kaydı güncellenemedi.",
      });
      return;
    }

    setNotice({
      type: "success",
      message: "Ürün görseli silindi.",
    });

    await loadCatalog();
  }

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eef7f7] px-5">
        <div className="text-center">
          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-[#cce7e3] border-t-[#0a8588]" />
          <p className="mt-4 font-bold text-[#5f7b83]">
            Yönetim paneli hazırlanıyor...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef7f7]">
      {notice && (
        <div
          className={`fixed right-5 top-5 z-[200] max-w-sm rounded-2xl border px-5 py-4 text-sm font-bold shadow-2xl ${
            notice.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.message}
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-[#d8e8e9] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <Image
                src="/images/farya-logo.png"
                alt="Farya Kimya logosu"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>

            <div>
              <p className="font-black text-[#173f4c]">Farya Kimya</p>
              <p className="text-xs font-bold text-[#789098]">Yönetim Paneli</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/urunlerimiz"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-[#cfe1e2] bg-white px-4 py-2.5 text-sm font-black text-[#315763] transition hover:border-[#0a8588] hover:text-[#0a8588] sm:inline-flex"
            >
              Kataloğu Gör
            </a>

            <p className="hidden text-sm font-bold text-[#668089] lg:block">
              {email}
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-[#d3e4e5] bg-white px-4 py-2.5 text-sm font-black text-[#315763] transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-5 lg:px-8">
        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[26px] border border-[#d8e8e9] bg-white p-5 shadow-[0_12px_35px_rgba(15,78,86,.07)]">
            <p className="text-3xl font-black text-[#0a8588]">
              {categories.length}
            </p>
            <p className="mt-1 text-sm font-bold text-[#6f878f]">
              Toplam kategori
            </p>
          </div>

          <div className="rounded-[26px] border border-[#d8e8e9] bg-white p-5 shadow-[0_12px_35px_rgba(15,78,86,.07)]">
            <p className="text-3xl font-black text-[#0a8588]">
              {products.length}
            </p>
            <p className="mt-1 text-sm font-bold text-[#6f878f]">
              Toplam ürün
            </p>
          </div>

          <div className="rounded-[26px] border border-[#d8e8e9] bg-white p-5 shadow-[0_12px_35px_rgba(15,78,86,.07)]">
            <p className="text-3xl font-black text-[#0a8588]">
              {products.filter((product) => product.image_url).length}
            </p>
            <p className="mt-1 text-sm font-bold text-[#6f878f]">
              Görseli bulunan ürün
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-[32px] border border-[#d8e8e9] bg-white shadow-[0_20px_60px_rgba(15,78,86,.09)]">
          {dataLoading ? (
            <div className="flex min-h-[620px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#cce7e3] border-t-[#0a8588]" />
                <p className="mt-4 font-bold text-[#5f7b83]">
                  Katalog yükleniyor...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid min-h-[720px] lg:grid-cols-[340px_minmax(0,1fr)]">
              <aside className="border-b border-[#dce9ea] bg-[#f7fbfb] lg:border-b-0 lg:border-r">
                <div className="border-b border-[#dce9ea] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0a8588]">
                    Kategoriler
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-[#173f4c]">
                    Kategori yönetimi
                  </h2>

                  <form onSubmit={handleCreateCategory} className="mt-5 flex gap-2">
                    <input
                      value={newCategoryName}
                      onChange={(event) => setNewCategoryName(event.target.value)}
                      placeholder="Yeni kategori adı"
                      className="min-w-0 flex-1 rounded-2xl border border-[#d3e4e5] bg-white px-4 py-3 text-sm font-bold text-[#173f4c] outline-none focus:border-[#0a8588]"
                    />

                    <button
                      type="submit"
                      disabled={workingKey === "create-category"}
                      className="rounded-2xl bg-[#0a8588] px-4 py-3 text-sm font-black text-white disabled:opacity-60"
                    >
                      {workingKey === "create-category" ? "..." : "+ Ekle"}
                    </button>
                  </form>
                </div>

                <div className="max-h-[570px] overflow-y-auto p-3 lg:max-h-[760px]">
                  {categories.map((category) => {
                    const active = category.id === activeCategoryId;
                    const editing = editingCategoryId === category.id;

                    return (
                      <div
                        key={category.id}
                        className={`mb-2 rounded-2xl border p-3 transition ${
                          active
                            ? "border-[#9cd8cf] bg-[#dff7f1]"
                            : "border-transparent bg-white hover:border-[#d2e6e4]"
                        }`}
                      >
                        {editing ? (
                          <div className="space-y-2">
                            <input
                              value={editingCategoryName}
                              onChange={(event) =>
                                setEditingCategoryName(event.target.value)
                              }
                              className="w-full rounded-xl border border-[#bcdad8] bg-white px-3 py-2.5 text-sm font-bold outline-none focus:border-[#0a8588]"
                            />

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  void handleUpdateCategory(category.id)
                                }
                                disabled={
                                  workingKey ===
                                  `update-category-${category.id}`
                                }
                                className="flex-1 rounded-xl bg-[#0a8588] px-3 py-2 text-xs font-black text-white disabled:opacity-60"
                              >
                                Kaydet
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCategoryId(null);
                                  setEditingCategoryName("");
                                }}
                                className="flex-1 rounded-xl border border-[#d3e4e5] bg-white px-3 py-2 text-xs font-black text-[#4f6b74]"
                              >
                                İptal
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => setActiveCategoryId(category.id)}
                              className="flex w-full items-center justify-between gap-3 text-left"
                            >
                              <span className="text-sm font-black leading-5 text-[#234b57]">
                                {category.name}
                              </span>

                              <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-black text-[#0a8588]">
                                {productCounts[category.id] ?? 0}
                              </span>
                            </button>

                            <div className="mt-3 flex gap-2">
                              <button
                                type="button"
                                onClick={() => startCategoryEdit(category)}
                                className="flex-1 rounded-xl border border-[#cfe1e2] bg-white px-3 py-2 text-xs font-black text-[#315763] hover:border-[#0a8588] hover:text-[#0a8588]"
                              >
                                Düzenle
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  void handleDeleteCategory(category)
                                }
                                disabled={
                                  workingKey ===
                                  `delete-category-${category.id}`
                                }
                                className="flex-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-black text-red-700 disabled:opacity-60"
                              >
                                Sil
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </aside>

              <div className="min-w-0">
                <div className="border-b border-[#dce9ea] bg-white p-5 sm:p-6">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0a8588]">
                        Seçili kategori
                      </p>

                      <h2 className="mt-2 text-2xl font-black text-[#173f4c] sm:text-3xl">
                        {activeCategory?.name ?? "Kategori seçin"}
                      </h2>

                      <p className="mt-2 text-sm font-bold text-[#758c93]">
                        {visibleProducts.length} ürün
                      </p>
                    </div>

                    <form
                      onSubmit={handleCreateProduct}
                      className="flex w-full max-w-xl flex-col gap-2 sm:flex-row"
                    >
                      <input
                        value={newProductName}
                        onChange={(event) =>
                          setNewProductName(event.target.value)
                        }
                        placeholder="Yeni ürün adı"
                        disabled={!activeCategoryId}
                        className="min-w-0 flex-1 rounded-2xl border border-[#d3e4e5] bg-[#f9fcfc] px-4 py-3.5 text-sm font-bold text-[#173f4c] outline-none focus:border-[#0a8588] disabled:opacity-50"
                      />

                      <button
                        type="submit"
                        disabled={
                          !activeCategoryId ||
                          workingKey === "create-product"
                        }
                        className="rounded-2xl bg-[#0a8588] px-5 py-3.5 text-sm font-black text-white disabled:opacity-60"
                      >
                        {workingKey === "create-product"
                          ? "Ekleniyor..."
                          : "+ Yeni Ürün"}
                      </button>
                    </form>
                  </div>
                </div>

                <div className="max-h-[760px] overflow-y-auto p-4 sm:p-6">
                  {!activeCategory ? (
                    <div className="rounded-3xl border border-dashed border-[#cfe1e2] bg-[#f8fbfb] p-10 text-center">
                      <p className="font-black text-[#315763]">
                        Önce bir kategori oluşturun veya seçin.
                      </p>
                    </div>
                  ) : visibleProducts.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-[#cfe1e2] bg-[#f8fbfb] p-10 text-center">
                      <p className="font-black text-[#315763]">
                        Bu kategoride henüz ürün bulunmuyor.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {visibleProducts.map((product) => {
                        const editing = editingProductId === product.id;
                        const uploading =
                          workingKey === `upload-image-${product.id}`;
                        const deletingImage =
                          workingKey === `delete-image-${product.id}`;
                        const deletingProduct =
                          workingKey === `delete-product-${product.id}`;

                        return (
                          <article
                            key={product.id}
                            className="grid gap-4 rounded-[26px] border border-[#dce9ea] bg-[#fbfdfd] p-4 sm:grid-cols-[140px_minmax(0,1fr)_220px] sm:items-center"
                          >
                            <div className="flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-[#dce9ea] bg-white p-3">
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="h-full w-full object-contain"
                                />
                              ) : (
                                <p className="px-2 text-center text-xs font-bold leading-5 text-[#8a9da2]">
                                  Ürün görseli mevcut değil
                                </p>
                              )}
                            </div>

                            <div className="min-w-0">
                              {editing ? (
                                <div className="space-y-3">
                                  <input
                                    value={editingProductName}
                                    onChange={(event) =>
                                      setEditingProductName(event.target.value)
                                    }
                                    className="w-full rounded-2xl border border-[#c6dddd] bg-white px-4 py-3 font-bold text-[#173f4c] outline-none focus:border-[#0a8588]"
                                  />

                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        void handleUpdateProduct(product.id)
                                      }
                                      disabled={
                                        workingKey ===
                                        `update-product-${product.id}`
                                      }
                                      className="rounded-xl bg-[#0a8588] px-4 py-2.5 text-xs font-black text-white disabled:opacity-60"
                                    >
                                      Kaydet
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingProductId(null);
                                        setEditingProductName("");
                                      }}
                                      className="rounded-xl border border-[#d3e4e5] bg-white px-4 py-2.5 text-xs font-black text-[#4f6b74]"
                                    >
                                      İptal
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#88a0a6]">
                                    Ürün
                                  </p>

                                  <h3 className="mt-2 break-words text-lg font-black leading-7 text-[#234b57]">
                                    {product.name}
                                  </h3>

                                  <p className="mt-2 break-all text-xs text-[#91a3a8]">
                                    {product.id}
                                  </p>
                                </>
                              )}
                            </div>

                            <div className="grid gap-2">
                              <input
                                ref={(element) => {
                                  fileInputRefs.current[product.id] = element;
                                }}
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                                onChange={(event) =>
                                  void handleImageUpload(product, event)
                                }
                                className="hidden"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  fileInputRefs.current[product.id]?.click()
                                }
                                disabled={uploading}
                                className="rounded-2xl bg-[#0a8588] px-4 py-3 text-sm font-black text-white disabled:opacity-60"
                              >
                                {uploading
                                  ? "Yükleniyor..."
                                  : product.image_url
                                    ? "Görseli Değiştir"
                                    : "+ Görsel Yükle"}
                              </button>

                              {product.image_url && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    void handleDeleteImage(product)
                                  }
                                  disabled={deletingImage}
                                  className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-black text-amber-800 disabled:opacity-60"
                                >
                                  {deletingImage
                                    ? "Siliniyor..."
                                    : "Görseli Sil"}
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => startProductEdit(product)}
                                className="rounded-2xl border border-[#cfe1e2] bg-white px-4 py-3 text-sm font-black text-[#315763]"
                              >
                                Ürün Adını Düzenle
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  void handleDeleteProduct(product)
                                }
                                disabled={deletingProduct}
                                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700 disabled:opacity-60"
                              >
                                {deletingProduct ? "Siliniyor..." : "Ürünü Sil"}
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

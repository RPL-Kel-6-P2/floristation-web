import { useMemo, useState, useEffect } from "react";
import { listenProducts } from "../firebase/productService";
import ProductCard from "../components/ProductCard";

function Katalog() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { label: "Semua", value: "Semua" },
    { label: "Fresh Flowers", value: "Fresh Flowers" },
    { label: "Artificial Flowers", value: "Artificial Flowers" },
    { label: "Snack Bouquet", value: "Snack Bouquet" },
    { label: "Graduation Bouquet", value: "Graduation Bouquet" },
    { label: "Bloom Box Arrangement", value: "Bloom Box Arrangement" },
  ];

  // ✅ Realtime listener dari Firestore
  useEffect(() => {
    const unsubscribe = listenProducts((data) => {
      setProducts(data);
      setLoading(false);
    });

    // Cleanup listener saat komponen unmount
    return () => unsubscribe();
  }, []);

  // ✅ Filter produk: pakai field Firestore (nama, kategori, ketersediaan)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        activeCategory === "Semua" || product.kategori === activeCategory;

      const matchSearch = (product.nama || "")
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, searchKeyword]);

  return (
    <>
      {/* HEADER */}
      <header className="bg-[#2f435e] px-7 pb-5 pt-5">
        <h1 className="font-serif text-[23px] font-semibold italic text-white">
          Floristation.id
        </h1>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-b from-[#eadfd2] to-[#f6f1eb] px-5 py-5 text-center">
        <h2 className="text-[20px] font-semibold text-[#2f435e]">
          Keindahan untuk Setiap Momen
        </h2>
        <p className="mt-2 text-[15px] text-[#8e8883]">
          🌸 Buket segar & artificial di Bogor
        </p>
      </section>

      {/* SEARCH */}
      <section className="px-6 py-3">
        <div className="flex h-[55px] items-center rounded-[22px] border border-[#ded8d1] bg-[#f8f4ef] px-5">
          <span className="mr-3 text-[16px] text-slate-400">🔍</span>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Cari produk bunga..."
            className="w-full bg-transparent text-[15px] text-[#2f435e] outline-none placeholder:text-[#8f9bb0]"
          />
        </div>
      </section>

      {/* CATEGORY */}
      <section className="px-5 pb-5">
        <div className="hide-scrollbar flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setActiveCategory(category.value)}
              className={`h-[46px] shrink-0 rounded-[18px] border px-5 text-[13px] font-semibold transition-all duration-300 ${
                activeCategory === category.value
                  ? "border-[#2f435e] bg-[#2f435e] text-white shadow-md"
                  : "border-[#d8d8d8] bg-white text-[#2f435e]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT AREA */}
      <main className="px-5 pb-6 pt-5">

        {/* TITLE */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#2f435e]">
            Produk Kami
          </h3>
          {!loading && (
            <p className="text-[13px] text-slate-400">
              {filteredProducts.length} produk
            </p>
          )}
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-4">
            <div className="text-4xl animate-pulse">🌸</div>
            <p className="text-[14px] text-slate-400">Memuat produk...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center">
            <p className="text-center text-[14px] text-slate-400">
              Produk tidak ditemukan.
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default Katalog;
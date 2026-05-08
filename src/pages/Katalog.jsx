import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Katalog() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchKeyword, setSearchKeyword] = useState("");

  const categories = [
    { label: "Semua", value: "Semua" },
    { label: "Fresh Flowers", value: "Fresh Flowers" },
    { label: "Artificial Flowers", value: "Artificial Flowers" },
    { label: "Snack Bouquet", value: "Snack Bouquet" },
    { label: "Graduation Bouquet", value: "Graduation Bouquet" },
    { label: "Bloom Box Arrangement", value: "Bloom Box Arrangement" },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        activeCategory === "Semua" ||
        product.category === activeCategory;

      const matchSearch = (product.name || "")
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchKeyword]);

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      {/* FRAME MOBILE */}
      <div className="relative h-screen max-h-[932px] w-[430px] max-w-full overflow-hidden rounded-[38px] bg-[#f6f1eb] shadow-[0_18px_45px_rgba(39,55,77,0.22)]">

        {/* SCROLL CONTENT */}
        <div className="hide-scrollbar h-full overflow-y-auto pb-[100px]">

          {/* HEADER */}
          <header className="bg-[#2f435e] px-7 pb-5 pt-5">
            <h1 className="font-serif text-[23px] font-semibold italic text-white">
              Floristation.id
            </h1>
          </header>

          {/* HERO */}
          <section className="bg-gradient-to-b from-[#eadfd2] to-[#f6f1eb] px-5 py-6 text-center">
            <h2 className="text-[20px] font-semibold text-[#2f435e]">
              Keindahan untuk Setiap Momen
            </h2>

            <p className="mt-2 text-[15px] text-[#8e8883]">
              🌸 Buket segar & artificial di Bogor
            </p>
          </section>

          {/* SEARCH */}
          <section className="bg-white px-5 py-5">
            <div className="flex h-[58px] items-center rounded-[20px] border border-[#ded8d1] bg-[#f8f4ef] px-5">
              <span className="mr-3 text-[16px] text-slate-400">
                🔍
              </span>

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
          <section className="bg-white px-5 pb-5">
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
          <main className="bg-[#f6f1eb] px-5 pb-6 pt-5">

            {/* TITLE */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-[#2f435e]">
                Produk Kami
              </h3>

              <p className="text-[13px] text-slate-400">
                {filteredProducts.length} produk
              </p>
            </div>

            {filteredProducts.length > 0 ? (
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
        </div>

        {/* BOTTOM NAV */}
        <nav className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#e8e0d8] bg-white px-8 py-3 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">

            <button
              type="button"
              className="flex flex-col items-center justify-center rounded-[14px] bg-[#f7f1eb] px-4 py-2 text-[#c45f32]"
            >
              <span className="text-[18px] leading-none">
                🏠
              </span>

              <span className="mt-1 text-[10px] font-semibold">
                Beranda
              </span>
            </button>

            <button
              type="button"
              className="flex flex-col items-center justify-center px-4 py-2 text-[#b8a48c]"
            >
              <span className="text-[18px] leading-none">
                📋
              </span>

              <span className="mt-1 text-[10px] font-medium">
                Draft
              </span>
            </button>

            <button
              type="button"
              className="flex flex-col items-center justify-center px-4 py-2 text-[#7fb4e7]"
            >
              <span className="text-[18px] leading-none">
                ℹ️
              </span>

              <span className="mt-1 text-[10px] font-medium">
                Info
              </span>
            </button>

          </div>
        </nav>
      </div>
    </div>
  );
}

export default Katalog;
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import CustomerFrame from "../components/CustomerFrame";

function KatalogDetailArtificial() {
  const navigate = useNavigate();

  const categories = ["Semua", "Fresh Flowers", "Artificial", "Snack Bouquet"];

  // Untuk sekarang ini tetap kosong dulu,
  // karena data products belum diberi category Artificial.
  const artificialProducts = products.filter(
    (product) => product.category === "Artificial"
  );

  const handleCategoryClick = (item) => {
    if (item === "Semua") {
      navigate("/");
    }

    if (item === "Artificial") {
      navigate("/katalog-detail-artificial");
    }
  };

  return (
    <CustomerFrame>
      <div className="h-full overflow-y-auto bg-[#f7f1eb] pb-32">
        {/* HEADER */}
        <header className="bg-[#2f435e] px-5 py-6 text-white">
          <h1 className="font-serif text-xl italic font-semibold">
            Floristation.id
          </h1>
        </header>

        {/* HERO */}
        <section className="bg-[#e8dccf] px-4 py-8 text-center">
          <h2 className="text-base font-semibold text-[#2f435e]">
            Keindahan untuk Setiap Momen
          </h2>
          <p className="mt-3 text-sm font-light text-slate-500">
            Buket segar & artificial di Bogor
          </p>
        </section>

        {/* FILTER CATEGORY */}
        <section className="border-t-2 border-dashed border-slate-200 bg-white px-4 py-4">
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => handleCategoryClick(item)}
                className={`h-10 shrink-0 rounded-full border border-[#2f435e] px-4 text-xs font-medium transition-colors ${
                  item === "Artificial"
                    ? "bg-[#2f435e] text-white"
                    : "bg-white text-[#2f435e]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCT LIST */}
        <main className="grid grid-cols-2 gap-4 px-4 pt-4">
          {artificialProducts.length > 0 ? (
            artificialProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                status={product.status}
                image={product.image}
              />
            ))
          ) : (
            <p className="col-span-2 mt-20 text-center text-sm italic text-slate-400">
              Belum ada produk Artificial
            </p>
          )}
        </main>
      </div>

      {/* BOTTOM NAV */}
      <nav className="absolute bottom-6 left-1/2 grid w-[92%] -translate-x-1/2 grid-cols-4 rounded-[32px] border border-slate-100 bg-white px-2 py-3 text-center text-[10px] shadow-xl">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center justify-center text-slate-400"
        >
          <span className="text-xl leading-none opacity-70">🏠</span>
          <span className="mt-1">Beranda</span>
        </button>

        <button
          onClick={() => navigate("/katalog-detail-artificial")}
          className="flex flex-col items-center justify-center font-bold text-[#2f435e]"
        >
          <span className="text-xl leading-none">📦</span>
          <span className="mt-1">Katalog</span>
        </button>

        <button className="flex flex-col items-center justify-center text-slate-400">
          <span className="text-xl leading-none opacity-70">🛒</span>
          <span className="mt-1">Pesan</span>
        </button>

        <button className="flex flex-col items-center justify-center text-slate-400">
          <span className="text-xl leading-none opacity-70">ℹ️</span>
          <span className="mt-1">Info</span>
        </button>
      </nav>
    </CustomerFrame>
  );
}

export default KatalogDetailArtificial;
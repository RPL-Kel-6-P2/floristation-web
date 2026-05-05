import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function KatalogDetailArtificial() {
  const navigate = useNavigate();

  // Memfilter produk untuk hanya menampilkan kategori Artificial
  const artificialProducts = products.filter(p => p.category === "Artificial");

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {/* Container utama dengan rounded-[2.5rem] dan max-w-[390px] */}
      <div className="mx-auto min-h-screen max-w-[390px] overflow-hidden rounded-[2.5rem] bg-[#f7f1eb] shadow-2xl relative">
        
        {/* HEADER - Ukuran py-5 */}
        <header className="bg-[#2f435e] px-4 py-5 text-white">
          <h1 className="font-serif text-lg italic">Floristation.id</h1>
        </header>

        {/* BANNER SECTION - Ukuran py-7 */}
        <section className="bg-[#e9ddcf] px-4 py-7 text-center">
          <h2 className="text-base font-medium text-[#2f435e]">Keindahan untuk Setiap Momen</h2>
          <p className="mt-3 text-sm text-slate-500">Buket segar & artificial di Bogor</p>
        </section>

        {/* FILTER CATEGORY - Menandai "Artificial" sebagai yang aktif */}
        <section className="border-t-2 border-dashed border-slate-200 bg-white px-4 py-4">
          <div className="flex gap-2">
            {["Semua", "Fresh Flowers", "Artificial", "Snack Bouquet"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Semua") navigate("/");
                  if (item === "Snack Bouquet") navigate("/detail-snack");
                }}
                className={`rounded-full border px-3 py-2 text-xs transition-colors ${
                  item === "Artificial" ? "bg-[#2f435e] text-white" : "bg-white text-[#2f435e]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCT GRID - Menggunakan filtered list */}
        <main className="grid grid-cols-2 gap-4 px-4 pb-36">
          {artificialProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => {
                if (product.name === "CELLINE WHITE") navigate("/detail-celine");
                if (product.name === "ORELA S") navigate("/detail-orela");
              }}
              className="cursor-pointer active:scale-95 transition-transform"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </main>

        {/* NAVIGASI BAWAH - Menonjolkan ikon "Katalog" (📦) */}
        <nav className="absolute bottom-6 left-1/2 grid w-[92%] -translate-x-1/2 grid-cols-4 rounded-[2rem] bg-white px-2 py-3 text-center text-[10px] shadow-xl border border-slate-50">
          <div 
            className="flex flex-col items-center text-slate-400 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <span className="text-xl opacity-60">🏠</span>
            <span>Beranda</span>
          </div>
          <div className="flex flex-col items-center text-[#2f435e] font-bold cursor-pointer">
            <span className="text-xl">📦</span>
            <span>Katalog</span>
          </div>
          <div className="flex flex-col items-center text-slate-400 cursor-pointer">
            <span className="text-xl opacity-60">🛒</span>
            <span>Pesan</span>
          </div>
          <div className="flex flex-col items-center text-slate-400 cursor-pointer">
            <span className="text-xl opacity-60">ℹ️</span>
            <span>Info</span>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default KatalogDetailArtificial;
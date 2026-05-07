import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Katalog() {
  const navigate = useNavigate();

  // List kategori lengkap sesuai manajemen produk
  const categories = [
    "Semua", 
    "Fresh Flowers", 
    "Artificial Flowers", 
    "Snack Bouquet", 
    "Graduation Bouquet", 
    "Bloom Box Arrangement"
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto min-h-screen max-w-[390px] overflow-hidden rounded-[2.5rem] bg-[#f7f1eb] shadow-2xl relative">
        
        <header className="bg-[#2f435e] px-4 py-5 text-white">
          <h1 className="font-serif text-lg italic">Floristation.id</h1>
        </header>

        <section className="bg-[#e9ddcf] px-4 py-7 text-center">
          <h2 className="text-base font-medium text-[#2f435e]">Keindahan untuk Setiap Momen</h2>
          <p className="mt-3 text-sm text-slate-500 font-light">Buket segar & artificial di Bogor</p>
        </section>

        {/* SECTION KATEGORI DENGAN HORIZONTAL SCROLL */}
        <section className="border-t-2 border-dashed border-slate-200 bg-white px-4 py-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => {
                  // Logika navigasi kategori
                  if (item === "Artificial Flowers") navigate("/katalog-detail-artificial");
                }}
                className={`rounded-full border px-4 py-2 text-[11px] font-medium transition-colors whitespace-nowrap ${
                  item === "Semua" 
                    ? "bg-[#2f435e] text-white border-[#2f435e]" 
                    : "bg-white text-[#2f435e] border-slate-200 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <main className="grid grid-cols-2 gap-4 px-4 pb-36 pt-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => {
                // Logika navigasi berdasarkan nama produk
                if (product.name === "ASTERIA XS") navigate("/detail-asteria");
                if (product.name === "CELLINE WHITE") navigate("/detail-celine");
                if (product.name === "ORELA S") navigate("/detail-orela");
                if (product.category === "Snack Bouquet") navigate("/detail-snack");
              }}
              className="cursor-pointer active:scale-95 transition-transform"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </main>

        {/* BOTTOM NAVIGATION */}
        <nav className="absolute bottom-6 left-1/2 grid w-[92%] -translate-x-1/2 grid-cols-4 rounded-[2rem] bg-white px-2 py-3 text-center text-[10px] shadow-xl border border-slate-50">
          <div className="flex flex-col items-center text-[#2f435e] font-bold cursor-pointer">
            <span className="text-xl">🏠</span>
            <span>Beranda</span>
          </div>
          <div className="flex flex-col items-center text-slate-400 cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-xl opacity-60">📦</span>
            <span>Katalog</span>
          </div>
          <div className="flex flex-col items-center text-slate-400">
            <span className="text-xl opacity-60">🛒</span>
            <span>Pesan</span>
          </div>
          <div className="flex flex-col items-center text-slate-400">
            <span className="text-xl opacity-60">ℹ️</span>
            <span>Info</span>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Katalog;
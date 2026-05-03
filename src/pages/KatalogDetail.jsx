import ProductCard from "../components/ProductCard";

const artificialProduct = {
  id: 2,
  name: "CELLINE WHITE",
  price: "Rp70.000",
  status: "Tersedia",
  image: "/images/celline-white.png",
};

function KatalogDetail() {
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto min-h-screen max-w-[390px] overflow-hidden rounded-3xl bg-[#f7f1eb] shadow-2xl">
        
        <header className="bg-[#2f435e] px-4 py-5 text-white">
          <h1 className="font-serif text-lg italic">Floristation.id</h1>
        </header>

        <section className="bg-[#e9ddcf] px-4 py-7 text-center">
          <h2 className="text-base font-medium text-[#2f435e]">
            Keindahan untuk Setiap Momen
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Buket segar & artificial di Bogor
          </p>
        </section>

        <section className="border-t-2 border-dashed border-slate-200 bg-white px-4 py-4">
          <div className="flex gap-2">
            {["Semua", "Fresh Flowers", "Artificial", "Snack Bouquet"].map(
              (item) => (
                <button
                  key={item}
                  className={`rounded-full border px-3 py-2 text-xs ${
                    item === "Artificial"
                      ? "bg-[#2f435e] text-white"
                      : "bg-white text-[#2f435e]"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </section>

        <main className="grid grid-cols-2 gap-4 px-4 pb-24">
          <ProductCard {...artificialProduct} />
        </main>

        <nav className="fixed bottom-4 left-1/2 grid w-[390px] -translate-x-1/2 grid-cols-4 bg-white px-4 py-3 text-center text-xs text-slate-500">
          <div>🏠<br />Beranda</div>
          <div>📦<br />Katalog</div>
          <div>🛒<br />Pesan</div>
          <div>ℹ️<br />Info</div>
        </nav>

      </div>
    </div>
  );
}

export default KatalogDetail;
import { useNavigate } from "react-router-dom";

function ProductDetailAsteria() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {/* Container utama sesuai ukuran Celine */}
      <div className="mx-auto min-h-screen max-w-[390px] overflow-hidden bg-white shadow-2xl">
        
        {/* HEADER */}
        <header className="bg-[#2f435e] px-4 py-4 text-white">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer text-sm flex items-center gap-2"
          >
            ← Detail Produk
          </p>
        </header>

        <main className="px-6 py-8 pb-24">
          {/* Gambar Produk Asteria */}
          <img
            src="/images/asteria-xs.png"
            alt="ASTERIA XS"
            className="h-72 w-full rounded-2xl object-cover"
          />

          <section className="mt-8">
            <h1 className="text-xl font-semibold text-[#2f435e]">
              ASTERIA XS
            </h1>

            <p className="mt-4 text-sm text-[#2f435e]">Rp50.000</p>

            <div className="mt-5">
              <p className="text-sm text-slate-500">Komposisi:</p>
              <p className="mt-1 text-xs uppercase leading-relaxed text-[#2f435e]">
                CHRYSAN ASTER, PAKIS
              </p>
            </div>

            <p className="mt-7 w-fit rounded-lg bg-green-100 px-3 py-2 text-sm text-green-600">
              ✓ Tersedia
            </p>
          </section>
        </main>

        {/* Floating Button Footer */}
        <div className="fixed bottom-4 left-1/2 w-[390px] -translate-x-1/2 bg-white px-6 py-4">
          <button
            onClick={() => navigate("/order")}
            className="w-full rounded-xl bg-[#2f435e] py-3 text-sm text-white font-medium active:scale-95 transition-transform"
          >
            Pesan Sekarang
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default ProductDetailAsteria;
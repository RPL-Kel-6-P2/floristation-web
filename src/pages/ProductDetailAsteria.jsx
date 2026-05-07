import { useNavigate } from "react-router-dom";

function ProductDetailAsteria() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      {/* FRAME IPHONE */}
      <div className="relative h-[932px] w-[430px] max-w-full overflow-hidden bg-[#f7f2ec] shadow-2xl">
        {/* HEADER */}
        <header className="bg-[#2f435e] px-5 py-5 text-white">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-[26px] leading-none"
            >
              ←
            </button>

            <h1 className="text-[20px] font-medium">Detail Produk</h1>
          </div>
        </header>

        {/* CONTENT SCROLL */}
        <main className="h-full overflow-y-auto pb-[105px]">
          {/* GAMBAR PRODUK */}
          <img
            src="/images/Fresh Flowers Asteria XS.jpeg"
            alt="Asteria XS"
            className="h-[392px] w-full object-cover"
          />

          {/* DETAIL PRODUK */}
          <section className="mx-5 mt-3 bg-white px-6 py-6">
            <h2 className="text-[26px] font-medium tracking-wide text-[#2f435e]">
              ASTERIA (XS)
            </h2>

            <p className="mt-4 text-[17px] text-[#2f435e]">Rp50.000</p>

            <div className="mt-6">
              <p className="text-[16px] text-slate-400">Komposisi:</p>
              <p className="mt-2 text-[16px] tracking-wide text-[#2f435e]">
                CHRYSAN ASTER, PAKIS
              </p>
            </div>

            <div className="mt-6">
              <p className="text-[16px] text-slate-400">Ukuran:</p>

              <div className="mt-3 flex h-11 w-14 items-center justify-center rounded-[12px] bg-[#2f435e] text-[16px] font-medium text-white">
                XS
              </div>
            </div>

            <div className="mt-5">
              <span className="inline-flex items-center rounded-[12px] bg-green-100 px-4 py-2 text-[16px] font-medium text-green-600">
                ✓ Tersedia
              </span>
            </div>
          </section>
        </main>

        {/* BUTTON BAWAH */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/order")}
            className="w-full rounded-[14px] bg-[#2f435e] py-4 text-[17px] font-medium text-white active:scale-95 transition-transform"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailAsteria;
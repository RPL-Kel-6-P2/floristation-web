import { useNavigate } from "react-router-dom";

function ProductDetailRafaela() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      <div className="relative h-[932px] w-[430px] max-w-full overflow-hidden bg-[#f7f2ec] shadow-2xl">
        {/* HEADER */}
        <header className="h-[56px] bg-[#2f435e] px-5 text-white flex items-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mr-4 text-[24px] leading-none"
          >
            ←
          </button>

          <h1 className="text-[18px] font-medium">Detail Produk</h1>
        </header>

        {/* CONTENT */}
        <main className="h-full overflow-y-auto pb-[96px]">
          {/* IMAGE */}
          <div className="h-[365px] w-full overflow-hidden bg-[#f1ede8]">
            <img
              src="/images/Fresh Flowers Rafaela M.jpeg"
              alt="Rafaela M"
              className="h-full w-full object-cover"
              style={{
                objectPosition: "center 52%",
              }}
            />
          </div>

          {/* DETAIL CARD */}
          <section className="mx-4 mt-2 bg-white px-6 py-5">
            <h2 className="text-[25px] font-medium tracking-wide text-[#2f435e]">
              RAFAELA (M)
            </h2>

            <p className="mt-3 text-[16px] text-[#2f435e]">Rp285.000</p>

            <div className="mt-4">
              <p className="text-[15px] text-slate-400">Komposisi:</p>
              <p className="mt-2 text-[14px] uppercase leading-relaxed text-[#2f435e]">
                GARBERA, RAFAEL/CALIMERO, CHRYSAN, BABY BREATH
              </p>
            </div>

            <div className="mt-4">
              <p className="text-[15px] text-slate-400">Ukuran:</p>

              <div className="mt-3 flex h-10 w-12 items-center justify-center rounded-[10px] bg-[#2f435e] text-[15px] font-medium text-white">
                M
              </div>
            </div>

            <div className="mt-4">
              <span className="inline-flex items-center rounded-[12px] bg-green-100 px-4 py-2 text-[15px] font-medium text-green-600">
                ✓ Tersedia
              </span>
            </div>
          </section>
        </main>

        {/* BOTTOM BUTTON */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4">
          <button
            type="button"
            onClick={() => navigate("/order")}
            className="w-full rounded-[13px] bg-[#2f435e] py-4 text-[16px] font-medium text-white active:scale-95 transition-transform"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailRafaela;
import { useNavigate } from "react-router-dom";

function ProductDetailValenciaBlue() {
  const navigate = useNavigate();
  const produk = {
  name: "VALENCIA BLUE (L)",
  price: "Rp195.000",
  image: "/images/Graduation Valencia Blue L.png"
};

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      <div className="relative h-[932px] w-[430px] max-w-full overflow-hidden rounded-[38px] bg-[#f7f2ec] shadow-2xl">
        
        {/* HEADER */}
        <header className="bg-[#2f435e] px-5 py-5 text-white">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-[26px] leading-none"
            >
              ←
            </button>
            <h1 className="text-[20px] font-medium">Detail Produk</h1>
          </div>
        </header>

        {/* CONTENT */}
        <main className="h-full overflow-y-auto pb-[105px]">
          
          {/* IMAGE */}
          <img
            src="/images/Graduation Valencia Blue L.png"
            alt="Valencia Blue"
            className="h-[392px] w-full object-cover object-center"
          />

          {/* CARD PUTIH */}
          <section className="mx-5 mt-3 bg-white px-6 py-5 rounded-[16px] shadow-sm">
            
            {/* TITLE */}
            <h2 className="text-[26px] font-medium tracking-wide text-[#2f435e]">
              VALENCIA BLUE (L)
            </h2>

            {/* PRICE */}
            <p className="mt-3 text-[17px] text-[#2f435e]">
              Rp195.000
            </p>

            {/* KOMPOSISI */}
            <div className="mt-4">
              <p className="text-[16px] text-slate-400">
                Komposisi:
              </p>

              <p className="mt-1 text-[16px] tracking-wide text-[#2f435e]">
                GRADUATION DOLL, ROSE, GOMPIE, HYDRANGEA, BABY ROSE, DRIED CASPEA, SILVER DOLLAR
              </p>
            </div>

            {/* SIZE */}
            <div className="mt-4">
              <p className="text-[16px] text-slate-400">
                Ukuran:
              </p>

              <div className="mt-2 flex h-11 w-14 items-center justify-center rounded-[12px] bg-[#2f435e] text-white">
                L
              </div>
            </div>

            {/* STATUS */}
            <div className="mt-4">
              <span className="inline-flex items-center rounded-[12px] bg-green-100 px-4 py-2 text-green-600">
                ✓ Tersedia
              </span>
            </div>

          </section>
        </main>

        {/* BUTTON */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/order", { state: produk })}
            className="w-full rounded-[14px] bg-[#2f435e] py-4 text-white active:scale-95 transition-transform"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailValenciaBlue;
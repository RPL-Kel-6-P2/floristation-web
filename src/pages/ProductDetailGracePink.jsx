import { useNavigate } from "react-router-dom";

function ProductDetailGracePink() {
  const navigate = useNavigate();
  const produk = {
  name: "GRACE PINK (S)",
  price: "Rp70.000",
  image: "/images/artificial-grace-pink.jpeg"
};

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      <div className="relative h-[932px] w-[430px] max-w-full overflow-hidden bg-[#f7f2ec] shadow-2xl">
        
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

            <h1 className="text-[20px] font-medium">
              Detail Produk
            </h1>
          </div>
        </header>

        {/* CONTENT */}
        <main className="h-full overflow-y-auto pb-[105px]">
          
          {/* PRODUCT IMAGE */}
          <img
            src="/images/artificial-grace-pink.jpeg"
            alt="Grace Pink Bouquet"
            className="h-[392px] w-full object-cover object-center"
          />

          {/* PRODUCT DETAIL */}
          <section className="mx-5 mt-3 bg-white px-6 py-5">
            
            {/* TITLE */}
            <h2 className="text-[26px] font-medium tracking-wide text-[#2f435e]">
              GRACE PINK
            </h2>

            {/* PRICE */}
            <p className="mt-3 text-[17px] text-[#2f435e]">
              Rp285.000
            </p>

            {/* COMPOSITION */}
            <div className="mt-4">
              <p className="text-[16px] text-slate-400">
                Komposisi:
              </p>

              <p className="mt-1 text-[16px] tracking-wide text-[#2f435e]">
                ARTIFICIAL ROSE, BABY BREATH, PREMIUM WRAPPING
              </p>
            </div>

            {/* SIZE */}
            <div className="mt-4">
              <p className="text-[16px] text-slate-400">
                Ukuran:
              </p>

              <div className="mt-2 flex h-11 w-14 items-center justify-center rounded-[12px] bg-[#2f435e] text-[16px] font-medium text-white">
                M
              </div>
            </div>

            {/* STOCK */}
            <div className="mt-4">
              <span className="inline-flex items-center rounded-[12px] bg-green-100 px-4 py-2 text-[16px] font-medium text-green-600">
                ✓ Tersedia
              </span>
            </div>
          </section>
        </main>

        {/* ORDER BUTTON */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/order", { state: produk })}
            className="w-full rounded-[14px] bg-[#2f435e] py-4 text-[17px] font-medium text-white transition-transform active:scale-95"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailGracePink;
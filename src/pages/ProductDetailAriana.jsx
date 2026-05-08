import { useNavigate } from "react-router-dom";

function ProductDetailAriana() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      <div className="relative h-[932px] w-[430px] max-w-full overflow-hidden rounded-[38px] bg-[#f7f2ec] shadow-2xl">
        <header className="bg-[#2f435e] px-5 py-5 text-white">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => navigate(-1)} className="text-[26px] leading-none">←</button>
            <h1 className="text-[20px] font-medium">Detail Produk</h1>
          </div>
        </header>

        <main className="h-full overflow-y-auto pb-[105px]">
          <img
            src="/images/Fresh Flowers Ariana S.jpeg"
            alt="Ariana S"
            className="h-[392px] w-full object-cover object-top"
          />
          <section className="mx-5 mt-3 bg-white px-6 py-5">
            <h2 className="text-[26px] font-medium tracking-wide text-[#2f435e]">ARIANA (S)</h2>
            <p className="mt-3 text-[17px] text-[#2f435e]">Rp165.000</p>
            <div className="mt-4">
              <p className="text-[16px] text-slate-400">Komposisi:</p>
              <p className="mt-1 text-[16px] tracking-wide text-[#2f435e]">GARBERA, CALIMERO, BABY BREATH</p>
            </div>
            <div className="mt-4">
              <p className="text-[16px] text-slate-400">Ukuran:</p>
              <div className="mt-2 flex h-11 w-14 items-center justify-center rounded-[12px] bg-[#2f435e] text-[16px] font-medium text-white">S</div>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-[12px] bg-green-100 px-4 py-2 text-[16px] font-medium text-green-600">✓ Tersedia</span>
            </div>
          </section>
        </main>

        <div className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4">
          <button type="button" onClick={() => navigate("/order")} className="w-full rounded-[14px] bg-[#2f435e] py-4 text-[17px] font-medium text-white active:scale-95 transition-transform">
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailAriana;
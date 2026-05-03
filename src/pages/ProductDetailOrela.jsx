function ProductDetailOrela() {
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto min-h-screen max-w-[390px] overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* HEADER */}
        <header className="bg-[#2f435e] px-4 py-4 text-white">
          <p className="text-sm">← Detail Produk</p>
        </header>

        {/* CONTENT */}
        <main className="px-6 py-8 pb-24">

          <img
            src="/images/orella-basket-one-side.png"
            alt="ORELA BASKET"
            className="h-72 w-full rounded-2xl object-cover"
          />

          <section className="mt-8">
            <h1 className="text-lg font-semibold text-[#2f435e]">
              ORELA BASKET (M) ONE SIDE
            </h1>

            <p className="mt-3 text-sm text-[#2f435e]">
              Rp625.000
            </p>

            <div className="mt-5">
              <p className="text-sm text-slate-500">Komposisi:</p>
              <p className="mt-1 text-xs uppercase leading-relaxed text-[#2f435e]">
                FRESH FLOWERS: ROSE, CALIMERO, CARNATION, SILVER DOLLA
              </p>
            </div>

            {/* UKURAN */}
            <div className="mt-5">
              <p className="text-sm text-slate-500">Ukuran:</p>
              <button className="mt-2 rounded-md bg-[#2f435e] px-3 py-1 text-sm text-white">
                M
              </button>
            </div>

            {/* STATUS HABIS */}
            <p className="mt-6 w-fit rounded-md border border-red-400 px-3 py-1 text-sm text-red-500">
              ✕ Habis
            </p>

          </section>
        </main>

        {/* BUTTON (DISABLED) */}
        <div className="fixed bottom-4 left-1/2 w-[390px] -translate-x-1/2 bg-white px-6 py-4">
          <button className="w-full rounded-xl bg-gray-300 py-3 text-sm text-white">
            Pesan Sekarang
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetailOrela;
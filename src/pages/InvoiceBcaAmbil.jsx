function InvoiceBcaAmbil() {
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto min-h-screen max-w-[390px] bg-[#f7f1eb] shadow-2xl">

        {/* HEADER SUCCESS */}
        <div className="flex flex-col items-center bg-green-100 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-green-500 text-3xl text-green-500">
            ✓
          </div>
          <h2 className="mt-4 text-lg font-semibold text-green-700">
            Pesanan Tercatat!
          </h2>
          <p className="mt-1 text-sm text-green-700">
            ID: #FLR-2216
          </p>
        </div>

        <main className="space-y-6 px-4 py-6 pb-10">

          {/* PRODUK */}
          <section className="flex gap-4 rounded-2xl bg-white p-4">
            <img
              src="/images/celline-white.png"
              className="h-20 w-20 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-[#2f435e]">
                CELINE WHITE
              </h2>
              <p className="text-[#2f435e]">Rp70.000</p>
            </div>
          </section>

          {/* DETAIL */}
          <section className="rounded-2xl bg-white p-4 text-sm text-[#2f435e]">
            <h3 className="mb-4 text-lg font-semibold">
              Detail Pesanan
            </h3>

            <div className="space-y-2">
              <p className="flex justify-between">
                <span>ID Pesanan:</span>
                <span>FLR-2216</span>
              </p>
              <p className="flex justify-between">
                <span>Nama Pemesan:</span>
                <span>Raya Andini</span>
              </p>
              <p className="flex justify-between">
                <span>Nama Penerima:</span>
                <span>Fira Maharani</span>
              </p>
              <p className="flex justify-between">
                <span>Tanggal & Jam:</span>
                <span>2026-04-26 16:00</span>
              </p>
              <p className="flex justify-between">
                <span>Metode:</span>
                <span>Ambil di Toko</span>
              </p>
              <p className="flex justify-between">
                <span>Greeting Card:</span>
                <span>Selamat Wisuda yaa!!</span>
              </p>
              <p className="flex justify-between">
                <span>Pembayaran:</span>
                <span>BCA</span>
              </p>
            </div>

            <div className="mt-4 border-t pt-3">
              <p className="flex justify-between font-medium">
                <span>Total Harga:</span>
                <span>Rp70.000</span>
              </p>
            </div>
          </section>

          {/* BUTTON */}
          <button className="w-full rounded-xl bg-green-600 py-4 text-white">
            Konfirmasi via WhatsApp Admin
          </button>

          <button className="w-full rounded-xl border py-4 text-[#2f435e]">
            Kembali ke Beranda
          </button>

        </main>
      </div>
    </div>
  );
}

export default InvoiceBcaAmbil;
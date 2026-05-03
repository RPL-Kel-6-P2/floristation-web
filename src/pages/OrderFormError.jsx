function OrderFormError() {
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto min-h-screen max-w-[390px] bg-[#f7f1eb] shadow-2xl">

        {/* HEADER */}
        <header className="bg-[#2f435e] px-5 py-5 text-white">
          <p className="text-lg font-medium">← Form Pemesanan</p>
        </header>

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

          {/* METODE + WAKTU */}
          <section className="rounded-2xl bg-white p-4 space-y-4">
            <h3 className="text-lg font-semibold text-[#2f435e]">
              Metode Pengambilan
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-xl bg-[#2f435e] py-3 text-white">
                Ambil di Toko
              </button>
              <button className="rounded-xl bg-[#e9ddcf] py-3 text-[#2f435e]">
                Kirim GoSend
              </button>
            </div>

            {/* TANGGAL */}
            <div>
              <label className="text-sm text-slate-500">
                Tanggal Pengambilan *
              </label>
              <input className="mt-2 w-full rounded-xl border border-red-500 bg-[#f7f1eb] p-3" />
              <p className="mt-1 text-sm text-red-500">
                Tanggal wajib diisi
              </p>
            </div>

            {/* JAM */}
            <div>
              <label className="text-sm text-slate-500">
                Jam Pengambilan *
              </label>
              <input className="mt-2 w-full rounded-xl border border-red-500 bg-[#f7f1eb] p-3" />
              <p className="mt-1 text-sm text-red-500">
                Waktu wajib diisi
              </p>
            </div>
          </section>

          {/* DATA PEMESAN */}
          <section className="rounded-2xl bg-white p-4 space-y-4">
            <h3 className="text-lg font-semibold text-[#2f435e]">
              Data Pemesan
            </h3>

            <div>
              <label className="text-sm text-slate-500">
                Nama Pemesan *
              </label>
              <input className="mt-2 w-full rounded-xl border border-red-500 bg-[#f7f1eb] p-3" />
              <p className="text-sm text-red-500">
                Nama wajib diisi
              </p>
            </div>

            <div>
              <label className="text-sm text-slate-500">
                No WhatsApp *
              </label>
              <input
                placeholder="08xxxxxxxxxx"
                className="mt-2 w-full rounded-xl border border-red-500 bg-[#f7f1eb] p-3 placeholder:text-slate-400"
              />
              <p className="text-sm text-red-500">
                No WhatsApp wajib diisi
              </p>
            </div>
          </section>

          {/* DATA PENERIMA */}
          <section className="rounded-2xl bg-white p-4 space-y-4">
            <h3 className="text-lg font-semibold text-[#2f435e]">
              Data Penerima
            </h3>

            <div>
              <label className="text-sm text-slate-500">
                Nama Penerima *
              </label>
              <input className="mt-2 w-full rounded-xl border border-red-500 bg-[#f7f1eb] p-3" />
              <p className="text-sm text-red-500">
                Nama penerima wajib diisi
              </p>
            </div>

            <div>
              <label className="text-sm text-slate-500">
                No Telepon Penerima *
              </label>
              <input
                placeholder="08xxxxxxxxxx"
                className="mt-2 w-full rounded-xl border border-red-500 bg-[#f7f1eb] p-3 placeholder:text-slate-400"
              />
              <p className="text-sm text-red-500">
                No telepon wajib diisi
              </p>
            </div>
          </section>

          {/* GREETING */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="text-lg font-semibold text-[#2f435e]">
              Greeting Card
            </h3>
            <textarea
              placeholder="Tulis pesan untuk kartu ucapan (opsional)"
              className="mt-3 h-24 w-full rounded-xl border border-slate-300 bg-[#f7f1eb] p-3 placeholder:text-slate-400"
            />
          </section>

          {/* PEMBAYARAN */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="text-lg font-semibold text-[#2f435e]">
              Metode Pembayaran
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button className="rounded-xl bg-[#2f435e] py-3 text-white">
                QRIS
              </button>
              <button className="rounded-xl bg-[#e9ddcf] py-3 text-[#2f435e]">
                Transfer BCA
              </button>
            </div>
          </section>

          {/* GOODIE */}
          <section className="flex items-center gap-3 rounded-2xl bg-white p-4 text-[#2f435e]">
            <div className="h-5 w-5 border border-black"></div>
            <p className="text-sm font-medium">
              Tambah Goodie Bag (+Rp5.000)
            </p>
          </section>

          {/* BUTTON */}
          <button className="w-full rounded-xl bg-[#2f435e] py-4 text-white">
            Kirim Pesanan
          </button>

        </main>
      </div>
    </div>
  );
}

export default OrderFormError;
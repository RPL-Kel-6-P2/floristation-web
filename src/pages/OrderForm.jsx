import { useNavigate } from "react-router-dom";

function OrderForm() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto min-h-screen max-w-[390px] overflow-hidden bg-[#f7f1eb] shadow-2xl">
        
        {/* HEADER */}
        <header className="bg-[#2f435e] px-5 py-5 text-white">
          <p
            onClick={() => navigate("/detail-celine")}
            className="cursor-pointer text-lg font-medium"
          >
            ← Form Pemesanan
          </p>
        </header>

        <main className="space-y-6 px-4 py-6 pb-8">
          
          {/* PRODUK */}
          <section className="flex gap-4 rounded-2xl bg-white p-4">
            <img
              src="/images/celline-white.png"
              alt="CELINE WHITE"
              className="h-20 w-20 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-[#2f435e]">
                CELINE WHITE
              </h2>
              <p className="mt-1 text-base text-[#2f435e]">Rp70.000</p>
            </div>
          </section>

          {/* DATA WAKTU */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-5 text-lg font-semibold text-[#2f435e]">
              Data Waktu
            </h3>

            <label className="text-sm text-slate-500">
              Tanggal Pengambilan *
            </label>
            <input className="mt-2 mb-5 w-full rounded-xl border p-3 bg-[#f7f1eb]" />

            <label className="text-sm text-slate-500">
              Waktu Pengambilan *
            </label>
            <input className="mt-2 w-full rounded-xl border p-3 bg-[#f7f1eb]" />
          </section>

          {/* METODE */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-5 text-lg font-semibold text-[#2f435e]">
              Metode Pengambilan
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-xl bg-[#2f435e] py-3 text-white">
                Ambil di Toko
              </button>
              <button className="rounded-xl bg-[#f7f1eb] py-3 text-[#2f435e]">
                Kirim GoSend
              </button>
            </div>
          </section>

          {/* DATA PEMESAN */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-5 text-lg font-semibold text-[#2f435e]">
              Data Pemesan
            </h3>

            <label className="text-sm text-slate-500">
              Nama Pemesan *
            </label>
            <input className="mt-2 mb-5 w-full rounded-xl border p-3 bg-[#f7f1eb]" />

            <label className="text-sm text-slate-500">
              No WhatsApp *
            </label>
            <input
              placeholder="08xxxxxxxxxx"
              className="mt-2 w-full rounded-xl border p-3 bg-[#f7f1eb]"
            />
          </section>

          {/* DATA PENERIMA */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-5 text-lg font-semibold text-[#2f435e]">
              Data Penerima
            </h3>

            <label className="text-sm text-slate-500">
              Nama Penerima *
            </label>
            <input className="mt-2 mb-5 w-full rounded-xl border p-3 bg-[#f7f1eb]" />

            <label className="text-sm text-slate-500">
              No Telepon Penerima *
            </label>
            <input
              placeholder="08xxxxxxxxxx"
              className="mt-2 w-full rounded-xl border p-3 bg-[#f7f1eb]"
            />
          </section>

          {/* GREETING */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-5 text-lg font-semibold text-[#2f435e]">
              Greeting Card
            </h3>
            <textarea
              placeholder="Tulis pesan untuk kartu ucapan (opsional)"
              className="h-24 w-full rounded-xl border p-3 bg-[#f7f1eb]"
            />
          </section>

          {/* PEMBAYARAN */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-5 text-lg font-semibold text-[#2f435e]">
              Metode Pembayaran
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-xl bg-[#2f435e] py-3 text-white">
                QRIS
              </button>
              <button className="rounded-xl bg-[#f7f1eb] py-3 text-[#2f435e]">
                Transfer BCA
              </button>
            </div>
          </section>

          {/* GOODIE BAG */}
          <section className="flex items-center gap-3 rounded-2xl bg-white p-4">
            <div className="h-5 w-5 border border-black"></div>
            <p className="text-sm">
              Tambah Goodie Bag (+Rp5.000)
            </p>
          </section>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/invoice-qris-ambil")}
            className="w-full rounded-xl bg-[#2f435e] py-4 text-white"
          >
            Kirim Pesanan
          </button>

        </main>
      </div>
    </div>
  );
}

export default OrderForm;
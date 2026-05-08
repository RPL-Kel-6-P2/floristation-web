import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderForm() {
  const navigate = useNavigate();
  const [metodeAmbil, setMetodeAmbil] = useState("ambil");
  const [metodeBayar, setMetodeBayar] = useState("qris");
  const [goodieBag, setGoodieBag] = useState(false);

  const hargaProduk = 50000;
  const hargaGoodie = 5000;
  const total = hargaProduk + (goodieBag ? hargaGoodie : 0);

  const formatRupiah = (n) => "Rp" + n.toLocaleString("id-ID");

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      <div className="relative w-[430px] max-w-full bg-[#f7f1eb] shadow-[0_18px_45px_rgba(39,55,77,0.22)] rounded-[38px] overflow-hidden">

        {/* HEADER */}
        <header className="bg-[#2f435e] px-5 py-5 text-white">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => navigate(-1)} className="text-[26px] leading-none">←</button>
            <h1 className="text-[20px] font-medium">Form Pemesanan</h1>
          </div>
        </header>

        <main className="space-y-4 px-4 py-5 pb-10">

          {/* PRODUK */}
          <section className="flex gap-4 rounded-2xl bg-white p-4 items-center">
            <img
              src="/images/Fresh Flowers Asteria XS.jpeg"
              alt="Asteria XS"
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-[17px] font-semibold text-[#2f435e]">ASTERIA (XS)</h2>
              <p className="mt-1 text-[15px] text-[#2f435e]">Rp50.000</p>
            </div>
          </section>

          {/* METODE PENGAMBILAN */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-4 text-[17px] font-semibold text-[#2f435e]">Metode Pengambilan</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setMetodeAmbil("ambil")}
                className={`rounded-xl py-3 text-[15px] font-medium transition ${metodeAmbil === "ambil" ? "bg-[#2f435e] text-white" : "bg-[#f7f1eb] text-[#2f435e]"}`}
              >
                Ambil di Toko
              </button>
              <button
                type="button"
                onClick={() => setMetodeAmbil("gosend")}
                className={`rounded-xl py-3 text-[15px] font-medium transition ${metodeAmbil === "gosend" ? "bg-[#2f435e] text-white" : "bg-[#f7f1eb] text-[#2f435e]"}`}
              >
                Kirim GoSend
              </button>
            </div>

            {/* TANGGAL */}
            <label className="text-[13px] text-slate-500 flex items-center gap-1 mb-1">
              📅 Tanggal Pengambilan *
            </label>
            <input
              type="date"
              className="mb-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px] text-[#2f435e]"
            />
            <p className="text-[11px] text-slate-400 mb-4">🗓 Klik untuk memilih tanggal</p>

            {/* JAM */}
            <label className="text-[13px] text-slate-500 flex items-center gap-1 mb-1">
              🕐 Jam Pengambilan *
            </label>
            <input
              type="time"
              className="mb-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px] text-[#2f435e]"
            />
            <p className="text-[11px] text-slate-400 mb-4">🕐 Klik untuk memilih jam</p>

            {/* INFO JAM OPERASIONAL */}
            <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
              <p className="text-[13px] font-semibold text-blue-700">🕐 Jam Operasional Toko:</p>
              <p className="text-[13px] text-blue-600 mt-1">Senin-Jumat: 09:00 - 20:00</p>
              <p className="text-[13px] text-blue-600">Sabtu-Minggu: 10:00 - 21:00</p>
            </div>
          </section>

          {/* DATA PEMESAN */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-4 text-[17px] font-semibold text-[#2f435e]">Data Pemesan</h3>
            <label className="text-[13px] text-slate-500">Nama Pemesan *</label>
            <input className="mt-1 mb-4 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px]" />
            <label className="text-[13px] text-slate-500">No WhatsApp *</label>
            <input placeholder="08xxxxxxxxxx" className="mt-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px]" />
          </section>

          {/* DATA PENERIMA */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-4 text-[17px] font-semibold text-[#2f435e]">Data Penerima</h3>
            <label className="text-[13px] text-slate-500">Nama Penerima *</label>
            <input className="mt-1 mb-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px]" />
            <p className="text-[11px] text-slate-400 mb-4">*isi nama yang akan mengambil florist yaa</p>
            <label className="text-[13px] text-slate-500">No Telepon Penerima *</label>
            <input placeholder="08xxxxxxxxxx" className="mt-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px]" />
          </section>

          {/* GREETING */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-4 text-[17px] font-semibold text-[#2f435e]">Greeting Card</h3>
            <textarea
              placeholder="Tulis pesan untuk kartu ucapan (opsional)"
              className="h-24 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px]"
            />
          </section>

          {/* METODE PEMBAYARAN */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-4 text-[17px] font-semibold text-[#2f435e]">Metode Pembayaran</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMetodeBayar("qris")}
                className={`rounded-xl py-3 text-[15px] font-medium transition ${metodeBayar === "qris" ? "bg-[#2f435e] text-white" : "bg-[#f7f1eb] text-[#2f435e]"}`}
              >
                QRIS
              </button>
              <button
                type="button"
                onClick={() => setMetodeBayar("bca")}
                className={`rounded-xl py-3 text-[15px] font-medium transition ${metodeBayar === "bca" ? "bg-[#2f435e] text-white" : "bg-[#f7f1eb] text-[#2f435e]"}`}
              >
                Transfer BCA
              </button>
            </div>
          </section>

          {/* GOODIE BAG */}
          <section
            className="flex items-center gap-3 rounded-2xl bg-white p-4 cursor-pointer"
            onClick={() => setGoodieBag(!goodieBag)}
          >
            <input
              type="checkbox"
              checked={goodieBag}
              onChange={() => setGoodieBag(!goodieBag)}
              className="h-5 w-5 accent-[#2f435e]"
            />
            <div>
              <p className="text-[15px] font-medium text-[#2f435e]">Tambah Goodie Bag <span className="text-[#c45f32]">(+Rp5.000)</span></p>
              <p className="text-[12px] text-slate-400">Tas cantik untuk buket Anda</p>
            </div>
          </section>

          {/* RINGKASAN HARGA */}
          <section className="rounded-2xl bg-[#2f435e] p-4 text-white">
            <p className="text-[13px] text-slate-300 mb-2">Ringkasan Harga</p>
            <div className="flex justify-between text-[14px] mb-1">
              <span>Harga Produk</span>
              <span>{formatRupiah(hargaProduk)}</span>
            </div>
            {goodieBag && (
              <div className="flex justify-between text-[14px] mb-1">
                <span>Goodie Bag</span>
                <span>{formatRupiah(hargaGoodie)}</span>
              </div>
            )}
            <div className="flex justify-between text-[17px] font-bold mt-2 border-t border-slate-500 pt-2">
              <span>Total</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </section>

          {/* TOMBOL KIRIM */}
          <button
            type="button"
            onClick={() => navigate(metodeBayar === "qris" ? "/invoice-qris-ambil" : "/invoice-bca-gosend")}
            className="w-full rounded-xl bg-[#2f435e] py-4 text-[17px] font-medium text-white active:scale-95 transition-transform"
          >
            Kirim Pesanan →
          </button>

        </main>
      </div>
    </div>
  );
}

export default OrderForm;
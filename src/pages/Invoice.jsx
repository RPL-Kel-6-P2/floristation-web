import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Invoice() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const data = location.state;
  const idPesanan = data?.orderId || "FLR-0000";

  if (!data) {
    return <div className="text-center mt-10">Data tidak ditemukan</div>;
  }

  const formatRupiah = (n) => "Rp" + n.toLocaleString("id-ID");

  const hargaProduk = Number(
    (data.produk?.price || "Rp0").replace(/[^0-9]/g, "")
  );

  const hargaGoodie = data.goodieBag ? 5000 : 0;
  const total = hargaProduk + hargaGoodie;

  const metodeAmbilText =
    data.metodeAmbil === "ambil" ? "Ambil di Toko" : "GoSend";

  const metodeBayarText =
    data.metodeBayar === "qris" ? "QRIS" : "Transfer BCA";

  const ADMIN = {
    dramaga: "6285697264377",
    semplak: "6285778684728",
  };

  const message = `Halo Admin Floristation.id, saya ingin konfirmasi pesanan:

*DETAIL PESANAN*
ID: ${idPesanan}
Produk: ${data.produk?.name}
Harga: ${formatRupiah(hargaProduk)}
Goodie Bag: ${data.goodieBag ? "+Rp5.000" : "-"}

*DATA PEMESAN*
Nama: ${data.nama}
Penerima: ${data.namaPenerima}
Tanggal: ${data.tanggal} ${data.jam}

Metode: ${data.metodeAmbil}
Pembayaran: ${data.metodeBayar}

*Total: ${formatRupiah(total)}*
`;

  const kirimWA = (cabang) => {
    const adminNumber = ADMIN[cabang];
    const url = `https://api.whatsapp.com/send?phone=${adminNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#edf1f7] flex justify-center py-6">
      <div className="w-full max-w-[430px] px-4">
        <div className="rounded-[38px] overflow-hidden bg-[#f7f1eb] shadow-[0_18px_45px_rgba(39,55,77,0.22)]">

          <div className="bg-gradient-to-b from-[#ecf9f0] to-[#f7f1eb] px-2 py-4 text-center">
            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-green-600 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" className="fill-current">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <p className="text-[15px] font-semibold uppercase tracking-[0.2em] text-green-700">Pesanan Tercatat!</p>
            <p className="mt-2 text-sm text-slate-500">ID: <span className="font-semibold text-slate-900">#{idPesanan}</span></p>
          </div>

          <div className="space-y-4 p-4 pb-6">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={data.produk?.image}
                  alt={data.produk?.name}
                  className="h-20 w-20 rounded-3xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-base font-semibold text-[#1f2f4f]">{data.produk?.name}</p>
                  <p className="text-sm text-slate-400">{data.produk?.category || "Fresh Flowers"}</p>
                  {data.goodieBag && (
                    <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      Dengan Goodie Bag
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-base font-semibold text-[#1f2f4f]">Detail Pesanan</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {metodeBayarText}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {metodeAmbilText}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">ID Pesanan</span>
                  <span>{idPesanan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nama Pemesan</span>
                  <span>{data.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nama Penerima</span>
                  <span>{data.namaPenerima}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tanggal & Jam</span>
                  <span>{data.tanggal} {data.jam}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pengambilan</span>
                  <span>{metodeAmbilText}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pembayaran</span>
                  <span>{metodeBayarText}</span>
                </div>
                {data.greeting && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Greeting Card</span>
                    <span className="text-right">{data.greeting}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-[#1f324f] p-5 text-white shadow-sm">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <p className="font-medium">Rincian Harga</p>
                <p className="text-slate-400">{metodeBayarText}</p>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between opacity-90">
                  <span>Harga Produk</span>
                  <span>{formatRupiah(hargaProduk)}</span>
                </div>
                {data.goodieBag && (
                  <div className="flex justify-between opacity-90">
                    <span>Goodie Bag</span>
                    <span>{formatRupiah(hargaGoodie)}</span>
                  </div>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4 text-lg font-semibold">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
            </div>

            <button
  onClick={() => setShowPreview(true)}
  className="w-full rounded-2xl bg-emerald-500 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2"
>
  {/* ICON WHATSAPP */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="20"
    height="20"
    fill="currentColor"
  >
    <path d="M16 .4C7.4.4.5 7.3.5 15.9c0 2.8.7 5.4 2 7.8L.4 31.6l8.1-2.1c2.3 1.3 5 2 7.5 2 8.6 0 15.5-6.9 15.5-15.5S24.6.4 16 .4zm0 28.3c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.2-2-1.9-4.3-1.9-6.7C3.2 8.2 9.2 2.2 16 2.2s12.8 6 12.8 13.7S22.8 28.7 16 28.7zm7-10.2c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-2.3-1.1-3.8-2-5.3-4.5-.4-.6.4-.6 1.1-2 .1-.2 0-.5 0-.7-.1-.2-.9-2.2-1.2-3-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.6.1-.9.5-.3.4-1.2 1.2-1.2 3 0 1.8 1.3 3.6 1.5 3.9.2.3 2.5 3.8 6 5.3.8.3 1.4.5 1.9.6.8.2 1.5.2 2.1.1.6-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5z" />
  </svg>

  Konfirmasi via WhatsApp Admin
</button>

            <button
              onClick={() => navigate("/")}
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 text-sm font-semibold text-[#1f2f4f]"
            >
              Kembali ke Beranda
            </button>

            {showPreview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
                <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-2xl">
                  <h3 className="font-semibold text-lg mb-3 text-slate-900">Preview Pesan</h3>
                  <div className="mb-4 max-h-[300px] overflow-y-auto rounded-2xl bg-slate-100 p-3 text-sm whitespace-pre-line text-slate-700">
                    {message}
                  </div>

                  <button
                    onClick={() => kirimWA("dramaga")}
                    className="mb-2 w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white"
                  >
                    Kirim ke Admin Dramaga
                  </button>

                  <button
                    onClick={() => kirimWA("semplak")}
                    className="mb-2 w-full rounded-2xl bg-emerald-500 py-3 text-sm font-semibold text-white"
                  >
                    Kirim ke Admin Semplak
                  </button>

                  <button
                    onClick={() => setShowPreview(false)}
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
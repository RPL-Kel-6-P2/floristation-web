import { useNavigate } from "react-router-dom";

function Info() {
  const navigate = useNavigate();

  return (
    <>
      {/* HEADER */}
      {/* HEADER */}
<div className="bg-[#2f435e] text-white px-5 py-5 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <button onClick={() => navigate(-1)}>←</button>
    <h1 className="text-[20px] font-medium">Info Toko</h1>
  </div>
</div>

      {/* CONTENT */}
      <div className="p-4 space-y-4">

        {/* TENTANG */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-[#2f435e] mb-2">
            Tentang Floristation.id
          </h2>
          <p className="text-sm text-slate-500">
            Floristation adalah UMKM yang bergerak di bidang penjualan buket bunga
            segar dan artificial di Bogor. Kami menyediakan berbagai pilihan buket
            untuk setiap momen spesial Anda seperti wisuda, ulang tahun, anniversary,
            dan acara lainnya.
          </p>

          <div className="mt-4 bg-[#e9dfd5] rounded-xl p-3 text-center text-sm italic text-[#2f435e]">
            "Keindahan untuk Setiap Momen"
          </div>
        </div>

        {/* HUBUNGI */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-[#2f435e] mb-3">
            Hubungi Kami
          </h2>

          <div className="space-y-3 text-sm text-slate-600">

            <div className="flex items-center gap-3">
              <span>📞</span>
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-slate-500">085697264377 (Dramaga)</p>
                <p className="text-slate-500">085778684728 (Semplak)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span>📸</span>
              <div>
                <p className="font-medium">Instagram</p>
                <p>@floristation.id</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span>📍</span>
              <div>
                <p className="font-medium">Alamat</p>
                <p className="text-slate-500">Jl. Dramaga, Bogor</p>
                <p className="text-slate-500">Jl. Semplak, Bogor</p>
              </div>
            </div>

          </div>
        </div>

        {/* JAM OPERASIONAL */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-[#2f435e] mb-3">
            Jam Operasional
          </h2>

          <div className="flex justify-between text-sm text-slate-600">
            <span>Senin - Jumat</span>
            <span>09:00 - 20:00</span>
          </div>

          <div className="flex justify-between text-sm text-slate-600 mt-2">
            <span>Sabtu - Minggu</span>
            <span>10:00 - 21:00</span>
          </div>
        </div>

        {/* METODE PEMBAYARAN */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-[#2f435e] mb-3">
            Metode Pembayaran
          </h2>

          <div className="flex gap-3">
            <div className="flex-1 bg-[#e9dfd5] text-center py-3 rounded-xl font-medium">
              QRIS
            </div>
            <div className="flex-1 bg-[#e9dfd5] text-center py-3 rounded-xl font-medium">
              Transfer BCA
            </div>
          </div>
        </div>

        {/* METODE PENGAMBILAN */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-[#2f435e] mb-3">
            Metode Pengambilan
          </h2>

          <div className="space-y-3 text-sm text-slate-600">

            <div className="flex items-start gap-3">
              <span>✔️</span>
              <div>
                <p className="font-medium">Ambil di Toko</p>
                <p className="text-xs text-slate-400">
                  Gratis, ambil langsung di lokasi
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span>✔️</span>
              <div>
                <p className="font-medium">Pengiriman GoSend</p>
                <p className="text-xs text-slate-400">
                  Area Bogor dan sekitarnya
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default Info;
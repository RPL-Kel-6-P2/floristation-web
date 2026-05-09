import { useNavigate } from "react-router-dom";

function Info() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center py-6">
      <div className="w-[430px] max-w-full bg-[#f7f1eb] rounded-[30px] overflow-hidden shadow-lg">

        {/* HEADER */}
        <div className="bg-[#2f435e] text-white px-5 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>←</button>
          <h1 className="text-lg font-semibold">Info Toko</h1>
        </div>

        <div className="p-4 space-y-4">

          {/* TENTANG */}
          <div className="bg-white rounded-2xl p-4">
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
          <div className="bg-white rounded-2xl p-4">
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
                <svg xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="text-pink-500"
    >
      <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.56 4 20 5.44 20 7.75v8.5c0 2.31-1.44 3.75-3.75 3.75h-8.5C5.44 20 4 18.56 4 16.25v-8.5C4 5.44 5.44 4 7.75 4zm8.25 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
    </svg>

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
          <div className="bg-white rounded-2xl p-4">
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
          <div className="bg-white rounded-2xl p-4">
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
          <div className="bg-white rounded-2xl p-4">
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
      </div>
    </div>
  );
}

export default Info;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const draftKey = "draftOrders";

function OrderForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedProduct = JSON.parse(localStorage.getItem("selectedProduct") || "null");
  const locationState = location.state;
  const stateProduk = locationState?.produk || (locationState?.name ? locationState : savedProduct);

  const [draftId, setDraftId] = useState(null);
  const [produk, setProduk] = useState(stateProduk || {});

  const [metodeAmbil, setMetodeAmbil] = useState("ambil");
  const [metodeBayar, setMetodeBayar] = useState("qris");
  const [goodieBag, setGoodieBag] = useState(false);

  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [namaPenerima, setNamaPenerima] = useState("");
  const [teleponPenerima, setTeleponPenerima] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [greeting, setGreeting] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem(draftKey) || "[]");
    const stateDraftId = locationState?.draftId;
    const stateProduk = locationState?.produk || (locationState?.name ? locationState : savedProduct);

    let loadedDraft = null;

    if (stateDraftId) {
      loadedDraft = savedDrafts.find((item) => item.id === stateDraftId);
    } else if (stateProduk?.name) {
      loadedDraft = savedDrafts.find(
        (item) =>
          item.produk?.name === stateProduk.name &&
          item.produk?.price === stateProduk.price
      );
    }

    if (loadedDraft) {
      setDraftId(loadedDraft.id);
      setProduk(loadedDraft.produk || stateProduk || savedProduct || {});
      setNama(loadedDraft.nama || "");
      setWa(loadedDraft.wa || "");
      setNamaPenerima(loadedDraft.namaPenerima || "");
      setTeleponPenerima(loadedDraft.teleponPenerima || "");
      setTanggal(loadedDraft.tanggal || "");
      setJam(loadedDraft.jam || "");
      setMetodeAmbil(loadedDraft.metodeAmbil || "ambil");
      setMetodeBayar(loadedDraft.metodeBayar || "qris");
      setGoodieBag(loadedDraft.goodieBag || false);
    } else if (stateProduk?.name) {
      setProduk(stateProduk);
    }
  }, []);

  useEffect(() => {
    if (!produk?.name) return;

    // VALIDASI: Draft hanya dibuat jika user sudah isi minimal 2 field
    // Hitung berapa field yang sudah terisi (dari 6 field penting)
    const filledFields = [nama, wa, tanggal, jam, namaPenerima, teleponPenerima].filter(Boolean).length;
    const hasRequiredFields = filledFields >= 2;

    const savedDrafts = JSON.parse(localStorage.getItem(draftKey) || "[]");
    const existingDraft = savedDrafts.find(
      (item) =>
        item.produk?.name === produk.name &&
        item.produk?.price === produk.price
    );
    const id = draftId || existingDraft?.id || `draft-${Date.now()}`;

    // Jika field penting kosong → HAPUS draft
    if (!hasRequiredFields) {
      const nextDrafts = savedDrafts.filter((item) => item.id !== id);
      localStorage.setItem(draftKey, JSON.stringify(nextDrafts));
      setDraftId(null);
      return;
    }

    // Jika field penting terisi → SIMPAN draft
    const draft = {
      id,
      updatedAt: Date.now(),
      produk,
      nama,
      wa,
      namaPenerima,
      teleponPenerima,
      tanggal,
      jam,
      metodeAmbil,
      metodeBayar,
      goodieBag,
    };

    const nextDrafts = [draft, ...savedDrafts.filter((item) => item.id !== id)];
    localStorage.setItem(draftKey, JSON.stringify(nextDrafts));

    if (produk && produk.name) {
      localStorage.setItem("selectedProduct", JSON.stringify(produk));
    }

    setDraftId(id);
  }, [produk, nama, wa, namaPenerima, teleponPenerima, tanggal, jam, metodeAmbil, metodeBayar, goodieBag, draftId]);

  const hargaProduk = Number(
    (produk?.price || "Rp50.000").replace(/[^0-9]/g, "")
  );
  const hargaGoodie = 5000;
  const total = hargaProduk + (goodieBag ? hargaGoodie : 0);

  const formatRupiah = (n) => "Rp" + n.toLocaleString("id-ID");

  const handleSubmit = async () => {
    const newErrors = {};

    // 1. Validasi Kosong (Bawaan awal)
    if (!tanggal) newErrors.tanggal = "Tanggal wajib diisi";
    if (!jam) newErrors.jam = "Jam wajib diisi";
    if (!nama) newErrors.nama = "Nama wajib diisi";
    if (!wa) newErrors.wa = "WhatsApp wajib diisi";
    if (!namaPenerima) newErrors.namaPenerima = "Nama penerima wajib diisi";
    if (!teleponPenerima) newErrors.teleponPenerima = "Telepon penerima wajib diisi";

    // --- TAMBAHAN VALIDASI BARU ---

    // 2. Validasi Jam Operasional (Mencegah pesan di luar jam)
    if (jam) {
      // Ubah jam jadi angka biar gampang dicek (misal "09:30" jadi 9.5)
      const jamAngka = parseFloat(jam.replace(":", "."));
      const isWeekend = new Date(tanggal).getDay() === 0 || new Date(tanggal).getDay() === 6;
      
      if (isWeekend && (jamAngka < 10 || jamAngka > 21)) {
        newErrors.jam = "Pilih jam antara 10:00 - 21:00 (Weekend)";
      } else if (!isWeekend && (jamAngka < 9 || jamAngka > 20)) {
        newErrors.jam = "Pilih jam antara 09:00 - 20:00 (Weekday)";
      }
    }

    // 3. Validasi Nomor WhatsApp & Telepon (Hanya angka, 10-13 digit)
    const regexAngka = /^[0-9]+$/;
    if (wa && (!regexAngka.test(wa) || wa.length < 10 || wa.length > 13)) {
      newErrors.wa = "Nomor WA harus berupa angka (10-13 digit)";
    }
    if (teleponPenerima && (!regexAngka.test(teleponPenerima) || teleponPenerima.length < 10 || teleponPenerima.length > 13)) {
      newErrors.teleponPenerima = "Nomor Telepon harus berupa angka (10-13 digit)";
    }

    // 5. Validasi Tanggal Pemesanan (Maksimal 7 Hari ke Depan)
    if (tanggal) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset jam ke tengah malam

      const maxDate = new Date(today);
      maxDate.setDate(maxDate.getDate() + 7); // Hitung batas maksimal H+7

      const inputDate = new Date(tanggal);
      inputDate.setHours(0, 0, 0, 0);

      if (inputDate < today) {
        newErrors.tanggal = "Tanggal pengambilan tidak boleh di masa lalu";
      } else if (inputDate > maxDate) {
        newErrors.tanggal = "Pemesanan maksimal hanya untuk 7 hari ke depan";
      }
    }

    // 4. Validasi Nama Pemesan & Penerima (Tanpa angka, minimal 3 huruf)
    const regexHuruf = /^[a-zA-Z\s]+$/;
    if (nama && (nama.length < 3 || !regexHuruf.test(nama))) {
      newErrors.nama = "Nama minimal 3 huruf dan tidak boleh mengandung angka/simbol";
    }
    if (namaPenerima && (namaPenerima.length < 3 || !regexHuruf.test(namaPenerima))) {
      newErrors.namaPenerima = "Nama minimal 3 huruf dan tidak boleh mengandung angka/simbol";
    }

    // --- AKHIR TAMBAHAN VALIDASI BARU ---

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Generate ID pesanan
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `FLR-${dateStr}-${randomNum}`;

    const hargaProduk = Number((produk?.price || "Rp0").replace(/[^0-9]/g, ""));
    const hargaGoodie = goodieBag ? 5000 : 0;
    const totalHarga = hargaProduk + hargaGoodie;

    // Simpan ke Firestore
    try {
      await addDoc(collection(db, "orders"), {
        order_id: orderId,
        namaPemesan: nama,
        noPemesan: wa,
        namaPenerima,
        noTeleponPenerima: teleponPenerima,
        tanggal,
        jam,
        metodePengambilan: metodeAmbil,
        metodePembayaran: metodeBayar,
        goodieBag,
        greetingCard: greeting,
        totalHarga,
        status: "Pending",
        produk: {
          name: produk?.name,
          price: produk?.price,
          image: produk?.image,
        },
        createdAt: serverTimestamp(),
      });

      // Bersihkan localStorage
      localStorage.removeItem("selectedProduct");
      const savedDrafts = JSON.parse(localStorage.getItem(draftKey) || "[]");
      localStorage.setItem(
        draftKey,
        JSON.stringify(savedDrafts.filter((item) => item.id !== draftId))
      );

      // Navigate ke invoice
      navigate("/invoice", {
        state: {
          orderId,
          produk,
          nama,
          wa,
          namaPenerima,
          teleponPenerima,
          tanggal,
          jam,
          metodeAmbil,
          metodeBayar,
          goodieBag,
          greeting,
        },
      });
    } catch (error) {
      console.error("Gagal menyimpan pesanan:", error);
      alert("Gagal menyimpan pesanan, coba lagi!");
    }
  };

  return (
    <div className="min-h-full bg-[#e8edf3] flex justify-center items-start py-6">
      <div className="relative w-full max-w-[430px] bg-[#f7f1eb] shadow-[0_18px_45px_rgba(39,55,77,0.22)] rounded-[38px] overflow-hidden">

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
              src={produk?.image || "/images/Fresh Flowers Asteria XS.jpeg"}
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-[17px] font-semibold text-[#2f435e]">
                {produk?.name || "ASTERIA (XS)"}
              </h2>
              <p className="text-[15px] text-[#2f435e]">
                {formatRupiah(hargaProduk)}
              </p>
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
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
            <p className="text-[11px] text-slate-400 mb-4">🗓 Klik untuk memilih tanggal</p>
            {errors.tanggal && <p className="text-red-500 text-xs">{errors.tanggal}</p>}

            {/* JAM */}
            <label className="text-[13px] text-slate-500 flex items-center gap-1 mb-1">
              🕐 Jam Pengambilan *
            </label>
            <input
              type="time"
              className="mb-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px] text-[#2f435e]"
              value={jam}
              onChange={(e) => setJam(e.target.value)}
            />
            <p className="text-[11px] text-slate-400 mb-4">🕐 Klik untuk memilih jam</p>
            {errors.jam && <p className="text-red-500 text-xs">{errors.jam}</p>}
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
            <input
              className="mt-1 mb-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px]"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            {errors.nama && <p className="text-red-500 text-xs mb-3">{errors.nama}</p>}
            <label className="text-[13px] text-slate-500">No WhatsApp *</label>
            <input
              placeholder="08xxxxxxxxxx"
              className="mt-1 mb-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px]"
              value={wa}
              onChange={(e) => setWa(e.target.value)}
            />
            {errors.wa && <p className="text-red-500 text-xs mb-3">{errors.wa}</p>}
          </section>

          {/* DATA PENERIMA */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-4 text-[17px] font-semibold text-[#2f435e]">Data Penerima</h3>
            <label className="text-[13px] text-slate-500">Nama Penerima *</label>
            <input
              className="mt-1 mb-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px]"
              value={namaPenerima}
              onChange={(e) => setNamaPenerima(e.target.value)}
            />
            {errors.namaPenerima && <p className="text-red-500 text-xs mb-3">{errors.namaPenerima}</p>}
            <p className="text-[11px] text-slate-400 mb-4">*isi nama yang akan mengambil florist yaa</p>
            <label className="text-[13px] text-slate-500">No Telepon Penerima *</label>
            <input
              placeholder="08xxxxxxxxxx"
              className="mt-1 mb-1 w-full rounded-xl border border-[#e0d9d1] bg-[#f7f1eb] p-3 text-[15px]"
              value={teleponPenerima}
              onChange={(e) => setTeleponPenerima(e.target.value)}
            />
            {errors.teleponPenerima && <p className="text-red-500 text-xs">{errors.teleponPenerima}</p>}
          </section>

          {/* GREETING */}
          <section className="rounded-2xl bg-white p-4">
            <h3 className="mb-4 text-[17px] font-semibold text-[#2f435e]">Greeting Card</h3>
            <textarea
              placeholder="Tulis pesan untuk kartu ucapan (opsional)"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
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
            onClick={handleSubmit}
            className="w-full rounded-xl bg-[#2f435e] py-4 text-[17px] font-medium text-white active:scale-95 transition-transform"
          >
            Kirim Pesanan →
          </button>

        </main>
      </div>
    </div>
  );
}

export default OrderForm
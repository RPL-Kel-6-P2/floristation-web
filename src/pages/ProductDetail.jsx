import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduk = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduk({ id: docSnap.id, ...docSnap.data() });
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Gagal memuat produk:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [id]);

  const handlePesan = () => {
    // Format data produk agar kompatibel dengan OrderForm & Draft
    // OrderForm membaca: produk.name, produk.price, produk.image
    const produkForOrder = {
      name: produk.nama,
      price: `Rp${Number(produk.price).toLocaleString("id-ID")}`,
      image: produk.image_url,
    };

    localStorage.setItem("selectedProduct", JSON.stringify(produkForOrder));
    navigate("/order", { state: produkForOrder });
  };

  // ============ LOADING ============
  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
        <div className="relative h-[932px] w-[430px] max-w-full overflow-hidden rounded-[38px] bg-[#f7f2ec] shadow-2xl flex items-center justify-center">
          <div className="text-center text-[#2f435e]">
            <div className="text-4xl mb-4 animate-pulse">🌸</div>
            <p className="text-[15px] text-slate-400">
              Memuat detail produk...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============ NOT FOUND ============
  if (notFound || !produk) {
    return (
      <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
        <div className="relative h-[932px] w-[430px] max-w-full overflow-hidden rounded-[38px] bg-[#f7f2ec] shadow-2xl">
          <header className="bg-[#2f435e] px-5 py-5 text-white">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-[26px] leading-none"
              >
                ←
              </button>
              <h1 className="text-[20px] font-medium">Detail Produk</h1>
            </div>
          </header>
          <div className="flex h-full items-center justify-center px-6 text-center pb-[120px]">
            <div>
              <div className="text-5xl mb-4">🌿</div>
              <h2 className="text-[18px] font-semibold text-[#2f435e] mb-2">
                Produk Tidak Ditemukan
              </h2>
              <p className="text-[14px] text-slate-400 mb-6">
                Produk ini mungkin sudah tidak tersedia atau telah dihapus.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-[#2f435e] text-white px-6 py-3 rounded-xl text-[15px]"
              >
                Kembali ke Katalog
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ HELPER ============
  const isAvailable = produk.ketersediaan === true;
  const hargaFormatted = `Rp${Number(produk.price).toLocaleString("id-ID")}`;
  const komposisiList = Array.isArray(produk.komposisi) ? produk.komposisi : [];

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      <div className="relative h-[932px] w-[430px] max-w-full overflow-hidden rounded-[38px] bg-[#f7f2ec] shadow-2xl">
        {/* HEADER */}
        <header className="bg-[#2f435e] px-5 py-5 text-white">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-[26px] leading-none"
            >
              ←
            </button>
            <h1 className="text-[20px] font-medium">Detail Produk</h1>
          </div>
        </header>

        {/* CONTENT */}
        <main className="h-full overflow-y-auto pb-[150px] hide-scrollbar">
          {/* IMAGE */}
          <div className="h-[392px] w-full bg-[#f1ede8]">
            {!imageError ? (
              <img
                src={produk.image_url}
                alt={produk.nama}
                onError={() => setImageError(true)}
                className="h-full w-full object-cover "
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[14px] text-slate-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">🌸</div>
                  <p>Foto tidak tersedia</p>
                </div>
              </div>
            )}
          </div>

          {/* CARD INFO */}
          <section className="mx-5 mt-3 mb-6 bg-white px-6 py-5 rounded-[16px] shadow-sm">
            {/* NAMA */}
            <h2 className="text-[26px] font-medium tracking-wide text-[#2f435e]">
              {produk.nama}
            </h2>

            {/* KATEGORI */}
            <p className="mt-1 text-[13px] uppercase tracking-[0.08em] text-slate-400">
              {produk.kategori}
            </p>

            {/* HARGA */}
            <p className="mt-3 text-[22px] font-bold text-[#2f435e]">
              {hargaFormatted}
            </p>

            {/* KOMPOSISI */}
            {komposisiList.length > 0 && (
              <div className="mt-4">
                <p className="text-[16px] text-slate-400">Komposisi:</p>
                <p className="mt-1 text-[16px] tracking-wide text-[#2f435e]">
                  {komposisiList.join(", ")}
                </p>
              </div>
            )}

            {/* SIZE */}
            {produk.size && (
              <div className="mt-4">
                <p className="text-[16px] text-slate-400">Ukuran:</p>
                <div className="mt-2 flex h-11 w-14 items-center justify-center rounded-[12px] bg-[#2f435e] text-[16px] font-medium text-white">
                  {produk.size}
                </div>
              </div>
            )}

            {/* STATUS */}
            <div className="mt-4">
              <span
                className={`inline-flex items-center rounded-[12px] px-4 py-2 text-[16px] font-medium ${
                  isAvailable
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {isAvailable ? "✓ Tersedia" : "✕ Stok Habis"}
              </span>
            </div>
          </section>
        </main>

        {/* BUTTON PESAN */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4">
          {isAvailable ? (
            <button
              type="button"
              onClick={handlePesan}
              className="w-full rounded-[14px] bg-[#2f435e] py-4 text-[17px] font-medium text-white active:scale-95 transition-transform"
            >
              Pesan Sekarang
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="w-full rounded-[14px] bg-gray-300 py-4 text-[17px] font-medium text-gray-500 cursor-not-allowed"
            >
              Stok Habis
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

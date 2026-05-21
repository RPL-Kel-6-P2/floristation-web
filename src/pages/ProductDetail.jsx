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
    if (!produk) return;

    const produkForOrder = {
      name: produk.nama,
      price: `Rp${Number(produk.price).toLocaleString("id-ID")}`,
      image: produk.image_url,
      kategori: produk.kategori || "",
      size: produk.size || null,
    };

    localStorage.setItem("selectedProduct", JSON.stringify(produkForOrder));
    navigate("/order", { state: produkForOrder });
  };

  const hargaFormatted = produk
    ? `Rp${Number(produk.price || 0).toLocaleString("id-ID")}`
    : "Rp0";

  const komposisiList = produk
    ? Array.isArray(produk.komposisi)
      ? produk.komposisi.filter(Boolean)
      : String(produk.komposisi || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
    : [];

  const isAvailable = produk ? produk.ketersediaan === true : false;

  // ============ LOADING ============
  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
        <div className="relative w-full max-w-[430px] h-[90vh] md:h-[932px] rounded-[38px] bg-[#f7f2ec] shadow-2xl flex flex-col overflow-hidden mx-auto">
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
        <div className="relative w-full max-w-[430px] h-[90vh] md:h-[932px] rounded-[38px] bg-[#f7f2ec] shadow-2xl flex flex-col overflow-hidden mx-auto">
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

          <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div>
              <div className="text-4xl mb-4">😢</div>
              <h2 className="text-[22px] font-semibold text-[#2f435e]">
                Produk tidak ditemukan
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Silakan kembali ke katalog atau coba lagi nanti.
              </p>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-6 rounded-[14px] bg-[#2f435e] px-6 py-3 text-white"
              >
                Kembali
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      <div className="relative w-full max-w-[430px] h-[90vh] md:h-[932px] rounded-[38px] bg-[#f7f2ec] shadow-2xl flex flex-col overflow-hidden mx-auto">
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

        <main className="flex-1 overflow-y-auto pb-[150px] hide-scrollbar">
          <div className="h-[392px] w-full bg-[#f1ede8]">
            {!imageError ? (
              <img
                src={produk.image_url}
                alt={produk.nama}
                onError={() => setImageError(true)}
                className="h-full w-full object-cover"
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

          <section className="mx-5 mt-3 mb-6 bg-white px-6 py-5 rounded-[16px] shadow-sm">
            <h2 className="text-[26px] font-medium text-[#2f435e]">
              {produk.nama}
            </h2>
            <p className="mt-1 text-[13px] uppercase text-slate-400">
              {produk.kategori}
            </p>

            <p className="mt-3 text-[22px] font-bold text-[#2f435e]">
              {hargaFormatted}
            </p>

            {komposisiList.length > 0 && (
              <div className="mt-4">
                <p className="text-[16px] text-slate-400">Komposisi:</p>
                <p className="mt-1 text-[16px] text-[#2f435e]">
                  {komposisiList.join(", ")}
                </p>
              </div>
            )}

            {produk.size && (
              <div className="mt-4">
                <p className="text-[16px] text-slate-400">Ukuran:</p>
                <div className="mt-2 flex h-11 w-14 items-center justify-center rounded-[12px] bg-[#2f435e] text-white">
                  {produk.size}
                </div>
              </div>
            )}

            <div className="mt-4">
              <span
                className={`px-4 py-2 rounded-[12px] text-[16px] ${
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

        <div className="bg-white px-6 py-4">
          <button
            onClick={handlePesan}
            disabled={!isAvailable}
            className={`w-full py-4 rounded-[14px] text-white ${
              isAvailable ? "bg-[#2f435e]" : "bg-gray-300 text-gray-500"
            }`}
          >
            {isAvailable ? "Pesan Sekarang" : "Stok Habis"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

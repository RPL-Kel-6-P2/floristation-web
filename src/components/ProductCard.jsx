import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  // ✅ Data dari Firestore pakai field: id, nama, image_url, kategori, price, size, ketersediaan
  const isAvailable = product.ketersediaan === true;
  const hargaFormatted = `Rp${Number(product.price).toLocaleString("id-ID")}`;

  const handleDetailClick = () => {
    // Navigasi ke halaman detail dinamis pakai Firestore doc ID
    navigate(`/produk/${product.id}`);
  };

  return (
    <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)]">
      {/* IMAGE */}
      <div className="h-[190px] w-full bg-[#f1ede8]">
        {!imageError ? (
          <img
            src={product.image_url}
            alt={product.nama}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
            style={{
              objectPosition: product.imagePosition || "center center",
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[12px] text-slate-400">
            Foto tidak ditemukan
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4 pt-4">
        {/* NAMA */}
        <h3 className="line-clamp-2 min-h-[34px] text-[14px] font-bold uppercase text-[#2f435e]">
          {product.nama}
        </h3>

        {/* KATEGORI */}
        <p className="mt-1 text-[12px] uppercase tracking-[0.08em] text-slate-500">
          {product.kategori}
        </p>

        {/* HARGA */}
        <p className="mt-3 text-[18px] font-bold text-[#2f435e]">
          {hargaFormatted}
        </p>

        {/* SIZE */}
        {product.size && (
          <p className="text-[13px] text-slate-400">Size: {product.size}</p>
        )}

        {/* STATUS */}
        <span
          className={`mt-2 inline-block rounded-[10px] px-3 py-1 text-[12px] ${
            isAvailable
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isAvailable ? "✓ Tersedia" : "✕ Habis"}
        </span>

        {/* BUTTON */}
        <button
          onClick={isAvailable ? handleDetailClick : null}
          disabled={!isAvailable}
          className={`mt-4 w-full rounded-[10px] py-3 text-[13px] font-semibold transition ${
            isAvailable
              ? "bg-[#2f435e] text-white active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Lihat Detail" : "Stok Habis"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

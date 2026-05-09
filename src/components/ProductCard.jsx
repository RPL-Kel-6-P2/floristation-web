import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleDetailClick = () => {
    if (product.detailPath) {
      navigate(product.detailPath); // 🔥 ke halaman detail
    } else {
      alert("Detail produk belum tersedia");
    }
  };

  return (
    <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)]">

      {/* IMAGE */}
      <div className="h-[190px] w-full bg-[#f1ede8]">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
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
          {product.name}
        </h3>

        {/* HARGA */}
        <p className="mt-3 text-[18px] font-bold text-[#2f435e]">
          {product.price}
        </p>

        {/* SIZE */}
        <p className="text-[13px] text-slate-400">
          Size: {product.size}
        </p>

        {/* STATUS */}
        <span
  className={`mt-2 inline-block rounded-[10px] px-3 py-1 text-[12px] ${
    product.status === "Tersedia"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600"
  }`}
>
  {product.status === "Tersedia" ? "✓ Tersedia" : "✕ Habis"}
</span>
        {/* BUTTON */}
        <button
  onClick={product.status === "Tersedia" ? handleDetailClick : null}
  disabled={product.status !== "Tersedia"}
  className={`mt-4 w-full rounded-[10px] py-3 text-[13px] font-semibold transition ${
    product.status === "Tersedia"
      ? "bg-[#2f435e] text-white active:scale-95"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  {product.status === "Tersedia" ? "Lihat Detail" : "Stok Habis"}
</button>

      </div>
    </div>
  );
}

export default ProductCard;
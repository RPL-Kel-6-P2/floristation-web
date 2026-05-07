import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleDetailClick = () => {
    if (product.detailPath) {
      navigate(product.detailPath);
    } else {
      alert("Halaman detail produk ini belum dibuat.");
    }
  };

  return (
    <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)]">
      <div className="h-[190px] w-full bg-[#f1ede8]">
        {!imageError ? (
          <img
            src={product.image}
            alt=""
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
            style={{
              objectPosition: product.imagePosition || "center center",
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] text-slate-400">
            Foto belum ditemukan
          </div>
        )}
      </div>

      <div className="px-4 pb-4 pt-4">
        <h3 className="line-clamp-2 min-h-[34px] text-[14px] font-bold uppercase leading-tight text-[#2f435e]">
          {product.name}
        </h3>

        <p className="mt-4 text-[18px] font-bold text-[#2f435e]">
          {product.price}
        </p>

        <p className="mt-1 text-[13px] text-slate-400">
          Size: {product.size}
        </p>

        <span className="mt-3 inline-block rounded-[10px] bg-green-100 px-3 py-1.5 text-[13px] font-medium text-green-600">
          ✓ {product.status}
        </span>

        <button
          type="button"
          onClick={handleDetailClick}
          className="mt-4 w-full rounded-[9px] bg-[#2f435e] py-3 text-[13px] font-semibold text-white active:scale-95 transition-transform"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
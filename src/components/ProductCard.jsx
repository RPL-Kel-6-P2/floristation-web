import { useNavigate } from "react-router-dom";

function ProductCard({ name, price, status, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const routes = {
      "CELLINE WHITE": "/detail-celine",
      "ASTERIA XS": "/detail-asteria",
      "SNACK BOUQUET 2": "/detail-snack",
      "ORELA BASKET (M) ONE SIDE": "/detail-orela",
    };

    navigate(routes[name]);
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-3">
      
      <img
        src={image}
        alt={name}
        className="h-36 w-full rounded-xl object-cover"
      />

      <p className="mt-3 w-fit rounded bg-slate-200 px-2 py-1 text-xs font-medium text-orange-600">
        {name}
      </p>

      <p className="mt-2 text-sm font-medium text-[#2f435e]">
        {price}
      </p>

      <p
        className={`mt-2 w-fit rounded px-2 py-1 text-xs ${
          status === "Tersedia"
            ? "bg-green-100 text-green-600"
            : "border border-dashed border-red-400 text-red-500"
        }`}
      >
        {status}
      </p>

      <button
        onClick={handleClick}
        className="mt-3 w-full rounded-xl bg-[#2f435e] py-2 text-sm text-white"
      >
        Lihat Detail
      </button>
    </div>
  );
}

export default ProductCard;
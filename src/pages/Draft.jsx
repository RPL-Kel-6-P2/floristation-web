import { useState } from "react";
import { useNavigate } from "react-router-dom";

const draftKey = "draftOrders";

function Draft() {
  const navigate = useNavigate();

  const [drafts, setDrafts] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
    if (Array.isArray(saved) && saved.length > 0) return saved;

    const legacy = JSON.parse(localStorage.getItem("draftOrder") || "null");
    if (legacy && legacy.produk) {
      const fallback = {
        ...legacy,
        id: `legacy-${Date.now()}`,
      };
      localStorage.setItem(draftKey, JSON.stringify([fallback]));
      return [fallback];
    }

    return [];
  });

  const formatRupiah = (n) => "Rp" + n.toLocaleString("id-ID");

  const handleDelete = (id) => {
    const next = drafts.filter((item) => item.id !== id);
    setDrafts(next);
    localStorage.setItem(draftKey, JSON.stringify(next));
  };

  const handleDeleteAll = () => {
    localStorage.removeItem(draftKey);
    localStorage.removeItem("draftOrder");
    setDrafts([]);
  };

  const handleContinue = (draft) => {
    navigate("/order", { state: { produk: draft.produk, draftId: draft.id } });
  };

  // ================= EMPTY =================
  if (!drafts.length) {
    return (
      <div className="h-full flex items-center justify-center px-6 text-center">
        <div>
          <h2 className="text-lg font-semibold text-[#2f435e]">
            Belum Ada Draft Pesanan
          </h2>
          <p className="text-sm text-slate-400 mt-2 mb-4">
            Pilih produk dan mulai isi form pesanan.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#2f435e] text-white px-4 py-2 rounded-xl"
          >
            Lihat Katalog Produk
          </button>
        </div>
      </div>
    );
  }

  // ================= MAIN =================
  return (
    <>
      {/* HEADER */}
      <div className="bg-[#2f435e] text-white px-5 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>←</button>
          <h1 className="text-[20px] font-medium">Draft Pesanan</h1>
        </div>

        <button
          onClick={handleDeleteAll}
          className="text-lg hover:opacity-70"
        >
          🗑️
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-4 flex flex-col gap-4">

        {/* INFO */}
        <div className="w-full bg-blue-50 border border-blue-200 p-3 rounded-xl text-sm text-blue-700 shadow-sm">
          <p className="font-semibold">ℹ️ Draft Tersimpan Otomatis</p>
          <p>Data pesanan anda akan tersimpan secara otomatis dan tidak akan hilang meskipun menutup web.</p>
        </div>

        {drafts.map((draft) => {
          const hargaProduk = Number(
            (draft.produk?.price || "Rp0").replace(/[^0-9]/g, "")
          );
          const total = hargaProduk + (draft.goodieBag ? 5000 : 0);

          return (
            <div
              key={draft.id}
              className="w-full rounded-2xl border border-slate-200 bg-[#f7f2ec] p-4 shadow-md"
            >
              {/* PRODUCT */}
              <div className="flex items-center gap-3">
                <img
                  src={draft.produk?.image}
                  alt={draft.produk?.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />
                <div>
                  <p className="font-semibold text-[#2f435e] text-sm">
                    {draft.produk?.name}
                  </p>
                  <p className="text-xs text-slate-400">Produk</p>
                </div>
              </div>

              {/* INFO BOX */}
              <div className="mt-3 bg-slate-100 p-3 rounded-xl text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Metode</span>
                  <span>
                    {draft.metodeAmbil === "ambil"
                      ? "Ambil di Toko"
                      : "GoSend"}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Pemesan</span>
                  <span>{draft.nama || "-"}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Penerima</span>
                  <span>{draft.namaPenerima || "-"}</span>
                </div>
              </div>

              {/* PRICE */}
              <div className="mt-3 bg-[#2f435e] p-3 rounded-xl text-white">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Harga Produk</span>
                  <span>{formatRupiah(hargaProduk)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm mt-1">
                  <span>Total</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>

              {/* BUTTON */}
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => handleContinue(draft)}
                  className="w-full bg-[#2f435e] text-white py-2.5 rounded-xl text-sm font-medium"
                >
                  Lanjutkan Mengisi Form
                </button>

                <button
                  onClick={() => handleDelete(draft.id)}
                  className="w-full border border-red-300 text-red-500 py-2.5 rounded-xl text-sm font-medium"
                >
                  Hapus Draft
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Draft;
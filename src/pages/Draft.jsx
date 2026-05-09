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
        updatedAt: Date.now(),
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

  if (!drafts.length) {
    return (
      <div className="min-h-screen bg-[#e8edf3] flex justify-center items-center">
        <div className="text-center px-6">
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

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center py-6">
      <div className="w-[430px] max-w-full bg-[#f7f1eb] rounded-[30px] overflow-hidden shadow">

        {/* HEADER */}
        <div className="bg-[#2f435e] text-white px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>←</button>
            <h1 className="font-medium">Draft Pesanan</h1>
          </div>

          <button
            className="text-white hover:opacity-70"
            onClick={handleDeleteAll}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">

          {/* INFO */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-sm text-blue-700">
            <p className="font-semibold">ℹ️ Draft Tersimpan Otomatis</p>
            <p>Data pesanan Anda tersimpan dan tidak akan hilang meskipun menutup web.</p>
          </div>

          {drafts.map((draft) => {
            const hargaProduk = Number(
              (draft.produk?.price || "Rp0").replace(/[^0-9]/g, "")
            );
            const total = hargaProduk + (draft.goodieBag ? 5000 : 0);

            return (
              <div key={draft.id} className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={draft.produk?.image}
                    alt={draft.produk?.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div className="grow">
                    <p className="font-semibold text-[#2f435e]">{draft.produk?.name}</p>
                    <p className="text-sm text-slate-400">{draft.produk?.category || "Produk"}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Metode</span>
                    <span>{draft.metodeAmbil === "ambil" ? "Ambil di Toko" : "GoSend"}</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-slate-400">Pemesan</span>
                    <span>{draft.nama || "-"}</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-slate-400">Penerima</span>
                    <span>{draft.namaPenerima || "-"}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-[#2f435e] p-4 text-white">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Harga Produk</span>
                    <span>{formatRupiah(hargaProduk)}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatRupiah(total)}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={() => handleContinue(draft)}
                    className="w-full rounded-2xl bg-[#2f435e] py-3 text-sm font-medium text-white"
                  >
                    Lanjutkan Mengisi Form
                  </button>
                  <button
                    onClick={() => handleDelete(draft.id)}
                    className="w-full rounded-2xl border border-red-300 bg-white py-3 text-sm font-medium text-red-500"
                  >
                    Hapus Draft
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Draft;
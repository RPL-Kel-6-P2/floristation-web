import { useNavigate } from "react-router-dom";

function Draft() {
  const navigate = useNavigate();
  const draft = JSON.parse(localStorage.getItem("draftPesanan"));

  if (!draft) {
    return (
      <div className="text-center mt-10">
        <p>Belum ada draft pesanan</p>
        <button onClick={() => navigate("/")}>
          Kembali ke katalog
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">

      <h2 className="font-bold mb-4">Draft Pesanan</h2>

      {/* PRODUK */}
      <div className="bg-white p-3 rounded-xl mb-3">
        <img src={draft.produk?.image} className="w-16" />
        <p>{draft.produk?.name}</p>
      </div>

      {/* INFO */}
      <div className="bg-white p-3 rounded-xl mb-3">
        <p>Nama: {draft.nama}</p>
        <p>WA: {draft.wa}</p>
        <p>Tanggal: {draft.tanggal}</p>
      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          navigate("/order", { state: draft.produk })
        }
        className="w-full bg-blue-500 text-white p-3 rounded mb-2"
      >
        Lanjutkan Pesanan
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("draftPesanan");
          window.location.reload();
        }}
        className="w-full bg-red-500 text-white p-3 rounded"
      >
        Hapus Draft
      </button>

    </div>
  );
}

export default Draft;
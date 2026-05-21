import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listenOrders } from "../../firebase/orderService";
import { logoutAdmin } from "../../firebase/authService";

const STATUS_OPTIONS = [
  {
    status: "Pending",
    label: "Pending",
    dot: "bg-[#fab005]",
    color: "bg-[#fff9db] text-[#fab005]",
  },
  {
    status: "Konfirmasi",
    label: "Konfirmasi",
    dot: "bg-[#228be6]",
    color: "bg-[#e7f5ff] text-[#228be6]",
  },
  {
    status: "Diproses",
    label: "Diproses",
    dot: "bg-[#7950f2]",
    color: "bg-[#f3f0ff] text-[#7950f2]",
  },
  {
    status: "Selesai",
    label: "Selesai",
    dot: "bg-[#40c057]",
    color: "bg-[#ebfbee] text-[#40c057]",
  },
];

function getStyle(status) {
  return STATUS_OPTIONS.find((s) => s.status === status) || STATUS_OPTIONS[0];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailOrder, setDetailOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);

  useEffect(() => {
    const unsub = listenOrders((data) => {
      setOrders(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const totalAktif = orders.filter((o) =>
    ["Pending", "Konfirmasi", "Diproses"].includes(o.status),
  ).length;
  const totalPending = orders.filter((o) => o.status === "Pending").length;
  const totalGreeting = orders.filter(
    (o) =>
      o.greetingCard?.trim() !== "" &&
      ["Pending", "Konfirmasi", "Diproses"].includes(o.status),
  ).length;

  const recentOrders = orders.slice(0, 5);

  const handleUpdateStatus = async (newStatus) => {
    try {
      const { updateOrderStatus } = await import("../../firebase/orderService");
      await updateOrderStatus(editOrder.id, newStatus);
      setEditOrder(null);
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin");
  };

  const formatDate = (ts) => {
    if (!ts) return "-";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatRupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");

  return (
    <div className="flex min-h-screen bg-[#f5f1ed] font-sans text-[#334155]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl">
        <div className="mb-10">
          <h1 className="text-2xl font-serif italic tracking-wide">
            Floristation.id
          </h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 space-y-2">
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/kelola-produk")}
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
            Kelola Produk
          </button>
          <button
            onClick={() => navigate("/admin/kelola-pesanan")}
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
            Kelola Pesanan
          </button>
          <button
            onClick={() => navigate("/admin/rekap")}
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
            Rekap
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-sm italic font-medium">Logout</span>
        </button>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="mb-10">
          <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
          <p className="text-gray-500 text-sm">
            Ringkasan aktivitas — data realtime
          </p>
        </header>

        {/* STAT CARDS */}
        <section className="grid grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="bg-[#e7f5ff] p-4 rounded-2xl text-[#228be6]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-[#228be6] font-bold text-2xl">
                {loading ? "..." : totalAktif}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Pesanan Aktif</h3>
              <p className="text-gray-400 text-sm">
                Pending, Konfirmasi, Diproses
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="bg-[#fff0f6] p-4 rounded-2xl text-[#e64980]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-[#e64980] font-bold text-2xl">
                {loading ? "..." : totalGreeting}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Greeting Card</h3>
              <p className="text-gray-400 text-sm">
                Pesanan aktif dengan kartu ucapan
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="bg-[#fff9db] p-4 rounded-2xl text-[#fab005]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <span className="text-[#fab005] font-bold text-2xl">
                {loading ? "..." : totalPending}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Pending</h3>
              <p className="text-gray-400 text-sm">Menunggu konfirmasi</p>
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="bg-white rounded-[2rem] shadow-sm p-8 border border-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Daftar Pesanan Terbaru</h3>
            <button
              onClick={() => navigate("/admin/kelola-pesanan")}
              className="text-sm font-semibold text-[#1e2d3d] hover:underline italic"
            >
              Lihat Semua →
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-400 py-12 animate-pulse">
              Memuat data...
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 italic">
                  <th className="pb-6 font-bold text-center w-28">ID Pesanan</th>
                  <th className="pb-6 font-bold px-4">Pelanggan</th>
                  <th className="pb-6 font-bold px-4">Produk</th>
                  <th className="pb-6 font-bold px-4">Tgl Pesan</th>
                  <th className="pb-6 font-bold text-center">Status</th>
                  <th className="pb-6 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-400">
                      Belum ada pesanan.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => {
                    const style = getStyle(order.status);
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-5 text-center text-gray-500 font-medium text-xs">
                          {order.order_id || order.id.slice(0, 8)}
                        </td>
                        <td className="py-5 px-4 font-semibold">
                          {order.namaPemesan}
                        </td>
                        <td className="py-5 px-4">{order.produk?.name}</td>
                        <td className="py-5 px-4 text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-5 text-center">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${style.color}`}
                          >
                            {style.label}
                          </span>
                        </td>
                        <td className="py-5 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => setDetailOrder(order)}
                              className="bg-[#334155] text-white p-2.5 rounded-xl hover:bg-[#242f3d] transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => setEditOrder(order)}
                              className="bg-[#f0e8dc] text-[#334155] p-2.5 rounded-xl hover:bg-[#e6dbcc] transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </section>
      </main>

      {/* MODAL DETAIL — sama dengan gambar 2 */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-white w-full max-w-xl rounded-[1.5rem] shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1e2d3d]">
                Detail Pesanan — {detailOrder.order_id}
              </h3>
              <button
                onClick={() => setDetailOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-8 py-6 space-y-6 max-h-[65vh] overflow-y-auto">
              {/* ID & Status */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 mb-1">ID Pesanan</p>
                  <p className="font-bold text-[#1e2d3d] text-base">
                    {detailOrder.order_id}
                  </p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-xs font-bold ${getStyle(detailOrder.status).color}`}
                >
                  {getStyle(detailOrder.status).label}
                </span>
              </div>

              {/* Data Pemesan */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-sm text-[#1e2d3d] mb-3 uppercase tracking-wider">
                  Data Pemesan
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="font-semibold text-[#334155] text-sm">
                      {detailOrder.namaPemesan}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">WhatsApp</p>
                    <p className="font-semibold text-[#334155] text-sm">
                      {detailOrder.noPemesan}
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Penerima */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-sm text-[#1e2d3d] mb-3 uppercase tracking-wider">
                  Data Penerima
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="font-semibold text-[#334155] text-sm">
                      {detailOrder.namaPenerima}
                    </p>
                    <p className="text-[10px] text-gray-400 italic mt-1">
                      *isi nama yang akan mengambil barang florist yaa
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Telepon</p>
                    <p className="font-semibold text-[#334155] text-sm">
                      {detailOrder.noTeleponPenerima}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detail Pesanan */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <p className="font-bold text-sm text-[#1e2d3d] mb-1 uppercase tracking-wider">
                  Detail Pesanan
                </p>
                {[
                  ["Produk", detailOrder.produk?.name],
                  ["Tanggal", detailOrder.tanggal],
                  ["Waktu", detailOrder.jam],
                  [
                    "Metode",
                    detailOrder.metodePengambilan === "ambil"
                      ? "Ambil di Toko"
                      : detailOrder.metodePengambilan === "gosend"
                        ? "GoSend"
                        : detailOrder.metodePengambilan,
                  ],
                  [
                    "Pembayaran",
                    detailOrder.metodePembayaran === "qris"
                      ? "QRIS"
                      : detailOrder.metodePembayaran === "bca"
                        ? "Transfer BCA"
                        : detailOrder.metodePembayaran,
                  ],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="flex justify-between text-sm items-center"
                  >
                    <span className="text-gray-400 font-medium">{label}</span>
                    <span className="font-semibold text-[#334155]">
                      {val || "-"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Greeting Card */}
              {detailOrder.greetingCard && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-2 uppercase font-bold">
                    Greeting Card
                  </p>
                  <div className="bg-[#f9f7f4] p-4 rounded-xl">
                    <p className="text-sm italic text-[#334155]">
                      "{detailOrder.greetingCard}"
                    </p>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-gray-200">
                <p className="font-bold text-[#1e2d3d] uppercase tracking-widest text-sm">
                  Total Harga
                </p>
                <p className="text-lg font-black text-[#1e2d3d]">
                  {formatRupiah(detailOrder.totalHarga || 0)}
                </p>
              </div>
            </div>
            <div className="px-8 pb-8 pt-2">
              <button
                onClick={() => setDetailOrder(null)}
                className="w-full bg-[#1e2d3d] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UPDATE STATUS */}
      {editOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[1.5rem] shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1e2d3d]">
                Update Status Pesanan
              </h3>
              <p className="text-sm text-gray-400 mt-0.5">
                {editOrder.order_id}
              </p>
            </div>
            <div className="px-8 py-6 space-y-3">
              {STATUS_OPTIONS.map((opt) => {
                const isActive = editOrder.status === opt.status;
                return (
                  <button
                    key={opt.status}
                    onClick={() => handleUpdateStatus(opt.status)}
                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all text-left ${isActive ? "bg-[#1e2d3d] text-white" : "bg-[#f5f1ed] text-[#334155] hover:bg-[#ede8e3]"}`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${isActive ? "bg-white opacity-70" : opt.dot}`}
                    />
                    {opt.label}
                    {isActive ? " (Saat ini)" : ""}
                  </button>
                );
              })}
            </div>
            <div className="px-8 pb-8">
              <button
                onClick={() => setEditOrder(null)}
                className="w-full bg-[#f5f1ed] text-[#334155] py-4 rounded-2xl font-bold hover:bg-[#ede8e3] transition-all text-sm"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

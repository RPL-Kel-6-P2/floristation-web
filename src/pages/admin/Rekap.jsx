import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  listenOrders,
  listenOrdersByDateRange,
} from "../../firebase/orderService";
import { logoutAdmin } from "../../firebase/authService";

export default function Rekap() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const [startDate, setStartDate] = useState(thirtyDaysAgo);
  const [endDate, setEndDate] = useState(today);
  const [useFilter, setUseFilter] = useState(false);

  useEffect(() => {
    let unsub;
    if (useFilter && startDate && endDate) {
      unsub = listenOrdersByDateRange(startDate, endDate, (data) => {
        setOrders(data);
        setLoading(false);
      });
    } else {
      unsub = listenOrders((data) => {
        setOrders(data);
        setLoading(false);
      });
    }
    return () => unsub && unsub();
  }, [useFilter, startDate, endDate]);

  // Gunakan field yang benar dari Firestore
  const selesai = orders.filter((o) => o.status === "Selesai");

  const totalPendapatan = selesai.reduce(
    (sum, o) => sum + Number(o.totalHarga || 0),
    0,
  );
  const totalTerjual = selesai.length;
  const rataRata =
    totalTerjual > 0 ? Math.round(totalPendapatan / totalTerjual) : 0;
  const totalAktif = orders.filter((o) =>
    ["Pending", "Konfirmasi", "Diproses"].includes(o.status),
  ).length;

  // Penjualan per kategori berdasarkan nama produk — fallback pakai produk.name
  const kategoriMap = {};
  selesai.forEach((o) => {
    const k = o.produk?.kategori || o.produk?.category || "Lainnya";
    kategoriMap[k] = (kategoriMap[k] || 0) + 1;
  });
  const totalKategori = Object.values(kategoriMap).reduce((a, b) => a + b, 0);
  const kategoriList = Object.entries(kategoriMap)
    .sort((a, b) => b[1] - a[1])
    .map(([nama, count]) => ({
      nama,
      count,
      persen: totalKategori > 0 ? Math.round((count / totalKategori) * 100) : 0,
    }));

  const KATEGORI_COLORS = [
    "bg-[#228be6]",
    "bg-[#40c057]",
    "bg-[#7950f2]",
    "bg-[#f76707]",
    "bg-[#1e2d3d]",
  ];

  // Top 5 produk
  const produkMap = {};
  selesai.forEach((o) => {
    const key = o.produk?.name || "Unknown";
    if (!produkMap[key]) produkMap[key] = { count: 0, revenue: 0 };
    produkMap[key].count += 1;
    produkMap[key].revenue += Number(o.totalHarga || 0);
  });
  const top5 = Object.entries(produkMap)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([nama, val], i) => ({ rank: i + 1, nama, ...val }));

  const formatRp = (n) => {
    if (n >= 1000000) return `Rp${(n / 1000000).toFixed(1)}jt`;
    if (n >= 1000) return `Rp${(n / 1000).toFixed(0)}rb`;
    return `Rp${n}`;
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin");
  };

  const stats = [
    {
      label: "Pesanan Selesai",
      value: totalTerjual,
      change: "Dari periode dipilih",
      color: "#228be6",
      bg: "bg-[#e7f5ff]",
    },
    {
      label: "Total Pendapatan",
      value: formatRp(totalPendapatan),
      change: "Pesanan selesai",
      color: "#40c057",
      bg: "bg-[#ebfbee]",
    },
    {
      label: "Pesanan Aktif",
      value: totalAktif,
      change: "Pending, Konfirmasi, Diproses",
      color: "#7950f2",
      bg: "bg-[#f3f0ff]",
    },
    {
      label: "Rata-rata Order",
      value: formatRp(rataRata),
      change: "Per pesanan selesai",
      color: "#f76707",
      bg: "bg-[#fff4e6]",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f5f1ed] font-sans text-[#334155] overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl z-10">
        <div className="mb-10">
          <h1 className="text-2xl font-serif italic tracking-wide">
            Floristation.id
          </h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
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
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">
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

      <main className="flex-1 ml-64 p-8 flex flex-col h-full overflow-hidden">
        <header className="mb-6 flex-shrink-0 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-1 text-[#1e2d3d]">
              Rekap Penjualan
            </h2>
            <p className="text-gray-500 text-sm italic">
              Statistik realtime dari Firestore
            </p>
          </div>

          {/* Filter Tanggal */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="useFilter"
                checked={useFilter}
                onChange={(e) => setUseFilter(e.target.checked)}
                className="w-4 h-4 accent-[#1e2d3d]"
              />
              <label
                htmlFor="useFilter"
                className="text-xs font-bold text-[#1e2d3d] cursor-pointer"
              >
                Filter Tanggal
              </label>
            </div>
            {useFilter && (
              <>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-400 font-bold">
                    Dari:
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-[#f7f3f0] px-3 py-1.5 rounded-xl text-xs outline-none border border-gray-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-400 font-bold">
                    Sampai:
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-[#f7f3f0] px-3 py-1.5 rounded-xl text-xs outline-none border border-gray-200"
                  />
                </div>
              </>
            )}
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-400 animate-pulse">Memuat data rekap...</p>
          </div>
        ) : (
          <>
            {/* STAT CARDS */}
            <div className="grid grid-cols-4 gap-4 mb-6 flex-shrink-0">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 text-left"
                >
                  <div
                    className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-3`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="12"
                        width="4"
                        height="9"
                        rx="1"
                        fill={s.color}
                      />
                      <rect
                        x="10"
                        y="7"
                        width="4"
                        height="14"
                        rx="1"
                        fill={s.color}
                      />
                      <rect
                        x="17"
                        y="3"
                        width="4"
                        height="18"
                        rx="1"
                        fill={s.color}
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 mb-0.5 font-medium">
                    {s.label}
                  </p>
                  <p className="text-3xl font-black text-[#1e2d3d] mb-1">
                    {s.value}
                  </p>
                  <p className="text-xs font-bold text-gray-400">{s.change}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 flex-1 min-h-0 overflow-hidden">
              {/* Kategori */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 flex flex-col min-h-0">
                <h3 className="text-xl font-bold text-[#1e2d3d] mb-6 flex-shrink-0">
                  Penjualan per Kategori
                </h3>
                {kategoriList.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    Belum ada data pesanan selesai.
                  </p>
                ) : (
                  <div className="space-y-4 flex-1 overflow-y-auto">
                    {kategoriList.map((k, i) => (
                      <div key={k.nama}>
                        <div className="flex justify-between text-sm mb-1 font-semibold">
                          <span className="text-[#334155] truncate">
                            {k.nama}
                          </span>
                          <span className="text-gray-400 ml-2">
                            {k.persen}% ({k.count})
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div
                            className={`${KATEGORI_COLORS[i % KATEGORI_COLORS.length]} h-3 rounded-full transition-all`}
                            style={{ width: `${k.persen}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top 5 */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 flex flex-col min-h-0">
                <h3 className="text-xl font-bold text-[#1e2d3d] mb-6 flex-shrink-0">
                  Top 5 Produk Terlaris
                </h3>
                {top5.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    Belum ada data pesanan selesai.
                  </p>
                ) : (
                  <div className="space-y-3 flex-1">
                    {top5.map((p) => (
                      <div
                        key={p.rank}
                        className="flex items-center gap-3 bg-[#f5f1ed] rounded-2xl px-4 py-3 hover:bg-[#ede8e3] transition-all"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#1e2d3d] text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                          {p.rank}
                        </div>
                        <div className="overflow-hidden flex-1">
                          <p className="text-sm font-bold text-[#1e2d3d] truncate">
                            {p.nama}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {p.count} terjual •{" "}
                            <span className="font-bold text-[#334155]">
                              Rp{p.revenue.toLocaleString("id-ID")}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

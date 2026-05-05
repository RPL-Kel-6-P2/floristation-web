import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function KelolaPesanan() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");

  const handleLogout = () => navigate('/admin');

  // 1. Simpan semua data di dalam Array
  const allOrders = [
    { id: "FLR-0042", pelanggan: "Siti Nurhaliza", produk: "Asteria XS", tanggal: "2026-04-28", metode: "Ambil di Toko", total: "Rp50.000", status: "pending", label: "Pending", color: "bg-[#fff9db] text-[#fab005]" },
    { id: "FLR-0041", pelanggan: "Budi Santoso", produk: "Ariana S", tanggal: "2026-04-27", metode: "GoSend", total: "Rp165.000", status: "konfirmasi", label: "Konfirmasi", color: "bg-[#e7f5ff] text-[#228be6]" },
    { id: "FLR-0040", pelanggan: "Dewi Kartika", produk: "Bella Medium", tanggal: "2026-04-26", metode: "Ambil di Toko", total: "Rp200.000", status: "diproses", label: "Diproses", color: "bg-[#f3f0ff] text-[#7950f2]" },
  ];

  // 2. Fungsi Logika Filter
  const filteredOrders = statusFilter === "" 
    ? allOrders 
    : allOrders.filter(order => order.status === statusFilter);

  return (
    <div className="flex min-h-screen bg-[#f3f0ec] font-sans">
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl">
        <div className="mb-10">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Dashboard</button>
          <button onClick={() => navigate('/admin/kelola-produk')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Produk</button>
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-semibold">Kelola Pesanan</button>
          <button className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Rekap</button>
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><span className="font-medium">↪ Logout</span></button>
      </aside>

      <main className="flex-1 ml-64 px-12 py-8">
        <header>
          <h2 className="text-xl font-semibold text-[#2f435e]">Kelola Pesanan</h2>
          <p className="mt-2 text-slate-500">Manajemen pesanan pelanggan</p>
        </header>

        {/* Filter Section */}
        <section className="mt-7 flex items-center justify-between rounded-2xl bg-white px-6 py-6 shadow-sm">
          <div className="flex items-center gap-2">
            <p className="font-medium text-[#2f435e]">Filter Status:</p>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 w-[150px] rounded-xl border border-slate-300 bg-[#f7f1eb] px-3 text-sm text-slate-600 outline-none cursor-pointer"
            >
              <option value="">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="konfirmasi">Konfirmasi</option>
              <option value="diproses">Diproses</option>
            </select>
          </div>
          <p className="text-slate-500 font-medium">Total: {filteredOrders.length} pesanan</p>
        </section>

        {/* Table Section */}
        <section className="mt-7 overflow-hidden rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500 bg-gray-50/50 italic font-bold border-b">
              <tr>
                <th className="px-6 py-5">ID Pesanan</th>
                <th className="px-6 py-5">Pelanggan</th>
                <th className="px-6 py-5">Produk</th>
                <th className="px-6 py-5">Tanggal</th>
                <th className="px-6 py-5">Metode</th>
                <th className="px-6 py-5">Total</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[#2f435e] divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5">{order.id}</td>
                  <td className="px-6 py-5 font-medium">{order.pelanggan}</td>
                  <td className="px-6 py-5">{order.produk}</td>
                  <td className="px-6 py-5 text-gray-500">{order.tanggal}</td>
                  <td className="px-6 py-5">{order.metode}</td>
                  <td className="px-6 py-5 font-semibold">{order.total}</td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${order.color}`}>
                      {order.label}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button className="h-9 w-9 rounded-xl bg-[#1e2d3d] text-white flex items-center justify-center">👁</button>
                      <button className="h-9 w-9 rounded-xl bg-[#f0e8dc] text-[#334155] flex items-center justify-center">✎</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default KelolaPesanan;
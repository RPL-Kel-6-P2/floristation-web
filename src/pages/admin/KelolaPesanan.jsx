import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function KelolaPesanan() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");

  const handleLogout = () => navigate('/admin');

  // Master data dengan tambahan status Selesai
  const allOrders = [
    { id: "FLR-0042", pelanggan: "Siti\nNurhaliza", produk: "Asteria XS", tanggal: "2026-04\n-28", metode: "Ambil di\nToko", total: "Rp50.000", status: "pending", label: "Pending", color: "bg-[#fff9db] text-[#fab005]" },
    { id: "FLR-0041", pelanggan: "Budi\nSantoso", produk: "Ariana S", tanggal: "2026-04\n-27", metode: "GoSend", total: "Rp165.000", status: "konfirmasi", label: "Konfirmasi", color: "bg-[#e7f5ff] text-[#228be6]" },
    { id: "FLR-0040", pelanggan: "Dewi Kartika", produk: "Bella\nMedium", tanggal: "2026-04\n-26", metode: "Ambil di\nToko", total: "Rp200.000", status: "diproses", label: "Diproses", color: "bg-[#f3f0ff] text-[#7950f2]" },
    { id: "FLR-0039", pelanggan: "Ahmad Fauzi", produk: "Artificial Rose", tanggal: "2026-04\n-26", metode: "Ambil di\nToko", total: "Rp120.000", status: "selesai", label: "Selesai", color: "bg-[#ebfbee] text-[#40c057]" },
  ];

  // Logika filter otomatis
  const filteredOrders = statusFilter === "" 
    ? allOrders 
    : allOrders.filter(order => order.status === statusFilter);

  return (
    <div className="flex min-h-screen bg-[#f5f1ed] font-sans text-[#334155]">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl z-10">
        <div className="mb-10 text-left">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => navigate('/admin/dashboard')} 
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
            Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/admin/kelola-produk')} 
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
            Kelola Produk
          </button>

          {/* Active State */}
          <button 
            className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium"
          >
            Kelola Pesanan
          </button>

          <button 
            onClick={() => navigate('/admin/rekap')}
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
            Rekap
          </button>
        </nav>

        <button 
          onClick={handleLogout} 
          className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium text-sm italic">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-8">
          <h2 className="text-2xl font-bold mb-1 text-[#1e2d3d]">Kelola Pesanan</h2>
          <p className="text-gray-500 text-sm">Manajemen pesanan pelanggan</p>
        </header>

        {/* SECTION FILTER */}
        <section className="bg-white p-8 rounded-[2rem] shadow-sm flex items-center justify-between mb-8 border border-gray-50">
          <div className="flex items-center gap-4">
            <label className="font-bold text-[#1e2d3d]">Filter Status:</label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-[#f7f3f0] border border-gray-200 rounded-2xl px-6 py-3 pr-12 text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="konfirmasi">Konfirmasi</option>
                <option value="diproses">Diproses</option>
                <option value="selesai">Selesai</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium">Total: {filteredOrders.length} pesanan</p>
        </section>

        {/* TABLE SECTION */}
        <section className="bg-white rounded-[2rem] shadow-sm p-8 border border-gray-50">
          <table className="w-full text-left text-sm table-fixed">
            <thead className="text-gray-400 border-b border-gray-100 italic">
              <tr>
                <th className="pb-6 font-bold px-4 w-[14%]">ID Pesanan</th>
                <th className="pb-6 font-bold px-4 w-[16%]">Pelanggan</th>
                <th className="pb-6 font-bold px-4 w-[15%]">Produk</th>
                <th className="pb-6 font-bold px-4 w-[13%]">Tanggal</th>
                <th className="pb-6 font-bold px-4 w-[14%]">Metode</th>
                <th className="pb-6 font-bold px-4 w-[12%]">Total</th>
                <th className="pb-6 font-bold text-center w-[16%]">Status</th>
                <th className="pb-6 font-bold text-center w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[#1e2d3d]">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-4 font-bold">{order.id}</td>
                    <td className="py-6 px-4 whitespace-pre-line leading-relaxed">{order.pelanggan}</td>
                    <td className="py-6 px-4 whitespace-pre-line">{order.produk}</td>
                    <td className="py-6 px-4 whitespace-pre-line text-gray-400">{order.tanggal}</td>
                    <td className="py-6 px-4 whitespace-pre-line">{order.metode}</td>
                    <td className="py-6 px-4 font-bold">{order.total}</td>
                    <td className="py-6 text-center">
                      <span className={`px-5 py-2 rounded-full text-[11px] font-bold ${order.color}`}>
                        {order.label}
                      </span>
                    </td>
                    <td className="py-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="bg-[#1e2d3d] text-white p-2.5 rounded-xl hover:bg-[#2c3e50] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="bg-[#f0e8dc] text-[#334155] p-2.5 rounded-xl hover:bg-[#e6dbcc] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-gray-400 italic">
                    Tidak ada pesanan ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default KelolaPesanan;
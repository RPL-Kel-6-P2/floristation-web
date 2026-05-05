import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // State untuk pesanan agar bisa simulasi update otomatis
  const [orders, setOrders] = useState([
    { id: 'FLR-0042', pelanggan: 'Siti Nurhaliza', produk: 'Asteria XS', tgl: '2026-04-28', status: 'Pending', color: 'bg-[#fff9db] text-[#fab005]' },
    { id: 'FLR-0041', pelanggan: 'Budi Santoso', produk: 'Ariana S', tgl: '2026-04-27', status: 'Konfirmasi', color: 'bg-[#e7f5ff] text-[#228be6]' },
    { id: 'FLR-0040', pelanggan: 'Dewi Lestari', produk: 'Bella Medium', tgl: '2026-04-26', status: 'Diproses', color: 'bg-[#f3f0ff] text-[#7950f2]' },
    { id: 'FLR-0039', pelanggan: 'Ahmad Fauzi', produk: 'Artificial Rose', tgl: '2026-04-26', status: 'Selesai', color: 'bg-[#ebfbee] text-[#40c057]' },
    { id: 'FLR-0038', pelanggan: 'Rina Kartika', produk: 'Snack Box Deluxe', tgl: '2026-04-25', status: 'Selesai', color: 'bg-[#ebfbee] text-[#40c057]' },
  ]);

  const handleLogout = () => navigate('/admin');

  return (
    <div className="flex min-h-screen bg-[#f5f1ed] font-sans text-[#334155]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl">
        <div className="mb-10">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">Dashboard</button>
          <button onClick={() => navigate('/admin/kelola-produk')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Produk</button>
          <button className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Pesanan</button>
          <button className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Rekap</button>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10">
          <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
          <p className="text-gray-500 text-sm">Ringkasan aktivitas hari ini</p>
        </header>

        {/* STATS CARDS */}
        <section className="grid grid-cols-3 gap-8 mb-10">
          {/* Pesanan Hari Ini */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="bg-[#e7f5ff] p-4 rounded-2xl text-[#228be6]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-[#228be6] font-bold text-2xl">+12%</span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Pesanan Hari Ini</h3>
              <p className="text-gray-400 text-sm">8 pesanan</p>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="bg-[#fff9db] p-4 rounded-2xl text-[#fab005]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-[#fab005] font-bold text-2xl">3</span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Pending</h3>
              <p className="text-gray-400 text-sm">Menunggu konfirmasi</p>
            </div>
          </div>

          {/* Produk Aktif */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="bg-[#ebfbee] p-4 rounded-2xl text-[#40c057]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-[#40c057] font-bold text-2xl">24</span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Produk Aktif</h3>
              <p className="text-gray-400 text-sm">Tersedia untuk dijual</p>
            </div>
          </div>
        </section>

        {/* TABLE SECTION */}
        <section className="bg-white rounded-[2rem] shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Daftar Pesanan</h3>
            <div className="flex gap-4">
               <div className="w-32 h-12 bg-[#f7f3f0] rounded-2xl border border-gray-100"></div>
               <div className="w-32 h-12 bg-[#f7f3f0] rounded-2xl border border-gray-100"></div>
            </div>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="pb-6 font-bold text-center w-24">ID</th>
                <th className="pb-6 font-bold px-4">Pelanggan</th>
                <th className="pb-6 font-bold px-4">Produk</th>
                <th className="pb-6 font-bold px-4">Tgl Kirim</th>
                <th className="pb-6 font-bold text-center">Status</th>
                <th className="pb-6 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order, index) => (
                <tr key={index} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-6 text-center text-gray-500 font-medium">{order.id}</td>
                  <td className="py-6 px-4 font-semibold text-[#334155]">{order.pelanggan}</td>
                  <td className="py-6 px-4">{order.produk}</td>
                  <td className="py-6 px-4 text-gray-500">{order.tgl}</td>
                  <td className="py-6 text-center">
                    <span className={`px-5 py-2 rounded-full text-[11px] font-bold ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 text-center">
                    <div className="flex justify-center gap-3 px-4">
                      <button className="bg-[#334155] text-white px-4 py-2 rounded-xl text-[11px] font-bold hover:bg-[#242f3d] transition-colors">Detail</button>
                      <button className="bg-[#f0e8dc] text-[#334155] px-4 py-2 rounded-xl text-[11px] font-bold hover:bg-[#e6dbcc] transition-colors">Update</button>
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
};

export default Dashboard;
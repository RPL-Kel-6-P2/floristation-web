import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KelolaPesanan = () => {
  const navigate = useNavigate();

  const [orders] = useState([
    { id: 'FLR-0042', pelanggan: 'Siti Nurhaliza', produk: 'Asteria XS', tgl: '2026-04-28', metode: 'Ambil di Toko', total: 'Rp50.000', status: 'Pending', color: 'bg-[#fff9db] text-[#fab005]' },
    { id: 'FLR-0041', pelanggan: 'Budi Santoso', produk: 'Ariana S', tgl: '2026-04-27', metode: 'GoSend', total: 'Rp165.000', status: 'Konfirmasi', color: 'bg-[#e7f5ff] text-[#228be6]' },
    { id: 'FLR-0040', pelanggan: 'Dewi Kartika', produk: 'Bella Medium', tgl: '2026-04-26', metode: 'Ambil di Toko', total: 'Rp200.000', status: 'Diproses', color: 'bg-[#f3f0ff] text-[#7950f2]' },
  ]);

  const handleLogout = () => navigate('/admin');

  return (
    <div className="flex min-h-screen bg-[#f5f1ed] font-sans text-[#334155]">
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl">
        <div className="mb-10">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors font-medium">Dashboard</button>
          <button onClick={() => navigate('/admin/kelola-produk')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors font-medium">Kelola Produk</button>
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-bold">Kelola Pesanan</button>
          <button className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors font-medium">Rekap</button>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="mb-10">
          <h2 className="text-2xl font-bold mb-1">Kelola Pesanan</h2>
          <p className="text-gray-500 text-sm">Ringkasan aktivitas hari ini</p>
        </header>

        <section className="bg-white p-8 rounded-[2rem] shadow-sm mb-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-sm">Filter Status:</h3>
            <div className="w-32 h-10 bg-[#f7f3f0] rounded-2xl border border-gray-100"></div>
          </div>
          <p className="text-gray-400 text-sm italic font-medium">Total: 3 pesanan</p>
        </section>

        <section className="bg-white rounded-[2rem] shadow-sm p-8">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="pb-6 font-bold px-4">ID Pesanan</th>
                <th className="pb-6 font-bold px-4">Pelanggan</th>
                <th className="pb-6 font-bold px-4">Produk</th>
                <th className="pb-6 font-bold px-4">Tanggal</th>
                <th className="pb-6 font-bold px-4">Metode</th>
                <th className="pb-6 font-bold px-4">Total</th>
                <th className="pb-6 font-bold text-center">Status</th>
                <th className="pb-6 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order, index) => (
                <tr key={index} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-4 font-bold text-[#334155]">{order.id}</td>
                  <td className="py-6 px-4 font-semibold text-[#334155]">{order.pelanggan}</td>
                  <td className="py-6 px-4">{order.produk}</td>
                  <td className="py-6 px-4 text-gray-500">{order.tgl}</td>
                  <td className="py-6 px-4">{order.metode}</td>
                  <td className="py-6 px-4 font-bold text-[#334155]">{order.total}</td>
                  <td className="py-6 text-center">
                    <span className={`px-5 py-2 rounded-full text-[11px] font-bold ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 text-center">
                    <div className="flex justify-center gap-3 px-4">
                      <button className="bg-[#1e2d3d] text-white p-2.5 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="bg-[#d6ccc2] text-[#334155] p-2.5 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
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

export default KelolaPesanan;
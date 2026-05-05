import React from 'react';
import { useNavigate } from 'react-router-dom';

const Rekap = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Total Pesanan',
      value: '127',
      change: '+15% dari bulan lalu',
      positive: true,
      color: 'text-[#228be6]',
      bg: 'bg-[#e7f5ff]',
    },
    {
      label: 'Pendapatan',
      value: 'Rp15.2jt',
      change: '+22% dari bulan lalu',
      positive: true,
      color: 'text-[#40c057]',
      bg: 'bg-[#ebfbee]',
    },
    {
      label: 'Produk Terjual',
      value: '89',
      change: '+8% dari bulan lalu',
      positive: true,
      color: 'text-[#7950f2]',
      bg: 'bg-[#f3f0ff]',
    },
    {
      label: 'Rata-rata Order',
      value: 'Rp119k',
      change: '-3% dari bulan lalu',
      positive: false,
      color: 'text-[#f76707]',
      bg: 'bg-[#fff4e6]',
    },
  ];

  const kategori = [
    { nama: 'Fresh Flowers', persen: 45, color: 'bg-[#228be6]' },
    { nama: 'Graduation', persen: 30, color: 'bg-[#40c057]' },
    { nama: 'Buket Artificial', persen: 15, color: 'bg-[#7950f2]' },
    { nama: 'Snack Bouquet', persen: 10, color: 'bg-[#f76707]' },
  ];

  const topProduk = [
    { rank: 1, nama: 'Ariana S', terjual: 23, pendapatan: 'Rp3.795k' },
    { rank: 2, nama: 'Bella Medium', terjual: 18, pendapatan: 'Rp3.600k' },
    { rank: 3, nama: 'Artificial Rose', terjual: 15, pendapatan: 'Rp1.800k' },
    { rank: 4, nama: 'Asteria XS', terjual: 12, pendapatan: 'Rp600k' },
    { rank: 5, nama: 'Snack Box Deluxe', terjual: 10, pendapatan: 'Rp1.800k' },
  ];

  // Bar chart icon SVG per warna
  const BarIcon = ({ color }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="12" width="4" height="9" rx="1" fill={color} />
      <rect x="10" y="7" width="4" height="14" rx="1" fill={color} />
      <rect x="17" y="3" width="4" height="18" rx="1" fill={color} />
    </svg>
  );

  const iconColors = ['#228be6', '#40c057', '#7950f2', '#f76707'];

  return (
    <div className="flex min-h-screen bg-[#f5f1ed] font-sans text-[#334155]">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl z-10">
        <div className="mb-10 text-left">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Dashboard</button>
          <button onClick={() => navigate('/admin/kelola-produk')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Produk</button>
          <button onClick={() => navigate('/admin/kelola-pesanan')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Pesanan</button>
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">Rekap</button>
        </nav>

        <button onClick={() => navigate('/admin')} className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium text-sm italic">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-8">
          <h2 className="text-2xl font-bold mb-1 text-[#1e2d3d]">Rekap Penjualan</h2>
          <p className="text-gray-500 text-sm">Laporan dan statistik penjualan</p>
        </header>

        {/* STAT CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-50">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                <BarIcon color={iconColors[i]} />
              </div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-[#1e2d3d] mb-2">{stat.value}</p>
              <p className={`text-xs font-semibold ${stat.positive ? 'text-[#40c057]' : 'text-[#fa5252]'}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-2 gap-6">

          {/* Penjualan per Kategori */}
          <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-50">
            <h3 className="text-base font-bold text-[#1e2d3d] mb-6">Penjualan per Kategori</h3>
            <div className="space-y-5">
              {kategori.map((k, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#334155]">{k.nama}</span>
                    <span className="text-gray-400 font-medium">{k.persen}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`${k.color} h-2 rounded-full`}
                      style={{ width: `${k.persen}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Produk Terlaris */}
          <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-50">
            <h3 className="text-base font-bold text-[#1e2d3d] mb-6">Top 5 Produk Terlaris</h3>
            <div className="space-y-3">
              {topProduk.map((p) => (
                <div key={p.rank} className="flex items-center gap-4 bg-[#f5f1ed] rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-[#1e2d3d] text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                    {p.rank}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e2d3d]">{p.nama}</p>
                    <p className="text-xs text-gray-400">{p.terjual} terjual • {p.pendapatan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Rekap;
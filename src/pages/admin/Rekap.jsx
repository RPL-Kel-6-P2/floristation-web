import React from 'react';
import { useNavigate } from 'react-router-dom';

const Rekap = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Total Produk Terjual',
      value: '124',
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
      value: '39',
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
    { nama: 'Fresh Flowers', persen: 40, color: 'bg-[#228be6]' },
    { nama: 'Graduation Bouquet', persen: 30, color: 'bg-[#40c057]' },
    { nama: 'Artificial Flowers', persen: 15, color: 'bg-[#7950f2]' },
    { nama: 'Snack Bouquet', persen: 10, color: 'bg-[#f76707]' },
    { nama: 'Bloom Box Arrangement', persen: 5, color: 'bg-[#1e2d3d]' },
  ];

  const topProduk = [
    { rank: 1, nama: 'Ariana S', terjual: 40, pendapatan: 'Rp6.600.000' },
    { rank: 2, nama: 'Rafaela M', terjual: 35, pendapatan: 'Rp9.030.000' },
    { rank: 3, nama: 'Ivana Red S', terjual: 27, pendapatan: 'Rp2.700.000' },
    { rank: 4, nama: 'Asteria XS', terjual: 12, pendapatan: 'Rp600.000' },
    { rank: 5, nama: 'Snack Bouquet 1', terjual: 10, pendapatan: 'Rp1.200.000' },
  ];

  const BarIcon = ({ color }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="12" width="4" height="9" rx="1" fill={color} />
      <rect x="10" y="7" width="4" height="14" rx="1" fill={color} />
      <rect x="17" y="3" width="4" height="18" rx="1" fill={color} />
    </svg>
  );

  const iconColors = ['#228be6', '#40c057', '#7950f2', '#f76707'];

  return (
    <div className="flex h-screen bg-[#f5f1ed] font-sans text-[#334155] overflow-hidden">

      {/* SIDEBAR (TETAP SAMA) */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl z-10">
        <div className="mb-10 text-left">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2 text-left">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Dashboard</button>
          <button onClick={() => navigate('/admin/kelola-produk')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Produk</button>
          <button onClick={() => navigate('/admin/kelola-pesanan')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Pesanan</button>
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">Rekap</button>
        </nav>

        <button onClick={() => navigate('/admin')} className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium text-sm italic">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8 flex flex-col h-full overflow-hidden">
        <header className="mb-6 flex-shrink-0 text-left">
          <h2 className="text-3xl font-bold mb-1 text-[#1e2d3d]">Rekap Penjualan</h2>
          <p className="text-gray-500 text-lg italic">Laporan dan statistik penjualan Floristation.id</p>
        </header>

        {/* STAT CARDS */}
        <div className="grid grid-cols-4 gap-4 mb-6 flex-shrink-0">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 text-left">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <BarIcon color={iconColors[i]} />
              </div>
              <p className="text-base text-gray-500 mb-0.5 font-medium">{stat.label}</p>
              <p className="text-3xl font-black text-[#1e2d3d] mb-1">{stat.value}</p>
              <p className={`text-sm font-bold ${stat.positive ? 'text-[#40c057]' : 'text-[#fa5252]'}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1 min-h-0 overflow-hidden">
          {/* Penjualan per Kategori */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 text-left flex flex-col min-h-0">
            <h3 className="text-xl font-bold text-[#1e2d3d] mb-6 flex-shrink-0">Penjualan per Kategori</h3>
            <div className="space-y-4 flex-1">
              {kategori.map((k, i) => (
                <div key={i}>
                  <div className="flex justify-between text-base mb-2 font-semibold">
                    <span className="text-[#334155]">{k.nama}</span>
                    <span className="text-gray-400">{k.persen}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`${k.color} h-3 rounded-full`}
                      style={{ width: `${k.persen}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Produk Terlaris - BAGIAN YANG DIUBAH AGAR MUAT */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 text-left flex flex-col min-h-0">
            <h3 className="text-xl font-bold text-[#1e2d3d] mb-6 flex-shrink-0">Top 5 Produk Terlaris</h3>
            <div className="space-y-2 flex-1 overflow-hidden">
              {topProduk.map((p) => (
                <div key={p.rank} className="flex items-center gap-3 bg-[#f5f1ed] rounded-2xl px-4 py-2 transition-all hover:bg-[#ede8e3]">
                  <div className="w-8 h-8 rounded-full bg-[#1e2d3d] text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                    {p.rank}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-[#1e2d3d] leading-tight truncate">{p.nama}</p>
                    <p className="text-[10px] text-gray-500 font-medium truncate">
                      {p.terjual} terjual • <span className="text-[#334155] font-bold">{p.pendapatan}</span>
                    </p>
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
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Rekap = () => {
  const navigate = useNavigate();

  const handleLogout = () => navigate('/admin');

  const stats = [
    { label: 'Total Pesanan', value: '127', trend: '+15% dari bulan lalu', color: 'text-blue-500', bg: 'bg-blue-50', icon: '📊' },
    { label: 'Pendapatan', value: 'Rp15.2jt', trend: '+22% dari bulan lalu', color: 'text-green-500', bg: 'bg-green-50', icon: '💹' },
    { label: 'Produk Terjual', value: '89', trend: '+8% dari bulan lalu', color: 'text-purple-500', bg: 'bg-purple-50', icon: '📦' },
    { label: 'Rata-rata Order', value: 'Rp119k', trend: '-3% dari bulan lalu', color: 'text-orange-500', bg: 'bg-orange-50', icon: '📈' },
  ];

  const categories = [
    { name: 'Fresh Flowers', percentage: '45%', color: 'bg-blue-500' },
    { name: 'Graduation', percentage: '30%', color: 'bg-green-500' },
    { name: 'Buket Artificial', percentage: '15%', color: 'bg-purple-500' },
    { name: 'Snack Bouquet', percentage: '10%', color: 'bg-orange-500' },
  ];

  const topProducts = [
    { id: 1, name: 'Ariana S', terjual: '23 terjual', profit: 'Rp3.795k' },
    { id: 2, name: 'Bella Medium', terjual: '18 terjual', profit: 'Rp3.600k' },
    { id: 3, name: 'Artificial Rose', terjual: '15 terjual', profit: 'Rp1.800k' },
    { id: 4, name: 'Asteria XS', terjual: '12 terjual', profit: 'Rp600k' },
    { id: 5, name: 'Snack Box Deluxe', terjual: '10 terjual', profit: 'Rp1.800k' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f1ed] font-sans text-[#334155]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-8 fixed h-full shadow-xl z-10">
        <div className="mb-14 text-left">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">ADMIN PANEL</p>
        </div>

        <nav className="flex-1 space-y-4">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-5 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors font-medium">Dashboard</button>
          <button onClick={() => navigate('/admin/kelola-produk')} className="w-full text-left px-5 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors font-medium">Kelola Produk</button>
          <button onClick={() => navigate('/admin/kelola-pesanan')} className="w-full text-left px-5 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors font-medium">Kelola Pesanan</button>
          
          {/* Menu Rekap Aktif */}
          <button className="w-full text-left px-5 py-4 bg-[#3e4a59] rounded-2xl font-bold">Rekap</button>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 text-gray-400 hover:text-white transition-colors px-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-bold text-lg">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-12">
        <header className="mb-10">
          <h2 className="text-2xl font-bold mb-1 text-[#1e2d3d]">Rekap Penjualan</h2>
          <p className="text-gray-500 text-sm">Laporan dan statistik penjualan</p>
        </header>

        {/* STATS CARDS */}
        <section className="grid grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
              <div className={`${stat.bg} ${stat.color} w-12 h-12 flex items-center justify-center rounded-2xl text-xl mb-4`}>
                {stat.icon}
              </div>
              <p className="text-gray-500 font-medium text-sm mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-[#1e2d3d] mb-2">{stat.value}</h3>
              <p className={`text-[11px] font-bold ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
              </p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-5 gap-10">
          {/* PENJUALAN PER KATEGORI */}
          <section className="col-span-3 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 h-fit">
            <h3 className="text-lg font-bold text-[#1e2d3d] mb-8">Penjualan per Kategori</h3>
            <div className="space-y-8">
              {categories.map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500 font-medium">{cat.name}</span>
                    <span className="text-gray-400 font-bold">{cat.percentage}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full`} style={{ width: cat.percentage }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TOP 5 PRODUK TERLARIS */}
          <section className="col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50">
            <h3 className="text-lg font-bold text-[#1e2d3d] mb-8">Top 5 Produk Terlaris</h3>
            <div className="space-y-4">
              {topProducts.map((item) => (
                <div key={item.id} className="flex items-center gap-5 p-4 bg-gray-50/50 rounded-3xl">
                  <div className="w-10 h-10 bg-[#2f435e] text-white flex items-center justify-center rounded-full font-bold text-sm">
                    {item.id}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#1e2d3d] text-sm">{item.name}</h4>
                    <p className="text-[11px] text-gray-400 font-medium">{item.terjual} • {item.profit}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Rekap;
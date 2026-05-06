import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditOrder, setSelectedEditOrder] = useState(null);

  const statusOptions = [
    { status: 'pending',    label: 'Pending',    dot: 'bg-[#fab005]', color: 'bg-[#fff9db] text-[#fab005]' },
    { status: 'konfirmasi', label: 'Konfirmasi', dot: 'bg-[#228be6]', color: 'bg-[#e7f5ff] text-[#228be6]' },
    { status: 'diproses',   label: 'Diproses',   dot: 'bg-[#7950f2]', color: 'bg-[#f3f0ff] text-[#7950f2]' },
    { status: 'selesai',    label: 'Selesai',    dot: 'bg-[#40c057]', color: 'bg-[#ebfbee] text-[#40c057]' },
  ];

  // Daftar produk aktif
  const [activeProducts] = useState([
    'Asteria XS', 'Ariana S', 'Grace Pink S', 'Valencia Blue L', 'Snack Bouquet 1',
    'Bella Large', 'Rose Bouquet M', 'Sunflower S', 'Tulip Wrap', 'Daisy Box',
    'Wildflower L', 'Peony Pink M', 'Carnation Red S', 'Lily White M', 'Orchid Purple L',
    'Hydrangea Blue', 'Lavender Bunch', 'Mixed Pastel M', 'Eternal Rose Box', 'Baby Breath S',
    'Chocolate Bouquet', 'Teddy Bear Set', 'Premium Gift Box', 'Seasonal Special',
  ]);

  const [orders, setOrders] = useState([
    { id: 'FLR-0042', pelanggan: 'Siti Nurhaliza', produk: 'Asteria XS',     tgl: '2026-04-28', metode: 'Ambil di Toko', total: 'Rp50.000',  status: 'pending',    label: 'Pending',    color: 'bg-[#fff9db] text-[#fab005]', wa: '081234567890', penerima: 'Siti Nurhaliza', telpPenerima: '081234567890', waktu: '10:00',    pembayaran: 'Transfer', pesan: '' },
    { id: 'FLR-0041', pelanggan: 'Budi Santoso',   produk: 'Ariana S',       tgl: '2026-04-28', metode: 'GoSend',        total: 'Rp165.000', status: 'konfirmasi', label: 'Konfirmasi', color: 'bg-[#e7f5ff] text-[#228be6]', wa: '082345678901', penerima: 'Rina Sari',        telpPenerima: '082345678902', waktu: '9:00', pembayaran: 'Transfer', pesan: 'Happy Birthday!' },
    { id: 'FLR-0040', pelanggan: 'Dewi Kartika',   produk: 'Grace Pink S',   tgl: '2026-04-27', metode: 'Ambil di Toko', total: 'Rp200.000', status: 'diproses',   label: 'Diproses',   color: 'bg-[#f3f0ff] text-[#7950f2]', wa: '083456789012', penerima: 'Sarah Amelia',     telpPenerima: '083456789013', waktu: '15:30', pembayaran: 'QRIS',     pesan: 'Congratulations!' },
    { id: 'FLR-0039', pelanggan: 'Ahmad Fauzi',    produk: 'Valencia Blue L', tgl: '2026-04-26', metode: 'Ambil di Toko', total: 'Rp120.000', status: 'selesai',    label: 'Selesai',    color: 'bg-[#ebfbee] text-[#40c057]', wa: '084567890123', penerima: 'Linda Cahya',      telpPenerima: '084567890124', waktu: '13:00', pembayaran: 'Cash',     pesan: 'With love!' },
    { id: 'FLR-0038', pelanggan: 'Sartika',   produk: 'BBA Godiva Blue', tgl: '2026-04-25', metode: 'GoSend',        total: 'Rp350.000', status: 'selesai',    label: 'Selesai',    color: 'bg-[#ebfbee] text-[#40c057]', wa: '085678901234', penerima: 'Sartika',             telpPenerima: '085678901234', waktu: '11:00', pembayaran: 'Transfer',     pesan: '' },
  ]);

  // ─── Computed stats (auto-update) ───────────────────────────────────────────
  const totalPesanan   = orders.length;
  const totalPending   = orders.filter(o => o.status === 'pending').length;
  const totalProdukAktif = activeProducts.length;

  // ─── Generate next order ID ──────────────────────────────────────────────────
  const getNextId = () => {
    const nums = orders.map(o => parseInt(o.id.replace('FLR-', ''), 10));
    const next  = Math.max(...nums) + 1;
    return `FLR-${String(next).padStart(4, '0')}`;
  };

  // ─── Modal handlers ──────────────────────────────────────────────────────────
  const openDetail  = (order) => { setSelectedOrder(order);     setIsDetailModalOpen(true); };
  const closeDetail = ()      => { setIsDetailModalOpen(false); setSelectedOrder(null); };

  const openEdit  = (order) => { setSelectedEditOrder(order); setIsEditModalOpen(true); };
  const closeEdit = ()      => { setIsEditModalOpen(false);   setSelectedEditOrder(null); };

  const handleUpdateStatus = (newStatus) => {
    const opt = statusOptions.find(o => o.status === newStatus);
    setOrders(prev =>
      prev.map(o =>
        o.id === selectedEditOrder.id
          ? { ...o, status: opt.status, label: opt.label, color: opt.color }
          : o
      )
    );
    closeEdit();
  };

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
          <button onClick={() => navigate('/admin/dashboard')}     className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">Dashboard</button>
          <button onClick={() => navigate('/admin/kelola-produk')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Produk</button>
          <button onClick={() => navigate('/admin/kelola-pesanan')}className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Pesanan</button>
          <button onClick={() => navigate('/admin/rekap')}         className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Rekap</button>
        </nav>

        <button
  onClick={handleLogout}
  className="group mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
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

  <span className="font-medium italic text-sm">
    Logout
  </span>
</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10">
          <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
          <p className="text-gray-500 text-sm">Ringkasan aktivitas hari ini</p>
        </header>

        {/* STATS CARDS — semua nilai dihitung otomatis dari state */}
        <section className="grid grid-cols-3 gap-8 mb-10">
          {/* Pesanan Hari Ini */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="bg-[#e7f5ff] p-4 rounded-2xl text-[#228be6]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-[#228be6] font-bold text-2xl">{totalPesanan}</span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Pesanan Hari Ini</h3>
              <p className="text-gray-400 text-sm">{totalPesanan} pesanan</p>
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
              <span className="text-[#fab005] font-bold text-2xl">{totalPending}</span>
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
              <span className="text-[#40c057] font-bold text-2xl">{totalProdukAktif}</span>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Produk Aktif</h3>
              <p className="text-gray-400 text-sm">Tersedia untuk dijual</p>
            </div>
          </div>
        </section>

        {/* TABLE SECTION */}
        <section className="bg-white rounded-[2rem] shadow-sm p-8 border border-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Daftar Pesanan Terbaru</h3>
            <button
              onClick={() => navigate('/admin/kelola-pesanan')}
              className="text-sm font-semibold text-[#1e2d3d] hover:underline italic"
            >
              Lihat Semua →
            </button>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100 italic">
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
                      {order.label}
                    </span>
                  </td>
                  <td className="py-6 text-center">
                    <div className="flex justify-center gap-2 px-4">
                      <button
                        onClick={() => openDetail(order)}
                        className="bg-[#334155] text-white p-2.5 rounded-xl hover:bg-[#242f3d] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => openEdit(order)}
                        className="bg-[#f0e8dc] text-[#334155] p-2.5 rounded-xl hover:bg-[#e6dbcc] transition-colors"
                      >
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

      {/* MODAL DETAIL PESANAN */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-white w-full max-w-xl rounded-[1.5rem] shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1e2d3d]">Detail Pesanan — {selectedOrder.id}</h3>
              <button onClick={closeDetail} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-8 py-6 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* ID & Status */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 mb-1">ID Pesanan</p>
                  <p className="font-bold text-[#1e2d3d] text-base">{selectedOrder.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold ${selectedOrder.color}`}>
                    {selectedOrder.label}
                  </span>
                </div>
              </div>

              {/* Data Pemesan */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-[#1e2d3d] text-sm mb-3">Data Pemesan</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="font-semibold text-[#334155] text-sm">{selectedOrder.pelanggan}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">WhatsApp</p>
                    <p className="font-semibold text-[#334155] text-sm">{selectedOrder.wa || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Data Penerima */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-[#1e2d3d] text-sm mb-3">Data Penerima</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="font-semibold text-[#334155] text-sm">{selectedOrder.penerima || '-'}</p>
                    <p className="text-[10px] text-gray-400 italic mt-1">*isi nama yang akan mengambil barang florist yaa</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Telepon</p>
                    <p className="font-semibold text-[#334155] text-sm">{selectedOrder.telpPenerima || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Detail Pesanan */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <p className="font-bold text-[#1e2d3d] text-sm mb-1">Detail Pesanan</p>
                {[
                  { label: 'Produk',     value: selectedOrder.produk },
                  { label: 'Tanggal',    value: selectedOrder.tgl },
                  { label: 'Waktu',      value: selectedOrder.waktu || '-' },
                  { label: 'Metode',     value: selectedOrder.metode },
                  { label: 'Pembayaran', value: selectedOrder.pembayaran || '-' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold text-[#334155]">{value}</span>
                  </div>
                ))}
              </div>

              {/* Greeting Card */}
              {selectedOrder.pesan && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-2">Greeting Card</p>
                  <div className="bg-[#f9f7f4] p-4 rounded-xl">
                    <p className="text-sm italic text-[#334155]">"{selectedOrder.pesan}"</p>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-gray-200">
                <p className="font-bold text-[#1e2d3d]">Total Harga</p>
                <p className="text-lg font-black text-[#1e2d3d]">{selectedOrder.total}</p>
              </div>
            </div>

            <div className="px-8 pb-8 pt-2">
              <button onClick={closeDetail} className="w-full bg-[#1e2d3d] text-white py-4 rounded-xl font-bold hover:bg-[#334155] transition-all">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UPDATE STATUS */}
      {isEditModalOpen && selectedEditOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[1.5rem] shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1e2d3d]">Update Status Pesanan</h3>
              <p className="text-sm text-gray-400 mt-0.5">{selectedEditOrder.id}</p>
            </div>

            <div className="px-8 py-6 space-y-3">
              <p className="text-sm text-[#334155] mb-4">Pilih status baru untuk pesanan ini:</p>
              {statusOptions.map((opt) => {
                const isActive = selectedEditOrder.status === opt.status;
                return (
                  <button
                    key={opt.status}
                    onClick={() => handleUpdateStatus(opt.status)}
                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all text-left
                      ${isActive ? 'bg-[#1e2d3d] text-white' : 'bg-[#f5f1ed] text-[#334155] hover:bg-[#ede8e3]'}`}
                  >
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${isActive ? 'bg-white opacity-70' : opt.dot}`} />
                    {opt.label}{isActive ? ' (Saat ini)' : ''}
                  </button>
                );
              })}
            </div>

            <div className="px-8 pb-8">
              <button
                onClick={closeEdit}
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
};

export default Dashboard;
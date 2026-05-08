import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function KelolaPesanan() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [metodeFilter, setMetodeFilter] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditOrder, setSelectedEditOrder] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  const handleLogout = () => navigate('/admin');

  const statusOptions = [
    { status: "pending",    label: "Pending",    dot: "bg-[#fab005]", color: "bg-[#fff9db] text-[#fab005]" },
    { status: "konfirmasi", label: "Konfirmasi", dot: "bg-[#228be6]", color: "bg-[#e7f5ff] text-[#228be6]" },
    { status: "diproses",   label: "Diproses",   dot: "bg-[#7950f2]", color: "bg-[#f3f0ff] text-[#7950f2]" },
    { status: "selesai",    label: "Selesai",    dot: "bg-[#40c057]", color: "bg-[#ebfbee] text-[#40c057]" },
  ];

  const [allOrders, setAllOrders] = useState([
    { id: "FLR-0042", pelanggan: "Siti Nurhaliza", produk: "Asteria XS", tgl: "2026-04-28", metode: "Ambil di Toko", total: "Rp50.000", status: "pending", label: "Pending", color: "bg-[#fff9db] text-[#fab005]", wa: "081234567890", penerima: "Siti Nurhaliza", telpPenerima: "081234567890", waktu: "10:00", pembayaran: "Transfer", pesan: "" },
    { id: "FLR-0041", pelanggan: "Budi Santoso", produk: "Ariana S", tgl: "2026-04-28", metode: "GoSend", total: "Rp165.000", status: "konfirmasi", label: "Konfirmasi", color: "bg-[#e7f5ff] text-[#228be6]", wa: "082345678901", penerima: "Rina Sari", telpPenerima: "082345678902", waktu: "09:00", pembayaran: "Transfer", pesan: "Happy Birthday!" },
    { id: "FLR-0040", pelanggan: "Dewi Kartika", produk: "Grace Pink S", tgl: "2026-04-27", metode: "Ambil di Toko", total: "Rp70.000", status: "diproses", label: "Diproses", color: "bg-[#f3f0ff] text-[#7950f2]", wa: "083456789012", penerima: "Sarah Amelia", telpPenerima: "083456789013", waktu: "15:30", pembayaran: "QRIS", pesan: "Congratulations!" },
    { id: "FLR-0039", pelanggan: "Ahmad Fauzi", produk: "Valencia Blue L", tgl: "2026-04-26", metode: "Ambil di Toko", total: "Rp195.000", status: "selesai", label: "Selesai", color: "bg-[#ebfbee] text-[#40c057]", wa: "084567890123", penerima: "Linda Cahya", telpPenerima: "084567890124", waktu: "13:00", pembayaran: "Cash", pesan: "With love!" },
    { id: "FLR-0038", pelanggan: "Sartika", produk: "BBA Godiva Blue", tgl: "2026-04-25", metode: "GoSend", total: "Rp350.000", status: "selesai", label: "Selesai", color: "bg-[#ebfbee] text-[#40c057]", wa: "085678901234", penerima: "Sartika", telpPenerima: "085678901234", waktu: "11:00", pembayaran: "Transfer", pesan: "" },
  ]);

  const filteredOrders = allOrders.filter(order => {
    const matchStatus = statusFilter === "" || order.status === statusFilter;
    const matchMetode = metodeFilter === "" || order.metode === metodeFilter;
    return matchStatus && matchMetode;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const openDetail = (order) => { setSelectedOrder(order); setIsDetailModalOpen(true); };
  const closeDetail = () => { setIsDetailModalOpen(false); setSelectedOrder(null); };
  const openEdit = (order) => { setSelectedEditOrder(order); setIsEditModalOpen(true); };
  const closeEdit = () => { setIsEditModalOpen(false); setSelectedEditOrder(null); };

  const handleUpdateStatus = (newStatus) => {
    const opt = statusOptions.find(o => o.status === newStatus);
    setAllOrders(prev => prev.map(o => o.id === selectedEditOrder.id ? { ...o, status: opt.status, label: opt.label, color: opt.color } : o));
    closeEdit();
  };

  return (
    <div className="flex min-h-screen bg-[#f5f1ed] font-sans text-[#334155]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl z-10">
        <div className="mb-10 text-left">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-2 text-left">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Dashboard</button>
          <button onClick={() => navigate('/admin/kelola-produk')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Produk</button>
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">Kelola Pesanan</button>
          <button onClick={() => navigate('/admin/rekap')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Rekap</button>
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          <span className="font-medium text-sm italic text-left">Logout</span>
        </button>
      </aside>

      <main className="flex-1 ml-64 p-10 text-left">
        <header className="mb-8">
          <h2 className="text-2xl font-bold mb-1 text-[#1e2d3d]">Kelola Pesanan</h2>
          <p className="text-gray-500 text-sm">Manajemen pesanan pelanggan</p>
        </header>

        {/* SECTION FILTER DENGAN ICON DROPDOWN */}
        <section className="bg-white p-8 rounded-[2rem] shadow-sm flex items-center justify-between mb-8 border border-gray-50">
          <div className="flex items-center gap-6 text-sm">
            {/* Filter Status */}
            <div className="flex items-center gap-3">
              <label className="font-bold text-[#1e2d3d]">Status:</label>
              <div className="relative group">
                <select 
                  value={statusFilter} 
                  onChange={(e) => {setStatusFilter(e.target.value); setCurrentPage(1);}} 
                  className="appearance-none bg-[#f7f3f0] border border-gray-200 rounded-2xl px-6 py-3 pr-12 text-sm font-medium focus:outline-none cursor-pointer min-w-[160px]"
                >
                  <option value="">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="konfirmasi">Konfirmasi</option>
                  <option value="diproses">Diproses</option>
                  <option value="selesai">Selesai</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Metode */}
            <div className="flex items-center gap-3">
              <label className="font-bold text-[#1e2d3d]">Metode:</label>
              <div className="relative group">
                <select 
                  value={metodeFilter} 
                  onChange={(e) => {setMetodeFilter(e.target.value); setCurrentPage(1);}} 
                  className="appearance-none bg-[#f7f3f0] border border-gray-200 rounded-2xl px-6 py-3 pr-12 text-sm font-medium focus:outline-none cursor-pointer min-w-[180px]"
                >
                  <option value="">Semua Metode</option>
                  <option value="GoSend">GoSend</option>
                  <option value="Ambil di Toko">Ambil di Toko</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-bold">Total: {filteredOrders.length} pesanan</p>
        </section>

        {/* TABLE SECTION */}
        <section className="bg-white rounded-[2rem] shadow-sm p-8 border border-gray-50 relative">
          <table className="w-full text-left text-sm table-fixed mb-6">
            <thead className="text-gray-400 border-b border-gray-100 italic font-bold">
              <tr>
                <th className="pb-6 px-4 w-[14%]">ID Pesanan</th>
                <th className="pb-6 px-4 w-[16%]">Pelanggan</th>
                <th className="pb-6 px-4 w-[15%]">Produk</th>
                <th className="pb-6 px-4 w-[13%]">Tanggal</th>
                <th className="pb-6 px-4 w-[14%]">Metode</th>
                <th className="pb-6 px-4 w-[12%]">Total</th>
                <th className="pb-6 text-center w-[16%]">Status</th>
                <th className="pb-6 text-center w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[#1e2d3d]">
              {currentOrders.map((order, index) => (
                <tr key={index} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-4 font-bold">{order.id}</td>
                  <td className="py-6 px-4 font-semibold">{order.pelanggan}</td>
                  <td className="py-6 px-4">{order.produk}</td>
                  <td className="py-6 px-4 text-gray-400">{order.tgl}</td>
                  <td className="py-6 px-4">{order.metode}</td>
                  <td className="py-6 px-4 font-bold">{order.total}</td>
                  <td className="py-6 text-center">
                    <span className={`px-5 py-2 rounded-full text-[11px] font-bold ${order.color}`}>{order.label}</span>
                  </td>
                  <td className="py-6 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => openDetail(order)} className="bg-[#334155] text-white p-2.5 rounded-xl hover:bg-[#242f3d] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button onClick={() => openEdit(order)} className="bg-[#f0e8dc] text-[#334155] p-2.5 rounded-xl hover:bg-[#e6dbcc] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-3">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-300' : 'bg-[#f5f1ed] text-[#334155] hover:bg-[#ede8e3]'}`}>← Back</button>
            <div className="flex items-center px-2 text-xs font-bold text-gray-400">Page {currentPage} of {totalPages || 1}</div>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-300' : 'bg-[#1e2d3d] text-white hover:bg-black'}`}>Next →</button>
          </div>
        </section>
      </main>

      {/* MODAL DETAIL PESANAN — PERSIS GAMBAR REFERENSI */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left font-sans">
          <div className="bg-white w-full max-w-xl rounded-[1.5rem] shadow-2xl overflow-hidden">
            {/* Header Modal */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1e2d3d]">Detail Pesanan — {selectedOrder.id}</h3>
              <button onClick={closeDetail} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-8 py-6 space-y-6 max-h-[72vh] overflow-y-auto">
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
                <p className="font-bold text-[#1e2d3d] text-sm mb-3 uppercase tracking-wider">Data Pemesan</p>
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

              {/* Data Penerima — DENGAN KETERANGAN & TELEPON */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-[#1e2d3d] text-sm mb-3 uppercase tracking-wider">Data Penerima</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="font-semibold text-[#334155] text-sm">{selectedOrder.penerima || '-'}</p>
                    <p className="text-[10px] text-gray-400 italic mt-1 leading-tight">*isi nama yang akan mengambil barang florist yaa</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Telepon</p>
                    <p className="font-semibold text-[#334155] text-sm">{selectedOrder.telpPenerima || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Detail Pesanan */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <p className="font-bold text-[#1e2d3d] text-sm mb-1 uppercase tracking-wider">Detail Pesanan</p>
                {[
                  { label: 'Produk',     value: selectedOrder.produk },
                  { label: 'Tanggal',    value: selectedOrder.tgl },
                  { label: 'Waktu',      value: selectedOrder.waktu || '-' },
                  { label: 'Metode',     value: selectedOrder.metode },
                  { label: 'Pembayaran', value: selectedOrder.pembayaran || '-' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm items-center">
                    <span className="text-gray-400 font-medium">{label}</span>
                    <span className="font-semibold text-[#334155]">{value}</span>
                  </div>
                ))}
              </div>

              {/* Greeting Card (Opsional) */}
              {selectedOrder.pesan && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-2 uppercase font-bold">Greeting Card</p>
                  <div className="bg-[#f9f7f4] p-4 rounded-xl border border-gray-50">
                    <p className="text-sm italic text-[#334155]">"{selectedOrder.pesan}"</p>
                  </div>
                </div>
              )}

              {/* Total Harga */}
              <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-gray-200">
                <p className="font-bold text-[#1e2d3d] uppercase tracking-widest text-sm">Total Harga</p>
                <p className="text-lg font-black text-[#1e2d3d]">{selectedOrder.total}</p>
              </div>
            </div>

            <div className="px-8 pb-8 pt-2">
              <button onClick={closeDetail} className="w-full bg-[#1e2d3d] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UPDATE STATUS */}
      {isEditModalOpen && selectedEditOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
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
                  <button key={opt.status} onClick={() => handleUpdateStatus(opt.status)} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all text-left ${isActive ? 'bg-[#1e2d3d] text-white' : 'bg-[#f5f1ed] text-[#334155] hover:bg-[#ede8e3]'}`}>
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${isActive ? 'bg-white opacity-70' : opt.dot}`} />
                    {opt.label}{isActive ? ' (Saat ini)' : ''}
                  </button>
                );
              })}
            </div>
            <div className="px-8 pb-8">
              <button onClick={closeEdit} className="w-full bg-[#f5f1ed] text-[#334155] py-4 rounded-2xl font-bold hover:bg-[#ede8e3] transition-all text-sm">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KelolaPesanan;
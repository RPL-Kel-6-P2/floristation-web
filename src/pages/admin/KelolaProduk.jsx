import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KelolaProduk = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [lastState, setLastState] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState('Semua Kategori');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // Pagination States - Sekarang 6 produk per halaman
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 

  const [products, setProducts] = useState([
    // FRESH FLOWERS (SLIDE 4)
    { id: 1, nama: 'ASTERIA (XS)', harga: 'Rp50.000', kategori: 'Fresh Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['CHRYSAN ASTER', 'PAKIS'] },
    { id: 2, nama: 'ARIANA (S)', harga: 'Rp165.000', kategori: 'Fresh Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['GARBERA', 'CALIMERO', 'BABY BREATH'] },
    { id: 3, nama: 'RAFAELA (M)', harga: 'Rp285.000', kategori: 'Fresh Flowers', status: 'Habis', color: 'bg-[#fee2e2] text-[#ef4444]', komposisi: ['GARBERA', 'RAFAEL/CALIMERO', 'CHRYSAN', 'BABY BREATH'] },
    { id: 4, nama: 'GARBE 5 STEM (M)', harga: 'Rp150.000', kategori: 'Fresh Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['CHRYSAN ASTER', 'GARBERA', 'SOLIDAGO/PAKIS/RUSKUS'] },
    { id: 5, nama: 'SUNNY SIDE UP (L)', harga: 'Rp475.000', kategori: 'Fresh Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['SUNFLOWER', 'BABY BREATH', 'SILVER DOLLAR'] },

    // ARTIFICIAL FLOWERS (SLIDE 11)
    { id: 6, nama: 'GRACE PINK (S)', harga: 'Rp70.000', kategori: 'Artificial Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['PEONY', 'GARBERA MINI'] },
    { id: 7, nama: 'GRACE RED WHITE (S)', harga: 'Rp70.000', kategori: 'Artificial Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['PEONY', 'GARBERA MINI'] },
    { id: 8, nama: 'KARINA LILY RED (M)', harga: 'Rp105.000', kategori: 'Artificial Flowers', status: 'Habis', color: 'bg-[#fee2e2] text-[#ef4444]', komposisi: ['LILY', 'ROSE', 'DRIED CASPEA'] },
    { id: 9, nama: 'FREYA (XL)', harga: 'Rp400.000', kategori: 'Artificial Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['LILY LATEX', 'ROSE', 'GOMPIE', 'DRIED CASPEA', 'TULIP', 'HYDRANGEA', 'BABY ROSE'] },
    { id: 10, nama: 'BRENDA (L)', harga: 'Rp325.000', kategori: 'Artificial Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['ANTHURIUM', 'ORCHIRD', 'GOMPIE', 'PEONY', 'ROSE', 'ONCIMIDIUM', 'DAISY', 'CASPEA'] },

    // SNACK BOUQUET (SLIDE 17)
    { id: 11, nama: 'SNACK BOUQUET 1', harga: 'Rp120.000', kategori: 'Snack Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['NEXTAR', 'GOOD TIME', 'BENG BENG'] },
    { id: 12, nama: 'SNACK BOUQUET 2', harga: 'Rp100.000', kategori: 'Snack Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['NEXTAR', 'GOOD TIME', 'HELLO PANDA', 'TANGGO', 'SMAX RING', 'TWIST'] },
    { id: 13, nama: 'SNACK BOUQUET 3', harga: 'Rp165.000', kategori: 'Snack Bouquet', status: 'Habis', color: 'bg-[#fee2e2] text-[#ef4444]', komposisi: ['GOOD TIME', 'BENG BENG', 'POCKY', 'CADBURY'] },

    // GRADUATION BOUQUET (SLIDE 15)
    { id: 14, nama: 'IVANA RED (S)', harga: 'Rp100.000', kategori: 'Graduation Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['GRADUATION DOLL', 'GOMPIE', 'ROSE', 'FILLER'] },
    { id: 15, nama: 'CLARA PURPLE (M)', harga: 'Rp135.000', kategori: 'Graduation Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['GRADUATION DOLL', 'GOMPIE', 'ROSE', 'BABY ROSE', 'DRIED CASPEA'] },
    { id: 16, nama: 'VALENCIA BLUE (L)', harga: 'Rp195.000', kategori: 'Graduation Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['GRADUATION DOLL', 'ROSE', 'GOMPIE', 'HYDRANGEA', 'BABY ROSE', 'DRIED CASPEA', 'SILVER DOLLAR'] },

    // BLOOM BOX ARRANGEMENT (SLIDE 20)
    { id: 17, nama: 'BBA GODIVA BLUE', harga: 'Rp350.000', kategori: 'Bloom Box Arrangement', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['FRESH FLOWERS: GOMPIE', 'ROSE & FILLER'] },
    { id: 18, nama: 'BBA GODIVA RED', harga: 'Rp350.000', kategori: 'Bloom Box Arrangement', status: 'Habis', color: 'bg-[#fee2e2] text-[#ef4444]', komposisi: ['FRESH FLOWERS: GOMPIE', 'ROSE & FILLER'] },
    { id: 19, nama: 'BBA LIRO', harga: 'Rp850.000', kategori: 'Bloom Box Arrangement', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', komposisi: ['FRESH FLOWERS: LILY', 'ROSE', 'CARNATION/GOMPIE', 'FILLER & FERERRO'] }
  ]);

  const initialFormState = { nama: '', harga: '', kategori: 'Fresh Flowers', tersedia: true, komposisi: [''] };
  const [formData, setFormData] = useState(initialFormState);

  const filteredProducts = products.filter((product) => {
    const matchCategory = categoryFilter === 'Semua Kategori' || product.kategori === categoryFilter;
    const matchStatus = statusFilter === 'Semua Status' || product.status === statusFilter;
    return matchCategory && matchStatus;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const formatRupiah = (value) => {
    if (!value) return '';
    const numberString = value.toString().replace(/[^0-9]/g, '');
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, harga: rawValue });
  };

  const handleAddComposition = () => setFormData({ ...formData, komposisi: [...formData.komposisi, ''] });
  const handleCompositionChange = (index, value) => {
    const newKomp = [...formData.komposisi];
    newKomp[index] = value;
    setFormData({ ...formData, komposisi: newKomp });
  };
  const handleRemoveComposition = (index) => setFormData({ ...formData, komposisi: formData.komposisi.filter((_, i) => i !== index) });

  const triggerNotify = (msg, type, data = null) => {
    setNotification({ show: true, message: msg, type: type });
    if (data) setLastState(data);
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
  };

  const handleUndo = () => {
    if (!lastState) return;
    if (notification.type === 'DELETE') setProducts(prev => [lastState, ...prev]);
    else if (notification.type === 'EDIT') setProducts(prev => prev.map(p => p.id === lastState.id ? lastState : p));
    setLastState(null);
    setNotification({ show: false, message: '', type: '' });
  };

  const openAddModal = () => { setIsEditMode(false); setFormData(initialFormState); setIsModalOpen(true); };
  const openEditModal = (product) => {
    setIsEditMode(true);
    setEditingId(product.id);
    setFormData({ nama: product.nama, harga: product.harga.replace(/[^0-9]/g, ''), kategori: product.kategori, tersedia: product.status === 'Tersedia', komposisi: product.komposisi || [''] });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanKomp = formData.komposisi.filter(item => item.trim() !== '');
    const formatted = {
      nama: formData.nama.toUpperCase(),
      harga: `Rp${formatRupiah(formData.harga)}`,
      kategori: formData.kategori,
      status: formData.tersedia ? 'Tersedia' : 'Habis',
      color: formData.tersedia ? 'bg-[#ebfbee] text-[#40c057]' : 'bg-[#fee2e2] text-[#ef4444]',
      komposisi: cleanKomp
    };

    if (isEditMode) {
      const original = products.find(p => p.id === editingId);
      setProducts(products.map(p => p.id === editingId ? { ...formatted, id: editingId } : p));
      triggerNotify('Perubahan berhasil disimpan', 'EDIT', original);
    } else {
      setProducts([{ ...formatted, id: Date.now() }, ...products]);
      triggerNotify('Produk berhasil ditambahkan', 'ADD');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const target = products.find(p => p.id === id);
    setProducts(products.filter(p => p.id !== id));
    triggerNotify('Produk berhasil dihapus', 'DELETE', target);
  };

  return (
    <div className="flex h-screen bg-[#f5f1ed] font-sans text-[#334155] overflow-hidden">
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl z-10 text-left">
        <div className="mb-10">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-2 text-left">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Dashboard</button>
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium text-sm">Kelola Produk</button>
          <button onClick={() => navigate('/admin/kelola-pesanan')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Pesanan</button>
          <button onClick={() => navigate('/admin/rekap')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Rekap</button>
        </nav>
        <button onClick={() => navigate('/admin')} className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          <span className="font-medium italic text-sm">Logout</span>
        </button>
      </aside>

      <main className="flex-1 ml-64 p-8 flex flex-col overflow-hidden text-left">
        <header className="flex justify-between items-start mb-6 flex-shrink-0">
          <div><h2 className="text-3xl font-bold mb-1 text-[#1e2d3d]">Kelola Produk</h2><p className="text-gray-500 text-sm italic">Manajemen inventaris Floristation.id</p></div>
          <button onClick={openAddModal} className="bg-[#1e2d3d] text-white px-7 py-3 rounded-xl font-bold hover:bg-black transition-all text-xs shadow-lg uppercase tracking-widest">+ Tambah Produk</button>
        </header>

        {notification.show && (
          <div className="bg-[#40c057] text-white px-6 py-4 rounded-2xl mb-6 flex items-center justify-between shadow-xl animate-in slide-in-from-top duration-300 flex-shrink-0">
            <span className="text-sm font-bold tracking-wide">{notification.message}</span>
            {(notification.type === 'DELETE' || notification.type === 'EDIT') && (
              <button onClick={handleUndo} className="text-xs font-black underline uppercase text-white hover:opacity-80 tracking-widest transition-opacity">Urungkan</button>
            )}
          </div>
        )}

        <section className="flex gap-6 mb-8 flex-shrink-0">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-bold text-[#1e2d3d] uppercase tracking-wide">Kategori</label>
            <select value={categoryFilter} onChange={(e) => {setCategoryFilter(e.target.value); setCurrentPage(1);}} className="bg-white border border-gray-200 px-5 py-3 rounded-xl text-xs font-bold text-[#334155] outline-none min-w-[220px] shadow-sm">
              <option value="Semua Kategori">Semua Kategori</option>
              <option value="Fresh Flowers">Fresh Flowers</option>
              <option value="Artificial Flowers">Artificial Flowers</option>
              <option value="Snack Bouquet">Snack Bouquet</option>
              <option value="Graduation Bouquet">Graduation Bouquet</option>
              <option value="Bloom Box Arrangement">Bloom Box Arrangement</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-bold text-[#1e2d3d] uppercase tracking-wide">Status</label>
            <select value={statusFilter} onChange={(e) => {setStatusFilter(e.target.value); setCurrentPage(1);}} className="bg-[#1e2d3d] px-6 py-3 rounded-xl text-xs font-bold text-white outline-none min-w-[160px] shadow-md">
              <option value="Semua Status">Semua Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Habis">Habis</option>
            </select>
          </div>
        </section>

        {/* PRODUK LIST - GRID 3x2 UNTUK 6 PRODUK */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
            {currentProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-[2rem] shadow-sm flex flex-col border border-gray-100 p-5 transition-all hover:shadow-lg overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-gray-400 text-[8px] font-bold uppercase tracking-widest block mb-0.5">{p.kategori}</span>
                    <h3 className="text-xs font-bold text-[#1e2d3d] uppercase truncate w-32">{p.nama}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${p.color}`}>{p.status}</span>
                </div>
                <div className="mb-3 bg-[#fcfaf8] p-2 rounded-xl border border-gray-50 flex-1 min-h-0">
                  <p className="text-[8px] text-gray-400 font-bold uppercase mb-0.5">Komposisi:</p>
                  <p className="text-[10px] text-[#5c524f] italic line-clamp-2 leading-tight">{p.komposisi?.join(', ') || '-'}</p>
                </div>
                <div className="mt-auto">
                  <p className="text-sm font-black text-[#1e2d3d] mb-3">{p.harga}</p>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(p)} className="flex-1 bg-[#1e2d3d] text-white py-2 rounded-lg text-[9px] font-bold hover:bg-black uppercase">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="flex-1 bg-[#e03131] text-white py-2 rounded-lg text-[9px] font-bold hover:bg-[#c92a2a] uppercase">Hapus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-auto py-6 border-t border-gray-100 flex justify-between items-center flex-shrink-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total {filteredProducts.length} Produk</p>
          <div className="flex gap-4 items-center">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className={`w-28 py-3 rounded-2xl text-xs font-bold transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#e8e2dc] text-[#1e2d3d] hover:bg-[#dcd5cf]'}`}>← Back</button>
            <div className="text-xs font-black text-[#1e2d3d] bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">Page {currentPage} of {totalPages || 1}</div>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className={`w-28 py-3 rounded-2xl text-xs font-bold transition-all shadow-md ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' : 'bg-[#1e2d3d] text-white hover:bg-black'}`}>Next →</button>
          </div>
        </footer>
      </main>

      {/* MODAL FORM TETAP SAMA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 relative text-left overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
            <h3 className="text-2xl font-bold text-[#1e2d3d] mb-8">{isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div><label className="block text-[11px] font-bold mb-2 uppercase text-gray-400 tracking-widest">Nama Produk</label><input type="text" placeholder="ASTERIA XS" className="w-full px-5 py-3.5 bg-[#f7f3f0] rounded-2xl outline-none text-sm font-medium border border-transparent" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} required /></div>
              <div><label className="block text-[11px] font-bold mb-2 uppercase text-gray-400 tracking-widest">Harga (Rp)</label><div className="relative"><span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span><input type="text" className="w-full pl-11 pr-5 py-3.5 bg-[#f7f3f0] rounded-2xl outline-none text-sm font-bold" value={formatRupiah(formData.harga)} onChange={handlePriceChange} required /></div></div>
              <div><label className="block text-[11px] font-bold mb-2 uppercase text-gray-400 tracking-widest">Kategori</label><select className="w-full px-5 py-3.5 bg-[#f7f3f0] rounded-2xl outline-none text-sm font-medium" value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})}><option value="Fresh Flowers">Fresh Flowers</option><option value="Artificial Flowers">Artificial Flowers</option><option value="Snack Bouquet">Snack Bouquet</option><option value="Graduation Bouquet">Graduation Bouquet</option><option value="Bloom Box Arrangement">Bloom Box Arrangement</option></select></div>
              <div className="bg-[#fcfaf8] p-6 rounded-[2rem] border border-gray-100 flex flex-col"><label className="block text-[11px] font-bold mb-4 uppercase text-gray-400 tracking-widest">Komposisi Rangkaian</label><div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">{formData.komposisi.map((item, index) => (<div key={index} className="flex gap-2 group"><input type="text" className="flex-1 px-4 py-2.5 bg-white rounded-xl text-xs outline-none border border-gray-100" value={item} onChange={(e) => handleCompositionChange(index, e.target.value)} />{formData.komposisi.length > 1 && (<button type="button" onClick={() => handleRemoveComposition(index)} className="text-red-300 hover:text-red-500 font-bold">✕</button>)}</div>))}</div><button type="button" onClick={handleAddComposition} className="mt-4 text-[11px] font-black text-[#1e2d3d] underline uppercase text-center w-full">+ Tambah Item</button></div>
              <div className="flex items-center gap-3 py-2"><input type="checkbox" id="stock" checked={formData.tersedia} onChange={(e) => setFormData({...formData, tersedia: e.target.checked})} className="w-6 h-6 accent-[#1e2d3d]" /><label htmlFor="stock" className="text-sm font-bold text-[#1e2d3d]">Stok tersedia</label></div>
              <div className="flex flex-col gap-3 pt-6 border-t border-gray-50"><button type="submit" className="w-full py-4 bg-[#1e2d3d] text-white font-black rounded-2xl text-xs shadow-xl uppercase tracking-[0.2em]">{isEditMode ? 'Simpan Perubahan' : 'Daftarkan Produk'}</button><button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl text-xs shadow-none">Batalkan</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaProduk;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KelolaProduk = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [lastState, setLastState] = useState(null);

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua Kategori');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  const [products, setProducts] = useState([
    { id: 1, nama: 'ASTERIA (XS)', harga: 'Rp50.000', kategori: 'Fresh Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'Fresh Flowers Asteria XS.jpeg', komposisi: ['CHRYSAN ASTER', 'PAKIS'] },
    { id: 2, nama: 'ARIANA (S)', harga: 'Rp165.000', kategori: 'Fresh Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'Fresh Flowers Ariana S.jpeg', komposisi: ['GARBERA', 'CALIMERO', 'BABY BREATH'] },
    { id: 3, nama: 'RAFAELA (M)', harga: 'Rp285.000', kategori: 'Fresh Flowers', status: 'Tersedia', color: 'bg-[#fee2e2] text-[#ef4444]', image: 'Fresh Flowers Rafaela M.jpeg', komposisi: ['GARBERA', 'RAFAEL/CALIMERO', 'CHRYSAN', 'BABY BREATH'] },
    { id: 4, nama: 'GARBE 5 STEM (M)', harga: 'Rp150.000', kategori: 'Fresh Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'Fresh Flowers Garbe 5 Stem M.jpeg', komposisi: ['CHRYSAN ASTER', 'GARBERA', 'SOLIDAGO/PAKIS/RUSKUS'] },
    { id: 5, nama: 'SUNNY SIDE UP (L)', harga: 'Rp475.000', kategori: 'Fresh Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'Fresh Flowers Suny Sideup L.jpeg', komposisi: ['SUNFLOWER', 'BABY BREATH', 'SILVER DOLLAR'] },
    { id: 6, nama: 'GRACE PINK (S)', harga: 'Rp70.000', kategori: 'Artificial Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'artificial-grace-pink.jpeg', komposisi: ['PEONY', 'GARBERA MINI'] },
    { id: 7, nama: 'GRACE RED WHITE (S)', harga: 'Rp70.000', kategori: 'Artificial Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'artificial-grace-red-white.jpeg', komposisi: ['PEONY', 'GARBERA MINI'] },
    { id: 8, nama: 'KARINA LILY RED (M)', harga: 'Rp105.000', kategori: 'Artificial Flowers', status: 'Tersedia', color: 'bg-[#fee2e2] text-[#ef4444]', image: 'artificial-karina-lily-red.jpeg', komposisi: ['LILY', 'ROSE', 'DRIED CASPEA'] },
    { id: 9, nama: 'FREYA (XL)', harga: 'Rp400.000', kategori: 'Artificial Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'artificial-freya-xl.jpeg', komposisi: ['LILY LATEX', 'ROSE', 'GOMPIE', 'DRIED CASPEA', 'TULIP', 'HYDRANGEA', 'BABY ROSE'] },
    { id: 10, nama: 'BRENDA (L)', harga: 'Rp325.000', kategori: 'Artificial Flowers', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'artificial-brenda-l.jpeg', komposisi: ['ANTHURIUM', 'ORCHIRD', 'GOMPIE', 'PEONY', 'ROSE', 'ONCIMIDIUM', 'DAISY', 'CASPEA'] },
    { id: 11, nama: 'SNACK BOUQUET 1', harga: 'Rp120.000', kategori: 'Snack Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'SNACK BOUQUET 1.png', komposisi: ['NEXTAR', 'GOOD TIME', 'BENG BENG'] },
    { id: 12, nama: 'SNACK BOUQUET 2', harga: 'Rp100.000', kategori: 'Snack Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'SNACK BOUQUET 2.png', komposisi: ['NEXTAR', 'GOOD TIME', 'HELLO PANDA', 'TANGGO', 'SMAX RING', 'TWIST'] },
    { id: 13, nama: 'SNACK BOUQUET 3', harga: 'Rp165.000', kategori: 'Snack Bouquet', status: 'Tersedia', color: 'bg-[#fee2e2] text-[#ef4444]', image: 'SNACK BOUQUET 3.png', komposisi: ['GOOD TIME', 'BENG BENG', 'POCKY', 'CADBURY'] },
    { id: 14, nama: 'IVANA RED (S)', harga: 'Rp100.000', kategori: 'Graduation Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'ivana-red-s.jpg', komposisi: ['GRADUATION DOLL', 'GOMPIE', 'ROSE', 'FILLER'] },
    { id: 15, nama: 'CLARA PURPLE (M)', harga: 'Rp135.000', kategori: 'Graduation Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'clara-purple-m.jpg', komposisi: ['GRADUATION DOLL', 'GOMPIE', 'ROSE', 'BABY ROSE', 'DRIED CASPEA'] },
    { id: 16, nama: 'VALENCIA BLUE (L)', harga: 'Rp195.000', kategori: 'Graduation Bouquet', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'valencia-blue-l.jpg', komposisi: ['GRADUATION DOLL', 'ROSE', 'GOMPIE', 'HYDRANGEA', 'BABY ROSE', 'DRIED CASPEA', 'SILVER DOLLAR'] },
    { id: 17, nama: 'BBA GODIVA BLUE', harga: 'Rp350.000', kategori: 'Bloom Box Arrangement', status: 'Tersedia', color: 'bg-[#ebfbee] text-[#40c057]', image: 'BLOOM BOX ARRANGEMENT BBA Godiva Blue.png', komposisi: ['GOMPIE', 'ROSE & FILLER'] },
    { id: 18, nama: 'BBA GODIVA RED', harga: 'Rp350.000', kategori: 'Bloom Box Arrangement', status: 'Tersedia', color: 'bg-[#fee2e2] text-[#ef4444]', image: 'BLOOM BOX ARRANGEMENT BBA Godiva Red.png', komposisi: ['GOMPIE', 'ROSE & FILLER'] },
    { id: 19, nama: 'BBA LIRO', harga: 'Rp850.000', kategori: 'Bloom Box Arrangement', status: 'Tersedia', color: 'bg-[#fee2e2] text-[#ef4444]', image: 'BLOOM BOX ARRANGEMENT BBA Liro.png', komposisi: ['LILY', 'ROSE', 'CARNATION', 'GOMPIE', 'FILLER & FERERRO'] }
  ]);

  const initialFormState = { nama: '', harga: '', kategori: 'Fresh Flowers', tersedia: true, komposisi: [''], image: '', preview: null };
  const [formData, setFormData] = useState(initialFormState);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, preview: reader.result, image: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'Semua Kategori' || product.kategori === categoryFilter;
    const matchStatus = statusFilter === 'Semua Status' || product.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
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
    const rawPrice = product.harga.replace(/[^0-9]/g, '');
    setFormData({ 
      nama: product.nama, 
      harga: rawPrice, 
      kategori: product.kategori, 
      tersedia: product.status === 'Tersedia', 
      komposisi: product.komposisi || [''], 
      image: product.image,
      preview: product.image.startsWith('data:') ? product.image : `/images/${product.image}`
    });
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
      komposisi: cleanKomp,
      image: formData.preview && formData.preview.startsWith('data:') ? formData.preview : formData.image
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

  const handleLogout = () => navigate('/admin');

  return (
    <div className="flex h-screen bg-[#f5f1ed] font-sans text-[#334155] overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl">
        <div className="mb-10 text-left">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-2 text-left">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors font-medium">Dashboard</button>
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">Kelola Produk</button>
          <button onClick={() => navigate('/admin/kelola-pesanan')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors font-medium">Kelola Pesanan</button>
          <button onClick={() => navigate('/admin/rekap')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors font-medium">Rekap</button>
        </nav>
        <button onClick={handleLogout} className="group mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-left font-medium italic text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </aside>

      <main className="flex-1 ml-64 p-8 flex flex-col overflow-hidden text-left">
        <header className="flex justify-between items-start mb-6 flex-shrink-0">
          <div><h2 className="text-3xl font-bold mb-1 text-[#1e2d3d]">Kelola Produk</h2><p className="text-gray-500 text-sm italic">Manajemen inventaris Floristation.id</p></div>
          <button onClick={openAddModal} className="bg-[#1e2d3d] text-white px-7 py-3 rounded-xl font-bold hover:bg-black transition-all text-xs shadow-lg uppercase tracking-widest">+ Tambah Produk</button>
        </header>

        {notification.show && (
          <div className="bg-[#40c057] text-white px-6 py-4 rounded-2xl mb-6 flex items-center justify-between shadow-xl animate-in slide-in-from-top duration-300 flex-shrink-0 z-50">
            <span className="text-sm font-bold tracking-wide">{notification.message}</span>
            <button onClick={handleUndo} className="text-xs font-black underline uppercase text-white hover:opacity-80 tracking-widest transition-opacity">Urungkan</button>
          </div>
        )}

        {/* SECTION SEARCH & FILTER */}
        <section className="flex gap-4 mb-8 flex-shrink-0 items-end">
          <div className="flex flex-col gap-1.5 text-left w-64">
            <label className="text-[10px] font-bold text-[#1e2d3d] uppercase tracking-wide">Cari Produk</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Nama bunga..."
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                className="w-full bg-white border border-gray-200 px-9 py-2.5 rounded-xl text-xs font-bold text-[#334155] outline-none shadow-sm focus:border-[#1e2d3d]/30"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold text-[#1e2d3d] uppercase tracking-wide">Kategori</label>
            <select value={categoryFilter} onChange={(e) => {setCategoryFilter(e.target.value); setCurrentPage(1);}} className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-bold text-[#334155] outline-none min-w-[180px] shadow-sm">
              <option value="Semua Kategori">Semua Kategori</option>
              <option value="Fresh Flowers">Fresh Flowers</option>
              <option value="Artificial Flowers">Artificial Flowers</option>
              <option value="Snack Bouquet">Snack Bouquet</option>
              <option value="Graduation Bouquet">Graduation Bouquet</option>
              <option value="Bloom Box Arrangement">Bloom Box Arrangement</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold text-[#1e2d3d] uppercase tracking-wide">Status</label>
            <select value={statusFilter} onChange={(e) => {setStatusFilter(e.target.value); setCurrentPage(1);}} className="bg-[#1e2d3d] px-4 py-2.5 rounded-xl text-xs font-bold text-white outline-none min-w-[140px] shadow-md">
              <option value="Semua Status">Semua Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Habis">Habis</option>
            </select>
          </div>
        </section>

        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 h-full content-start overflow-y-auto pr-2 custom-scrollbar pb-4">
            {currentProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm flex flex-col border border-gray-100 p-4 transition-all hover:shadow-md h-fit text-left">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    {/* KATEGORI DIPERBESAR (text-[8px]) */}
                    <span className="text-gray-400 text-[8px] font-black uppercase tracking-widest block truncate mb-1">
                      {p.kategori}
                    </span>
                    {/* NAMA PRODUK DIPERBESAR (text-[11px]) */}
                    <h3 className="text-[11px] font-black text-[#1e2d3d] uppercase truncate leading-tight">{p.nama}</h3>
                  </div>
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-tighter whitespace-nowrap ${p.color}`}>{p.status}</span>
                </div>
                
                <div className="mb-4 rounded-xl border border-gray-50 bg-[#fcfaf8] p-1.5">
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-100">
                    <img src={p.image.startsWith('data:') ? p.image : `/images/${p.image}`} className="h-full w-full object-cover" alt={p.nama} onError={(e) => e.target.src = "https://via.placeholder.com/300x400?text=No+Image"} />
                  </div>
                  <p className="mt-2 line-clamp-1 text-[8px] italic text-[#5c524f] px-0.5 text-left">{p.komposisi?.join(", ") || "-"}</p>
                </div>

                <div className="mt-auto text-left">
                  {/* HARGA DIPERBESAR (text-sm font-black) */}
                  <p className="mb-3 text-sm font-black text-[#1e2d3d] tracking-tight">{p.harga}</p>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(p)} className="flex-1 rounded-md bg-[#1e2d3d] py-2 text-[8px] font-black uppercase text-white hover:bg-black transition-colors tracking-widest">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="flex-1 rounded-md bg-[#e03131] py-2 text-[8px] font-black uppercase text-white hover:bg-[#c92a2a] transition-colors tracking-widest">Hapus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-auto py-4 border-t border-gray-100 flex justify-between items-center flex-shrink-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total {filteredProducts.length} Produk</p>
          <div className="flex gap-3 items-center">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#e8e2dc] text-[#1e2d3d] hover:bg-[#dcd5cf]'}`}>← Back</button>
            <div className="text-[10px] font-black text-[#1e2d3d] bg-white px-3 py-1 rounded-full border border-gray-100">Page {currentPage} of {totalPages || 1}</div>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all shadow-sm ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#1e2d3d] text-white hover:bg-black'}`}>Next →</button>
          </div>
        </footer>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl p-10 relative text-left max-h-[95vh] overflow-y-auto custom-scrollbar">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 font-bold text-xl transition-colors">✕</button>
            <h3 className="text-2xl font-bold text-[#1e2d3d] mb-8 uppercase tracking-tighter">{isEditMode ? 'Edit Detail Produk' : 'Tambah Produk Baru'}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold mb-2 uppercase text-gray-400 tracking-widest text-left">Preview Foto (Portrait) :</label>
                    <div className="w-full h-[450px] bg-[#f7f3f0] rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden mb-3 p-2 shadow-inner">
                      {formData.preview ? <img src={formData.preview} className="w-full h-full object-contain rounded-xl" alt="Preview" /> : (
                        <div className="flex flex-col items-center text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="text-[10px] mt-2 font-bold uppercase tracking-widest">No Portrait Selected</span>
                        </div>
                      )}
                    </div>
                    <label className="block text-[11px] font-bold mb-2 uppercase text-gray-400 tracking-widest text-left">Ganti Foto :</label>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="block w-full text-[10px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-[#1e2d3d] file:text-white cursor-pointer hover:file:bg-black transition-all" />
                  </div>
                  <div className="bg-[#fcfaf8] p-6 rounded-[2rem] border border-gray-100 flex flex-col text-left">
                    <label className="block text-[11px] font-bold mb-4 uppercase text-gray-400 tracking-widest text-left">Komposisi Bahan</label>
                    <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                      {formData.komposisi.map((item, index) => (
                        <div key={index} className="flex gap-2 group">
                          <input type="text" placeholder="Item bunga/snack..." className="flex-1 px-4 py-2.5 bg-white rounded-xl text-xs outline-none border border-gray-100 font-medium" value={item} onChange={(e) => handleCompositionChange(index, e.target.value)} />
                          {formData.komposisi.length > 1 && <button type="button" onClick={() => handleRemoveComposition(index)} className="text-red-300 hover:text-red-500 font-bold">✕</button>}
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={handleAddComposition} className="mt-4 pt-2 text-[11px] font-black text-[#1e2d3d] underline uppercase text-center w-full">+ Tambah Item</button>
                  </div>
                </div>
                <div className="space-y-6 text-left self-start">
                  <div><label className="block text-[11px] font-black mb-2 uppercase text-[#1e2d3d] tracking-widest">Nama Produk :</label><input type="text" placeholder="CONTOH: ASTERIA XS" className="w-full px-5 py-4 bg-[#f7f3f0] rounded-2xl outline-none text-sm font-bold border border-transparent focus:border-[#1e2d3d]/10 transition-all uppercase" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} required /></div>
                  <div><label className="block text-[11px] font-black mb-2 uppercase text-[#1e2d3d] tracking-widest">Harga Jual :</label><div className="relative"><span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-black text-gray-400">Rp</span><input type="text" placeholder="0" className="w-full pl-12 pr-5 py-4 bg-[#f7f3f0] rounded-2xl outline-none text-base font-black border border-transparent focus:border-[#1e2d3d]/10 transition-all" value={formatRupiah(formData.harga)} onChange={handlePriceChange} required /></div></div>
                  <div><label className="block text-[11px] font-black mb-2 uppercase text-[#1e2d3d] tracking-widest">Kategori Produk :</label><select className="w-full px-5 py-4 bg-[#f7f3f0] rounded-2xl outline-none text-sm font-bold border border-transparent focus:border-[#1e2d3d]/10 transition-all cursor-pointer" value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})}><option value="Fresh Flowers">Fresh Flowers</option><option value="Artificial Flowers">Artificial Flowers</option><option value="Snack Bouquet">Snack Bouquet</option><option value="Graduation Bouquet">Graduation Bouquet</option><option value="Bloom Box Arrangement">Bloom Box Arrangement</option></select></div>
                  <div><label className="block text-[11px] font-bold mb-2 uppercase text-gray-400 tracking-widest">Nama File (System) :</label><input type="text" className="w-full px-5 py-3.5 bg-[#f7f3f0] rounded-2xl outline-none text-xs border border-transparent font-mono text-gray-500" value={formData.image} readOnly /></div>
                  <div className="flex items-center gap-4 py-4 bg-[#fcfaf8] px-6 rounded-2xl border border-gray-100"><input type="checkbox" id="stock" checked={formData.tersedia} onChange={(e) => setFormData({...formData, tersedia: e.target.checked})} className="w-6 h-6 accent-[#1e2d3d] cursor-pointer" /><label htmlFor="stock" className="text-sm font-black text-[#1e2d3d] cursor-pointer uppercase tracking-tighter">Status: Produk Tersedia</label></div>
                  <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
                    <button type="submit" className="w-full py-5 bg-[#1e2d3d] text-white font-black rounded-2xl text-xs shadow-xl hover:bg-black transition-all uppercase tracking-[0.3em]">{isEditMode ? 'Simpan Perubahan' : 'Daftarkan Produk Ke Katalog'}</button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-4 bg-gray-100 text-gray-400 font-bold rounded-2xl text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors">Batal</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaProduk;
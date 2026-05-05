import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KelolaProduk = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [lastDeleted, setLastDeleted] = useState(null);

  const [products, setProducts] = useState([
    { id: 1, nama: 'ASTERIA XS', harga: 'Rp50.000', kategori: 'Buket Fresh', status: 'Tersedia', image: '/images/asteria-xs.png', color: 'bg-[#ebfbee] text-[#40c057]' },
    { id: 2, nama: 'ARIANA S', harga: 'Rp165.000', kategori: 'Buket Fresh', status: 'Tersedia', image: '', color: 'bg-[#ebfbee] text-[#40c057]' },
    { id: 3, nama: 'BELLA MEDIUM', harga: 'Rp200.000', kategori: 'Graduation', status: 'Habis', image: '/images/bella-medium.jpg', color: 'bg-[#fff5f5] text-[#fa5252]' },
    { id: 4, nama: 'ARTIFICIAL ROSE', harga: 'Rp120.000', kategori: 'Buket Artificial', status: 'Tersedia', image: '/images/artificial-rose.jpg', color: 'bg-[#ebfbee] text-[#40c057]' }
  ]);

  const [formData, setFormData] = useState({ nama: '', harga: '', kategori: '', image: '', komposisi: '', tersedia: true });

  const triggerNotify = (msg) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProd = {
      id: Date.now(),
      nama: formData.nama.toUpperCase() || "KARINA LILY PINK",
      harga: `Rp${Number(formData.harga).toLocaleString() || "105.000"}`,
      kategori: formData.kategori || "Buket Fresh",
      status: formData.tersedia ? 'Tersedia' : 'Habis',
      image: formData.image || "https://via.placeholder.com/500",
      color: formData.tersedia ? 'bg-[#ebfbee] text-[#40c057]' : 'bg-[#fff5f5] text-[#fa5252]'
    };
    setProducts([...products, newProd]);
    setIsModalOpen(false);
    triggerNotify('Produk berhasil ditambahkan');
  };

  const handleDelete = (id) => {
    const productToDelete = products.find(p => p.id === id);
    setLastDeleted(productToDelete);
    setProducts(products.filter(p => p.id !== id));
    triggerNotify('Produk berhasil dihapus');
  };

  const handleUndo = () => {
    if (lastDeleted) {
      setProducts(prevProducts => [...prevProducts, lastDeleted]);
      setLastDeleted(null);
      setNotification({ show: false, message: '' });
    }
  };

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
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">Kelola Produk</button>
          <button onClick={() => navigate('/admin/kelola-pesanan')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Pesanan</button>
          <button onClick={() => navigate('/admin/rekap')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Rekap</button>
        </nav>

        <button onClick={() => navigate('/admin')} className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium text-sm italic">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-[#1e2d3d]">Kelola Produk</h2>
            <p className="text-gray-500 text-sm">Manajemen produk buket bunga</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1e2d3d] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#2c3e50] shadow-lg shadow-[#1e2d3d]/20 active:scale-95 transition-all text-sm flex items-center gap-2"
          >
            <span className="text-lg">+</span> Tambah Produk
          </button>
        </header>

        {/* Notifikasi */}
        {notification.show && (
          <div className="bg-[#e9f7ef] border border-[#d4efdf] text-[#1e8449] px-6 py-4 rounded-xl mb-8 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <span className="text-sm font-medium">{notification.message}</span>
            {notification.message === 'Produk berhasil dihapus' && (
              <button onClick={handleUndo} className="text-xs font-black underline uppercase">Urungkan</button>
            )}
          </div>
        )}

        {/* Grid Produk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm flex flex-col h-full border border-gray-100">
              <div className="h-64 overflow-hidden relative bg-gray-100">
                <img src={product.image || "https://via.placeholder.com/500?text=Tanpa+Foto"} alt={product.nama} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-[#1e2d3d] mb-1">{product.nama}</h3>
                <p className="text-[#334155] font-medium mb-4 italic">{product.harga}</p>
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">{product.kategori}</span>
                  <span className={`px-5 py-2 rounded-full text-[11px] font-bold ${product.color}`}>{product.status}</span>
                </div>
                <div className="flex gap-3 mt-auto">
                  <button className="flex-1 bg-[#1e2d3d] text-white py-3 rounded-xl text-[11px] font-bold hover:bg-[#2c3e50] flex items-center justify-center gap-2">
                    <span>✎</span> Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="flex-1 bg-[#900] text-white py-3 rounded-xl text-[11px] font-bold hover:bg-[#b30000] flex items-center justify-center gap-2">
                    <span>🗑</span> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL TAMBAH PRODUK BARU */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[620px] rounded-[2.5rem] shadow-2xl p-10 relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 text-2xl hover:text-gray-600 transition-colors">✕</button>

            <h3 className="text-lg font-bold text-[#2f435e] mb-8">Tambah Produk Baru</h3>

            <form onSubmit={handleAddProduct} className="space-y-6">
              <div>
                <label className="block text-[#2f435e] text-xs font-bold mb-2">Nama Produk *</label>
                <input
                  type="text"
                  placeholder="KARINA LILY PINK"
                  className="w-full px-5 py-3.5 bg-[#f3f0ec] border-none rounded-xl outline-none text-sm placeholder:text-[#b4b4b4]"
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2f435e] text-xs font-bold mb-2">Harga *</label>
                  <input
                    type="number"
                    placeholder="105"
                    className="w-full px-5 py-3.5 bg-[#f3f0ec] border-none rounded-xl outline-none text-sm placeholder:text-[#b4b4b4]"
                    onChange={(e) => setFormData({...formData, harga: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#2f435e] text-xs font-bold mb-2">Kategori</label>
                  <input
                    type="text"
                    placeholder="Buket Fresh"
                    className="w-full px-5 py-3.5 bg-[#f3f0ec] border-none rounded-xl outline-none text-sm placeholder:text-[#b4b4b4]"
                    onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2f435e] text-xs font-bold mb-2">URL Gambar</label>
                <input
                  type="text"
                  placeholder="https://gambarbungakarinalilypink"
                  className="w-full px-5 py-3.5 bg-[#f3f0ec] border-none rounded-xl outline-none text-sm placeholder:text-[#b4b4b4]"
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[#2f435e] text-xs font-bold mb-2">Komposisi</label>
                <textarea
                  rows="3"
                  placeholder="Rose, Lily, Baby Breath"
                  className="w-full px-5 py-3.5 bg-[#f3f0ec] border-none rounded-xl outline-none text-sm resize-none placeholder:text-[#b4b4b4]"
                  onChange={(e) => setFormData({...formData, komposisi: e.target.value})}
                ></textarea>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="tersedia"
                  checked={formData.tersedia}
                  className="w-4 h-4 cursor-pointer accent-[#2f435e]"
                  onChange={(e) => setFormData({...formData, tersedia: e.target.checked})}
                />
                <label htmlFor="tersedia" className="text-[#2f435e] text-xs font-bold cursor-pointer">Produk Tersedia</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-[#f3f0ec] text-[#2f435e] font-bold rounded-2xl text-xs hover:bg-[#efe9e4] transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#2f435e] text-white font-bold rounded-2xl text-xs shadow-lg shadow-[#2f435e]/20 hover:bg-[#1e2d3d] transition-colors"
                >
                  Tambah Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaProduk;
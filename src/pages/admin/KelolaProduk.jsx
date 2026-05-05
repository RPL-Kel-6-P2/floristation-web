import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KelolaProduk = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  // State awal dengan 4 produk sesuai referensi gambar
  const [products, setProducts] = useState([
    { id: 1, nama: 'Asteria XS', harga: 'Rp50.000', kategori: 'Buket Fresh', status: 'Tersedia', image: '/images/asteria-xs.png', color: 'bg-[#ebfbee] text-[#40c057]' },
    { id: 2, nama: 'Ariana S', harga: 'Rp165.000', kategori: 'Buket Fresh', status: 'Tersedia', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=500', color: 'bg-[#ebfbee] text-[#40c057]' },
    { id: 3, nama: 'Bella Medium', harga: 'Rp200.000', kategori: 'Graduation', status: 'Habis', image: 'https://images.unsplash.com/photo-1522814455554-e0638118021b?q=80&w=500', color: 'bg-[#fff5f5] text-[#fa5252]' },
    { id: 4, nama: 'Artificial Rose', harga: 'Rp120.000', kategori: 'Buket Artificial', status: 'Tersedia', image: 'https://images.unsplash.com/photo-1597848212624-a19eb3bfbf15?q=80&w=500', color: 'bg-[#ebfbee] text-[#40c057]' }
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
      kategori: formData.kategori || "Buket Artificial",
      status: formData.tersedia ? 'Tersedia' : 'Habis',
      image: formData.image || "https://via.placeholder.com/500",
      color: formData.tersedia ? 'bg-[#ebfbee] text-[#40c057]' : 'bg-[#fff5f5] text-[#fa5252]'
    };
    setProducts([...products, newProd]);
    setIsModalOpen(false);
    triggerNotify('Produk berhasil ditambahkan');
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    triggerNotify('Produk berhasil dihapus');
  };

  return (
    <div className="flex min-h-screen bg-[#f5f1ed] font-sans text-[#334155]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl">
        <div className="mb-10">
          <h1 className="text-2xl font-serif italic tracking-wide">Floristation.id</h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Dashboard</button>
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">Kelola Produk</button>
          <button onClick={() => navigate('/admin/kelola-pesanan')} className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Kelola Pesanan</button>
          <button className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors">Rekap</button>
        </nav>

        <button onClick={() => navigate('/admin')} className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-bold mb-1">Kelola Produk</h2>
            <p className="text-gray-500 text-sm">Manajemen produk buket bunga</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1e2d3d] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#2c3e50] shadow-md transition-all active:scale-95 text-sm"
          >
            <span className="text-xl">+</span> Tambah Produk
          </button>
        </header>

        {notification.show && (
          <div className="bg-[#e9f7ef] border border-[#d4efdf] text-[#1e8449] px-6 py-4 rounded-xl mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm flex flex-col h-full border border-gray-100">
              <div className="h-64 overflow-hidden relative">
                <img src={product.image} alt={product.nama} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-[#1e2d3d] mb-1">{product.nama}</h3>
                <p className="text-[#334155] font-medium mb-4">{product.harga}</p>
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">{product.kategori}</span>
                  <span className={`px-5 py-2 rounded-full text-[11px] font-bold ${product.color}`}>
                    {product.status}
                  </span>
                </div>
                <div className="flex gap-3 mt-auto">
                  <button className="flex-1 bg-[#334155] text-white py-3 rounded-xl text-[11px] font-bold hover:bg-[#242f3d]">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="flex-1 bg-[#e00000] text-white py-3 rounded-xl text-[11px] font-bold hover:bg-[#b30000]">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL TAMBAH PRODUK BARU - SESUAI REFERENSI GAMBAR */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[620px] rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            {/* Header Modal */}
            <div className="p-8 flex justify-between items-center border-b border-gray-50">
              <h3 className="text-xl font-bold text-[#334155]">Tambah Produk Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 text-3xl font-light hover:text-gray-600 transition-colors">×</button>
            </div>

            <form onSubmit={handleAddProduct} className="p-10 space-y-6">
              {/* Nama Produk */}
              <div>
                <label className="block text-[#334155] text-sm font-semibold mb-2">Nama Produk *</label>
                <input 
                  type="text" 
                  placeholder="KARINA LILY PINK" 
                  className="w-full px-6 py-4 bg-[#f7f3f0] border-none rounded-2xl outline-none text-sm placeholder:text-gray-400" 
                  onChange={(e) => setFormData({...formData, nama: e.target.value})} 
                />
              </div>

              {/* Harga & Kategori */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#334155] text-sm font-semibold mb-2">Harga *</label>
                  <input 
                    type="number" 
                    placeholder="105" 
                    className="w-full px-6 py-4 bg-[#f7f3f0] border-none rounded-2xl outline-none text-sm placeholder:text-gray-400" 
                    onChange={(e) => setFormData({...formData, harga: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-[#334155] text-sm font-semibold mb-2">Kategori</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 bg-[#f7f3f0] border-none rounded-2xl outline-none text-sm" 
                    onChange={(e) => setFormData({...formData, kategori: e.target.value})} 
                  />
                </div>
              </div>

              {/* URL Gambar */}
              <div>
                <label className="block text-[#334155] text-sm font-semibold mb-2">URL Gambar</label>
                <input 
                  type="text" 
                  placeholder="https://gambarbungakarinalilypink" 
                  className="w-full px-6 py-4 bg-[#f7f3f0] border-none rounded-2xl outline-none text-sm placeholder:text-gray-400" 
                  onChange={(e) => setFormData({...formData, image: e.target.value})} 
                />
              </div>

              {/* Komposisi (Textarea) */}
              <div>
                <label className="block text-[#334155] text-sm font-semibold mb-2">Komposisi</label>
                <textarea 
                  rows="4" 
                  placeholder="Rose, Lily, Baby Breath" 
                  className="w-full px-6 py-4 bg-[#f7f3f0] border-none rounded-2xl outline-none text-sm resize-none placeholder:text-gray-400"
                  onChange={(e) => setFormData({...formData, komposisi: e.target.value})}
                ></textarea>
              </div>

              {/* Checkbox Produk Tersedia */}
              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="tersedia" 
                  checked={formData.tersedia} 
                  className="w-6 h-6 rounded-lg border-2 border-[#334155] accent-[#334155] cursor-pointer" 
                  onChange={(e) => setFormData({...formData, tersedia: e.target.checked})} 
                />
                <label htmlFor="tersedia" className="text-[#334155] text-sm font-bold cursor-pointer">Produk Tersedia</label>
              </div>

              {/* Tombol Batal & Tambah Produk */}
              <div className="flex gap-5 pt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 py-5 bg-[#f7f3f0] text-[#334155] font-bold rounded-[1.5rem] text-sm transition-colors hover:bg-[#efe9e4]"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-5 bg-[#334155] text-white font-bold rounded-[1.5rem] text-sm shadow-lg transition-colors hover:bg-[#242f3d]"
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
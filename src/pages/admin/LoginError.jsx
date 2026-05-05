import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginError = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi login agar bisa masuk ke dashboard jika data sesuai
    if (email === 'admin@floristation.id' && password === 'Fl0r1st@tion_id') {
      navigate('/admin/dashboard');
    } else {
      // Tetap di halaman error jika input salah
      console.log("Login masih gagal: Kredensial tidak cocok");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2d3d] flex flex-col items-center justify-center p-4 font-sans text-[#334155]">
      {/* Header Logo */}
      <div className="text-center mb-8">
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden border-2 border-white">
          <img 
            src="/images/floristation.png" 
            alt="Logo Floristation" 
            className="w-16 h-16 object-contain" 
          />
        </div>
        <h1 className="text-white text-3xl font-serif italic tracking-wide">Floristation.id</h1>
        <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">Admin Panel</p>
      </div>

      {/* Card Login */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 w-full max-w-[440px]">
        <h2 className="text-[#334155] text-2xl font-bold text-center mb-8">Login Admin</h2>
        
        {/* Notifikasi Error (Tetap Tampil karena ini page LoginError) */}
        <div className="bg-[#fff1f1] border border-[#ffcccc] rounded-2xl p-4 mb-8 flex items-start gap-3">
          <div className="bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold mt-0.5">
            !
          </div>
          <div>
            <p className="text-red-700 text-sm font-bold">Login Gagal</p>
            <p className="text-red-600 text-xs">Email atau password salah. Silakan coba lagi.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Email */}
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
              className="w-full px-6 py-4 bg-[#f7f3f0] border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#334155] transition-all placeholder:text-gray-400"
              required
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-6 py-4 bg-[#f7f3f0] border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#334155] transition-all placeholder:text-gray-400"
              required
            />
          </div>

          {/* Tombol Login */}
          <button 
            type="submit"
            className="w-full bg-[#334155] hover:bg-[#242f3d] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </button>
        </form>

        {/* Demo Credentials Section */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-[10px] mb-3 uppercase tracking-widest font-bold">Demo Credentials:</p>
          <div className="bg-[#ece3d5] rounded-2xl p-4 w-full mb-6">
            <p className="text-[#334155] text-sm">Email: <span className="font-bold">admin@floristation.id</span></p>
            <p className="text-[#334155] text-sm">Password: <span className="font-bold">Fl0r1st@tion_id</span></p>
          </div>

          {/* Tautan Kembali */}
          <button 
            type="button"
            onClick={() => navigate('/admin')}
            className="text-gray-400 text-sm hover:text-[#334155] flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            ← Kembali ke Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginError;
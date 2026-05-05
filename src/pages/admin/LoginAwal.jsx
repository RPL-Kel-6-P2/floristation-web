import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAwal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi menggunakan password baru agar tidak terkena peringatan Chrome
    if (email === 'admin@floristation.id' && password === 'Fl0r1st@tion_id') {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/login-error');
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2d3d] flex flex-col items-center justify-center p-4 font-sans">
      {/* Bagian Logo dan Header */}
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
        <h2 className="text-[#334155] text-2xl font-bold text-center mb-10">Login Admin</h2>
        
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Input Email */}
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
              className="w-full px-6 py-4 bg-[#f7f3f0] border-none rounded-2xl text-gray-700 outline-none focus:ring-2 focus:ring-[#334155] transition-all placeholder:text-gray-400"
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
              className="w-full px-6 py-4 bg-[#f7f3f0] border-none rounded-2xl text-gray-700 outline-none focus:ring-2 focus:ring-[#334155] transition-all placeholder:text-gray-400"
              required
            />
          </div>

          {/* Tombol Login */}
          <button 
            type="submit"
            className="w-full bg-[#334155] hover:bg-[#242f3d] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-4 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </button>
        </form>

        {/* Info Demo Credentials */}
        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-[10px] mb-4 uppercase tracking-widest font-bold">Demo Credentials:</p>
          <div className="bg-[#ece3d5] rounded-2xl p-5 w-full">
            <p className="text-[#334155] text-sm">Email: <span className="font-bold">admin@floristation.id</span></p>
            <p className="text-[#334155] text-sm">Password: <span className="font-bold">Fl0r1st@tion_id</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAwal;
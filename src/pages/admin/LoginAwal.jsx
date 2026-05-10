import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin, onAuthChange } from "../../firebase/authService";

const LoginAwal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Efek untuk cek status auth
  useEffect(() => {
    const unsub = onAuthChange((user) => {
      if (user) {
        navigate("/admin/dashboard");
      }
    });
    return () => unsub();
  }, [navigate]);

  // Fungsi Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginAdmin(email, password);
    } catch (err) {
      setError("Login gagal. Periksa kembali email dan password Anda.");
      setLoading(false);
    }
  };

  return (
    // h-screen dan overflow-hidden agar pas satu layar tanpa scroll
    <div className="h-screen bg-[#233446] flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      
      {/* SECTION LOGO & TITLE */}
      <div className="text-center mb-6">
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-xl overflow-hidden p-2">
          <img
            src="/images/floristation.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        <h1 className="text-white text-3xl font-serif italic tracking-wide mb-1">
          Floristation.id
        </h1>
        <p className="text-gray-400 text-[11px] uppercase tracking-[0.4em] font-medium">
          Admin Panel
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="bg-white rounded-[2rem] shadow-2xl p-12 w-full max-w-[480px]">
        <h2 className="text-[#4b5563] text-2xl font-bold text-center mb-8">
          Login Admin
        </h2>

        {/* Notifikasi Error */}
        {error && (
          <div className="bg-red-50 text-red-600 text-[11px] font-bold p-3 rounded-xl mb-4 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label className="block text-gray-500 text-sm font-semibold mb-2 ml-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@floristation.id"
              className="w-full px-5 py-4 bg-[#f4f0ec] rounded-xl outline-none text-gray-700 placeholder:text-gray-400 border border-transparent focus:border-gray-200 transition-all"
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-gray-500 text-sm font-semibold mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••"
              className="w-full px-5 py-4 bg-[#f4f0ec] rounded-xl outline-none text-gray-700 placeholder:text-gray-400 border border-transparent focus:border-gray-200 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#34445c] hover:bg-[#2a3a4f] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-md mt-2"
          >
            {loading ? "Memproses..." : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        {/* DEMO CREDENTIALS BOX */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-[11px] mb-3 uppercase tracking-widest font-bold">
            Demo Credentials:
          </p>
          <div className="bg-[#e5ddd2] p-4 rounded-2xl border border-[#d6ccbf]">
            <p className="text-[#5c524f] text-sm leading-relaxed">
              Email: <span className="font-bold">admin@floristation.id</span><br />
              Password: <span className="font-bold">Fl0r1st@tion_id</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginAwal;
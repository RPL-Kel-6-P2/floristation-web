import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin, onAuthChange } from "../../firebase/authService";

const LoginAwal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsub = onAuthChange((user) => {
      if (user) {
        navigate("/admin/dashboard");
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginAdmin(email, password);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2d3d] flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center mb-8">
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden">
          <img
            src="/images/floristation.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        <h1 className="text-white text-3xl font-serif italic tracking-wide">
          Floristation.id
        </h1>
        <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">
          Admin Panel
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 w-full max-w-[440px]">
        <h2 className="text-[#334155] text-2xl font-bold text-center mb-8">
          Login Admin
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <div className="bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold">
              !
            </div>
            <div>
              <p className="text-red-700 text-sm font-bold">Login Gagal</p>
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
              className="w-full px-6 py-4 bg-[#f7f3f0] rounded-2xl outline-none focus:ring-2 focus:ring-[#334155] transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-6 py-4 bg-[#f7f3f0] rounded-2xl outline-none focus:ring-2 focus:ring-[#334155] transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#334155] hover:bg-[#242f3d] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-md disabled:opacity-60"
          >
            {loading ? "Memverifikasi..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAwal;

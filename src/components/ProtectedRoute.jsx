import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthChange } from "../firebase/authService";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange((user) => {
      if (!user) navigate("/admin");
      setChecking(false);
    });
    return () => unsub();
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#1e2d3d] flex items-center justify-center">
        <p className="text-white text-sm animate-pulse">
          Memverifikasi akses...
        </p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;

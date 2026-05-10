import { Routes, Route, Outlet, useNavigate, useLocation } from "react-router-dom";

// =======================
// PAGES USER
// =======================
import Katalog from "./pages/Katalog";
import Draft from "./pages/Draft";
import Info from "./pages/Info"; // ⚠️ huruf besar ya

// DETAIL PRODUK
import ProductDetailAsteria from "./pages/ProductDetailAsteria";
import ProductDetailRafaela from "./pages/ProductDetailRafaela";
import ProductDetailGarbe5Stem from "./pages/ProductDetailGarbe5Stem";
import ProductDetailAriana from "./pages/ProductDetailAriana";
import ProductDetailSunySideUp from "./pages/ProductDetailSunySideUp";
import ProductDetailGracePink from "./pages/ProductDetailGracePink";
import ProductDetailKarinaLilyRed from "./pages/ProductDetailKarinaLilyRed";
import ProductDetailGraceRedWhite from "./pages/ProductDetailGraceRedWhite";
import ProductDetailFreya from "./pages/ProductDetailFreya";
import ProductDetailBrenda from "./pages/ProductDetailBrenda";
import ProductDetailSnack1 from "./pages/ProductDetailSnack1";
import ProductDetailSnack2 from "./pages/ProductDetailSnack2";
import ProductDetailSnack3 from "./pages/ProductDetailSnack3";
import ProductDetailIvanaRed from "./pages/ProductDetailIvanaRed";
import ProductDetailClaraPurple from "./pages/ProductDetailClaraPurple";
import ProductDetailValenciaBlue from "./pages/ProductDetailValenciaBlue";
import ProductDetailBbaGodivaBlue from "./pages/ProductDetailBbaGodivaBlue";
import ProductDetailBbaGodivaRed from "./pages/ProductDetailBbaGodivaRed";
import ProductDetailBbaLiro from "./pages/ProductDetailBbaLiro";

// =======================
// ORDER
// =======================
import OrderForm from "./pages/OrderForm";
import Invoice from "./pages/Invoice";

// =======================
// ADMIN
// =======================
import LoginAwal from "./pages/admin/LoginAwal";
import LoginError from "./pages/admin/LoginError";
import Dashboard from "./pages/admin/Dashboard";
import KelolaProduk from "./pages/admin/KelolaProduk";
import KelolaPesanan from "./pages/admin/KelolaPesanan";
import Rekap from "./pages/admin/Rekap";
import FilterPesananDiproses from "./pages/admin/FilterPesananDiproses";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#e8edf3] flex justify-center items-start py-6">
      <div className="relative h-screen max-h-[932px] w-[430px] max-w-full overflow-hidden rounded-[38px] bg-[#f6f1eb] shadow-[0_18px_45px_rgba(39,55,77,0.22)]">
        <div className="hide-scrollbar h-full overflow-y-auto pb-[100px]">
          <Outlet />
        </div>

        <nav className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#e8e0d8] bg-white px-8 py-3 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`flex flex-col items-center justify-center rounded-[14px] px-4 py-2 ${location.pathname === "/" ? "bg-[#f7f1eb] text-[#c45f32]" : "text-[#7b7b7b]"}`}
            >
              <span className="text-[18px] leading-none">🏠</span>
              <span className="mt-1 text-[10px] font-semibold">Beranda</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/draft")}
              className={`flex flex-col items-center justify-center rounded-[14px] px-4 py-2 ${location.pathname === "/draft" ? "bg-[#f7f1eb] text-[#c45f32]" : "text-[#7b7f9d]"}`}
            >
              <span className="text-[18px] leading-none">📋</span>
              <span className="mt-1 text-[10px] font-medium">Draft</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/info")}
              className={`flex flex-col items-center justify-center rounded-[14px] px-4 py-2 ${location.pathname === "/info" ? "bg-[#f7f1eb] text-[#c45f32]" : "text-[#7b7f9d]"}`}
            >
              <span className="text-[18px] leading-none">ℹ️</span>
              <span className="mt-1 text-[10px] font-medium">Info</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Katalog />} />
        <Route path="/draft" element={<Draft />} />
        <Route path="/info" element={<Info />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/invoice" element={<Invoice />} />
      </Route>

      {/* ================= DETAIL PRODUK ================= */}
      <Route path="/detail-asteria" element={<ProductDetailAsteria />} />
      <Route path="/detail-rafaela" element={<ProductDetailRafaela />} />
      <Route path="/detail-garbe-5-stem" element={<ProductDetailGarbe5Stem />} />
      <Route path="/detail-ariana" element={<ProductDetailAriana />} />
      <Route path="/detail-sunny-side-up" element={<ProductDetailSunySideUp />} />
      <Route path="/detail-grace-pink" element={<ProductDetailGracePink />} />
      <Route path="/detail-karina-lily-red" element={<ProductDetailKarinaLilyRed />} />
      <Route path="/detail-grace-red-white" element={<ProductDetailGraceRedWhite />} />
      <Route path="/detail-freya-xl" element={<ProductDetailFreya />} />
      <Route path="/detail-brenda-l" element={<ProductDetailBrenda />} />
      <Route path="/detail-snack-bouquet-1" element={<ProductDetailSnack1 />} />
      <Route path="/detail-snack-bouquet-2" element={<ProductDetailSnack2 />} />
      <Route path="/detail-snack-bouquet-3" element={<ProductDetailSnack3 />} />
      <Route path="/detail-ivana-red" element={<ProductDetailIvanaRed />} />
      <Route path="/detail-clara-purple" element={<ProductDetailClaraPurple />} />
      <Route path="/detail-valencia-blue" element={<ProductDetailValenciaBlue />} />
      <Route path="/detail-bba-godiva-blue" element={<ProductDetailBbaGodivaBlue />} />
      <Route path="/detail-bba-godiva-red" element={<ProductDetailBbaGodivaRed />} />
      <Route path="/detail-bba-liro" element={<ProductDetailBbaLiro />} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<LoginAwal />} />
      <Route path="/admin/login-error" element={<LoginError />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/kelola-produk" element={<KelolaProduk />} />
      <Route path="/admin/kelola-pesanan" element={<KelolaPesanan />} />
      <Route path="/admin/rekap" element={<Rekap />} />
      <Route path="/admin/filter-pesanan-diproses" element={<FilterPesananDiproses />} />

    </Routes>
  );
}

export default App;
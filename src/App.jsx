import { Routes, Route } from "react-router-dom";

// Pages Pelanggan
import Katalog from "./pages/Katalog";
import ProductDetailAsteria from "./pages/ProductDetailAsteria"; 
import ProductDetailRafaela from "./pages/ProductDetailRafaela";
import ProductDetailGarbe5Stem from "./pages/ProductDetailGarbe5Stem";
import ProductDetailAriana from "./pages/ProductDetailAriana";
import ProductDetailSunySideUp from "./pages/ProductDetailSunySideUp";
import ProductDetailGracePink from "./pages/ProductDetailGracePink"
import ProductDetailKarinaLilyRed from "../public/images/ProductDetailKarinaLilyRed";
import ProductDetailGraceRedWhite from "./pages/ProductDetailGraceRedWhite";

// Pages Order & Invoice
import OrderForm from "./pages/OrderForm";

// Pages Admin
import LoginAwal from "./pages/admin/LoginAwal";
import LoginError from "./pages/admin/LoginError";
import Dashboard from "./pages/admin/Dashboard";
import KelolaProduk from "./pages/admin/KelolaProduk";
import KelolaPesanan from "./pages/admin/KelolaPesanan"; 
import Rekap from "./pages/admin/Rekap"; 

// Filter Pages Admin
import FilterPesananDiproses from "./pages/admin/FilterPesananDiproses"; 

function App() {
  return (
    <Routes>
      {/* Sisi Pelanggan & Katalog Utama */}
      <Route path="/" element={<Katalog />} />
      
      {/* Rute Detail Produk Mobile */}
      <Route path="/detail-asteria" element={<ProductDetailAsteria />} /> 
      <Route path="/detail-rafaela" element={<ProductDetailRafaela />} />
      <Route path="/detail-garbe-5-stem" element={<ProductDetailGarbe5Stem />} />
      <Route path="/detail-ariana" element={<ProductDetailAriana />} />
      <Route path="/detail-sunny-side-up" element={<ProductDetailSunySideUp />} />
      <Route path="/detail-grace-pink" element={<ProductDetailGracePink />} />
      <Route path="/detail-karina-lily-red" element={<ProductDetailKarinaLilyRed />} />
      <Route path="/detail-grace-red-white" element={<ProductDetailGraceRedWhite />} />





      {/* Sisi Order & Pembayaran */}
      <Route path="/order" element={<OrderForm />} />

      {/* Sisi Admin Panel */}
      <Route path="/admin" element={<LoginAwal />} />
      <Route path="/admin/login-error" element={<LoginError />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/kelola-produk" element={<KelolaProduk />} />
      <Route path="/admin/kelola-pesanan" element={<KelolaPesanan />} />
      <Route path="/admin/rekap" element={<Rekap />} /> 
      
      {/* Rute Filter Pesanan */}
      <Route path="/admin/filter-pesanan-diproses" element={<FilterPesananDiproses />} />
    </Routes>
  );
}

export default App;
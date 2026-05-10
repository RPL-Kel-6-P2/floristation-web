import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

// Pages Pelanggan
import Katalog from "./pages/Katalog";
import Draft from "./pages/Draft";
import Info from "./pages/info";
import ProductDetailAsteria from "./pages/ProductDetailAsteria"; 
import ProductDetailRafaela from "./pages/ProductDetailRafaela";
import ProductDetailGarbe5Stem from "./pages/ProductDetailGarbe5Stem";
import ProductDetailAriana from "./pages/ProductDetailAriana";
import ProductDetailSunySideUp from "./pages/ProductDetailSunySideUp";
import ProductDetailGracePink from "./pages/ProductDetailGracePink"
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
      <Route element={<MainLayout />}>
        <Route path="/" element={<Katalog />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/draft" element={<Draft />} />
        <Route path="/info" element={<Info />} />
        </Route>

      {/* Rute Detail Produk Mobile */}
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


      {/* Sisi Admin Panel */}
      <Route path="/admin" element={<LoginAwal />} />
      <Route path="/admin/login-error" element={<LoginError />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/kelola-produk" element={<ProtectedRoute><KelolaProduk /></ProtectedRoute>} />
      <Route path="/admin/kelola-pesanan" element={<ProtectedRoute><KelolaPesanan /></ProtectedRoute>} />
      <Route path="/admin/rekap" element={<ProtectedRoute><Rekap /></ProtectedRoute>} /> 
            
      {/* Rute Filter Pesanan */}
      <Route path="/admin/filter-pesanan-diproses" element={<ProtectedRoute><FilterPesananDiproses /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

// --- USER PAGES ---
import Katalog from "./pages/Katalog";
import Draft from "./pages/Draft";
import Info from "./pages/info";
import OrderForm from "./pages/OrderForm";
import Invoice from "./pages/Invoice";

// --- DETAIL PRODUK ---
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

// --- ADMIN PAGES ---
// Pastikan nama file di folder adalah LoginAwal.jsx (L dan A huruf kapital)
import LoginAwal from "./pages/admin/LoginAwal"; 
import LoginError from "./pages/admin/LoginError";
import Dashboard from "./pages/admin/Dashboard";
import KelolaProduk from "./pages/admin/KelolaProduk";
import KelolaPesanan from "./pages/admin/KelolaPesanan";
import Rekap from "./pages/admin/Rekap";

function App() {
  return (
    <Routes>
      {/* 🟢 CUSTOMER SECTION — Menggunakan MainLayout (Navbar & Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Katalog />} />
        <Route path="/draft" element={<Draft />} />
        <Route path="/info" element={<Info />} />
        <Route path="/order" element={<OrderForm />} />
      </Route>

      {/* 🟢 INVOICE — Tanpa Layout */}
      <Route path="/invoice" element={<Invoice />} />
      
      {/* 🟢 DETAIL PRODUK — Jalur Cepat ke Masing-masing Bunga */}
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

      {/* 🔴 ADMIN SECTION */}
      {/* Halaman Login (Bisa diakses tanpa login) */}
      <Route path="/admin" element={<LoginAwal />} />
      <Route path="/admin/login-error" element={<LoginError />} />
      
      {/* Halaman yang diproteksi (Harus Login Firebase dulu) */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/kelola-produk"
        element={
          <ProtectedRoute>
            <KelolaProduk />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/kelola-pesanan"
        element={
          <ProtectedRoute>
            <KelolaPesanan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/rekap"
        element={
          <ProtectedRoute>
            <Rekap />
          </ProtectedRoute>
        }
      />

      {/* 🔄 REDIRECT OTOMATIS */}
      {/* Jika user mengakses URL yang tidak ada, balikkan ke Katalog utama */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
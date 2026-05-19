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

import ProductDetail from "./pages/ProductDetail";

// --- ADMIN PAGES ---
import LoginAwal from "./pages/admin/LoginAwal";
import LoginError from "./pages/admin/LoginError";
import Dashboard from "./pages/admin/Dashboard";
import KelolaProduk from "./pages/admin/KelolaProduk";
import KelolaPesanan from "./pages/admin/KelolaPesanan";
import Rekap from "./pages/admin/Rekap";

function App() {
  return (
    <Routes>
      {/*  CUSTOMER SECTION — Menggunakan MainLayout (Navbar & Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Katalog />} />
        <Route path="/draft" element={<Draft />} />
        <Route path="/info" element={<Info />} />
        <Route path="/order" element={<OrderForm />} />
      </Route>

      {/* INVOICE — Tanpa Layout */}
      <Route path="/invoice" element={<Invoice />} />

      {/* DETAIL PRODUK DINAMIS — Satu route untuk semua produk dari Firestore */}
      {/* Route: /produk/:id  →  id = Firestore document ID */}
      <Route path="/produk/:id" element={<ProductDetail />} />

      {/* ADMIN SECTION */}
      <Route path="/admin" element={<LoginAwal />} />
      <Route path="/admin/login-error" element={<LoginError />} />

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

      {/* REDIRECT OTOMATIS */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

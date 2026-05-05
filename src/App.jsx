import { Routes, Route } from "react-router-dom";

// Pages Pelanggan
import Katalog from "./pages/Katalog";
import KatalogDetailArtificial from "./pages/KatalogDetailArtificial"; 
import ProductDetailAsteria from "./pages/ProductDetailAsteria"; 
import ProductDetailCeline from "./pages/ProductDetailCeline";
import ProductDetailSnack from "./pages/ProductDetailSnack";
import ProductDetailOrela from "./pages/ProductDetailOrela";

// Pages Order & Invoice
import OrderForm from "./pages/OrderForm";
import OrderFormBca from "./pages/OrderFormBca";
import InvoiceBcaGosend from "./pages/InvoiceBcaGosend";
import InvoiceQrisAmbil from "./pages/InvoiceQrisAmbil";

// Pages Admin
import LoginAwal from "./pages/admin/LoginAwal";
import LoginError from "./pages/admin/LoginError";
import Dashboard from "./pages/admin/Dashboard";
import KelolaProduk from "./pages/admin/KelolaProduk";
import KelolaPesanan from "./pages/admin/KelolaPesanan"; // Modal Detail ada di dalam sini
import Rekap from "./pages/admin/Rekap"; 

// Filter Pages Admin
import FilterPesananDiproses from "./pages/admin/FilterPesananDiproses"; 

function App() {
  return (
    <Routes>
      {/* Sisi Pelanggan & Katalog Utama */}
      <Route path="/" element={<Katalog />} />
      <Route path="/katalog-detail-artificial" element={<KatalogDetailArtificial />} />
      
      {/* Rute Detail Produk Mobile */}
      <Route path="/detail-asteria" element={<ProductDetailAsteria />} /> 
      <Route path="/detail-celine" element={<ProductDetailCeline />} />
      <Route path="/detail-snack" element={<ProductDetailSnack />} />
      <Route path="/detail-orela" element={<ProductDetailOrela />} />

      {/* Sisi Order & Pembayaran */}
      <Route path="/order" element={<OrderForm />} />
      <Route path="/order-bca" element={<OrderFormBca />} />
      <Route path="/invoice-bca-gosend" element={<InvoiceBcaGosend />} />
      <Route path="/invoice-qris-ambil" element={<InvoiceQrisAmbil />} />

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
import { Routes, Route } from "react-router-dom";

import Katalog from "./pages/Katalog";
import KatalogDetail from "./pages/KatalogDetail";

import ProductDetailCeline from "./pages/ProductDetailCeline";
import ProductDetailSnack from "./pages/ProductDetailSnack";
import ProductDetailOrela from "./pages/ProductDetailOrela";

import OrderForm from "./pages/OrderForm";
import OrderFormBca from "./pages/OrderFormBca";
import OrderFormBcaError from "./pages/OrderFormBcaError";
import OrderFormError from "./pages/OrderFormError";
import OrderFormGosend from "./pages/OrderFormGosend";
import OrderFormGosendBag from "./pages/OrderFormGosendBag";
import OrderFormGosendBca from "./pages/OrderFormGosendBca";
import OrderFormGosendError from "./pages/OrderFormGosendError";

import InvoiceBcaGosend from "./pages/InvoiceBcaGosend";
import InvoiceQrisAmbil from "./pages/InvoiceQrisAmbil";
import InvoiceQrisGosendBag from "./pages/InvoiceQrisGosendBag";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Katalog />} />
      <Route path="/katalog-detail" element={<KatalogDetail />} />

      <Route path="/detail-celine" element={<ProductDetailCeline />} />
      <Route path="/detail-snack" element={<ProductDetailSnack />} />
      <Route path="/detail-orela" element={<ProductDetailOrela />} />

      <Route path="/order" element={<OrderForm />} />
      <Route path="/order-bca" element={<OrderFormBca />} />
      <Route path="/order-bca-error" element={<OrderFormBcaError />} />
      <Route path="/order-error" element={<OrderFormError />} />
      <Route path="/order-gosend" element={<OrderFormGosend />} />
      <Route path="/order-gosend-bag" element={<OrderFormGosendBag />} />
      <Route path="/order-gosend-bca" element={<OrderFormGosendBca />} />
      <Route path="/order-gosend-error" element={<OrderFormGosendError />} />

      <Route path="/invoice-bca-gosend" element={<InvoiceBcaGosend />} />
      <Route path="/invoice-qris-ambil" element={<InvoiceQrisAmbil />} />
      <Route path="/invoice-qris-gosend-bag" element={<InvoiceQrisGosendBag />} />

      <Route path="*" element={<Katalog />} />
    </Routes>
  );
}

export default App;
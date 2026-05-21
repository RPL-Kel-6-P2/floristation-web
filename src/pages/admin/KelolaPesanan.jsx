import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  listenOrders,
  updateOrderStatus,
  updateOrderFull,
  deleteOrder,
} from "../../firebase/orderService";
import { logoutAdmin } from "../../firebase/authService";

const STATUS_OPTIONS = [
  {
    value: "Pending",
    label: "Pending",
    dot: "bg-[#fab005]",
    color: "bg-[#fff9db] text-[#fab005]",
  },
  {
    value: "Konfirmasi",
    label: "Konfirmasi",
    dot: "bg-[#228be6]",
    color: "bg-[#e7f5ff] text-[#228be6]",
  },
  {
    value: "Diproses",
    label: "Diproses",
    dot: "bg-[#7950f2]",
    color: "bg-[#f3f0ff] text-[#7950f2]",
  },
  {
    value: "Selesai",
    label: "Selesai",
    dot: "bg-[#40c057]",
    color: "bg-[#ebfbee] text-[#40c057]",
  },
];

const KATEGORI_OPTIONS = [
  "Fresh Flowers",
  "Artificial Flowers",
  "Snack Bouquet",
  "Graduation Bouquet",
  "Bloom Box Arrangement",
];

const SIZE_OPTIONS = ["Tidak Ada", "XS", "S", "M", "L", "XL"];

function getStyle(status) {
  return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
}

function formatRupiah(n) {
  return "Rp" + Number(n || 0).toLocaleString("id-ID");
}

function stripRpToDigits(str) {
  return String(str || "").replace(/\D/g, "");
}

function formatDigitsWithDots(digits) {
  if (!digits) return "";
  return Number(digits).toLocaleString("id-ID");
}

function digitsToRpString(digits) {
  if (!digits) return "";
  return "Rp" + Number(digits).toLocaleString("id-ID");
}

const UNDO_DURATION = 5000;

const emptyEditForm = {
  namaPemesan: "",
  noPemesan: "",
  namaPenerima: "",
  noTeleponPenerima: "",
  tanggal: "",
  jam: "",
  metodePengambilan: "ambil",
  metodePembayaran: "qris",
  goodieBag: false,
  greetingCard: "",
  status: "Pending",
  produk: { name: "", price: "", image: "", kategori: "", size: null },
};

export default function KelolaPesanan() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [metodeFilter, setMetodeFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [detailOrder, setDetailOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [notif, setNotif] = useState({ msg: "", type: "success" });

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [undoDeleteCountdown, setUndoDeleteCountdown] = useState(0);
  const undoDeleteIntervalRef = useRef(null);

  const [pendingUpdate, setPendingUpdate] = useState(null);
  const [undoUpdateCountdown, setUndoUpdateCountdown] = useState(0);
  const undoUpdateIntervalRef = useRef(null);

  useEffect(() => {
    const unsub = listenOrders((data) => {
      setOrders(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    return () => {
      if (undoDeleteIntervalRef.current)
        clearInterval(undoDeleteIntervalRef.current);
      if (undoUpdateIntervalRef.current)
        clearInterval(undoUpdateIntervalRef.current);
    };
  }, []);

  const showNotif = (msg, type = "success") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif({ msg: "", type: "success" }), 4000);
  };

  function startCountdown(setCountdown, intervalRef) {
    setCountdown(Math.ceil(UNDO_DURATION / 1000));
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function clearCountdown(setCountdown, intervalRef) {
    clearInterval(intervalRef.current);
    setCountdown(0);
  }

  const filtered = orders.filter((o) => {
    const matchStatus = !statusFilter || o.status === statusFilter;
    const matchMetode = !metodeFilter || o.metodePengambilan === metodeFilter;
    const matchSearch =
      !searchFilter ||
      (o.namaPemesan || "")
        .toLowerCase()
        .includes(searchFilter.toLowerCase()) ||
      (o.order_id || "").toLowerCase().includes(searchFilter.toLowerCase());
    return matchStatus && matchMetode && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentItems = filtered.slice((page - 1) * perPage, page * perPage);

  const openEdit = (order) => {
    setEditOrder(order);
    const priceDigits = stripRpToDigits(order.produk?.price || "");
    setEditForm({
      namaPemesan: order.namaPemesan || "",
      noPemesan: order.noPemesan || "",
      namaPenerima: order.namaPenerima || "",
      noTeleponPenerima: order.noTeleponPenerima || "",
      tanggal: order.tanggal || "",
      jam: order.jam || "",
      metodePengambilan: order.metodePengambilan || "ambil",
      metodePembayaran: order.metodePembayaran || "qris",
      goodieBag: order.goodieBag || false,
      greetingCard: order.greetingCard || "",
      status: order.status || "Pending",
      produk: {
        name: order.produk?.name || "",
        price: priceDigits,
        image: order.produk?.image || "",
        kategori: order.produk?.kategori || "",
        size: order.produk?.size || null,
      },
    });
  };

  function validateEditForm(form, inputDate) {
    const regexHuruf = /^[a-zA-Z\s]+$/;
    const regexAngka = /^[0-9]+$/;

    if (!form.tanggal) return "Tanggal wajib diisi";
    if (!form.jam) return "Jam wajib diisi";
    if (!form.namaPemesan) return "Nama wajib diisi";
    if (!form.noPemesan) return "WhatsApp wajib diisi";
    if (!form.namaPenerima) return "Nama penerima wajib diisi";
    if (!form.noTeleponPenerima) return "Telepon penerima wajib diisi";

    if (form.namaPemesan.length < 3 || !regexHuruf.test(form.namaPemesan))
      return "Nama pemesan minimal 3 huruf dan tanpa angka/simbol";
    if (form.namaPenerima.length < 3 || !regexHuruf.test(form.namaPenerima))
      return "Nama penerima minimal 3 huruf dan tanpa angka/simbol";
    if (
      !regexAngka.test(form.noPemesan) ||
      form.noPemesan.length < 10 ||
      form.noPemesan.length > 13
    )
      return "Nomor WA harus 10-13 digit angka";
    if (
      !regexAngka.test(form.noTeleponPenerima) ||
      form.noTeleponPenerima.length < 10 ||
      form.noTeleponPenerima.length > 13
    )
      return "Nomor telepon harus 10-13 digit angka";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 7);
    if (inputDate < today) return "Tanggal tidak boleh di masa lalu";
    if (inputDate > maxDate) return "Pemesanan maksimal 7 hari ke depan";

    const jamAngka = parseFloat(form.jam.replace(":", "."));
    const isWeekend = inputDate.getDay() === 0 || inputDate.getDay() === 6;
    if (isWeekend && (jamAngka < 10 || jamAngka > 21))
      return "Weekend hanya 10:00 - 21:00";
    if (!isWeekend && (jamAngka < 9 || jamAngka > 20))
      return "Weekday hanya 09:00 - 20:00";

    return null;
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const inputDate = new Date(editForm.tanggal);
    inputDate.setHours(0, 0, 0, 0);

    const errMsg = validateEditForm(editForm, inputDate);
    if (errMsg) {
      alert(errMsg);
      return;
    }

    setSaving(true);

    const prevOrder = editOrder;

    const priceForDB = digitsToRpString(editForm.produk.price);
    const formToSave = {
      ...editForm,
      produk: {
        ...editForm.produk,
        price: priceForDB,
        size:
          editForm.produk.size === "Tidak Ada" ? null : editForm.produk.size,
      },
    };

    try {
      await updateOrderFull(editOrder.id, formToSave);
      setEditOrder(null);

      if (pendingUpdate) {
        clearTimeout(pendingUpdate.timeoutId);
        clearCountdown(setUndoUpdateCountdown, undoUpdateIntervalRef);
        showNotif(`Pesanan "${pendingUpdate.orderId}" berhasil diperbarui ✓`);
      }

      startCountdown(setUndoUpdateCountdown, undoUpdateIntervalRef);

      const timeoutId = setTimeout(() => {
        clearCountdown(setUndoUpdateCountdown, undoUpdateIntervalRef);
        setPendingUpdate(null);
        showNotif(`Pesanan "${prevOrder.order_id}" berhasil diperbarui ✓`);
      }, UNDO_DURATION);

      setPendingUpdate({
        id: prevOrder.id,
        orderId: prevOrder.order_id,
        prevData: prevOrder,
        timeoutId,
      });
    } catch (err) {
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUndoUpdate = async () => {
    if (!pendingUpdate) return;
    clearTimeout(pendingUpdate.timeoutId);
    clearCountdown(setUndoUpdateCountdown, undoUpdateIntervalRef);
    const { id, orderId, prevData } = pendingUpdate;
    setPendingUpdate(null);
    try {
      await updateOrderFull(id, {
        namaPemesan: prevData.namaPemesan,
        noPemesan: prevData.noPemesan,
        namaPenerima: prevData.namaPenerima,
        noTeleponPenerima: prevData.noTeleponPenerima,
        tanggal: prevData.tanggal,
        jam: prevData.jam,
        metodePengambilan: prevData.metodePengambilan,
        metodePembayaran: prevData.metodePembayaran,
        goodieBag: prevData.goodieBag,
        greetingCard: prevData.greetingCard || "",
        status: prevData.status,
        produk: {
          name: prevData.produk?.name || "",
          price: prevData.produk?.price || "",
          image: prevData.produk?.image || "",
          kategori: prevData.produk?.kategori || "",
          size: prevData.produk?.size || null,
        },
      });
      showNotif(`Perubahan pesanan "${orderId}" dibatalkan`);
    } catch (err) {
      showNotif("Gagal membatalkan: " + err.message, "error");
    }
  };

  const handleDelete = (order) => {
    setConfirmDelete({ id: order.id, orderId: order.order_id });
  };

  const handleConfirmDelete = () => {
    const p = confirmDelete;
    setConfirmDelete(null);

    if (pendingDelete) {
      clearTimeout(pendingDelete.timeoutId);
      clearCountdown(setUndoDeleteCountdown, undoDeleteIntervalRef);
      deleteOrder(pendingDelete.id).catch((err) =>
        showNotif("Gagal hapus: " + err.message, "error"),
      );
    }

    startCountdown(setUndoDeleteCountdown, undoDeleteIntervalRef);

    const timeoutId = setTimeout(async () => {
      clearCountdown(setUndoDeleteCountdown, undoDeleteIntervalRef);
      setPendingDelete(null);
      try {
        await deleteOrder(p.id);
        showNotif(`Pesanan "${p.orderId}" berhasil dihapus`);
      } catch (err) {
        showNotif("Gagal hapus: " + err.message, "error");
      }
    }, UNDO_DURATION);

    setPendingDelete({ id: p.id, orderId: p.orderId, timeoutId });
  };

  const handleUndoDelete = () => {
    if (!pendingDelete) return;
    clearTimeout(pendingDelete.timeoutId);
    clearCountdown(setUndoDeleteCountdown, undoDeleteIntervalRef);
    const orderId = pendingDelete.orderId;
    setPendingDelete(null);
    showNotif(`Penghapusan pesanan "${orderId}" dibatalkan`);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin");
  };

  const formatDate = (ts) => {
    if (!ts) return "-";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const metodeLabel = (v) =>
    v === "ambil" ? "Ambil di Toko" : v === "gosend" ? "GoSend" : v || "-";
  const bayarLabel = (v) =>
    v === "qris" ? "QRIS" : v === "bca" ? "Transfer BCA" : v || "-";

  return (
    <div className="flex min-h-screen bg-[#f5f1ed] font-sans text-[#334155]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl z-10">
        <div className="mb-10">
          <h1 className="text-2xl font-serif italic tracking-wide">
            Floristation.id
          </h1>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-[0.3em]">
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/kelola-produk")}
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
            Kelola Produk
          </button>
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">
            Kelola Pesanan
          </button>
          <button
            onClick={() => navigate("/admin/rekap")}
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
            Rekap
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-sm italic font-medium">Logout</span>
        </button>
      </aside>

      <main className="flex-1 ml-64 p-10 text-left">
        <header className="mb-8">
          <h2 className="text-2xl font-bold mb-1 text-[#1e2d3d]">
            Kelola Pesanan
          </h2>
          <p className="text-gray-500 text-sm">
            Manajemen pesanan pelanggan — realtime
          </p>
        </header>

        {/* Notifikasi global */}
        {notif.msg && (
          <div
            className={`px-6 py-4 rounded-2xl mb-4 text-sm font-bold ${notif.type === "error" ? "bg-red-500" : "bg-[#40c057]"} text-white`}
          >
            {notif.msg}
          </div>
        )}

        {/* Banner undo UPDATE */}
        {pendingUpdate && (
          <div className="flex items-center justify-between bg-[#1e2d3d] text-white px-6 py-4 rounded-2xl mb-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#228be6] flex items-center justify-center text-sm font-black">
                {undoUpdateCountdown}
              </div>
              <p className="text-sm font-semibold">
                Memperbarui pesanan{" "}
                <span className="font-black">"{pendingUpdate.orderId}"</span>...
              </p>
            </div>
            <button
              onClick={handleUndoUpdate}
              className="bg-white text-[#1e2d3d] px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              ↩ Urungkan
            </button>
          </div>
        )}

        {/* Banner undo DELETE */}
        {pendingDelete && (
          <div className="flex items-center justify-between bg-[#1e2d3d] text-white px-6 py-4 rounded-2xl mb-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-sm font-black">
                {undoDeleteCountdown}
              </div>
              <p className="text-sm font-semibold">
                Menghapus pesanan{" "}
                <span className="font-black">"{pendingDelete.orderId}"</span>...
              </p>
            </div>
            <button
              onClick={handleUndoDelete}
              className="bg-white text-[#1e2d3d] px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              ↩ Urungkan
            </button>
          </div>
        )}

        {/* FILTER */}
        <section className="bg-white p-6 rounded-[2rem] shadow-sm mb-8 border border-gray-50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari nama / ID pesanan..."
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-[#f7f3f0] border border-gray-200 rounded-2xl px-9 py-2.5 text-sm outline-none min-w-[220px]"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-[#1e2d3d]">
                Status:
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="appearance-none bg-[#f7f3f0] border border-gray-200 rounded-2xl px-5 py-2.5 text-sm font-medium outline-none cursor-pointer min-w-[150px]"
              >
                <option value="">Semua Status</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-[#1e2d3d]">
                Metode:
              </label>
              <select
                value={metodeFilter}
                onChange={(e) => {
                  setMetodeFilter(e.target.value);
                  setPage(1);
                }}
                className="appearance-none bg-[#f7f3f0] border border-gray-200 rounded-2xl px-5 py-2.5 text-sm font-medium outline-none cursor-pointer min-w-[180px]"
              >
                <option value="">Semua Metode</option>
                <option value="ambil">Ambil di Toko</option>
                <option value="gosend">GoSend</option>
              </select>
            </div>
            <p className="ml-auto text-gray-400 text-sm font-bold">
              Total: {filtered.length} pesanan
            </p>
          </div>
        </section>

        {/* TABLE */}
        <section className="bg-white rounded-[2rem] shadow-sm p-8 border border-gray-50">
          {loading ? (
            <p className="text-center text-gray-400 py-12 animate-pulse">
              Memuat pesanan...
            </p>
          ) : (
            <>
              <table className="w-full text-left text-sm table-fixed mb-6">
                <thead className="text-gray-400 border-b border-gray-100 italic font-bold">
                  <tr>
                    <th className="pb-5 px-2 w-[13%]">ID Pesanan</th>
                    <th className="pb-5 px-2 w-[15%]">Pelanggan</th>
                    <th className="pb-5 px-2 w-[14%]">Produk</th>
                    <th className="pb-5 px-2 w-[12%]">Metode</th>
                    <th className="pb-5 px-2 w-[11%]">Total</th>
                    <th className="pb-5 px-2 w-[11%]">Tgl Pesan</th>
                    <th className="pb-5 text-center w-[12%]">Status</th>
                    <th className="pb-5 text-center w-[12%]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-[#1e2d3d]">
                  {currentItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-12 text-gray-400"
                      >
                        Tidak ada pesanan.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((order) => {
                      const style = getStyle(order.status);
                      const isBeingDeleted = pendingDelete?.id === order.id;
                      const isBeingUpdated = pendingUpdate?.id === order.id;
                      return (
                        <tr
                          key={order.id}
                          className={`transition-colors ${isBeingDeleted ? "opacity-50 bg-red-50" : isBeingUpdated ? "bg-blue-50" : "hover:bg-gray-50"}`}
                        >
                          <td className="py-4 px-2 font-bold text-xs">
                            {order.order_id || order.id.slice(0, 8)}
                          </td>
                          <td className="py-4 px-2 font-semibold truncate">
                            {order.namaPemesan}
                          </td>
                          <td className="py-4 px-2 truncate">
                            {order.produk?.name}
                          </td>
                          <td className="py-4 px-2 text-xs">
                            {metodeLabel(order.metodePengambilan)}
                          </td>
                          <td className="py-4 px-2 font-bold">
                            {formatRupiah(order.totalHarga)}
                          </td>
                          <td className="py-4 px-2 text-gray-400 text-xs">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="py-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-bold ${style.color}`}
                            >
                              {style.label}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <div className="flex justify-center gap-1.5">
                              <button
                                onClick={() => setDetailOrder(order)}
                                className="bg-[#334155] text-white p-2 rounded-xl hover:bg-[#242f3d] transition-colors"
                                title="Detail"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() =>
                                  isBeingUpdated
                                    ? handleUndoUpdate()
                                    : openEdit(order)
                                }
                                className={`p-2 rounded-xl transition-colors ${isBeingUpdated ? "bg-orange-400 text-white hover:bg-orange-500" : "bg-[#f0e8dc] text-[#334155] hover:bg-[#e6dbcc]"}`}
                                title={isBeingUpdated ? "Urungkan" : "Edit"}
                              >
                                {isBeingUpdated ? (
                                  <span className="text-[9px] font-black px-1">
                                    ↩
                                  </span>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  isBeingDeleted
                                    ? handleUndoDelete()
                                    : handleDelete(order)
                                }
                                className={`p-2 rounded-xl transition-colors ${isBeingDeleted ? "bg-orange-400 text-white hover:bg-orange-500" : "bg-red-50 text-red-500 hover:bg-red-100"}`}
                                title={isBeingDeleted ? "Urungkan" : "Hapus"}
                              >
                                {isBeingDeleted ? (
                                  <span className="text-[9px] font-black px-1">
                                    ↩
                                  </span>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              <div className="flex justify-end gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${page === 1 ? "bg-gray-100 text-gray-300" : "bg-[#f5f1ed] text-[#334155] hover:bg-[#ede8e3]"}`}
                >
                  ← Back
                </button>
                <div className="flex items-center px-2 text-xs font-bold text-gray-400">
                  Page {page} of {totalPages || 1}
                </div>
                <button
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage((p) => p + 1)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${page === totalPages || totalPages === 0 ? "bg-gray-100 text-gray-300" : "bg-[#1e2d3d] text-white hover:bg-black"}`}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      {/* MODAL DETAIL */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-white w-full max-w-xl rounded-[1.5rem] shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1e2d3d]">
                Detail Pesanan — {detailOrder.order_id}
              </h3>
              <button
                onClick={() => setDetailOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-8 py-6 space-y-6 max-h-[65vh] overflow-y-auto">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 mb-1">ID Pesanan</p>
                  <p className="font-bold text-[#1e2d3d] text-base">
                    {detailOrder.order_id}
                  </p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-xs font-bold ${getStyle(detailOrder.status).color}`}
                >
                  {getStyle(detailOrder.status).label}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-sm text-[#1e2d3d] mb-3 uppercase tracking-wider">
                  Data Pemesan
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="font-semibold text-sm">
                      {detailOrder.namaPemesan}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">WhatsApp</p>
                    <p className="font-semibold text-sm">
                      {detailOrder.noPemesan}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-sm text-[#1e2d3d] mb-3 uppercase tracking-wider">
                  Data Penerima
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="font-semibold text-sm">
                      {detailOrder.namaPenerima}
                    </p>
                    <p className="text-[10px] text-gray-400 italic mt-1">
                      *isi nama yang akan mengambil barang florist yaa
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Telepon</p>
                    <p className="font-semibold text-sm">
                      {detailOrder.noTeleponPenerima}
                    </p>
                  </div>
                </div>
              </div>
              {/* ── Detail Pesanan: tambah Kategori & Size ── */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <p className="font-bold text-sm text-[#1e2d3d] mb-1 uppercase tracking-wider">
                  Detail Pesanan
                </p>
                {[
                  ["Produk", detailOrder.produk?.name],
                  ["Kategori", detailOrder.produk?.kategori || "-"],
                  ["Size", detailOrder.produk?.size || "-"],
                  ["Tanggal", detailOrder.tanggal],
                  ["Waktu", detailOrder.jam],
                  ["Metode", metodeLabel(detailOrder.metodePengambilan)],
                  ["Pembayaran", bayarLabel(detailOrder.metodePembayaran)],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold">{val || "-"}</span>
                  </div>
                ))}
              </div>
              {detailOrder.greetingCard && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-2 uppercase font-bold">
                    Greeting Card
                  </p>
                  <div className="bg-[#f9f7f4] p-4 rounded-xl">
                    <p className="text-sm italic">
                      "{detailOrder.greetingCard}"
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-gray-200">
                <p className="font-bold text-[#1e2d3d] uppercase text-sm">
                  Total Harga
                </p>
                <p className="text-lg font-black text-[#1e2d3d]">
                  {formatRupiah(detailOrder.totalHarga)}
                </p>
              </div>
            </div>
            <div className="px-8 pb-8 pt-2">
              <button
                onClick={() => setDetailOrder(null)}
                className="w-full bg-[#1e2d3d] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT FULL */}
      {editOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-[1.5rem] shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-[#1e2d3d]">
                  Edit Pesanan
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  {editOrder.order_id}
                </p>
              </div>
              <button
                onClick={() => setEditOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="px-8 py-6 space-y-5 max-h-[65vh] overflow-y-auto text-left">
                {/* Status */}
                <div>
                  <label className="block text-[11px] font-bold mb-3 uppercase text-gray-400 tracking-widest">
                    Status Pesanan
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setEditForm({ ...editForm, status: opt.value })
                        }
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${editForm.status === opt.value ? "bg-[#1e2d3d] text-white" : "bg-[#f5f1ed] text-[#334155] hover:bg-[#ede8e3]"}`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${editForm.status === opt.value ? "bg-white opacity-70" : opt.dot}`}
                        />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Data Pemesan */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[11px] font-bold mb-3 uppercase text-gray-400 tracking-widest">
                    Data Pemesan
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Nama Pemesan
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm"
                        value={editForm.namaPemesan}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            namaPemesan: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        No. WhatsApp
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm"
                        value={editForm.noPemesan}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            noPemesan: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Data Penerima */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[11px] font-bold mb-3 uppercase text-gray-400 tracking-widest">
                    Data Penerima
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Nama Penerima
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm"
                        value={editForm.namaPenerima}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            namaPenerima: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        No. Telepon
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm"
                        value={editForm.noTeleponPenerima}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            noTeleponPenerima: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Jadwal */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[11px] font-bold mb-3 uppercase text-gray-400 tracking-widest">
                    Jadwal
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Tanggal
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm"
                        value={editForm.tanggal}
                        onChange={(e) =>
                          setEditForm({ ...editForm, tanggal: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Jam
                      </label>
                      <input
                        type="time"
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm"
                        value={editForm.jam}
                        onChange={(e) =>
                          setEditForm({ ...editForm, jam: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Metode */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[11px] font-bold mb-3 uppercase text-gray-400 tracking-widest">
                    Metode
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Pengambilan
                      </label>
                      <select
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm font-bold"
                        value={editForm.metodePengambilan}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            metodePengambilan: e.target.value,
                          })
                        }
                      >
                        <option value="ambil">Ambil di Toko</option>
                        <option value="gosend">GoSend</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Pembayaran
                      </label>
                      <select
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm font-bold"
                        value={editForm.metodePembayaran}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            metodePembayaran: e.target.value,
                          })
                        }
                      >
                        <option value="qris">QRIS</option>
                        <option value="bca">Transfer BCA</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* ── Produk: tambah Kategori & Size sebagai select ── */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[11px] font-bold mb-3 uppercase text-gray-400 tracking-widest">
                    Produk
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm"
                        value={editForm.produk.name}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            produk: {
                              ...editForm.produk,
                              name: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Harga
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500 pointer-events-none">
                          Rp
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="0"
                          className="w-full pl-9 pr-3 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm"
                          value={formatDigitsWithDots(editForm.produk.price)}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "");
                            setEditForm({
                              ...editForm,
                              produk: { ...editForm.produk, price: digits },
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Kategori
                      </label>
                      <select
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm font-medium"
                        value={editForm.produk.kategori}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            produk: {
                              ...editForm.produk,
                              kategori: e.target.value,
                            },
                          })
                        }
                      >
                        <option value="">— Pilih Kategori —</option>
                        {KATEGORI_OPTIONS.map((k) => (
                          <option key={k} value={k}>
                            {k}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold mb-1 block">
                        Size
                      </label>
                      <select
                        className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm font-medium"
                        value={editForm.produk.size ?? "Tidak Ada"}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            produk: {
                              ...editForm.produk,
                              size:
                                e.target.value === "Tidak Ada"
                                  ? null
                                  : e.target.value,
                            },
                          })
                        }
                      >
                        {SIZE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 bg-[#f7f3f0] px-4 py-3 rounded-xl">
                    <input
                      type="checkbox"
                      id="goodieBagEdit"
                      checked={editForm.goodieBag}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          goodieBag: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-[#1e2d3d]"
                    />
                    <label
                      htmlFor="goodieBagEdit"
                      className="text-sm font-bold text-[#1e2d3d] cursor-pointer"
                    >
                      Goodie Bag (+Rp5.000)
                    </label>
                  </div>
                </div>
                {/* Greeting */}
                <div className="pt-4 border-t border-gray-100">
                  <label className="text-[11px] font-bold mb-2 uppercase text-gray-400 tracking-widest block">
                    Greeting Card
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm resize-none"
                    placeholder="Pesan greeting card (opsional)"
                    value={editForm.greetingCard}
                    onChange={(e) =>
                      setEditForm({ ...editForm, greetingCard: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="px-8 pb-8 pt-4 border-t border-gray-100 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#1e2d3d] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-60"
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditOrder(null)}
                  className="flex-1 bg-[#f5f1ed] text-[#334155] py-4 rounded-xl font-bold hover:bg-[#ede8e3] transition-all text-xs uppercase"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS PESANAN */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[1.5rem] shadow-2xl overflow-hidden">
            <div className="flex flex-col items-center px-8 pt-8 pb-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 className="text-base font-black text-[#1e2d3d] uppercase tracking-tight mb-2">
                Hapus Pesanan
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Yakin ingin menghapus pesanan{" "}
                <span className="font-black text-[#1e2d3d]">
                  "{confirmDelete.orderId}"
                </span>
                ?
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Kamu masih bisa urungkan dalam beberapa detik setelah
                dikonfirmasi.
              </p>
            </div>
            <div className="flex gap-3 px-8 pb-8">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-3.5 rounded-xl bg-[#f5f1ed] text-[#334155] text-xs font-black uppercase tracking-widest hover:bg-[#ede8e3] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-3.5 rounded-xl bg-red-500 text-white text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

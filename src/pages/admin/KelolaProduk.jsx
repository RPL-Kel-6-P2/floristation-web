import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  listenProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../firebase/productService";
import { uploadToCloudinary } from "../../firebase/cloudinaryService";
import { logoutAdmin } from "../../firebase/authService";

const KATEGORI_OPTIONS = [
  "Fresh Flowers",
  "Artificial Flowers",
  "Snack Bouquet",
  "Graduation Bouquet",
  "Bloom Box Arrangement",
];
const SIZE_OPTIONS = ["Tidak Ada", "XS", "S", "M", "L"];

const emptyForm = {
  nama: "",
  image_url: "",
  image_public_id: "",
  kategori: "Fresh Flowers",
  komposisi: [""],
  ketersediaan: true,
  size: null,
  price: "",
};

export default function KelolaProduk() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [notif, setNotif] = useState({ msg: "", type: "success" });
  const [search, setSearch] = useState("");
  const [katFilter, setKatFilter] = useState("Semua Kategori");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const unsub = listenProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const showNotif = (msg, type = "success") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif({ msg: "", type: "success" }), 4000);
  };

  const filtered = products.filter((p) => {
    const matchSearch = (p.nama || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchKat = katFilter === "Semua Kategori" || p.kategori === katFilter;
    return matchSearch && matchKat;
  });
  const totalPages = Math.ceil(filtered.length / perPage);
  const currentItems = filtered.slice((page - 1) * perPage, page * perPage);

  
  const addKomposisi = () =>
    setFormData((f) => ({ ...f, komposisi: [...f.komposisi, ""] }));
  const removeKomposisi = (i) =>
    setFormData((f) => ({
      ...f,
      komposisi: f.komposisi.filter((_, idx) => idx !== i),
    }));
  const updateKomposisi = (i, val) =>
    setFormData((f) => {
      const k = [...f.komposisi];
      k[i] = val;
      return { ...f, komposisi: k };
    });

  
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      showNotif("Format foto harus JPG, PNG, atau WEBP", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showNotif("Ukuran foto maksimal 5MB", "error");
      return;
    }

    
    setFormData((f) => ({ ...f, _file: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const openAdd = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData(emptyForm);
    setPreviewUrl(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsModalOpen(true);
  };

  const openEdit = (p) => {
    setIsEditMode(true);
    setEditingId(p.id);
    setFormData({
      nama: p.nama || "",
      image_url: p.image_url || "",
      image_public_id: p.image_public_id || "",
      kategori: p.kategori || "Fresh Flowers",
      komposisi:
        Array.isArray(p.komposisi) && p.komposisi.length > 0
          ? p.komposisi
          : [""],
      ketersediaan: p.ketersediaan ?? true,
      size: p.size ?? null,
      price: p.price || "",
      _file: null,
    });
    setPreviewUrl(p.image_url || null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let image_url = formData.image_url;
      let image_public_id = formData.image_public_id;

      
      if (formData._file) {
        setIsUploading(true);
        setUploadProgress(0);
        const result = await uploadToCloudinary(formData._file, (pct) => {
          setUploadProgress(pct);
        });
        image_url = result.url;
        image_public_id = result.public_id;
        setIsUploading(false);
      }

      if (!image_url) {
        showNotif("Foto produk wajib diupload", "error");
        setSaving(false);
        return;
      }

      const payload = {
        ...formData,
        image_url,
        image_public_id,
        size: formData.size === "Tidak Ada" ? null : formData.size,
        komposisi: formData.komposisi.filter((k) => k.trim() !== ""),
      };

      if (payload.komposisi.length === 0) {
        showNotif("Komposisi minimal 1 baris", "error");
        setSaving(false);
        return;
      }

      if (isEditMode) {
        await updateProduct(editingId, payload);
        showNotif("Produk berhasil diperbarui ✓");
      } else {
        await createProduct(payload);
        showNotif("Produk berhasil ditambahkan ✓");
      }

      setIsModalOpen(false);
    } catch (err) {
      setIsUploading(false);
      showNotif(err.message, "error");
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (p) => {
    if (!confirm(`Hapus produk "${p.nama}"?`)) return;
    try {
      await deleteProduct(p.id);
      showNotif("Produk berhasil dihapus");
    } catch (err) {
      showNotif("Gagal: " + err.message, "error");
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin");
  };

  return (
    <div className="flex h-screen bg-[#f5f1ed] font-sans text-[#334155] overflow-hidden">
      <aside className="w-64 bg-[#1e2d3d] text-white flex flex-col p-6 fixed h-full shadow-xl">
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
          <button className="w-full text-left px-4 py-3 bg-[#ffffff20] rounded-xl font-medium">
            Kelola Produk
          </button>
          <button
            onClick={() => navigate("/admin/kelola-pesanan")}
            className="w-full text-left px-4 py-3 hover:bg-[#ffffff10] rounded-xl transition-colors"
          >
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

      {/* MAIN */}
      <main className="flex-1 ml-64 p-8 flex flex-col overflow-hidden">
        <header className="flex justify-between items-start mb-6 flex-shrink-0">
          <div>
            <h2 className="text-3xl font-bold mb-1 text-[#1e2d3d]">
              Kelola Produk
            </h2>
            <p className="text-gray-500 text-sm italic">
              Manajemen inventaris Floristation.id
            </p>
          </div>
          <button
            onClick={openAdd}
            className="bg-[#1e2d3d] text-white px-7 py-3 rounded-xl font-bold hover:bg-black transition-all text-xs shadow-lg uppercase tracking-widest"
          >
            + Tambah Produk
          </button>
        </header>

        {notif.msg && (
          <div
            className={`px-6 py-4 rounded-2xl mb-4 text-sm font-bold flex-shrink-0 ${notif.type === "error" ? "bg-red-500" : "bg-[#40c057]"} text-white`}
          >
            {notif.msg}
          </div>
        )}

        {/* Filter */}
        <section className="flex gap-4 mb-6 flex-shrink-0">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Nama bunga..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-white border border-gray-200 px-9 py-2.5 rounded-xl text-xs font-bold outline-none shadow-sm"
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
          <select
            value={katFilter}
            onChange={(e) => {
              setKatFilter(e.target.value);
              setPage(1);
            }}
            className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-bold outline-none min-w-[180px] shadow-sm"
          >
            <option value="Semua Kategori">Semua Kategori</option>
            {KATEGORI_OPTIONS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </section>

        {/* Grid */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <p className="text-gray-400 text-sm animate-pulse">
                Memuat produk...
              </p>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="flex items-center justify-center h-48">
              <p className="text-gray-400 text-sm">Tidak ada produk.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 pb-4">
              {currentItems.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm flex flex-col border border-gray-100 p-4 h-fit"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <span className="text-gray-400 text-[8px] font-black uppercase tracking-widest block truncate mb-1">
                        {p.kategori}
                      </span>
                      <h3 className="text-[11px] font-black text-[#1e2d3d] uppercase truncate">
                        {p.nama}
                      </h3>
                    </div>
                    <span
                      className={`ml-2 px-1.5 py-0.5 rounded-full text-[7px] font-black uppercase whitespace-nowrap ${p.ketersediaan ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}
                    >
                      {p.ketersediaan ? "Tersedia" : "Habis"}
                    </span>
                  </div>

                  <div className="mb-4 rounded-xl bg-[#fcfaf8] p-1.5">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={p.image_url}
                        className="h-full w-full object-cover"
                        alt={p.nama}
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/300x400?text=No+Image")
                        }
                      />
                    </div>
                    <p className="mt-2 line-clamp-1 text-[8px] italic text-[#5c524f] px-0.5">
                      {Array.isArray(p.komposisi)
                        ? p.komposisi.join(", ")
                        : p.komposisi}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-black text-[#1e2d3d]">
                        Rp{Number(p.price).toLocaleString("id-ID")}
                      </p>
                      {p.size && (
                        <span className="bg-[#1e2d3d] text-white px-2 py-0.5 rounded text-[9px] font-bold">
                          {p.size}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="flex-1 rounded-md bg-[#1e2d3d] py-2 text-[8px] font-black uppercase text-white hover:bg-black transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="flex-1 rounded-md bg-[#e03131] py-2 text-[8px] font-black uppercase text-white hover:bg-[#c92a2a] transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <footer className="mt-auto py-4 border-t border-gray-100 flex justify-between items-center flex-shrink-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            Total {filtered.length} Produk
          </p>
          <div className="flex gap-3 items-center">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold ${page === 1 ? "bg-gray-100 text-gray-300" : "bg-[#e8e2dc] text-[#1e2d3d] hover:bg-[#dcd5cf]"}`}
            >
              ← Back
            </button>
            <span className="text-[10px] font-black text-[#1e2d3d] bg-white px-3 py-1 rounded-full border border-gray-100">
              Page {page} of {totalPages || 1}
            </span>
            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold ${page === totalPages || totalPages === 0 ? "bg-gray-100 text-gray-300" : "bg-[#1e2d3d] text-white hover:bg-black"}`}
            >
              Next →
            </button>
          </div>
        </footer>
      </main>

      {/* ===== MODAL TAMBAH / EDIT — SESUAI GAMBAR ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl relative max-h-[92vh] overflow-y-auto">
            {/* Header modal */}
            <div className="flex justify-between items-center px-10 pt-8 pb-6 border-b border-gray-100">
              <h3 className="text-2xl font-black text-[#1e2d3d] uppercase tracking-tight">
                {isEditMode ? "Edit Detail Produk" : "Tambah Produk Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-0">
                {/* ── KOLOM KIRI: Foto + Komposisi ── */}
                <div className="px-10 py-8 border-r border-gray-100">
                  {/* Preview foto */}
                  <div className="mb-4">
                    <label className="block text-[11px] font-bold mb-3 uppercase text-gray-400 tracking-widest">
                      Preview Foto (Portrait) :
                    </label>
                    <div className="w-full h-[330px] bg-[#f7f3f0] rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          className="w-full h-full object-cover rounded-2xl"
                          alt="preview"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-300 gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <p className="text-[11px] font-bold uppercase tracking-widest">
                            No Portrait Selected
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ganti Foto */}
                  <div className="mb-6">
                    <label className="block text-[11px] font-bold mb-2 uppercase text-gray-400 tracking-widest">
                      Ganti Foto :
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileSelect}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-5
                        file:rounded-xl file:border-0
                        file:text-sm file:font-bold
                        file:bg-[#1e2d3d] file:text-white
                        hover:file:bg-black file:cursor-pointer
                        cursor-pointer transition-all"
                    />
                    <p className="text-[10px] text-gray-400 mt-1.5">
                      Format: JPG, PNG, WEBP • Maks 5MB
                    </p>

                    {/* Progress bar upload */}
                    {isUploading && (
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                          <span>Mengupload foto...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-[#1e2d3d] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Komposisi */}
                  <div>
                    <label className="block text-[11px] font-bold mb-3 uppercase text-gray-400 tracking-widest">
                      Komposisi Bahan
                    </label>
                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                      {formData.komposisi.map((k, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Item bunga/snack..."
                            className="flex-1 px-4 py-2.5 bg-[#f7f3f0] rounded-xl outline-none text-sm uppercase border border-transparent focus:border-[#1e2d3d]/20 transition-all"
                            value={k}
                            onChange={(e) => updateKomposisi(i, e.target.value)}
                          />
                          {formData.komposisi.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeKomposisi(i)}
                              className="text-red-400 hover:text-red-600 font-bold text-lg flex-shrink-0 w-6 text-center"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addKomposisi}
                      className="mt-3 text-[11px] font-black text-[#1e2d3d] underline uppercase tracking-widest"
                    >
                      + Tambah Item
                    </button>
                  </div>
                </div>

                {/* ── KOLOM KANAN: Detail Produk ── */}
                <div className="px-10 py-8 flex flex-col gap-5">
                  {/* Nama Produk */}
                  <div>
                    <label className="block text-[11px] font-bold mb-2 uppercase text-[#1e2d3d] tracking-widest">
                      Nama Produk :
                    </label>
                    <input
                      type="text"
                      placeholder="CONTOH: ASTERIA XS"
                      className="w-full px-5 py-4 bg-[#f7f3f0] rounded-2xl outline-none text-sm font-bold uppercase border border-transparent focus:border-[#1e2d3d]/20 transition-all"
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData({ ...formData, nama: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Harga */}
                  <div>
                    <label className="block text-[11px] font-bold mb-2 uppercase text-[#1e2d3d] tracking-widest">
                      Harga :
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-black text-gray-400">
                        Rp
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="0"
                        className="w-full pl-12 pr-5 py-4 bg-[#f7f3f0] rounded-2xl outline-none text-sm font-black border border-transparent focus:border-[#1e2d3d]/20 transition-all"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Kategori */}
                  <div>
                    <label className="block text-[11px] font-bold mb-2 uppercase text-[#1e2d3d] tracking-widest">
                      Kategori Produk :
                    </label>
                    <select
                      className="w-full px-5 py-4 bg-[#f7f3f0] rounded-2xl outline-none text-sm font-bold border border-transparent focus:border-[#1e2d3d]/20 transition-all"
                      value={formData.kategori}
                      onChange={(e) =>
                        setFormData({ ...formData, kategori: e.target.value })
                      }
                    >
                      {KATEGORI_OPTIONS.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ukuran */}
                  <div>
                    <label className="block text-[11px] font-bold mb-2 uppercase text-[#1e2d3d] tracking-widest">
                      Ukuran :
                    </label>
                    <select
                      className="w-full px-5 py-4 bg-[#f7f3f0] rounded-2xl outline-none text-sm font-bold border border-transparent focus:border-[#1e2d3d]/20 transition-all"
                      value={formData.size ?? "Tidak Ada"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          size:
                            e.target.value === "Tidak Ada"
                              ? null
                              : e.target.value,
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

                  {/* Nama File System (readonly) */}
                  <div>
                    <label className="block text-[11px] font-bold mb-2 uppercase text-gray-400 tracking-widest">
                      Nama File (System) :
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={
                        formData._file?.name ||
                        (formData.image_public_id
                          ? formData.image_public_id.split("/").pop()
                          : "")
                      }
                      className="w-full px-5 py-3.5 bg-[#f7f3f0] rounded-2xl outline-none text-xs font-mono text-gray-400 border border-transparent"
                    />
                  </div>

                  {/* Status Tersedia */}
                  <div className="flex items-center gap-4 bg-[#f7f3f0] px-5 py-4 rounded-2xl">
                    <input
                      type="checkbox"
                      id="ketersediaan"
                      checked={formData.ketersediaan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ketersediaan: e.target.checked,
                        })
                      }
                      className="w-6 h-6 accent-[#1e2d3d] cursor-pointer"
                    />
                    <label
                      htmlFor="ketersediaan"
                      className="text-sm font-black text-[#1e2d3d] cursor-pointer uppercase tracking-tighter"
                    >
                      Status: Produk Tersedia
                    </label>
                  </div>

                  
                  <div className="flex-1" />

                  
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={saving || isUploading}
                      className="w-full py-5 bg-[#1e2d3d] text-white font-black rounded-2xl text-xs shadow-xl hover:bg-black transition-all uppercase tracking-[0.3em] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isUploading
                        ? `Mengupload... ${uploadProgress}%`
                        : saving
                          ? "Menyimpan..."
                          : isEditMode
                            ? "Simpan Perubahan"
                            : "Daftarkan Produk ke Katalog"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      disabled={saving || isUploading}
                      className="w-full py-4 bg-gray-100 text-gray-400 font-bold rounded-2xl text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-60"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

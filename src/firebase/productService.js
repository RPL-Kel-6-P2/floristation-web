import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./config";

const COL = "products";

const VALID_KATEGORI = [
  "Fresh Flowers",
  "Artificial Flowers",
  "Snack Bouquet",
  "Graduation Bouquet",
  "Bloom Box Arrangement",
];
const VALID_SIZE = [null, "XS", "S", "M", "L", "XL"];

function validate(data) {
  const errors = [];
  if (!data.nama?.trim()) errors.push("Nama wajib diisi");
  if (!data.image_url?.trim()) errors.push("Foto produk wajib diupload");
  if (!VALID_KATEGORI.includes(data.kategori))
    errors.push("Kategori tidak valid");
  if (!data.komposisi || data.komposisi.length === 0)
    errors.push("Komposisi wajib diisi minimal 1");
  data.komposisi?.forEach((k, i) => {
    if (!k.trim()) errors.push(`Komposisi baris ${i + 1} tidak boleh kosong`);
  });
  if (typeof data.ketersediaan !== "boolean")
    errors.push("Ketersediaan tidak valid");
  if (!VALID_SIZE.includes(data.size ?? null)) errors.push("Size tidak valid");
  if (!data.price || Number(data.price) <= 0)
    errors.push("Harga harus lebih dari 0");
  return errors;
}

export async function createProduct(data) {
  const errors = validate(data);
  if (errors.length) throw new Error(errors.join(". "));

  return await addDoc(collection(db, COL), {
    nama: data.nama.trim().toUpperCase(),
    image_url: data.image_url.trim(),
    image_public_id: data.image_public_id || "",
    kategori: data.kategori,
    komposisi: data.komposisi.map((k) => k.trim().toUpperCase()),
    ketersediaan: data.ketersediaan,
    size: data.size ?? null,
    price: Number(data.price),
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
}

export function listenProducts(callback) {
  const q = query(collection(db, COL), orderBy("created_at", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function updateProduct(id, data) {
  const errors = validate(data);
  if (errors.length) throw new Error(errors.join(". "));

  await updateDoc(doc(db, COL, id), {
    nama: data.nama.trim().toUpperCase(),
    image_url: data.image_url.trim(),
    image_public_id: data.image_public_id || "",
    kategori: data.kategori,
    komposisi: data.komposisi.map((k) => k.trim().toUpperCase()),
    ketersediaan: data.ketersediaan,
    size: data.size ?? null,
    price: Number(data.price),
    updated_at: serverTimestamp(),
  });
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, COL, id));
}

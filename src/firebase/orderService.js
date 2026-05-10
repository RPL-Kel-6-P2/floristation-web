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
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./config";

const COL = "orders";
const VALID_STATUS = ["Pending", "Konfirmasi", "Diproses", "Selesai"];

export function listenOrders(callback) {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function listenOrdersByDateRange(startDate, endDate, callback) {
  const start = Timestamp.fromDate(new Date(startDate + "T00:00:00"));
  const end = Timestamp.fromDate(new Date(endDate + "T23:59:59"));
  const q = query(
    collection(db, COL),
    where("createdAt", ">=", start),
    where("createdAt", "<=", end),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function updateOrderStatus(id, newStatus) {
  if (!VALID_STATUS.includes(newStatus)) throw new Error("Status tidak valid");
  await updateDoc(doc(db, COL, id), {
    status: newStatus,
  });
}

export async function updateOrderFull(id, data) {
  if (!VALID_STATUS.includes(data.status)) throw new Error("Status tidak valid");

  const harga = Number((data.produk?.price || "0").toString().replace(/[^0-9]/g, ""));
  const total = harga + (data.goodieBag ? 5000 : 0);

  await updateDoc(doc(db, COL, id), {
    namaPemesan: data.namaPemesan,
    noPemesan: data.noPemesan,
    namaPenerima: data.namaPenerima,
    noTeleponPenerima: data.noTeleponPenerima,
    tanggal: data.tanggal,
    jam: data.jam,
    metodePengambilan: data.metodePengambilan,
    metodePembayaran: data.metodePembayaran,
    goodieBag: data.goodieBag,
    greetingCard: data.greetingCard || "",
    status: data.status,
    totalHarga: total,
    produk: {
      name: data.produk?.name || "",
      price: data.produk?.price || "",
      image: data.produk?.image || "",
    },
  });
}

export async function deleteOrder(id) {
  await deleteDoc(doc(db, COL, id));
}
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
    orderBy("createdAt", "desc"),
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
  if (!VALID_STATUS.includes(data.status))
    throw new Error("Status tidak valid");

  const regexHuruf = /^[a-zA-Z\s]+$/;
  const regexAngka = /^[0-9]+$/;

  // Validasi nama
  if (!regexHuruf.test(data.namaPemesan || "") || data.namaPemesan.length < 3) {
    throw new Error("Nama pemesan tidak valid");
  }

  if (
    !regexHuruf.test(data.namaPenerima || "") ||
    data.namaPenerima.length < 3
  ) {
    throw new Error("Nama penerima tidak valid");
  }

  // Validasi nomor
  if (
    !regexAngka.test(data.noPemesan || "") ||
    data.noPemesan.length < 10 ||
    data.noPemesan.length > 13
  ) {
    throw new Error("Nomor WA tidak valid");
  }

  if (
    !regexAngka.test(data.noTeleponPenerima || "") ||
    data.noTeleponPenerima.length < 10 ||
    data.noTeleponPenerima.length > 13
  ) {
    throw new Error("Nomor telepon penerima tidak valid");
  }

  // Validasi tanggal
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 7);

  const inputDate = new Date(data.tanggal);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    throw new Error("Tanggal tidak boleh di masa lalu");
  }

  if (inputDate > maxDate) {
    throw new Error("Pemesanan maksimal 7 hari ke depan");
  }

  // Validasi jam
  const jamAngka = parseFloat((data.jam || "").replace(":", "."));

  const isWeekend = inputDate.getDay() === 0 || inputDate.getDay() === 6;

  if (isWeekend && (jamAngka < 10 || jamAngka > 21)) {
    throw new Error("Weekend hanya 10:00 - 21:00");
  }

  if (!isWeekend && (jamAngka < 9 || jamAngka > 20)) {
    throw new Error("Weekday hanya 09:00 - 20:00");
  }

  const harga = Number(
    (data.produk?.price || "0").toString().replace(/[^0-9]/g, ""),
  );
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

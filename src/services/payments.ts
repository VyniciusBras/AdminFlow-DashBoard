import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "./firebase";
import { Payment } from "@/types/payment";

export async function getPayments(): Promise<Payment[]> {
  try {
    const q = query(collection(db, "payments"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const d = doc.data();

      return {
        id: doc.id,
        user: d.user,
        method: d.method,
        amount: Number(d.amount) || 0,
        status: d.status,
        date: String(d.date || ""),
      } as Payment;
    });
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error);
    return [];
  }
}

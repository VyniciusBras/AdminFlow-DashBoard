import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "./firebase";
import { Order } from "@/types/order";

export async function getOrders(): Promise<Order[]> {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("date", "desc"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        user: d.user || "Usuário desconhecido",
        total: Number(d.total) || 0,
        local: d.local || "Não informado",
        status: d.status || "Pendente",
        date: d.date ? String(d.date) : "Sem Data",
      } as Order;
    });
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return [];
  }
}

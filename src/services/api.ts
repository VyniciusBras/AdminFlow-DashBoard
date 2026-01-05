import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { User } from "@/types/user";
import { Payment } from "@/types/payment";
import { Order } from "@/types/order";
import { db } from "./firebase";

export async function getUsers(): Promise<User[]> {
  const usersQuery = query(collection(db, "users"), orderBy("name"));
  const snapshot = await getDocs(usersQuery);
  const usersList = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      status: data.status,
    } as User;
  });

  return usersList;
}

export async function getPayments(): Promise<Payment[]> {
  const snapshot = await getDocs(collection(db, "payments"));

  return snapshot.docs.map((doc) => {
    const d: any = doc.data();

    return {
      id: doc.id,
      user: d.user,
      method: d.method,
      amount: Number(d.amount) || 0,
      status: d.status,
      date: String(d.date || ""),
    } as Payment;
  });
}

export async function getOrders(): Promise<Order[]> {
  try {
    const ordersRef = collection(db, "orders");
    const snapshot = await getDocs(ordersRef);

    return snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        user: d.user || "Usuário desconhecido",
        total: Number(d.total) || 0,
        local: d.local || "Não informado",
        status: d.status || "Novo",
        date: d.date ? String(d.date) : "Sem data no banco",
      } as Order;
    });
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return [];
  }
}

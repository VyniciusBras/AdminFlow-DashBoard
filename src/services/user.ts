import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "./firebase";
import { User } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  try {
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
  } catch (error) {
    console.error("Erro ao buscar usuários do Banco de dados:", error);
    return [];
  }
}

import { Order } from "@/types/order";

export const ordersMock: Order[] = [
  {
    id: 1,
    user: "Vynicius Brasil",
    total: 199.9,
    status: "Entregue",
    date: "2025-01-10",
  },
  {
    id: 2,
    user: "Ana Carolina",
    total: 89.9,
    status: "Enviado",
    date: "2025-01-12",
  },
  {
    id: 3,
    user: "Douglas Oliveira",
    total: 250.0,
    status: "Em preparo",
    date: "2025-02-05",
  },
  {
    id: 4,
    user: "Erick Brum",
    total: 120.0,
    status: "Cancelado",
    date: "2025-03-20",
  },
];

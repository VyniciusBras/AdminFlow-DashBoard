import { Payment } from "@/types/payment";

export const paymentsMock: Payment[] = [
  {
    id: "1",
    orderId: 1,
    user: "Vynicius Brasil",
    method: "Cartão",
    amount: 199.9,
    status: "Pago",
    date: "2025-01-10",
  },
  {
    id: "2",
    orderId: 2,
    user: "Ana Carolina",
    method: "Cartão",
    amount: 89.9,
    status: "Pago",
    date: "2025-01-12",
  },
  {
    id: "3",
    orderId: 3,
    user: "Douglas Oliveira",
    method: "Pix",
    amount: 250.0,
    status: "Pendente",
    date: "2025-02-05",
  },
  {
    id: "4",
    orderId: 4,
    user: "Erick Brum",
    method: "Pix",
    amount: 120.0,
    status: "Falha",
    date: "2025-03-20",
  },
];

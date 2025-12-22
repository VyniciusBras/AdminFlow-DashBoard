import { Payment } from "@/types/payment";

export const paymentsMock: Payment[] = [
  {
    id: "1",
    user: "Vynicius Brasil",
    amount: 360,
    status: "Pago",
    date: "2025-10-20",
  },
  {
    id: "2",
    user: "Ana Carolina",
    amount: 450,
    status: "Pendente",
    date: "2025-11-10",
  },
  {
    id: "3",
    user: "Douglas Oliveira",
    amount: 200,
    status: "Falha",
    date: "2025-12-15",
  },
];

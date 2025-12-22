export type Payment = {
  id: string;
  user: string;
  amount: number;
  status: "Pago" | "Pendente" | "Falha";
  date: string;
};

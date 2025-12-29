export type Payment = {
  id: string;
  orderId: number;
  user: string;
  method: "Pix" | "Cartão";
  amount: number;
  status: "Pago" | "Pendente" | "Falha";
  date: string;
};

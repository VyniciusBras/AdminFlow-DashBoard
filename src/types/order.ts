export type Order = {
  id: number;
  user: string;
  total: number;
  status: "Novo" | "Em preparo" | "Enviado" | "Entregue" | "Cancelado";
  date: string;
};

export type Order = {
  id: string;
  user: string;
  total: number;
  local: string;
  status: "Novo" | "Em preparo" | "Enviado" | "Entregue" | "Cancelado";
  date: string;
};

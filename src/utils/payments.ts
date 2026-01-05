import { Payment } from "@/types/payment";

export type MonthlyData = {
  month: string;
  total: number;
};

export function groupPaymentsByMonth(payments: Payment[]): MonthlyData[] {
  const map: Record<number, number> = {};
  for (let i = 0; i < 12; i++) map[i] = 0;

  payments.forEach((payment) => {
    // 1. Garante que apenas pagamentos bem-sucedidos entrem no gráfico
    // Nota: Verifique se no seu banco é "Pago" ou "Sucesso"
    if (payment.status !== "Pago") return;

    // 2. Converte "20/08/2026" -> ["20", "08", "2026"]
    const dateParts = payment.date.split("/");

    if (dateParts.length === 3) {
      // Cria a data no formato ISO: "2026-08-20"
      const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      const date = new Date(isoDate);

      if (!isNaN(date.getTime())) {
        const monthIndex = date.getMonth(); // Agosto retornará 7
        map[monthIndex] += payment.amount; // Soma o valor
      }
    }
  });

  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return Object.entries(map)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([monthIndex, total]) => ({
      month: monthNames[Number(monthIndex)],
      total,
    }));
}

export function accumulateMonthlyData(data: MonthlyData[]): MonthlyData[] {
  let runningTotal = 0;

  return data.map((item) => {
    runningTotal += item.total;

    return {
      month: item.month,
      total: runningTotal,
    };
  });
}

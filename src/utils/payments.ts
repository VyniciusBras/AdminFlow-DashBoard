import { Payment } from "@/types/payment";

export type MonthlyData = {
  month: string;
  total: number;
};

export function groupPaymentsByMonth(payments: Payment[]): MonthlyData[] {
  const map: Record<number, number> = {};

  for (let i = 0; i < 12; i++) {
    map[i] = 0;
  }

  payments.forEach((payment) => {
    if (payment.status !== "Pago") return;

    const date = new Date(payment.date);
    const monthIndex = date.getMonth();

    map[monthIndex] = (map[monthIndex] || 0) + payment.amount;
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

import { Payment } from "@/types/payment";

export type MonthlyData = {
  month: string;
  total: number;
};

export function groupPaymentsByMonth(payments: Payment[]): MonthlyData[] {
  const map: Record<number, number> = {};

  payments.forEach((payment) => {
    if (payment.status !== "Pago") return;

    const date = new Date(payment.date);
    const monthIndex = date.getMonth();

    map[monthIndex] = (map[monthIndex] || 0) + payment.amount;
  });

  return Object.entries(map)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([monthIndex, total]) => ({
      month: new Date(0, Number(monthIndex)).toLocaleString("pt-BR", {
        month: "short",
      }),
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

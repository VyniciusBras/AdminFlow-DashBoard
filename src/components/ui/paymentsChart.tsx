"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type ChartData = {
    name: string;
    total: number;
}

type PaymentsChartProps = {
    data: ChartData[];
};

const statusColors: Record<string, string> = {
    "Pago": "#2e7d32",
    "Pendente": "#ed6c02",
    "Falha": "#d32f2f",
};

export default function PaymentsChart({ data }: PaymentsChartProps) {
    return (
        <div className="bg-white p-5 rounded shadow h-100 text-blue-900">
            <h2 className="text-lg font-semibold mb-4">
                Pagamentos por Status
            </h2>

            <ResponsiveContainer width="100%" height="100%" maxHeight={350}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="total">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={statusColors[entry.name]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
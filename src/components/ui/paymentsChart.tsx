"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type ChartData = {
    name: string;
    total: number;
}

type PaymentsChartProps = {
    data: ChartData[];
};

export default function PaymentsChart({ data }: PaymentsChartProps) {
    return (
        <div className="bg-white p-5 rounded shadow h-100">
            <h2 className="text-lg font-semibold mb-4">
                Pagamentos por Status
            </h2>

            <ResponsiveContainer width="100%" height="100%" maxHeight={350}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="total" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
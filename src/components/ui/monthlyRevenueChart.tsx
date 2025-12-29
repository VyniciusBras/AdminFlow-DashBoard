"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useMemo, useState } from "react";
import { MonthlyData } from "@/utils/payments";
import { accumulateMonthlyData } from "@/utils/payments";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { formatCurrencyBR } from "@/utils/format";

type Props = {
    data: MonthlyData[];
};

function CustomTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
}) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border rounded p-2 shadow text-sm">
                <p className="font-semibold">{label}</p>
                <p>{formatCurrencyBR(payload[0].value)}</p>
            </div>
        );
    }

    return null;
}


export default function MonthlyRevenueChart({ data }: Props) {
    const [mode, setMode] = useState<"monthly" | "accumulated">("monthly");

    const chartData = useMemo(() => {
        if (mode === "accumulated") {
            return accumulateMonthlyData(data);
        }
        return data;
    }, [mode, data]);

    return (
        <div className="bg-white p-4 h-100 rounded shadow text-blue-900">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                    Evolução de Pagamentos
                </h2>

                <ToggleButtonGroup
                    size="small"
                    value={mode}
                    exclusive
                    onChange={(_, value) => value && setMode(value)}
                >
                    <ToggleButton value="monthly">Mensal</ToggleButton>
                    <ToggleButton value="accumulated">Acumulado</ToggleButton>
                </ToggleButtonGroup>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#00aeff"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

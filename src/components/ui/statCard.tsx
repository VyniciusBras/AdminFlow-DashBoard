"use client";

import { ReactNode } from "react";

type StatCardProps = {
    title: string;
    value: string | number;
    icon?: ReactNode;
    color?: string
};

export default function Statcard({ title, value, icon, color }: StatCardProps) {
    return (
        <div className={`p-4 rounded shadow flex items-center justify-between bg-white`}>
            <div>
                <div className="text-gray-500">{title}</div>
                <div className="text-2xl font-bold">{value}</div>
            </div>
            {icon && <div className={`text-3xl ${color}`}>{icon}</div>}
        </div>
    )
}
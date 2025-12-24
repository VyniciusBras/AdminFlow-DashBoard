"use client";

import { motion } from "framer-motion";

type Props = {
    title: string;
    value: number;
    bgColor?: string;
};

export default function StatCard({ title, value, bgColor }: Props) {
    return (
        <motion.div
            className={`${bgColor} rounded-lg p-4 shadow cursor-pointer`}
            whileHover={{
                scale: 1.03,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.12)",
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
        >
            <h3 className="text-sm text-black">{title}</h3>
            <p className="text-2xl font-bold text-blue-900">{value}</p>
        </motion.div>
    );
}

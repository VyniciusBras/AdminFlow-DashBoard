"use client";

import { useEffect, useState } from "react";
import { getUsers, getPayments } from "@/services/api";
import { User } from "@/types/user";
import { Payment } from "@/types/payment";
import StatCard from "@/components/ui/statCard";
import PageContainer from "@/components/layout/pageContainer";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import PaymentsChart from "@/components/ui/paymentsChart";
import MonthlyRevenueChart from "@/components/ui/monthlyRevenueChart";
import { groupPaymentsByMonth } from "@/utils/payments";
import DashboardSkeleton from "@/components/skeletons/dashboardSkeleton";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/fadeInUp";

export default function DashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const monthlyData = groupPaymentsByMonth(payments);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const [usersData, paymentsData] = await Promise.all([
                getUsers(),
                getPayments(),
            ]);

            setUsers(usersData);
            setPayments(paymentsData);

            setLoading(false);
        }

        loadData();
    }, []);


    const totalUsers = users.length;
    const totalPayments = payments.filter((p) => p.status === "Pago").length;
    const pendingPayments = payments.filter((p) => p.status === "Pendente").length;
    const chartData = [
        {
            name: "Pago",
            total: payments.filter((p) => p.status === "Pago").length,
        },
        {
            name: "Pendente",
            total: payments.filter((p) => p.status === "Pendente").length,
        },
        {
            name: "Falha",
            total: payments.filter((p) => p.status === "Falha").length,
        },
    ];
    if (loading) {
        return (
            <PageContainer>
                <Sidebar />
                <main className="flex-1 flex flex-col">
                    <Header />
                    <div className="p-6">
                        <DashboardSkeleton />
                    </div>
                </main>
            </PageContainer>
        );
    }


    return (
        <PageContainer>
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <Header />

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-900">
                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" >
                            <StatCard title="Total de Usuários" value={totalUsers} bgColor="bg-yellow-300" />
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                            <StatCard title="Pagamentos Pagos" value={totalPayments} bgColor="bg-green-300" />
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                            <StatCard title="Pagamentos Pendentes" value={pendingPayments} bgColor="bg-red-300" />
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                            <PaymentsChart data={chartData} />
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                            <MonthlyRevenueChart data={monthlyData} />
                        </motion.div>
                    </div>

                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.0 }}
                        className="bg-white p-4 rounded shadow text-black"
                    >

                        <h2 className="text-xl font-bold mb-4">Usuários</h2>
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-300">
                                    <th className="p-2 border">Nome</th>
                                    <th className="p-2 border">Email</th>
                                    <th className="p-2 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="p-2 border">{user.name} </td>
                                        <td className="p-2 border">{user.email}</td>
                                        <td className="p-2 border">{user.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                </div>
            </main>
        </PageContainer >
    );
}

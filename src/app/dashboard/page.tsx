"use client";

import { useEffect, useState } from "react";
import { getUsers, getPayments } from "@/services/api";
import { User } from "@/types/user";
import { Payment } from "@/types/payment";
import StatCard from "@/components/ui/statCard";
import PageContainer from "@/components/layout/pageContainer";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function DashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => {
        getUsers().then(setUsers);
        getPayments().then(setPayments);
    }, []);

    const totalUsers = users.length;
    const totalPayments = payments.filter((p) => p.status === "Pago").length;
    const pendingPayments = payments.filter((p) => p.status === "Pendente").length;

    return (
        <PageContainer>
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <Header />
                <div className="p-6 space-y-6">
                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-900">
                        <StatCard title="Total de Usuários" value={totalUsers} />
                        <StatCard title="Pagamentos Pagos" value={totalPayments} />
                        <StatCard title="Pagamentos Pendentes" value={pendingPayments} />
                    </div>

                    <div className="bg-white p-4 rounded shadow text-black">
                        <h2 className="text-xl font-bold mb-4">Usuários</h2>
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 border">Nome</th>
                                    <th className="p-2 border">Email</th>
                                    <th className="p-2 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="p-2 border">{user.name}</td>
                                        <td className="p-2 border">{user.email}</td>
                                        <td className="p-2 border">{user.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </PageContainer>
    );
}

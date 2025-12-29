"use client";

import { getPayments, getOrders } from "@/services/api";
import { Payment } from "@/types/payment";
import { useEffect, useState } from "react";

import PageContainer from "@/components/layout/pageContainer";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatusBadge from "@/components/ui/statusBadge";

type Order = {
    id: number;
    user: string;
    total: number;
    status: "Novo" | "Em preparo" | "Enviado" | "Entregue" | "Cancelado";
    date: string;
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    function getPaymentForOrder(orderId: number) {
        return payments.find((p) => p.orderId === orderId);
    }

    useEffect(() => {
        Promise.all([getOrders(), getPayments()]).then(([orders, payments]) => {
            setOrders(orders);
            setPayments(payments);
            setLoading(false);
        });
    }, []);

    return (
        <PageContainer>
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <Header />

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
                    {loading ? (
                        <OrdersSkeleton />
                    ) : (
                        <table className="w-full border text-black bg-white">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-2 border">Cliente</th>
                                    <th className="p-2 border">Valor</th>
                                    <th className="p-2 border">Status</th>
                                    <th className="p-2 border">Data</th>
                                    <th className="p-2 border">Pagamento</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => {
                                    const payment = getPaymentForOrder(order.id);

                                    return (
                                        <tr key={order.id}>
                                            <td className="p-2 border">{order.user}</td>
                                            <td className="p-2 border">R$ {order.total.toFixed(2)}</td>
                                            <td className="p-2 border"><StatusBadge status={order.status} /></td>
                                            <td className="p-2 border">{order.date}</td>
                                            <td className="p-2 border">
                                                {payment ? payment.status : "Sem pagamento"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </PageContainer>
    );
}
function OrdersSkeleton() {
    return (
        <div className="animate-pulse space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded" />
            ))}
        </div>
    );
}

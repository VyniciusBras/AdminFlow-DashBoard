"use client";

import { useEffect, useState } from "react";
import { getUsers, getPayments } from "@/services/api";
import { User } from "@/types/user";
import { Payment } from "@/types/payment";
import { Table, TableBody, TableCell, TableHead, TableRow, Chip, Paper, TableSortLabel, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/fadeInUp";
import { groupPaymentsByMonth } from "@/utils/payments";

import StatCard from "@/components/ui/statCard";
import PageContainer from "@/components/layout/pageContainer";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import PaymentsChart from "@/components/ui/paymentsChart";
import MonthlyRevenueChart from "@/components/ui/monthlyRevenueChart";
import DashboardSkeleton from "@/components/skeletons/dashboardSkeleton";
import TableSkeleton from "@/components/skeletons/tableSkeleton";

type Order = "asc" | "desc";

function getStatusColor(status: User["status"]) {
    switch (status) {
        case "Ativo":
            return "success";
        case "Inativo":
            return "warning";
        default:
            return "default";
    }
}

export default function DashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const monthlyData = groupPaymentsByMonth(payments);
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState<keyof User>("name");
    const [orderDirection, setOrderDirection] = useState<Order>("asc");
    const MotionTableRow = motion(TableRow);

    function sortUsers(
        users: User[],
        orderBy: keyof User,
        order: Order
    ) {
        return [...users].sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];

            if (typeof aValue === "number" && typeof bValue === "number") {
                return order === "asc" ? aValue - bValue : bValue - aValue;
            }

            return order === "asc"
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
    }

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

    const handleSort = (property: keyof User) => {
        const isAsc = orderBy === property && orderDirection === "asc";
        setOrderDirection(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedUsers = sortUsers(
        users,
        orderBy,
        orderDirection
    );

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
                            <StatCard title="Total de Usuários" value={totalUsers} bgColor="bg-cyan-300" />
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                            <StatCard title="Pagamentos Concluídos" value={totalPayments} bgColor="bg-green-300" />
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                            <StatCard title="Pagamentos Pendentes" value={pendingPayments} bgColor="bg-orange-300" />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                            <PaymentsChart data={chartData} />
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="md:col-span-2">
                            <MonthlyRevenueChart data={monthlyData} />
                        </motion.div>
                    </div>

                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">
                            Usuários
                        </h2>

                        {loading ? (
                            <TableSkeleton />
                        ) : (
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={orderBy === "name"}
                                                    direction={orderBy === "name" ? orderDirection : "asc"}
                                                    onClick={() => handleSort("name")}
                                                >
                                                    Nome
                                                </TableSortLabel>
                                            </TableCell>

                                            <TableCell>
                                                <TableSortLabel
                                                    active={orderBy === "email"}
                                                    direction={orderBy === "email" ? orderDirection : "asc"}
                                                    onClick={() => handleSort("email")}
                                                >
                                                    Email
                                                </TableSortLabel>
                                            </TableCell>

                                            <TableCell>
                                                <TableSortLabel
                                                    active={orderBy === "status"}
                                                    direction={orderBy === "status" ? orderDirection : "asc"}
                                                    onClick={() => handleSort("status")}
                                                >
                                                    Status
                                                </TableSortLabel>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {sortedUsers.map((user, index) => (
                                            <MotionTableRow
                                                key={user.id}
                                                hover
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: "easeOut",
                                                    delay: index * 0.10
                                                }}
                                            >
                                                <TableCell>{user.name}</TableCell>

                                                <TableCell>
                                                    {user.email}
                                                </TableCell>

                                                <TableCell>
                                                    <Chip
                                                        label={user.status}
                                                        color={getStatusColor(user.status)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </MotionTableRow>
                                        ))}
                                    </TableBody>

                                </Table>
                            </Paper>
                        )}
                    </motion.div>

                </div>
            </main>
        </PageContainer >
    );
}

"use client";

import { getPayments, getOrders } from "@/services/api";
import { Payment } from "@/types/payment";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableSortLabel, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { motion } from "framer-motion";

import PageContainer from "@/components/layout/pageContainer";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatusBadge from "@/components/ui/statusBadge";
import PaymentDetailsModal from "@/components/ui/paymentsDetailsModal";
import TableSkeleton from "@/components/skeletons/tableSkeleton";

type Order = {
    id: number;
    user: string;
    total: number;
    local: string;
    status: "Novo" | "Em preparo" | "Enviado" | "Entregue" | "Cancelado";
    date: string;
};

type SortOrder = "asc" | "desc";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<Order["status"] | "Todos">("Todos");
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [orderBy, setOrderBy] = useState<string>("date");
    const [orderDirection, setOrderDirection] = useState<SortOrder>("asc");
    const MotionTableRow = motion(TableRow);

    function getPaymentForOrder(Id: number) {
        return payments.find((p) => p.id === Id.toString());
    }

    useEffect(() => {
        Promise.all([getOrders(), getPayments()]).then(([orders, payments]) => {
            setOrders(orders);
            setPayments(payments);
            setLoading(false);
        });
    }, []);

    function sortOrders(list: Order[], paymentsList: Payment[], orderBy: string, order: SortOrder) {
        return [...list].sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (orderBy) {
                case "user":
                    aValue = a.user;
                    bValue = b.user;
                    break;
                case "total":
                    aValue = a.total;
                    bValue = b.total;
                    break;
                case "status":
                    aValue = a.status;
                    bValue = b.status;
                    break;
                case "date":
                    aValue = a.date;
                    bValue = b.date;
                    break;
                case "local":
                    aValue = (a as any).local ?? "";
                    bValue = (b as any).local ?? "";
                    break;
                case "method":
                    aValue = paymentsList.find((p) => p.id === a.id.toString())?.method ?? "";
                    bValue = paymentsList.find((p) => p.id === b.id.toString())?.method ?? "";
                    break;
                default:
                    aValue = a.date;
                    bValue = b.date;
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
                return order === "asc" ? aValue - bValue : bValue - aValue;
            }

            return order === "asc"
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
    }

    const handleOpenModal = (payment: Payment) => {
        setSelectedPayment(payment);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedPayment(null);
    };

    const handleSort = (property: string) => {
        const isAsc = orderBy === property && orderDirection === "asc";
        setOrderDirection(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const filteredOrders =
        filterStatus === "Todos" ? orders : orders.filter((o) => o.status === filterStatus);

    const sortedOrders = sortOrders(filteredOrders, payments, orderBy, orderDirection);

    return (
        <PageContainer>
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <Header />

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
                    <div className="mb-4 w-48">
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filterStatus}
                                label="Status"
                                onChange={(e) => setFilterStatus(e.target.value as Order["status"] | "Todos")}
                            >
                                <MenuItem value="Todos">Todos</MenuItem>
                                <MenuItem value="Novo">Novo</MenuItem>
                                <MenuItem value="Em preparo">Em preparo</MenuItem>
                                <MenuItem value="Enviado">Enviado</MenuItem>
                                <MenuItem value="Entregue">Entregue</MenuItem>
                                <MenuItem value="Cancelado">Cancelado</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {loading ? (
                        <TableSkeleton />
                    ) : (
                        <Paper>
                            <Table>

                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === "user"}
                                                direction={orderBy === "user" ? orderDirection : "asc"}
                                                onClick={() => handleSort("user")}
                                            >
                                                Cliente
                                            </TableSortLabel>
                                        </TableCell>

                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === "total"}
                                                direction={orderBy === "total" ? orderDirection : "asc"}
                                                onClick={() => handleSort("total")}
                                            >
                                                Valor
                                            </TableSortLabel>
                                        </TableCell>

                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === "date"}
                                                direction={orderBy === "date" ? orderDirection : "asc"}
                                                onClick={() => handleSort("date")}
                                            >
                                                Data
                                            </TableSortLabel>
                                        </TableCell>

                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === "local"}
                                                direction={orderBy === "local" ? orderDirection : "asc"}
                                                onClick={() => handleSort("local")}
                                            >
                                                Endereço
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
                                    {sortedOrders.map((order, index) => {
                                        const payment = getPaymentForOrder(order.id);

                                        return (
                                            <MotionTableRow
                                                key={order.id}
                                                hover
                                                className="cursor-pointer"
                                                onClick={() => payment && handleOpenModal(payment)}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
                                            >
                                                <TableCell>{order.user}</TableCell>

                                                <TableCell>R$ {order.total.toFixed(2)}</TableCell>

                                                <TableCell>{order.date}</TableCell>

                                                <TableCell>{order.local}</TableCell>

                                                <TableCell>
                                                    <StatusBadge status={order.status} />
                                                </TableCell>
                                            </MotionTableRow>
                                        );
                                    })}
                                </TableBody>

                            </Table>
                        </Paper>
                    )}
                </div>
            </main>
            <PaymentDetailsModal open={openModal} payment={selectedPayment} onClose={handleCloseModal} />
        </PageContainer>
    );
}

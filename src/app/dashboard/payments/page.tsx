"use client";

import { useEffect, useState } from "react";
import { getPayments } from "@/services/api";
import { Payment } from "@/types/payment";
import { Table, TableBody, TableCell, TableHead, TableRow, Chip, Paper, TableSortLabel, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import PageContainer from "@/components/layout/pageContainer";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import PaymentDetailsModal from "@/components/ui/paymentsDetailsModal";

type Order = "asc" | "desc";

function getStatusColor(status: Payment["status"]) {
    switch (status) {
        case "Pago":
            return "success";
        case "Pendente":
            return "warning";
        case "Falha":
            return "error";
        default:
            return "default";
    }
}

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [orderBy, setOrderBy] = useState<keyof Payment>("date");
    const [orderDirection, setOrderDirection] = useState<Order>("asc");
    const [filterStatus, setFilterStatus] = useState<Payment["status"] | "Todos">("Todos");

    function sortPayments(
        payments: Payment[],
        orderBy: keyof Payment,
        order: Order
    ) {
        return [...payments].sort((a, b) => {
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
        getPayments().then(setPayments);
    }, []);
    const handleOpenModal = (payment: Payment) => {
        setSelectedPayment(payment);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedPayment(null);

    };
    const handleSort = (property: keyof Payment) => {
        const isAsc = orderBy === property && orderDirection === "asc";
        setOrderDirection(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const filteredPayments =
        filterStatus === "Todos"
            ? payments
            : payments.filter((p) => p.status === filterStatus);
    const sortedPayments = sortPayments(
        filteredPayments,
        orderBy,
        orderDirection
    );

    return (
        <PageContainer>
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <Header />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">
                        Pagamentos
                    </h1>
                    <div className="mb-4 w-48">
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filterStatus}
                                label="Status"
                                onChange={(e) => setFilterStatus(e.target.value as Payment["status"] | "Todos")}
                            >
                                <MenuItem value="Todos">Todos</MenuItem>
                                <MenuItem value="Pago">Pago</MenuItem>
                                <MenuItem value="Pendente">Pendente</MenuItem>
                                <MenuItem value="Falha">Falha</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

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
                                            Usuário
                                        </TableSortLabel>
                                    </TableCell>

                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "amount"}
                                            direction={orderBy === "amount" ? orderDirection : "asc"}
                                            onClick={() => handleSort("amount")}
                                        >
                                            Valor
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

                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "date"}
                                            direction={orderBy === "date" ? orderDirection : "asc"}
                                            onClick={() => handleSort("date")}
                                        >
                                            Data
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {sortedPayments.map((payment) => (
                                    <TableRow
                                        key={payment.id}
                                        hover
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleOpenModal(payment)
                                        }
                                    >
                                        <TableCell>
                                            {payment.user}
                                        </TableCell>
                                        <TableCell>
                                            R$ {payment.amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={payment.status}
                                                color={getStatusColor(payment.status)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {payment.date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </main>
            <PaymentDetailsModal
                open={openModal}
                payment={selectedPayment}
                onClose={handleCloseModal}
            />
        </PageContainer>
    );
}

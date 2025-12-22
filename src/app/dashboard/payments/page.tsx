"use client";

import { useEffect, useState } from "react";
import { getPayments } from "@/services/api";
import { Payment } from "@/types/payment";

import PageContainer from "@/components/layout/pageContainer";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Paper,
} from "@mui/material";

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

    useEffect(() => {
        getPayments().then(setPayments);
    }, []);

    return (
        <PageContainer>
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <Header />

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Pagamentos</h1>

                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Usuário</TableCell>
                                    <TableCell>Valor</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Data</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>{payment.user}</TableCell>
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
                                        <TableCell>{payment.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </main>
        </PageContainer>
    );
}

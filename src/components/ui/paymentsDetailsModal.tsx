"use client";

import { Payment } from "@/types/payment";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Chip,
} from "@mui/material";

type Props = {
    payment: Payment | null;
    open: boolean;
    onClose: () => void;
};

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

export default function PaymentDetailsModal({
    payment,
    open,
    onClose,
}: Props) {
    if (!payment) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalhes do Pagamento</DialogTitle>

            <DialogContent className="space-y-4">
                <div>
                    <strong>ID:</strong> {payment.id}
                </div>

                <div>
                    <strong>Usuário:</strong> {payment.user}
                </div>

                <div>
                    <strong>Valor:</strong> R$ {payment.amount.toFixed(2)}
                </div>

                <div>
                    <strong>Status:</strong>{" "}
                    <Chip
                        label={payment.status}
                        color={getStatusColor(payment.status)}
                        size="small"
                    />
                </div>

                <div>
                    <strong>Data:</strong> {payment.date}
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}
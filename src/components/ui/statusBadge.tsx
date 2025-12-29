import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";


type Props = {
    status: "Novo" | "Em preparo" | "Enviado" | "Entregue" | "Cancelado";
};

export default function StatusBadge({ status }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [status]);

    const colors = {
        Novo: "bg-blue-100 text-blue-800",
        "Em preparo": "bg-yellow-100 text-yellow-800",
        Enviado: "bg-indigo-100 text-indigo-800",
        Entregue: "bg-green-100 text-green-800",
        Cancelado: "bg-red-100 text-red-800",
    };

    return (

        <span
            className={clsx(
                `
        px-3 py-1 rounded-full text-sm font-medium
        transition-all duration-500 ease-out
        shadow-sm hover:shadow-md
        hover:scale-[1.03]
        opacity-0 translate-y-1`,
                mounted && "opacity-100 translate-y-0",
                colors[status]
            )}
        >
            {status}
        </span>
    );
}

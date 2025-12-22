"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <header className="bg-gray-200 shadow-md flex justify-end items-center p-4">
            <div className="mr-4 text-gray-700">{user?.name}</div>
            <Button variant="outlined" onClick={handleLogout} size="small">
                Sair
            </Button>
        </header>
    );
}

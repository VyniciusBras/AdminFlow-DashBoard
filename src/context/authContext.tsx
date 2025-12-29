"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AuthUser = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("adminflow:user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    async function login(email: string, password: string) {

        if (!email || !password) {
            throw new Error("Credenciais inválidas");
        }

        const fakeUser: AuthUser = {
            id: "1",
            name: "AdminUser",
            email,
        };

        setUser(fakeUser);

        localStorage.setItem("adminflow:user", JSON.stringify(fakeUser));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("adminflow:user");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }

    return context;
}

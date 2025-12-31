"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Paper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useAuth } from "@/context/authContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Email ou senha inválidos!";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Paper elevation={5} className="p-8 w-full max-w-md">
                <Typography variant="h5" sx={{ marginBottom: 4 }} className="mb-6 text-center">
                    AdminFlow
                </Typography>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />

                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

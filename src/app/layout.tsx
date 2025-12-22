import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "AdminFlow",
  description: "Dashboard administrativo em Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Pagamentos", path: "/dashboard/payments" },
    { name: "Pedidos", path: "/dashboard/orders" }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-900 shadow-md sticky top-0 flex flex-col p-4 max-h-screen overflow-y-auto">
            <div className="flex items-center mb-2">
                <Image
                    src="/images/logo.png"
                    alt="AdminFlow Logo"
                    width={70}
                    height={70}
                    className="mr-2"
                />
                <h2 className="text-xl font-bold text-white">
                    Admin
                    <span className="text-cyan-300">Flow</span>
                </h2>
            </div>

            <nav className="flex flex-col gap-3">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        href={link.path}
                        className={`px-3 py-2 rounded ${pathname === link.path
                            ? "bg-gray-600 text-white"
                            : "text-gray-400 hover:bg-gray-500"
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

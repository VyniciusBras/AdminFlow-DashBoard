"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Pagamentos", path: "/dashboard/payments" },
    { name: "Pedidos", path: "/dashboard/orders" }
];


export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-900 shadow-md h-screen flex flex-col p-6">
            <h2 className="text-xl font-bold mb-8 text-white">AdminFlow</h2>
            <nav className="flex flex-col gap-3">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        href={link.path}
                        className={`px-3 py-2 rounded ${pathname === link.path ? "bg-gray-600 text-white" : "text-gray-400 hover:bg-gray-500"}`

                        }
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Pagamentos", path: "/dashboard/payments" },
];


export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white shadow-md h-screen flex flex-col p-4">
            <h2 className="text-xl font-bold mb-8 text-black">AdminFlow</h2>
            <nav className="flex flex-col gap-4">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        href={link.path}
                        className={`px-3 py-2 rounded ${pathname === link.path ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

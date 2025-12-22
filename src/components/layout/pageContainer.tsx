"use client";

import { ReactNode } from "react";

type PageContainerProps = {
    children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
    return (
        <div className="flex flex-1 min-h-screen bg-gray-100 text-black">
            {children}
        </div>
    );
}

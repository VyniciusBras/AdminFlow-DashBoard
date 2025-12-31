"use client";

import { ReactNode } from "react";

type PageContainerProps = {
    children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
    return (
        <div className="flex bg-gray-100 text-black min-h-screen">
            {children}
        </div>
    );
}

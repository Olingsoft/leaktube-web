"use client";

import { usePathname } from "next/navigation";

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");

    return (
        <main className={`${isAdminPath ? "" : "pt-20"} min-h-screen`}>
            {children}
        </main>
    );
}

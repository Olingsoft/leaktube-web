"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");

    if (isAdminPath) return null;

    return <Header />;
}

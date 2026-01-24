"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { getApiUrl } from "@/utils/api";

// Define the shape of a category from the API
interface Category {
    _id: string;
    name: string;
    description?: string;
}

// Define the shape of a sidebar menu item
interface SidebarItem {
    name?: string;
    href?: string;
    type?: "divider";
}

const staticMenu: SidebarItem[] = [
    { name: "All Videos", href: "/" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(getApiUrl('/api/categories'));
                const data = await response.json();
                if (data.success) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Combine static menu with dynamic categories
    // We treat dynamic categories as links to /?category=Name or similar. 
    // Since we don't have specific category pages yet, we'll use a query param pattern which is common.
    // Or if the user prefers /category/name, we can use that. 
    // Given the previous hardcoded values were /music, we'll try to preserve that simplicity 
    // by using /category/name (and assuming a route will catch it) or just /?category=name.
    // Let's use /?category=Name to be safe with the current page.tsx structure potentially serving it.

    const menuItems: SidebarItem[] = [
        ...staticMenu,
        ...(categories.length > 0 ? [{ type: "divider" } as SidebarItem] : []),
        ...categories.map(cat => ({
            name: cat.name,
            href: `/?category=${encodeURIComponent(cat.name)}`
        }))
    ];

    return (
        <aside className="fixed left-6 top-24 bottom-6 w-64 hidden lg:block z-40">
            <div className="h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
                    {menuItems.map((item, index) => {
                        if (item.type === "divider") {
                            return <div key={index} className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4 mx-4" />;
                        }

                        const isActive = (item.name === "Home" && pathname === "/" && !currentCategory) ||
                            (currentCategory && currentCategory === item.name);

                        return (
                            <Link
                                key={index}
                                href={item.href!}
                                className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-300 group relative ${isActive
                                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-6 bg-[#1B3C53] rounded-r-full shadow-[0_0_10px_#1B3C53]" />
                                )}
                                <span className={`font-semibold text-sm tracking-wide transition-all duration-300 ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
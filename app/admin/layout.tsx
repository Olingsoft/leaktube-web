"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    Video,
    Users,
    Settings,
    BarChart3,
    ShieldAlert,
    LogOut,
    Menu,
    X,
    Bell,
    Layers
} from "lucide-react";
import { useState } from "react";

const adminNavItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "Categories", icon: Layers, href: "/admin/category" },
    { name: "Add Content", icon: PlusCircle, href: "/admin/add-content" },
    { name: "Manage Videos", icon: Video, href: "/admin/videos" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { name: "Reports", icon: ShieldAlert, href: "/admin/reports" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            {/* Sidebar Desktop */}
            <aside className="fixed left-0 top-0 bottom-0 w-72 hidden lg:flex flex-col bg-[#0f0f0f] border-r border-white/5 z-50">
                <div className="p-8">
                    <div className="flex items-center space-x-3 mb-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#1B3C53] to-[#1B3C53] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(27,60,83,0.3)]">
                            <span className="font-black text-xl">L</span>
                        </div>
                        <span className="font-extrabold text-xl tracking-tight">Admin<span className="text-[#1B3C53]">Panel</span></span>
                    </div>

                    <nav className="space-y-2">
                        {adminNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${isActive
                                        ? "bg-white/10 text-white shadow-lg"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? "text-[#1B3C53]" : "group-hover:text-[#1B3C53]"}`} />
                                    <span className="font-semibold text-sm">{item.name}</span>
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1B3C53] shadow-[0_0_10px_#1B3C53]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-8 space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 border border-white/10" />
                            <div>
                                <p className="text-xs font-bold text-white">Admin User</p>
                                <p className="text-[10px] text-white/40">Super Admin</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center space-x-2 py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-colors rounded-xl text-xs font-bold text-white/60">
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 z-50">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#1B3C53] to-[#1B3C53] rounded-lg flex items-center justify-center">
                        <span className="font-black text-sm text-white">L</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight">Admin</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 bg-white/5 rounded-lg text-white"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={() => setIsMobileMenuOpen(false)}>
                    <div
                        className="absolute right-0 top-0 bottom-0 w-72 bg-[#0f0f0f] p-8 flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-10">
                            <span className="font-extrabold text-xl tracking-tight text-white">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="w-6 h-6 text-white/40" />
                            </button>
                        </div>

                        <nav className="space-y-2">
                            {adminNavItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive
                                            ? "bg-white/10 text-white"
                                            : "text-white/40"
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? "text-[#1B3C53]" : ""}`} />
                                        <span className="font-semibold text-sm">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen relative">
                {/* Topbar */}
                <header className="hidden lg:flex h-20 items-center justify-between px-10 border-b border-white/5 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-xl z-40">
                    <div>
                        <h1 className="text-xl font-bold text-white uppercase tracking-widest text-[10px] opacity-40 mb-1">Dashboard</h1>
                        <p className="text-lg font-extrabold text-white">Welcome back, Admin</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="relative p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group">
                            <Bell className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#1B3C53] rounded-full border-2 border-[#0a0a0a]" />
                        </button>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <p className="text-xs font-bold text-white">0xAdmin</p>
                                <p className="text-[10px] text-green-400 font-bold flex items-center justify-end">
                                    <span className="w-1 h-1 bg-green-400 rounded-full mr-1" />
                                    Online
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B3C53] to-[#1B3C53] p-[1px]">
                                <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center p-1">
                                    <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                                        <Users className="w-5 h-5 text-white/40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="pt-24 lg:pt-10 px-6 lg:px-10 pb-10">
                    {children}
                </div>
            </main>
        </div>
    );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, Bell, User, PlusCircle, ListFilter } from "lucide-react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-3 ${scrolled
                ? "bg-[#0a0a0a]/60 backdrop-blur-2xl border-b border-white/5 py-2 shadow-2xl"
                : "bg-transparent py-4"
                }`}
        >
            <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-8">
                {/* Logo Section */}
                <Link href="/" className="flex items-center group flex-shrink-0">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1B3C53] to-[#1B3C53] rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                        <h1 className="text-2xl font-bold text-white">Leak<span className="text-[#D02752]">Tube</span></h1>
                    </div>
                </Link> 

                {/* Search Bar - Center */}
                <div className="flex-1 max-w-2xl hidden md:block group">
                    <div className="relative flex items-center transition-all duration-300">
                        <div className="absolute inset-0 bg-white/5 rounded-2xl blur-sm group-focus-within:bg-white/10 transition-all duration-300" />
                        <div className="relative flex items-center w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 group-focus-within:border-white/20 group-hover:border-white/20 transition-all duration-300">
                            <Search className="w-5 h-5 text-white/40 group-focus-within:text-white/80 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search premium content..."
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/40 px-3 text-sm"
                            />
                            <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] text-white/30 group-focus-within:opacity-0 transition-opacity">
                                <span>/</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center">
                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="hidden lg:flex items-center space-x-2 text-white/70 hover:text-white transition-colors group">
                            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            <span className="text-sm font-semibold">Upload</span>
                        </button>

                        <div className="flex items-center space-x-5 border-l border-white/10 pl-6">
                            <button className="relative text-white/70 hover:text-white transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#1B3C53] rounded-full border-2 border-[#0a0a0a]" />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-gradient-to-br from-white/10 to-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg">
                                <User className="w-5 h-5" />
                            </button>
                        </div>

                        <button className="bg-gradient-to-r from-[#1B3C53] to-[#1B3C53] text-white px-6 py-2 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(27,60,83,0.4)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-xl">
                            Go Pro
                        </button>
                    </div>

                    {/* Mobile Only: List Filter Icon */}
                    <button className="md:hidden text-white/70 hover:text-white p-2 transition-colors">
                        <ListFilter className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
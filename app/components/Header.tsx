"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Bell, User, PlusCircle, ListFilter, X, BookOpen, Home, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-3 ${scrolled
                    ? "bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5 py-2 shadow-2xl"
                    : "bg-transparent py-4"
                    }`}
            >
                <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-8">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center group flex-shrink-0 relative z-50">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#1B3C53] to-[#1B3C53] rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                            <h1 className="text-2xl font-bold text-white">💦Unite<span className="text-[#e15aed]">Kenyans</span><span className="text-xs">.co.ke</span></h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`text-sm font-bold uppercase tracking-widest transition-colors ${pathname === '/' ? 'text-[#D02752]' : 'text-white/60 hover:text-[#D02752]'}`}
                        >
                            <span className="flex items-center"><Home className="w-4 h-4 mr-2" /> Videos</span>
                        </Link>
                        <Link
                            href="/blogs"
                            className={`text-sm font-bold uppercase tracking-widest transition-colors ${pathname.startsWith('/blogs') ? 'text-[#D02752]' : 'text-white/60 hover:text-[#D02752]'}`}
                        >
                            <span className="flex items-center"><BookOpen className="w-4 h-4 mr-2" /> Blogs</span>
                        </Link>
                    </div>



                    {/* Right Actions */}
                    <div className="flex items-center relative z-50">
                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center space-x-6">


                            <div className="flex items-center space-x-5 border-l border-white/10 pl-6">
                                <button className="relative text-white/70 hover:text-white transition-colors">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#1B3C53] rounded-full border-2 border-[#0a0a0a]" />
                                </button>
                                <button className="w-9 h-9 rounded-full bg-gradient-to-br from-white/10 to-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg">
                                    <User className="w-5 h-5" />
                                </button>
                            </div>


                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-white/70 hover:text-white p-2 transition-colors relative z-50"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <ListFilter className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[#0a0a0a] z-40 transition-transform duration-500 ease-out md:hidden flex flex-col pt-24 px-6 gap-8 overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Mobile Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:bg-white/10"
                    />
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 ml-4">Menu</p>
                    <Link
                        href="/"
                        className={`flex items-center p-4 rounded-2xl transition-all ${pathname === '/' ? 'bg-[#1B3C53] text-white shadow-lg' : 'text-white/60 hover:bg-white/5 hover:text-[#D02752]'}`}
                    >
                        <Home className="w-5 h-5 mr-4" />
                        <span className="font-bold">Home</span>
                    </Link>
                    <Link
                        href="/blogs"
                        className={`flex items-center p-4 rounded-2xl transition-all ${pathname.startsWith('/blogs') ? 'bg-[#1B3C53] text-white shadow-lg' : 'text-white/60 hover:bg-white/5 hover:text-[#D02752]'}`}
                    >
                        <BookOpen className="w-5 h-5 mr-4" />
                        <span className="font-bold">Blogs</span>
                    </Link>

                </div>

                {/* Divider */}
                <div className="h-px bg-white/5" />

                {/* User Actions */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 ml-4">Account</p>
                    <button className="w-full flex items-center p-4 rounded-2xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
                        <User className="w-5 h-5 mr-4" />
                        <span className="font-bold">Profile</span>
                    </button>
                    <button className="w-full flex items-center p-4 rounded-2xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
                        <Bell className="w-5 h-5 mr-4" />
                        <span className="font-bold">Notifications</span>
                    </button>
                    <button className="w-full flex items-center p-4 rounded-2xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
                        <Settings className="w-5 h-5 mr-4" />
                        <span className="font-bold">Settings</span>
                    </button>
                </div>


            </div>
        </>
    );
}

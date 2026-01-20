"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const categories = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Subscriptions", href: "/subscriptions" },
    { type: "divider" },
    { name: "Library", href: "/library" },
    { name: "History", href: "/history" },
    { name: "Watch Later", href: "/watch-later" },
    { name: "Liked Videos", href: "/liked" },
    { type: "divider" },
    { name: "Trending", href: "/trending" },
    { name: "Music", href: "/music" },
    { name: "Gaming", href: "/gaming" },
    { name: "Sports", href: "/sports" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-6 top-24 bottom-6 w-64 hidden lg:block z-40">
            <div className="h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
                    {categories.map((item, index) => {
                        if (item.type === "divider") {
                            return <div key={index} className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4 mx-4" />;
                        }

                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href!}
                                className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-300 group relative ${isActive
                                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-6 bg-[#FF2C80] rounded-r-full shadow-[0_0_10px_#FF2C80]" />
                                )}
                                <span className={`font-semibold text-sm tracking-wide transition-all duration-300 ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Premium Upgrade Card */}
                <div className="p-4 m-4 bg-gradient-to-br from-[#FF2C80]/10 to-transparent border border-white/5 rounded-3xl relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#FF2C80]/20 blur-2xl group-hover:bg-[#FF2C80]/30 transition-colors" />
                    <p className="text-white text-xs font-black tracking-widest uppercase mb-1">LeakTube+</p>
                    <p className="text-white/40 text-[10px] leading-relaxed mb-3">No ads. Original series. Exclusive perks.</p>
                    <button className="w-full py-2 bg-white text-[#0a0a0a] rounded-xl text-[10px] font-extrabold uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                        Upgrade Now
                    </button>
                </div>

                {/* Sidebar Ad Slot */}
                <div className="mx-4 mb-6 p-4 rounded-3xl bg-white/[0.02] border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer shadow-inner">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <div className="w-4 h-4 border border-white/10 rounded-sm rotate-45" />
                    </div>
                    <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Ad space</p>
                </div>
            </div>
        </aside>
    );
}
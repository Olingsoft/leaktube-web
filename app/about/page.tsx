"use client";

import React from "react";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <header className="space-y-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                        About <span className="text-[#e15aed]">Us</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-[#e15aed] rounded-full mx-auto shadow-[0_0_15px_rgba(225,90,237,0.5)]" />
                </header>

                <section className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden group hover:border-[#e15aed]/30 transition-colors duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#e15aed]/5 blur-[100px] -mr-32 -mt-32" />

                    <div className="space-y-8 relative z-10">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#e15aed]/20 flex items-center justify-center text-[#e15aed] text-xs">01</span>
                                Who We Are
                            </h2>
                            <p className="text-white/60 leading-relaxed text-lg italic">
                                Unite Kenyans (Kuunganisha Wakenya) is more than just a platform; it's a digital bridge for the Kenyan community. We focus on bringing transparency to trending topics, viral stories, and social issues that matter to our nation.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#e15aed]/20 flex items-center justify-center text-[#e15aed] text-xs">02</span>
                                Our Mission
                            </h2>
                            <p className="text-white/60 leading-relaxed text-lg">
                                Our mission is to foster digital awareness and provide a secure space for Kenyans to stay informed about viral trends while respecting digital safety and community standards. We believe in information that connects, not exploits.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-[#e15aed]/20 flex items-center justify-center text-[#e15aed] text-xs">03</span>
                                Community First
                            </h2>
                            <p className="text-white/60 leading-relaxed text-lg">
                                We are committed to building a community where truth is prioritized and digital rights are respected. Every piece of content is curated to ensure it adds value to the Kenyan digital landscape.
                            </p>
                        </div>
                    </div>
                </section>

                <footer className="text-center text-white/30 text-sm font-bold tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} Unite Kenyans &bull; Kuunganisha Wakenya
                </footer>
            </div>
        </div>
    );
}

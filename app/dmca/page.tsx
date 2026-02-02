"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function DMCAPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <header className="space-y-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                        DMCA <span className="text-[#e15aed]">Notice</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-[#e15aed] rounded-full mx-auto shadow-[0_0_15px_rgba(225,90,237,0.5)]" />
                </header>

                <section className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                    <div className="space-y-12 relative z-10">
                        <div className="flex items-center gap-6 p-6 bg-[#e15aed]/10 border border-[#e15aed]/20 rounded-3xl">
                            <Shield className="w-12 h-12 text-[#e15aed] shrink-0" />
                            <p className="text-white font-bold leading-relaxed">
                                Unite Kenyans respects the intellectual property rights of others and expects its users to do the same.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">Takedown Requests</h2>
                            <p className="text-white/60 leading-relaxed">
                                If you are a copyright owner, or are authorized to act on behalf of one, please report alleged copyright infringements taking place on or through the Site by completing a DMCA Notice and delivering it to our team.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">Information Required</h2>
                            <ul className="list-disc list-inside text-white/60 space-y-2">
                                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                                <li>Identification of the material that is claimed to be infringing.</li>
                                <li>Your contact information (address, telephone number, and email).</li>
                                <li>A statement of good faith belief.</li>
                            </ul>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <p className="text-white/40 text-sm italic">
                                Send DMCA requests to: <span className="text-[#e15aed] font-bold">dmca@unitekenyans.co.ke</span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

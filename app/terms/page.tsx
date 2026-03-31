"use client";

import React from "react";

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <header className="space-y-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                        Terms of <span className="text-[#e15aed]">Service</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-[#e15aed] rounded-full mx-auto shadow-[0_0_15px_rgba(225,90,237,0.5)]" />
                </header>

                <section className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                    <div className="space-y-12 relative z-10">
                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">01. Acceptance</h2>
                            <p className="text-white/60 leading-relaxed">
                                By accessing Live Football Streams, you agree to be bound by these terms. If you do not agree, please refrain from using our platform.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">02. Use License</h2>
                            <p className="text-white/60 leading-relaxed">
                                Permission is granted to temporarily view the materials (information or links) on the Live Football Streams website for personal, non-commercial transitory viewing only.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">03. Disclaimer</h2>
                            <p className="text-white/60 leading-relaxed">
                                The materials on Live Football Streams are provided on an 'as is' basis. Live Football Streams makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">04. Limitations</h2>
                            <p className="text-white/60 leading-relaxed">
                                In no event shall Live Football Streams or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on the Live Football Streams website.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

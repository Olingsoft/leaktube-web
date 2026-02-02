"use client";

import React from "react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <header className="space-y-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                        Privacy <span className="text-[#e15aed]">Policy</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-[#e15aed] rounded-full mx-auto shadow-[0_0_15px_rgba(225,90,237,0.5)]" />
                </header>

                <section className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                    <div className="space-y-12 relative z-10">
                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">Privacy Matters</h2>
                            <p className="text-white/60 leading-relaxed">
                                Your privacy is important to us. It is Unite Kenyans policy to respect your privacy regarding any information we may collect from you across our website.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">Data Collection</h2>
                            <p className="text-white/60 leading-relaxed">
                                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">Storage & Security</h2>
                            <p className="text-white/60 leading-relaxed">
                                We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#e15aed]">Cookies</h2>
                            <p className="text-white/60 leading-relaxed">
                                We use cookies to improve your experience on our site. These cookies are used for analytics and to remember your preferences.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

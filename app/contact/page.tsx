"use client";

import React from "react";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <header className="space-y-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                        Contact <span className="text-[#e15aed]">Us</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-[#e15aed] rounded-full mx-auto shadow-[0_0_15px_rgba(225,90,237,0.5)]" />
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-3xl shadow-2xl space-y-8">
                        <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-[#e15aed]/10 flex items-center justify-center text-[#e15aed] group-hover:bg-[#e15aed] group-hover:text-white transition-all">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white/30 text-xs font-black uppercase tracking-widest">Email Us</p>
                                    <p className="text-white font-bold">contact@unitekenyans.co.ke</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-[#e15aed]/10 flex items-center justify-center text-[#e15aed] group-hover:bg-[#e15aed] group-hover:text-white transition-all">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white/30 text-xs font-black uppercase tracking-widest">Feedback</p>
                                    <p className="text-white font-bold">Community Discord</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-[#e15aed]/10 flex items-center justify-center text-[#e15aed] group-hover:bg-[#e15aed] group-hover:text-white transition-all">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white/30 text-xs font-black uppercase tracking-widest">Location</p>
                                    <p className="text-white font-bold">Nairobi, Kenya</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <form className="bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-3xl shadow-2xl space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-2">Name</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#e15aed]/50 transition-colors" placeholder="Your Name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-2">Email</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#e15aed]/50 transition-colors" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-2">Message</label>
                            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#e15aed]/50 transition-colors resize-none" placeholder="What's on your mind?" />
                        </div>
                        <button className="w-full py-4 bg-[#e15aed] text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#e15aed]/80 hover:shadow-[0_0_20px_rgba(225,90,237,0.3)] transition-all active:scale-95">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

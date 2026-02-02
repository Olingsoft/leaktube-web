"use client";

import Link from "next/link";
import { Twitter, Instagram, Youtube, Mail, MapPin, Phone, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-20 bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 px-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e15aed]/5 blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1B3C53]/5 blur-[120px] translate-y-1/2 pointer-events-none" />

            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="group inline-block">
                            <h2 className="text-2xl font-bold text-white">
                                Unite<span className="text-[#e15aed]">Kenyans</span>
                                <span className="text-xs ml-1">.co.ke</span>
                            </h2>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            Connecting Kenyans through information, transparency, and digital awareness. Stay updated with the latest trends and stories across the nation.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#e15aed] hover:border-[#e15aed]/30 hover:bg-[#e15aed]/5 transition-all group">
                                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#e15aed] hover:border-[#e15aed]/30 hover:bg-[#e15aed]/5 transition-all group">
                                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#e15aed] hover:border-[#e15aed]/30 hover:bg-[#e15aed]/5 transition-all group">
                                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Navigation</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-white/60 hover:text-[#e15aed] transition-colors text-sm font-bold flex items-center group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#e15aed] mr-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    Videos
                                </Link>
                            </li>
                            <li>
                                <Link href="/blogs" className="text-white/60 hover:text-[#e15aed] transition-colors text-sm font-bold flex items-center group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#e15aed] mr-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-white/60 hover:text-[#e15aed] transition-colors text-sm font-bold flex items-center group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#e15aed] mr-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    Help Center (FAQ)
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Information Links */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Company</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-white/60 hover:text-[#e15aed] transition-colors text-sm font-bold">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white/60 hover:text-[#e15aed] transition-colors text-sm font-bold">Contact Support</Link>
                            </li>
                            <li>
                                <Link href="/dmca" className="text-white/60 hover:text-[#e15aed] transition-colors text-sm font-bold">DMCA Takedowns</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Contact</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-[#e15aed] shrink-0" />
                                <span className="text-white/60 text-sm font-bold">support@unitekenyans.co.ke</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#e15aed] shrink-0" />
                                <span className="text-white/60 text-sm font-bold">Nairobi, Kenya</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Unite Kenyans. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="/terms" className="text-white/20 hover:text-white/40 transition-colors text-[10px] font-black uppercase tracking-widest">Terms of Service</Link>
                        <Link href="/privacy" className="text-white/20 hover:text-white/40 transition-colors text-[10px] font-black uppercase tracking-widest">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

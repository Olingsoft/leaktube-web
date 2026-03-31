"use client";

import React from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQPage() {
    const faqs = [
        {
            q: "What is Live Football Streams?",
            a: "Live Football Streams is a platform dedicated to providing live soccer streaming, match highlights, and sports news."
        },
        {
            q: "Are the streams official?",
            a: "We curate links to live sports events from various sources across the web. We do not host the streams ourselves."
        },
        {
            q: "How can I request a match stream?",
            a: "If a match isn't listed, you can suggest it or let us know via our contact page."
        },
        {
            q: "Is it free to watch?",
            a: "Yes, our goal is to provide accessible sports content for fans worldwide."
        },
        {
            q: "How do I report a broken link?",
            a: "You can use the contact us page or email us directly if a stream is not working or for DMCA concerns."
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <header className="space-y-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                        F.A.<span className="text-[#e15aed]">Q</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-[#e15aed] rounded-full mx-auto shadow-[0_0_15px_rgba(225,90,237,0.5)]" />
                </header>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#e15aed]/30 transition-colors">
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                <div className="flex items-center gap-4">
                                    <HelpCircle className="w-5 h-5 text-[#e15aed]" />
                                    <span className="font-bold text-white text-lg">{faq.q}</span>
                                </div>
                                <ChevronDown className="w-5 h-5 text-white/30 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-4">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}

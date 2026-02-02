"use client";

import React from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQPage() {
    const faqs = [
        {
            q: "What is Unite Kenyans?",
            a: "Unite Kenyans is a portal for trending and viral content in Kenya, focusing on digital awareness and community discussions."
        },
        {
            q: "Is the content verified?",
            a: "We curate content from various sources. While we strive for accuracy, we encourage users to verify viral trends independently."
        },
        {
            q: "How can I submit content?",
            a: "Currently, content is curated by our team. However, you can suggest trends via our contact page."
        },
        {
            q: "What are the community rules?",
            a: "We advocate for respectful discussion, digital safety, and zero tolerance for harassment or exploitation."
        },
        {
            q: "How do I report a video?",
            a: "You can use the report button on the watch page or email us directly for DMCA/Privacy concerns."
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

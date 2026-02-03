"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { X } from "lucide-react";

export default function InVideoAd() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show the ad after a short delay to ensure it doesn't block the initial player load
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <div className="relative pointer-events-auto animate-in fade-in zoom-in duration-500">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D02752]/20 to-[#1B3C53]/20 rounded-2xl blur-xl opacity-50"></div>

                {/* Ad Container */}
                <div className="relative bg-black/95 border border-white/10 rounded-[2.5rem] p-6 shadow-2xl backdrop-blur-2xl flex flex-col items-center">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#D02752] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-[110]"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col items-center">
                        <div className="mb-4">
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Sponsored Content</span>
                        </div>

                        {/* JuicyAds Container (308x286) */}
                        <div className="min-w-[308px] min-h-[286px] bg-black/60 rounded-3xl overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
                            <ins id="1110438" data-width="308" data-height="286"></ins>

                            <Script
                                id="juicyads-invideo-script-1"
                                type="text/javascript"
                                data-cfasync="false"
                                async
                                src="https://poweredby.jads.co/js/jads.js"
                            />
                            <Script
                                id="juicyads-invideo-script-2"
                                type="text/javascript"
                                data-cfasync="false"
                                async
                                dangerouslySetInnerHTML={{
                                    __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110438});"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

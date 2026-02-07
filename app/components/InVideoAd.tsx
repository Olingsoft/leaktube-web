"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Script from "next/script";

export default function InVideoAd() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000); // Show after 3 seconds
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="absolute inset-x-0 bottom-4 mx-auto w-[90%] md:w-[600px] z-[20] animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="relative p-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition group z-[30]"
                >
                    <X className="w-3 h-3 text-white/40 group-hover:text-white" />
                </button>

                <div className="flex items-center justify-center min-h-[286px] w-[308px] mx-auto">
                    <ins id="1110647" data-width="308" data-height="286"></ins>
                    <Script
                        id="juicyads-in-video-1"
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        src="https://poweredby.jads.co/js/jads.js"
                    />
                    <Script
                        id="juicyads-in-video-2"
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        dangerouslySetInnerHTML={{
                            __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110647});"
                        }}
                    />
                </div>
                <div className="absolute top-1 left-2 text-[8px] font-black uppercase text-white/20 tracking-widest">Sponsored</div>
            </div>
        </div>
    );
}

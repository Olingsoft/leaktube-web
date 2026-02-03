"use client";

import React from "react";
import Script from "next/script";

export default function VideoGridAd() {
    return (
        <div className="flex flex-col items-center justify-center p-3 rounded-3xl bg-white/5 border border-white/5 h-full min-h-[250px] relative group overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D02752]/10 to-[#1B3C53]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>

            <div className="relative flex flex-col items-center">
                {/* Ad Container (158x168) */}
                <div className="flex items-center justify-center rounded-2xl bg-black/40 overflow-hidden border border-white/5 p-2">
                    <ins id="1110436" data-width="158" data-height="168"></ins>

                    <Script
                        id="juicyads-grid-script-1"
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        src="https://poweredby.jads.co/js/jads.js"
                    />
                    <Script
                        id="juicyads-grid-script-2"
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        dangerouslySetInnerHTML={{
                            __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110436});"
                        }}
                    />
                </div>

                <div className="mt-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Suggested</span>
                </div>
            </div>
        </div>
    );
}

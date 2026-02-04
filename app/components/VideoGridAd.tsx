"use client";

import React from "react";
import Script from "next/script";

export default function VideoGridAd() {
    return (
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#151515] border border-white/5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
                <ins id="1110443" data-width="300" data-height="250"></ins>
                <Script
                    id="juicyads-grid-1"
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    src="https://poweredby.jads.co/js/jads.js"
                />
                <Script
                    id="juicyads-grid-2"
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    dangerouslySetInnerHTML={{
                        __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110443});"
                    }}
                />
            </div>
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold text-white/40 uppercase tracking-widest pointer-events-none">
                Sponsored
            </div>
        </div>
    );
}

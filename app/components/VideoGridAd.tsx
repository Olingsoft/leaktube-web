"use client";

import React from "react";
import Script from "next/script";

export default function VideoGridAd() {
    return (
<<<<<<< HEAD
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ maxWidth: '100%' }}>
                <ins id="1110436" data-width="158" data-height="168"></ins>

                <Script
                    id="juicyads-grid-script-1"
=======
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#151515] border border-white/5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
                <ins id="1110443" data-width="300" data-height="250"></ins>
                <Script
                    id="juicyads-grid-1"
>>>>>>> SEO-brch
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    src="https://poweredby.jads.co/js/jads.js"
                />
                <Script
<<<<<<< HEAD
                    id="juicyads-grid-script-2"
=======
                    id="juicyads-grid-2"
>>>>>>> SEO-brch
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    dangerouslySetInnerHTML={{
<<<<<<< HEAD
                        __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110436});"
                    }}
                />
            </div>
=======
                        __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110443});"
                    }}
                />
            </div>
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold text-white/40 uppercase tracking-widest pointer-events-none">
                Sponsored
            </div>
>>>>>>> SEO-brch
        </div>
    );
}

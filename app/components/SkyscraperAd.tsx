"use client";

import React from "react";
import Script from "next/script";

export default function SkyscraperAd() {
    return (
        <aside className="fixed left-6 top-24 bottom-6 w-48 hidden md:flex flex-col items-center z-40">
            <div className="h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center py-6 shadow-2xl w-full">
                <div className="mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Advertisement</span>
                </div>

                {/* Skyscraper Ad Container (160x600) */}
                <div className="flex items-center justify-center rounded-xl bg-black/40 overflow-hidden border border-white/5 p-1">
                    <ins id="1110440" data-width="160" data-height="600"></ins>

                    <Script
                        id="juicyads-skyscraper-script-1"
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        src="https://poweredby.jads.co/js/jads.js"
                    />
                    <Script
                        id="juicyads-skyscraper-script-2"
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        dangerouslySetInnerHTML={{
                            __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110440});"
                        }}
                    />
                </div>
            </div>
        </aside>
    );
}

"use client";

import React, { useEffect } from "react";
import Script from "next/script";

export default function HomeAdBanner() {
    return (
        <div className="w-full flex flex-col items-center justify-center mb-10 overflow-hidden">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D02752]/20 to-[#1B3C53]/20 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>

                <div className="relative flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    {/* Ad Container (300x100) */}
                    <div className="min-w-[300px] min-h-[100px] flex items-center justify-center rounded-xl bg-black/40 overflow-hidden border border-white/5">
                        {/* JuicyAds Code */}
                        <ins id="1110434" data-width="300" data-height="100"></ins>

                        <Script
                            id="juicyads-script-1"
                            type="text/javascript"
                            data-cfasync="false"
                            async
                            src="https://poweredby.jads.co/js/jads.js"
                        />
                        <Script
                            id="juicyads-script-2"
                            type="text/javascript"
                            data-cfasync="false"
                            async
                            dangerouslySetInnerHTML={{
                                __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110434});"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

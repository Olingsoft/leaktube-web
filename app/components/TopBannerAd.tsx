"use client";

import React from "react";
import Script from "next/script";

export default function TopBannerAd() {
    return (
        <div className="w-full flex justify-center mb-8 overflow-hidden px-4">
            <div className="relative group max-w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D02752]/10 to-[#1B3C53]/10 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>

                <div className="relative flex flex-col items-center bg-white/5 border border-white/10 rounded-xl p-2 backdrop-blur-sm">
                    {/* Ad Container */}
                    <div className="flex items-center justify-center rounded-lg bg-black/40 overflow-hidden border border-white/5">
                        <ins id="1110437" data-width="468" data-height="60"></ins>

                        <Script
                            id="juicyads-top-script-1"
                            type="text/javascript"
                            data-cfasync="false"
                            async
                            src="https://poweredby.jads.co/js/jads.js"
                        />
                        <Script
                            id="juicyads-top-script-2"
                            type="text/javascript"
                            data-cfasync="false"
                            async
                            dangerouslySetInnerHTML={{
                                __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110437});"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

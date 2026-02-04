"use client";

import React from "react";
import Script from "next/script";

export default function HomeAdBanner() {
    return (
        <div className="w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 min-h-[100px]">
            <ins id="1110438" data-width="728" data-height="90"></ins>
            <Script
                id="juicyads-home-banner-1"
                type="text/javascript"
                data-cfasync="false"
                async
                src="https://poweredby.jads.co/js/jads.js"
            />
            <Script
                id="juicyads-home-banner-2"
                type="text/javascript"
                data-cfasync="false"
                async
                dangerouslySetInnerHTML={{
                    __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110438});"
                }}
            />
        </div>
    );
}

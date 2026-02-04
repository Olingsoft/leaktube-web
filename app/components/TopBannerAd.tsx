"use client";

import React from "react";
import Script from "next/script";

export default function TopBannerAd() {
    return (
        <div className="w-full flex justify-center py-4">
            <div className="overflow-hidden rounded-xl bg-white/5 border border-white/5 max-w-full">
                <ins id="1110441" data-width="468" data-height="60"></ins>
                <Script
                    id="juicyads-top-banner-1"
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    src="https://poweredby.jads.co/js/jads.js"
                />
                <Script
                    id="juicyads-top-banner-2"
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    dangerouslySetInnerHTML={{
                        __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110441});"
                    }}
                />
            </div>
        </div>
    );
}

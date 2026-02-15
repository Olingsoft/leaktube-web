"use client";

import React from "react";
import Script from "next/script";

export default function TopBannerAd() {
    return (
        <div className="w-full flex justify-center items-center py-4 mb-4">
            <div className="w-full rounded-xl bg-white/5 border border-white/5 flex items-center justify-center overflow-visible min-h-[90px] px-2">
                <Script
                    id="juicyads-top-banner-1"
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    src="https://poweredby.jads.co/js/jads.js"
                />
                <ins 
                    id="1111203" 
                    data-width="728" 
                    data-height="90"
                    className="block w-full"
                    style={{
                        display: 'block',
                        width: '100%',
                        minHeight: '90px',
                        overflow: 'visible',
                        visibility: 'visible'
                    }}
                ></ins>
                <Script
                    id="juicyads-top-banner-2"
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    dangerouslySetInnerHTML={{
                        __html: "(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1111203});"
                    }}
                />
            </div>
        </div>
    );
}

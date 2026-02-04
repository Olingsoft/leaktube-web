"use client";

import React from "react";
import Script from "next/script";

export default function TopBannerAd() {
    return (
<<<<<<< HEAD
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden', marginTop: '10px', marginBottom: '30px' }}>
            <div style={{ maxWidth: '100%' }}>
                <ins id="1110437" data-width="468" data-height="60"></ins>

                <Script
                    id="juicyads-top-script-1"
=======
        <div className="w-full flex justify-center py-4">
            <div className="overflow-hidden rounded-xl bg-white/5 border border-white/5 max-w-full">
                <ins id="1110441" data-width="468" data-height="60"></ins>
                <Script
                    id="juicyads-top-banner-1"
>>>>>>> SEO-brch
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    src="https://poweredby.jads.co/js/jads.js"
                />
                <Script
<<<<<<< HEAD
                    id="juicyads-top-script-2"
=======
                    id="juicyads-top-banner-2"
>>>>>>> SEO-brch
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    dangerouslySetInnerHTML={{
<<<<<<< HEAD
                        __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110437});"
=======
                        __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110441});"
>>>>>>> SEO-brch
                    }}
                />
            </div>
        </div>
    );
}

"use client";

import React from "react";
import Script from "next/script";

export default function TopBannerAd() {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden', marginTop: '10px', marginBottom: '30px' }}>
            <div style={{ maxWidth: '100%' }}>
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
    );
}

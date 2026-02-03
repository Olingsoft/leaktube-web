"use client";

import React from "react";
import Script from "next/script";

export default function VideoGridAd() {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ maxWidth: '100%' }}>
                <ins id="1110436" data-width="158" data-height="168"></ins>

                <Script
                    id="juicyads-grid-script-1"
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    src="https://poweredby.jads.co/js/jads.js"
                />
                <Script
                    id="juicyads-grid-script-2"
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    dangerouslySetInnerHTML={{
                        __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110436});"
                    }}
                />
            </div>
        </div>
    );
}

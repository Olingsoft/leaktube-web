"use client";

import React from "react";
import Script from "next/script";

export default function HomeAdBanner() {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ maxWidth: '100%' }}>
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
    );
}

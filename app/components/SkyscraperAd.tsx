"use client";

import React from "react";
import Script from "next/script";

export default function SkyscraperAd() {
    return (
        <aside className="hidden md:block" style={{ position: 'fixed', left: '20px', top: '100px', zIndex: 40, maxWidth: 'calc(100% - 40px)' }}>
            <div style={{ overflow: 'hidden' }}>
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
        </aside>
    );
}

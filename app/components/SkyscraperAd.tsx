"use client";

import React from "react";
import Script from "next/script";

export default function SkyscraperAd({ side = 'left' }: { side?: 'left' | 'right' }) {
    const positionStyle: React.CSSProperties = {
        position: 'fixed',
        top: '100px',
        zIndex: 40,
        maxWidth: '160px',
        [side]: '20px'
    };

    return (
        <aside className="hidden lg:block print:hidden" style={positionStyle}>
            <div className="overflow-hidden rounded-lg bg-white/5 border border-white/5">
                <ins id="1110440" data-width="160" data-height="600"></ins>

                <Script
                    id={`juicyads-skyscraper-${side}-1`}
                    type="text/javascript"
                    data-cfasync="false"
                    async
                    src="https://poweredby.jads.co/js/jads.js"
                />
                <Script
                    id={`juicyads-skyscraper-${side}-2`}
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

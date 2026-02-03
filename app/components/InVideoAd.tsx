"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { X } from "lucide-react";

export default function InVideoAd() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ position: 'relative', pointerEvents: 'auto', maxWidth: '100%' }}>
                <button
                    onClick={() => setIsVisible(false)}
                    style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#D02752', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 110 }}
                >
                    <X size={16} />
                </button>

                <div>
                    <ins id="1110438" data-width="308" data-height="286"></ins>

                    <Script
                        id="juicyads-invideo-script-1"
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        src="https://poweredby.jads.co/js/jads.js"
                    />
                    <Script
                        id="juicyads-invideo-script-2"
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        dangerouslySetInnerHTML={{
                            __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110438});"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

"use client";

import React from "react";
import Script from "next/script";

export default function TopBannerAd() {
    return (
        <div className="w-full flex justify-center items-center py-4 mb-4 overflow-visible">
            <div className="w-full rounded-xl bg-white/5 border border-white/5 flex items-center justify-center overflow-visible min-h-[90px] px-2">
                <div className="ad-scale-container w-full flex justify-center items-center">
                    <style jsx>{`
                        .ad-scale-container {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        @media (max-width: 760px) {
                            .ad-scale-container {
                                transform: scale(0.9);
                                transform-origin: center center;
                            }
                        }
                        @media (max-width: 600px) {
                            .ad-scale-container {
                                transform: scale(0.8);
                            }
                        }
                        @media (max-width: 480px) {
                            .ad-scale-container {
                                transform: scale(0.65);
                            }
                        }
                        @media (max-width: 380px) {
                            .ad-scale-container {
                                transform: scale(0.55);
                            }
                        }
                    `}</style>
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
                        className="block"
                        style={{
                            display: 'block',
                            width: '728px',
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
        </div>
    );
}

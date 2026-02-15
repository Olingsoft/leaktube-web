"use client";

import React from "react";
import Script from "next/script";

export default function HomeAdBanner() {
    return (
        <div className="w-full flex flex-col items-center justify-center p-4 min-h-[100px] overflow-visible">
            <div className="relative w-full flex justify-center items-center overflow-visible" style={{ minHeight: '90px' }}>
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
                    <ins id="1110438" data-width="728" data-height="90"></ins>
                </div>
            </div>
            <Script
                id="juicyads-home-banner-1"
                type="text/javascript"
                data-cfasync="false"
                async
                src="https://poweredby.jads.co/js/jads.js"
            />
            <Script
                id="juicyads-home-banner-2"
                type="text/javascript"
                data-cfasync="false"
                async
                dangerouslySetInnerHTML={{
                    __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110438});"
                }}
            />
        </div>
    );
}

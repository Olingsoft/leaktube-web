"use client";

import Script from "next/script";

export default function MagSrvAd() {
    return (
        <>
            <Script
                strategy="lazyOnload"
                src="https://a.magsrv.com/ad-provider.js"
            />
            <div className="flex justify-center my-4 overflow-visible">
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
                    <ins className="eas6a97888e6" data-zoneid="5847386"></ins>
                </div>
            </div>
            <Script id="magsrv-init" strategy="lazyOnload">
                {`(window.AdProvider = window.AdProvider || []).push({"serve": {}});`}
            </Script>
        </>
    );
}

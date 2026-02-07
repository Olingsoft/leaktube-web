"use client";

import Script from "next/script";

export default function MagSrvAd() {
    return (
        <>
            <Script
                strategy="lazyOnload"
                src="https://a.magsrv.com/ad-provider.js"
            />
            <div className="flex justify-center my-4">
                <ins className="eas6a97888e6" data-zoneid="5847386"></ins>
            </div>
            <Script id="magsrv-init" strategy="lazyOnload">
                {`(window.AdProvider = window.AdProvider || []).push({"serve": {}});`}
            </Script>
        </>
    );
}

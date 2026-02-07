"use client";

import Script from "next/script";

export default function PemSrvAd() {
    return (
        <>
            <Script
                strategy="lazyOnload"
                src="https://a.pemsrv.com/ad-provider.js"
            />
            <div className="flex justify-center my-4">
                <ins className="eas6a97888e35" data-zoneid="5847392"></ins>
            </div>
            <Script id="pemsrv-init" strategy="lazyOnload">
                {`(window.AdProvider = window.AdProvider || []).push({"serve": {}});`}
            </Script>
        </>
    );
}

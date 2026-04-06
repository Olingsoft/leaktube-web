"use client";

import Script from "next/script";

export default function PopUnderAd() {
    return (
        <Script id="popunder-ad" strategy="afterInteractive">
            {`(function(s){s.dataset.zone='10835859',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
    );
}

"use client";

import Script from "next/script";

export default function JuicyAdsInterstitial() {
    return (
        <Script
            id="juicyads-native-interstitial"
            strategy="lazyOnload"
            src="https://js.juicyads.com/juicyads.native-ads.min.js"
            data-id="juicyads-native-ads"
            data-ad-zone="1110649"
            data-targets="a"
        />
    );
}

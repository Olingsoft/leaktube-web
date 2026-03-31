import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";
import MainContentWrapper from "./components/MainContentWrapper";
import Footer from "./components/Footer";
// import AgeVerificationModal from "./components/AgeVerificationModal";
import MagSrvAd from "./components/MagSrvAd";
import PemSrvAd from "./components/PemSrvAd";
import PopUnderAd from "./components/PopUnderAd";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Live Football Streams | Watch Matches & Highlights",
  description:
    "Watch live football streams, match highlights, and upcoming matches online for free. The ultimate destination for live soccer streaming and sports entertainment.",
  keywords: [
    "Live Football Streams",
    "Soccer Streaming",
    "Watch Live Matches",
    "Football Highlights",
    "Premier League Streams",
    "Champions League Streams",
    "Live Sports",
    "Upcoming Matches",
    "Free Football Streams"
  ],
  openGraph: {
    title: "Live Football Streams | Watch Live Matches",
    description:
      "Catch all the live football action online. Watch live matches, recent highlights, and stay updated on upcoming games. Your home for top-quality football streams.",
    url: "https://www.unitekenyans.co.ke/",
    siteName: "Live Football Streams",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Football Streams | Watch Matches",
    description:
      "Your ultimate hub for live football streaming, sports action, and match highlights.",
  },
  robots: {
    follow: true,
  },
  other: {
    "juicyads-site-verification": "57753ffadf9597cc22ba70b03558b031",
    "6a97888e-site-verification": "fc346fa70fdf32c5fe7d1b3c54876b4b",
    "clckd": "f7684647426dc88a8de9e08276f6397a",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-M1DKMDJFYV"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M1DKMDJFYV');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Live Football Streams",
                "url": "https://unitekenyans.co.ke",
                "sameAs": [
                  "https://x.com/uniteKenyans"
                ],
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://unitekenyans.co.ke/?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "SiteNavigationElement",
                    "position": 1,
                    "name": "Home",
                    "url": "https://unitekenyans.co.ke"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "Blogs",
                    "url": "https://unitekenyans.co.ke/blogs"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "About Us",
                    "url": "https://unitekenyans.co.ke/about"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "Contact Us",
                    "url": "https://unitekenyans.co.ke/contact"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 5,
                    "name": "FAQ",
                    "url": "https://unitekenyans.co.ke/faq"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 6,
                    "name": "Terms of Service",
                    "url": "https://unitekenyans.co.ke/terms"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 7,
                    "name": "Privacy Policy",
                    "url": "https://unitekenyans.co.ke/privacy"
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <AgeVerificationModal /> */}
        <HeaderWrapper />
        <MainContentWrapper>
          {children}
        </MainContentWrapper>
        <Footer />
        {/* <MagSrvAd /> */}
        {/* <PemSrvAd /> */}
        {/* <PopUnderAd /> */}
      </body>
    </html>
  );
}


// measure ment id G-M1DKMDJFYV
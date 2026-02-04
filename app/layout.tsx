import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";
import MainContentWrapper from "./components/MainContentWrapper";
import Footer from "./components/Footer";
import AgeVerificationModal from "./components/AgeVerificationModal";
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
  title: "Unite Kenyans (Kuunganisha Wakenya) | Kenya Viral & Trending Videos",
  description:
    "Unite Kenyans (Kuunganisha Wakenya) brings together trending and viral content in Kenya. Follow discussions around viral videos, online trends, social media stories, and digital awareness across Kenya.",
  keywords: [
    "Unite Kenyans",
    "Kuunganisha Wakenya",
    "Kenya viral videos",
    "Trending videos in Kenya",
    "Kenya social media trends",
    "Telegram trends Kenya",
    "Twitter Kenya trending",
    "Viral content Kenya",
    "Online privacy Kenya",
    "Digital awareness Kenya",
    "Leaked video rumors Kenya",
    "Kenya leaked videos"
  ],
  openGraph: {
    title: "Unite Kenyans | Kenya Viral & Trending Stories",
    description:
      "Discover Leaks content trending in Kenya — viral videos, social media discussions, and online awareness. Unite Kenyans connects Kenyans through information, not exploitation.",
    url: "https://www.unitekenyans.co.ke/",
    siteName: "Unite Kenyans",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unite Kenyans | Kuunganisha Wakenya",
    description:
      "Kenya’s hub for viral trends, social media discussions, and digital awareness.",
  },
  robots: {
    follow: true,
  },
  other: {
    "juicyads-site-verification": "57753ffadf9597cc22ba70b03558b031",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              "name": "Unite Kenyans",
              "url": "https://unitekenyans.co.ke",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AgeVerificationModal />
        <HeaderWrapper />
        <MainContentWrapper>
          {children}
        </MainContentWrapper>
        <Footer />
      </body>
    </html>
  );
}


// measure ment id G-M1DKMDJFYV
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";
import MainContentWrapper from "./components/MainContentWrapper";
import Footer from "./components/Footer";
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
    index: true,
    follow: true,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
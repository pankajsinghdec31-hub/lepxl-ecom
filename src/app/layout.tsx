import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SalePixel | Premium Shopify Design & Development Agency",
  description:
    "SalePixel specializes in custom Shopify store design, development, store redesigns, and conversion rate optimization (CRO) for D2C brands.",
  keywords: [
    "Shopify Agency",
    "Shopify Design",
    "Shopify Development",
    "Shopify Store Redesign",
    "Custom Shopify Development",
    "Shopify CRO",
    "Dropshipping Shopify Store",
  ],
  authors: [{ name: "Pankaj Singh" }],
  creator: "SalePixel",
  openGraph: {
    title: "SalePixel | Premium Shopify Design & Development Agency",
    description:
      "Beautiful, trustworthy, and conversion-focused Shopify stores designed and engineered for growing brands.",
    type: "website",
    locale: "en_US",
    siteName: "SalePixel",
  },
  metadataBase: new URL("https://salepxl.com"),
  verification: {
    other: {
      "facebook-domain-verification": "f7ap0qjveg1bmvgyntcvvtut3ytdi0",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-bg-dark text-text-light font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-text-light">
        <Navbar />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1570990667738831');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1570990667738831&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}

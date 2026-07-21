import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MainWrapper from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: "SalePixel | Premium Shopify Design & Development Agency",
  description:
    "SalePixel specializes in custom Shopify store design, development, store redesigns, and conversion rate optimization (CRO) for D2C brands.",
  icons: {
    icon: "/favicon.png",
  },
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
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1315915199980599"
             crossOrigin="anonymous"></script>
      </head>
      <body suppressHydrationWarning className="bg-[#050505] text-white font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-white">
        <Navbar />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
        
        {/* Floating WhatsApp Button for Mobile Devices Only */}
        <a
          href="https://wa.me/919917780656"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-primary text-black shadow-[0_8px_30px_rgba(34,227,154,0.4)] active:scale-95 transition-all duration-300 group hover:bg-[#34F5AE]"
          aria-label="Contact us on WhatsApp"
        >
          <svg 
            className="w-7 h-7 fill-current" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

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

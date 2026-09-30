import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MainWrapper from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: {
    default: "SalePXL — High Converting Shopify Store | Best Ecommerce Agency",
    template: "%s | SalePXL — High Converting Shopify Store",
  },
  description:
    "SalePXL is the best ecommerce agency specializing in high converting Shopify stores, dropshipping store setups, custom Shopify development, and Liquid theme architecture to scale your brand.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "custom shopify store",
    "ecommerce development",
    "custom shopify development",
    "shopify development agency",
    "ecommerce agency",
    "dropshipping shopify store",
    "custom liquid development",
    "high converting shopify stores",
    "shopify store design",
    "shopify ecommerce development",
    "shopify CRO agency",
    "conversion rate optimization shopify",
    "shopify experts india",
    "d2c ecommerce agency",
    "shopify website builder",
    "ecommerce store development",
    "shopify dropshipping agency",
    "custom ecommerce website",
    "shopify theme customization",
    "SalePXL",
    "salepxl",
  ],
  authors: [{ name: "SalePXL Team", url: "https://salepxl.com" }],
  creator: "SalePXL",
  publisher: "SalePXL",
  metadataBase: new URL("https://salepxl.com"),
  alternates: {
    canonical: "https://salepxl.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SalePXL — High Converting Shopify Store | Best Ecommerce Agency",
    description:
      "SalePXL builds high converting Shopify stores, custom dropshipping setups, and scalable ecommerce solutions engineered for high conversion rates and rapid brand growth.",
    url: "https://salepxl.com",
    siteName: "SalePXL",
    images: [
      {
        url: "https://salepxl.com/logo.png",
        width: 1200,
        height: 630,
        alt: "SalePXL — High Converting Shopify Store & Best Ecommerce Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SalePXL — High Converting Shopify Store | Best Ecommerce Agency",
    description:
      "SalePXL builds high converting Shopify stores, custom dropshipping setups, and scalable ecommerce solutions engineered for high conversion rates.",
    images: ["https://salepxl.com/logo.png"],
    creator: "@salepxl",
  },
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
        <meta name="title" content="SalePXL — High Converting Shopify Store | Best Ecommerce Agency" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400,300,100&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1315915199980599"
             crossOrigin="anonymous"></script>
        <Script id="schema-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://salepxl.com/#organization",
                "name": "SalePXL",
                "alternateName": [
                  "salepxl",
                  "SalePXL — High Converting Shopify Store",
                  "SalePXL Ecommerce Agency",
                  "SalePXL Shopify Agency"
                ],
                "url": "https://salepxl.com",
                "logo": "https://salepxl.com/logo.png",
                "slogan": "High Converting Shopify Store",
                "email": "helpsalepxl@gmail.com",
                "telephone": "+919917780656",
                "description": "SalePXL is the best ecommerce agency specializing in high converting Shopify stores, dropshipping store setups, custom Shopify development, and Liquid theme architecture.",
                "knowsAbout": [
                  "High Converting Shopify Store",
                  "Shopify Store Development",
                  "Dropshipping Store Setup",
                  "Custom Shopify Development",
                  "Ecommerce Development",
                  "Conversion Rate Optimization (CRO)",
                  "Custom Liquid Theme Development",
                  "Shopify Speed Optimization"
                ],
                "sameAs": [
                  "https://wa.me/919917780656",
                  "https://calendly.com/salepxl"
                ]
              },
              {
                "@type": "ProfessionalService",
                "@id": "https://salepxl.com/#service",
                "name": "SalePXL — Best Ecommerce Agency",
                "url": "https://salepxl.com",
                "image": "https://salepxl.com/logo.png",
                "slogan": "High Converting Shopify Store",
                "priceRange": "$$ - $$$",
                "email": "helpsalepxl@gmail.com",
                "telephone": "+919917780656",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Dehradun",
                  "postalCode": "248001",
                  "addressRegion": "Uttarakhand",
                  "addressCountry": "IN"
                },
                "areaServed": "Global",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "120",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Shopify & Ecommerce Development Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "High Converting Shopify Store Development",
                        "description": "Custom Shopify store design and engineering focused on maximizing conversion rate and average order value."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Dropshipping Store Setup & Architecture",
                        "description": "Turnkey dropshipping store creation with winning product layout, automated suppliers sync, and conversion-optimized checkout."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Shopify & Liquid Theme Development",
                        "description": "Tailor-made Shopify themes, bespoke Liquid components, custom sections, and unique brand aesthetics."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Ecommerce Development & CRO Tuning",
                        "description": "End-to-end ecommerce development, sub-second speed optimization, and CRO audits to eliminate drop-offs."
                      }
                    }
                  ]
                }
              },
              {
                "@type": "WebSite",
                "@id": "https://salepxl.com/#website",
                "url": "https://salepxl.com",
                "name": "SalePXL — High Converting Shopify Store",
                "description": "Best ecommerce agency engineering high converting Shopify stores and custom ecommerce solutions.",
                "publisher": {
                  "@id": "https://salepxl.com/#organization"
                }
              }
            ]
          })}
        </Script>
      </head>
      <body suppressHydrationWarning className="bg-[#050505] text-white font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-white">
        <Navbar />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
        
        {/* Floating WhatsApp Button for Mobile Devices Only */}
        <a
          href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I%27m%20interested%20in%20building%20a%20high-converting%20Shopify%20store.%20Can%20we%20chat%3F"
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SalePXL | Shopify Growth & Performance Marketing Agency",
  description:
    "SalePXL helps Shopify brands scale through high-converting store experiences, Meta Ads, Google Ads, CRO, and Retention marketing. Founded by Pankaj Singh (10+ Years Experience).",
  keywords: [
    "Shopify Agency",
    "Shopify Growth",
    "Performance Marketing Agency",
    "Meta Ads Expert",
    "Google Ads Specialist",
    "Conversion Rate Optimization",
    "Shopify CRO",
    "ECommerce Scaling India",
  ],
  authors: [{ name: "Pankaj Singh" }],
  creator: "SALEPXL",
  openGraph: {
    title: "SalePXL | Shopify Growth & Performance Marketing Agency",
    description:
      "Scale your Shopify brand with high-converting websites and performance marketing. 10+ years scaling eCommerce.",
    type: "website",
    locale: "en_US",
    siteName: "SalePXL",
  },
  metadataBase: new URL("https://salepxl.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-[#050505] text-[#D7D7D7] font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-[#00AF56]/30 selection:text-white">
        <Navbar />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

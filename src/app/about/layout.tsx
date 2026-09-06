import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Shopify Experts & E-Commerce Store Engineers",
  description:
    "Learn about SalePixel — a dedicated Shopify agency with 5+ years of experience building high-converting Shopify stores, custom Liquid sections, and CRO solutions.",
  alternates: {
    canonical: "https://salepxl.com/about",
  },
  openGraph: {
    title: "About Us | SalePixel Shopify Agency",
    description: "Discover how SalePixel designs and engineers custom Shopify stores for scaling D2C brands.",
    url: "https://salepxl.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

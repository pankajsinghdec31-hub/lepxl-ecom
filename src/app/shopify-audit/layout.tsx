import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Shopify Audit Calculator | Store Performance & Conversion Leakage",
  description:
    "Audit your Shopify store speed, conversion rate, and revenue leakage instantly with SalePixel's interactive Shopify Audit Calculator.",
  alternates: {
    canonical: "https://salepxl.com/shopify-audit",
  },
  openGraph: {
    title: "Free Shopify Audit Calculator | SalePixel Agency",
    description: "Calculate your store's lost revenue, speed bottlenecks, and conversion potential for free.",
    url: "https://salepxl.com/shopify-audit",
  },
};

export default function ShopifyAuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

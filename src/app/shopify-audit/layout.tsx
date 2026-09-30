import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Shopify CRO Audit | High Converting Shopify Store Optimization | SalePXL",
  description:
    "Audit your Shopify store speed, conversion rate, and revenue leakage instantly with SalePXL, the best ecommerce agency for high converting Shopify stores.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify audit",
    "shopify conversion audit"
  ],
  alternates: {
    canonical: "https://salepxl.com/shopify-audit",
  },
  openGraph: {
    title: "Free Shopify CRO Audit | SalePXL — High Converting Shopify Store",
    description: "Audit your store's speed, conversion leakage, and sales potential with SalePXL.",
    url: "https://salepxl.com/shopify-audit",
  },
};

export default function ShopifyAuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

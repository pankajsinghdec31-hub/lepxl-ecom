import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Store Pricing | High Converting Shopify Store & Ecommerce Agency",
  description:
    "Get custom quotes from SalePXL, the best ecommerce agency for high converting Shopify stores, dropshipping store setups, custom Shopify development, and CRO.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify store pricing"
  ],
  alternates: {
    canonical: "https://salepxl.com/pricing",
  },
  openGraph: {
    title: "Shopify Store Pricing | SalePXL — High Converting Shopify Store",
    description: "Transparent custom quotes for high converting Shopify stores, dropshipping stores, and ecommerce development.",
    url: "https://salepxl.com/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

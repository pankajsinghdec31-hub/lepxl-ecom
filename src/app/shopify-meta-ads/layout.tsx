import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High Converting Shopify Store for Meta Ads | SalePXL",
  description:
    "Scale Meta Ads with a high converting Shopify store designed for rapid conversion and high ROAS. Custom Shopify development and dropshipping store architecture by SalePXL.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify meta ads landing page"
  ],
  alternates: {
    canonical: "https://salepxl.com/shopify-meta-ads",
  },
  openGraph: {
    title: "High Converting Shopify Store for Meta Ads | SalePXL",
    description: "Scale your Meta Ads with a high converting Shopify store built by SalePXL, the best ecommerce agency.",
    url: "https://salepxl.com/shopify-meta-ads",
  },
};

export default function ShopifyMetaAdsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High Converting Shopify Store Launch | SalePXL — Best Ecommerce Agency",
  description:
    "Launch a high converting Shopify store or dropshipping store in 3-7 days with SalePXL. Expert custom Shopify development, CRO optimization, and high-converting PDP layouts.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify store launch",
    "dropshipping store setup"
  ],
  alternates: {
    canonical: "https://salepxl.com/shopify-landing",
  },
  openGraph: {
    title: "High Converting Shopify Store Launch | SalePXL",
    description: "Launch a high converting Shopify store with SalePXL, the best ecommerce agency for D2C & dropshipping brands.",
    url: "https://salepxl.com/shopify-landing",
  },
};

export default function ShopifyLandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

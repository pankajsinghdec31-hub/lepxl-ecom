import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify & Ecommerce Blog | High Converting Shopify Store Guides | SalePXL",
  description:
    "Expert ecommerce guides on building a high converting Shopify store, dropshipping store setups, custom Shopify development, payment gateways, and CRO strategies by SalePXL.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify blog",
    "ecommerce guides"
  ],
  alternates: {
    canonical: "https://salepxl.com/blog",
  },
  openGraph: {
    title: "Shopify & Ecommerce Blog | SalePXL — High Converting Shopify Store",
    description: "In-depth guides on high converting Shopify stores, dropshipping store setups, and custom ecommerce development.",
    url: "https://salepxl.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

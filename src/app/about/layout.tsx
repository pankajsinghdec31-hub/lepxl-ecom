import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Best Ecommerce Agency for High Converting Shopify Stores",
  description:
    "Learn about SalePXL — the best ecommerce agency dedicated to engineering high converting Shopify stores, dropshipping store architectures, and custom Liquid solutions.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify agency about us"
  ],
  alternates: {
    canonical: "https://salepxl.com/about",
  },
  openGraph: {
    title: "About Us | SalePXL — High Converting Shopify Store & Best Ecommerce Agency",
    description: "Discover how SalePXL engineers high converting Shopify stores and custom ecommerce solutions for scaling brands.",
    url: "https://salepxl.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

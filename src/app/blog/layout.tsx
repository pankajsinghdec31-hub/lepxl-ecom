import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify & E-Commerce Blog | D2C Masterclasses & CRO Guides",
  description:
    "Expert Shopify insights, payment gateway guides, shipping comparison, dropshipping tutorials, and conversion optimization strategies by SalePixel.",
  alternates: {
    canonical: "https://salepxl.com/blog",
  },
  openGraph: {
    title: "Shopify & D2C Growth Masterclasses | SalePixel Blog",
    description: "In-depth guides on Shopify store development, payment gateways, logistics, and D2C brand scaling.",
    url: "https://salepxl.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

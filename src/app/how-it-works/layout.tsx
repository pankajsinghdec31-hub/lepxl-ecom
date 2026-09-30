import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | High Converting Shopify Store Process | SalePXL",
  description:
    "Discover SalePXL's step-by-step process: discovery, custom Shopify development, dropshipping store architecture, CRO optimization, and launch.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify development process"
  ],
  alternates: {
    canonical: "https://salepxl.com/how-it-works",
  },
  openGraph: {
    title: "How It Works | SalePXL — High Converting Shopify Store Process",
    description: "Learn how SalePXL, the best ecommerce agency, plans, builds, and launches high converting Shopify stores.",
    url: "https://salepxl.com/how-it-works",
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

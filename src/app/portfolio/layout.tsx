import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Portfolio | High Converting Shopify Store & Dropshipping Builds",
  description:
    "Explore high converting Shopify stores and custom dropshipping store setups engineered by SalePXL, the best ecommerce agency for scaling D2C brands.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify portfolio",
    "custom shopify store examples"
  ],
  alternates: {
    canonical: "https://salepxl.com/portfolio",
  },
  openGraph: {
    title: "Shopify Portfolio | SalePXL — High Converting Shopify Store",
    description: "Explore real D2C and dropshipping Shopify store builds engineered for conversion speed and premium brand appeal.",
    url: "https://salepxl.com/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

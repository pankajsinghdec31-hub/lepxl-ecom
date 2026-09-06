import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Store Pricing & Packages | Affordable E-Commerce Plans",
  description:
    "Transparent Shopify store development pricing by SalePixel. Choose from Custom Starter, Fully Customized, or Advanced Growth setups built by Shopify Experts.",
  alternates: {
    canonical: "https://salepxl.com/pricing",
  },
  openGraph: {
    title: "Shopify Store Pricing & Packages | SalePixel Agency",
    description: "Affordable, transparent pricing packages for custom Shopify store builds and CRO optimizations.",
    url: "https://salepxl.com/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

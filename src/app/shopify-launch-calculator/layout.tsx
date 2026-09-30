import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Store Cost Calculator | High Converting Shopify Store | SalePXL",
  description:
    "Calculate custom Shopify store development costs and launch timelines with SalePXL, the best ecommerce agency for high converting Shopify stores and dropshipping setups.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify cost calculator"
  ],
  alternates: {
    canonical: "https://salepxl.com/shopify-launch-calculator",
  },
  openGraph: {
    title: "Shopify Store Cost Calculator | SalePXL — High Converting Shopify Store",
    description: "Get an instant cost estimate for building or redesigning your high converting Shopify store with SalePXL.",
    url: "https://salepxl.com/shopify-launch-calculator",
  },
};

export default function LaunchCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

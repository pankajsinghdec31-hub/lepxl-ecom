import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Launch Calculator | Estimate Your Custom Store Investment",
  description:
    "Calculate your custom Shopify store development cost and launch timeline with SalePixel's interactive cost calculator.",
  alternates: {
    canonical: "https://salepxl.com/shopify-launch-calculator",
  },
  openGraph: {
    title: "Shopify Launch Calculator | SalePixel Agency",
    description: "Get an instant cost estimate for building or redesigning your Shopify store with SalePixel.",
    url: "https://salepxl.com/shopify-launch-calculator",
  },
};

export default function LaunchCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

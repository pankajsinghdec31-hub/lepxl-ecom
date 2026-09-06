import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | SalePixel's 6-Step Shopify Growth Process",
  description:
    "Discover SalePixel's step-by-step Shopify store development process: discovery, custom Liquid design, checkout optimization, quality QA, and launch.",
  alternates: {
    canonical: "https://salepxl.com/how-it-works",
  },
  openGraph: {
    title: "How It Works | SalePixel Shopify Process",
    description: "Learn how SalePixel plans, builds, and launches high-converting Shopify stores in 6 steps.",
    url: "https://salepxl.com/how-it-works",
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

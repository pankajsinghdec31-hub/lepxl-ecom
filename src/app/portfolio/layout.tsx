import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Store Portfolio | Recent Custom D2C Store Builds",
  description:
    "Browse SalePixel's portfolio of high-converting Shopify store designs, custom Liquid builds, and brand transformations across beauty, apparel, and lifestyle.",
  alternates: {
    canonical: "https://salepxl.com/portfolio",
  },
  openGraph: {
    title: "Shopify Store Portfolio | SalePixel Agency",
    description: "Explore real D2C Shopify store builds engineered for conversion speed and premium brand appeal.",
    url: "https://salepxl.com/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

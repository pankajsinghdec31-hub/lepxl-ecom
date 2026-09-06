import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Development Services | Custom Liquid, CRO & Speed Tuning",
  description:
    "Explore SalePixel's Shopify services: custom theme development, Liquid section customization, product page optimization, speed tuning, and AI photoshoots.",
  alternates: {
    canonical: "https://salepxl.com/services",
  },
  openGraph: {
    title: "Shopify Development Services | SalePixel Agency",
    description: "Tailored Shopify development services built for high conversions, sub-second speed, and seamless customer journeys.",
    url: "https://salepxl.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

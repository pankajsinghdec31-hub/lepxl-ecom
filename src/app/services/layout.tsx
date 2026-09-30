import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Development Services | High Converting Shopify Store & Custom Liquid",
  description:
    "SalePXL is the best ecommerce agency for high converting Shopify store design, custom Shopify development, dropshipping store setups, speed tuning, and CRO.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "custom liquid development",
    "shopify store design"
  ],
  alternates: {
    canonical: "https://salepxl.com/services",
  },
  openGraph: {
    title: "Shopify Development Services | SalePXL — High Converting Shopify Store",
    description: "Bespoke Shopify development services built for maximum conversions, sub-second speed, and scalable ecommerce growth.",
    url: "https://salepxl.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

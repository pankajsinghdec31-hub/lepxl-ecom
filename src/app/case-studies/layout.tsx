import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Case Studies | Revenue Growth & Conversion Results",
  description:
    "Real Shopify growth results and case studies from SalePixel. See how custom theme builds and CRO architectures scale D2C brand revenue.",
  alternates: {
    canonical: "https://salepxl.com/case-studies",
  },
  openGraph: {
    title: "Shopify Growth Case Studies | SalePixel Agency",
    description: "In-depth case studies on how SalePixel transforms Shopify stores into high-converting sales channels.",
    url: "https://salepxl.com/case-studies",
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

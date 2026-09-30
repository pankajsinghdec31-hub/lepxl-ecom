import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Case Studies | High Converting Shopify Store Results | SalePXL",
  description:
    "Real growth case studies from SalePXL, the best ecommerce agency. See how our high converting Shopify store builds, dropshipping setups, and custom Liquid architectures scale brand revenue.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify case studies"
  ],
  alternates: {
    canonical: "https://salepxl.com/case-studies",
  },
  openGraph: {
    title: "Shopify Case Studies | SalePXL — High Converting Shopify Store",
    description: "In-depth case studies on how SalePXL transforms Shopify and dropshipping stores into high converting sales machines.",
    url: "https://salepxl.com/case-studies",
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

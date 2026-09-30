import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact SalePXL | Best Ecommerce Agency for High Converting Shopify Stores",
  description:
    "Get in touch with SalePXL, the best ecommerce agency for high converting Shopify store builds, dropshipping store setups, custom Shopify development, and CRO audits.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "contact shopify agency"
  ],
  alternates: {
    canonical: "https://salepxl.com/contact",
  },
  openGraph: {
    title: "Contact SalePXL | Best Ecommerce Agency & High Converting Shopify Stores",
    description: "Connect with our ecommerce development team to build or scale your high converting Shopify store or dropshipping venture.",
    url: "https://salepxl.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

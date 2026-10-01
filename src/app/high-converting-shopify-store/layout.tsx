import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High Converting Shopify Store | Live Client Store Showcase | SalePXL",
  description:
    "Explore high converting Shopify stores built by SalePXL. View live screenshots and real case studies from Kishoriju, Kalpveda, High Sky Coffee, Vaani Veda, Styleora, Miktoksi Living, Krustoz, and Iraya Althea.",
  keywords: [
    "High Converting Shopify Store",
    "best ecommerce agency",
    "dropshipping store",
    "custom shopify",
    "ecommerce development",
    "shopify store examples",
    "live shopify stores",
    "high converting shopify stores",
    "salepxl client stores"
  ],
  alternates: {
    canonical: "https://salepxl.com/high-converting-shopify-store",
  },
  openGraph: {
    title: "High Converting Shopify Store Showcase | SalePXL",
    description: "Real high-converting Shopify stores engineered for maximum ROI and sub-second speed.",
    url: "https://salepxl.com/high-converting-shopify-store",
    images: ["https://salepxl.com/stores/kishoriju.png"]
  },
};

export default function HighConvertingShopifyStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

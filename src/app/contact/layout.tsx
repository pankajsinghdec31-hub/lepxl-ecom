import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Talk to SalePixel Shopify Experts",
  description:
    "Get in touch with SalePixel. Request a free Shopify store proposal, audit, or discuss your upcoming D2C store build with our engineering team.",
  alternates: {
    canonical: "https://salepxl.com/contact",
  },
  openGraph: {
    title: "Contact SalePixel | Shopify Store Consultation",
    description: "Connect with our Shopify strategy & development team to build or scale your D2C brand.",
    url: "https://salepxl.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage =
    pathname.startsWith("/shopify-landing") ||
    pathname.startsWith("/shopify-meta-ads");

  return (
    <main className={`flex-grow ${isLandingPage ? "pt-0" : "pt-24"}`}>
      {children}
    </main>
  );
}

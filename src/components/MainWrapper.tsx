"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage =
    pathname.startsWith("/shopify-landing") ||
    pathname.startsWith("/shopify-meta-ads");

  return (
    <main className={`flex-grow ${isLandingPage ? "pt-0" : "pt-24"}`}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-full"
      >
        {children}
      </motion.div>
    </main>
  );
}

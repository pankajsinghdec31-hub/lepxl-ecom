"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  Truck, 
  ShoppingBag, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  Crown,
  Globe
} from "lucide-react";

interface BlogCardImageProps {
  slug: string;
  title: string;
  category: string;
  coverImage: string;
}

export default function BlogCardImage({ slug, title, category, coverImage }: BlogCardImageProps) {
  const [hasError, setHasError] = useState(false);

  // Custom visual configurations based on blog category / slug
  const getVisualConfig = () => {
    switch (slug) {
      case "top-payment-gateway-providers-in-india":
        return {
          gradient: "from-[#071318] via-[#0d2920] to-[#040c09]",
          accentColor: "#10b981",
          badgeText: "UPI 1-Tap • Razorpay • Cashfree",
          icon: CreditCard,
          subText: "72% Payments Via UPI Intent"
        };
      case "best-shipping-company-in-india-for-ecommerce":
        return {
          gradient: "from-[#081225] via-[#0f2440] to-[#050b17]",
          accentColor: "#38bdf8",
          badgeText: "Shiprocket • Delhivery • RTO Guard",
          icon: Truck,
          subText: "24,000+ Pincodes Covered"
        };
      case "how-to-start-dropshipping-in-india":
        return {
          gradient: "from-[#110a21] via-[#1f1238] to-[#090514]",
          accentColor: "#a855f7",
          badgeText: "Roposo Clout • GlowRoad • 3-Day COD",
          icon: Globe,
          subText: "Zero Upfront Inventory Cost"
        };
      case "why-choose-shopify-over-woocommerce":
        return {
          gradient: "from-[#061c14] via-[#0c3325] to-[#04120d]",
          accentColor: "#34d399",
          badgeText: "Sub-1.2s Speed • 99.99% Uptime",
          icon: ShoppingBag,
          subText: "Zero Hosting Crashes"
        };
      case "checklist-to-read-before-starting-your-ecom-journey":
        return {
          gradient: "from-[#1a1408] via-[#33260c] to-[#0d0a04]",
          accentColor: "#fbbf24",
          badgeText: "GST • Courier API • Mobile Audit",
          icon: CheckCircle2,
          subText: "10-Point Pre-Launch Checklist"
        };
      case "best-shopify-apps-to-boost-conversions-and-sales":
        return {
          gradient: "from-[#1c0d18] via-[#36182f] to-[#0f070d]",
          accentColor: "#f43f5e",
          badgeText: "Klaviyo • Gokwik • Judge.me • Recharge",
          icon: Layers,
          subText: "High-ROAS App Architecture"
        };
      case "top-d2c-ecommerce-trends-in-india":
        return {
          gradient: "from-[#091724] via-[#122c45] to-[#050c14]",
          accentColor: "#60a5fa",
          badgeText: "Shoppable Reels • AI Photoshoots",
          icon: Sparkles,
          subText: "2026 D2C Growth Insights"
        };
      case "optimize-shopify-page-speed-guide":
        return {
          gradient: "from-[#041d18] via-[#09382e] to-[#02100d]",
          accentColor: "#10b981",
          badgeText: "100/100 Core Web Vitals • WebP",
          icon: Zap,
          subText: "Sub-1.5s Mobile Render"
        };
      case "ecommerce-conversion-rate-optimization-cro":
        return {
          gradient: "from-[#0b1b17] via-[#15362e] to-[#06100d]",
          accentColor: "#34d399",
          badgeText: "Sticky Buy Bar • Star Reviews • CRO",
          icon: TrendingUp,
          subText: "Double Sales Conversion"
        };
      case "how-to-build-a-luxury-shopify-store":
        return {
          gradient: "from-[#08080a] via-[#17171d] to-[#040405]",
          accentColor: "#fbbf24",
          badgeText: "Dark Luxury • Gold Pedestal • AOV",
          icon: Crown,
          subText: "High-End Editorial Design"
        };
      default:
        return {
          gradient: "from-[#071318] via-[#0d2920] to-[#040c09]",
          accentColor: "#10b981",
          badgeText: "SalePXL E-Commerce Architecture",
          icon: Sparkles,
          subText: "High-Converting Shopify"
        };
    }
  };

  const config = getVisualConfig();
  const IconComponent = config.icon;

  return (
    <div className="w-full h-full relative overflow-hidden bg-neutral-900 group">
      {/* 1. Try rendering image asset if no error */}
      {!hasError && coverImage ? (
        <img
          src={coverImage}
          alt={title}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}

      {/* 2. Fallback / Custom Visual Card Header Component */}
      {(hasError || !coverImage) && (
        <div className={`w-full h-full bg-gradient-to-br ${config.gradient} p-5 flex flex-col justify-between text-left relative overflow-hidden select-none border border-white/10`}>
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          {/* Top Category Badge */}
          <div className="flex items-center justify-between z-10">
            <span className="px-2.5 py-1 rounded-md bg-black/40 border border-white/10 text-white font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md">
              {category}
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
              <IconComponent className="w-4 h-4" />
            </div>
          </div>

          {/* Middle Decorative Graphic Element */}
          <div className="z-10 my-auto py-2 flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[10px] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{config.badgeText}</span>
            </div>
            <h4 className="text-white font-grotesk font-extrabold text-sm sm:text-base leading-snug line-clamp-2">
              {title}
            </h4>
          </div>

          {/* Bottom Sub-indicator */}
          <div className="z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-white/60">
            <span>{config.subText}</span>
            <span className="text-emerald-400 font-bold">SalePXL Insights →</span>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
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
  coverImage?: string;
}

export default function BlogCardImage({ slug, title, category, coverImage }: BlogCardImageProps) {
  const [imgError, setImgError] = React.useState(false);

  // Custom visual configurations based on blog category / slug for fallback
  const getVisualConfig = () => {
    switch (slug) {
      case "top-payment-gateway-providers-in-india":
        return {
          gradient: "from-[#041410] via-[#092e23] to-[#030d0a]",
          accentColor: "emerald",
          badgeText: "UPI 1-Tap • Razorpay • Cashfree",
          icon: CreditCard,
          subText: "72% Payments Via UPI Intent",
          pillBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
        };
      case "best-shipping-company-in-india-for-ecommerce":
        return {
          gradient: "from-[#051124] via-[#0c2545] to-[#040914]",
          accentColor: "sky",
          badgeText: "Shiprocket • Delhivery • RTO Guard",
          icon: Truck,
          subText: "24,000+ Pincodes Covered",
          pillBg: "bg-sky-500/20 text-sky-300 border-sky-500/40"
        };
      case "how-to-start-dropshipping-in-india":
        return {
          gradient: "from-[#100821] via-[#221040] to-[#090414]",
          accentColor: "purple",
          badgeText: "Roposo Clout • GlowRoad • 3-Day COD",
          icon: Globe,
          subText: "Zero Upfront Inventory Cost",
          pillBg: "bg-purple-500/20 text-purple-300 border-purple-500/40"
        };
      case "why-choose-shopify-over-woocommerce":
        return {
          gradient: "from-[#041812] via-[#093628] to-[#020e0a]",
          accentColor: "teal",
          badgeText: "Sub-1.2s Speed • 99.99% Uptime",
          icon: ShoppingBag,
          subText: "Zero Hosting Crashes",
          pillBg: "bg-teal-500/20 text-teal-300 border-teal-500/40"
        };
      case "checklist-to-read-before-starting-your-ecom-journey":
        return {
          gradient: "from-[#1a1306] via-[#382809] to-[#0c0903]",
          accentColor: "amber",
          badgeText: "GST • Courier API • Mobile Audit",
          icon: CheckCircle2,
          subText: "10-Point Pre-Launch Checklist",
          pillBg: "bg-amber-500/20 text-amber-300 border-amber-500/40"
        };
      case "best-shopify-apps-to-boost-conversions-and-sales":
        return {
          gradient: "from-[#1c0a18] via-[#3b1232] to-[#0f050d]",
          accentColor: "rose",
          badgeText: "Klaviyo • Gokwik • Judge.me • Recharge",
          icon: Layers,
          subText: "High-ROAS App Stack",
          pillBg: "bg-rose-500/20 text-rose-300 border-rose-500/40"
        };
      case "top-d2c-ecommerce-trends-in-india":
        return {
          gradient: "from-[#061424] via-[#0c2847] to-[#040c17]",
          accentColor: "blue",
          badgeText: "Shoppable Reels • AI Photoshoots",
          icon: Sparkles,
          subText: "2026 D2C Growth Insights",
          pillBg: "bg-blue-500/20 text-blue-300 border-blue-500/40"
        };
      case "optimize-shopify-page-speed-guide":
        return {
          gradient: "from-[#031c15] via-[#083d2e] to-[#02120d]",
          accentColor: "emerald",
          badgeText: "100/100 Core Web Vitals • WebP",
          icon: Zap,
          subText: "Sub-1.5s Mobile Render",
          pillBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
        };
      case "ecommerce-conversion-rate-optimization-cro":
        return {
          gradient: "from-[#081c17] via-[#11382e] to-[#040f0c]",
          accentColor: "teal",
          badgeText: "Sticky Buy Bar • Star Reviews • CRO",
          icon: TrendingUp,
          subText: "Double Sales Conversion",
          pillBg: "bg-teal-500/20 text-teal-300 border-teal-500/40"
        };
      case "how-to-build-a-luxury-shopify-store":
        return {
          gradient: "from-[#08080a] via-[#1a1a24] to-[#040406]",
          accentColor: "amber",
          badgeText: "Dark Luxury • Gold Pedestal • AOV",
          icon: Crown,
          subText: "High-End Editorial Design",
          pillBg: "bg-amber-500/20 text-amber-300 border-amber-500/40"
        };
      default:
        return {
          gradient: "from-[#041410] via-[#092e23] to-[#030d0a]",
          accentColor: "emerald",
          badgeText: "SalePXL E-Commerce Architecture",
          icon: Sparkles,
          subText: "High-Converting Shopify",
          pillBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
        };
    }
  };

  const config = getVisualConfig();
  const IconComponent = config.icon;

  // If coverImage exists and no load error, render real image cover with badge
  if (coverImage && !imgError) {
    return (
      <div className="w-full h-full relative overflow-hidden group select-none bg-neutral-950">
        <img
          src={coverImage}
          alt={title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/70 border border-white/20 text-white font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
            {category}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br ${config.gradient} p-5 sm:p-6 flex flex-col justify-between text-left relative overflow-hidden select-none border border-white/10 group transition-all duration-500`}>
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.06] pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/5 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between z-10">
        <span className="px-2.5 py-1 rounded-full bg-black/50 border border-white/15 text-white font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
          {category}
        </span>
        <div className={`p-2 rounded-xl bg-white/10 border border-white/20 text-white shadow-inner group-hover:scale-110 transition-transform`}>
          <IconComponent className="w-4 h-4 text-emerald-300" />
        </div>
      </div>

      {/* Middle Decorative Headline & Feature Badge */}
      <div className="z-10 my-auto py-2 flex flex-col gap-2">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${config.pillBg} font-mono text-[10px] w-fit backdrop-blur-sm shadow-sm`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold">{config.badgeText}</span>
        </div>
        <h4 className="text-white font-grotesk font-extrabold text-base sm:text-lg leading-tight line-clamp-2 drop-shadow-sm group-hover:text-emerald-300 transition-colors">
          {title}
        </h4>
      </div>

      {/* Bottom Footer Row */}
      <div className="z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono text-white/70">
        <span className="truncate max-w-[200px]">{config.subText}</span>
        <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform shrink-0">
          SalePXL Guide →
        </span>
      </div>
    </div>
  );
}

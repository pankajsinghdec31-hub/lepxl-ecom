"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle, ArrowRight, Zap, ShieldCheck, Layers } from "lucide-react";

export interface IntegrationApp {
  id: string;
  name: string;
  category: "checkout" | "marketing" | "reviews" | "shipping" | "analytics";
  categoryLabel: string;
  description: string;
  highlight?: boolean;
  metric?: string;
  svg?: React.ReactNode;
  src?: string;
}

export const INTEGRATIONS_LIST: IntegrationApp[] = [
  {
    id: "shopify",
    name: "Shopify OS 2.0",
    category: "checkout",
    categoryLabel: "Core Platform",
    description: "Custom Liquid architecture, sections everywhere & native app embed compatibility.",
    metric: "Sub-1.2s LCP",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <path d="M18.8 4.2C18.7 4.1 18.5 4.1 18.4 4.2L16 6.1C15.8 5.7 15.3 5.4 14.8 5.4C14.3 5.4 13.9 5.6 13.6 6L11.5 4.3C11.3 4.1 11 4.2 10.9 4.4L9 8.2L6.8 5C6.6 4.7 6.2 4.6 5.9 4.8L2.5 7.1C2.2 7.3 2.1 7.7 2.3 8L7 16.5C7.4 17.2 8.1 17.6 8.9 17.6H17.5C18.4 17.6 19.2 17 19.4 16.1L21.9 6.2C22 5.8 21.8 5.3 21.4 5.1L18.8 4.2Z" fill="#95BF47"/>
        <path d="M14.8 5.4C15.3 5.4 15.8 5.7 16 6.1L18.4 4.2C18.5 4.1 18.7 4.1 18.8 4.2L21.4 5.1C21.8 5.3 22 5.8 21.9 6.2L19.4 16.1C19.2 17 18.4 17.6 17.5 17.6H8.9C8.1 17.6 7.4 17.2 7 16.5L2.3 8C2.1 7.7 2.2 7.3 2.5 7.1L5.9 4.8C6.2 4.6 6.6 4.7 6.8 5L9 8.2L10.9 4.4C11 4.2 11.3 4.1 11.5 4.3L13.6 6C13.9 5.6 14.3 5.4 14.8 5.4Z" stroke="#5E8E3E" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    category: "marketing",
    categoryLabel: "Email & SMS",
    description: "Automated abandoned cart flows, back-in-stock alerts & VIP customer retention segmentations.",
    metric: "+32% Email Revenue",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#151515"/>
        <path d="M4.5 7.5L12 12.75L19.5 7.5V16.5H4.5V7.5Z" fill="#2EAA76"/>
        <path d="M4.5 7.5L12 12.75L19.5 7.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: "gokwik",
    name: "GoKwik",
    category: "checkout",
    categoryLabel: "1-Click Checkout",
    description: "Pre-filled address 1-click checkout with automated COD fraud verification to reduce RTO by up to 40%.",
    metric: "40% Lower RTO",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="url(#gk-grad)" />
        <path d="M6 12L11 17L19 9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 5L17 9L13 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <defs>
          <linearGradient id="gk-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: "recharge",
    name: "Recharge",
    category: "checkout",
    categoryLabel: "Subscriptions",
    description: "Seamless subscription recurring payments, custom customer portals & swap/pause workflows.",
    metric: "2.4x LTV Boost",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#2B3654"/>
        <path d="M12 5V19M5 12H19" stroke="#00D290" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="7" stroke="#00D290" strokeWidth="2" strokeDasharray="3 3"/>
      </svg>
    )
  },
  {
    id: "razorpay",
    name: "Razorpay",
    category: "checkout",
    categoryLabel: "Payment Gateway",
    description: "Seamless UPI, Credit/Debit cards, Netbanking & instant refund handling with 99.9% uptime.",
    metric: "99.9% Success Rate",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#02042B"/>
        <path d="M5 19L11.5 3H16.5L12 11.5H18.5L9.5 21H5Z" fill="#0C6CF2"/>
        <path d="M11.5 3L8 11.5H13L10.5 17" fill="#3983F7"/>
      </svg>
    )
  },
  {
    id: "shiprocket",
    name: "Shiprocket",
    category: "shipping",
    categoryLabel: "Logistics Sync",
    description: "Automated multi-courier dispatch, real-time NDR management & live order tracking updates.",
    metric: "Instant NDR Sync",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="url(#sr-grad)" />
        <path d="M12 4L19 8V16L12 20L5 16V8L12 4Z" stroke="#FFFFFF" strokeWidth="1.5" fill="#7C3AED" fillOpacity="0.4"/>
        <path d="M12 4V12M12 12L19 8M12 12L5 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
        <defs>
          <linearGradient id="sr-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "checkout",
    categoryLabel: "Global Payments",
    description: "Global credit card processing, Apple Pay, Google Pay & multi-currency local settlement.",
    metric: "135+ Currencies",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#635BFF"/>
        <path d="M13.978 11.072c0-1.229-.618-1.668-1.49-1.668-.962 0-1.494.515-1.494 1.427 0 2.25 6.273 1.157 6.273 5.378 0 3.208-2.622 4.543-5.56 4.543-3.155 0-5.667-1.39-5.667-4.088h2.793c.03 1.332.95 1.864 2.1 1.864 1.096 0 1.878-.456 1.878-1.47 0-2.459-6.273-1.455-6.273-5.396 0-2.996 2.459-4.527 5.396-4.527 2.894 0 5.148.973 5.337 3.398h-2.986z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: "loox",
    name: "Loox Reviews",
    category: "reviews",
    categoryLabel: "Photo Reviews",
    description: "High-converting photo & video review carousels, star ratings on PDPs & automated review requests.",
    metric: "+18% Add To Cart",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#5B21B6"/>
        <path d="M12 4L14.472 8.958L19.944 9.771L15.972 13.629L16.908 19.076L12 16.5L7.092 19.076L8.028 13.629L4.056 9.771L9.528 8.958L12 4Z" fill="#FBBF24"/>
      </svg>
    )
  },
  {
    id: "judgeme",
    name: "Judge.me",
    category: "reviews",
    categoryLabel: "Social Proof",
    description: "Fast-loading review widgets, Google Rich Snippets SEO stars & automated buyer review incentives.",
    metric: "Google SEO Stars",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#00A389"/>
        <path d="M7 12L10.5 15.5L17 8.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "whatsapp",
    name: "WhatsApp Commerce",
    category: "marketing",
    categoryLabel: "Conversational",
    description: "Automated WhatsApp order updates, abandoned cart reminders & live chat support widgets.",
    metric: "98% Open Rate",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#25D366"/>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.521.15-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: "triplewhale",
    name: "Triple Whale",
    category: "analytics",
    categoryLabel: "Profit Analytics",
    description: "First-party tracking pixel, real-time MER profit dashboard & ad campaign attribution.",
    metric: "1st-Party Attribution",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#0D0D12"/>
        <path d="M4 14C4 14 7 7 12 7C17 7 20 14 20 14" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M7 16C7 16 9.5 11 12 11C14.5 11 17 16 17 16" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="7" r="2" fill="#60A5FA"/>
      </svg>
    )
  },
  {
    id: "delhivery",
    name: "Delhivery",
    category: "shipping",
    categoryLabel: "Logistics Partner",
    description: "Nationwide express delivery integration, automatic Pincode serviceability check & surface/air fulfillment.",
    metric: "18,000+ Pincodes",
    highlight: true,
    src: "/dtdc.png"
  },
  {
    id: "meta",
    name: "Meta Pixel & CAPI",
    category: "analytics",
    categoryLabel: "Conversion API",
    description: "Server-side Conversions API (CAPI) bypasses iOS ad blockers for maximum ROAS attribution accuracy.",
    metric: "+25% Tracked ROAS",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#0466E4"/>
        <path d="M16.5 8C15.1 8 13.9 8.8 13 9.9C12.1 8.8 10.9 8 9.5 8C6.9 8 5 10 5 12.5C5 15.3 7.8 17.8 11.4 20.3L12 20.7L12.6 20.3C16.2 17.8 19 15.3 19 12.5C19 10 17.1 8 16.5 8Z" stroke="#FFFFFF" strokeWidth="1.8"/>
      </svg>
    )
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    category: "analytics",
    categoryLabel: "Ecommerce Tracking",
    description: "Custom GTM dataLayer implementation for granular funnel tracking, drop-offs & revenue metrics.",
    metric: "Full Funnel Sync",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#F9AB00"/>
        <rect x="5" y="14" width="3.5" height="6" rx="1.5" fill="#FFFFFF"/>
        <rect x="10.25" y="9" width="3.5" height="11" rx="1.5" fill="#FFFFFF"/>
        <rect x="15.5" y="4" width="3.5" height="16" rx="1.5" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: "yotpo",
    name: "Yotpo Loyalty",
    category: "reviews",
    categoryLabel: "Loyalty & Rewards",
    description: "Points-for-purchases, referral programs, tier badges & VIP member checkout discounts.",
    metric: "+42% Repeat Buys",
    highlight: false,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#FF5000"/>
        <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="2.5"/>
        <path d="M12 9V15M9 12H15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: "smile",
    name: "Smile.io",
    category: "reviews",
    categoryLabel: "Rewards Program",
    description: "Custom points launcher widget, interactive popups & referral reward tracking.",
    metric: "+30% Customer Retention",
    highlight: false,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#7D4CDB"/>
        <path d="M7 10C7 10 9 14 12 14C15 14 17 10 17 10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="9" cy="8" r="1.5" fill="#FFFFFF"/>
        <circle cx="15" cy="8" r="1.5" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: "postscript",
    name: "Postscript SMS",
    category: "marketing",
    categoryLabel: "SMS Automation",
    description: "TCPA-compliant SMS subscriber popups, conversational AI text responses & targeted SMS campaigns.",
    metric: "45% Click Rate",
    highlight: false,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#0F172A"/>
        <path d="M5 8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V14C19 15.1046 18.1046 16 17 16H11L7 19V16H7C5.89543 16 5 15.1046 5 14V8Z" stroke="#38BDF8" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: "rebuy",
    name: "Rebuy Engine",
    category: "analytics",
    categoryLabel: "Smart Upsells",
    description: "AI smart cart drawer recommendations, post-purchase one-click upsells & dynamic checkout widgets.",
    metric: "+15% AOV Uplift",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#18181B"/>
        <path d="M12 4V20M4 12H20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
        <path d="M16 8L20 12L16 16" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "whatmore",
    name: "Whatmore Studio",
    category: "reviews",
    categoryLabel: "Shoppable Reels",
    description: "Instagram-style shoppable video reels embedded right on PDPs and landing pages with instant buy drawers.",
    metric: "3x Video Conversions",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="url(#wm-grad)"/>
        <path d="M10 8L16 12L10 16V8Z" fill="#FFFFFF" />
        <defs>
          <linearGradient id="wm-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: "cashfree",
    name: "Cashfree Payments",
    category: "checkout",
    categoryLabel: "Payment Gateway",
    description: "Instant payouts, automated refund handling, BNPL support & multi-currency payment checkout.",
    metric: "Instant Refunds",
    highlight: true,
    src: "/cashfree.png"
  },
  {
    id: "shadowfax",
    name: "Shadowfax Express",
    category: "shipping",
    categoryLabel: "Express Logistics",
    description: "Hyperlocal same-day delivery dispatch & nationwide express e-commerce logistics API.",
    metric: "Same-Day Delivery",
    highlight: false,
    src: "/shadowfax.png"
  },
  {
    id: "paypal",
    name: "PayPal Express",
    category: "checkout",
    categoryLabel: "Express Checkout",
    description: "Global trusted buyer checkout with Buyer Protection and instant one-click authentication.",
    metric: "Global Buyer Trust",
    highlight: false,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#003087"/>
        <path d="M8 18L9.5 8.5H13.5C15.5 8.5 17 9.5 16.5 11.5C16 13.5 14.2 14.5 12.2 14.5H10L9 18H8Z" fill="#0079C1"/>
        <path d="M10 16L11.2 8.5H14.5C16.5 8.5 17.5 9.5 17 11.5C16.5 13.5 14.8 14.5 12.8 14.5H11L10 16Z" fill="#00457C" opacity="0.6"/>
      </svg>
    )
  },
  {
    id: "klarna",
    name: "Klarna BNPL",
    category: "checkout",
    categoryLabel: "Flexible Financing",
    description: "Pay in 4 interest-free installments to dramatically boost higher order values for premium catalog items.",
    metric: "+45% AOV Boost",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#FFB3C7"/>
        <path d="M6 6V18M11 6L6 12L11 18M13 18C13 16.8954 13.8954 16 15 16C16.1046 16 17 16.8954 17 18C17 19.1046 16.1046 20 15 20C13.8954 20 13 19.1046 13 18Z" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: "clarity",
    name: "Microsoft Clarity",
    category: "analytics",
    categoryLabel: "Session Replays",
    description: "Zero-speed-impact heatmaps & session recordings to identify UX friction and checkout rage clicks.",
    metric: "Rage Click Alerts",
    highlight: false,
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <rect width="24" height="24" rx="6" fill="#0078D4"/>
        <rect x="5" y="5" width="6.5" height="6.5" fill="#F25022"/>
        <rect x="12.5" y="5" width="6.5" height="6.5" fill="#7FBA00"/>
        <rect x="5" y="12.5" width="6.5" height="6.5" fill="#00A4EF"/>
        <rect x="12.5" y="12.5" width="6.5" height="6.5" fill="#FFB900"/>
      </svg>
    )
  }
];

export default function ShopifyIntegrationsSection({ onOpenModal }: { onOpenModal?: () => void }) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<IntegrationApp | null>(INTEGRATIONS_LIST[0]);

  const categories = [
    { id: "all", label: "All Integrations" },
    { id: "checkout", label: "Checkout & Payments" },
    { id: "marketing", label: "Email & SMS" },
    { id: "reviews", label: "Reviews & Social Proof" },
    { id: "shipping", label: "Shipping & Logistics" },
    { id: "analytics", label: "Analytics & CRO" },
  ];

  const filteredApps = activeTab === "all" 
    ? INTEGRATIONS_LIST 
    : INTEGRATIONS_LIST.filter(app => app.category === activeTab);

  return (
    <section className="py-16 md:py-24 lg:py-32 relative z-20 overflow-hidden bg-gradient-to-b from-[#120422] via-[#090216] to-[#05010d] border-b border-t border-white/[0.08] rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px]">
      
      {/* Dynamic ambient glowing background orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[45%] h-[500px] rounded-full bg-emerald-500/[0.06] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[500px] rounded-full bg-purple-600/[0.08] blur-[160px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium tracking-wide mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Certified Shopify Ecosystem Integrations</span>
            </div>
            
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight font-grotesk">
              Customize <span className="light-gradient-text font-normal">everything</span> with <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent font-medium">Shopify Integrations</span>
            </h2>
            <p className="mt-4 text-white/70 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              We seamlessly install, configure, and code custom API connectors for essential Shopify apps—reviews, subscriptions, 1-click checkouts, multi-courier shipping, WhatsApp automation, and profit analytics. 
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-6 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shrink-0">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">25+</div>
              <div className="text-xs text-white/50 font-sans mt-0.5">Pre-tested App Syncs</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">0.0s</div>
              <div className="text-xs text-white/50 font-sans mt-0.5">Core Web Vital Impact</div>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/[0.08] mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === cat.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-white/[0.05] text-white/70 hover:text-white hover:bg-white/[0.1] border border-white/[0.06]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Grid & Detail Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Icons Grid (7 Cols on desktop) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4">
              {filteredApps.map((app) => {
                const isSelected = selectedApp?.id === app.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    onMouseEnter={() => setSelectedApp(app)}
                    className={`group relative aspect-square rounded-2xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 text-center select-none ${
                      isSelected
                        ? "bg-emerald-500/10 border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)] scale-105 z-20"
                        : app.highlight
                        ? "bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-emerald-500/50 hover:scale-105"
                        : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/20 hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                  >
                    {/* Icon container */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {app.svg ? (
                        app.svg
                      ) : (
                        <img
                          src={app.src}
                          alt={app.name}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain pointer-events-none rounded-lg"
                        />
                      )}
                    </div>

                    {/* Mini title underneath */}
                    <span className="text-[10px] sm:text-xs font-medium text-white/80 mt-2 truncate max-w-full px-1">
                      {app.name}
                    </span>

                    {/* Highlight indicator dot */}
                    {app.highlight && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected App Spotlight Detail Card (5 Cols on desktop) */}
          <div className="lg:col-span-5 sticky top-28">
            {selectedApp ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-emerald-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-all duration-300 text-left">
                
                {/* Glowing subtle top banner */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
                
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/10 p-2.5 flex items-center justify-center shrink-0 shadow-inner">
                      {selectedApp.svg ? (
                        selectedApp.svg
                      ) : (
                        <img
                          src={selectedApp.src}
                          alt={selectedApp.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-grotesk">{selectedApp.name}</h3>
                      <span className="inline-block text-xs font-mono text-emerald-400 uppercase tracking-wider mt-0.5">
                        {selectedApp.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {selectedApp.metric && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shrink-0">
                      {selectedApp.metric}
                    </span>
                  )}
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-6 font-sans">
                  {selectedApp.description}
                </p>

                {/* Integration Specs List */}
                <div className="flex flex-col gap-3 py-4 border-t border-b border-white/10 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 font-mono uppercase tracking-wider">Architecture</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Clean OS 2.0 Theme App Extension
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 font-mono uppercase tracking-wider">Speed Impact</span>
                    <span className="text-emerald-400 font-mono font-bold">0ms Delay (Lazy-Loaded)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 font-mono uppercase tracking-wider">Customization Level</span>
                    <span className="text-white font-medium">100% Tailored Visual Match</span>
                  </div>
                </div>

                {/* CTA Button inside card */}
                {onOpenModal ? (
                  <button
                    onClick={onOpenModal}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-sm transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request App Integration Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-mono">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Included in custom store builds</span>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] text-center text-white/50 font-sans">
                Hover or tap any app icon to view full integration details & performance benchmarks.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

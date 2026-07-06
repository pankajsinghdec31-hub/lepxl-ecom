"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Search,
  Zap,
  TrendingUp,
  Mail,
  BarChart3,
  Bot,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Chrome = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);

interface ServiceItem {
  title: string;
  desc: string;
  icon: any;
  metric: string;
  bullets: string[];
}

const DEV_SERVICES: ServiceItem[] = [
  {
    title: "Shopify Store Development",
    desc: "Bespoke storefront development leveraging clean architectures, speed optimized Liquid files, and modern checkout modules.",
    icon: Layers,
    metric: "Sub-2.0s Core Web Vitals",
    bullets: ["Bespoke Liquid & Headless builds", "Optimized theme configuration", "Streamlined checkout structures"]
  },
  {
    title: "Product Page Optimization",
    desc: "Redesigning product detail pages (PDP) using e-commerce psychology, reviews placement, trust icons, and dynamic buy boxes.",
    icon: Compass,
    metric: "+35% Add-To-Cart rates",
    bullets: ["Value proposition placement", "Mobile-optimized image grids", "Clear visual sizing/selector drawers"]
  },
  {
    title: "Custom Landing Pages",
    desc: "High-performance, single-focus landing pages designed to transition paid traffic from ad creative hooks directly into purchases.",
    icon: Zap,
    metric: "4.86%+ Average Conversion Rate",
    bullets: ["Zero-clutter product hooks", "Fast loading serverless assets", "A/B copy and structure testing"]
  },
  {
    title: "AI Marketing Integration",
    desc: "Deploying automated customer recommendation flows, personalized sizing assistants, and smart search integrations.",
    icon: Bot,
    metric: "Avg. +15% Upsell AOV",
    bullets: ["Sizing/Style recommendation widgets", "Dynamic collection search", "Conversational support triggers"]
  }
];

const ADS_SERVICES: ServiceItem[] = [
  {
    title: "Meta Ads Scaling",
    desc: "Managing high-budget Facebook and Instagram acquisition campaigns using rigorous audience segmentation and creative test arrays.",
    icon: Facebook,
    metric: "₹20Cr+ Managed Spend",
    bullets: ["Creative testing methodologies", "CAPI setup & catalog syncs", "Lookalike & interest scaling models"]
  },
  {
    title: "Google Ads (Search & PMax)",
    desc: "Capturing high-intent search traffic and scaling digital footprint through Google Shopping and Performance Max campaigns.",
    icon: Chrome,
    metric: "8.76x Blended ROAS",
    bullets: ["Strategic search term bidding", "Asset group optimization", "Negative keyword tuning"]
  },
  {
    title: "Creative Strategy & Hooks",
    desc: "Scripting and producing raw static assets, UGC hook concepts, and dynamic animations engineered to break user scrolling.",
    icon: TrendingUp,
    metric: "Avg. +42% CTR Boost",
    bullets: ["Scroll-stopping visual hook testing", "UGC brief formulation", "Conversion-oriented layout assets"]
  },
  {
    title: "Performance Marketing",
    desc: "Cross-channel paid budget management dynamically routing budgets to the highest-performing acquisition pathways.",
    icon: Search,
    metric: "ROAS-driven scaling",
    bullets: ["Cross-channel allocation logic", "Attribution audit checkups", "Continuous scale optimization"]
  }
];

const RETENTION_SERVICES: ServiceItem[] = [
  {
    title: "Conversion Rate Optimization (CRO)",
    desc: "Rigorous diagnostic audits checking user session hot-maps, finding checkout leak points, and executing A/B test patterns.",
    icon: ShieldCheck,
    metric: "Avg. 2x Conversion Scale",
    bullets: ["Friction points mapping", "A/B layout testing structure", "Add-to-cart conversion tuning"]
  },
  {
    title: "Email & Retention Marketing",
    desc: "Automating customer lifecycle sequences: post-purchase flows, win-backs, and cart abandonment triggers to scale LTV.",
    icon: Mail,
    metric: "30% Net Store Sales",
    bullets: ["Bespoke cart drawer triggers", "Automated customer segmentation", "SMS & newsletter setups"]
  },
  {
    title: "Advanced ECommerce Analytics",
    desc: "Constructing transparent server-side reporting pipelines to verify true customer acquisition cost and blended margins.",
    icon: BarChart3,
    metric: "100% Margin Clarity",
    bullets: ["Profit & loss dashboards", "Pixel/API verification", "Weekly performance audits"]
  }
];

export default function ServicesPage() {
  return (
    <div className="relative py-16 px-6">
      {/* Glow backgrounds */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[500px] rounded-full bg-[#00AF56]/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[500px] rounded-full bg-[#00AF56]/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
            Services & Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How We Scale Shopify Brands
          </h1>
          <p className="text-[#8C8C8C] text-sm sm:text-base leading-relaxed">
            We provide a unified growth engine. By joining web optimization and high-intent customer acquisition campaigns, we ensure that every single advertising rupee performs at maximum capacity.
          </p>
        </div>

        {/* Section 1: Dev Services */}
        <div className="flex flex-col gap-8">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="text-[10px] text-[#8C8C8C] font-mono uppercase tracking-widest">Phase 1: Build the Destination</span>
            <h2 className="text-2xl font-bold text-white mt-1">ECommerce Development & Design</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DEV_SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#181818] border border-white/[0.05] flex flex-col justify-between gap-6 hover:border-[#00AF56]/20 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-[#00AF56]/10 text-[#00AF56] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                    </div>
                    <p className="text-sm text-[#8C8C8C] leading-relaxed">{srv.desc}</p>
                    <ul className="flex flex-col gap-2.5 mt-2">
                      {srv.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-center gap-2 text-xs text-[#D7D7D7]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00AF56]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-white/[0.04] flex justify-between items-center text-xs">
                    <span className="text-[#8C8C8C] uppercase tracking-wider font-mono">Performance Metric</span>
                    <span className="font-bold text-[#00AF56] font-mono">{srv.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Acquisition Services */}
        <div className="flex flex-col gap-8">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="text-[10px] text-[#8C8C8C] font-mono uppercase tracking-widest">Phase 2: Scale the Volume</span>
            <h2 className="text-2xl font-bold text-white mt-1">Paid Acquisition & Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ADS_SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#181818] border border-white/[0.05] flex flex-col justify-between gap-6 hover:border-[#00AF56]/20 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-[#00AF56]/10 text-[#00AF56] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                    </div>
                    <p className="text-sm text-[#8C8C8C] leading-relaxed">{srv.desc}</p>
                    <ul className="flex flex-col gap-2.5 mt-2">
                      {srv.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-center gap-2 text-xs text-[#D7D7D7]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00AF56]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-white/[0.04] flex justify-between items-center text-xs">
                    <span className="text-[#8C8C8C] uppercase tracking-wider font-mono">Performance Metric</span>
                    <span className="font-bold text-[#00AF56] font-mono">{srv.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Retention Services */}
        <div className="flex flex-col gap-8">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="text-[10px] text-[#8C8C8C] font-mono uppercase tracking-widest">Phase 3: Maximize Lifetime Value</span>
            <h2 className="text-2xl font-bold text-white mt-1">Retention & CRO Optimizations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RETENTION_SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#181818] border border-white/[0.05] flex flex-col justify-between gap-6 hover:border-[#00AF56]/20 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-[#00AF56]/10 text-[#00AF56] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                    </div>
                    <p className="text-sm text-[#8C8C8C] leading-relaxed">{srv.desc}</p>
                    <ul className="flex flex-col gap-2.5 mt-2">
                      {srv.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-center gap-2 text-xs text-[#D7D7D7]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00AF56]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-white/[0.04] flex justify-between items-center text-xs">
                    <span className="text-[#8C8C8C] uppercase tracking-wider font-mono">Performance Metric</span>
                    <span className="font-bold text-[#00AF56] font-mono">{srv.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final call to action section */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#111111] border border-white/[0.08] text-center flex flex-col gap-6 items-center">
          <h2 className="text-xl md:text-2xl font-bold text-white max-w-xl">
            Ready to implement a unified Shopify growth architecture?
          </h2>
          <p className="text-xs text-[#8C8C8C] max-w-lg leading-relaxed">
            Schedule a session to analyze your checkout parameters, identify landing page gaps, and align budget structures.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all hover:shadow-[0_0_20px_rgba(0,175,86,0.3)]"
          >
            <span>Book Free Discovery Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

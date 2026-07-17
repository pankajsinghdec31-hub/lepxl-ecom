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

const SERVICES: ServiceItem[] = [
  {
    title: "Shopify Store Development",
    desc: "Clean Shopify architectures, Liquid optimization, and modern checkout builds.",
    icon: Layers,
    metric: "Sub-2.0s Core Web Vitals",
    bullets: ["Bespoke Liquid & custom builds", "Optimized theme configuration", "Streamlined checkout structures"]
  },
  {
    title: "Product Page Optimization",
    desc: "High-converting PDP layouts, strategic review hooks, and sticky option selectors.",
    icon: Compass,
    metric: "+35% Add-To-Cart rates",
    bullets: ["Value proposition placement", "Mobile-optimized image grids", "Clear visual sizing/selector drawers"]
  },
  {
    title: "Shopify Store Migrations",
    desc: "Risk-free catalog data, SEO redirect configurations, and layout transition mapping.",
    icon: Zap,
    metric: "Zero SEO Traffic Loss",
    bullets: ["Seamless data & catalog migration", "Exact 301 URL redirect mapping", "Preserved organic search rankings"]
  },
  {
    title: "Speed & Performance Tuning",
    desc: "Liquid script auditing, lazy-loading sequences, and asset compression.",
    icon: CheckCircle2,
    metric: "Consistently 90+ Score",
    bullets: ["Image compression & lazy-loading", "JavaScript & CSS minification", "App asset loading optimization"]
  },
  {
    title: "Conversion Rate Optimization (CRO)",
    desc: "Session hot-map profiling, leak auditing, and checkout speed optimization.",
    icon: ShieldCheck,
    metric: "Avg. 2x Conversion Scale",
    bullets: ["Friction points mapping", "Add-to-cart conversion tuning", "Optimized cart drawer modules"]
  },
  {
    title: "App & Custom Integrations",
    desc: "ERP integrations, automated third-party shipping plugins, and custom APIs.",
    icon: Bot,
    metric: "100% API Sync Rate",
    bullets: ["Bespoke API integrations", "ERP & warehouse connections", "Third-party subscription setups"]
  }
];

export default function ServicesPage() {
  return (
    <div className="relative py-16 px-6 text-left">
      {/* Glow backgrounds */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[500px] rounded-full bg-primary/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[500px] rounded-full bg-primary/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
            Services & Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Shopify Storefront Engineering
          </h1>
          <p className="text-[#8e8e93] text-sm sm:text-base leading-relaxed">
            We build custom, speed-optimized Shopify storefronts and engineer high-converting purchase paths. No pre-made templates—just custom high-performance e-commerce engineering.
          </p>
        </div>

        {/* Section 1: Services Grid */}
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl glass-card flex flex-col justify-between gap-6 hover:border-primary/20 transition-all duration-300 shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                    </div>
                    <p className="text-sm text-[#8e8e93] leading-relaxed">{srv.desc}</p>
                    <ul className="flex flex-col gap-2.5 mt-2">
                      {srv.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-center gap-2 text-xs text-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-white/[0.05] flex justify-between items-center text-xs">
                    <span className="text-[#8e8e93] uppercase tracking-wider font-mono">Performance Metric</span>
                    <span className="font-bold text-primary font-mono">{srv.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final call to action section */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#0a0a0a] border border-white/[0.05] text-center flex flex-col gap-6 items-center">
          <h2 className="text-xl md:text-2xl font-bold text-white max-w-xl">
            Ready to build or migrate your Shopify store?
          </h2>
          <p className="text-xs text-[#8e8e93] max-w-lg leading-relaxed">
            Schedule a session to analyze your platform requirements, speed bottlenecks, and outline a step-by-step launch roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-[#2a6350] transition-all hover:shadow-[0_8px_24px_rgba(55,126,98,0.25)]"
          >
            <span>Book Free Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

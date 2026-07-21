"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Zap,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Bot,
  Sparkles
} from "lucide-react";

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
    title: "AI Photo Shoot",
    desc: "Transform basic flat-lays and mannequin shots into high-end, premium studio model lifestyle imagery.",
    icon: Sparkles,
    metric: "90% Photo Costs Saved",
    bullets: ["High-end studio model generation", "Realistic lifestyle background mockups", "Super-resolution catalog-ready outputs"]
  },
  {
    title: "Speed & Performance Tuning",
    desc: "Liquid script optimization, lazy-loading sequences, and asset compression.",
    icon: CheckCircle2,
    metric: "Consistently 90+ Score",
    bullets: ["Image compression & lazy-loading", "JavaScript & CSS minification", "App asset loading optimization"]
  },
  {
    title: "Conversion Rate Optimization (CRO)",
    desc: "Session heat-map profiling, friction analysis, and checkout speed optimization.",
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
    <div className="relative pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Glow backgrounds */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[500px] rounded-full bg-emerald-400/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[500px] rounded-full bg-teal-300/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-20 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-3 sm:gap-5">

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Shopify Store <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Engineering</span>
          </h1>
          <p className="text-neutral-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Traffic comes from anywhere, but trust comes from your store. We build custom, speed-optimized Shopify Stores and engineer high-converting purchase paths. No pre-made templates—just custom High Converting Ecommerce Store engineering.
          </p>
        </div>

        {/* Section 1: Services Grid */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 font-sans">
            {SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/80 border border-neutral-200/80 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between gap-5 shadow-sm backdrop-blur-xl text-left"
                >
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 group">
                      <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-grotesk">{srv.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{srv.desc}</p>
                    <ul className="flex flex-col gap-2 mt-1 sm:mt-2">
                      {srv.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-neutral-200/60 flex justify-between items-center text-[10px] sm:text-xs">
                    <span className="text-neutral-500 uppercase tracking-wider font-mono">Performance Metric</span>
                    <span className="font-bold text-emerald-600 font-mono">{srv.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* Final call to action section */}
        <div className="p-6 md:p-12 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/80 shadow-sm text-center flex flex-col gap-4 sm:gap-6 items-center backdrop-blur-xl font-sans">
          <h2 className="text-lg md:text-2xl font-bold text-neutral-900 font-grotesk">
            Ready to build or migrate your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Shopify store?</span>
          </h2>
          <p className="text-xs text-neutral-600 max-w-lg leading-relaxed">
            Schedule a session to analyze your platform requirements, speed bottlenecks, and outline a step-by-step launch roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 transition-all shadow-sm"
          >
            <span>Book Free Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

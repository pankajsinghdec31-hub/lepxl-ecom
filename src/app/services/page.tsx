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
    <div className="relative min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] text-neutral-900 pt-44 pb-20 relative overflow-hidden font-sans -mt-24">
      {/* Glow backgrounds */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[500px] rounded-full bg-emerald-400/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[500px] rounded-full bg-teal-300/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-20 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">

          <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Shopify Storefront <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Engineering</span>
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
            Traffic comes from anywhere, but trust comes from your store. We build custom, speed-optimized Shopify storefronts and engineer high-converting purchase paths. No pre-made templates—just custom high-performance e-commerce engineering.
          </p>
        </div>

        {/* Section 1: Services Grid */}
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
            {SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white/70 border border-neutral-200/60 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between gap-6 shadow-sm backdrop-blur-xl text-left"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 group">
                      <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg font-bold text-neutral-900 font-grotesk">{srv.title}</h3>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed">{srv.desc}</p>
                    <ul className="flex flex-col gap-2.5 mt-2">
                      {srv.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-center gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-neutral-200/60 flex justify-between items-center text-xs">
                    <span className="text-neutral-500 uppercase tracking-wider font-mono">Performance Metric</span>
                    <span className="font-bold text-emerald-600 font-mono">{srv.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final call to action section */}
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-neutral-200/60 shadow-sm text-center flex flex-col gap-6 items-center backdrop-blur-xl font-sans">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 font-grotesk">
            Ready to build or migrate your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Shopify store?</span>
          </h2>
          <p className="text-xs text-neutral-600 max-w-lg leading-relaxed">
            Schedule a session to analyze your platform requirements, speed bottlenecks, and outline a step-by-step launch roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 transition-all shadow-sm"
          >
            <span>Book Free Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

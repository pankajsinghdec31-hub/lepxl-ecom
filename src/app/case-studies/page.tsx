"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function CaseStudiesPage() {
  return (
    <div className="relative py-16 px-6 text-left">
      {/* Background glow highlights */}
      <div className="absolute top-[10%] left-1/4 w-96 h-96 rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
            Performance Ledger
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Case Studies: Speed & CRO Results
          </h1>
          <p className="text-[#8e8e93] text-sm sm:text-base leading-relaxed">
            No theories. We document the exact design architectures, performance metrics, and speed tuning we use to lift conversion rates.
          </p>
        </div>

        {/* Featured Case Study: ECOM-SCALE */}
        <div className="rounded-3xl glass-card p-8 md:p-12 flex flex-col gap-12 relative overflow-hidden shadow-sm">
          {/* Subtle glow edge */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none" />

          {/* Heading block */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.05] pb-8 relative z-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-primary font-mono uppercase tracking-wider font-bold">Featured Case Study</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                Shopify Rebuild & Conversion Architecture
              </h2>
            </div>
            
            <div className="px-5 py-2.5 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-primary font-mono">VERIFIED AUDIT LOG</span>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col gap-2">
              <span className="text-xs text-[#8e8e93] font-mono uppercase tracking-wider font-semibold">Mobile Page Speed</span>
              <span className="text-3xl font-extrabold text-white font-mono">1.9 Seconds</span>
              <span className="text-[10px] text-[#8e8e93] mt-1">Improved from 6.8s load times</span>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col gap-2">
              <span className="text-xs text-[#8e8e93] font-mono uppercase tracking-wider font-semibold">Conversion Rate</span>
              <span className="text-3xl font-extrabold text-primary font-mono">4.2%</span>
              <span className="text-[10px] text-primary font-medium mt-1">+281% Net conversion lift</span>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col gap-2">
              <span className="text-xs text-[#8e8e93] font-mono uppercase tracking-wider font-semibold">Revenue Growth</span>
              <span className="text-3xl font-extrabold text-white font-mono">+410%</span>
              <span className="text-[10px] text-[#8e8e93] mt-1">Net sales scale in 90 days</span>
            </div>
          </div>

          {/* Breakdown Detail Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 pt-4">
            
            {/* Left Column Strategy Details */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">The Optimization Strategy</h3>
              
              <div className="flex flex-col gap-4 text-sm text-[#8e8e93] leading-relaxed">
                <p>
                  Storefront optimization resolves ad budget waste. We rebuild checkout pathways and loading sequences to secure customer trust and boost profit margins.
                </p>
              </div>

              {/* Execution steps */}
              <div className="flex flex-col gap-4 mt-2">
                {[
                  {
                    title: "Phase 1: Speed & Design Auditing",
                    desc: "Restructured Liquid render sequence, securing 1.9s mobile load time to eliminate bounces."
                  },
                  {
                    title: "Phase 2: One-Click Cart Rebuild",
                    desc: "Implemented slide-out cart drawer, sticky buy-boxes, and simplified forms."
                  },
                  {
                    title: "Phase 3: Trust Factor Tuning",
                    desc: "Positioned social proof counts and MSME stamps adjacent to price tags."
                  },
                  {
                    title: "Phase 4: OS 2.0 Integration",
                    desc: "Upgraded sections, enabling brand editors to configure custom layouts without code."
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 text-primary flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{step.title}</span>
                      <span className="text-xs text-[#8e8e93] mt-1 leading-relaxed">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Data Breakdown */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.05] pb-2">
                  Optimization Indicators
                </h3>
                
                {/* Platform allocations details */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>Speed Optimization Index</span>
                      <span>97 / 100</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "97%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#8e8e93] mt-0.5 font-mono">
                      <span>Target: 90+ Score</span>
                      <span>Impact: -48% Bounces</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>User Engagement Index</span>
                      <span>88 / 100</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "88%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#8e8e93] mt-0.5 font-mono">
                      <span>Cart Additions: +35%</span>
                      <span>Bounce Reduction: -52%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Checklist Details */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-3">
                <span className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Store optimization impact</span>
                <div className="flex flex-col gap-2 text-left">
                  {[
                    "Store Load Speed: 1.9 Seconds",
                    "Add-to-Cart Conversion Rate: 4.86%",
                    "Customer bounce reduction: -48%",
                    "Average Cart Order Value: +24%"
                  ].map((chk) => (
                    <div key={chk} className="flex items-center gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="text-white font-mono">{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Call to action footer section */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#0a0a0a] border border-white/[0.05] text-center flex flex-col gap-6 items-center">
          <h2 className="text-xl md:text-2xl font-bold text-white max-w-xl">
            Want to audit your brand's storefront performance?
          </h2>
          <p className="text-xs text-[#8e8e93] max-w-lg leading-relaxed">
            Let Pankaj Singh audit your current checkout funnel and page speed metrics to map out a performance structure tailored to your product catalog.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-[#2a6350] transition-all hover:shadow-[0_8px_24px_rgba(55,126,98,0.25)]"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export default function CaseStudiesPage() {
  return (
    <div className="relative pt-24 sm:pt-32 pb-24 px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Background glow highlights */}
      <div className="absolute top-[10%] left-1/4 w-96 h-96 rounded-full bg-emerald-400/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-1/4 w-[400px] h-[400px] rounded-full bg-teal-300/[0.03] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-5">

          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Case Studies: <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Speed & CRO Results</span>
          </h1>
          <p className="text-neutral-600 text-base leading-relaxed max-w-2xl mx-auto font-sans">
            No theories. We document the exact design architectures, performance metrics, and speed tuning we use to lift conversion rates.
          </p>
        </div>

        {/* Featured Case Study: ECOM-SCALE */}
        <div className="p-8 md:p-12 rounded-3xl bg-white/70 border border-neutral-200/60 flex flex-col gap-12 relative overflow-hidden shadow-sm backdrop-blur-xl text-left">
          {/* Subtle glow edge */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-400/[0.04] blur-[100px] pointer-events-none" />

          {/* Heading block */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-200/60 pb-8 relative z-10 font-sans">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-emerald-700 font-sans uppercase tracking-wider font-bold">Featured Case Study</span>
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight leading-tight font-grotesk">
                Shopify <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Rebuild</span> & <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans font-grotesk">Conversion Architecture</span>
              </h2>
            </div>
            
            <div className="px-5 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200/50 flex items-center gap-3 w-max">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700 font-sans">VERIFIED PERFORMANCE LOG</span>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 font-sans">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex flex-col gap-2 shadow-inner">
              <span className="text-xs text-neutral-500 font-sans uppercase tracking-wider font-semibold">Mobile Page Speed</span>
              <span className="text-3xl font-extrabold text-neutral-900 font-sans">1.9 Seconds</span>
              <span className="text-[10px] text-neutral-500 mt-1">Improved from 6.8s load times</span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex flex-col gap-2 shadow-inner">
              <span className="text-xs text-neutral-500 font-sans uppercase tracking-wider font-semibold">Conversion Rate</span>
              <span className="text-3xl font-extrabold text-emerald-600 font-sans">4.2%</span>
              <span className="text-[10px] text-emerald-700 font-semibold mt-1">+281% Net conversion lift</span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex flex-col gap-2 shadow-inner">
              <span className="text-xs text-neutral-500 font-sans uppercase tracking-wider font-semibold">Revenue Growth</span>
              <span className="text-3xl font-extrabold text-neutral-900 font-sans">+410%</span>
              <span className="text-[10px] text-neutral-500 mt-1">Net sales scale in 90 days</span>
            </div>
          </div>

          {/* Breakdown Detail Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 pt-4 font-sans">
            
            {/* Left Column Strategy Details */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <h3 className="text-lg font-bold text-neutral-900 font-grotesk uppercase tracking-wider">The Optimization Strategy</h3>
              
              <div className="flex flex-col gap-4 text-sm text-neutral-600 leading-relaxed font-sans">
                <p>
                  Storefront optimization resolves ad budget waste. We rebuild checkout pathways and loading sequences to secure customer trust and boost profit margins.
                </p>
              </div>

              {/* Execution steps */}
              <div className="flex flex-col gap-4 mt-2">
                {[
                  {
                    title: "Phase 1: Speed & Design Optimization",
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
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold font-sans">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-semibold text-neutral-800">{step.title}</span>
                      <span className="text-xs text-neutral-500 mt-1 leading-relaxed">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Data Breakdown */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-50 border border-neutral-200/60 shadow-inner flex flex-col justify-between gap-6 text-left">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 border-b border-neutral-200/60 pb-2 font-grotesk">
                  Optimization Indicators
                </h3>
                
                {/* Platform allocations details */}
                <div className="flex flex-col gap-4 font-sans">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-neutral-800">
                      <span>Speed Optimization Index</span>
                      <span>97 / 100</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "97%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-500 mt-0.5 font-sans">
                      <span>Target: 90+ Score</span>
                      <span>Impact: -48% Bounces</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-neutral-800">
                      <span>User Engagement Index</span>
                      <span>88 / 100</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: "88%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-500 mt-0.5 font-sans">
                      <span>Cart Additions: +35%</span>
                      <span>Bounce Reduction: -52%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Checklist Details */}
              <div className="p-4 rounded-xl bg-white/70 border border-neutral-200/60 flex flex-col gap-3 shadow-sm">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Store optimization impact</span>
                <div className="flex flex-col gap-2 text-left">
                  {[
                    "Store Load Speed: 1.9 Seconds",
                    "Add-to-Cart Conversion Rate: 4.86%",
                    "Customer bounce reduction: -48%",
                    "Average Cart Order Value: +24%"
                  ].map((chk) => (
                    <div key={chk} className="flex items-center gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-neutral-800 font-sans font-medium">{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Call to action footer section */}
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-neutral-200/60 shadow-sm text-center flex flex-col gap-6 items-center backdrop-blur-xl font-sans">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 font-grotesk">
            Want to optimize your brand's <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">store performance?</span>
          </h2>
          <p className="text-xs text-neutral-600 max-w-lg leading-relaxed">
            Let Pankaj Singh analyze your current checkout funnel and page speed metrics to map out a performance structure tailored to your product catalog.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 transition-all shadow-sm"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

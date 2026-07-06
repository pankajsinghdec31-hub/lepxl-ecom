"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, Award, DollarSign, Target, ArrowUpRight, BarChart3, Check, ArrowRight } from "lucide-react";

export default function CaseStudiesPage() {
  return (
    <div className="relative py-16 px-6">
      {/* Background glow highlights */}
      <div className="absolute top-[10%] left-1/4 w-96 h-96 rounded-full bg-[#00AF56]/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-1/4 w-[400px] h-[400px] rounded-full bg-[#00AF56]/[0.02] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
            Performance Ledger
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Case Studies: Proven Growth
          </h1>
          <p className="text-[#8C8C8C] text-sm sm:text-base leading-relaxed">
            No theories. No boilerplate audits. We document the numbers, budgets, and architectures we use to scale conversions and ad spend profitably.
          </p>
        </div>

        {/* Featured Case Study: ECOM-SCALE-8.76x */}
        <div className="rounded-3xl bg-[#181818] border border-white/[0.08] p-8 md:p-12 flex flex-col gap-12 relative overflow-hidden">
          {/* Subtle glow edge */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00AF56]/[0.03] blur-[100px] pointer-events-none" />

          {/* Heading block */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.05] pb-8 relative z-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-[#00AF56] font-mono uppercase tracking-wider font-bold">Featured Case Study</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                Scaling ECommerce Revenue via Conversion Architecture
              </h2>
            </div>
            
            <div className="px-5 py-2.5 rounded-2xl bg-[#111111] border border-[#00AF56]/30 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00AF56] animate-pulse" />
              <span className="text-xs font-bold text-[#00AF56] font-mono">VERIFIED AUDIT LOG</span>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.05] flex flex-col gap-2">
              <span className="text-xs text-[#8C8C8C] font-mono uppercase tracking-wider">Aggregate Ad Spend</span>
              <span className="text-3xl font-extrabold text-white font-mono">₹21,000</span>
              <span className="text-[10px] text-[#8C8C8C] mt-1">Managed Meta & Google search campaigns</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.05] flex flex-col gap-2">
              <span className="text-xs text-[#8C8C8C] font-mono uppercase tracking-wider">Generated Sales Revenue</span>
              <span className="text-3xl font-extrabold text-[#00AF56] font-mono">₹1,86,897</span>
              <span className="text-[10px] text-[#00AF56] font-medium mt-1">+789% Net growth yield</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.05] flex flex-col gap-2">
              <span className="text-xs text-[#8C8C8C] font-mono uppercase tracking-wider">Blended ROAS (Return)</span>
              <span className="text-3xl font-extrabold text-white font-mono">8.76x</span>
              <span className="text-[10px] text-[#8C8C8C] mt-1">Blended return across all channels</span>
            </div>
          </div>

          {/* Breakdown Detail Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 pt-4">
            
            {/* Left Column Strategy Details */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">The Scaling Strategy</h3>
              
              <div className="flex flex-col gap-4 text-sm text-[#8C8C8C] leading-relaxed">
                <p>
                  Most ecommerce brands encounter a scaling plateau. As they increase budgets on Facebook & Instagram, their CPA spikes, destroying margins. The core bottleneck is not the ad engine—it is the destination storefront.
                </p>
                <p>
                  For this campaign, we structured a multi-phase turnaround strategy:
                </p>
              </div>

              {/* Execution steps */}
              <div className="flex flex-col gap-4 mt-2">
                {[
                  {
                    title: "Phase 1: Speed & Design Auditing",
                    desc: "Reconfigured the Shopify theme script rendering sequence, compressed graphic bundles, and achieved a 1.9s mobile load time to eliminate click bounces."
                  },
                  {
                    title: "Phase 2: Hook Creative Formulation",
                    desc: "Structured high-hook UGC video assets highlighting user pain points in the first 3 seconds, taking CTR from 1.1% to 3.4%."
                  },
                  {
                    title: "Phase 3: Search Term Funneling",
                    desc: "Mapped Google Search and Performance Max campaigns directly to high-margin collection bundles to secure immediate high AOV conversions."
                  },
                  {
                    title: "Phase 4: Lifespan Email Setup",
                    desc: "Launched automated cart abandonment sequences and post-purchase customer recommendation tags to capture a 30% retention sales buffer."
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-[#00AF56]/15 border border-[#00AF56]/30 text-[#00AF56] flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{step.title}</span>
                      <span className="text-xs text-[#8C8C8C] mt-1 leading-relaxed">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Data Breakdown */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111111] border border-white/[0.05] flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.04] pb-2">
                  Ad Spend Allocation & Yield
                </h3>
                
                {/* Platform allocations details */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>Meta Ads (FB/IG)</span>
                      <span>₹12,500 Spend</span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#8C8C8C] mt-0.5 font-mono">
                      <span>Yield: ₹1,12,500</span>
                      <span>ROAS: 9.0x</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>Google Ads (Search/PMax)</span>
                      <span>₹8,500 Spend</span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "40%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#8C8C8C] mt-0.5 font-mono">
                      <span>Yield: ₹74,397</span>
                      <span>ROAS: 8.75x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Checklist Details */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04] flex flex-col gap-3">
                <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Store optimization impact</span>
                <div className="flex flex-col gap-2">
                  {[
                    "Store Load Speed: 1.9 Seconds",
                    "Add-to-Cart Conversion Rate: 4.86%",
                    "Customer bounce reduction: -48%",
                    "Average Cart Order Value: +24%"
                  ].map((chk) => (
                    <div key={chk} className="flex items-center gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-[#00AF56] shrink-0" />
                      <span className="text-[#D7D7D7] font-mono">{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Call to action footer section */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#111111] border border-white/[0.08] text-center flex flex-col gap-6 items-center">
          <h2 className="text-xl md:text-2xl font-bold text-white max-w-xl">
            Want to audit your brand's potential scaling ROAS?
          </h2>
          <p className="text-xs text-[#8C8C8C] max-w-lg leading-relaxed">
            Let Pankaj Singh audit your current checkout funnel and paid ads setup to map out a scaling structure tailored to your product catalog.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all hover:shadow-[0_0_20px_rgba(0,175,86,0.3)]"
          >
            <span>Book Strategy Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { ArrowDown, Check, X, Shield, ShoppingCart, TrendingUp, Sparkles, Award } from "lucide-react";
import { motion } from "framer-motion";

const FUNNEL_STAGES = [
  { name: "Traffic Channels", label: "Paid Social, Search & Email Marketing", desc: "Top of Funnel: Driving visitors to your store", color: "from-[#8C8C8C]/20 to-[#8C8C8C]/5" },
  { name: "Landing Experience", label: "Custom Dedicated Landing Pages", desc: "Engaging prospects on specific benefits", color: "from-[#8C8C8C]/20 to-[#8C8C8C]/5" },
  { name: "Shopify Store", label: "Ultra-Premium conversion-focused store", desc: "Showcasing brand value, premium speed & UX", color: "from-primary/20 to-primary/5" },
  { name: "Consumer Trust", label: "Social proof, speed, flawless Checkout", desc: "Creating buying confidence instantly", color: "from-primary/30 to-primary/10" },
  { name: "Conversion Event", label: "High-value purchase transaction", desc: "Decreased cart abandonment, higher AOV", color: "from-primary/40 to-primary/15" },
  { name: "Exponential Revenue", label: "Customer LTV & Maximum Revenue Yield", desc: "Unlocking profitable, conversion-led growth", color: "from-primary/50 to-primary/25" }
];

export default function InteractiveFunnel() {
  const [activeModel, setActiveModel] = useState<"traditional" | "salepxl">("salepxl");

  return (
    <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto">
      
      {/* Dynamic Model Selector Tabs */}
      <div className="flex justify-center">
        <div className="bg-white/[0.02] p-1.5 rounded-full border border-white/[0.05] flex gap-2">
          <button
            onClick={() => setActiveModel("traditional")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeModel === "traditional"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "text-[#8e8e93] hover:text-white"
            }`}
          >
            <X className="w-3.5 h-3.5" /> Traditional Agency
          </button>
          
          <button
            onClick={() => setActiveModel("salepxl")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeModel === "salepxl"
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-[#8e8e93] hover:text-white"
            }`}
          >
            <Check className="w-3.5 h-3.5" /> SalePXL Growth Engine
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Model Execution Flow */}
        <div className="p-6 rounded-2xl glass-card flex flex-col justify-between relative overflow-hidden shadow-sm">
          {/* Subtle glow layer */}
          <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none transition-colors duration-500 ${
            activeModel === "traditional" ? "bg-red-500" : "bg-primary"
          }`} />

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
              <div>
                <span className="text-[10px] text-[#8e8e93] font-mono uppercase tracking-widest">Operating Framework</span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeModel === "traditional" ? "The Ad-Only Approach" : "The Unified Growth Funnel"}
                </h3>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                activeModel === "traditional" ? "bg-red-500/10 text-red-400" : "bg-primary/10 text-primary"
              }`}>
                {activeModel === "traditional" ? "High Burn" : "Hyper-Efficient"}
              </span>
            </div>

            {/* Model Bullet Checklist */}
            <div className="flex flex-col gap-4">
              {activeModel === "traditional" ? (
                <>
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded-lg bg-red-500/10 text-red-500 mt-0.5"><X className="w-4 h-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">Focuses only on Ad Spend</p>
                      <p className="text-xs text-[#8e8e93] mt-0.5">Throws traffic at poorly built websites without resolving optimization leaks.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded-lg bg-red-500/10 text-red-500 mt-0.5"><X className="w-4 h-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">High Customer Acquisition Cost (CPA)</p>
                      <p className="text-xs text-[#8e8e93] mt-0.5">Bidding is expensive when site trust is missing, resulting in low ad scores.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded-lg bg-red-500/10 text-red-500 mt-0.5"><X className="w-4 h-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">Poor Store Speed & UX</p>
                      <p className="text-xs text-[#8e8e93] mt-0.5">Slow loading times trigger massive click bounces, costing money for zero sales.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded-lg bg-red-500/10 text-red-500 mt-0.5"><X className="w-4 h-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">Static Store Layouts</p>
                      <p className="text-xs text-[#8e8e93] mt-0.5">Fails to leverage landing page testing, leaving standard themes unoptimized.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded-lg bg-primary/10 text-primary mt-0.5"><Check className="w-4 h-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">Shopify Optimizations + Scale Ads</p>
                      <p className="text-xs text-[#8e8e93] mt-0.5">We optimize speed, branding, and purchase paths before routing paid traffic.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded-lg bg-primary/10 text-primary mt-0.5"><Check className="w-4 h-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">Ultra-Low CPA & Maximum ROAS</p>
                      <p className="text-xs text-[#8e8e93] mt-0.5">Highly responsive design matches ad hooks, creating trust and high relevance.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded-lg bg-primary/10 text-primary mt-0.5"><Check className="w-4 h-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">Lightning Fast Store Performance</p>
                      <p className="text-xs text-[#8e8e93] mt-0.5">Optimized code, clean script structures, and premium modern UX assets.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded-lg bg-primary/10 text-primary mt-0.5"><Check className="w-4 h-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">Continuous A/B Conversion Tactics</p>
                      <p className="text-xs text-[#8e8e93] mt-0.5">Continuous testing of PDP structure, pricing hooks, and custom layouts.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Core Outcomes */}
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/[0.05]">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Avg. Shopify Conv. Rate</span>
              <span className={`text-xl font-bold font-mono ${activeModel === "traditional" ? "text-red-400" : "text-primary"}`}>
                {activeModel === "traditional" ? "1.24%" : "4.86%+"}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 text-right">
              <span className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Blended Ad ROAS</span>
              <span className={`text-xl font-bold font-mono ${activeModel === "traditional" ? "text-red-400" : "text-primary"}`}>
                {activeModel === "traditional" ? "1.8x - 2.5x" : "8.76x Avg."}
              </span>
            </div>
          </div>
        </div>

        {/* The Visual Scaling Funnel */}
        <div className="flex flex-col justify-center items-stretch gap-3">
          <span className="text-xs font-semibold text-white uppercase tracking-widest text-center mb-1">
            Conversion Flow Funnel
          </span>
          <div className="flex flex-col gap-2 relative">
            {/* SVG Connector line in background */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-white/[0.03] via-primary/40 to-primary transform -translate-x-1/2 -z-10" />

            {FUNNEL_STAGES.map((stage, idx) => {
              const isSalePXLStage = idx >= 2;
              const isActive = activeModel === "salepxl" || !isSalePXLStage;
              
              return (
                <div
                  key={stage.name}
                  className={`relative flex items-center p-3 px-5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? isSalePXLStage
                        ? "bg-primary/[0.04] border-primary/30 text-white"
                        : "bg-white/[0.02] border-white/[0.05] text-white"
                      : "bg-white/[0.01] border-white/[0.03] text-[#8e8e93] opacity-30"
                  }`}
                  style={{
                    marginLeft: `${idx * 4}%`,
                    marginRight: `${idx * 4}%`,
                  }}
                >
                  <div className="flex items-center gap-4 w-full">
                    {/* Badge Indicator */}
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isActive
                        ? isSalePXLStage
                          ? "bg-primary text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
                          : "bg-white/10 text-white"
                        : "bg-white/[0.03] text-[#8e8e93]"
                    }`}>
                      {idx + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold tracking-tight truncate">{stage.name}</h4>
                        {isSalePXLStage && activeModel === "salepxl" && (
                          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-[#8e8e93] truncate mt-0.5">{stage.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

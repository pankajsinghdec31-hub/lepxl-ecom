"use client";

import React, { useState } from "react";
import { Coins, TrendingUp, Sparkles, ArrowUpRight, Percent } from "lucide-react";
import { motion } from "framer-motion";

export default function ROICalculator() {
  const [adSpend, setAdSpend] = useState(150000);
  const [convRate, setConvRate] = useState(1.2);
  const [aov, setAov] = useState(1800);

  // Constants
  const CPC = 15; // Average CPC in INR
  const TARGET_CONV_RATE = 4.86; // SalePXL Target

  // Calculations
  const clicks = Math.round(adSpend / CPC);
  const currentOrders = Math.round(clicks * (convRate / 100));
  const currentRevenue = currentOrders * aov;
  const currentRoas = adSpend > 0 ? Number((currentRevenue / adSpend).toFixed(2)) : 0;

  const targetOrders = Math.round(clicks * (TARGET_CONV_RATE / 100));
  const targetRevenue = targetOrders * aov;
  const targetRoas = adSpend > 0 ? Number((targetRevenue / adSpend).toFixed(2)) : 0;

  const extraRevenue = targetRevenue - currentRevenue;
  const multiplier = convRate > 0 ? Number((TARGET_CONV_RATE / convRate).toFixed(1)) : 0;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl glass-card p-6 sm:p-8 overflow-hidden shadow-sm">
      {/* Dynamic ambient highlight */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-indigo-500/[0.02] blur-[80px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Side: Interactive Sliders */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Growth Simulator
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Calculate Your Shopify Scale Gap
            </h3>
            <p className="text-xs text-[#8e8e93] leading-relaxed">
              Drag the parameters below matching your current storefront metrics. See how many sales are lost due to checkout friction.
            </p>
          </div>

          <div className="flex flex-col gap-6 pt-4">
            {/* Input 1: Monthly Ad Spend */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8e8e93] font-semibold">Monthly Ad Spend</span>
                <span className="text-white font-mono font-bold text-sm bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-lg">
                  {formatCurrency(adSpend)}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="2000000"
                step="10000"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-[#8e8e93] font-mono">
                <span>₹20K</span>
                <span>₹10L</span>
                <span>₹20L+</span>
              </div>
            </div>

            {/* Input 2: Conversion Rate */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8e8e93] font-semibold">Current Store Conversion Rate</span>
                <span className="text-white font-mono font-bold text-sm bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-lg flex items-center gap-0.5">
                  {convRate}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={convRate}
                onChange={(e) => setConvRate(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-[#8e8e93] font-mono">
                <span>0.5% (Poor)</span>
                <span>2.0% (Average)</span>
                <span>4.0%+ (High)</span>
              </div>
            </div>

            {/* Input 3: Average Order Value (AOV) */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8e8e93] font-semibold">Average Order Value (AOV)</span>
                <span className="text-white font-mono font-bold text-sm bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-lg">
                  ₹{aov.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-[#8e8e93] font-mono">
                <span>₹500</span>
                <span>₹5,000</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[#8e8e93] leading-relaxed pt-2 border-t border-white/[0.05]">
            * Calculated using a benchmark Cost-Per-Click (CPC) of ₹15. Higher storefront conversion rate directly lowers acquisition cost per purchase.
          </div>
        </div>

        {/* Right Side: Growth Projection Screen */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex flex-col gap-4">
            <span className="text-[10px] text-[#8e8e93] font-mono uppercase tracking-widest">Projection Output</span>
            
            {/* Projected Extra Revenue */}
            <div className="flex flex-col">
              <span className="text-xs text-[#8e8e93]">Untapped Monthly Revenue</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-primary font-mono tracking-tight mt-1">
                +{formatCurrency(extraRevenue)}
              </span>
              <span className="text-[10px] text-[#8e8e93] font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                {multiplier}x Revenue Multiplier with SalePXL optimization
              </span>
            </div>

            {/* Side-by-side comparison stats */}
            <div className="flex flex-col gap-3.5 mt-4 pt-4 border-t border-white/[0.05]">
              {/* Row 1: Conversion Rates */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8e8e93]">Conversion Target</span>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-red-400 line-through">{convRate}%</span>
                  <span className="text-white font-bold">{TARGET_CONV_RATE}%</span>
                </div>
              </div>

              {/* Row 2: Monthly Orders */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8e8e93]">Estimated Orders</span>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-red-400">{currentOrders}</span>
                  <span className="text-white font-bold">{targetOrders}</span>
                </div>
              </div>

              {/* Row 3: Blended ROAS */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8e8e93]">Ad Account ROAS</span>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-red-400">{currentRoas}x</span>
                  <span className="text-white font-bold">{targetRoas}x</span>
                </div>
              </div>

              {/* Row 4: Total Revenue */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8e8e93]">Projected Revenue</span>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-red-400">{formatCurrency(currentRevenue)}</span>
                  <span className="text-primary font-bold">{formatCurrency(targetRevenue)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.05] flex flex-col gap-2">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-primary hover:bg-[#2a6350] transition-all text-center hover:shadow-[0_8px_24px_rgba(16,185,129,0.15)]"
            >
              <span>Secure This Scale Boost</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

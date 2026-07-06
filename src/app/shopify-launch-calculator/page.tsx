"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Percent,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkle,
  DollarSign,
  Users,
  ShoppingBag,
  Globe,
  Settings,
  Phone,
  Mail,
  Zap,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function ShopifyLaunchCalculator() {
  // Inputs
  const [traffic, setTraffic] = useState(20000);
  const [aov, setAov] = useState(2000);

  // Conversion Benchmarks
  const BASIC_CONVERSION_RATE = 1.0; // 0.8% - 1.2% range benchmark
  const SALEPXL_CONVERSION_RATE = 3.0; // 2.5% - 4.0% range benchmark

  // Basic Store Calculations
  const basicOrders = Math.round(traffic * (BASIC_CONVERSION_RATE / 100));
  const basicRevenue = basicOrders * aov;

  // SalePXL Store Calculations
  const salepxlOrders = Math.round(traffic * (SALEPXL_CONVERSION_RATE / 100));
  const salepxlRevenue = salepxlOrders * aov;

  // Differences
  const revenueDifference = salepxlRevenue - basicRevenue;
  const ordersDifference = salepxlOrders - basicOrders;

  // Format currency
  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#D7D7D7] pb-24 overflow-hidden">
      {/* Decorative Blob Backgrounds */}
      <div className="absolute top-[-5%] right-[-10%] w-[45%] h-[400px] rounded-full bg-[#00AF56]/10 blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-[35%] left-[-10%] w-[40%] h-[450px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[5%] w-[35%] h-[400px] rounded-full bg-[#00AF56]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 pt-12 pb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00AF56]/10 border border-[#00AF56]/20 w-max mx-auto">
            <Sparkle className="w-3.5 h-3.5 text-[#00AF56]" />
            <span className="text-[10px] text-[#00AF56] font-mono uppercase tracking-wider font-bold">
              Shopify Launch Calculator
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Launch ROI <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D7D7D7] to-[#00AF56]">
              Simulator
            </span>
          </h1>

          <p className="text-[#8C8C8C] text-base leading-relaxed">
            Starting a dropshipping business or launching a D2C store? Compare how a basic storefront stacks up against a conversion-engineered Shopify layout designed by SalePXL.
          </p>
        </div>

        {/* INPUT PANEL & DYNAMIC OUTCOMES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT: SLIDERS & CONTROLS */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] text-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00AF56]" />
                Store Parameters
              </h2>
              <span className="text-[10px] text-[#00AF56] font-mono bg-[#00AF56]/10 px-2 py-0.5 rounded border border-[#00AF56]/20 font-bold">
                Live Math
              </span>
            </div>

            {/* Input 1: Monthly Traffic */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C8C8C] font-semibold">Projected Monthly Traffic</span>
                <span className="text-white font-mono font-bold bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-lg text-sm">
                  {traffic.toLocaleString("en-IN")} Visitors
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="200000"
                step="1000"
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00AF56]"
              />
              <div className="flex justify-between text-[10px] text-[#8C8C8C] font-mono">
                <span>1,000</span>
                <span>100,000</span>
                <span>200,000+</span>
              </div>
            </div>

            {/* Input 2: Average Order Value */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C8C8C] font-semibold">Average Order Value (AOV)</span>
                <span className="text-white font-mono font-bold bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-lg text-sm">
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
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00AF56]"
              />
              <div className="flex justify-between text-[10px] text-[#8C8C8C] font-mono">
                <span>₹500</span>
                <span>₹5,000</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* Explanatory Note */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.03] text-xs text-[#8C8C8C] leading-relaxed">
              💡 **Conversion Matters:** In dropshipping, buying traffic is expensive. A conversion increase from **1.0%** to **3.0%** triples your orders without needing a single additional rupee of advertising budget.
            </div>
          </div>

          {/* RIGHT: COMPARATIVE METRICS & GRAPHS */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* BIG PROJECTION DIFFERENCE CARD */}
            <div className="p-8 rounded-3xl bg-[#00AF56]/5 border border-[#00AF56]/15 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#00AF56]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
                  Scale Gain Differential
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Collect <span className="text-[#00AF56] font-mono">{formatCurrency(revenueDifference)}</span> Extra Revenue
                </h2>
                <p className="text-sm text-white/70 font-semibold mt-1">
                  Without increasing traffic or ad costs.
                </p>
                <p className="text-xs text-[#8C8C8C] leading-relaxed mt-2 max-w-xl">
                  By upgrading to a conversion-optimized SalePXL layout, your storefront captures **+{ordersDifference} additional sales** from the same **{traffic.toLocaleString()}** visitors.
                </p>
              </div>

              {/* Mini visual summary of difference */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/[0.08]">
                <div>
                  <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Extra Orders</span>
                  <span className="block text-xl font-bold font-mono text-white mt-1">+{ordersDifference} Orders</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Revenue Lift</span>
                  <span className="block text-xl font-bold font-mono text-[#00AF56] mt-1">+200.0% Increase</span>
                </div>
              </div>
            </div>

            {/* SIDE BY SIDE METRICS COMPARISON TABLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Basic Store Box */}
              <div className="p-6 rounded-2xl bg-[#181818] border border-white/[0.04] text-left flex flex-col justify-between min-h-[220px]">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-400 font-bold uppercase tracking-wider font-mono bg-red-400/10 px-2 py-0.5 rounded">
                      Basic Shopify Theme
                    </span>
                    <span className="text-xs font-mono text-white/50">{BASIC_CONVERSION_RATE}% Conversion</span>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Monthly Visitors</span>
                      <span className="font-mono text-white">{traffic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Orders</span>
                      <span className="font-mono text-white font-bold">{basicOrders}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Monthly Revenue</span>
                      <span className="font-mono text-white font-bold">{formatCurrency(basicRevenue)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.04] text-[10px] text-[#8C8C8C] leading-relaxed">
                  ⚠️ **Drawbacks:** Generic layout, basic product page structure, no checkout acceleration, slow loading speed, high cart abandonment.
                </div>
              </div>

              {/* SalePXL Store Box */}
              <div className="p-6 rounded-2xl bg-[#050505] border border-[#00AF56]/20 text-left flex flex-col justify-between min-h-[220px] relative overflow-hidden shadow-[0_0_20px_rgba(0,175,86,0.05)]">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#00AF56]/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#00AF56] font-bold uppercase tracking-wider font-mono bg-[#00AF56]/10 px-2 py-0.5 rounded">
                      SalePXL Premium Store
                    </span>
                    <span className="text-xs font-mono text-[#00AF56] font-bold">{SALEPXL_CONVERSION_RATE}% Conversion</span>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Monthly Visitors</span>
                      <span className="font-mono text-white">{traffic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Orders</span>
                      <span className="font-mono text-white font-bold">{salepxlOrders}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Monthly Revenue</span>
                      <span className="font-mono text-[#00AF56] font-bold">{formatCurrency(salepxlRevenue)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.04] text-[10px] text-white/70 leading-relaxed font-semibold">
                  ✓ **Features:** Fast mobile UX, sticky buy buttons, optimized upsells, integrated social proof signals, accelerated one-click checkout.
                </div>
              </div>

            </div>

            {/* DYNAMIC SVG CHART COMPARING REVENUE */}
            <div className="p-6 rounded-3xl bg-[#181818] border border-white/[0.06] text-left">
              <span className="text-[10px] text-[#8C8C8C] font-mono uppercase tracking-widest font-bold">
                Comparison Dashboard Chart
              </span>
              <h3 className="text-base font-bold text-white mt-1">Monthly Revenue Comparison</h3>

              <div className="mt-6 flex flex-col gap-5">
                {/* Bar 1: Basic Store */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#8C8C8C]">Basic Shopify Store</span>
                    <span className="text-white font-bold">{formatCurrency(basicRevenue)}</span>
                  </div>
                  <div className="w-full h-8 bg-black/40 rounded-lg overflow-hidden border border-white/[0.03] flex items-center px-1">
                    <motion.div
                      className="h-6 bg-red-500/60 rounded-md"
                      initial={{ width: 0 }}
                      animate={{ width: `${(basicRevenue / salepxlRevenue) * 100 || 0}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Bar 2: SalePXL Premium Store */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#00AF56] font-bold">SalePXL Premium Store</span>
                    <span className="text-[#00AF56] font-bold">{formatCurrency(salepxlRevenue)}</span>
                  </div>
                  <div className="w-full h-8 bg-black/40 rounded-lg overflow-hidden border border-[#00AF56]/10 flex items-center px-1">
                    <motion.div
                      className="h-6 bg-[#00AF56] rounded-md shadow-[0_0_15px_rgba(0,175,86,0.3)]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COMPARATIVE SPECIFICATION GRID */}
            <div className="p-6 rounded-3xl bg-[#181818] border border-white/[0.06] text-left">
              <span className="text-[10px] text-[#8C8C8C] font-mono uppercase tracking-widest font-bold">
                Feature Breakdown
              </span>
              <h3 className="text-base font-bold text-white mt-1 mb-6">Basic Store vs. SalePXL Premium</h3>

              <div className="flex flex-col gap-4">
                {[
                  {
                    feature: "Visual Design & Theme",
                    basic: "Generic uncustomized template",
                    salepxl: "Premium bespoke brand identity",
                    basicOk: false
                  },
                  {
                    feature: "Conversion Layout",
                    basic: "Standard unoptimized product page",
                    salepxl: "Persuasive CRO-engineered buyer flows",
                    basicOk: false
                  },
                  {
                    feature: "Speed Performance",
                    basic: "Slow loads due to uncompressed code",
                    salepxl: "Sub-1.5s mobile speed loading",
                    basicOk: false
                  },
                  {
                    feature: "Trust Optimization",
                    basic: "No active security or trust badges",
                    salepxl: "Integrated trust hooks & microcopy",
                    basicOk: false
                  },
                  {
                    feature: "Purchase Accelerations",
                    basic: "Multi-step high-friction checkout",
                    salepxl: "Sticky Buy, Upsells & 1-Click checkout",
                    basicOk: false
                  }
                ].map((spec, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 pb-4 border-b border-white/[0.04] text-xs">
                    <div className="sm:col-span-4 font-semibold text-white">
                      {spec.feature}
                    </div>
                    <div className="sm:col-span-4 flex items-center gap-1.5 text-[#8C8C8C]">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{spec.basic}</span>
                    </div>
                    <div className="sm:col-span-4 flex items-center gap-1.5 text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#00AF56] shrink-0" />
                      <span>{spec.salepxl}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* FOMO HEADER SECTION */}
        <section className="py-16 border-t border-white/[0.08] text-center max-w-4xl mx-auto flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Don't Spend More On Ads. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00AF56]">
              Convert More Of The Traffic You Already Have.
            </span>
          </h2>
          <p className="text-[#8C8C8C] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Most businesses try to solve poor sales by increasing ad spend. Winning brands improve conversion first. Better stores make every advertising dollar work harder.
          </p>
        </section>

        {/* FINAL CTA BOX */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#111111] border border-white/[0.08] text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00AF56]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col gap-6 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready To Build A Shopify Store That Converts?
            </h3>
            
            <p className="text-sm text-[#8C8C8C] max-w-xl mx-auto leading-relaxed">
              Don't guess on your storefront designs. Get a conversion-optimized store engineered from the ground up to scale meta/google campaigns.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all text-center font-bold"
              >
                <span>Book Free Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shopify-audit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/[0.08] hover:border-white/20 transition-all text-center hover:bg-white/[0.02]"
              >
                <span>Get Free Growth Audit</span>
              </Link>
            </div>

            {/* Direct contact details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 pt-6 border-t border-white/[0.04] text-xs text-[#8C8C8C]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00AF56]" />
                <span>Call/WhatsApp: <a href="tel:+919917780656" className="text-white hover:text-[#00AF56] font-bold font-mono">+91 9917780656</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00AF56]" />
                <span>Email: <a href="mailto:growth@salepxl.com" className="text-white hover:text-[#00AF56] font-bold font-mono">growth@salepxl.com</a></span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

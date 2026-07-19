"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkle,
  Settings,
  Phone,
  Mail
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
    <div className="relative pt-44 pb-24 px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Decorative Blob Backgrounds */}
      <div className="absolute top-[-5%] right-[-10%] w-[45%] h-[400px] rounded-full bg-emerald-400/[0.04] blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-[35%] left-[-10%] w-[40%] h-[450px] rounded-full bg-teal-300/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[5%] w-[35%] h-[400px] rounded-full bg-emerald-400/[0.02] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-5">

          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Launch ROI <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Simulator</span>
          </h1>

          <p className="text-neutral-600 text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Starting a dropshipping business or launching a D2C store? Compare how a basic storefront stacks up against a conversion-engineered Shopify layout designed by SalePXL.
          </p>
        </div>

        {/* INPUT PANEL & DYNAMIC OUTCOMES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT: SLIDERS & CONTROLS */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-white/70 border border-neutral-200/60 shadow-sm text-left backdrop-blur-xl font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60 font-sans">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 text-left font-grotesk">
                <Settings className="w-5 h-5 text-emerald-600" />
                Store <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Parameters</span>
              </h2>
              <span className="text-[10px] text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                Live Math
              </span>
            </div>

            {/* Input 1: Monthly Traffic */}
            <div className="flex flex-col gap-3 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-semibold">Projected Monthly Traffic</span>
                <span className="text-neutral-800 font-mono font-bold bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-lg text-sm">
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
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>1,000</span>
                <span>100,000</span>
                <span>200,000+</span>
              </div>
            </div>

            {/* Input 2: Average Order Value */}
            <div className="flex flex-col gap-3 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-semibold">Average Order Value (AOV)</span>
                <span className="text-neutral-800 font-mono font-bold bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-lg text-sm">
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
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>₹500</span>
                <span>₹5,000</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* Explanatory Note */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 text-xs text-neutral-600 leading-relaxed shadow-inner font-medium">
              💡 **Conversion Matters:** In eCommerce, acquiring traffic is expensive. A conversion increase from **1.0%** to **3.0%** triples your orders without needing any additional customer acquisition budget.
            </div>
          </div>

          {/* RIGHT: COMPARATIVE METRICS & GRAPHS */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* BIG PROJECTION DIFFERENCE CARD */}
            <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-left relative overflow-hidden shadow-sm font-sans">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col gap-2 text-left">
                <span className="text-xs text-emerald-700 font-mono uppercase tracking-widest font-bold">
                  Scale Gain Differential
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight leading-tight font-grotesk">
                  Collect <span className="text-emerald-600 font-mono font-bold">{formatCurrency(revenueDifference)}</span> Extra Revenue
                </h2>
                <p className="text-sm text-neutral-800 font-semibold mt-1">
                  Without increasing traffic or acquisition costs.
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed mt-2 max-w-xl">
                  By upgrading to a conversion-optimized SalePXL layout, your storefront captures **+{ordersDifference} additional sales** from the same **{traffic.toLocaleString()}** visitors.
                </p>
              </div>

              {/* Mini visual summary of difference */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-200/60 text-left">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Extra Orders</span>
                  <span className="block text-xl font-bold font-mono text-neutral-900 mt-1">+{ordersDifference} Orders</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Revenue Lift</span>
                  <span className="block text-xl font-bold font-mono text-emerald-600 mt-1">+200.0% Increase</span>
                </div>
              </div>
            </div>

            {/* SIDE BY SIDE METRICS COMPARISON TABLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
              
              {/* Basic Store Box */}
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/60 shadow-inner text-left flex flex-col justify-between min-h-[220px]">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-700 font-bold uppercase tracking-wider font-mono bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      Basic Shopify Theme
                    </span>
                    <span className="text-xs font-mono text-neutral-500">{BASIC_CONVERSION_RATE}% Conversion</span>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2 text-left">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Monthly Visitors</span>
                      <span className="font-mono text-neutral-800">{traffic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Orders</span>
                      <span className="font-mono text-neutral-800 font-bold">{basicOrders}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Monthly Revenue</span>
                      <span className="font-mono text-neutral-800 font-bold">{formatCurrency(basicRevenue)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200/60 text-[10px] text-neutral-500 leading-relaxed text-left">
                  ⚠️ **Drawbacks:** Generic layout, basic product page structure, no checkout acceleration, slow loading speed, high cart abandonment.
                </div>
              </div>

              {/* SalePXL Store Box */}
              <div className="p-6 rounded-2xl bg-white/70 border border-emerald-500/20 text-left flex flex-col justify-between min-h-[220px] relative overflow-hidden shadow-sm backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider font-mono bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      SalePXL Premium Store
                    </span>
                    <span className="text-xs font-mono text-emerald-600 font-bold">{SALEPXL_CONVERSION_RATE}% Conversion</span>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2 text-left">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Monthly Visitors</span>
                      <span className="font-mono text-neutral-800">{traffic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Orders</span>
                      <span className="font-mono text-neutral-800 font-bold">{salepxlOrders}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Monthly Revenue</span>
                      <span className="font-mono text-emerald-600 font-bold">{formatCurrency(salepxlRevenue)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200/60 text-[10px] text-neutral-800 leading-relaxed font-semibold text-left">
                  ✓ **Features:** Fast mobile UX, sticky buy buttons, optimized upsells, integrated social proof signals, accelerated one-click checkout.
                </div>
              </div>

            </div>

            {/* DYNAMIC SVG CHART COMPARING REVENUE */}
            <div className="p-6 rounded-3xl bg-white/70 border border-neutral-200/60 text-left shadow-sm backdrop-blur-xl font-sans">
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest font-bold">
                Comparison Dashboard Chart
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-1 font-grotesk text-left">Monthly Revenue Comparison</h3>

              <div className="mt-6 flex flex-col gap-5 text-left">
                {/* Bar 1: Basic Store */}
                <div className="flex flex-col gap-1.5 text-left">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-500">Basic Shopify Store</span>
                    <span className="text-neutral-800 font-bold">{formatCurrency(basicRevenue)}</span>
                  </div>
                  <div className="w-full h-8 bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300/30 flex items-center px-1">
                    <motion.div
                      className="h-6 bg-red-600/65 rounded-md"
                      initial={{ width: 0 }}
                      animate={{ width: `${(basicRevenue / salepxlRevenue) * 100 || 0}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Bar 2: SalePXL Premium Store */}
                <div className="flex flex-col gap-1.5 text-left">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-emerald-700 font-bold">SalePXL Premium Store</span>
                    <span className="text-emerald-700 font-bold">{formatCurrency(salepxlRevenue)}</span>
                  </div>
                  <div className="w-full h-8 bg-neutral-200 rounded-lg overflow-hidden border border-emerald-500/10 flex items-center px-1">
                    <motion.div
                      className="h-6 bg-emerald-600 rounded-md"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COMPARATIVE SPECIFICATION GRID */}
            <div className="p-6 rounded-3xl bg-white/70 border border-neutral-200/60 text-left shadow-sm backdrop-blur-xl font-sans">
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest font-bold">
                Feature Breakdown
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-1 mb-6 text-left font-grotesk">Basic Store vs. SalePXL Premium</h3>

              <div className="flex flex-col gap-4 text-left">
                {[
                  {
                    feature: "Visual Design & Theme",
                    basic: "Generic uncustomized template",
                    salepxl: "Premium bespoke brand identity"
                  },
                  {
                    feature: "Conversion Layout",
                    basic: "Standard unoptimized product page",
                    salepxl: "Persuasive CRO-engineered buyer flows"
                  },
                  {
                    feature: "Speed Performance",
                    basic: "Slow loads due to uncompressed code",
                    salepxl: "Sub-1.5s mobile speed loading"
                  },
                  {
                    feature: "Trust Optimization",
                    basic: "No active security or trust badges",
                    salepxl: "Integrated trust hooks & microcopy"
                  },
                  {
                    feature: "Purchase Accelerations",
                    basic: "Multi-step high-friction checkout",
                    salepxl: "Sticky Buy, Upsells & 1-Click checkout"
                  }
                ].map((spec, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 pb-4 border-b border-neutral-200/60 text-xs text-left">
                    <div className="sm:col-span-4 font-semibold text-neutral-800">
                      {spec.feature}
                    </div>
                    <div className="sm:col-span-4 flex items-center gap-1.5 text-neutral-500">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{spec.basic}</span>
                    </div>
                    <div className="sm:col-span-4 flex items-center gap-1.5 text-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{spec.salepxl}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* FOMO HEADER SECTION */}
        <section className="py-16 border-t border-neutral-200/60 text-center max-w-4xl mx-auto flex flex-col gap-4 font-sans">
          <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight leading-tight font-grotesk">
            Don't <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal">Spend</span> More On Traffic. <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Convert More Of The Visitors You Already Have.</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Most businesses try to solve poor sales by increasing traffic acquisition spend. Winning brands improve conversion first. Better stores make every visitor count.
          </p>
        </section>

        {/* FINAL CTA BOX */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/60 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl backdrop-blur-xl font-sans">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col gap-6 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-grotesk">
              Ready to Build a <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Shopify Store That Converts?</span>
            </h3>
            
            <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
              Don't guess on your storefront designs. Get a conversion-optimized store engineered from the ground up to convert visitors.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-black shadow-sm font-bold cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919917780656"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-neutral-700 border border-neutral-200 text-center"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Direct contact details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 pt-6 border-t border-neutral-200/60 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: <a href="https://wa.me/919917780656" target="_blank" rel="noopener noreferrer" className="text-neutral-800 font-bold font-mono">+91 9917780656</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Email: <a href="mailto:growth@salepxl.com" className="text-neutral-800 font-bold font-mono">growth@salepxl.com</a></span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Sparkles, ArrowRight } from "lucide-react";

const COMPARISON_POINTS = [
  {
    id: 1,
    label: "Brand Customization",
    basic: "Generic theme with little customization",
    salepxl: "Unique brand identity that builds trust"
  },
  {
    id: 2,
    label: "Customer Trust",
    basic: "Low customer trust and credibility",
    salepxl: "Premium design that increases buyer confidence"
  },
  {
    id: 3,
    label: "Product Pages",
    basic: "Standard product pages",
    salepxl: "High-converting product pages with persuasive layout"
  },
  {
    id: 4,
    label: "Conversion Optimization",
    basic: "Lower conversion rates",
    salepxl: "Optimized UX that converts more visitors into customers"
  },
  {
    id: 5,
    label: "Customer Retention",
    basic: "One-time purchases",
    salepxl: "Strong branding that drives repeat customers and loyalty"
  }
];

export default function InteractiveComparison() {
  const [activeMobileTab, setActiveMobileTab] = useState<"salepxl" | "basic">("salepxl");

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* Mobile Layered Card Switcher (Visible only on mobile md:hidden) */}
      <div className="flex md:hidden items-center p-1.5 rounded-2xl bg-slate-950 border border-white/10 shadow-xl">
        <button
          onClick={() => setActiveMobileTab("salepxl")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-grotesk font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMobileTab === "salepxl"
              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
              : "text-white/50 hover:text-white"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>SalePXL Store</span>
        </button>
        <button
          onClick={() => setActiveMobileTab("basic")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-grotesk font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMobileTab === "basic"
              ? "bg-red-950/80 text-red-300 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
              : "text-white/50 hover:text-white"
          }`}
        >
          <XCircle className="w-4 h-4 text-red-400" />
          <span>Basic Store</span>
        </button>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        {/* CARD 1: Basic Shopify Store */}
        <div
          className={`p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-red-950/20 via-[#0d0709] to-[#080405] border border-red-500/20 relative overflow-hidden flex-col justify-between shadow-2xl transition-all duration-300 ${
            activeMobileTab === "basic" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/[0.04] blur-3xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-red-500/20 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-grotesk">Basic Shopify Store</h3>
                  <span className="text-[10px] text-red-400/80 font-mono font-semibold">Standard Template Setup</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                ~1%–2% Conv.
              </span>
            </div>

            {/* List of 5 Red Drawbacks */}
            <div className="space-y-3">
              {COMPARISON_POINTS.map((pt) => (
                <div key={pt.id} className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-red-950/20 border border-red-500/10">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-red-200/90 leading-relaxed font-sans font-normal">
                    {pt.basic}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-red-500/10 text-center">
            <span className="text-[10px] sm:text-[11px] font-mono text-red-400/80 font-medium">
              ⚠ Leaks incoming ad traffic due to unoptimized store layouts
            </span>
          </div>
        </div>

        {/* CARD 2: SalePXL Shopify Store */}
        <div
          className={`p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-emerald-950/40 via-[#07140f] to-[#040a08] border-2 border-emerald-500/50 relative overflow-hidden flex-col justify-between shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-300 ${
            activeMobileTab === "salepxl" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Subtle Ambient Emerald Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.08] blur-3xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-grotesk flex items-center gap-1.5">
                    <span>SalePXL Store</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold">Branded Conversion Engine</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                3.5%–5%+ Conv.
              </span>
            </div>

            {/* List of 5 Green Advantages */}
            <div className="space-y-3">
              {COMPARISON_POINTS.map((pt) => (
                <div key={pt.id} className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/25 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white font-medium leading-relaxed font-sans">
                    {pt.salepxl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-mono text-emerald-300 font-bold flex items-center gap-1">
              <span>🚀 Up to 3x higher sales from exact same ad traffic</span>
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Call to Action Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0d1522] via-[#09101a] to-[#0d1522] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white font-grotesk">Ready to upgrade from a Basic Store to a Branded SalePXL Engine?</h4>
          <p className="text-[11px] sm:text-xs text-white/60 font-sans mt-0.5">We engineer high-converting Shopify Stores tailored to turn clicks into loyal customers.</p>
        </div>
        <a
          href="/contact"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-grotesk font-extrabold text-xs uppercase tracking-wider hover:scale-105 transition-transform flex items-center justify-center gap-2 shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
        >
          <span>Build Branded Store</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </a>
      </div>

    </div>
  );
}

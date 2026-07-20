"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [activeMobileCardIndex, setActiveMobileCardIndex] = useState<number>(0); // 0 = SalePXL Store, 1 = Basic Store

  // Handle Swipe Gesture
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) {
      // Swiped Left -> go to next card (Basic Store)
      setActiveMobileCardIndex(1);
    } else if (info.offset.x > 50) {
      // Swiped Right -> go to previous card (SalePXL Store)
      setActiveMobileCardIndex(0);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MOBILE ONLY: TOUCH-SWIPEABLE STACKED CARD CAROUSEL (md:hidden) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="block md:hidden w-full relative">
        
        {/* Top Control Bar with Swipe Hint & Dot Indicators */}
        <div className="flex items-center justify-between px-2 mb-3">
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-emerald-400">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>👈 Swipe cards left / right 👉</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveMobileCardIndex(0)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeMobileCardIndex === 0 ? "w-6 bg-emerald-400" : "w-2 bg-white/20"
              }`}
            />
            <button
              onClick={() => setActiveMobileCardIndex(1)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeMobileCardIndex === 1 ? "w-6 bg-red-400" : "w-2 bg-white/20"
              }`}
            />
          </div>
        </div>

        {/* Mobile Swipe Container with Motion */}
        <div className="relative min-h-[440px] overflow-hidden rounded-3xl p-0.5">
          <AnimatePresence mode="wait">
            {activeMobileCardIndex === 0 ? (
              /* MOBILE CARD 1: SalePXL Store (Active First) */
              <motion.div
                key="salepxl-card"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-emerald-950/60 via-[#07140f] to-[#040a08] border-2 border-emerald-500/60 relative overflow-hidden shadow-[0_0_35px_rgba(16,185,129,0.25)] flex flex-col justify-between select-none cursor-grab active:cursor-grabbing"
              >
                {/* Subtle Ambient Emerald Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.1] blur-3xl pointer-events-none" />

                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white font-grotesk flex items-center gap-1.5">
                          <span>SalePXL Store</span>
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        </h3>
                        <span className="text-[10px] text-emerald-400 font-mono font-semibold">Branded Engine</span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      3.5%–5%+ Conv.
                    </span>
                  </div>

                  {/* 5 Green Advantages */}
                  <div className="space-y-2.5">
                    {COMPARISON_POINTS.map((pt) => (
                      <div key={pt.id} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-white font-medium leading-relaxed font-sans">
                          {pt.salepxl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer & Next Card Nav Hint */}
                <div className="mt-5 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1">
                    <span>🚀 Up to 3x higher sales</span>
                  </span>
                  <button
                    onClick={() => setActiveMobileCardIndex(1)}
                    className="text-[10px] font-mono font-bold text-white/70 hover:text-white flex items-center gap-0.5 bg-white/10 px-2 py-1 rounded-full"
                  >
                    <span>Basic Store</span>
                    <ChevronRight className="w-3 h-3 text-emerald-400" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* MOBILE CARD 2: Basic Store (Active Second) */
              <motion.div
                key="basic-card"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: -80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-red-950/40 via-[#0d0709] to-[#080405] border-2 border-red-500/40 relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.15)] flex flex-col justify-between select-none cursor-grab active:cursor-grabbing"
              >
                {/* Subtle Ambient Red Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/[0.06] blur-3xl pointer-events-none" />

                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-red-500/20 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                        <XCircle className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white font-grotesk">Basic Shopify Store</h3>
                        <span className="text-[10px] text-red-400/80 font-mono font-semibold">Standard Template</span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                      ~1%–2% Conv.
                    </span>
                  </div>

                  {/* 5 Red Drawbacks */}
                  <div className="space-y-2.5">
                    {COMPARISON_POINTS.map((pt) => (
                      <div key={pt.id} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-red-950/30 border border-red-500/15">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-red-200/90 leading-relaxed font-sans font-normal">
                          {pt.basic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer & Next Card Nav Hint */}
                <div className="mt-5 pt-3 border-t border-red-500/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-red-400/80 font-medium">
                    ⚠ Leaks ad budget
                  </span>
                  <button
                    onClick={() => setActiveMobileCardIndex(0)}
                    className="text-[10px] font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-1 rounded-full"
                  >
                    <ChevronLeft className="w-3 h-3 text-emerald-400" />
                    <span>SalePXL Store</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DESKTOP ONLY: 2 SIDE-BY-SIDE CARDS GRID (hidden md:grid) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        {/* DESKTOP CARD 1: Basic Shopify Store */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-red-950/20 via-[#0d0709] to-[#080405] border border-red-500/20 relative overflow-hidden flex flex-col justify-between shadow-2xl group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/[0.04] blur-3xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-red-500/20 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-grotesk">Basic Shopify Store</h3>
                  <span className="text-[10px] text-red-400/80 font-mono font-semibold">Standard Template Setup</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                ~1%–2% Conv.
              </span>
            </div>

            {/* List of 5 Red Drawbacks */}
            <div className="space-y-3">
              {COMPARISON_POINTS.map((pt) => (
                <div key={pt.id} className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/20 border border-red-500/10">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-red-200/90 leading-relaxed font-sans font-normal">
                    {pt.basic}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-red-500/10 text-center">
            <span className="text-[11px] font-mono text-red-400/80 font-medium">
              ⚠ Leaks incoming ad traffic due to unoptimized store layouts
            </span>
          </div>
        </div>

        {/* DESKTOP CARD 2: SalePXL Shopify Store */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-950/40 via-[#07140f] to-[#040a08] border-2 border-emerald-500/50 relative overflow-hidden flex flex-col justify-between shadow-[0_0_40px_rgba(16,185,129,0.15)] group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.08] blur-3xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-grotesk flex items-center gap-1.5">
                    <span>SalePXL Store</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold">Branded Conversion Engine</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                3.5%–5%+ Conv.
              </span>
            </div>

            {/* List of 5 Green Advantages */}
            <div className="space-y-3">
              {COMPARISON_POINTS.map((pt) => (
                <div key={pt.id} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/25 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-white font-medium leading-relaxed font-sans">
                    {pt.salepxl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-300 font-bold flex items-center gap-1">
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

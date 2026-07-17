"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, Zap, Info, CheckCircle, Smartphone, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Hotspot {
  id: number;
  x: string; // CSS percentage position
  y: string;
  title: string;
  desc: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    x: "24%",
    y: "18%",
    title: "1.9s Mobile Load Velocity",
    desc: "Optimized theme script bundling and layout sequencing eliminates visitor drop-offs."
  },
  {
    id: 2,
    x: "62%",
    y: "28%",
    title: "Instant Social Proof Hook",
    desc: "Placing star counts and verified purchaser badges right next to pricing builds immediate trust."
  },
  {
    id: 3,
    x: "78%",
    y: "48%",
    title: "Sizing & Option Drawer",
    desc: "Cleaner drawers prevent option selection friction and decisions fatigue."
  },
  {
    id: 4,
    x: "52%",
    y: "72%",
    title: "Conversion-Centric CTA",
    desc: "A bold, contrast-rich button layout coupled with cart drawer indicators increases add-to-carts."
  },
  {
    id: 5,
    x: "30%",
    y: "90%",
    title: "Udyam MSME Trust Signals",
    desc: "Explicit badges detailing government MSME audits resolve transaction legitimacy concerns."
  }
];

export default function ABTestingSimulator() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
      
      {/* Mode Selectors */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.05] pb-6">
        <div>
          <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> Interactive Sandbox
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
            PDP Conversion Anatomy
          </h3>
        </div>

        {/* Tab Controls */}
        <div className="bg-white/[0.02] p-1.5 rounded-full border border-white/[0.05] flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveTab("before");
              setHoveredHotspot(null);
            }}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "before"
                ? "bg-red-500/20 text-red-400 border border-red-500/20"
                : "text-[#8e8e93] hover:text-white"
            }`}
          >
            Before: Cluttered & Slow
          </button>
          <button
            onClick={() => setActiveTab("after")}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "after"
                ? "bg-primary/20 text-primary border border-primary/20"
                : "text-[#8e8e93] hover:text-white"
            }`}
          >
            After: SalePXL Optimized
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Mockup Screen Frame */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <div className="relative w-full max-w-sm rounded-[32px] bg-neutral-900 border-4 border-neutral-800 p-4 pt-8 shadow-2xl overflow-hidden aspect-[9/18]">
            {/* Speaker slot represent physical phone notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-white/[0.08] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#181818]" />
            </div>

            {/* Screen Content Wrapper */}
            <div className="w-full h-full rounded-2xl bg-[#09090b] border border-white/[0.05] p-4 flex flex-col justify-between overflow-y-auto relative no-scrollbar">
              
              {/* Product Header */}
              <div className="flex justify-between items-center pb-2.5 border-b border-white/[0.05] mb-3">
                <span className="text-[10px] text-[#8e8e93] font-mono tracking-widest font-bold">STOREFRONT</span>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                  activeTab === "before" ? "bg-red-500/10 text-red-400" : "bg-primary/10 text-primary"
                }`}>
                  {activeTab === "before" ? "LOAD: 6.8s" : "LOAD: 1.9s"}
                </span>
              </div>

              {/* Product Layout */}
              <div className="flex flex-col gap-4 text-left">
                {/* Product Image Panel */}
                <div className="relative aspect-[4/3] rounded-xl bg-gradient-to-tr from-white/[0.02] to-white/[0.08] border border-white/[0.05] flex items-center justify-center overflow-hidden">
                  <Smartphone className={`w-12 h-12 transition-transform duration-500 ${
                    activeTab === "before" ? "text-red-500 rotate-12 scale-90" : "text-primary scale-100"
                  }`} />
                  
                  {/* Subtle glass grid on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  <span className="absolute bottom-2 left-2 text-[9px] text-[#8e8e93] bg-[#0c0c0e]/70 px-2 py-0.5 rounded backdrop-blur">
                    Mockup Device Case
                  </span>
                </div>

                {/* Info and Ratings */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    {activeTab === "after" && (
                      <span className="text-[9px] text-primary font-semibold font-mono bg-primary/10 px-1.5 rounded">
                        142 reviews
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">Classic Leather Case v2</h4>
                  <div className="flex gap-2 items-baseline">
                    <span className="text-base font-extrabold text-white">₹1,499</span>
                    {activeTab === "after" && (
                      <span className="text-[10px] text-red-400 line-through">₹2,499</span>
                    )}
                  </div>
                </div>

                {/* Before vs After differences on Page detail */}
                {activeTab === "before" ? (
                  <div className="flex flex-col gap-2.5 text-[10px] text-[#8e8e93] bg-white/[0.01] p-3 rounded-lg border border-white/[0.05]">
                    <p className="leading-relaxed">
                      A regular, unoptimized product layout. Huge hero graphics trigger a high loading delay.
                    </p>
                    <p className="text-[9px] text-red-400/80">✗ Customer rating score hidden below fold</p>
                    <p className="text-[9px] text-red-400/80">✗ Cluttered options selectors</p>
                    <p className="text-[9px] text-red-400/80">✗ No mobile checkout shortcuts</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {/* Size Selector */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[10px] text-[#8e8e93]">
                        <span>Select Leather Finish:</span>
                        <span className="text-white font-bold">Midnight Black</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[9px] border border-primary text-primary bg-primary/5 px-3 py-1 rounded-md font-bold">
                          Black
                        </span>
                        <span className="text-[9px] border border-white/[0.08] text-[#8e8e93] px-3 py-1 rounded-md">
                          Tan Brown
                        </span>
                        <span className="text-[9px] border border-white/[0.08] text-[#8e8e93] px-3 py-1 rounded-md">
                          Olive Green
                        </span>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-2 gap-2 text-[8px] font-mono text-white">
                      <div className="flex items-center gap-1 bg-white/[0.02] p-1.5 rounded border border-white/[0.05]">
                        <Zap className="w-2.5 h-2.5 text-primary" />
                        <span>Ships in 24 hrs</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/[0.02] p-1.5 rounded border border-white/[0.05]">
                        <ShieldCheck className="w-2.5 h-2.5 text-primary" />
                        <span>MSME Registered</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Button Block */}
              <div className="mt-4 pt-3.5 border-t border-white/[0.05] flex flex-col gap-2">
                <button className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${
                  activeTab === "before"
                    ? "bg-white/5 text-white/20 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-[#2a6350] shadow-[0_8px_24px_rgba(16,185,129,0.15)]"
                }`}>
                  {activeTab === "before" ? (
                    <span>Add to Cart</span>
                  ) : (
                    <>
                      <span>Secure Buy Now</span>
                      <Zap className="w-3.5 h-3.5 fill-current" />
                    </>
                  )}
                </button>
                {activeTab === "after" && (
                  <p className="text-[8px] text-[#8e8e93] text-center">
                    🔒 Guaranteed secure payment audit. Instant GST receipt.
                  </p>
                )}
              </div>

              {/* Interactive Hotspots Overlays - Only shown on AFTER view */}
              {activeTab === "after" && (
                <>
                  {HOTSPOTS.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setHoveredHotspot(hoveredHotspot === spot.id ? null : spot.id)}
                      onMouseEnter={() => setHoveredHotspot(spot.id)}
                      className={`absolute w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-30 ${
                        hoveredHotspot === spot.id
                          ? "bg-primary text-white scale-125"
                          : "bg-white/10 text-white animate-pulse"
                      }`}
                      style={{
                        top: spot.y,
                        left: spot.x,
                        boxShadow: hoveredHotspot === spot.id ? "0 0 15px #10b981" : "0 0 10px rgba(0,0,0,0.5)"
                      }}
                      title={spot.title}
                    >
                      !
                    </button>
                  ))}
                </>
              )}

            </div>
          </div>
        </div>

        {/* Right Side: Explanatory Copy & Active Hotspot Inspector */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-card shadow-sm text-left">
          <div className="flex flex-col gap-6">
            <span className="text-xs text-[#8e8e93] font-mono uppercase tracking-widest font-bold">Auditing Optimization Parameters</span>
            <h4 className="text-lg font-bold text-white">
              {activeTab === "before" ? "Why Cluttered Layouts Fail" : "How Optimization Multiplies Sales"}
            </h4>

            {activeTab === "before" ? (
              <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
                <p>
                  Most digital ad agencies focus entirely on sending visitors to the storefront. However, standard template layouts contain significant friction points:
                </p>
                <ul className="flex flex-col gap-2.5 mt-2">
                  <li className="flex gap-2">
                    <span className="text-red-400 font-bold shrink-0">✗</span>
                    <span>Slow loading assets prompt immediate click-away spikes.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400 font-bold shrink-0">✗</span>
                    <span>Hiding product reviews down the fold prevents user validation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400 font-bold shrink-0">✗</span>
                    <span>Unstructured menus trigger checkout hesitation.</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
                  SalePXL rebuilds the e-commerce purchase path. We eliminate page loading delays and organize the information structure to build consumer trust in milliseconds.
                </p>
                <div className="text-xs font-semibold text-white mt-2">
                  👉 Click or hover any pulsing hot-spot (<span className="text-primary font-bold">!</span>) on the mobile mockup to view details.
                </div>
              </div>
            )}

            {/* Hotspot details card */}
            {activeTab === "after" && (
              <div className="min-h-[140px] mt-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.05] transition-all flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {hoveredHotspot !== null ? (
                    <motion.div
                      key={hoveredHotspot}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col gap-2 text-left"
                    >
                      <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider font-mono">
                        <Info className="w-3.5 h-3.5" />
                        <span>{HOTSPOTS[hoveredHotspot - 1].title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white leading-relaxed font-medium">
                        {HOTSPOTS[hoveredHotspot - 1].desc}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-4 text-xs text-[#8e8e93] flex flex-col items-center gap-2"
                    >
                      <Smartphone className="w-6 h-6 text-white/20" />
                      <span>Select a parameter to view the scaling impact.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.05] flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#8e8e93]">Optimization Focus:</span>
              <span className="text-white font-bold">Mobile First</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

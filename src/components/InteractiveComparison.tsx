"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles, ChevronLeft, ChevronRight, PenTool, Flame } from "lucide-react";

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

// Single Line Pen Typewriter Component
function SinglePenTypewriterText({
  text,
  speed = 18,
  showPen = true,
  theme = "emerald",
  onComplete
}: {
  text: string;
  speed?: number;
  showPen?: boolean;
  theme?: "emerald" | "red";
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isWriting, setIsWriting] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsWriting(true);
    let charIndex = 0;

    const intervalId = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        setIsWriting(false);
        clearInterval(intervalId);
        if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  const isRed = theme === "red";

  return (
    <span className="inline-flex items-center flex-wrap gap-1">
      <span>{displayedText}</span>
      {isWriting && showPen && (
        <span
          className={`inline-flex items-center justify-center p-0.5 rounded-full border animate-pulse ml-1 shrink-0 ${
            isRed
              ? "bg-red-500/20 border-red-400/40 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              : "bg-emerald-500/20 border-emerald-400/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          }`}
        >
          <PenTool className={`w-3.5 h-3.5 -rotate-45 ${isRed ? "text-red-300" : "text-emerald-300"}`} />
        </span>
      )}
    </span>
  );
}

// Sequential Pen Typewriter List (Writes points ONE BY ONE)
function SequentialPenWriterList({
  items,
  typeKey,
  theme = "emerald",
  icon: Icon
}: {
  items: typeof COMPARISON_POINTS;
  typeKey: "basic" | "salepxl";
  theme?: "emerald" | "red";
  icon: any;
}) {
  const [activeWritingIndex, setActiveWritingIndex] = useState(0);

  useEffect(() => {
    setActiveWritingIndex(0);
  }, [typeKey]);

  return (
    <div className="space-y-2.5 sm:space-y-3">
      {items.map((pt, idx) => {
        const text = pt[typeKey];
        const isVisible = idx <= activeWritingIndex;
        const isCurrentlyWriting = idx === activeWritingIndex;

        return (
          <div
            key={pt.id}
            className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl transition-all duration-300 ${
              isVisible
                ? theme === "red"
                  ? "bg-red-950/30 border border-red-500/15 opacity-100"
                  : "bg-emerald-950/50 border border-emerald-500/30 shadow-sm opacity-100"
                : "opacity-0 hidden"
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${theme === "red" ? "text-red-400" : "text-emerald-400"}`} />
            <span className={`text-xs sm:text-sm font-medium leading-relaxed ${theme === "red" ? "text-red-200/90" : "text-white"}`}>
              {isVisible ? (
                <SinglePenTypewriterText
                  text={text}
                  speed={18}
                  showPen={isCurrentlyWriting}
                  theme={theme}
                  onComplete={() => {
                    if (idx === activeWritingIndex && activeWritingIndex < items.length - 1) {
                      setActiveWritingIndex((prev) => prev + 1);
                    }
                  }}
                />
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function InteractiveComparison() {
  const [activeMobileCardIndex, setActiveMobileCardIndex] = useState<number>(0); // 0 = Basic Store (First), 1 = SalePXL Store (Second)

  // Handle Swipe Gesture
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) {
      // Swiped Left -> go to next card (SalePXL Store)
      setActiveMobileCardIndex(1);
    } else if (info.offset.x > 50) {
      // Swiped Right -> go to previous card (Basic Store)
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
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-amber-400">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>👈 Swipe left to see SalePXL Rebuild 👉</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveMobileCardIndex(0)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeMobileCardIndex === 0 ? "w-6 bg-red-400" : "w-2 bg-white/20"
              }`}
            />
            <button
              onClick={() => setActiveMobileCardIndex(1)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeMobileCardIndex === 1 ? "w-6 bg-emerald-400" : "w-2 bg-white/20"
              }`}
            />
          </div>
        </div>

        {/* Mobile Swipe Container with Motion */}
        <div className="relative min-h-[460px] overflow-hidden rounded-3xl p-0.5">
          <AnimatePresence mode="wait">
            {activeMobileCardIndex === 0 ? (
              /* MOBILE CARD 1: FAILED ECOM BRAND STORY (Shown FIRST with Red Pen Writing points ONE BY ONE) */
              <motion.div
                key="basic-card"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: -80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.95 }}
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
                        <Flame className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white font-grotesk">Story of a Failed Ecom Brand</h3>
                        <span className="text-[10px] text-red-400/90 font-mono font-semibold uppercase tracking-wider">
                          Why 90% of Stores Fail
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                      ~1%–2% Conv.
                    </span>
                  </div>

                  {/* 5 Red Drawbacks - Failed Ecom Brand Story written ONE BY ONE */}
                  <SequentialPenWriterList items={COMPARISON_POINTS} typeKey="basic" theme="red" icon={XCircle} />
                </div>

                {/* Footer & Next Card Nav Hint */}
                <div className="mt-5 pt-3 border-t border-red-500/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-red-400/80 font-medium">
                    ⚠ Leaks ad budget
                  </span>
                  <button
                    onClick={() => setActiveMobileCardIndex(1)}
                    className="text-[10px] font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full animate-pulse"
                  >
                    <span>Swipe to SalePXL</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* MOBILE CARD 2: SalePXL Store (REVEALED ON SWIPE WITH EMERALD PEN WRITING points ONE BY ONE) */
              <motion.div
                key="salepxl-card"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
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
                          <span>SalePXL Store Rebuild</span>
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        </h3>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-wider uppercase">
                          Fully Customized
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      3.5%–5%+ Conv.
                    </span>
                  </div>

                  {/* 5 Green Advantages - Written ONE BY ONE */}
                  <SequentialPenWriterList items={COMPARISON_POINTS} typeKey="salepxl" theme="emerald" icon={CheckCircle2} />
                </div>

                {/* Footer & Prev Card Nav Hint */}
                <div className="mt-5 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1">
                    <span>🚀 Up to 3x higher sales</span>
                  </span>
                  <button
                    onClick={() => setActiveMobileCardIndex(0)}
                    className="text-[10px] font-mono font-bold text-white/70 hover:text-white flex items-center gap-0.5 bg-white/10 px-2 py-1 rounded-full"
                  >
                    <ChevronLeft className="w-3 h-3 text-red-400" />
                    <span>Failed Store Story</span>
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
        
        {/* DESKTOP CARD 1: Story of a Failed Ecom Brand */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-red-950/20 via-[#0d0709] to-[#080405] border border-red-500/20 relative overflow-hidden flex flex-col justify-between shadow-2xl group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/[0.04] blur-3xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-red-500/20 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-grotesk">Story of a Failed Ecom Brand</h3>
                  <span className="text-[10px] text-red-400/90 font-mono font-semibold uppercase tracking-wider">
                    Why 90% of Stores Fail
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                ~1%–2% Conv.
              </span>
            </div>

            {/* Sequential Line-by-Line Pen Writer */}
            <SequentialPenWriterList items={COMPARISON_POINTS} typeKey="basic" theme="red" icon={XCircle} />
          </div>

          <div className="mt-6 pt-3 border-t border-red-500/10 text-center">
            <span className="text-[11px] font-mono text-red-400/80 font-medium">
              ⚠ Leaks incoming ad traffic due to unoptimized store layouts
            </span>
          </div>
        </div>

        {/* DESKTOP CARD 2: SalePXL Store Rebuild */}
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
                    <span>SalePXL Store Rebuild</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-wider uppercase">
                    Fully Customized
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                3.5%–5%+ Conv.
              </span>
            </div>

            {/* Sequential Line-by-Line Pen Writer */}
            <SequentialPenWriterList items={COMPARISON_POINTS} typeKey="salepxl" theme="emerald" icon={CheckCircle2} />
          </div>

          <div className="mt-6 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-300 font-bold flex items-center gap-1">
              <span>🚀 Up to 3x higher sales from exact same ad traffic</span>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

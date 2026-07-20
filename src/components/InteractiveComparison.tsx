"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles, ChevronLeft, ChevronRight, PenTool, Flame, Scroll } from "lucide-react";

const FAILED_LETTER_POINTS = [
  { id: 1, text: "I launched an ecom brand with ₹5 Lakhs investment in ads & store, spending only 20% on the store." },
  { id: 2, text: "I poured ₹4 Lakhs into Meta & Instagram ads, driving tens of thousands of clicks to a standard template." },
  { id: 3, text: "Visitors landed on my store, but bounced in seconds due to generic design & low buyer trust." },
  { id: 4, text: "Product display pages were unformatted text walls with zero offer positioning or conversion triggers." },
  { id: 5, text: "Add-to-cart rates hovered under 2% with zero bundle upsells to increase average order value." },
  { id: 6, text: "Over 82% of shoppers abandoned their carts during multi-page checkout friction & unexpected fees." },
  { id: 7, text: "I burnt through the entire ₹5 Lakhs capital at ~1% conversion rate and was forced to shut down." }
];

const SALEPXL_LETTER_POINTS = [
  { id: 1, text: "Blueprint: We re-engineered the store architecture around buyer psychology and conversion triggers." },
  { id: 2, text: "Built a unique custom brand identity that establishes instant authority and high customer trust." },
  { id: 3, text: "Transformed product pages with scannable benefit callouts, video highlights, & verified social proof." },
  { id: 4, text: "Engineered strategic offer positioning with high-margin bundle recommendations & slide-out cart upsells." },
  { id: 5, text: "Accelerated checkout velocity with 1-Click express payments, sticky add-to-cart, & zero checkout friction." },
  { id: 6, text: "Lifted store conversion rates to 3.5%–5%+ benchmark while increasing average order value by +42%." },
  { id: 7, text: "Turned ad spend into a profitable customer acquisition engine with a 3.8x repeat buyer LTV." }
];

// Single Line Pen Typewriter Component (Simulates authentic handwriting)
function HandwrittenPenText({
  text,
  speed = 22,
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
      <span className="font-sans leading-relaxed tracking-wide">{displayedText}</span>
      {isWriting && showPen && (
        <span
          className={`inline-flex items-center justify-center p-0.5 rounded-full border animate-bounce ml-1 shrink-0 ${
            isRed
              ? "bg-red-500/25 border-red-400/50 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
              : "bg-emerald-500/25 border-emerald-400/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
          }`}
        >
          <PenTool className={`w-3.5 h-3.5 -rotate-45 ${isRed ? "text-red-300" : "text-emerald-300"}`} />
        </span>
      )}
    </span>
  );
}

// Sequential Letter Pen Writer List
function SequentialLetterWriterList({
  items,
  theme = "emerald",
  icon: Icon
}: {
  items: typeof FAILED_LETTER_POINTS;
  theme?: "emerald" | "red";
  icon: any;
}) {
  const [activeWritingIndex, setActiveWritingIndex] = useState(0);

  useEffect(() => {
    setActiveWritingIndex(0);
  }, [items]);

  return (
    <div className="space-y-3 sm:space-y-3.5">
      {items.map((pt, idx) => {
        const isVisible = idx <= activeWritingIndex;
        const isCurrentlyWriting = idx === activeWritingIndex;

        return (
          <div
            key={pt.id}
            className={`flex items-start gap-2.5 p-3 rounded-xl transition-all duration-300 border backdrop-blur-sm ${
              isVisible
                ? theme === "red"
                  ? "bg-red-950/25 border-red-500/20 shadow-lg shadow-red-950/30 opacity-100"
                  : "bg-emerald-950/40 border-emerald-500/30 shadow-lg shadow-emerald-950/30 opacity-100"
                : "opacity-0 hidden"
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${theme === "red" ? "text-red-400" : "text-emerald-400"}`} />
            <span className={`text-xs sm:text-sm font-medium leading-relaxed ${theme === "red" ? "text-red-200/90" : "text-emerald-50"}`}>
              {isVisible ? (
                <HandwrittenPenText
                  text={pt.text}
                  speed={20}
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
            <span>👈 Swipe left to read SalePXL Blueprint 👉</span>
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
        <div className="relative min-h-[480px] overflow-hidden rounded-3xl p-0.5">
          <AnimatePresence mode="wait">
            {activeMobileCardIndex === 0 ? (
              /* MOBILE CARD 1: FAILED ECOM BRAND STORY LETTER */
              <motion.div
                key="basic-card"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: -80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#180a0d] via-[#0d0709] to-[#080405] border-2 border-red-500/40 relative overflow-hidden shadow-[0_0_35px_rgba(239,68,68,0.2)] flex flex-col justify-between select-none cursor-grab active:cursor-grabbing"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/[0.06] blur-3xl pointer-events-none" />

                <div>
                  {/* Header Letter Tag */}
                  <div className="flex items-center justify-between border-b border-red-500/20 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                        <Flame className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white font-grotesk">Story of a Failed Ecom Brand</h3>
                        <span className="text-[10px] text-red-400/90 font-mono font-semibold uppercase tracking-wider flex items-center gap-1">
                          <Scroll className="w-3 h-3 text-red-400" />
                          Confession Letter #1
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                      ~1% Conv.
                    </span>
                  </div>

                  {/* Failed Letter Points Written Line-by-Line with Pen */}
                  <SequentialLetterWriterList items={FAILED_LETTER_POINTS} theme="red" icon={XCircle} />
                </div>

                {/* Footer Sign-off */}
                <div className="mt-5 pt-3 border-t border-red-500/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-red-400/80 italic">
                    — A Failed Store Founder (2024)
                  </span>
                  <button
                    onClick={() => setActiveMobileCardIndex(1)}
                    className="text-[10px] font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full animate-pulse"
                  >
                    <span>Read SalePXL Solution</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* MOBILE CARD 2: SALEPXL SOLUTION BLUEPRINT LETTER */
              <motion.div
                key="salepxl-card"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0a1f18] via-[#07140f] to-[#040a08] border-2 border-emerald-500/60 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.3)] flex flex-col justify-between select-none cursor-grab active:cursor-grabbing"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.1] blur-3xl pointer-events-none" />

                <div>
                  {/* Header Letter Tag */}
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
                        <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-wider uppercase flex items-center gap-1">
                          <Scroll className="w-3 h-3 text-emerald-400" />
                          Blueprint Letter #2
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      3.5%–5%+ Conv.
                    </span>
                  </div>

                  {/* SalePXL Blueprint Letter Points Written Line-by-Line with Pen */}
                  <SequentialLetterWriterList items={SALEPXL_LETTER_POINTS} theme="emerald" icon={CheckCircle2} />
                </div>

                {/* Footer Sign-off */}
                <div className="mt-5 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-300 font-bold italic">
                    — Re-engineered by SalePXL
                  </span>
                  <button
                    onClick={() => setActiveMobileCardIndex(0)}
                    className="text-[10px] font-mono font-bold text-white/70 hover:text-white flex items-center gap-0.5 bg-white/10 px-2 py-1 rounded-full"
                  >
                    <ChevronLeft className="w-3 h-3 text-red-400" />
                    <span>Read Failed Story</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DESKTOP ONLY: 2 SIDE-BY-SIDE LETTER CARDS GRID (hidden md:grid) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        {/* DESKTOP CARD 1: Story of a Failed Ecom Brand Letter */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#180a0d] via-[#0d0709] to-[#080405] border-2 border-red-500/30 relative overflow-hidden flex flex-col justify-between shadow-2xl group">
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
                  <span className="text-[10px] text-red-400/90 font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                    <Scroll className="w-3 h-3 text-red-400" />
                    Confession Letter #1
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                ~1% Conv.
              </span>
            </div>

            {/* Handwritten Sequential Letter Points */}
            <SequentialLetterWriterList items={FAILED_LETTER_POINTS} theme="red" icon={XCircle} />
          </div>

          <div className="mt-6 pt-3 border-t border-red-500/10 flex items-center justify-between text-[11px] font-mono text-red-400/80">
            <span className="italic">— A Failed Store Founder (2024)</span>
            <span className="font-semibold">⚠ High Bounce Rate</span>
          </div>
        </div>

        {/* DESKTOP CARD 2: SalePXL Store Solution Blueprint Letter */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0a1f18] via-[#07140f] to-[#040a08] border-2 border-emerald-500/50 relative overflow-hidden flex flex-col justify-between shadow-[0_0_40px_rgba(16,185,129,0.2)] group">
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
                  <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 mt-0.5">
                    <Scroll className="w-3 h-3 text-emerald-400" />
                    Blueprint Letter #2
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                3.5%–5%+ Conv.
              </span>
            </div>

            {/* Handwritten Sequential Letter Points */}
            <SequentialLetterWriterList items={SALEPXL_LETTER_POINTS} theme="emerald" icon={CheckCircle2} />
          </div>

          <div className="mt-6 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-[11px] font-mono text-emerald-300">
            <span className="font-bold italic">— Re-engineered by SalePXL</span>
            <span className="font-bold">🚀 3.8x Customer LTV</span>
          </div>
        </div>

      </div>

    </div>
  );
}

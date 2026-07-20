"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Star, 
  Lock, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  ShoppingCart, 
  CreditCard, 
  TrendingUp, 
  Sparkles, 
  PackageCheck, 
  Award, 
  Heart, 
  Repeat, 
  ArrowRight,
  Play,
  Pause,
  ChevronRight,
  Globe,
  Mail,
  Search,
  Share2,
  SlidersHorizontal,
  Check,
  MousePointer
} from "lucide-react";

interface GrowthFormulaSectionProps {
  onOpenModal: () => void;
}

export default function GrowthFormulaSection({ onOpenModal }: GrowthFormulaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeColor, setActiveColor] = useState<string>("black");
  const [activeSize, setActiveSize] = useState<string>("M");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track scroll position to update active step smoothly
  useEffect(() => {
    return scrollYProgress.onChange((val) => {
      // Divide into 6 sections (0: Traffic, 1: Trust, 2: UX, 3: Sale, 4: Loyal, 5: Overview)
      const stepIndex = Math.min(Math.floor(val * 6), 5);
      if (!isPlaying) {
        setActiveStep(stepIndex);
      }
    });
  }, [scrollYProgress, isPlaying]);

  // Auto-play timer for 20-second keynote cinematic experience
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 6;
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Step 3 Interactive Demo Handlers
  useEffect(() => {
    if (activeStep === 2) {
      const timer1 = setTimeout(() => setActiveColor("emerald"), 1200);
      const timer2 = setTimeout(() => setActiveSize("L"), 2400);
      const timer3 = setTimeout(() => setCartOpen(true), 3400);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setCartOpen(false);
    }
  }, [activeStep]);

  // Step 4 Payment Demo Handler
  useEffect(() => {
    if (activeStep === 3) {
      setPaymentDone(false);
      const timer = setTimeout(() => setPaymentDone(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  const stepsData = [
    {
      id: "traffic",
      stepNum: "01",
      badge: "STEP 1 — TRAFFIC",
      title: "Traffic Can Come From Anywhere",
      description: "Whether traffic comes from Meta Ads, Google, Instagram, SEO, influencers, or email campaigns... every visitor begins with a click."
    },
    {
      id: "trust",
      stepNum: "02",
      badge: "STEP 2 — STORE TRUST",
      title: "Trust Begins in Seconds",
      description: "The moment visitors land on your store they instantly decide whether your brand feels trustworthy. Your website—not your ads—creates that first impression."
    },
    {
      id: "ux",
      stepNum: "03",
      badge: "STEP 3 — BEST USER EXPERIENCE",
      title: "Premium Shopping Experience",
      description: "An intuitive user experience makes shopping effortless. Visitors easily discover products, explore collections, compare variants, and add items to the cart without friction."
    },
    {
      id: "sale",
      stepNum: "04",
      badge: "STEP 4 — FIRST SALE",
      title: "Traffic Becomes Revenue",
      description: "A high-converting store removes friction at checkout, turning visitors into paying customers."
    },
    {
      id: "loyal",
      stepNum: "05",
      badge: "STEP 5 — LOYAL CUSTOMER",
      title: "Customers Return Again",
      description: "Great ecommerce brands don't stop at one sale. Exceptional experiences create loyal customers who purchase again and recommend the brand."
    },
    {
      id: "summary",
      stepNum: "06",
      badge: "THE COMPLETE ENGINE",
      title: "Engineered for Conversion",
      description: "Traffic buys clicks. Your Shopify store earns customers."
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#060609] text-white border-t border-b border-white/[0.08] rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px] z-20 overflow-hidden font-sans select-none min-h-screen py-16 md:py-24"
    >
      {/* ── CINEMATIC AMBIENT LIGHTING BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-indigo-500/10 blur-[140px] rounded-full opacity-60" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#22E39A]/10 blur-[120px] rounded-full" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full" />
        
        {/* Sleek Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── HEADER (MUST REMAIN EXACT HEADING & SUBHEADING) ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22E39A]/10 border border-[#22E39A]/25 text-[#22E39A] text-[11px] font-mono font-bold uppercase tracking-[0.25em] mb-4 shadow-lg shadow-[#22E39A]/5"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>The Growth Formula</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.08] font-grotesk"
          >
            Hyper-Optimized.<br />
            <span className="text-[#22E39A] font-normal">Designed</span> to Convert.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/65 text-sm sm:text-base font-light leading-relaxed mt-5 max-w-2xl mx-auto"
          >
            A successful Shopify store isn&apos;t built by design alone. Real growth happens when every part of the customer journey works together. We optimize every touchpoint to transform traffic into loyal customers and sustainable revenue.
          </motion.p>
        </div>

        {/* ── STEP NAVIGATION TIMELINE / CONTROL BAR ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 bg-[#0E0E14]/80 backdrop-blur-xl border border-white/10 p-2.5 sm:p-3 rounded-2xl shadow-2xl shadow-black/80 max-w-5xl mx-auto">
          
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1 px-1 w-full sm:w-auto justify-start sm:justify-center">
            {stepsData.slice(0, 5).map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? "bg-white text-black font-bold shadow-lg shadow-white/10 scale-105" 
                      : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[10px] font-mono flex items-center justify-center font-bold ${
                    isActive ? "bg-black text-white" : "bg-white/10 text-white/70"
                  }`}>
                    {step.stepNum}
                  </span>
                  <span className="hidden md:inline">{step.title.split(" ")[0]}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activePill"
                      className="absolute inset-0 border-2 border-[#22E39A] rounded-xl pointer-events-none" 
                    />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => {
                setActiveStep(5);
                setIsPlaying(false);
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeStep === 5
                  ? "bg-[#22E39A] text-black font-bold shadow-lg shadow-[#22E39A]/20 scale-105"
                  : "text-[#22E39A]/80 hover:text-[#22E39A] hover:bg-[#22E39A]/10"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Loop</span>
            </button>
          </div>

          {/* Keynote Play / Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/70 hover:text-white transition-all cursor-pointer"
            title={isPlaying ? "Pause Keynote" : "Play Keynote"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#22E39A]" />
                <span>Auto Keynote: ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>Auto Keynote: OFF</span>
              </>
            )}
          </button>

        </div>

        {/* ── CONTINUOUS GOLDEN PATH LINE WITH GLOWING TRAVELING PARTICLES ── */}
        <div className="relative w-full max-w-5xl mx-auto mb-10 hidden md:block">
          <svg className="w-full h-10 overflow-visible" viewBox="0 0 1000 40">
            <defs>
              <linearGradient id="goldenPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="25%" stopColor="#22E39A" />
                <stop offset="50%" stopColor="#EAB308" />
                <stop offset="75%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Golden Line */}
            <path 
              d="M 50 20 L 950 20" 
              stroke="url(#goldenPathGrad)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              className="opacity-40" 
            />

            {/* Active Highlight Line */}
            <motion.path 
              d="M 50 20 L 950 20" 
              stroke="url(#goldenPathGrad)" 
              strokeWidth="5" 
              strokeLinecap="round" 
              filter="url(#glowGold)"
              initial={{ pathLength: 0.2 }}
              animate={{ pathLength: Math.min((activeStep + 1) / 5, 1) }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* 5 Golden Step Nodes along Path */}
            {[0, 1, 2, 3, 4].map((nodeIdx) => {
              const nodeX = 50 + nodeIdx * 225;
              const isPassed = activeStep >= nodeIdx;
              const isCurrent = activeStep === nodeIdx;
              return (
                <g key={nodeIdx} className="cursor-pointer" onClick={() => { setActiveStep(nodeIdx); setIsPlaying(false); }}>
                  <circle 
                    cx={nodeX} 
                    cy="20" 
                    r={isCurrent ? "12" : "8"} 
                    className={`transition-all duration-300 ${
                      isCurrent 
                        ? "fill-[#EAB308] stroke-white stroke-[3px]" 
                        : isPassed 
                        ? "fill-[#22E39A] stroke-emerald-900 stroke-2" 
                        : "fill-[#12131C] stroke-white/20 stroke-2"
                    }`} 
                  />
                  {isCurrent && (
                    <circle 
                      cx={nodeX} 
                      cy="20" 
                      r="18" 
                      className="fill-none stroke-[#EAB308] stroke-1 animate-ping opacity-60" 
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── KEYNOTE INTERACTIVE STAGE (PARALLAX CAROUSEL / STEP CARDS) ── */}
        <div className="relative min-h-[520px] md:min-h-[580px] w-full max-w-5xl mx-auto">
          
          <AnimatePresence mode="wait">
            
            {/* ───────────────────────────────────────────────────────────── */}
            {/* STEP 1: TRAFFIC */}
            {/* ───────────────────────────────────────────────────────────── */}
            {activeStep === 0 && (
              <motion.div
                key="step-traffic"
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0E0E16]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 rounded-3xl shadow-2xl shadow-black/90 relative overflow-hidden"
              >
                {/* Background aura */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Left Description Card */}
                <div className="lg:col-span-5 text-left z-10">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#22E39A] uppercase px-3 py-1 rounded-full bg-[#22E39A]/10 border border-[#22E39A]/20">
                    {stepsData[0].badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light font-grotesk text-white mt-4 mb-3 leading-tight">
                    {stepsData[0].title}
                  </h3>
                  <p className="text-white/65 text-sm sm:text-base font-light leading-relaxed">
                    {stepsData[0].description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                    <span className="text-xs font-mono text-white/50">Multi-Channel Particle Stream Active</span>
                  </div>
                </div>

                {/* Right Interactive Visual Stage */}
                <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[340px] sm:min-h-[380px] bg-[#08080E] border border-white/10 rounded-2xl p-6 overflow-hidden">
                  
                  {/* Glowing Traffic Source Grid */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-sm mb-12 relative z-10">
                    {[
                      { name: "Meta Ads", icon: Share2, color: "from-pink-500 to-rose-500", glow: "shadow-pink-500/20" },
                      { name: "Google", icon: Search, color: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/20" },
                      { name: "Instagram", icon: Share2, color: "from-purple-500 to-pink-500", glow: "shadow-purple-500/20" },
                      { name: "SEO Organic", icon: Globe, color: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/20" },
                      { name: "Influencers", icon: Zap, color: "from-amber-500 to-orange-500", glow: "shadow-amber-500/20" },
                      { name: "Email", icon: Mail, color: "from-violet-500 to-purple-500", glow: "shadow-violet-500/20" }
                    ].map((src, i) => (
                      <motion.div
                        key={src.name}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                        className={`flex flex-col items-center p-3 rounded-xl bg-[#12131F]/90 border border-white/10 backdrop-blur-md shadow-lg ${src.glow}`}
                      >
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${src.color} flex items-center justify-center text-white mb-1.5 shadow-md`}>
                          <src.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono text-white/80 font-medium">{src.name}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Animated Converging Particles */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.2, scale: 0.5, y: -80, x: (i - 3.5) * 40 }}
                        animate={{ opacity: [0.2, 1, 0], scale: [0.5, 1.2, 0.2], y: 70, x: 0 }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25, ease: "easeIn" }}
                        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-[#22E39A] to-amber-400 shadow-md shadow-[#22E39A]/50"
                      />
                    ))}
                  </div>

                  {/* Merged Glowing Visitor Avatar Node on Golden Path */}
                  <div className="relative z-10 flex flex-col items-center mt-4">
                    <motion.div 
                      animate={{ scale: [1, 1.08, 1], boxShadow: ["0 0 20px rgba(34,227,154,0.3)", "0 0 40px rgba(234,179,8,0.5)", "0 0 20px rgba(34,227,154,0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#22E39A] via-amber-400 to-yellow-300 p-0.5 shadow-2xl flex items-center justify-center"
                    >
                      <div className="w-full h-full rounded-full bg-[#08080E] flex flex-col items-center justify-center border border-white/20">
                        <span className="text-[9px] font-mono font-bold text-amber-400 tracking-wider">VISITOR</span>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#22E39A] animate-ping mt-0.5" />
                      </div>
                    </motion.div>
                    <span className="text-xs font-mono font-bold text-white/70 mt-3.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      1 Consolidated Visitor → Walking to Store
                    </span>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* STEP 2: STORE TRUST */}
            {/* ───────────────────────────────────────────────────────────── */}
            {activeStep === 1 && (
              <motion.div
                key="step-trust"
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0E0E16]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 rounded-3xl shadow-2xl shadow-black/90 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Left Description Card */}
                <div className="lg:col-span-5 text-left z-10">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#22E39A] uppercase px-3 py-1 rounded-full bg-[#22E39A]/10 border border-[#22E39A]/20">
                    {stepsData[1].badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light font-grotesk text-white mt-4 mb-3 leading-tight">
                    {stepsData[1].title}
                  </h3>
                  <p className="text-white/65 text-sm sm:text-base font-light leading-relaxed">
                    {stepsData[1].description}
                  </p>

                  {/* Trust Score Gauge */}
                  <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-white/70">Buyer Confidence Meter</span>
                      <span className="text-sm font-mono font-bold text-[#22E39A]">98.4% TRUST</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "20%" }}
                        animate={{ width: "98.4%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-[#22E39A] rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Realistic Shopify Homepage Mockup */}
                <div className="lg:col-span-7 relative bg-[#0B0C12] border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
                  
                  {/* Browser Header Bar */}
                  <div className="bg-[#141520] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-2 bg-[#08080D] border border-white/10 px-3 py-1 rounded-md text-[11px] font-mono text-emerald-400">
                      <Lock className="w-3 h-3" />
                      <span>https://luxury-store.com</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#22E39A] bg-[#22E39A]/10 px-2 py-0.5 rounded border border-[#22E39A]/20">
                      0.42s LOAD ⚡
                    </div>
                  </div>

                  {/* Store Content Stage */}
                  <div className="p-5 space-y-4">
                    {/* Hero Banner Mockup */}
                    <div className="relative h-32 sm:h-36 rounded-xl bg-gradient-to-r from-stone-900 via-zinc-800 to-stone-900 border border-white/10 p-5 flex flex-col justify-center text-left overflow-hidden">
                      <span className="text-[10px] font-mono uppercase text-amber-400 tracking-widest font-bold">2026 EDITION</span>
                      <h4 className="text-lg sm:text-xl font-grotesk text-white font-medium mt-1">AURA LUXURY COLLECTION</h4>
                      <p className="text-xs text-white/50 font-light mt-1">Engineered for supreme comfort & sound perfection</p>
                    </div>

                    {/* Pop-in Floating Trust Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { icon: Star, label: "4.9/5 RATING", sub: "2,840+ Reviews", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                        { icon: ShieldCheck, label: "SSL SECURE", sub: "256-Bit Encrypted", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                        { icon: Truck, label: "EXPRESS SHIP", sub: "Free 2-Day Delivery", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                        { icon: RotateCcw, label: "MONEY BACK", sub: "30-Day Guarantee", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" }
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.15 }}
                          className={`p-2.5 rounded-xl border ${item.bg} backdrop-blur-md flex flex-col items-center text-center`}
                        >
                          <item.icon className={`w-4 h-4 mb-1 ${item.color}`} />
                          <span className="text-[10px] font-mono font-bold text-white">{item.label}</span>
                          <span className="text-[8.5px] font-mono text-white/50 mt-0.5">{item.sub}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* STEP 3: BEST USER EXPERIENCE */}
            {/* ───────────────────────────────────────────────────────────── */}
            {activeStep === 2 && (
              <motion.div
                key="step-ux"
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0E0E16]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 rounded-3xl shadow-2xl shadow-black/90 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Left Description Card */}
                <div className="lg:col-span-5 text-left z-10">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#22E39A] uppercase px-3 py-1 rounded-full bg-[#22E39A]/10 border border-[#22E39A]/20">
                    {stepsData[2].badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light font-grotesk text-white mt-4 mb-3 leading-tight">
                    {stepsData[2].title}
                  </h3>
                  <p className="text-white/65 text-sm sm:text-base font-light leading-relaxed">
                    {stepsData[2].description}
                  </p>

                  <div className="mt-6 flex items-center gap-3 bg-white/[0.03] border border-white/10 p-3 rounded-xl">
                    <SlidersHorizontal className="w-4 h-4 text-[#22E39A]" />
                    <span className="text-xs font-mono text-white/70">Instant Variant Switching & Sticky Checkout Drawer</span>
                  </div>
                </div>

                {/* Right Interactive Shopify Product PDP & Drawer Mockup */}
                <div className="lg:col-span-7 relative bg-[#090A0F] border border-white/15 rounded-2xl p-5 sm:p-6 overflow-hidden">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    
                    {/* Product Card */}
                    <div className="sm:col-span-7 space-y-4 text-left">
                      <div className="relative h-44 rounded-xl bg-gradient-to-tr from-slate-900 via-zinc-900 to-stone-900 border border-white/10 p-4 flex items-center justify-center overflow-hidden group">
                        {/* Dynamic Product Visual Swatch */}
                        <motion.div 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className={`w-24 h-24 rounded-full shadow-2xl flex items-center justify-center border-2 ${
                            activeColor === "black" 
                              ? "bg-slate-950 border-slate-700 shadow-slate-900" 
                              : activeColor === "emerald" 
                              ? "bg-emerald-950 border-emerald-500 shadow-emerald-500/40" 
                              : "bg-stone-300 border-white shadow-white/40"
                          }`}
                        >
                          <Sparkles className={`w-8 h-8 ${activeColor === "emerald" ? "text-emerald-400" : "text-amber-400"}`} />
                        </motion.div>
                        <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white/40">HD Product Render</span>
                      </div>

                      {/* Variant Selection swatches */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono text-white/60">Color: <strong className="text-white uppercase">{activeColor}</strong></span>
                        <div className="flex gap-2">
                          {[
                            { id: "black", bg: "bg-slate-900 border-white/20" },
                            { id: "emerald", bg: "bg-emerald-500 border-emerald-400" },
                            { id: "silver", bg: "bg-slate-300 border-white" }
                          ].map((swatch) => (
                            <button
                              key={swatch.id}
                              onClick={() => setActiveColor(swatch.id)}
                              className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${swatch.bg} ${
                                activeColor === swatch.id ? "ring-2 ring-[#22E39A] scale-110" : ""
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Size Selector */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono text-white/60">Size:</span>
                        <div className="flex gap-2">
                          {["S", "M", "L", "XL"].map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setActiveSize(sz)}
                              className={`px-3 py-1 rounded-md text-xs font-mono border transition-all cursor-pointer ${
                                activeSize === sz 
                                  ? "bg-[#22E39A] text-black font-bold border-[#22E39A]" 
                                  : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Add to Cart CTA */}
                      <button
                        onClick={() => setCartOpen(!cartOpen)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22E39A] to-emerald-400 text-black font-grotesk font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#22E39A]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart — $289.00</span>
                      </button>
                    </div>

                    {/* Animated Slide-over Cart Drawer Preview */}
                    <div className="sm:col-span-5 relative h-full">
                      <motion.div 
                        animate={{ x: cartOpen ? 0 : 20, opacity: cartOpen ? 1 : 0.4 }}
                        className="bg-[#12131F] border border-white/15 rounded-xl p-4 text-left shadow-2xl space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                            <ShoppingCart className="w-3.5 h-3.5 text-[#22E39A]" />
                            Your Cart (1)
                          </span>
                          <span className="text-[10px] font-mono text-[#22E39A]">FREE SHIPPING</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#22E39A]">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-mono font-bold text-white">AURA Pro Headphone</p>
                            <p className="text-[10px] font-mono text-white/50">{activeColor.toUpperCase()} / {activeSize}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                          <span className="text-white/60">Subtotal:</span>
                          <span className="font-bold text-white">$289.00</span>
                        </div>

                        <div className="w-full py-2 rounded-lg bg-amber-400 text-black font-mono font-bold text-[11px] text-center shadow-md animate-pulse">
                          PROCEED TO CHECKOUT →
                        </div>
                      </motion.div>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* STEP 4: FIRST SALE */}
            {/* ───────────────────────────────────────────────────────────── */}
            {activeStep === 3 && (
              <motion.div
                key="step-sale"
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0E0E16]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 rounded-3xl shadow-2xl shadow-black/90 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Left Description Card */}
                <div className="lg:col-span-5 text-left z-10">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#22E39A] uppercase px-3 py-1 rounded-full bg-[#22E39A]/10 border border-[#22E39A]/20">
                    {stepsData[3].badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light font-grotesk text-white mt-4 mb-3 leading-tight">
                    {stepsData[3].title}
                  </h3>
                  <p className="text-white/65 text-sm sm:text-base font-light leading-relaxed">
                    {stepsData[3].description}
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-left space-y-1">
                    <span className="text-xs font-mono font-bold text-[#22E39A] flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" /> Live Revenue Growth: +340%
                    </span>
                    <p className="text-[11px] font-mono text-white/50">Zero friction Stripe & 1-click Apple Pay checkout</p>
                  </div>
                </div>

                {/* Right Payment & Sales Dashboard Visual */}
                <div className="lg:col-span-7 relative bg-[#090A0F] border border-white/15 rounded-2xl p-6 overflow-hidden">
                  
                  {/* Floating Stripe Order Toast */}
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 bg-[#131422] border border-emerald-500/40 p-3.5 rounded-xl flex items-center justify-between shadow-xl"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-[#22E39A]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#22E39A] uppercase font-bold tracking-wider">STRIPE PAYMENT SUCCESS</span>
                        <p className="text-sm font-mono font-bold text-white">Order #4902 Authorized — $289.00</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">Just now</span>
                  </motion.div>

                  {/* Revenue Growth Chart */}
                  <div className="bg-[#0D0E18] border border-white/10 p-5 rounded-xl text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-white/50 uppercase">SHOPIFY LIVE DASHBOARD</span>
                        <h4 className="text-2xl font-mono font-bold text-white">$14,280.00</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-[#22E39A]/10 border border-[#22E39A]/30 text-[#22E39A] text-xs font-mono font-bold">
                        +342.8% vs last week
                      </span>
                    </div>

                    {/* SVG Vector Chart Line */}
                    <div className="h-28 w-full relative pt-2">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#22E39A" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#22E39A" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 80 Q 100 70 200 40 T 400 10 L 400 100 L 0 100 Z" fill="url(#chartGrad)" />
                        <motion.path 
                          d="M 0 80 Q 100 70 200 40 T 400 10" 
                          fill="none" 
                          stroke="#22E39A" 
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Metallic particle burst */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50, x: (i - 2.5) * 60 }}
                        animate={{ opacity: [0, 1, 0], y: -80, x: (i - 2.5) * 80 }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute bottom-10 left-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400/80"
                      />
                    ))}
                  </div>

                </div>
              </motion.div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* STEP 5: LOYAL CUSTOMER */}
            {/* ───────────────────────────────────────────────────────────── */}
            {activeStep === 4 && (
              <motion.div
                key="step-loyal"
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0E0E16]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 rounded-3xl shadow-2xl shadow-black/90 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Left Description Card */}
                <div className="lg:col-span-5 text-left z-10">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#22E39A] uppercase px-3 py-1 rounded-full bg-[#22E39A]/10 border border-[#22E39A]/20">
                    {stepsData[4].badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light font-grotesk text-white mt-4 mb-3 leading-tight">
                    {stepsData[4].title}
                  </h3>
                  <p className="text-white/65 text-sm sm:text-base font-light leading-relaxed">
                    {stepsData[4].description}
                  </p>

                  <div className="mt-6 flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 p-3.5 rounded-xl text-left">
                    <Repeat className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono text-white/80">Golden Retention Loop: High LTV & 42% Repeat Order Rate</span>
                  </div>
                </div>

                {/* Right Post-Purchase Loyalty Cards Visual */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  
                  {/* Unboxing / Package Card */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-2xl bg-[#0F101B] border border-white/10 shadow-lg space-y-2"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                      <PackageCheck className="w-4 h-4" />
                      <span>Package Delivered</span>
                    </div>
                    <p className="text-xs font-mono text-white/70">Unboxing experience rating: 10/10</p>
                    <span className="inline-block text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                      Delivered 2 days early
                    </span>
                  </motion.div>

                  {/* 5-Star Review Card */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-2xl bg-[#0F101B] border border-white/10 shadow-lg space-y-2"
                  >
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs font-grotesk text-white font-medium">&ldquo;Best quality & packaging ever! Reordering now.&rdquo;</p>
                    <span className="text-[10px] font-mono text-white/40">— Sarah M. (Verified Buyer)</span>
                  </motion.div>

                  {/* VIP Loyalty Rewards */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-2xl bg-[#0F101B] border border-white/10 shadow-lg space-y-2"
                  >
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold">
                      <Award className="w-4 h-4" />
                      <span>VIP Loyalty Unlocked</span>
                    </div>
                    <p className="text-xs font-mono text-white/70">+500 Points earned on first purchase</p>
                    <span className="inline-block text-[9px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20">
                      15% Off Next Order Available
                    </span>
                  </motion.div>

                  {/* Golden Loop Repeat Order */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#0F101B] to-emerald-500/10 border border-amber-500/30 shadow-lg space-y-2"
                  >
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                      <Repeat className="w-4 h-4" />
                      <span>Repeat Order Placed</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-white">$189.00 Second Order (30 Days Later)</p>
                    <span className="inline-block text-[9px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      Golden Loop Completed 🔄
                    </span>
                  </motion.div>

                </div>
              </motion.div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* FINAL SCENE: ZOOM OUT / FULL ENGINE SUMMARY */}
            {/* ───────────────────────────────────────────────────────────── */}
            {activeStep === 5 && (
              <motion.div
                key="step-summary"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-b from-[#0E0E16] to-[#07070B] border border-white/15 p-8 sm:p-12 rounded-3xl shadow-2xl shadow-black/95 text-center relative overflow-hidden"
              >
                {/* 5 Connected Node Journey Bar */}
                <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-10 max-w-4xl mx-auto">
                  {[
                    { title: "Traffic", icon: Globe, color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
                    { title: "Trust", icon: ShieldCheck, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
                    { title: "Experience", icon: ShoppingCart, color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10" },
                    { title: "Sales", icon: TrendingUp, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
                    { title: "Loyal Customers", icon: Heart, color: "text-rose-400 border-rose-500/30 bg-rose-500/10" }
                  ].map((item, idx) => (
                    <div key={item.title} className="flex flex-col items-center">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border ${item.color} flex items-center justify-center mb-2 shadow-lg`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-white/80">{item.title}</span>
                      {idx < 4 && (
                        <div className="hidden sm:block text-white/30 font-mono text-xs mt-1">→</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* EXACT REQUIRED MESSAGE */}
                <div className="space-y-3 max-w-2xl mx-auto my-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light font-grotesk text-white tracking-tight leading-tight">
                    Traffic buys clicks.
                  </h3>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-grotesk text-[#22E39A] tracking-tight leading-tight">
                    Your Shopify store earns customers.
                  </h3>
                </div>

                <div className="pt-6 border-t border-white/10 max-w-md mx-auto space-y-4">
                  <div>
                    <span className="text-xl font-mono font-black tracking-widest text-white">SALEPXL</span>
                    <p className="text-xs font-mono text-white/50 mt-1">Building Shopify stores engineered for conversion.</p>
                  </div>

                  <button
                    onClick={onOpenModal}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-[#22E39A] text-black font-grotesk font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-2xl hover:scale-105 cursor-pointer"
                  >
                    <span>Build My Shopify Store</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}

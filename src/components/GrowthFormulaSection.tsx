"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Search, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Package, 
  MousePointer, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Play,
  Pause,
  ChevronDown,
  ShoppingBag,
  Lock,
  Truck,
  Sparkles,
  Clock
} from "lucide-react";

interface GrowthFormulaSectionProps {
  onOpenModal: () => void;
}

/* ─────────────────────────────────────────────────────────────────────────────
   OFFICIAL LOGO SVGs (Traffic Channels)
───────────────────────────────────────────────────────────────────────────── */
function GoogleLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

function MetaLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0081FB">
      <path d="M16.48 3.5c-2.3 0-4.32 1.25-5.48 3.19C9.84 4.75 7.82 3.5 5.52 3.5 2.47 3.5 0 5.97 0 9.02c0 4.14 4.8 8.48 10.42 11.23.36.18.8.18 1.16 0C17.2 17.5 22 13.16 22 9.02c0-3.05-2.47-5.52-5.52-5.52zm-5.48 15.35C5.7 16.32 1.8 12.42 1.8 9.02c0-2.05 1.67-3.72 3.72-3.72 1.77 0 3.32 1.25 3.66 2.99h1.64c.34-1.74 1.89-2.99 3.66-2.99 2.05 0 3.72 1.67 3.72 3.72 0 3.4-3.9 7.3-9.2 9.83z" />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E1306C"/>
    </svg>
  );
}

function WhatsAppLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366">
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.96 9.96 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.669-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHOPPER SVG ANIMATED FIGURES
───────────────────────────────────────────────────────────────────────────── */
function ShopperEmptyCart({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div 
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
      className="flex items-end gap-1 shrink-0"
    >
      <svg className="w-10 h-16" viewBox="0 0 40 70" fill="none">
        <circle cx="20" cy="12" r="7" fill="#F4A261" />
        <path d="M 14 10 C 14 5, 26 5, 26 10 Z" fill="#264653" />
        <path d="M 13 20 L 27 20 L 25 42 L 15 42 Z" fill="#E76F51" />
        <path d="M 15 42 L 25 42 L 27 50 L 13 50 Z" fill="#2A9D8F" />
        <motion.path 
          animate={{ d: ["M 16 50 L 14 66", "M 16 50 L 20 66", "M 16 50 L 14 66"] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          stroke="#E76F51" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <motion.path 
          animate={{ d: ["M 24 50 L 26 66", "M 24 50 L 20 66", "M 24 50 L 26 66"] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          stroke="#E76F51" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <path d="M 23 24 L 35 34" stroke="#F4A261" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className="w-10 h-12" viewBox="0 0 45 45" fill="none">
        <path d="M 5 10 L 12 10 L 16 30 L 38 30 L 42 12 L 14 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 20 12 L 20 30 M 26 12 L 26 30 M 32 12 L 32 30" stroke="#475569" strokeWidth="1.5" />
        <motion.circle animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} cx="20" cy="36" r="3" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
        <motion.circle animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} cx="34" cy="36" r="3" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
}

function ShopperFullCart({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div 
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
      className="flex items-end gap-1 shrink-0"
    >
      <svg className="w-10 h-16" viewBox="0 0 40 70" fill="none">
        <circle cx="20" cy="12" r="7" fill="#F4A261" />
        <path d="M 14 10 C 14 5, 26 5, 26 10 Z" fill="#1D3557" />
        <path d="M 13 20 L 27 20 L 25 42 L 15 42 Z" fill="#10B981" />
        <path d="M 15 42 L 25 42 L 27 50 L 13 50 Z" fill="#047857" />
        <motion.path 
          animate={{ d: ["M 16 50 L 14 66", "M 16 50 L 20 66", "M 16 50 L 14 66"] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          stroke="#F4A261" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <motion.path 
          animate={{ d: ["M 24 50 L 26 66", "M 24 50 L 20 66", "M 24 50 L 26 66"] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          stroke="#F4A261" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <path d="M 23 24 L 35 34" stroke="#F4A261" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className="w-10 h-12" viewBox="0 0 45 45" fill="none">
        <rect x="18" y="10" width="9" height="9" rx="1" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
        <rect x="25" y="8" width="10" height="11" rx="1" fill="#10B981" stroke="#059669" strokeWidth="1" />
        <rect x="20" y="3" width="11" height="8" rx="1" fill="#6366F1" stroke="#4F46E5" strokeWidth="1" />

        <path d="M 5 10 L 12 10 L 16 30 L 38 30 L 42 12 L 14 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 20 12 L 20 30 M 26 12 L 26 30 M 32 12 L 32 30" stroke="#059669" strokeWidth="1.5" />
        <motion.circle animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} cx="20" cy="36" r="3" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
        <motion.circle animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} cx="34" cy="36" r="3" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
}

function DeliveryHandover() {
  return (
    <div className="flex items-end gap-2 shrink-0">
      <svg className="w-12 h-20" viewBox="0 0 50 80" fill="none">
        <circle cx="22" cy="14" r="8" fill="#F4A261" />
        <path d="M 14 12 C 14 6, 30 6, 30 12 Z" fill="#E76F51" />
        <path d="M 12 24 L 32 24 L 30 50 L 14 50 Z" fill="#F59E0B" />
        <path d="M 14 50 L 30 50 L 32 76 L 12 76 Z" fill="#1E293B" />
        <path d="M 28 30 L 44 34" stroke="#F4A261" strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      <div className="w-10 h-10 rounded-lg bg-amber-500 border-2 border-amber-300 shadow-lg flex items-center justify-center -ml-2 mb-4 z-10 animate-bounce">
        <Package className="w-5 h-5 text-black" />
      </div>

      <svg className="w-12 h-20 -ml-2" viewBox="0 0 50 80" fill="none">
        <path d="M 16 12 C 16 6, 32 6, 32 12 Z" fill="#10B981" />
        <path d="M 28 12 L 38 12" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="14" r="8" fill="#F4A261" />
        <path d="M 14 24 L 34 24 L 32 50 L 16 50 Z" fill="#10B981" />
        <path d="M 16 50 L 32 50 L 34 76 L 14 76 Z" fill="#064E3B" />
        <path d="M 18 30 L 6 34" stroke="#F4A261" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT: GrowthFormulaSection
   Desktop: Sticky Horizontal Inline Camera Scroll
   Mobile: Sequential Vertical Animation Storyboard Step-by-Step
───────────────────────────────────────────────────────────────────────────── */
export default function GrowthFormulaSection({ onOpenModal }: GrowthFormulaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Desktop scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001
  });

  const cameraX = useTransform(smoothProgress, [0, 0.70], ["0%", "-66.6666%"]);
  const progressLineWidth = useTransform(smoothProgress, [0, 0.70], ["0%", "100%"]);

  useEffect(() => {
    const unsub = smoothProgress.on("change", (val) => {
      if (val < 0.28) setActiveStep(0);
      else if (val < 0.58) setActiveStep(1);
      else setActiveStep(2);
    });
    return () => unsub();
  }, [smoothProgress]);

  const scrollToStep = (stepIndex: number) => {
    if (!containerRef.current || typeof window === "undefined") return;
    // Strictly disable programmatic scrolling on mobile devices
    if (window.innerWidth < 1024) return;

    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.clientHeight - window.innerHeight;
    const targetY = containerTop + (stepIndex / 2) * containerHeight * 0.7;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // AUTO SCROLL EFFECT (Desktop only)
  useEffect(() => {
    if (!isAutoScrolling || !isInView || isHovered) return;
    // Strictly disable auto-scrolling on mobile screens
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;

      setActiveStep((prevStep) => {
        const nextStep = (prevStep + 1) % 3;
        scrollToStep(nextStep);
        return nextStep;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, isInView, isHovered]);

  const trustBadges = [
    { label: "Customer Psychology Trust", icon: "⭐", pos: "-top-4 -left-4" },
    { label: "CRO Optimized PDP", icon: "🎯", pos: "-top-4 -right-4" },
    { label: "Faster 1-Click Checkout", icon: "🚀", pos: "-bottom-4 left-1/2 -translate-x-1/2" }
  ];

  return (
    <section 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#03050a] text-white border-t border-b border-white/[0.08] z-20 font-sans select-none"
    >
      {/* Background Ambient Glow FX */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[500px] bg-amber-500/10 blur-[160px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[450px] sm:h-[550px] bg-emerald-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[500px] bg-indigo-500/10 blur-[160px] rounded-full" />
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DESKTOP: STICKY INLINE HORIZONTAL SCROLL CAMERA (lg:block) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:block min-h-[350vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-3 z-10 overflow-hidden">

          {/* Header Section from User Spec */}
          <div className="max-w-3xl mx-auto px-4 w-full z-40 text-center flex flex-col items-center pt-1 sm:pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium tracking-widest uppercase mb-2 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>THE GROWTH FORMULA</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-light font-grotesk text-white tracking-tight leading-snug mb-1.5">
              Hyper-Optimized. <span className="text-emerald-400 font-normal">Designed to Convert.</span>
            </h2>

            <p className="text-white/70 text-xs sm:text-sm font-light max-w-xl mx-auto font-sans leading-relaxed">
              We optimize every touchpoint of your customer journey to transform traffic into high-converting sales & revenue.
            </p>
          </div>

          {/* Header Progress Tracker */}
          <div className="max-w-4xl mx-auto px-4 w-full z-40 mt-2">
            <div className="flex flex-col items-center gap-2">
              
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl">
                  
                  <button 
                    onClick={() => scrollToStep(0)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeStep === 0 
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    01 TRAFFIC
                  </button>

                  <span className="text-white/20 text-xs">→</span>

                  <button 
                    onClick={() => scrollToStep(1)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeStep === 1 
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    02 TRUST
                  </button>

                  <span className="text-white/20 text-xs">→</span>

                  <button 
                    onClick={() => scrollToStep(2)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeStep === 2 
                        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]" 
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    03 CONVERSION
                  </button>
                </div>

                <button
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    isAutoScrolling && !isHovered
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                  }`}
                >
                  {isAutoScrolling && !isHovered ? (
                    <>
                      <Pause className="w-3 h-3 text-emerald-400 animate-pulse" />
                      <span>AUTO SCROLL ON</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-white/60" />
                      <span>AUTO SCROLL PAUSED</span>
                    </>
                  )}
                </button>
              </div>

              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                <motion.div 
                  style={{ width: progressLineWidth }}
                  className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Desktop Horizontal Track */}
          <div className="w-full flex-1 my-auto relative overflow-x-hidden overflow-y-visible flex items-center py-4">
            
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-amber-500/40 via-emerald-500/40 to-indigo-500/40 z-0 pointer-events-none" />

            <motion.div 
              style={{ x: cameraX }}
              className="flex items-center w-[300%] h-full relative z-10"
            >
              {/* DESKTOP PANEL 1: TRAFFIC INFLOW */}
              <div className="w-[100vw] h-full shrink-0 flex items-center justify-center px-12">
                <div className="max-w-4xl w-full grid grid-cols-12 gap-8 items-center bg-white/[0.02] border border-amber-500/20 rounded-3xl p-5 sm:p-6 pt-9 backdrop-blur-md shadow-2xl relative">
                  
                  <div className="absolute top-3 left-6 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest z-20">
                    Stage 01 • Your Ad Traffic Inflow
                  </div>

                  <div className="col-span-5 space-y-4">
                    <h3 className="text-3xl font-extrabold font-grotesk tracking-tight text-white leading-tight">
                      Capture <span className="text-amber-400">Your Ad Traffic</span>
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      You run your ads on Google, Meta, Instagram & WhatsApp to bring shoppers. We build the high-speed, CRO-optimized store that captures every visitor and prevents ad money bounce.
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Seamless Landing for Google & Meta Ad Traffic</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Zero Drop-Off Flow for Social Media Shoppers</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-7 flex items-center justify-around bg-black/40 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex flex-col gap-3 shrink-0">
                      <span className="text-[10px] font-mono font-bold text-white/50 tracking-wider">YOUR AD CHANNELS</span>
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-medium">
                        <GoogleLogo />
                        <span>Google Ads</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-medium">
                        <MetaLogo />
                        <span>Meta Ads</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-medium">
                        <InstagramLogo />
                        <span>Instagram</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-medium">
                        <WhatsAppLogo />
                        <span>WhatsApp</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-amber-400">
                      <span className="text-[9px] font-mono tracking-widest text-amber-400/80">STORE INFLOW</span>
                      <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full relative overflow-hidden shadow-[0_0_10px_#f59e0b]">
                        <motion.div 
                          animate={{ x: ["-100%", "100%"] }} 
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                          className="w-8 h-full bg-white rounded-full shadow-[0_0_10px_#fff]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">VISITORS ARRIVING</span>
                      <div className="flex items-center gap-3">
                        <ShopperEmptyCart delay={0} />
                        <ShopperEmptyCart delay={0.4} />
                      </div>
                      <span className="text-[10px] font-mono text-white/40">50,000+ Visitors / Mo</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* DESKTOP PANEL 2: STOREFRONT TRUST & SALE PXL POSITIONING */}
              <div className="w-[100vw] h-full shrink-0 flex items-center justify-center px-8 lg:px-12">
                <div className="max-w-5xl w-full grid grid-cols-12 gap-8 items-center bg-white/[0.02] border border-emerald-500/25 rounded-3xl p-5 sm:p-6 pt-9 backdrop-blur-md shadow-2xl relative">
                  
                  <div className="absolute top-3 left-6 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-20">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Stage 02 • High-Converting Shopify Store</span>
                  </div>

                  {/* Left Column: Copy & SalePXL Psychology Pillars */}
                  <div className="col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>SalePXL Store Architecture</span>
                    </div>

                    <h3 className="text-3xl font-extrabold font-grotesk tracking-tight text-white leading-tight">
                      Build Instant <span className="text-emerald-400">Buyer Trust</span> & Best UX
                    </h3>
                    
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      We build buyer trust with SalePXL Shopify stores. Engineered with customer psychology, ultra-clean design, and well-optimized product pages to turn visitors into buyers.
                    </p>

                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-start gap-2.5 text-xs text-emerald-200">
                        <div className="p-1 rounded bg-emerald-500/20 border border-emerald-500/40 shrink-0 mt-0.5">
                          <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div>
                          <span className="font-semibold text-white">CRO-Optimized 2X Conversion PDP:</span>
                          <span className="text-white/60 block text-[11px]">Product pages designed around scannable benefit blocks & visual proof.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs text-emerald-200">
                        <div className="p-1 rounded bg-emerald-500/20 border border-emerald-500/40 shrink-0 mt-0.5">
                          <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                        </div>
                        <div>
                          <span className="font-semibold text-white">Customer Psychology & Buyer Trust:</span>
                          <span className="text-white/60 block text-[11px]">Verified review widgets, authority seals, and zero-anxiety guarantees.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs text-emerald-200">
                        <div className="p-1 rounded bg-emerald-500/20 border border-emerald-500/40 shrink-0 mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div>
                          <span className="font-semibold text-white">Faster Checkout & Offer Positioning:</span>
                          <span className="text-white/60 block text-[11px]">Strategic discount callouts paired with 1-click express payment flow.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interactive CRO E-Commerce Store Preview Card */}
                  <div className="col-span-7 flex items-center justify-center relative py-6 px-4">
                    <div className="w-[310px] bg-[#070b14] border-2 border-emerald-500/40 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden z-10 font-sans">
                      
                      {/* Store Top Announcement Bar */}
                      <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 py-1 px-3 text-center flex items-center justify-between text-[10px] font-medium text-black">
                        <span className="font-bold tracking-tight">⚡ FREE Express 2-Day Shipping</span>
                        <span className="bg-black/20 text-white font-mono px-1.5 py-0.2 rounded text-[9px]">COD AVAILABLE</span>
                      </div>

                      {/* Store Header Navigation */}
                      <div className="px-3.5 py-2 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span className="text-[11px] font-grotesk font-extrabold tracking-wider text-white">LUXURY STORE</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Search className="w-3.5 h-3.5" />
                          <div className="relative">
                            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-black font-bold text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">1</span>
                          </div>
                        </div>
                      </div>

                      {/* Product Display & CRO Micro-UI */}
                      <div className="p-3.5 space-y-3">
                        
                        {/* Main Product Card */}
                        <div className="relative bg-white/[0.03] border border-white/10 rounded-xl p-2.5 flex gap-3 items-center">
                          
                          {/* Product Image Mockup */}
                          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-emerald-900/60 to-slate-900 border border-emerald-500/30 flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
                            <Sparkles className="w-7 h-7 text-emerald-400 animate-pulse" />
                            <span className="text-[8px] font-mono font-bold text-emerald-300 mt-1">BESTSELLER</span>
                            <span className="absolute top-1 left-1 bg-emerald-500 text-black font-mono font-bold text-[8px] px-1 rounded">40% OFF</span>
                          </div>

                          {/* Product Meta */}
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                              <span>★★★★★</span>
                              <span className="text-white/80 font-bold">4.9</span>
                              <span className="text-white/40 text-[9px]">(2,840)</span>
                            </div>
                            
                            <h4 className="text-xs font-bold text-white truncate font-grotesk">
                              Radiant Renewal Serum
                            </h4>

                            {/* Psychological Urgency Trigger */}
                            <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
                              <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>Only 3 Left • 18 Sold Recently</span>
                            </div>

                            {/* Price & Savings Pill */}
                            <div className="flex items-center gap-2 pt-0.5">
                              <span className="text-sm font-extrabold text-white">₹1,499</span>
                              <span className="text-[10px] text-white/40 line-through">₹2,499</span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold">
                                SAVE ₹1,000
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Size / Shade Pills Selector */}
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-white/60">Select Size:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-white/10 text-white/50 border border-white/10 text-[9px]">30ml</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 font-bold text-[9px]">50ml</span>
                            <span className="px-2 py-0.5 rounded bg-white/10 text-white/50 border border-white/10 text-[9px]">100ml</span>
                          </div>
                        </div>

                        {/* High-Converting 1-Click Add To Cart CTA Button */}
                        <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black font-grotesk font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-[1.02] transition-transform cursor-pointer">
                          <Zap className="w-3.5 h-3.5 fill-black" />
                          <span>BUY NOW - 1-CLICK CHECKOUT</span>
                        </button>

                        {/* Security & Guarantee Pills Below CTA */}
                        <div className="grid grid-cols-3 gap-1 pt-1 text-center font-mono text-[8px] text-emerald-300/80">
                          <div className="p-1 rounded bg-white/[0.03] border border-white/5 flex flex-col items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>30-Day Guarantee</span>
                          </div>
                          <div className="p-1 rounded bg-white/[0.03] border border-white/5 flex flex-col items-center gap-0.5">
                            <Lock className="w-3 h-3 text-emerald-400" />
                            <span>256-Bit SSL Safe</span>
                          </div>
                          <div className="p-1 rounded bg-white/[0.03] border border-white/5 flex flex-col items-center gap-0.5">
                            <Truck className="w-3 h-3 text-emerald-400" />
                            <span>Same-Day Ship</span>
                          </div>
                        </div>
                      </div>

                      {/* Live Customer Order Notification Toast Floating at Bottom */}
                      <div className="mx-3 mb-3 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-between text-[9px] font-mono text-emerald-300">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Priya from Mumbai just purchased!</span>
                        </div>
                        <span className="text-emerald-400/60 text-[8px]">1m ago</span>
                      </div>

                    </div>

                    {/* Floating CRO Psychology Pills positioned neatly around the Store Card */}
                    {trustBadges.map((badge, i) => (
                      <motion.span
                        key={badge.label}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                        className={`absolute ${badge.pos} px-3 py-1 rounded-full bg-[#070b14] border border-emerald-500/50 text-[10px] font-mono font-bold text-emerald-300 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.25)] whitespace-nowrap z-20 flex items-center gap-1.5`}
                      >
                        <span>{badge.icon}</span>
                        <span>{badge.label}</span>
                      </motion.span>
                    ))}
                  </div>

                </div>
              </div>

              {/* DESKTOP PANEL 3: HIGH-CONVERTING STORE OUTPUT */}
              <div className="w-[100vw] h-full shrink-0 flex items-center justify-center px-8 lg:px-12">
                <div className="max-w-5xl w-full grid grid-cols-12 gap-8 items-center bg-white/[0.02] border border-indigo-500/30 rounded-3xl p-5 sm:p-6 pt-9 backdrop-blur-md shadow-2xl relative">
                  
                  <div className="absolute top-3 left-6 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    <span>Stage 03 • High-Converting Store Output & Revenue</span>
                  </div>

                  {/* Left Column: Copy & USP Positioning */}
                  <div className="col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                      <span>SalePXL High-Converting USP Output</span>
                    </div>

                    <h3 className="text-3xl font-extrabold font-grotesk tracking-tight text-white leading-tight">
                      Your High-Converting Store <span className="text-indigo-400">Is Your Ultimate USP</span>
                    </h3>

                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      With SalePXL conversion architecture, your high-converting Shopify store becomes your competitive USP. Strategic product positioning turns visitor trust into explosive order growth and higher AOV.
                    </p>

                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-start gap-2.5 text-xs text-indigo-200">
                        <div className="p-1 rounded bg-indigo-500/20 border border-indigo-500/40 shrink-0 mt-0.5">
                          <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                        <div>
                          <span className="font-semibold text-white">Visitor Trust & Conversion Lift:</span>
                          <span className="text-white/60 block text-[11px]">+245% average conversion lift by removing buyer hesitation.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs text-indigo-200">
                        <div className="p-1 rounded bg-indigo-500/20 border border-indigo-500/40 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                        <div>
                          <span className="font-semibold text-white">Increased AOV & Bundle Sales:</span>
                          <span className="text-white/60 block text-[11px]">Strategic discount callouts & high-margin cart upgrades.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs text-indigo-200">
                        <div className="p-1 rounded bg-indigo-500/20 border border-indigo-500/40 shrink-0 mt-0.5">
                          <Zap className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                        <div>
                          <span className="font-semibold text-white">Rapid Real-Time Confirmed Orders:</span>
                          <span className="text-white/60 block text-[11px]">Continuous order stream with 1-click express checkout.</span>
                        </div>
                      </div>
                    </div>


                  </div>

                  {/* Right Column: 5 New Orders Confirmed & AOV Increased Live Feed Showcase */}
                  <div className="col-span-7 flex flex-col items-center justify-center bg-black/60 border border-indigo-500/30 rounded-2xl p-4.5 relative gap-2.5 font-mono shadow-2xl">
                    
                    {/* Top Stats Banner: AOV Increased + Confirmed Orders */}
                    <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 border border-indigo-500/40 text-xs">
                      <div className="flex items-center gap-2 text-indigo-300 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>AOV INCREASED BY +42%</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        5 NEW ORDERS CONFIRMED
                      </span>
                    </div>

                    {/* 5 Live Confirmed Orders Feed */}
                    <div className="w-full space-y-1.5">
                      
                      {/* Order 1 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-emerald-500/30 text-[11px] text-emerald-300">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                          <span className="font-bold text-white">🎉 New Order Confirmed!</span>
                          <span className="text-emerald-400 font-extrabold">₹4,850</span>
                          <span className="text-white/60 text-[10px] truncate"> Radiant Serum Bundle</span>
                        </div>
                        <span className="text-white/40 text-[9px] shrink-0 ml-2">Just now</span>
                      </div>

                      {/* Order 2 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] text-emerald-300">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="font-bold text-white">🎉 New Order Confirmed!</span>
                          <span className="text-emerald-400 font-extrabold">₹3,200</span>
                          <span className="text-white/60 text-[10px] truncate"> Evening Silk Dress</span>
                        </div>
                        <span className="text-white/40 text-[9px] shrink-0 ml-2">2m ago</span>
                      </div>

                      {/* Order 3 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] text-emerald-300">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="font-bold text-white">🎉 New Order Confirmed!</span>
                          <span className="text-emerald-400 font-extrabold">₹6,400</span>
                          <span className="text-white/60 text-[10px] truncate"> Deluxe Skincare Set</span>
                        </div>
                        <span className="text-white/40 text-[9px] shrink-0 ml-2">5m ago</span>
                      </div>

                      {/* Order 4 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] text-emerald-300">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="font-bold text-white">🎉 New Order Confirmed!</span>
                          <span className="text-emerald-400 font-extrabold">₹2,750</span>
                          <span className="text-white/60 text-[10px] truncate"> Hydrating Cream Pack</span>
                        </div>
                        <span className="text-white/40 text-[9px] shrink-0 ml-2">8m ago</span>
                      </div>

                      {/* Order 5 */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] text-emerald-300">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="font-bold text-white">🎉 New Order Confirmed!</span>
                          <span className="text-emerald-400 font-extrabold">₹5,100</span>
                          <span className="text-white/60 text-[10px] truncate"> Luxury Glow Kit</span>
                        </div>
                        <span className="text-white/40 text-[9px] shrink-0 ml-2">12m ago</span>
                      </div>

                    </div>

                    {/* Bottom Cart & Delivery Visual Indicator */}
                    <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-[10px] text-white/70">
                      <div className="flex items-center gap-2">
                        <ShopperFullCart delay={0} />
                        <span className="text-emerald-400 font-bold">SalePXL High-Converting Store Output</span>
                      </div>
                      <span className="text-indigo-300 font-bold bg-indigo-500/20 px-2 py-0.5 rounded">3.8X ROAS LIFT</span>
                    </div>

                  </div>

                </div>
              </div>
            </motion.div>
          </div>

          <div className="max-w-xl mx-auto px-4 z-40 text-center pb-2">
            <p className="text-xs sm:text-sm font-grotesk text-white/80 font-light">
              Traffic brings visitors. <span className="text-emerald-400 font-normal">Your Shopify store earns customers.</span>
            </p>
          </div>

        </div>
      </div>


      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MOBILE: SEQUENTIAL VERTICAL ANIMATION STORYBOARD (lg:hidden) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden py-10 px-4 space-y-8 max-w-lg mx-auto relative z-10">
        
        {/* Mobile Section Main Header Title */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-medium text-emerald-400 uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>THE GROWTH FORMULA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light font-grotesk text-white tracking-tight leading-tight block">
            Hyper-Optimized. <span className="text-emerald-400 font-normal">Designed to Convert.</span>
          </h2>
          <p className="text-xs text-white/70 max-w-xs mx-auto font-sans leading-relaxed font-light">
            A successful Shopify store isn't built by design alone. Real growth happens when every part of the customer journey works together. We optimize every touchpoint to transform traffic into loyal customers and sustainable revenue.
          </p>
        </div>

        {/* ── MOBILE STEP 1: TRAFFIC INFLOW ── */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-amber-500/15 via-[#070b18] to-[#04060d] border border-amber-500/30 backdrop-blur-xl shadow-2xl space-y-4 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">
            Stage 01 • Your Ad Traffic Inflow
          </div>

          <h3 className="text-xl font-extrabold font-grotesk text-white leading-tight">
            Capture <span className="text-amber-400">Your Ad Traffic</span>
          </h3>
          <p className="text-xs text-white/70 leading-relaxed font-sans">
            You run your ads on Google, Meta, Instagram & WhatsApp to bring shoppers. We build the high-speed, CRO-optimized store that captures every visitor.
          </p>

          {/* Traffic Channel Badges */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium">
              <GoogleLogo />
              <span>Google Ads</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium">
              <MetaLogo />
              <span>Meta Ads</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium">
              <InstagramLogo />
              <span>Instagram</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium">
              <WhatsAppLogo />
              <span>WhatsApp</span>
            </div>
          </div>

          {/* Flow Animation + Shoppers */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/60 border border-amber-500/20">
            <div className="flex items-center gap-3">
              <ShopperEmptyCart delay={0} />
              <div className="text-left">
                <span className="text-[10px] font-mono text-amber-300 font-bold block">50,000+ Visitors / Mo</span>
                <span className="text-[9px] font-mono text-white/50 block">Search Intent Capture</span>
              </div>
            </div>
            
            {/* Animated Particle Beam */}
            <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full relative overflow-hidden shrink-0">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }} 
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-full bg-white rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Animated Downward Flow Arrow */}
        <div className="flex flex-col items-center justify-center gap-1 my-2">
          <div className="w-0.5 h-8 bg-gradient-to-b from-amber-500 to-emerald-500 rounded-full" />
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_#10b981]">
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        {/* ── MOBILE STEP 2: HIGH-CONVERTING SHOPIFY STORE ── */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-emerald-500/15 via-[#070b18] to-[#04060d] border border-emerald-500/30 backdrop-blur-xl shadow-2xl space-y-4 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Stage 02 • High-Converting Shopify Store
          </div>

          <h3 className="text-xl font-extrabold font-grotesk text-white leading-tight">
            Build Instant <span className="text-emerald-400">Buyer Trust</span> & Best UX
          </h3>
          <p className="text-xs text-white/70 leading-relaxed font-sans">
            We build buyer trust with SalePXL Shopify stores. Engineered with customer psychology, ultra-clean design, and well-optimized product pages to turn visitors into buyers.
          </p>

          {/* Realistic Mobile E-Commerce Storefront Card Mockup */}
          <div className="rounded-2xl bg-[#070b14] border-2 border-emerald-500/40 relative overflow-hidden space-y-2 font-sans">
            
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 py-1 px-3 text-center flex items-center justify-between text-[9px] font-bold text-black">
              <span>⚡ SALEPXL 2X CONVERSION STORE</span>
              <span className="bg-black/20 text-white font-mono px-1 rounded">COD ACTIVE</span>
            </div>

            <div className="p-3 space-y-2.5">
              {/* Product Info */}
              <div className="flex gap-2.5 items-center bg-white/[0.03] border border-white/10 rounded-xl p-2">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-900 to-slate-900 border border-emerald-500/30 flex flex-col items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <span className="text-[7px] font-mono font-bold text-emerald-300">40% OFF</span>
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-[9px] text-amber-400 font-mono">
                    <span>★★★★★</span>
                    <span className="text-white font-bold">4.9 Buyer Trust</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">Radiant Renewal Serum</h4>
                  <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
                    <Clock className="w-2.5 h-2.5" />
                    <span>Offer & Discount Positioned</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="text-xs font-extrabold text-white">₹1,499</span>
                    <span className="text-[9px] text-white/40 line-through">₹2,499</span>
                  </div>
                </div>
              </div>

              {/* High-Converting 1-Click Buy CTA */}
              <button className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-grotesk font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Zap className="w-3 h-3 fill-black" />
                <span>FASTER 1-CLICK CHECKOUT</span>
              </button>

              {/* Mobile CRO Psychology Badges Grid */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 flex items-center gap-1">
                  <span>⚡</span>
                  <span>2X Conversion PDP</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 flex items-center gap-1">
                  <span>🔒</span>
                  <span>Customer Psychology</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 flex items-center gap-1">
                  <span>🎯</span>
                  <span>Offer Positioning</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 flex items-center gap-1">
                  <span>🚀</span>
                  <span>Faster Checkout</span>
                </div>
              </div>
            </div>

            {/* Live Order Popup */}
            <div className="mx-2 mb-2 p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-1.5 text-[8px] font-mono text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="truncate">SalePXL Rebuild: +245% Conversion Lift</span>
            </div>
          </div>
        </div>

        {/* Animated Downward Flow Arrow */}
        <div className="flex flex-col items-center justify-center gap-1 my-2">
          <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500 to-indigo-500 rounded-full" />
          <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_10px_#6366f1]">
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        {/* ── MOBILE STEP 3: HIGH-CONVERTING STORE OUTPUT ── */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-indigo-500/15 via-[#070b18] to-[#04060d] border border-indigo-500/30 backdrop-blur-xl shadow-2xl space-y-4 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <span>Stage 03 • High-Converting Store Output</span>
          </div>

          <h3 className="text-xl font-extrabold font-grotesk text-white leading-tight">
            Your High-Converting Store <span className="text-indigo-400">Is Your Ultimate USP</span>
          </h3>
          <p className="text-xs text-white/70 leading-relaxed font-sans">
            With SalePXL conversion architecture, your high-converting Shopify store becomes your ultimate USP. Strategic product positioning turns visitor trust into rapid sales and higher AOV.
          </p>

          {/* Metric Banner: AOV Increased + 5 New Orders Confirmed */}
          <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 space-y-1.5 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-indigo-300 font-bold">📈 AOV INCREASED BY +42%</span>
              <span className="text-emerald-400 font-bold">5 NEW ORDERS CONFIRMED</span>
            </div>
            
            {/* 5 Live Confirmed Orders Mini List */}
            <div className="space-y-1 text-[9px]">
              <div className="p-1 rounded bg-white/[0.04] border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
                <span className="truncate">🎉 New Order Confirmed! ₹4,850 • Serum Bundle</span>
                <span className="text-white/40 text-[8px] shrink-0 ml-1">Just now</span>
              </div>
              <div className="p-1 rounded bg-white/[0.03] border border-white/10 text-emerald-300 flex items-center justify-between">
                <span className="truncate">🎉 New Order Confirmed! ₹3,200 • Silk Dress</span>
                <span className="text-white/40 text-[8px] shrink-0 ml-1">2m ago</span>
              </div>
              <div className="p-1 rounded bg-white/[0.03] border border-white/10 text-emerald-300 flex items-center justify-between">
                <span className="truncate">🎉 New Order Confirmed! ₹6,400 • Skincare Set</span>
                <span className="text-white/40 text-[8px] shrink-0 ml-1">5m ago</span>
              </div>
              <div className="p-1 rounded bg-white/[0.03] border border-white/10 text-emerald-300 flex items-center justify-between">
                <span className="truncate">🎉 New Order Confirmed! ₹2,750 • Cream Pack</span>
                <span className="text-white/40 text-[8px] shrink-0 ml-1">8m ago</span>
              </div>
              <div className="p-1 rounded bg-white/[0.03] border border-white/10 text-emerald-300 flex items-center justify-between">
                <span className="truncate">🎉 New Order Confirmed! ₹5,100 • Glow Kit</span>
                <span className="text-white/40 text-[8px] shrink-0 ml-1">12m ago</span>
              </div>
            </div>
          </div>

          {/* Delivery Handover & Full Cart */}
          <div className="flex items-center justify-around py-1">
            <DeliveryHandover />
            <ShopperFullCart delay={0} />
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-indigo-500/20 font-mono text-[10px]">
            <span className="text-indigo-300 font-bold">+245% CONVERSION LIFT</span>
            <span className="text-emerald-400 font-bold">HIGHER AOV CONFIRMED</span>
          </div>
        </div>

        {/* ── MOBILE FOOTER NOTE ── */}
        <div className="pt-2 text-center">
          <p className="text-xs font-grotesk text-white/80 font-light">
            Traffic brings visitors. <span className="text-emerald-400 font-normal">Your Shopify store earns customers.</span>
          </p>
        </div>

      </div>

    </section>
  );
}

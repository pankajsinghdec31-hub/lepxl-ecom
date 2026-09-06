"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { copyImages } from "./actions";
import {
  Check,
  Globe,
  Search,
  Layout,
  Calendar,
  Zap,
  CheckCircle2,
  ImageIcon,
  FileCheck,
  CreditCard,
  ArrowRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Video,
  MousePointerClick,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  Rocket,
  Sliders,
  Target
} from "lucide-react";

// Types
interface Step {
  id: string;
  num: string;
  title: string;
  headline: string;
  description: string;
  highlights?: string[];
  checklist?: string[];
  extraInfo?: string;
}

const STEPS: Step[] = [
  {
    id: "step-1",
    num: "01",
    title: "Brand & Product Understanding",
    headline: "Establishing Your Brand Foundation",
    description: "We deep-dive into your brand identity, target demographic, unique value proposition (UVP), and catalog requirements to establish a strong positioning foundation.",
    checklist: [
      "Brand Guidelines & Logo Assets",
      "Product Catalog & Pricing Matrix",
      "Target Audience & Buyer Persona",
      "Brand Colors & Typography Preference",
      "Social Media & Media Assets"
    ]
  },
  {
    id: "step-2",
    num: "02",
    title: "Competitor Research & Store Layout Strategy",
    headline: "Mapping a High-Converting Store Layout",
    description: "Our team analyzes top-performing competitors in your niche, identifies customer friction points, and maps out a high-converting store structure and wireframe."
  },
  {
    id: "step-3",
    num: "03",
    title: "Conversion-Focused Design & Custom Development",
    headline: "Designing & Building Your Storefront",
    description: "We design and develop custom Shopify Liquid sections, high-converting product pages, dynamic collection layouts, and mobile-optimized visual assets tailored to your brand."
  },
  {
    id: "step-4",
    num: "04",
    title: "CRO, Testing & Functionality",
    headline: "Optimizing Speed, Checkout & Customer Journey",
    description: "We integrate essential apps, payment gateways, automated shipping APIs, cart upsells, and 1-click checkouts, performing rigorous speed and conversion optimization."
  },
  {
    id: "step-5",
    num: "05",
    title: "Launch & Optimization Ready",
    headline: "Pre-Launch Audits & Analytics Setup",
    description: "We run full technical audits, verify Meta Pixel and tracking analytics, test checkout flows across devices, and prepare all assets for a seamless store handover.",
    checklist: [
      "28-Point Checkout Integrity Audit",
      "Meta Pixel & Conversion API Test",
      "Payment Gateway Live Transaction Test",
      "Logistics Sync with Shiprocket/Delhivery",
      "Domain DNS & SSL Certificate Verification"
    ]
  },
  {
    id: "step-6",
    num: "06",
    title: "Go Live",
    headline: "Taking Your Store Live 🚀",
    description: "Once everything is tested and approved, we take your store live and perform final checks to ensure the complete customer journey works smoothly."
  }
];

export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Automatically trigger copying photoshoot images when the page loads
  useEffect(() => {
    copyImages().then((res) => {
      console.log("Copy Images action result:", res);
    });
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({ target: isMounted ? containerRef : undefined });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Onboarding Checklist state
  const [onboardingChecked, setOnboardingChecked] = useState<Record<string, boolean>>({});
  const toggleOnboarding = (item: string) => {
    setOnboardingChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };
  const onboardingProgress = Math.round(
    ((STEPS[0].checklist?.filter((item) => onboardingChecked[item]).length || 0) /
      (STEPS[0].checklist?.length || 1)) *
      100
  );

  // Strategy tabs
  const [strategyTab, setStrategyTab] = useState("competitor");

  // Speed test simulation state
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [speedScore, setSpeedScore] = useState(65);

  // AI photo comparison slider position
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // Step 5 final confirmation state
  const [finalChecklist, setFinalChecklist] = useState<Record<string, boolean>>({});
  const toggleFinalChecklist = (item: string) => {
    setFinalChecklist((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  // Step 6 Integrations active state
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null);

  // Track active steps on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const stepElements = STEPS.map((step) => document.getElementById(step.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = stepElements.length - 1; i >= 0; i--) {
        const el = stepElements[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveStep(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      
      {/* Background decoration glow */}
      <div className="absolute top-[10%] right-[-15%] w-[600px] h-[600px] bg-emerald-400/[0.08] rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] bg-teal-300/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Sticky Progress Bar at the Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-12 relative z-10 w-full mb-8 sm:mb-16">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-3 sm:gap-5 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Our Shopify Store <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Build Process</span>
          </h1>
          <p className="text-neutral-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            From initial strategy to launch, every step is structured, transparent, and conversion-focused. You'll always know what we're building and what comes next.
          </p>
        </div>

        {/* Global Progress Steps Tracker */}
        <div className="max-w-3xl mx-auto w-full bg-white/80 border border-neutral-200/80 p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-500 font-mono mb-3 sm:mb-4 px-1">
            <span>YOUR JOURNEY PROGRESS</span>
            <span className="text-emerald-600 font-bold">{Math.round(((activeStep + 1) / STEPS.length) * 100)}% COMPLETE</span>
          </div>
          <div className="w-full h-2 bg-neutral-200/60 rounded-full overflow-hidden flex gap-0.5">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-full rounded-full transition-all duration-500 ${
                  idx <= activeStep ? "bg-emerald-500" : "bg-neutral-200"
                }`}
              />
            ))}
          </div>
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-[9px] sm:text-xs text-center text-neutral-400 font-sans">
            {STEPS.map((step, idx) => (
              <span key={step.id} className={activeStep >= idx ? "text-emerald-600 font-semibold truncate" : "truncate"}>
                {step.num}. {step.title.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Journey Container */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-start">
        
        {/* Left Side: Sticky Side Navigation Timeline */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-32 bg-white/70 border border-neutral-200/60 rounded-[24px] p-6 backdrop-blur-xl shadow-sm">
          <h3 className="text-xs font-bold font-mono tracking-widest text-neutral-400 mb-6 uppercase">Steps Tracker</h3>
          <div className="flex flex-col gap-3">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = activeStep > idx;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`group flex items-center gap-3 text-left py-2 px-3.5 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-emerald-50 text-emerald-700 font-bold" 
                      : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border transition-all ${
                    isActive
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : isPassed
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                      : "border-neutral-300 bg-white text-neutral-400"
                  }`}>
                    {isPassed ? <Check className="w-3 h-3" /> : step.num}
                  </span>
                  <span className="text-xs font-semibold tracking-wide truncate">{step.title}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Side: Step Contents */}
        <div className="lg:col-span-9 flex flex-col gap-8 sm:gap-20 relative">
          
          {/* Mobile Quick Steps Horizontal Selector */}
          <div className="flex lg:hidden sticky top-16 z-30 bg-white/95 backdrop-blur-md border-y border-neutral-200/80 -mx-4 px-4 py-2.5 overflow-x-auto no-scrollbar gap-2 shadow-sm mb-2">
            {STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold whitespace-nowrap shrink-0 transition-all ${
                  activeStep === idx
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {step.num}. {step.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Vertical Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-[39px] sm:left-12 top-10 bottom-10 w-[2px] bg-gradient-to-b from-emerald-500 via-emerald-400/30 to-indigo-400/10 pointer-events-none" />

          {STEPS.map((step, idx) => {
            const isStepActive = activeStep === idx;

            return (
              <div
                key={step.id}
                id={step.id}
                className="scroll-mt-36 relative flex flex-col lg:flex-row gap-4 lg:gap-8 group text-left"
              >
                {/* Milestone Node (Desktop Only) */}
                <div className="hidden lg:flex relative flex-col items-center">
                  <motion.div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center font-mono text-sm sm:text-base font-bold bg-white z-10 transition-all duration-500 ${
                      isStepActive
                        ? "border-emerald-500 text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-110"
                        : "border-neutral-200 text-neutral-300 bg-neutral-50"
                    }`}
                  >
                    {step.num}
                  </motion.div>
                </div>

                {/* Step Card Container */}
                <div className="flex-grow w-full">
                  <div className={`p-4.5 sm:p-8 rounded-2xl sm:rounded-[24px] bg-white/80 border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-500 backdrop-blur-xl ${
                    isStepActive 
                      ? "border-emerald-500/40 shadow-[0_4px_30px_rgba(16,185,129,0.04)]" 
                      : "opacity-80 lg:opacity-70 group-hover:opacity-100"
                  }`}>
                    
                    {/* Mobile Step Header Badge */}
                    <div className="flex lg:hidden items-center justify-between gap-2 mb-3 pb-2.5 border-b border-neutral-100">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                        STEP {step.num} / 06
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                        Phase {idx < 2 ? "1: Strategy" : idx < 4 ? "2: Design & CRO" : "3: Launch"}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-emerald-700 uppercase">
                      {step.title}
                    </span>
                    <h2 className="mt-1.5 sm:mt-2 text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 font-grotesk">
                      {step.headline}
                    </h2>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-base text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>



                    {/* Interactive Custom Elements per Step */}
                    <div className="mt-8 border-t border-neutral-200/60 pt-6">
                      
                      {/* Step 1: Brand Checklist */}
                      {idx === 0 && step.checklist && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs font-mono mb-2">
                            <span className="text-neutral-400 font-semibold">BRAND ONBOARDING CHECKLIST</span>
                            <span className="text-emerald-600 font-bold">{onboardingProgress}% READY</span>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-full h-1.5 bg-neutral-200/60 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-emerald-500"
                              animate={{ width: `${onboardingProgress}%` }}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {step.checklist.map((item, cIdx) => {
                              const isChecked = !!onboardingChecked[item];
                              return (
                                <button
                                  key={cIdx}
                                  onClick={() => toggleOnboarding(item)}
                                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 text-xs ${
                                    isChecked
                                      ? "bg-emerald-50/50 border-emerald-300 text-neutral-800"
                                      : "bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                                  }`}
                                >
                                  <span className={`w-4.5 h-4.5 rounded flex items-center justify-center border transition-all ${
                                    isChecked 
                                      ? "border-emerald-500 bg-emerald-500 text-white" 
                                      : "border-neutral-300"
                                  }`}>
                                    {isChecked && <Check className="w-3.5 h-3.5" />}
                                  </span>
                                  <span className="truncate font-medium">{item}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Step 2: Competitor Research & Strategy Cards */}
                      {idx === 1 && (
                        <div className="space-y-4">
                          <div className="flex gap-2 border-b border-neutral-200 pb-2">
                            <button
                              onClick={() => setStrategyTab("competitor")}
                              className={`text-xs font-bold pb-2 border-b-2 transition-all px-2 ${
                                strategyTab === "competitor" ? "border-emerald-500 text-emerald-600" : "border-transparent text-neutral-400"
                              }`}
                            >
                              Competitor Benchmarking
                            </button>
                            <button
                              onClick={() => setStrategyTab("wireframe")}
                              className={`text-xs font-bold pb-2 border-b-2 transition-all px-2 ${
                                strategyTab === "wireframe" ? "border-emerald-500 text-emerald-600" : "border-transparent text-neutral-400"
                              }`}
                            >
                              UX Wireframe Blueprint
                            </button>
                          </div>

                          {strategyTab === "competitor" ? (
                            <div className="grid grid-cols-3 gap-3">
                              <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-3 flex flex-col gap-2 shadow-sm text-center">
                                <div className="h-16 rounded-lg bg-white border border-neutral-200 flex items-center justify-center"><Search className="w-5 h-5 text-emerald-600" /></div>
                                <span className="text-[10px] font-bold text-neutral-800">Layout Benchmarks</span>
                              </div>
                              <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-3 flex flex-col gap-2 shadow-sm text-center">
                                <div className="h-16 rounded-lg bg-white border border-neutral-200 flex items-center justify-center"><Smartphone className="w-5 h-5 text-emerald-600" /></div>
                                <span className="text-[10px] font-bold text-neutral-800">Mobile Friction Audit</span>
                              </div>
                              <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-3 flex flex-col gap-2 shadow-sm text-center">
                                <div className="h-16 rounded-lg bg-white border border-neutral-200 flex items-center justify-center"><Target className="w-5 h-5 text-emerald-600" /></div>
                                <span className="text-[10px] font-bold text-neutral-800">CRO Strategy Map</span>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 flex flex-col gap-2 shadow-inner">
                              <div className="h-2 w-1/3 bg-neutral-200 rounded-full" />
                              <div className="h-4 w-full bg-white border border-neutral-200 rounded-md mt-1 shadow-sm" />
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="h-16 bg-white rounded-md border border-dashed border-neutral-300 flex items-center justify-center text-[10px] font-semibold text-neutral-400">High-Impact Hero Banner</div>
                                <div className="h-16 bg-white rounded-md border border-dashed border-neutral-300 flex items-center justify-center text-[10px] font-semibold text-neutral-400">Dynamic Collection Grid</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 3: Custom Development Laptop Preview */}
                      {idx === 2 && (
                        <div className="relative rounded-2xl border border-neutral-200 overflow-hidden bg-neutral-100 flex flex-col items-center p-6 shadow-inner">
                          <div className="w-full max-w-[320px] bg-neutral-200 rounded-t-xl p-1.5 flex items-center gap-1 border-x border-t border-neutral-300 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[8px] text-neutral-500 font-mono ml-2 select-none">storefront.salepxl.com/your-brand</span>
                          </div>
                          
                          {/* Preview container */}
                          <div className="w-full max-w-[320px] h-[150px] bg-white border-x border-b border-neutral-200 flex flex-col p-3 overflow-hidden gap-2 shadow-sm text-left">
                            <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                              <span className="text-[8px] font-bold text-neutral-800">YOUR BRAND</span>
                              <span className="text-[6px] text-emerald-600 font-bold">1-CLICK BUY</span>
                            </div>
                            <div className="h-14 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100 flex flex-col justify-center px-3 gap-1 shadow-sm">
                              <span className="text-[8px] font-bold text-neutral-800">BESPOKE SHOPIFY LIQUID SECTIONS</span>
                              <span className="text-[6px] text-neutral-500">Custom PDP layouts, sticky add-to-cart, and A+ visual branding.</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              <div className="h-10 bg-neutral-50 border border-neutral-100 rounded flex items-center justify-center text-[6px] text-neutral-400">PDP Layout</div>
                              <div className="h-10 bg-neutral-50 border border-neutral-100 rounded flex items-center justify-center text-[6px] text-neutral-400">Custom Liquid</div>
                              <div className="h-10 bg-neutral-50 border border-neutral-100 rounded flex items-center justify-center text-[6px] text-neutral-400">Visual Banner</div>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200/50 px-3.5 py-1.5 rounded-full font-mono font-bold select-none shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            DEVELOPMENT PREVIEW & STAGING ACTIVE
                          </div>
                        </div>
                      )}

                      {/* Step 4: Speed & CRO Optimization Simulator */}
                      {idx === 3 && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-neutral-200 bg-white p-5 flex flex-col gap-3 shadow-sm">
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-neutral-500">Speed & Conversion Audit</span>
                              <span className={`font-bold transition-colors ${speedScore >= 90 ? "text-emerald-600 animate-pulse" : "text-amber-500"}`}>{speedScore}/100</span>
                            </div>
                            
                            {/* Speed Bar indicator */}
                            <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden relative">
                              <motion.div
                                className={`h-full rounded-full transition-all duration-1000 ${speedScore >= 90 ? "bg-emerald-500" : "bg-amber-500"}`}
                                style={{ width: `${speedScore}%` }}
                              />
                            </div>

                            <button
                              onClick={() => {
                                setSpeedTestActive(true);
                                setSpeedScore(72);
                                setTimeout(() => setSpeedScore(85), 500);
                                setTimeout(() => setSpeedScore(99), 1000);
                              }}
                              disabled={speedTestActive && speedScore === 99}
                              className="w-full py-2.5 mt-1.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-xs font-bold text-neutral-700 transition-all hover:text-emerald-600 hover:border-emerald-200/50 shadow-sm cursor-pointer"
                            >
                              {speedScore === 99 ? "Speed & CRO Polish Maxed Out 🚀" : "Run Speed & CRO Optimization"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 5: Launch Verification Checklist */}
                      {idx === 4 && step.checklist && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono text-neutral-400 block font-semibold">PRE-LAUNCH TECHNICAL AUDIT STEPS</span>
                          <div className="space-y-2">
                            {step.checklist.map((item, cIdx) => {
                              const isChecked = !!finalChecklist[item];
                              return (
                                <button
                                  key={cIdx}
                                  onClick={() => toggleFinalChecklist(item)}
                                  className="w-full flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-left transition-all shadow-sm cursor-pointer"
                                >
                                  <span className={`text-xs font-medium ${isChecked ? "text-neutral-400 line-through" : "text-neutral-700"}`}>{item}</span>
                                  <span className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${
                                    isChecked ? "border-emerald-500 bg-emerald-500 text-white" : "border-neutral-300"
                                  }`}>
                                    {isChecked && <Check className="w-2.5 h-2.5" />}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Step 6: Go Live Node */}
                      {idx === 5 && (
                        <div className="relative rounded-2xl bg-white border border-neutral-200/60 p-6 flex flex-col items-center justify-center min-h-[180px] overflow-hidden shadow-inner text-center">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center font-bold text-xs mb-3 shadow-md">
                            <Rocket className="w-7 h-7" />
                          </div>
                          <h4 className="text-sm font-bold text-neutral-900 font-grotesk">Ready for Go Live</h4>
                          <p className="text-xs text-neutral-600 max-w-md mt-1 leading-relaxed font-sans">
                            Once everything is tested and approved, we take your store live and perform final checks to ensure the complete customer journey works smoothly.
                          </p>
                        </div>
                      )}

                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </section>

      {/* Bottom CTA Banner */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 mt-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-xl flex flex-col items-center gap-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 font-grotesk tracking-tight">
            Ready to Build Your <span className="text-emerald-600">High-Converting</span> Store?
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 max-w-lg font-sans leading-relaxed">
            Partner with SalePXL to design, build, and launch a Shopify store engineered for scaling revenue.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-[#22E39A] text-black font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
            >
              Start Your Project
            </Link>
            <a
              href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I%27m%20interested%20in%20building%20a%20high-converting%20Shopify%20store.%20Can%20we%20chat%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-neutral-900 border-2 border-neutral-900 font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-900 hover:text-white transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

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
  Image as ImageIcon,
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
  ArrowUpRight
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
    title: "Project Kickoff & Onboarding",
    headline: "Let's Get Started",
    description: "Once the project is confirmed, we'll collect everything needed to begin building your Shopify store.",
    checklist: [
      "New Gmail Account",
      "Gmail Password",
      "Business Name",
      "Contact Number",
      "Business Address",
      "UPI ID (Only if Shopify Plan needs to be purchased)",
      "GST Details (Optional)",
      "Brand Logo (If available, otherwise we will create)",
      "Brand Colors (If available, otherwise we will create)",
      "Social Media Links"
    ]
  },
  {
    id: "step-2",
    num: "02",
    title: "Domain Setup",
    headline: "Domain Configuration",
    description: "Already own a domain? Simply share the login credentials. If you don't have one, we'll purchase and configure the domain using the same Gmail account. Domain cost is separate unless agreed otherwise."
  },
  {
    id: "step-3",
    num: "03",
    title: "Research & Strategy",
    headline: "Planning Before Design",
    description: "Every successful Shopify store starts with proper research. Share your references, or our team will perform detailed competitor research, identify industry leaders, and structure your store using proven competitor layout designs in the same niche.",
    highlights: ["Competitor Layout Analysis", "Niche-Specific Layouts", "Proven Conversion Design", "UX Wireframe Board", "Store Structure Planning"]
  },
  {
    id: "step-4",
    num: "04",
    title: "Homepage Design & Development",
    headline: "Design & Build",
    description: "We begin designing your Shopify store using the approved strategy and wireframes. You'll receive a private preview link to monitor progress anytime.",
    highlights: ["Homepage", "Collection Pages", "Product Pages", "Mobile Responsive Design", "Premium Animations", "Shopify Development"]
  },
  {
    id: "step-5",
    num: "05",
    title: "First Review Meeting",
    headline: "Review Together",
    description: "Once the initial layout is complete, we'll schedule the first review meeting where you will review the complete store layout and provide feedback.",
    highlights: ["Design Review", "Feedback Collection", "Improvement Suggestions", "Priority Discussion"]
  },
  {
    id: "step-6",
    num: "06",
    title: "Refinement",
    headline: "Implement Improvements",
    description: "Our team carefully applies all approved changes while improving user experience, layout consistency, and conversion optimization.",
    highlights: ["UI Improvements", "UX Refinements", "Performance Optimization", "Final Adjustments"]
  },
  {
    id: "step-7",
    num: "07",
    title: "Second Review Meeting & Approval",
    headline: "Final Sign-Off",
    description: "We host a second meeting to finalize layouts, configure local checkout conditions, and confirm the complete design path.",
    highlights: ["Final Layout Check", "Local Checkout Toggles", "Checkout Flow Check", "Project Sign-off"]
  },
  {
    id: "step-8",
    num: "08",
    title: "Product Catalog Import",
    headline: "Setting Up Inventory & AI Photoshoots",
    description: "Time to populate your store. We'll import your items, set up dynamic variations, write smart copywriting sheets, and design custom upsell configurations. Plus, convert flat-lay apparel photos or mannequin snapshots into high-end studio model shoots with our advanced AI Photoshoot integration.",
    highlights: ["Product Upload", "Inventory Setup", "Variations Tuning", "Copywriting Polish", "AI Photoshoots (Before vs After)"]
  },
  {
    id: "step-9",
    num: "09",
    title: "Launch Verification List",
    headline: "Double-Checking Everything",
    description: "Before launching, we go through our 28-point checkout checklist ensuring speed optimization, payment integrations, and delivery hooks are active.",
    checklist: [
      "28-Point Checkout Integrity Check",
      "Google Analytics & GTM Triggers",
      "Meta Pixel Purchase Event Verification",
      "UPI & Cod Split Checkout Tests",
      "Logistics Sync with Shiprocket/Delhivery"
    ]
  },
  {
    id: "step-10",
    num: "10",
    title: "Transfer & Launch Live",
    headline: "Going Live 🚀",
    description: "We transfer ownership back to your own email, point your custom domain live, and hand over complete store access. Let the marketing campaigns begin!",
    highlights: ["Ownership Transfer", "Domain Mapping Live", "Live Order Tracking Test", "Full Admin Handover"]
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

  // Domain Config interactive state
  const [isDomainConnected, setIsDomainConnected] = useState(false);

  // Strategy tabs
  const [strategyTab, setStrategyTab] = useState("competitor");

  // Speed test simulation state
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [speedScore, setSpeedScore] = useState(65);

  // AI photo comparison slider position
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // Step 7 Approval Animation state
  const [stepSevenApproved, setStepSevenApproved] = useState(false);

  // Step 9 final confirmation state
  const [finalChecklist, setFinalChecklist] = useState<Record<string, boolean>>({});
  const toggleFinalChecklist = (item: string) => {
    setFinalChecklist((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  // Step 10 Integrations active state
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
            From onboarding to launch, every step is structured, transparent, and collaborative. You'll always know what we're working on and what comes next.
          </p>
        </div>

        {/* Global Progress Steps Tracker */}
        <div className="max-w-3xl mx-auto w-full bg-white/80 border border-neutral-200/80 p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-500 font-mono mb-3 sm:mb-4 px-1">
            <span>YOUR JOURNEY PROGRESS</span>
            <span className="text-emerald-600 font-bold">{Math.round((activeStep + 1) * 10)}% COMPLETE</span>
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
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-[9px] sm:text-xs text-center text-neutral-400 font-sans">
            <span className={activeStep >= 0 ? "text-emerald-600 font-semibold" : ""}>01. Onboarding</span>
            <span className={activeStep >= 2 ? "text-emerald-600 font-semibold" : ""}>03. Strategy</span>
            <span className={activeStep >= 4 ? "text-emerald-600 font-semibold" : ""}>05. Design</span>
            <span className={activeStep >= 7 ? "text-emerald-600 font-semibold" : ""}>08. Catalog</span>
            <span className={activeStep >= 9 ? "text-emerald-600 font-semibold" : ""}>10. Launch</span>
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
                        STEP {step.num} / 10
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                        Phase {idx < 3 ? "1: Planning" : idx < 7 ? "2: Build & Review" : "3: Launch"}
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

                    {/* Step Highlight Badges */}
                    {step.highlights && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {step.highlights.map((highlight, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200/50 text-emerald-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Interactive Custom Elements per Step */}
                    <div className="mt-8 border-t border-neutral-200/60 pt-6">
                      
                      {/* Step 1: Interactive Onboarding Checklist */}
                      {idx === 0 && step.checklist && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs font-mono mb-2">
                            <span className="text-neutral-400 font-semibold">ONBOARDING MATERIALS CHECKLIST</span>
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

                      {/* Step 2: Domain Setup Visualizer */}
                      {idx === 1 && (
                        <div className="relative rounded-2xl bg-white border border-neutral-200/60 p-6 flex flex-col items-center justify-center gap-6 overflow-hidden min-h-[160px] shadow-inner">
                          <div className="flex items-center gap-12 sm:gap-20 z-10">
                            
                            {/* Domain node */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-500 shadow-sm">
                                <Globe className="w-6 h-6" />
                              </div>
                              <span className="text-[10px] font-mono text-neutral-500 font-semibold uppercase">yourdomain.com</span>
                            </div>

                            {/* Center Beam Connector */}
                            <div className="relative w-12 sm:w-24 h-1 flex items-center justify-center">
                              <div className="absolute inset-0 bg-neutral-200/80 rounded-full" />
                              {isDomainConnected && (
                                <motion.div
                                  className="absolute left-0 w-2.5 h-2.5 rounded-full bg-emerald-500"
                                  animate={{ left: ["0%", "100%"] }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                />
                              )}
                            </div>

                            {/* Shopify node */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                                <span className="font-bold text-xs uppercase">Shopify</span>
                              </div>
                              <span className="text-[10px] font-mono text-neutral-500 font-semibold uppercase">SALEPXL DEV</span>
                            </div>

                          </div>

                          <button
                            onClick={() => setIsDomainConnected(!isDomainConnected)}
                            className="z-10 px-5 py-2.5 rounded-full border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-xs font-bold text-neutral-700 transition-all shadow-sm"
                          >
                            {isDomainConnected ? "Disconnect Connection" : "Simulate Connection Setup"}
                          </button>
                        </div>
                      )}

                      {/* Step 3: Wireframe / Research Interactive Cards */}
                      {idx === 2 && (
                        <div className="space-y-4">
                          <div className="flex gap-2 border-b border-neutral-200 pb-2">
                            <button
                              onClick={() => setStrategyTab("competitor")}
                              className={`text-xs font-bold pb-2 border-b-2 transition-all px-2 ${
                                strategyTab === "competitor" ? "border-emerald-500 text-emerald-600" : "border-transparent text-neutral-400"
                              }`}
                            >
                              Competitor Analysis
                            </button>
                            <button
                              onClick={() => setStrategyTab("wireframe")}
                              className={`text-xs font-bold pb-2 border-b-2 transition-all px-2 ${
                                strategyTab === "wireframe" ? "border-emerald-500 text-emerald-600" : "border-transparent text-neutral-400"
                              }`}
                            >
                              UX Wireframe Board
                            </button>
                          </div>

                          {strategyTab === "competitor" ? (
                            <div className="grid grid-cols-3 gap-3">
                              <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-3 flex flex-col gap-2 shadow-sm text-center">
                                <div className="h-16 rounded-lg bg-white border border-neutral-200 flex items-center justify-center"><Search className="w-5 h-5 text-neutral-400" /></div>
                                <span className="text-[10px] font-bold text-neutral-800">Keyword Analysis</span>
                              </div>
                              <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-3 flex flex-col gap-2 shadow-sm text-center">
                                <div className="h-16 rounded-lg bg-white border border-neutral-200 flex items-center justify-center"><Smartphone className="w-5 h-5 text-neutral-400" /></div>
                                <span className="text-[10px] font-bold text-neutral-800">UI Benchmarking</span>
                              </div>
                              <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-3 flex flex-col gap-2 shadow-sm text-center">
                                <div className="h-16 rounded-lg bg-white border border-neutral-200 flex items-center justify-center"><Zap className="w-5 h-5 text-neutral-400" /></div>
                                <span className="text-[10px] font-bold text-neutral-800">Speed Optimization</span>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 flex flex-col gap-2 shadow-inner">
                              <div className="h-2 w-1/3 bg-neutral-200 rounded-full" />
                              <div className="h-4 w-full bg-white border border-neutral-200 rounded-md mt-1 shadow-sm" />
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="h-16 bg-white rounded-md border border-dashed border-neutral-300 flex items-center justify-center text-[10px] font-semibold text-neutral-400">Hero Slider</div>
                                <div className="h-16 bg-white rounded-md border border-dashed border-neutral-300 flex items-center justify-center text-[10px] font-semibold text-neutral-400">Featured Grid</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 4: Homepage & Dev Laptop Mockup */}
                      {idx === 3 && (
                        <div className="relative rounded-2xl border border-neutral-200 overflow-hidden bg-neutral-100 flex flex-col items-center p-6 shadow-inner">
                          <div className="w-full max-w-[280px] bg-neutral-200 rounded-t-xl p-1.5 flex items-center gap-1 border-x border-t border-neutral-300 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[8px] text-neutral-500 font-mono ml-2 select-none">preview.salepxl.com/your-store</span>
                          </div>
                          
                          {/* Live preview container */}
                          <div className="w-full max-w-[280px] h-[140px] bg-white border-x border-b border-neutral-200 flex flex-col p-3 overflow-hidden gap-2 shadow-sm text-left">
                            <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                              <span className="text-[8px] font-bold text-neutral-800">YOUR BRAND</span>
                              <span className="text-[6px] text-neutral-400">CART (0)</span>
                            </div>
                            <div className="h-12 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-col justify-center px-3 gap-1 shadow-sm">
                              <span className="text-[8px] font-bold text-neutral-800">CRAFTING BOLD RETAIL STORES</span>
                              <span className="text-[5px] text-neutral-500">Traffic comes from anywhere, but trust comes from your store.</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              <div className="h-10 bg-neutral-50 border border-neutral-100 rounded" />
                              <div className="h-10 bg-neutral-50 border border-neutral-100 rounded" />
                              <div className="h-10 bg-neutral-50 border border-neutral-100 rounded" />
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200/50 px-3.5 py-1.5 rounded-full font-mono font-bold select-none shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            LIVE DEVELOPMENT LINK AVAILABLE
                          </div>
                        </div>
                      )}

                      {/* Step 5: Review Meeting illustration */}
                      {idx === 4 && (
                        <div className="rounded-2xl border border-neutral-200 bg-white p-4 flex gap-4 items-center shadow-sm">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-500 shrink-0">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-neutral-800">First Review Video Call</span>
                            <p className="text-[10px] text-neutral-500 mt-0.5 leading-relaxed">We hop on a screen-share session to review layouts, interactions, checkout details, and compile live revisions.</p>
                          </div>
                        </div>
                      )}

                      {/* Step 6: Refinement & Speed Simulation */}
                      {idx === 5 && (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-neutral-200 bg-white p-5 flex flex-col gap-3 shadow-sm">
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-neutral-500">Lighthouse Performance Test</span>
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
                              className="w-full py-2.5 mt-1.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-xs font-bold text-neutral-700 transition-all hover:text-emerald-600 hover:border-emerald-200/50 shadow-sm"
                            >
                              {speedScore === 99 ? "Optimization Maxed Out 🚀" : "Run Optimization Polish"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 7: Approval Checkmark Toggle */}
                      {idx === 6 && (
                        <div className="flex items-center justify-center p-4">
                          <button
                            onClick={() => setStepSevenApproved(!stepSevenApproved)}
                            className={`w-full max-w-[260px] py-3.5 rounded-2xl border flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                              stepSevenApproved
                                ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                                : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                            }`}
                          >
                            <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center border transition-all ${
                              stepSevenApproved ? "bg-white text-emerald-600 border-white" : "border-neutral-300"
                            }`}>
                              {stepSevenApproved && <Check className="w-3 h-3" />}
                            </span>
                            {stepSevenApproved ? "Approved & Ready" : "Click to Approve Phase"}
                          </button>
                        </div>
                      )}

                      {/* Step 8: AI Product Shoot Slider Comparison */}
                      {idx === 7 && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-neutral-500 font-semibold">AI PHOTOSHOOT (BEFORE VS AFTER)</span>
                            <span className="text-[10px] text-neutral-400">Drag the slider or click anywhere to compare</span>
                          </div>

                          <div
                            className="relative w-full max-w-[450px] mx-auto aspect-square rounded-2xl overflow-hidden border border-neutral-200 select-none cursor-ew-resize bg-neutral-100 shadow-md group"
                            onMouseMove={(e) => {
                              if (!isDraggingSlider) return;
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                              setSliderPosition(percentage);
                            }}
                            onTouchMove={(e) => {
                              if (!isDraggingSlider || !e.touches[0]) return;
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.touches[0].clientX - rect.left;
                              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                              setSliderPosition(percentage);
                            }}
                            onMouseDown={() => setIsDraggingSlider(true)}
                            onTouchStart={() => setIsDraggingSlider(true)}
                            onMouseUp={() => setIsDraggingSlider(false)}
                            onTouchEnd={() => setIsDraggingSlider(false)}
                            onMouseLeave={() => setIsDraggingSlider(false)}
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                              setSliderPosition(percentage);
                            }}
                          >
                            {/* After Image (AI Studio Model Shot) - Background */}
                            <Image
                              src="/photoshoot_after.jpg"
                              alt="AI Studio Photoshoot After"
                              fill
                              sizes="(max-width: 768px) 100vw, 450px"
                              priority
                              className="object-contain object-center select-none pointer-events-none"
                            />

                            {/* Before Image (Flat Product / Amateur snap) - Clips via percentage */}
                            <div
                              className="absolute inset-y-0 left-0 right-0 z-10 overflow-hidden"
                              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                            >
                              <Image
                                src="/photoshoot_before.jpg"
                                alt="Plain Snap Before AI Photoshoot"
                                fill
                                sizes="(max-width: 768px) 100vw, 450px"
                                priority
                                className="object-contain object-center select-none pointer-events-none"
                              />
                            </div>

                            {/* Sliding Handle Line & Circle */}
                            <div
                              className="absolute inset-y-0 z-20 pointer-events-none"
                              style={{ left: `${sliderPosition}%` }}
                            >
                              <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                              <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 rounded-full bg-white border-2 border-emerald-500 shadow-xl flex items-center justify-center text-emerald-600 transition-transform duration-200 group-hover:scale-110 pointer-events-auto cursor-ew-resize">
                                <span className="text-[10px] font-bold select-none">◀ ▶</span>
                              </div>
                            </div>

                            {/* Floating text labels */}
                            <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm border border-white/10 px-3.5 py-1.5 rounded-full text-[9px] font-mono font-bold text-white z-20 shadow-md">
                              BEFORE (SNAP)
                            </div>
                            <div className="absolute bottom-4 right-4 bg-emerald-600/90 backdrop-blur-sm border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-[9px] font-mono font-bold text-white z-20 shadow-md flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-300 animate-pulse" />
                              AFTER (AI PHOTOSHOOT)
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 9: Launch Checklist verification */}
                      {idx === 8 && step.checklist && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono text-neutral-400 block font-semibold">TECHNICAL VERIFICATION STEPS</span>
                          <div className="space-y-2">
                            {step.checklist.map((item, cIdx) => {
                              const isChecked = !!finalChecklist[item];
                              return (
                                <button
                                  key={cIdx}
                                  onClick={() => toggleFinalChecklist(item)}
                                  className="w-full flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-left transition-all shadow-sm"
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

                      {/* Step 10: Integrations nodes */}
                      {idx === 9 && (
                        <div className="relative rounded-2xl bg-white border border-neutral-200/60 p-6 flex flex-col items-center justify-center min-h-[180px] overflow-hidden shadow-inner">
                          
                          {/* Inner nodes */}
                          <div className="relative w-full max-w-[340px] h-[100px] flex items-center justify-center">
                            
                            {/* Shopify Core Node */}
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 flex items-center justify-center font-bold text-xs z-20 shadow-md shadow-emerald-500/5 select-none">
                              Shopify
                            </div>

                            {/* Node 1: Payment Gateways */}
                            <div
                              onMouseEnter={() => setHoveredIntegration("payment")}
                              onMouseLeave={() => setHoveredIntegration(null)}
                              className="absolute top-0 left-4 w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-emerald-500 flex items-center justify-center text-neutral-400 hover:text-emerald-600 transition-all z-10 cursor-pointer shadow-sm"
                              title="Razorpay, Stripe Gateways"
                            >
                              <CreditCard className="w-4.5 h-4.5" />
                            </div>

                            {/* Node 2: Shipping Carriers */}
                            <div
                              onMouseEnter={() => setHoveredIntegration("shipping")}
                              onMouseLeave={() => setHoveredIntegration(null)}
                              className="absolute bottom-0 left-4 w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-emerald-500 flex items-center justify-center text-neutral-400 hover:text-emerald-600 transition-all z-10 cursor-pointer shadow-sm"
                              title="Automated Logistics"
                            >
                              <Zap className="w-4.5 h-4.5" />
                            </div>

                            {/* Node 3: Analytics / GA4 */}
                            <div
                              onMouseEnter={() => setHoveredIntegration("analytics")}
                              onMouseLeave={() => setHoveredIntegration(null)}
                              className="absolute top-0 right-4 w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-emerald-500 flex items-center justify-center text-neutral-400 hover:text-emerald-600 transition-all z-10 cursor-pointer shadow-sm"
                              title="Google Analytics, Pixel"
                            >
                              <TrendingUp className="w-4.5 h-4.5" />
                            </div>

                            {/* Node 4: Domain Connection */}
                            <div
                              onMouseEnter={() => setHoveredIntegration("domain")}
                              onMouseLeave={() => setHoveredIntegration(null)}
                              className="absolute bottom-0 right-4 w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-emerald-500 flex items-center justify-center text-neutral-400 hover:text-emerald-600 transition-all z-10 cursor-pointer shadow-sm"
                              title="Domains setup live"
                            >
                              <Globe className="w-4.5 h-4.5" />
                            </div>

                          </div>

                          <div className="mt-4 text-[10px] text-center text-neutral-400 font-mono h-4 uppercase font-semibold">
                            {hoveredIntegration === "payment" && "Razorpay & Stripe integration configured"}
                            {hoveredIntegration === "shipping" && "Logistics Carrier setups active"}
                            {hoveredIntegration === "analytics" && "Google Tag Manager & Meta Pixel Active"}
                            {hoveredIntegration === "domain" && "Custom Domain pointing live"}
                            {!hoveredIntegration && "Hover nodes to inspect integrations"}
                          </div>

                        </div>
                      )}

                    </div>

                    {/* Mobile Next Step Quick Action Button */}
                    {idx < STEPS.length - 1 && (
                      <div className="mt-5 pt-3.5 border-t border-neutral-100 flex lg:hidden items-center justify-between">
                        <span className="text-[10px] font-mono text-neutral-400 font-medium">Step {idx + 1} of 10</span>
                        <button
                          onClick={() => {
                            document.getElementById(STEPS[idx + 1].id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] font-bold transition-all shadow-sm active:scale-95"
                        >
                          <span>Next: {STEPS[idx + 1].num}. {STEPS[idx + 1].title.split(" ")[0]}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* Final Section: Celebrate Launch */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-32 md:mt-48 pt-16 border-t border-neutral-200">
        
        {/* Success animation backdrop */}
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[350px] h-[350px] bg-emerald-500/[0.03] rounded-full blur-[80px] pointer-events-none" />



        <h2 className="mt-8 text-3xl sm:text-5xl font-light tracking-tight font-grotesk leading-tight text-neutral-900">
          Your Shopify Store is <br />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Ready to Scale</span>
        </h2>

        {/* Success Metrics list */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
          {[
            "Store Live",
            "Mobile Optimized",
            "Payment Gateway Active",
            "Shipping Configured",
            "SEO Ready",
            "Analytics Connected",
            "Ready for Marketing",
            "Ready to Generate Sales"
          ].map((metric, mIdx) => (
            <div
              key={mIdx}
              className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-col items-center justify-center gap-2.5 hover:border-emerald-500/30 transition-all duration-300 shadow-sm"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-neutral-700">{metric}</span>
            </div>
          ))}
        </div>

        {/* Call to actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-14 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 transition-all shadow-md gap-2 group"
          >
            <span>Start Your Shopify Project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="https://wa.me/919917780656"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-14 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-700 border border-neutral-200 bg-white hover:bg-neutral-50 transition-all gap-1.5 shadow-sm"
          >
            <span>Book a Discovery Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

    </div>
  );
}

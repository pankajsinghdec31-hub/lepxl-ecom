"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Percent,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  Layers,
  Sparkle,
  DollarSign,
  Users,
  ShoppingBag,
  Globe,
  Settings,
  ShieldCheck,
  Zap,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configurations
const DEFAULT_CPC = 15; // Benchmark CPC in INR
const TARGET_CONVERSION_RATE = 3.2; // SalePXL standard CRO target conversion rate (%)

interface ChecklistItem {
  id: string;
  label: string;
  impact: number; // impact on conversion rate relative multiplier
  scoreImpact: number; // score addition
  checked: boolean;
}

export default function ShopifyAuditPage() {
  // STEP 1 Inputs
  const [storeUrl, setStoreUrl] = useState("");
  const [adSpend, setAdSpend] = useState(100000);
  const [revenue, setRevenue] = useState(220000);
  const [roas, setRoas] = useState(2.2);
  const [convRate, setConvRate] = useState(1.4);
  const [aov, setAov] = useState(2000);
  const [trafficSource, setTrafficSource] = useState("Meta Ads");

  // Lead Form Inputs
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Interactive Checklist (toggles CRO parameters)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "speed", label: "Speed Optimization", impact: 0.25, scoreImpact: 15, checked: false },
    { id: "mobile", label: "Mobile Optimization", impact: 0.2, scoreImpact: 12, checked: false },
    { id: "checkout", label: "Fast & Frictionless Checkout", impact: 0.25, scoreImpact: 15, checked: true },
    { id: "product", label: "Product Page Optimization", impact: 0.3, scoreImpact: 18, checked: false },
    { id: "trust", label: "Trust Badges & Security Indicators", impact: 0.15, scoreImpact: 8, checked: false },
    { id: "sticky", label: "Sticky Add To Cart", impact: 0.1, scoreImpact: 6, checked: false },
    { id: "reviews", label: "Social Proof & Reviews Integration", impact: 0.15, scoreImpact: 9, checked: false },
    { id: "bundles", label: "Volume Discounts & Bundles", impact: 0.12, scoreImpact: 7, checked: false },
    { id: "upsells", label: "Cart Drawer & Post-Purchase Upsells", impact: 0.18, scoreImpact: 10, checked: false },
  ]);

  // Adjust AOV, ROAS, and Revenue triggers
  // Let user check/uncheck to instantly update metrics
  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // Calculations
  const currentCR = convRate;
  
  // Calculate visitors based on revenue, AOV, and CR
  // visitors = Revenue / (AOV * (CR/100))
  const estimatedVisitors = Math.round(
    currentCR > 0 ? revenue / (aov * (currentCR / 100)) : revenue / aov / 0.014
  );
  
  const estimatedPurchases = Math.round(revenue / aov);

  // SalePXL Optimized Store Projections:
  // Base potential conversion rate is standard TARGET_CONVERSION_RATE (3.2%)
  // If their current conversion rate is higher, we scale it.
  // We can calculate the potential conversion rate by reviewing the unchecked items
  // If the user fixes unchecked items, their conversion rate increases.
  const uncheckedImpact = checklist
    .filter(item => !item.checked)
    .reduce((sum, item) => sum + item.impact, 0);

  // Potential Conversion Rate is current CR boosted by the missing CRO features impact
  // Limit optimized conversion rate between 2.8% and 5.0%
  const optimizedCR = Number(Math.min(5.0, Math.max(2.8, currentCR * (1 + uncheckedImpact))).toFixed(2));
  
  // Projected Revenue = visitors * (optimizedCR / 100) * aov
  const optimizedRevenue = Math.round(estimatedVisitors * (optimizedCR / 100) * aov);
  
  // Projected ROAS = Optimized Revenue / Ad Spend
  const optimizedRoas = Number((adSpend > 0 ? optimizedRevenue / adSpend : 0).toFixed(2));

  // Revenue Leakage
  const revenueLeakage = Math.max(0, optimizedRevenue - revenue);
  const revenueIncreasePercent = revenue > 0 ? Math.round(((optimizedRevenue - revenue) / revenue) * 100) : 0;

  // CRO Scores calculation based on checked items
  // Base scores start low and increase with checked items
  const speedChecked = checklist.find(i => i.id === "speed")?.checked;
  const mobileChecked = checklist.find(i => i.id === "mobile")?.checked;
  const checkoutChecked = checklist.find(i => i.id === "checkout")?.checked;
  const trustChecked = checklist.find(i => i.id === "trust")?.checked;
  const productChecked = checklist.find(i => i.id === "product")?.checked;
  const reviewsChecked = checklist.find(i => i.id === "reviews")?.checked;

  const speedScore = speedChecked ? 94 : 58;
  const mobileScore = mobileChecked ? 92 : 72;
  const checkoutScore = checkoutChecked ? 90 : 54;
  const trustScore = trustChecked ? 88 : 55;
  const uxScore = productChecked ? 91 : 62;
  
  // Overall score sum
  const checkedScoreAddition = checklist
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.scoreImpact, 0);
  // Base score out of 100 is 10 + checked additions (capped at 98, min 35)
  const overallCROScore = Math.min(98, Math.max(35, 10 + checkedScoreAddition));

  // Determine overall recommendation
  const getRecommendation = () => {
    if (overallCROScore < 50) return { text: "CRITICAL CRO FIXES NEEDED", color: "text-red-500 bg-red-500/10 border-red-500/20" };
    if (overallCROScore < 75) return { text: "NEEDS CRO OPTIMIZATION", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    return { text: "HIGHLY OPTIMIZED STORE", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
  };

  const recommendation = getRecommendation();

  // Helper to format currency in Indian format
  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  // Handle lead submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmail && contactPhone) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#D7D7D7] pb-24 overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[500px] rounded-full bg-[#00AF56]/8 blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[45%] h-[600px] rounded-full bg-indigo-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[500px] rounded-full bg-[#00AF56]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Breadcrumbs & Intro */}
        <div className="flex flex-col gap-4 pt-12 pb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00AF56]/10 border border-[#00AF56]/20 w-max mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#00AF56] animate-pulse" />
            <span className="text-[10px] text-[#00AF56] font-mono uppercase tracking-wider font-bold">
              Shopify Revenue Audit Tool
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Free Shopify <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00AF56]">
              Growth Audit
            </span>
          </h1>

          <p className="text-[#8C8C8C] text-base leading-relaxed">
            Stop losing sales to slow loading speeds and friction-filled customer experiences. Drop your current metrics below to visualize your revenue leaks and unlock your scaling roadmap.
          </p>
        </div>

        {/* MAIN SaaS CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT SIDE PANEL: CONFIGURATOR FORM */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00AF56]/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00AF56]" />
                Store Metrics Setup
              </h2>
              <span className="text-[10px] text-[#8C8C8C] font-mono bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">
                Live Calculation
              </span>
            </div>

            {/* Input 1: Store URL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#8C8C8C] font-semibold" htmlFor="store-url">
                Shopify Store Domain
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-white/30">https://</span>
                <input
                  id="store-url"
                  type="text"
                  placeholder="yourstore.com"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  className="w-full bg-black/60 border border-white/[0.08] text-white text-sm rounded-xl pl-[70px] pr-4 py-3 focus:outline-none focus:border-[#00AF56] transition-colors font-mono"
                />
              </div>
            </div>

            {/* Input 2: Traffic Source Selectors */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-[#8C8C8C] font-semibold">Primary Traffic Channel</span>
              <div className="grid grid-cols-2 gap-2">
                {["Meta Ads", "Google Ads", "TikTok", "Organic"].map(source => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => setTrafficSource(source)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                      trafficSource === source
                        ? "bg-[#00AF56]/15 border-[#00AF56] text-[#00AF56] shadow-[0_0_15px_rgba(0,175,86,0.1)]"
                        : "bg-black/30 border-white/[0.06] text-[#8C8C8C] hover:text-white hover:border-white/10"
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Monthly Ad Spend */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C8C8C] font-semibold">Monthly Ad Spend</span>
                <span className="text-white font-mono font-bold bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-lg text-xs">
                  {formatCurrency(adSpend)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00AF56]"
              />
              <div className="flex justify-between text-[9px] text-[#8C8C8C] font-mono">
                <span>₹10K</span>
                <span>₹5L</span>
                <span>₹10L+</span>
              </div>
            </div>

            {/* Input 4: Monthly Revenue */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C8C8C] font-semibold">Monthly Store Revenue</span>
                <span className="text-white font-mono font-bold bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-lg text-xs">
                  {formatCurrency(revenue)}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="2500000"
                step="20000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00AF56]"
              />
              <div className="flex justify-between text-[9px] text-[#8C8C8C] font-mono">
                <span>₹20K</span>
                <span>₹12.5L</span>
                <span>₹25L+</span>
              </div>
            </div>

            {/* Input 5: Current ROAS */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C8C8C] font-semibold">Current Ad Account ROAS</span>
                <span className="text-white font-mono font-bold bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-lg text-xs">
                  {roas}x
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={roas}
                onChange={(e) => setRoas(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00AF56]"
              />
              <div className="flex justify-between text-[9px] text-[#8C8C8C] font-mono">
                <span>0.5x</span>
                <span>3.0x (Target)</span>
                <span>6.0x</span>
              </div>
            </div>

            {/* Input 6: Conversion Rate */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C8C8C] font-semibold">Current Conversion Rate (%)</span>
                <span className="text-white font-mono font-bold bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-lg text-xs">
                  {convRate}%
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={convRate}
                onChange={(e) => setConvRate(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00AF56]"
              />
              <div className="flex justify-between text-[9px] text-[#8C8C8C] font-mono">
                <span>0.2%</span>
                <span>2.0%</span>
                <span>4.0%+</span>
              </div>
            </div>

            {/* Input 7: Average Order Value */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C8C8C] font-semibold">Average Order Value (AOV)</span>
                <span className="text-white font-mono font-bold bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-lg text-xs">
                  ₹{aov.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="8000"
                step="100"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00AF56]"
              />
              <div className="flex justify-between text-[9px] text-[#8C8C8C] font-mono">
                <span>₹500</span>
                <span>₹4,000</span>
                <span>₹8,000</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE PANEL: LIVE ANALYSIS DASHBOARD */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* ROAS WARNING CARD IF ROAS < 3.0 */}
            {roas < 3.0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 flex gap-4 items-start"
              >
                <div className="p-2 rounded-xl bg-red-500/10 text-red-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    ⚠️ Your Store Is Leaking Revenue
                  </h3>
                  <p className="text-xs text-red-200/80 leading-relaxed">
                    You're spending money to buy traffic, but your Shopify store isn't converting enough visitors. Most brands focus on increasing ad spend. We focus on increasing conversion rate first.
                  </p>
                </div>
              </motion.div>
            )}

            {/* VISITATION & CONVERSION GENERAL STATS ROW */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#181818] border border-white/[0.05] flex flex-col gap-1 text-left">
                <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Monthly Visitors</span>
                <span className="text-lg font-bold font-mono text-white mt-1">
                  {estimatedVisitors.toLocaleString("en-IN")}
                </span>
                <span className="text-[9px] text-[#8C8C8C] mt-0.5">Estimated</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#181818] border border-white/[0.05] flex flex-col gap-1 text-left">
                <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Monthly Orders</span>
                <span className="text-lg font-bold font-mono text-white mt-1">
                  {estimatedPurchases.toLocaleString("en-IN")}
                </span>
                <span className="text-[9px] text-[#8C8C8C] mt-0.5">Actual Orders</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#181818] border border-white/[0.05] flex flex-col gap-1 text-left">
                <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Current CR</span>
                <span className="text-lg font-bold font-mono text-[#00AF56] mt-1">
                  {currentCR}%
                </span>
                <span className="text-[9px] text-[#8C8C8C] mt-0.5">Store Conversion</span>
              </div>
            </div>

            {/* PERFORMANCE PROJECTIONS CARD: CURRENT VS OPTIMIZED */}
            <div className="p-6 rounded-3xl bg-[#181818] border border-white/[0.06] text-left flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00AF56]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.04]">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">Audit Forecast</span>
                  <h3 className="text-lg font-bold text-white">Performance Lift Projection</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#00AF56]/15 border border-[#00AF56]/30 text-[#00AF56] text-[10px] font-bold font-mono uppercase tracking-wider">
                  +{revenueIncreasePercent}% Revenue Lift
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Column 1: Current */}
                <div className="flex flex-col gap-4 p-4 rounded-2xl bg-black/40 border border-white/[0.03]">
                  <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-bold">Current Metrics</span>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Ad Spend</span>
                      <span className="font-mono text-white">{formatCurrency(adSpend)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">ROAS</span>
                      <span className="font-mono text-white">{roas}x</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Monthly Revenue</span>
                      <span className="font-mono text-white">{formatCurrency(revenue)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Conversion Rate</span>
                      <span className="font-mono text-red-400 font-bold">{currentCR}%</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Projected */}
                <div className="flex flex-col gap-4 p-4 rounded-2xl bg-[#00AF56]/5 border border-[#00AF56]/15 relative">
                  <span className="text-[10px] text-[#00AF56] uppercase tracking-wider font-bold">Projected (SalePXL CRO)</span>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Ad Spend</span>
                      <span className="font-mono text-white">{formatCurrency(adSpend)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">ROAS</span>
                      <span className="font-mono text-[#00AF56] font-bold">{optimizedRoas}x</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Monthly Revenue</span>
                      <span className="font-mono text-[#00AF56] font-bold">{formatCurrency(optimizedRevenue)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8C8C8C]">Conversion Rate</span>
                      <span className="font-mono text-[#00AF56] font-bold">{optimizedCR}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#8C8C8C] leading-relaxed pt-2 border-t border-white/[0.04]">
                💡 **Insight:** You can scale your revenue to **{formatCurrency(optimizedRevenue)}** without increasing your monthly ad spend by simply fixing your website's conversion bottlenecks.
              </div>
            </div>

            {/* REVENUE LEAKAGE SPECIFICATION CARD */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1c1212] to-[#120a0a] border border-red-500/10 text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
              
              {/* Leaking bucket animation (Left/Top) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-black/40 rounded-2xl border border-white/[0.03] min-h-[160px]">
                
                {/* SVG Animated Leaking Bucket */}
                <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                  <svg className="w-16 h-16 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Bucket Handle */}
                    <path d="M12 2v4M4 8h16M5 8h14l-1.5 12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2L5 8Z" />
                    {/* Leaking holes/drips */}
                    <path d="M9 22v2M12 22v3M15 22v2" className="stroke-red-500/50" />
                  </svg>
                  {/* Animating money drops */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[-16px] w-full flex justify-center gap-1.5">
                    {[1, 2, 3].map((coin) => (
                      <motion.div
                        key={coin}
                        initial={{ y: -5, opacity: 1, scale: 0.9 }}
                        animate={{ y: 25, opacity: 0, scale: 0.7 }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: coin * 0.4,
                          ease: "easeIn"
                        }}
                        className="w-2.5 h-2.5 rounded-full bg-amber-500 flex items-center justify-center text-[6px] text-black font-extrabold shadow-sm"
                      >
                        ₹
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-mono text-center mt-2 font-bold">
                  Active Revenue Leak
                </div>
              </div>

              {/* Leakage Text (Right/Bottom) */}
              <div className="md:col-span-7 flex flex-col gap-3">
                <span className="text-[10px] text-red-400 font-mono uppercase tracking-widest font-bold">
                  Revenue Leakage Analysis
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                  You're Losing Approximately <br className="hidden sm:inline" />
                  <span className="text-red-500 font-mono">{formatCurrency(revenueLeakage)}</span> Every Month
                </h3>

                <p className="text-xs text-[#8C8C8C] leading-relaxed">
                  Due to conversion gaps: **slow page speeds**, **poor mobile layouts**, **weak product copy**, and **friction-heavy checkout funnels**.
                </p>

                {/* Micro Progress Bars */}
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[9px] text-[#8C8C8C] font-mono">
                      <span>Lost Revenue ({Math.round((revenueLeakage / optimizedRevenue) * 100) || 0}%)</span>
                      <span className="text-red-400 font-bold">{formatCurrency(revenueLeakage)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(revenueLeakage / optimizedRevenue) * 100 || 0}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI SCORE CARD */}
            <div className="p-6 rounded-3xl bg-[#181818] border border-white/[0.06] text-left">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.04] mb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">CRO Health Score</span>
                  <h3 className="text-base font-bold text-white">Interactive Breakdown</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#8C8C8C] font-mono font-bold">OVERALL</span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded border uppercase font-mono mt-0.5 ${recommendation.color}`}>
                      {recommendation.text}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white/[0.08] flex items-center justify-center bg-black/40">
                    <span className="text-sm font-bold font-mono text-white">{overallCROScore}</span>
                  </div>
                </div>
              </div>

              {/* Score grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: "Store Performance", score: overallCROScore },
                  { name: "Trust Score", score: trustScore },
                  { name: "UX Score", score: uxScore },
                  { name: "Mobile Experience", score: mobileScore },
                  { name: "Checkout Score", score: checkoutScore },
                  { name: "Speed Score", score: speedScore }
                ].map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/30 border border-white/[0.04] flex flex-col justify-between min-h-[90px]">
                    <span className="text-[10px] text-[#8C8C8C] font-medium leading-tight">{s.name}</span>
                    <div className="flex items-end justify-between mt-2">
                      <span className="text-xl font-bold font-mono text-white">{s.score}<span className="text-[10px] text-white/30 font-normal">/100</span></span>
                      <div className="w-6 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.score >= 80 ? "bg-emerald-500" : s.score >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CHECKLIST TOGGLES: RED & GREEN INDICATORS */}
            <div className="p-6 rounded-3xl bg-[#181818] border border-white/[0.06] text-left flex flex-col gap-4">
              <div className="flex flex-col gap-1 pb-2 border-b border-white/[0.04]">
                <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">Interactive Sandbox</span>
                <h3 className="text-base font-bold text-white">Optimize Your Conversion Setup</h3>
                <p className="text-[10px] text-[#8C8C8C]">
                  Toggle the switches below. Checking boxes represents implementing optimized CRO features, which increases your score and lowers revenue leakage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleChecklistItem(item.id)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/[0.04] hover:border-white/10 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      {item.checked ? (
                        <CheckCircle2 className="w-4 h-4 text-[#00AF56] shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                      <span className={`text-xs ${item.checked ? "text-white font-medium" : "text-[#8C8C8C] group-hover:text-white transition-colors"}`}>
                        {item.label}
                      </span>
                    </div>
                    
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      item.checked ? "bg-[#00AF56]/10 text-[#00AF56]" : "bg-white/[0.03] text-white/40"
                    }`}>
                      {item.checked ? "ACTIVE" : "+CR BOOST"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA LEAD GENERATION FORM */}
            <div id="audit-lead-form" className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/[0.08] text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00AF56]/5 rounded-full blur-xl pointer-events-none" />
              
              {!formSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">Lock in Projections</span>
                    <h3 className="text-xl font-bold text-white">Recover Your Lost Revenue</h3>
                    <p className="text-xs text-[#8C8C8C] leading-relaxed">
                      We'll compile these calculations, perform a manual deep-dive CRO audit on your Shopify store, and present a custom optimization roadmap.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#8C8C8C] font-semibold" htmlFor="contact-name">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Pankaj Sharma"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-black/60 border border-white/[0.08] text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#00AF56] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#8C8C8C] font-semibold" htmlFor="contact-email">
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="pankaj@mybrand.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-black/60 border border-white/[0.08] text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#00AF56] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#8C8C8C] font-semibold" htmlFor="contact-phone">
                      WhatsApp/Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 99177 80656"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-black/60 border border-white/[0.08] text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#00AF56] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all hover:shadow-[0_0_20px_rgba(0,175,86,0.3)] mt-2"
                  >
                    <span>Request Full Free Shopify Growth Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center p-6 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00AF56]/15 border border-[#00AF56]/30 flex items-center justify-center text-[#00AF56]">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-white">Growth Audit Requested!</h3>
                    <p className="text-xs text-[#8C8C8C] leading-relaxed max-w-sm">
                      Thank you, **{contactName}**. We have logged your store metrics for **{storeUrl || "your brand"}** with leakage projection of **{formatCurrency(revenueLeakage)}/mo**.
                    </p>
                    <p className="text-xs text-[#8C8C8C] leading-relaxed mt-2">
                      Pankaj Singh or a growth strategist will contact you on WhatsApp/Phone at **{contactPhone}** or Email **{contactEmail}** within 24 hours with your blueprint.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full">
                    <a
                      href="https://wa.me/919917780656"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-transparent border border-white/[0.08] hover:border-white/20 transition-all text-center"
                    >
                      Chat on WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#00AF56] text-center"
                    >
                      Book 1-on-1 Call
                    </Link>
                  </div>
                </motion.div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

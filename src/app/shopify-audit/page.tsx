"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";

// Configurations
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
  const [trafficSource, setTrafficSource] = useState("Paid Social");

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

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // Calculations
  const currentCR = convRate;

  // Calculate visitors based on revenue, AOV, and CR
  const estimatedVisitors = Math.round(
    currentCR > 0 ? revenue / (aov * (currentCR / 100)) : revenue / aov / 0.014
  );

  const estimatedPurchases = Math.round(revenue / aov);

  const uncheckedImpact = checklist
    .filter(item => !item.checked)
    .reduce((sum, item) => sum + item.impact, 0);

  // Potential Conversion Rate is current CR boosted by the missing CRO features impact
  const optimizedCR = Number(Math.min(5.0, Math.max(2.8, currentCR * (1 + uncheckedImpact))).toFixed(2));

  // Projected Revenue = visitors * (optimizedCR / 100) * aov
  const optimizedRevenue = Math.round(estimatedVisitors * (optimizedCR / 100) * aov);

  // Projected ROAS = Optimized Revenue / Ad Spend
  const optimizedRoas = Number((adSpend > 0 ? optimizedRevenue / adSpend : 0).toFixed(2));

  // Revenue Leakage
  const revenueLeakage = Math.max(0, optimizedRevenue - revenue);
  const revenueIncreasePercent = revenue > 0 ? Math.round(((optimizedRevenue - revenue) / revenue) * 100) : 0;

  // CRO Scores calculation based on checked items
  const speedChecked = checklist.find(i => i.id === "speed")?.checked;
  const mobileChecked = checklist.find(i => i.id === "mobile")?.checked;
  const checkoutChecked = checklist.find(i => i.id === "checkout")?.checked;
  const trustChecked = checklist.find(i => i.id === "trust")?.checked;
  const productChecked = checklist.find(i => i.id === "product")?.checked;

  const speedScore = speedChecked ? 94 : 58;
  const mobileScore = mobileChecked ? 92 : 72;
  const checkoutScore = checkoutChecked ? 90 : 54;
  const trustScore = trustChecked ? 88 : 55;
  const uxScore = productChecked ? 91 : 62;

  // Overall score sum
  const checkedScoreAddition = checklist
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.scoreImpact, 0);
  const overallCROScore = Math.min(98, Math.max(35, 10 + checkedScoreAddition));

  // Determine overall recommendation
  const getRecommendation = () => {
    if (overallCROScore < 50) return { text: "CRITICAL CRO FIXES NEEDED", color: "text-red-700 bg-red-50 border-red-200" };
    if (overallCROScore < 75) return { text: "NEEDS CRO OPTIMIZATION", color: "text-amber-700 bg-amber-50 border-amber-200" };
    return { text: "HIGHLY OPTIMIZED STORE", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
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

      // POST to API
      fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "shopify-audit",
          contactName,
          contactEmail,
          contactPhone,
          storeUrl,
          revenueLeakage,
        }),
      }).catch(() => { }); // Fail silently

      // Track lead in Meta Pixel
      try {
        const fbq = (window as any)?.fbq as undefined | ((...args: any[]) => void);
        if (typeof fbq === "function") {
          fbq("track", "Lead", {
            content_name: "Shopify Growth Audit",
            content_category: "Audit Form",
            value: revenueLeakage || 0,
            currency: "INR",
          });
        }
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="relative pt-44 pb-24 px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[500px] rounded-full bg-emerald-400/[0.04] blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-[20%] right-[-10%] w-[45%] h-[600px] rounded-full bg-teal-300/[0.03] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[500px] rounded-full bg-emerald-400/[0.02] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-5">

          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Free Shopify <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Growth Audit</span>
          </h1>

          <p className="text-neutral-600 text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Stop losing sales to slow loading speeds and friction-filled customer experiences. Drop your current metrics below to visualize your revenue leaks and unlock your scaling roadmap.
          </p>
        </div>

        {/* MAIN SaaS CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

          {/* LEFT SIDE PANEL: CONFIGURATOR FORM */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-white/70 border border-neutral-200/60 shadow-sm relative backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60 font-sans">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 font-grotesk">
                <Settings className="w-5 h-5 text-emerald-600" />
                Store <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Metrics</span> Setup
              </h2>
              <span className="text-[10px] text-neutral-500 font-mono bg-neutral-100/50 px-2 py-0.5 rounded border border-neutral-200">
                Live Calculation
              </span>
            </div>

            {/* Input 1: Store URL */}
            <div className="flex flex-col gap-2 font-sans">
              <label className="text-xs text-neutral-500 font-semibold" htmlFor="store-url">
                Shopify Store Domain
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400">https://</span>
                <input
                  id="store-url"
                  type="text"
                  placeholder="yourstore.com"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  className="w-full bg-white border border-neutral-200 text-neutral-800 text-xs rounded-xl pl-[70px] pr-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Input 2: Traffic Source Selectors */}
            <div className="flex flex-col gap-2 font-sans">
              <span className="text-xs text-neutral-500 font-semibold">Primary Traffic Channel</span>
              <div className="grid grid-cols-2 gap-2">
                {["Paid Social", "Paid Search", "Social Media", "Organic Traffic"].map(source => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => setTrafficSource(source)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${trafficSource === source
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700 font-bold"
                        : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                      }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Monthly Ad Spend */}
            <div className="flex flex-col gap-2 mt-2 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-semibold">Monthly Marketing Spend</span>
                <span className="text-neutral-800 font-mono font-bold bg-neutral-50 border border-neutral-200 px-2.5 py-0.5 rounded-lg text-xs">
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
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                <span>₹10K</span>
                <span>₹5L</span>
                <span>₹10L+</span>
              </div>
            </div>

            {/* Input 4: Monthly Revenue */}
            <div className="flex flex-col gap-2 mt-2 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-semibold">Monthly Store Revenue</span>
                <span className="text-neutral-800 font-mono font-bold bg-neutral-50 border border-neutral-200 px-2.5 py-0.5 rounded-lg text-xs">
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
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                <span>₹20K</span>
                <span>₹12.5L</span>
                <span>₹25L+</span>
              </div>
            </div>

            {/* Input 5: Current ROAS */}
            <div className="flex flex-col gap-2 mt-2 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-semibold">Current Marketing ROAS</span>
                <span className="text-neutral-800 font-mono font-bold bg-neutral-50 border border-neutral-200 px-2.5 py-0.5 rounded-lg text-xs">
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
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                <span>0.5x</span>
                <span>3.0x (Target)</span>
                <span>6.0x</span>
              </div>
            </div>

            {/* Input 6: Conversion Rate */}
            <div className="flex flex-col gap-2 mt-2 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-semibold">Current Conversion Rate (%)</span>
                <span className="text-neutral-800 font-mono font-bold bg-neutral-50 border border-neutral-200 px-2.5 py-0.5 rounded-lg text-xs">
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
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                <span>0.2%</span>
                <span>2.0%</span>
                <span>4.0%+</span>
              </div>
            </div>

            {/* Input 7: Average Order Value */}
            <div className="flex flex-col gap-2 mt-2 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-semibold">Average Order Value (AOV)</span>
                <span className="text-neutral-800 font-mono font-bold bg-neutral-50 border border-neutral-200 px-2.5 py-0.5 rounded-lg text-xs">
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
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
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
                className="p-5 rounded-2xl bg-red-50 border border-red-200/80 flex gap-4 items-start font-sans"
              >
                <div className="p-2 rounded-xl bg-red-100 text-red-600 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <h3 className="text-sm font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5 font-grotesk">
                    ⚠️ Your Store Is Leaking Revenue
                  </h3>
                  <p className="text-xs text-red-700 leading-relaxed">
                    You're spending money to buy traffic, but your Shopify store isn't converting enough visitors. Most brands focus on increasing marketing spend. We focus on increasing conversion rate first.
                  </p>
                </div>
              </motion.div>
            )}

            {/* VISITATION & CONVERSION GENERAL STATS ROW */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 font-sans">
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/60 flex flex-col gap-0.5 sm:gap-1 text-left shadow-sm">
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider font-semibold truncate" title="Monthly Visitors">Monthly Visitors</span>
                <span className="text-sm xs:text-base sm:text-lg font-bold font-mono text-neutral-900 mt-0.5 sm:mt-1">
                  {estimatedVisitors.toLocaleString("en-IN")}
                </span>
                <span className="text-[7.5px] xs:text-[8px] sm:text-[9px] text-neutral-500 mt-0.5">Estimated</span>
              </div>
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/60 flex flex-col gap-0.5 sm:gap-1 text-left shadow-sm">
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider font-semibold truncate" title="Monthly Orders">Monthly Orders</span>
                <span className="text-sm xs:text-base sm:text-lg font-bold font-mono text-neutral-900 mt-0.5 sm:mt-1">
                  {estimatedPurchases.toLocaleString("en-IN")}
                </span>
                <span className="text-[7.5px] xs:text-[8px] sm:text-[9px] text-neutral-500 mt-0.5">Actual Orders</span>
              </div>
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/60 flex flex-col gap-0.5 sm:gap-1 text-left shadow-sm">
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider font-semibold truncate" title="Current CR">Current CR</span>
                <span className="text-sm xs:text-base sm:text-lg font-bold font-mono text-emerald-600 mt-0.5 sm:mt-1">
                  {currentCR}%
                </span>
                <span className="text-[7.5px] xs:text-[8px] sm:text-[9px] text-neutral-500 mt-0.5">Store Conversion</span>
              </div>
            </div>

            {/* PERFORMANCE PROJECTIONS CARD: CURRENT VS OPTIMIZED */}
            <div className="p-6 rounded-3xl bg-white/70 border border-neutral-200/60 text-left flex flex-col gap-6 relative overflow-hidden shadow-sm backdrop-blur-xl font-sans">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/60">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-emerald-700 font-mono uppercase tracking-widest font-bold">Audit Forecast</span>
                  <h3 className="text-lg font-bold text-neutral-900 font-grotesk">Performance Lift Projection</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/50 text-emerald-700 text-[10px] font-bold font-mono uppercase tracking-wider animate-pulse">
                  +{revenueIncreasePercent}% Revenue Lift
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Column 1: Current */}
                <div className="flex flex-col gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 shadow-inner">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Current Metrics</span>
                  <div className="flex flex-col gap-2.5 text-left">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Marketing Spend</span>
                      <span className="font-mono text-neutral-800 font-medium">{formatCurrency(adSpend)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">ROAS</span>
                      <span className="font-mono text-neutral-800 font-medium">{roas}x</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Monthly Revenue</span>
                      <span className="font-mono text-neutral-800 font-medium">{formatCurrency(revenue)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Conversion Rate</span>
                      <span className="font-mono text-red-600 font-bold">{currentCR}%</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Projected */}
                <div className="flex flex-col gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 relative">
                  <span className="text-[10px] text-emerald-700 uppercase tracking-wider font-bold">Projected (SalePXL CRO)</span>
                  <div className="flex flex-col gap-2.5 text-left">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Marketing Spend</span>
                      <span className="font-mono text-neutral-800 font-medium">{formatCurrency(adSpend)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">ROAS</span>
                      <span className="font-mono text-emerald-600 font-bold">{optimizedRoas}x</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Monthly Revenue</span>
                      <span className="font-mono text-emerald-600 font-bold">{formatCurrency(optimizedRevenue)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Conversion Rate</span>
                      <span className="font-mono text-emerald-600 font-bold">{optimizedCR}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-neutral-600 leading-relaxed pt-2 border-t border-neutral-200/60 font-medium">
                💡 **Insight:** You can scale your revenue to **{formatCurrency(optimizedRevenue)}** without increasing your monthly marketing spend by simply fixing your website's conversion bottlenecks.
              </div>
            </div>

            {/* REVENUE LEAKAGE SPECIFICATION CARD */}
            <div className="p-6 rounded-3xl bg-red-500/[0.01] border border-red-500/10 text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden shadow-sm backdrop-blur-xl font-sans">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/3 rounded-full blur-xl pointer-events-none" />

              {/* Leaking bucket animation (Left/Top) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-neutral-50 border border-neutral-200/60 shadow-inner rounded-2xl min-h-[160px]">

                {/* SVG Animated Leaking Bucket */}
                <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                  <svg className="w-16 h-16 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M4 8h16M5 8h14l-1.5 12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2L5 8Z" />
                    <path d="M9 22v2M12 22v3M15 22v2" className="stroke-red-500/30" />
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
                        className="w-2.5 h-2.5 rounded-full bg-amber-500 flex items-center justify-center text-[6px] text-white font-extrabold shadow-sm"
                      >
                        ₹
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono text-center mt-2 font-bold">
                  Active Revenue Leak
                </div>
              </div>

              {/* Leakage Text (Right/Bottom) */}
              <div className="md:col-span-7 flex flex-col gap-3">
                <span className="text-[10px] text-red-700 font-mono uppercase tracking-widest font-bold">
                  Revenue Leakage Analysis
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight leading-none font-grotesk">
                  You're Losing Approximately <br className="hidden sm:inline" />
                  <span className="text-red-600 font-mono font-bold">{formatCurrency(revenueLeakage)}</span> Every Month
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  Due to conversion gaps: **slow page speeds**, **poor mobile layouts**, **weak product copy**, and **friction-heavy checkout funnels**.
                </p>

                {/* Micro Progress Bars */}
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-neutral-200/60 font-sans">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[9px] text-neutral-500 font-mono">
                      <span>Lost Revenue ({Math.round((revenueLeakage / optimizedRevenue) * 100) || 0}%)</span>
                      <span className="text-red-600 font-bold">{formatCurrency(revenueLeakage)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-600"
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
            <div className="p-6 rounded-3xl bg-white/70 border border-neutral-200/60 text-left shadow-sm backdrop-blur-xl font-sans">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60 mb-6">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-xs text-emerald-700 font-mono uppercase tracking-widest font-bold">CRO Health Score</span>
                  <h3 className="text-base font-bold text-neutral-900 font-grotesk">Interactive Breakdown</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-neutral-500 font-mono font-bold">OVERALL</span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded border uppercase font-mono mt-0.5 ${recommendation.color}`}>
                      {recommendation.text}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-neutral-200 flex items-center justify-center bg-neutral-50 shadow-inner">
                    <span className="text-sm font-bold font-mono text-neutral-800">{overallCROScore}</span>
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
                  <div key={idx} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/60 shadow-inner flex flex-col justify-between min-h-[90px] text-left">
                    <span className="text-[10px] text-neutral-500 font-medium leading-tight">{s.name}</span>
                    <div className="flex items-end justify-between mt-2">
                      <span className="text-xl font-bold font-mono text-neutral-900">{s.score}<span className="text-[10px] text-neutral-400 font-normal">/100</span></span>
                      <div className="w-6 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
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
            <div className="p-6 rounded-3xl bg-white/70 border border-neutral-200/60 text-left flex flex-col gap-4 shadow-sm backdrop-blur-xl font-sans">
              <div className="flex flex-col gap-1 pb-2 border-b border-neutral-200/60 text-left">
                <span className="text-xs text-emerald-700 font-mono uppercase tracking-widest font-bold">Interactive Sandbox</span>
                <h3 className="text-base font-bold text-neutral-900 font-grotesk">Optimize Your Conversion Setup</h3>
                <p className="text-[10px] text-neutral-500 leading-normal">
                  Toggle the switches below. Checking boxes represents implementing optimized CRO features, which increases your score and lowers revenue leakage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-left">
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleChecklistItem(item.id)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {item.checked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                      <span className={`text-xs ${item.checked ? "text-neutral-900 font-semibold" : "text-neutral-500 group-hover:text-neutral-800 transition-colors"}`}>
                        {item.label}
                      </span>
                    </div>

                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${item.checked ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-400"
                      }`}>
                      {item.checked ? "ACTIVE" : "+CR BOOST"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA LEAD GENERATION FORM */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/60 text-left relative overflow-hidden shadow-2xl backdrop-blur-xl font-sans">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />

              {!formSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-5 text-left">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-xs text-emerald-700 font-mono uppercase tracking-widest font-bold">Lock in Projections</span>
                    <h3 className="text-xl font-bold text-neutral-900 font-grotesk">Recover Your Lost <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Revenue</span></h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                      We'll compile these calculations, perform a manual deep-dive CRO audit on your Shopify store, and present a custom optimization roadmap.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-neutral-500 font-semibold" htmlFor="contact-name">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Pankaj Sharma"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white border border-neutral-200 text-neutral-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-neutral-500 font-semibold" htmlFor="contact-email">
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="pankaj@mybrand.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-white border border-neutral-200 text-neutral-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-neutral-500 font-semibold" htmlFor="contact-phone">
                      WhatsApp/Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 99177 80656"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-white border border-neutral-200 text-neutral-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 shadow-sm mt-2 cursor-pointer"
                  >
                    <span>Request Free Growth Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center text-center p-6 gap-4 font-sans">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200/50 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-2 text-center text-neutral-800">
                    <h3 className="text-xl font-bold text-neutral-900 font-grotesk">Growth Audit Requested!</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
                      Thank you, **{contactName}**. We have logged your store metrics for **{storeUrl || "your brand"}** with leakage projection of **{formatCurrency(revenueLeakage)}/mo**.
                    </p>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-2 mx-auto">
                      Pankaj Singh or a growth strategist will contact you on WhatsApp/Phone at **{contactPhone}** or Email **{contactEmail}** within 24 hours with your blueprint.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full font-sans">
                    <a
                      href="https://wa.me/919917780656"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-700 bg-transparent border border-neutral-200 hover:bg-neutral-50 transition-all text-center"
                    >
                      Chat on WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-black text-center hover:bg-neutral-900"
                    >
                      Book 1-on-1 Call
                    </Link>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

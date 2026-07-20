"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Sparkles,
  Search,
  ShoppingCart,
  Smartphone,
  Layers,
  ArrowRight,
  Flame,
  Award,
  ChevronRight
} from "lucide-react";

interface ComparisonItem {
  id: string;
  category: "speed" | "conversion" | "ux" | "revenue";
  mainPoint: string;
  basicStore: {
    title: string;
    description: string;
    metric?: string;
    drawback: string;
  };
  salepxlStore: {
    title: string;
    description: string;
    metric?: string;
    advantage: string;
  };
  impactScore: number; // 1-10
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    id: "goal",
    category: "conversion",
    mainPoint: "01. Primary Strategy & Conversion Goal",
    basicStore: {
      title: "Surface-Level Default Template",
      description: "Designed only to look acceptable using generic template defaults without conversion engineering.",
      metric: "~1%–2% Conv. Rate",
      drawback: "Leaks 80%+ of incoming ad traffic due to lack of sales psychology"
    },
    salepxlStore: {
      title: "2X Conversion Revenue Machine",
      description: "Custom built with behavioral CRO psychology to turn window shoppers into instant buyers.",
      metric: "3.5%–5%+ Conv. Rate",
      advantage: "Generates up to 3x higher sales from the exact same ad budget"
    },
    impactScore: 10
  },
  {
    id: "speed",
    category: "speed",
    mainPoint: "02. Page Speed & Mobile Load Time",
    basicStore: {
      title: "Sluggish 3–6 Second Load",
      description: "Bogged down by heavy theme code, bloated CSS, and unoptimized third-party apps.",
      metric: "3.8s Avg. Load Time",
      drawback: "~40% of paid ad visitors bounce before page even finishes loading"
    },
    salepxlStore: {
      title: "Sub-Second 99/100 Instant Load",
      description: "Custom lightweight architecture with instant image preloading & zero app bloat.",
      metric: "< 1.5s Load Time",
      advantage: "Instant load stops bounce rates & ranks higher on search"
    },
    impactScore: 10
  },
  {
    id: "pdp",
    category: "conversion",
    mainPoint: "03. Product Display Page (PDP) Experience",
    basicStore: {
      title: "Generic Photos & Text Walls",
      description: "Standard image carousel with unformatted description paragraphs and hidden offer positioning.",
      drawback: "High cart abandonment due to unanswered buyer friction"
    },
    salepxlStore: {
      title: "High-Converting Buyer Experience",
      description: "Scannable benefit bullets, customer psychology proof, strategic offer positioning, & verified reviews.",
      advantage: "Dissolves buying hesitation and turns browsers into buyers"
    },
    impactScore: 9
  },
  {
    id: "checkout",
    category: "revenue",
    mainPoint: "04. Add-To-Cart & Checkout Velocity",
    basicStore: {
      title: "Multi-Step Friction Checkout",
      description: "Standard Add to Cart button leading to multi-page forms with hidden fees at the end.",
      drawback: "~70% abandoned cart rate from unexpected checkout hurdles"
    },
    salepxlStore: {
      title: "1-Click Express & Sticky Add-To-Cart",
      description: "Sticky purchase bar on scroll, 1-click UPI & Apple Pay express checkout, & zero hidden fees.",
      advantage: "Eliminates checkout drop-offs and accelerates instant sales"
    },
    impactScore: 10
  },
  {
    id: "upsell",
    category: "revenue",
    mainPoint: "05. Upselling & Average Order Value (AOV)",
    basicStore: {
      title: "Zero Upsell Infrastructure",
      description: "Single product purchases with no bundle offers or cart recommendations.",
      metric: "Standard AOV",
      drawback: "Misses 25%–40% extra revenue on every transaction"
    },
    salepxlStore: {
      title: "Smart Bundles & High-Margin Upsells",
      description: "Frequently Bought Together bundles, slide-out cart upgrades, & post-purchase offers.",
      metric: "+25%–40% Higher AOV",
      advantage: "Maximizes revenue per shopper without spending more on ads"
    },
    impactScore: 9
  }
];

export default function InteractiveComparison() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItemId, setActiveItemId] = useState<string>(COMPARISON_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"cards" | "spotlight">("cards");

  // Categories
  const categories = [
    { id: "all", label: "All Comparisons", icon: Layers },
    { id: "conversion", label: "🎯 Sales & CRO", icon: TrendingUp },
    { id: "speed", label: "⚡ Speed & Tech", icon: Zap },
    { id: "revenue", label: "💰 AOV & Checkout", icon: ShoppingCart },
    { id: "ux", label: "📱 Mobile & UX", icon: Smartphone },
  ];

  // Filtered items
  const filteredItems = useMemo(() => {
    return COMPARISON_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.mainPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.basicStore.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.salepxlStore.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeItem = useMemo(() => {
    return COMPARISON_DATA.find((i) => i.id === activeItemId) || COMPARISON_DATA[0];
  }, [activeItemId]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Top Controls: Category Tabs & Search & View Toggle */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#0d121c]/80 p-3 md:p-4 rounded-2xl border border-white/[0.08] backdrop-blur-md">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-black shadow-lg shadow-primary/20 font-bold"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-primary/70"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Search Input & View Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-56">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search points..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex items-center bg-black/40 border border-white/10 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                viewMode === "cards"
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode("spotlight")}
              className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                viewMode === "spotlight"
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              Spotlight Focus
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Column Indicator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Basic Store Header */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/30 to-red-900/10 border border-red-500/20 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold tracking-wider text-red-400">Basic Store</span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-mono">Standard Template</span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">Sluggish pre-built templates with basic settings</p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-red-400/80 font-mono font-medium">~1–2% Conv. Rate</span>
        </div>

        {/* SalePXL Store Header */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-primary/10 to-emerald-900/20 border border-primary/40 flex items-center justify-between shadow-lg shadow-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 neon-shadow-lime">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold tracking-wider text-primary">SalePXL Shopify Store</span>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-mono font-bold">Custom CRO Rebuild</span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">High-speed conversion engine engineered to scale sales</p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-primary font-mono font-bold bg-primary/20 border border-primary/30 px-2.5 py-1 rounded-full">3.5–5%+ Conv. Benchmark</span>
        </div>
      </div>

      {/* Content View 1: Side-by-Side Cards View */}
      {viewMode === "cards" && (
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const isSelected = activeItemId === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  onClick={() => setActiveItemId(item.id)}
                  className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-primary/50 bg-[#0c1420] shadow-xl shadow-primary/5"
                      : "border-white/[0.08] bg-[#080d14]/70 hover:border-white/20 hover:bg-[#0b121b]"
                  }`}
                >
                  {/* Main Point Banner */}
                  <div className="px-5 py-3 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white/10 text-white/80 font-mono text-[11px] flex items-center justify-center font-bold">
                        0{idx + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-white tracking-wide group-hover:text-primary transition-colors">
                        {item.mainPoint}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-primary/80 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                        Impact: {item.impactScore}/10
                      </span>
                      <ChevronRight className={`w-4 h-4 text-white/40 group-hover:text-white transition-transform ${isSelected ? "rotate-90 text-primary" : ""}`} />
                    </div>
                  </div>

                  {/* Dual Comparison Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: Basic Store */}
                    <div className="p-5 border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-red-950/[0.04] flex flex-col justify-between gap-3">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <h5 className="text-xs font-bold text-red-200">{item.basicStore.title}</h5>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed font-light pl-5">
                          {item.basicStore.description}
                        </p>
                      </div>

                      <div className="pl-5 pt-2 border-t border-red-500/10 flex items-center justify-between text-[11px]">
                        <span className="text-red-400/80 font-mono">{item.basicStore.drawback}</span>
                        {item.basicStore.metric && (
                          <span className="font-mono text-red-300 font-bold bg-red-500/10 px-2 py-0.5 rounded shrink-0">
                            {item.basicStore.metric}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: SalePXL Shopify Store */}
                    <div className="p-5 bg-emerald-950/[0.06] flex flex-col justify-between gap-3 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex flex-col gap-1.5 relative z-10">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <h5 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{item.salepxlStore.title}</h5>
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed font-light pl-5">
                          {item.salepxlStore.description}
                        </p>
                      </div>

                      <div className="pl-5 pt-2 border-t border-primary/20 flex items-center justify-between text-[11px] relative z-10">
                        <span className="text-primary font-mono font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {item.salepxlStore.advantage}
                        </span>
                        {item.salepxlStore.metric && (
                          <span className="font-mono text-primary font-bold bg-primary/20 border border-primary/30 px-2.5 py-0.5 rounded shrink-0 neon-shadow-lime">
                            {item.salepxlStore.metric}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Content View 2: Interactive Spotlight Focus */}
      {viewMode === "spotlight" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Selection List */}
          <div className="flex flex-col gap-2 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
            {filteredItems.map((item, idx) => {
              const isActive = item.id === activeItem.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-primary/15 border-primary/50 text-white"
                      : "bg-[#0b1017] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-md text-[10px] font-bold font-mono flex items-center justify-center ${isActive ? "bg-primary text-black" : "bg-white/10 text-white/70"}`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold">{item.mainPoint}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-white/30"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Spotlight Details */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0a111a] p-6 md:p-8 flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">Featured Main Point</span>
                  <h3 className="text-xl font-bold text-white mt-1">{activeItem.mainPoint}</h3>
                </div>
                <span className="px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-mono font-bold rounded-full">
                  High Revenue Impact ({activeItem.impactScore}/10)
                </span>
              </div>

              {/* Deep Contrast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {/* Basic Store Box */}
                <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/20 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">Basic Store</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{activeItem.basicStore.title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">{activeItem.basicStore.description}</p>
                  <div className="mt-auto pt-3 border-t border-red-500/10 text-[11px] text-red-400 font-mono">
                    ⚠ {activeItem.basicStore.drawback}
                  </div>
                </div>

                {/* SalePXL Store Box */}
                <div className="p-5 rounded-xl bg-emerald-950/30 border border-primary/40 flex flex-col gap-3 shadow-lg shadow-primary/5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wider font-mono">SalePXL Shopify Store</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{activeItem.salepxlStore.title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">{activeItem.salepxlStore.description}</p>
                  <div className="mt-auto pt-3 border-t border-primary/20 text-[11px] text-primary font-mono font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    ✓ {activeItem.salepxlStore.advantage}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Insight Bar */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-white/70">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Why this matters: Basic stores lose sales right at this stage. SalePXL fixes it natively.</span>
              </div>
              {activeItem.salepxlStore.metric && (
                <span className="px-3 py-1 bg-primary text-black font-mono font-bold rounded-lg text-xs shrink-0">
                  {activeItem.salepxlStore.metric}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Summary Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0d1522] via-[#09101a] to-[#0d1522] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Ready to upgrade from a Basic Store to a SalePXL Engine?</h4>
            <p className="text-xs text-white/60">We re-engineer your entire store experience to maximize conversions and lower customer acquisition costs.</p>
          </div>
        </div>
        <a
          href="#pricing"
          className="px-6 py-2.5 rounded-full bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-primary-hover transition-all flex items-center gap-2 shrink-0 neon-shadow-lime"
        >
          <span>Get SalePXL Rebuild</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

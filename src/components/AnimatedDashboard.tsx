"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, ShoppingBag, Target, ArrowUpRight, Zap, Check, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Order {
  id: string;
  brand: string;
  amount: number;
  time: string;
  channel: "Shopify Pay" | "UPI" | "COD";
}

interface SpeedLog {
  id: string;
  brand: string;
  action: string;
  time: string;
  metric: string;
}

const INITIAL_ORDERS: Order[] = [
  { id: "1", brand: "The Wheels Co", amount: 4890, time: "Just now", channel: "Shopify Pay" },
  { id: "2", brand: "Glyters", amount: 2450, time: "2 min ago", channel: "UPI" },
  { id: "3", brand: "Ratan Rashi", amount: 12900, time: "5 min ago", channel: "Shopify Pay" },
  { id: "4", brand: "Hay Clothing", amount: 3200, time: "8 min ago", channel: "COD" },
];

const INITIAL_LOGS: SpeedLog[] = [
  { id: "1", brand: "SOBO Beauty", action: "Optimized script rendering order", time: "Just now", metric: "1.9s mobile load" },
  { id: "2", brand: "Glyters", action: "Compressed collection image grids", time: "3 min ago", metric: "-840KB payload" },
  { id: "3", brand: "Swadezi", action: "Deferred 4 heavy theme apps", time: "6 min ago", metric: "TBT: 42ms" },
  { id: "4", brand: "Well Essentials", action: "Minified core CSS & JS bundles", time: "9 min ago", metric: "98 Speed Score" },
];

const BRANDS = ["SOBO Beauty", "Well Essentials", "Amarose", "Kohkayn", "Skin Basics", "Swadezi"];
const CHANNELS: ("Shopify Pay" | "UPI" | "COD")[] = ["Shopify Pay", "UPI", "COD"];
const ACTIONS = [
  { text: "Optimized script load paths", metric: "TTI: 1.1s" },
  { text: "Lazyloaded products media grid", metric: "-1.2MB payload" },
  { text: "Refactored checkout cart drawer", metric: "Avg CR: 4.2%" },
  { text: "Compiled Custom Liquid templates", metric: "PageSpeed: 97" }
];

export default function AnimatedDashboard() {
  const [activeTab, setActiveTab] = useState<"shopify" | "speed">("shopify");
  const [revenue, setRevenue] = useState(1482900);
  const [ordersCount, setOrdersCount] = useState(2405);
  const [recentOrders, setRecentOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [speedLogs, setSpeedLogs] = useState<SpeedLog[]>(INITIAL_LOGS);
  const [speedScore, setSpeedScore] = useState(96);

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomBrand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      
      if (Math.random() > 0.5) {
        // Simulate order
        const randomChannel = CHANNELS[Math.floor(Math.random() * CHANNELS.length)];
        const randomAmount = Math.floor(Math.random() * 8500) + 1500;
        
        const newOrder: Order = {
          id: Date.now().toString(),
          brand: randomBrand,
          amount: randomAmount,
          time: "Just now",
          channel: randomChannel,
        };

        setRecentOrders((prev) => {
          const updated = [newOrder, ...prev.slice(0, 3)];
          return updated.map((o, idx) => ({
            ...o,
            time: idx === 0 ? "Just now" : `${idx * 2} min ago`,
          }));
        });

        setRevenue((prev) => prev + randomAmount);
        setOrdersCount((prev) => prev + 1);
      } else {
        // Simulate speed optimization log
        const randomActionObj = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        
        const newLog: SpeedLog = {
          id: Date.now().toString(),
          brand: randomBrand,
          action: randomActionObj.text,
          time: "Just now",
          metric: randomActionObj.metric,
        };

        setSpeedLogs((prev) => {
          const updated = [newLog, ...prev.slice(0, 3)];
          return updated.map((l, idx) => ({
            ...l,
            time: idx === 0 ? "Just now" : `${idx * 3} min ago`,
          }));
        });

        // Fluctuate speed score around 96-99
        setSpeedScore((prev) => {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const next = prev + delta;
          return next >= 95 && next <= 100 ? next : 97;
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Outer ambient glow */}
      <div className="absolute -inset-2 rounded-3xl bg-primary/[0.08] blur-xl opacity-80 pointer-events-none" />

      {/* Main glass frame */}
      <div className="relative bg-white/90 backdrop-blur-md border border-black/[0.05] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        
        {/* Dashboard Header Bar */}
        <div className="px-6 py-4 bg-bg-secondary border-b border-black/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-[11px] text-[#4a4a4a] font-mono ml-2 uppercase tracking-widest">
              Live Shopify Engine
            </span>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex bg-bg-secondary rounded-lg p-1 border border-black/[0.05]">
            <button
              onClick={() => setActiveTab("shopify")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "shopify"
                  ? "bg-white text-black shadow-sm"
                  : "text-[#4a4a4a] hover:text-[#1a1a1a]"
              }`}
            >
              Sales Analytics
            </button>
            <button
              onClick={() => setActiveTab("speed")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "speed"
                  ? "bg-white text-black shadow-sm"
                  : "text-[#4a4a4a] hover:text-[#1a1a1a]"
              }`}
            >
              Speed & Theme Logs
            </button>
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "shopify" ? (
              <motion.div
                key="shopify-panel"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {/* Stats Widgets */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-xl bg-bg-secondary border border-black/[0.05]">
                    <div className="flex items-center justify-between text-[#4a4a4a] mb-1.5">
                      <span className="text-[11px] font-medium uppercase tracking-wider">Revenue</span>
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-lg font-bold text-[#1a1a1a] font-mono">
                      ₹{(revenue / 100000).toFixed(2)}L
                    </div>
                    <div className="text-[10px] text-primary font-medium flex items-center gap-0.5 mt-0.5">
                      <span>+24.8% vs last month</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-bg-secondary border border-black/[0.05]">
                    <div className="flex items-center justify-between text-[#4a4a4a] mb-1.5">
                      <span className="text-[11px] font-medium uppercase tracking-wider">Orders</span>
                      <ShoppingBag className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-lg font-bold text-[#1a1a1a] font-mono">
                      {ordersCount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-primary font-medium flex items-center gap-0.5 mt-0.5">
                      <span>+12.4% vs last week</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-bg-secondary border border-black/[0.05] col-span-2 sm:col-span-1">
                    <div className="flex items-center justify-between text-[#4a4a4a] mb-1.5">
                      <span className="text-[11px] font-medium uppercase tracking-wider">Conv. Rate</span>
                      <Target className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-lg font-bold text-[#1a1a1a] font-mono">
                      4.86%
                    </div>
                    <div className="text-[10px] text-primary font-medium flex items-center gap-0.5 mt-0.5">
                      <span>+1.2% CRO increase</span>
                    </div>
                  </div>
                </div>

                {/* Animated Graph */}
                <div className="p-4 rounded-xl bg-bg-secondary border border-black/[0.05] text-left">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-semibold text-[#1a1a1a]">Conversion Curve & Speed Scaling Trend</span>
                    <span className="text-[10px] text-[#4a4a4a] font-mono">Real-time update</span>
                  </div>
                  
                  {/* Beautiful SVG graph */}
                  <div className="relative h-32 w-full">
                    <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#377e62" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#377e62" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Gridlines */}
                      <line x1="0" y1="10" x2="100" y2="10" stroke="black" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.1" />
                      <line x1="0" y1="20" x2="100" y2="20" stroke="black" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.1" />
                      <line x1="0" y1="30" x2="100" y2="30" stroke="black" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.1" />
                      
                      {/* The animated area under line */}
                      <path
                        d="M0 35 L5 32 L15 30 L25 31 L35 24 L45 27 L55 18 L65 21 L75 14 L85 16 L95 6 L100 5 L100 35 Z"
                        fill="url(#chartGlow)"
                      />
                      
                      {/* Path line */}
                      <path
                        d="M0 35 L5 32 L15 30 L25 31 L35 24 L45 27 L55 18 L65 21 L75 14 L85 16 L95 6 L100 5"
                        fill="none"
                        stroke="#377e62"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        className="path-animate"
                      />
                      
                      {/* Pulsing indicator at end of line */}
                      <circle cx="100" cy="5" r="1" fill="#377e62" className="animate-pulse" />
                    </svg>
                  </div>
                </div>

                {/* Live Order Feeds */}
                <div className="flex flex-col gap-2.5 text-left">
                  <span className="text-xs font-semibold text-[#1a1a1a]">Live Transactions Stream</span>
                  <div className="flex flex-col gap-2 overflow-hidden h-[164px]">
                    <AnimatePresence initial={false}>
                      {recentOrders.map((order) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: -20, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="px-4 py-3 rounded-xl bg-bg-secondary border border-black/[0.05] flex items-center justify-between text-xs overflow-hidden"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <ShoppingBag className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <p className="font-semibold text-[#1a1a1a]">{order.brand}</p>
                              <p className="text-[10px] text-[#4a4a4a]">{order.time} via {order.channel}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-bold text-[#1a1a1a]">+₹{order.amount.toLocaleString()}</p>
                            <p className="text-[9px] text-primary font-medium uppercase tracking-wider flex items-center gap-0.5 justify-end">
                              Processed <ArrowUpRight className="w-2 h-2" />
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="speed-panel"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {/* Meta and Google ROAS Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {/* Speed Score Card */}
                  <div className="p-4 rounded-xl bg-primary/[0.02] border border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-[#1a1a1a]">
                        <Zap className="w-4.5 h-4.5 text-primary" />
                        <span className="text-xs font-semibold uppercase tracking-wider">PageSpeed Score</span>
                      </div>
                      <span className="text-[9px] bg-primary/15 text-primary font-bold px-2 py-0.5 rounded-full">OPTIMIZED</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <p className="text-[10px] text-[#4a4a4a]">Avg Mobile Score</p>
                        <p className="text-lg font-bold text-[#1a1a1a] font-mono">{speedScore} / 100</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#4a4a4a]">Load Time (Avg)</p>
                        <p className="text-lg font-bold text-primary font-mono">1.3s</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-black/[0.05] flex justify-between items-center text-xs">
                      <span className="text-[#4a4a4a]">Performance Level</span>
                      <span className="font-mono font-bold text-[#1a1a1a] text-base">Excellent</span>
                    </div>
                  </div>

                  {/* Interactivity Card */}
                  <div className="p-4 rounded-xl bg-emerald-600/[0.02] border border-emerald-600/20 hover:border-emerald-600/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-[#1a1a1a]">
                        <Target className="w-4.5 h-4.5 text-emerald-600" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Core Web Vitals</span>
                      </div>
                      <span className="text-[9px] bg-emerald-600/10 text-emerald-700 font-bold px-2 py-0.5 rounded-full">PASSED</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <p className="text-[10px] text-[#4a4a4a]">FID Target</p>
                        <p className="text-lg font-bold text-[#1a1a1a] font-mono">&lt; 15ms</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#4a4a4a]">LCP Metric</p>
                        <p className="text-lg font-bold text-primary font-mono">1.1s</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-black/[0.05] flex justify-between items-center text-xs">
                      <span className="text-[#4a4a4a]">Blocking Time (TBT)</span>
                      <span className="font-mono font-bold text-[#1a1a1a] text-base">35ms</span>
                    </div>
                  </div>
                </div>

                {/* Blended Metrics Performance Overview */}
                <div className="p-5 rounded-xl bg-bg-secondary border border-black/[0.05] flex flex-col gap-4 text-left">
                  <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                    <span className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-wider">Store Optimization Log</span>
                    <span className="text-xs text-primary font-semibold font-mono">Active Monitoring</span>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <AnimatePresence initial={false}>
                      {speedLogs.map((log) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-primary/15 text-primary flex items-center justify-center text-[9px] font-bold">
                              ✓
                            </span>
                            <div>
                              <span className="font-semibold text-[#1a1a1a] block">{log.brand}</span>
                              <span className="text-[10px] text-[#4a4a4a]">{log.action}</span>
                            </div>
                          </div>
                          <span className="font-mono text-primary text-[10px] bg-primary/10 px-2 py-0.5 rounded border border-primary/20 font-bold shrink-0">
                            {log.metric}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Micro animation callout */}
                <div className="text-center text-[10px] text-[#4a4a4a]">
                  📊 Integrated engine simulating real-time speed optimization and rendering parameters for optimized Shopify Stores.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

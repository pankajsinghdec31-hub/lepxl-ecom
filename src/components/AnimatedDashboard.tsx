"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, ShoppingBag, Target, ArrowUpRight, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Chrome = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);

interface Order {
  id: string;
  brand: string;
  amount: number;
  time: string;
  channel: "Meta" | "Google" | "Organic";
}

const INITIAL_ORDERS: Order[] = [
  { id: "1", brand: "The Wheels Co", amount: 4890, time: "Just now", channel: "Meta" },
  { id: "2", brand: "Glyters", amount: 2450, time: "2 min ago", channel: "Google" },
  { id: "3", brand: "Ratan Rashi", amount: 12900, time: "5 min ago", channel: "Meta" },
  { id: "4", brand: "Hay Clothing", amount: 3200, time: "8 min ago", channel: "Organic" },
];

const BRANDS = ["Panihari Vastra", "Chashma", "Suvastra Varnam", "Prisachi", "Anand Sweets", "Get My Couch"];
const CHANNELS: ("Meta" | "Google" | "Organic")[] = ["Meta", "Google", "Organic"];

export default function AnimatedDashboard() {
  const [activeTab, setActiveTab] = useState<"shopify" | "ads">("shopify");
  const [revenue, setRevenue] = useState(1482900);
  const [ordersCount, setOrdersCount] = useState(2405);
  const [recentOrders, setRecentOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [roas, setRoas] = useState(8.24);

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new order
      const randomBrand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
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

      // Update counters
      setRevenue((prev) => prev + randomAmount);
      setOrdersCount((prev) => prev + 1);
      
      // Slightly fluctuate ROAS around 8.76x
      setRoas((prev) => {
        const diff = (Math.random() * 0.4 - 0.2);
        const next = Number((prev + diff).toFixed(2));
        return next > 6 ? (next < 10 ? next : 8.76) : 7.2;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Outer ambient glow */}
      <div className="absolute -inset-2 rounded-3xl bg-[#00AF56]/[0.08] blur-xl opacity-80 pointer-events-none" />

      {/* Main glass frame */}
      <div className="relative bg-[#181818] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Dashboard Header Bar */}
        <div className="px-6 py-4 bg-[#111111] border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-[11px] text-[#8C8C8C] font-mono ml-2 uppercase tracking-widest">
              Live Scale Engine v2.4
            </span>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex bg-black rounded-lg p-1 border border-white/[0.05]">
            <button
              onClick={() => setActiveTab("shopify")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "shopify"
                  ? "bg-[#181818] text-white"
                  : "text-[#8C8C8C] hover:text-white"
              }`}
            >
              Shopify Analytics
            </button>
            <button
              onClick={() => setActiveTab("ads")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "ads"
                  ? "bg-[#181818] text-white"
                  : "text-[#8C8C8C] hover:text-white"
              }`}
            >
              Paid Channels
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.05]">
                    <div className="flex items-center justify-between text-[#8C8C8C] mb-1.5">
                      <span className="text-[11px] font-medium uppercase tracking-wider">Revenue</span>
                      <TrendingUp className="w-3.5 h-3.5 text-[#00AF56]" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">
                      ₹{(revenue / 100000).toFixed(2)}L
                    </div>
                    <div className="text-[10px] text-[#00AF56] font-medium flex items-center gap-0.5 mt-0.5">
                      <span>+24.8% vs last month</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.05]">
                    <div className="flex items-center justify-between text-[#8C8C8C] mb-1.5">
                      <span className="text-[11px] font-medium uppercase tracking-wider">Orders</span>
                      <ShoppingBag className="w-3.5 h-3.5 text-[#00AF56]" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">
                      {ordersCount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[#00AF56] font-medium flex items-center gap-0.5 mt-0.5">
                      <span>+12.4% vs last week</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.05] col-span-2 sm:col-span-1">
                    <div className="flex items-center justify-between text-[#8C8C8C] mb-1.5">
                      <span className="text-[11px] font-medium uppercase tracking-wider">Conv. Rate</span>
                      <Target className="w-3.5 h-3.5 text-[#00AF56]" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">
                      4.86%
                    </div>
                    <div className="text-[10px] text-[#00AF56] font-medium flex items-center gap-0.5 mt-0.5">
                      <span>+1.2% CRO increase</span>
                    </div>
                  </div>
                </div>

                {/* Animated Graph */}
                <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.05]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-semibold text-white">Conversion Curve & Scaling Trend</span>
                    <span className="text-[10px] text-[#8C8C8C] font-mono">Real-time update</span>
                  </div>
                  
                  {/* Beautiful SVG graph */}
                  <div className="relative h-32 w-full">
                    <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00AF56" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#00AF56" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Gridlines */}
                      <line x1="0" y1="10" x2="100" y2="10" stroke="white" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.3" />
                      <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.3" />
                      <line x1="0" y1="30" x2="100" y2="30" stroke="white" strokeWidth="0.05" strokeDasharray="1,2" opacity="0.3" />
                      
                      {/* The animated area under line */}
                      <path
                        d="M0 35 L5 32 L15 30 L25 31 L35 24 L45 27 L55 18 L65 21 L75 14 L85 16 L95 6 L100 5 L100 35 Z"
                        fill="url(#chartGlow)"
                      />
                      
                      {/* Path line */}
                      <path
                        d="M0 35 L5 32 L15 30 L25 31 L35 24 L45 27 L55 18 L65 21 L75 14 L85 16 L95 6 L100 5"
                        fill="none"
                        stroke="#00AF56"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        className="path-animate"
                      />
                      
                      {/* Pulsing indicator at end of line */}
                      <circle cx="100" cy="5" r="1" fill="#00AF56" className="animate-pulse" />
                    </svg>
                  </div>
                </div>

                {/* Live Order Feeds */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-semibold text-white">Live Transactions Stream</span>
                  <div className="flex flex-col gap-2 overflow-hidden h-[164px]">
                    <AnimatePresence initial={false}>
                      {recentOrders.map((order) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: -20, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.04] flex items-center justify-between text-xs overflow-hidden"
                        >
                          <div className="flex items-center gap-2.5">
                            {order.channel === "Meta" ? (
                              <span className="w-6 h-6 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-400">
                                <Facebook className="w-3.5 h-3.5 fill-current" />
                              </span>
                            ) : order.channel === "Google" ? (
                              <span className="w-6 h-6 rounded-lg bg-red-600/10 flex items-center justify-center text-red-400">
                                <Chrome className="w-3.5 h-3.5" />
                              </span>
                            ) : (
                              <span className="w-6 h-6 rounded-lg bg-[#00AF56]/10 flex items-center justify-center text-[#00AF56]">
                                <ShoppingBag className="w-3.5 h-3.5" />
                              </span>
                            )}
                            <div>
                              <p className="font-semibold text-white">{order.brand}</p>
                              <p className="text-[10px] text-[#8C8C8C]">{order.time} via {order.channel}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-bold text-white">+₹{order.amount.toLocaleString()}</p>
                            <p className="text-[9px] text-[#00AF56] font-medium uppercase tracking-wider flex items-center gap-0.5 justify-end">
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
                key="ads-panel"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {/* Meta and Google ROAS Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Meta Ads Card */}
                  <div className="p-4 rounded-xl bg-blue-600/[0.03] border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-[#D7D7D7]">
                        <Facebook className="w-4.5 h-4.5 text-blue-500 fill-current" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Meta Ads Scale</span>
                      </div>
                      <span className="text-[9px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <p className="text-[10px] text-[#8C8C8C]">Ad Spend (Monthly)</p>
                        <p className="text-lg font-bold text-white font-mono">₹4.2L</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#8C8C8C]">Generated Revenue</p>
                        <p className="text-lg font-bold text-[#00AF56] font-mono">₹38.8L</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/[0.05] flex justify-between items-center text-xs">
                      <span className="text-[#8C8C8C]">ROAS</span>
                      <span className="font-mono font-bold text-white text-base">9.24x</span>
                    </div>
                  </div>

                  {/* Google Ads Card */}
                  <div className="p-4 rounded-xl bg-red-600/[0.03] border border-red-500/20 hover:border-red-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-[#D7D7D7]">
                        <Chrome className="w-4.5 h-4.5 text-red-500" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Google Ads PMax</span>
                      </div>
                      <span className="text-[9px] bg-red-500/20 text-red-300 font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <p className="text-[10px] text-[#8C8C8C]">Ad Spend (Monthly)</p>
                        <p className="text-lg font-bold text-white font-mono">₹2.8L</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#8C8C8C]">Generated Revenue</p>
                        <p className="text-lg font-bold text-[#00AF56] font-mono">₹22.6L</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/[0.05] flex justify-between items-center text-xs">
                      <span className="text-[#8C8C8C]">ROAS</span>
                      <span className="font-mono font-bold text-white text-base">8.07x</span>
                    </div>
                  </div>
                </div>

                {/* Blended Metrics Performance Overview */}
                <div className="p-5 rounded-xl bg-[#111111] border border-white/[0.05] flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">Blended Performance Overview</span>
                    <span className="text-xs text-[#00AF56] font-semibold font-mono">ROAS: {roas}x</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-[#8C8C8C]">Total Ad Budget Managed</span>
                      <span className="text-base font-bold text-white font-mono">₹7,00,000</span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-[10px] text-[#8C8C8C]">Overall Generated Sales</span>
                      <span className="text-base font-bold text-[#00AF56] font-mono">₹61,40,000</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-[#8C8C8C]">Avg. Blended CPA</span>
                      <span className="text-base font-bold text-white font-mono">₹380 <span className="text-xs text-[#00AF56] font-normal">-18%</span></span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-[10px] text-[#8C8C8C]">Avg. Blended CTR</span>
                      <span className="text-base font-bold text-white font-mono">3.46%</span>
                    </div>
                  </div>
                </div>

                {/* Micro animation callout */}
                <div className="text-center text-[10px] text-[#8C8C8C]">
                  📊 Integrated dashboard simulating live performance marketing data for ecommerce brands scaling above ₹50L/mo.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Phone,
  MapPin,
  ChevronDown,
  Building,
  HelpCircle,
  ArrowUpRight,
  Layers,
  ShoppingBag,
  Smartphone,
  Code,
  Sliders,
  Star,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryBox from "@/components/EnquiryBox";
import InteractiveFunnel from "@/components/InteractiveFunnel";
import ROICalculator from "@/components/ROICalculator";
import ABTestingSimulator from "@/components/ABTestingSimulator";

// FAQ Items (Simplified text)
const FAQ_ITEMS = [
  {
    q: "How long does a Shopify store build take?",
    a: "Standard builds require 2 to 3 weeks. Custom storefronts and complex integrations take 4 to 6 weeks. We prioritize optimization, speed tuning, and checkout validation."
  },
  {
    q: "Can you redesign an existing Shopify store?",
    a: "Yes. We revamping theme layouts, optimize mobile UX, and accelerate loading speeds while preserving order logs, collections, and customer records."
  },
  {
    q: "Do you build custom Shopify features?",
    a: "Absolutely. We engineer custom sections, option configurators, slide-out drawer drawers, and API connections tailored to your inventory setups."
  },
  {
    q: "Do you create Shopify stores for dropshipping?",
    a: "Yes. We build D2C-centric dropshipping stores featuring custom suppliers sync pipelines, optimized landing templates, and fast checkouts."
  },
  {
    q: "Will my Shopify store work on mobile?",
    a: "Yes. We develop under a strict mobile-first paradigm. Over 80% of digital traffic is mobile, so checkout speed and swipe interactions are optimized."
  },
  {
    q: "Can I edit my website after delivery?",
    a: "Yes. All stores leverage Shopify Online Store 2.0 sections, allowing your brand team to re-order layouts, banners, and text without editing code."
  }
];

// Testimonials (Refined copy)
const TESTIMONIALS = [
  {
    quote: "SalePXL rebuilt our store and grew our conversion rate from 1.1% to 4.2% in 90 days. Their speed optimization is unmatched.",
    author: "Rohan Malhotra",
    role: "Founder, The Wheels Co",
    growth: "+410% Revenue Growth",
    avatar: "RM",
    stars: 5
  },
  {
    quote: "We migrated to a custom Shopify setup with SalePXL. Checkout conversions improved instantly and page load dropped under 1.5 seconds.",
    author: "Sneha Sharma",
    role: "ECommerce Director, Glyters",
    growth: "+150% Sales Boost",
    avatar: "SS",
    stars: 5
  },
  {
    quote: "Our store load went from 6.8s to 1.9s. The conversion lift was immediate. Truly elite Shopify engineering.",
    author: "Vipul Shah",
    role: "Marketing Head, Ratan Rashi",
    growth: "+310% Conversion Rate",
    avatar: "VS",
    stars: 5
  }
];

// Trust Stats
const TRUST_STATS = [
  { label: "Experience", value: "10+ Years" },
  { label: "Brands Scaled", value: "100+ Brands" },
  { label: "Average Speed", value: "Sub-2.0s" },
  { label: "Revenue Generated", value: "Millions" },
  { label: "Compliance", value: "MSME Partner" }
];

interface MockupConfig {
  name: string;
  industry: string;
  theme: "dark" | "light";
  bgColor: string;
  textColor: string;
  primaryColor: string;
  heroText: string;
  heroSub: string;
  products: { name: string; price: string }[];
  image: string;
  description: string;
}

// Curated Project Data (Fulfills HOME_PROJECTS requirement)
const HOME_PROJECTS: MockupConfig[] = [
  {
    name: "The Wheels Co",
    industry: "Automotive Accessories",
    theme: "dark",
    bgColor: "bg-[#0c0c0c]",
    textColor: "text-white",
    primaryColor: "#00AF56",
    heroText: "FORCE AHEAD",
    heroSub: "Premium Carbon Accessories",
    products: [ { name: "Carbon Steering", price: "₹24,999" }, { name: "Alloy Hubcaps", price: "₹4,500" } ],
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80",
    description: "Redesigned Shopify product layouts and checkouts, lifting conversion rate from 1.1% to 4.2%."
  },
  {
    name: "RCFYIY Boutique",
    industry: "Fashion Boutique",
    theme: "light",
    bgColor: "bg-[#fff9fa]",
    textColor: "text-[#2e1a1c]",
    primaryColor: "#db2777",
    heroText: "BOUTIQUE EDIT",
    heroSub: "Handcrafted Couture Sets",
    products: [ { name: "Silk Wrap Blouse", price: "₹6,800" }, { name: "Organza Dress", price: "₹12,500" } ],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
    description: "Bespoke storefront focusing on visual editorial catalog listings and single-tap checkout."
  },
  {
    name: "Glyters Jewellery",
    industry: "Fashion Jewelry",
    theme: "dark",
    bgColor: "bg-[#0b0f19]",
    textColor: "text-white",
    primaryColor: "#3b82f6",
    heroText: "SHINE ALWAYS",
    heroSub: "D2C Diamond Studs",
    products: [ { name: "Tennis Bracelet", price: "₹38,000" }, { name: "Star Hoop Studs", price: "₹4,200" } ],
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
    description: "Theme rebuild integrating speed acceleration and customizable jewelry drawers."
  }
];

const PORTFOLIO_STORES = [
  { name: "SOBO Beauty", image: "/imgi_80_sobo-beauty.webp" },
  { name: "Well Essentials", image: "/imgi_81_well-essentials.webp" },
  { name: "Amarose", image: "/imgi_83_amarose.webp" },
  { name: "Kohkayn", image: "/imgi_89_kohkayn-com.webp" },
  { name: "Skin Basics", image: "/imgi_91_skin-basics.webp" },
  { name: "Swadezi", image: "/imgi_93_swadezi.webp" }
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden">
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[400px] rounded-full bg-primary/5 blur-[130px] animate-blob-slow-1 pointer-events-none" />
      <div className="absolute top-[15%] right-[-5%] w-[40%] h-[500px] rounded-full bg-primary/5 blur-[150px] animate-blob-slow-2 pointer-events-none" />
      <div className="absolute top-[50%] left-[5%] w-[35%] h-[400px] rounded-full bg-primary/5 blur-[120px] animate-blob-slow-1 pointer-events-none" />
      <div className="absolute bottom-[8%] right-[5%] w-[35%] h-[450px] rounded-full bg-primary/5 blur-[130px] animate-blob-slow-2 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-8 pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left animate-fade-blur">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] text-primary font-mono uppercase tracking-wider font-bold">
                Shopify Development Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight text-white leading-tight">
              We Build Shopify Stores That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary">
                Convert Visitors
              </span>
            </h1>

            <p className="text-[#8e8e93] text-base sm:text-lg leading-relaxed max-w-xl">
              Clean architecture, high-converting checkout flows, and sub-2.0s load speeds. We build custom storefronts designed for scale.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-primary hover:bg-[#2a6350] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(16,185,129,0.2)] text-center group"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="https://wa.me/919917780656"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300 text-center hover:bg-white/[0.02]"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Credibility Indicator */}
            <div className="pt-6 border-t border-white/[0.05] flex items-center gap-6 mt-4">
              <div className="flex -space-x-3">
                <span className="w-9 h-9 rounded-full bg-[#121214] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-[#8e8e93]">SB</span>
                <span className="w-9 h-9 rounded-full bg-[#121214] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-[#8e8e93]">WE</span>
                <span className="w-9 h-9 rounded-full bg-[#121214] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-[#8e8e93]">SZ</span>
              </div>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                Trusted by <span className="text-white font-semibold">100+ brands</span> to build, redesign, and optimize storefronts.
              </p>
            </div>
          </div>

          {/* Right Column Interactive Form */}
          <div className="lg:col-span-5 relative animate-fade-blur" style={{ animationDelay: "0.2s" }}>
            <EnquiryBox />
          </div>
        </div>
      </section>

      {/* TRUST BAR TICKER */}
      <section className="bg-white/[0.01] py-10 border-y border-white/[0.05] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-center">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1 items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND LOGOS */}
      <section className="py-16 px-6 relative overflow-hidden bg-bg-dark border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 text-center items-center">
          <div className="max-w-xl flex flex-col gap-3">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              Trusted Partners
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Powering High-Growth ECommerce Brands
            </h2>
          </div>

          {/* Styled Brand Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 w-full max-w-5xl">
            {PORTFOLIO_STORES.map((store, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center min-h-[90px] hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(16,185,129,0.03)] cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="text-sm md:text-base font-black tracking-widest text-[#5c5c62] group-hover:text-primary uppercase transition-colors duration-300 font-mono">
                  {store.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="py-24 px-6 relative overflow-hidden bg-white/[0.01] border-b border-white/[0.05]">
        <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-12 text-center items-center">
          <div className="max-w-3xl flex flex-col gap-4">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              ROI Simulator
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Stop Leaking Sales. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">
                Unlock Your Store's True Potential
              </span>
            </h2>
            <p className="text-[#8e8e93] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              When site speeds drop and mobile checkout is streamlined, conversion rates spike—increasing revenue without increasing ad spend.
            </p>
          </div>
          
          <ROICalculator />
        </div>
      </section>

      {/* SERVICES VISUAL SHOWCASE (Alternating Editorial Layouts) */}
      <section className="py-24 px-6 bg-bg-dark border-b border-white/[0.05] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered to Convert
            </h2>
            <p className="text-[#8e8e93] text-sm leading-relaxed">
              We design and develop premium, speed-optimized Shopify components built specifically for your audience.
            </p>
          </div>

          {/* Alternating Editorial Showcase of Capabilities */}
          <div className="flex flex-col gap-32 mt-8">
            
            {/* Component 1: Shopify Homepages & Collection Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">01. Architecture</span>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Shopify Homepages & Collection Pages</h3>
                <p className="text-[#8e8e93] text-sm leading-relaxed">
                  Cinematic catalogs featuring grid filters, visual hierarchy, and fast-scrolling selectors designed to establish brand authority instantly.
                </p>
                <div className="flex gap-8 border-t border-white/5 pt-6 mt-2">
                  <div>
                    <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">Mobile Speed</span>
                    <span className="block text-2xl font-bold text-white font-mono mt-1">98/100</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">Bounce Rate</span>
                    <span className="block text-2xl font-bold text-primary font-mono mt-1">-42% Avg.</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 group relative">
                {/* Browser Mockup */}
                <div className="w-full aspect-[16/10] rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] relative">
                  <div className="px-4 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/60" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                      <span className="w-2 h-2 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[9px] text-[#8e8e93] font-mono">boutique.brand.com/shop</span>
                    <span className="w-2 h-2 bg-white/10 rounded-full" />
                  </div>
                  <div className="relative w-full h-[calc(100%-37px)] bg-[#050505] p-6 flex flex-col justify-between text-left">
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                      <span className="text-[10px] font-black text-white font-mono uppercase tracking-wider">LUXE Boutique</span>
                      <span className="text-[8px] text-[#8e8e93] uppercase tracking-wider font-bold">Cart (0)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 my-auto">
                      {[
                        { title: "Silk Wrap Blouse", price: "₹6,800", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&q=80" },
                        { title: "Organza Dress", price: "₹12,500", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&q=80" },
                        { title: "Silk Kurta Kurti", price: "₹8,900", img: "https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?w=200&q=80" }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-1.5 p-2 rounded-xl bg-white/[0.01] border border-white/5 hover:border-primary/20 transition-all duration-300">
                          <div className="aspect-[4/5] w-full rounded-lg overflow-hidden relative bg-neutral-900">
                            <img src={item.img} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[8px] font-bold text-white truncate">{item.title}</span>
                          <span className="text-[8px] text-primary font-mono">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Component 2: Product Pages & Cart UI */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 order-last lg:order-first group relative">
                {/* Browser Mockup with slide-out cart drawer overlay */}
                <div className="w-full aspect-[16/10] rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] relative">
                  <div className="px-4 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/60" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                      <span className="w-2 h-2 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[9px] text-[#8e8e93] font-mono">carbon.wheel.com/products/steering</span>
                    <span className="w-2 h-2 bg-white/10 rounded-full" />
                  </div>
                  <div className="relative w-full h-[calc(100%-37px)] bg-[#0c0c0c] p-6 flex items-start gap-4 text-left">
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="aspect-[4/3] w-full rounded-xl bg-white/5 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&q=80" alt="" className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-[10px] font-bold text-white">Carbon Steering Wheel</h4>
                      <span className="text-[10px] text-primary font-mono">₹24,999</span>
                    </div>
                    {/* Slide-out cart mock */}
                    <div className="w-[150px] h-full bg-[#121214] border-l border-white/10 p-3 absolute right-0 top-0 bottom-0 flex flex-col justify-between shadow-2xl z-20">
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                          <span className="text-[8px] font-bold text-white">CART (1)</span>
                        </div>
                        <div className="flex gap-2 items-center bg-white/[0.02] p-1.5 rounded border border-white/5">
                          <div className="w-6 h-6 rounded bg-white/10 overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&q=80" alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-[6px] text-white font-bold truncate">Steering Wheel</p>
                            <p className="text-[6px] text-primary font-mono">₹24,999</p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full py-1.5 bg-primary text-white text-[8px] font-bold uppercase rounded">Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">02. Engagement</span>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Product Pages & Custom Cart drawers</h3>
                <p className="text-[#8e8e93] text-sm leading-relaxed">
                  Interactive buy boxes, instant options selectors, and slide-out drawers optimized to simplify purchase choices and increase average order values.
                </p>
                <div className="flex gap-8 border-t border-white/5 pt-6 mt-2">
                  <div>
                    <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">AOV Boost</span>
                    <span className="block text-2xl font-bold text-white font-mono mt-1">+24% Avg.</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">Add-to-Carts</span>
                    <span className="block text-2xl font-bold text-primary font-mono mt-1">+35% Rise</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Component 3: Mobile Shopify Experience & Checkout UI */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">03. Mobile First</span>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Mobile Shopify Experience & Checkout UI</h3>
                <p className="text-[#8e8e93] text-sm leading-relaxed">
                  Fast mobile checkouts, custom sticky buy buttons, and responsive gesture-based navigation engineered specifically for mobile D2C buyers.
                </p>
                <div className="flex gap-8 border-t border-white/5 pt-6 mt-2">
                  <div>
                    <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">Mobile Conv.</span>
                    <span className="block text-2xl font-bold text-white font-mono mt-1">4.86% +</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">Checkout Speed</span>
                    <span className="block text-2xl font-bold text-primary font-mono mt-1">Sub-1.5s</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex justify-center gap-6 relative group">
                <div className="w-[170px] aspect-[9/18] rounded-[24px] bg-[#0c0c0e] border-4 border-[#27272a] shadow-2xl p-2 pt-4 relative overflow-hidden transition-transform duration-500 hover:-translate-y-2">
                  <div className="w-full h-full bg-[#050505] rounded-xl p-2.5 flex flex-col justify-between border border-white/5 text-left">
                    <div className="flex justify-between items-center text-[7px] text-[#8e8e93] border-b border-white/5 pb-1">
                      <span>GLYTERS JEWELRY</span>
                    </div>
                    <div className="my-auto flex flex-col gap-1.5 items-center text-center">
                      <div className="w-16 h-16 rounded bg-white/5 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&q=80" alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[7px] text-white font-bold truncate max-w-full">Diamond Bracelet</span>
                      <span className="text-[7px] text-primary font-mono">₹38,000</span>
                    </div>
                    <button className="w-full py-1.5 bg-primary text-white text-[7px] font-bold rounded">Buy Now</button>
                  </div>
                </div>

                <div className="w-[170px] aspect-[9/18] rounded-[24px] bg-[#0c0c0e] border-4 border-[#27272a] shadow-2xl p-2 pt-4 relative overflow-hidden transition-transform duration-500 hover:-translate-y-4 -ml-8 mt-8">
                  <div className="w-full h-full bg-[#121214] rounded-xl p-3 flex flex-col justify-between border border-white/5 text-left">
                    <div className="flex justify-between items-center text-[6px] border-b border-white/5 pb-1">
                      <span className="text-white font-bold">SECURE CHECKOUT</span>
                    </div>
                    <div className="flex flex-col gap-1.5 my-auto">
                      <span className="text-[5px] text-[#8e8e93]">SHIPPING ADDRESS</span>
                      <div className="w-full h-2.5 bg-white/5 rounded" />
                      <div className="w-full h-2.5 bg-white/5 rounded" />
                      <span className="text-[5px] text-[#8e8e93] mt-1.5">SECURE PAYMENT</span>
                      <div className="h-3 w-full bg-primary/10 border border-primary/20 rounded flex items-center justify-center text-[5px] text-primary font-mono font-bold">UPI ENABLED</div>
                    </div>
                    <button className="w-full py-1.5 bg-primary text-white text-[7px] font-bold rounded">Pay Now</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Component 4: Landing Pages & Luxury Brand Designs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 order-last lg:order-first group relative">
                {/* Browser Mockup */}
                <div className="w-full aspect-[16/10] rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] relative">
                  <div className="px-4 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/60" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                      <span className="w-2 h-2 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[9px] text-[#8e8e93] font-mono">organic.lab/promo</span>
                    <span className="w-2 h-2 bg-white/10 rounded-full" />
                  </div>
                  <div className="relative w-full h-[calc(100%-37px)] bg-[#050505] p-6 flex flex-col justify-center text-center items-center">
                    <span className="text-[7px] text-primary font-mono uppercase tracking-widest font-bold">EXCLUSIVE CAMPAIGN</span>
                    <h4 className="text-base font-bold text-white max-w-sm mt-1.5">Organic Superfoods & Elixirs</h4>
                    <p className="text-[8px] text-[#8e8e93] max-w-xs mt-1">Boost daily output and gut health with 100% certified cold-pressed extracts.</p>
                    <div className="flex gap-3 mt-3.5">
                      <span className="px-3 py-1 bg-primary text-white text-[7px] font-bold rounded">Shop Offer</span>
                      <span className="px-3 py-1 border border-white/10 text-white text-[7px] font-bold rounded">Read Audit</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">04. Growth</span>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Custom Landing Pages & Luxury Brand Designs</h3>
                <p className="text-[#8e8e93] text-sm leading-relaxed">
                  Campaign-driven, hyper-focused landing pages built to secure lower CPA bidding, maximize margins, and present brand stories cinematically.
                </p>
                <div className="flex gap-8 border-t border-white/5 pt-6 mt-2">
                  <div>
                    <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">CPA Reduction</span>
                    <span className="block text-2xl font-bold text-white font-mono mt-1">-32% Net</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">Campaign ROAS</span>
                    <span className="block text-2xl font-bold text-primary font-mono mt-1">Up to 8.7x</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-primary hover:text-primary/80 transition-colors group"
            >
              <span>Explore All Our Growth Capabilities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* AB TESTING SIMULATOR SECTION */}
      <section className="py-24 px-6 relative overflow-hidden bg-white/[0.01] border-b border-white/[0.05]">
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col gap-12 text-center items-center">
          <div className="max-w-3xl flex flex-col gap-4">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              Conversion Sandbox
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Optimize The Destination <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">
                Before Scaling The Ads
              </span>
            </h2>
            <p className="text-[#8e8e93] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Compare an unoptimized Shopify setup against a conversion-engineered storefront. Explore the hotspots to view optimization details.
            </p>
          </div>

          <ABTestingSimulator />
        </div>
      </section>

      {/* RECENT PROJECTS (Premium Cases lookbook with zoom effects) */}
      <section className="py-24 px-6 bg-bg-dark border-b border-white/[0.05] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              Shopify Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Recent Case Studies
            </h2>
            <p className="text-[#8e8e93] text-sm leading-relaxed">
              We replace guesswork with engineering. Here are our recent builds matching speed best-practices with custom conversion layouts.
            </p>
          </div>

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOME_PROJECTS.map((proj, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-primary/20 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                {/* Image Showcase - Large zoom on hover */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0c0c0e] p-3 border-b border-white/[0.05] flex items-center justify-center">
                  
                  {/* CSS Browser Window Mockup */}
                  <div className={`w-[90%] aspect-[16/10] rounded-xl border border-white/[0.05] ${proj.bgColor} ${proj.textColor} font-sans shadow-lg overflow-hidden flex flex-col self-start`}>
                    <div className="px-2 py-1 bg-black/10 border-b border-white/[0.03] flex items-center justify-between text-[6px]">
                      <div className="flex gap-1 items-center">
                        <span className="w-1 h-1 rounded-full bg-red-500/40" />
                        <span className="w-1 h-1 rounded-full bg-yellow-500/40" />
                        <span className="w-1 h-1 rounded-full bg-green-500/40" />
                      </div>
                      <span className="font-mono scale-90 opacity-60 truncate max-w-[80px]">{proj.name.toLowerCase().replace(" ", "")}.com</span>
                      <span className="w-1 h-1 rounded-full bg-black/5" />
                    </div>
                    <div className="p-2 flex flex-col gap-1 flex-1 justify-start">
                      <div className="flex justify-between items-center text-[4px] scale-95 border-b border-white/5 pb-1 opacity-70">
                        <span className="font-black" style={{ color: proj.primaryColor }}>{proj.name}</span>
                        <span>Cart (0)</span>
                      </div>
                      <div className="bg-black/10 rounded p-1 relative overflow-hidden flex flex-col justify-center min-h-[30px] text-left">
                        <span className="text-[3px] uppercase font-bold opacity-60">New Launch</span>
                        <span className="text-[5px] font-black leading-tight max-w-[65px]">{proj.heroText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Overlapping mobile phone screenshot preview */}
                  <div className="absolute bottom-2.5 right-2.5 w-[33%] aspect-[9/16.2] rounded-xl border border-white/[0.08] bg-[#050505] overflow-hidden shadow-2xl z-20 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_15px_30px_rgba(16,185,129,0.1)]">
                    <img
                      src={proj.image}
                      alt={`${proj.name} mobile view`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* View project indicator on hover */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-[7px] bg-[#050505]/80 text-white font-bold py-1 px-2 rounded-full tracking-wider uppercase backdrop-blur-sm">View</span>
                    </div>
                  </div>
                </div>

                {/* Info Card block */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4 text-left">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{proj.name}</h3>
                      <span className="text-[8px] bg-white/[0.03] border border-white/[0.05] text-[#8e8e93] px-2 py-0.5 rounded-full font-mono uppercase">
                        {proj.industry}
                      </span>
                    </div>
                    <p className="text-xs text-[#8e8e93] leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE AUTO-SCROLLING MARQUEE */}
      <section className="py-20 relative overflow-hidden bg-white/[0.01] border-b border-white/[0.05]">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marquee-left 40s linear infinite;
          }
          .marquee-container:hover .animate-marquee-left {
            animation-play-state: paused;
          }
        ` }} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[400px] rounded-full bg-primary/[0.02] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Storefront Showcases
          </h2>
        </div>

        <div className="w-full overflow-hidden marquee-container py-3">
          <div className="animate-marquee-left flex gap-6">
            {[...PORTFOLIO_STORES, ...PORTFOLIO_STORES, ...PORTFOLIO_STORES].map((store, idx) => (
              <div
                key={idx}
                className="w-[200px] sm:w-[260px] md:w-[320px] flex flex-col rounded-2xl bg-[#09090b] border border-white/[0.05] overflow-hidden hover:border-primary/30 transition-all duration-500 shrink-0 shadow-sm hover:shadow-md"
                style={{ aspectRatio: "400/715" }}
              >
                <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/[0.05]" />
                </div>
                <div className="relative flex-1 w-full overflow-hidden bg-[#050505]">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] transition-all text-center"
          >
            <span>Explore All Portfolio Brands</span>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER */}
      <section className="py-24 px-6 relative bg-white/[0.01]">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 text-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Audited Case Outcomes
            </h2>
          </div>

          {/* Testimonial slider card */}
          <div className="relative min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full p-8 md:p-12 rounded-3xl glass-card flex flex-col gap-6 relative text-left shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(TESTIMONIALS[currentTestimonial].stars || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-5xl font-serif text-primary opacity-20 leading-none">“</span>
                </div>
                
                <p className="text-base sm:text-lg text-white italic leading-relaxed relative z-10 font-medium">
                  {TESTIMONIALS[currentTestimonial].quote}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono font-bold text-xs flex items-center justify-center">
                      {TESTIMONIALS[currentTestimonial].avatar || "SP"}
                    </span>
                    <div className="text-left">
                      <p className="font-bold text-white text-sm">
                        {TESTIMONIALS[currentTestimonial].author}
                      </p>
                      <p className="text-xs text-[#8e8e93]">
                        {TESTIMONIALS[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-primary/15 border border-primary/30 text-primary px-4 py-1.5 rounded-full font-bold font-mono text-center self-start sm:self-center">
                    {TESTIMONIALS[currentTestimonial].growth}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="absolute -bottom-8 flex justify-center gap-2.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentTestimonial === idx ? "bg-primary w-6" : "bg-white/10"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-bg-dark border-y border-white/[0.05] relative">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Auditing Process Details
            </h2>
          </div>

          {/* Accordion FAQ list */}
          <div className="flex flex-col gap-4 text-left">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white/[0.01] border border-white/[0.05] overflow-hidden transition-all duration-300 hover:border-primary/20"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left text-white hover:text-primary transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4.5 h-4.5 text-primary shrink-0" />
                      <span className="text-sm sm:text-base font-semibold">{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8e8e93] shrink-0 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#8e8e93] leading-relaxed border-t border-white/[0.03]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 px-6 relative overflow-hidden text-center bg-black border-t border-white/[0.05]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-8 items-center">
          <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
            Accelerate Growth
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-xl">
            Ready to Build Your Shopify Store?
          </h2>

          <p className="text-[#8e8e93] text-sm sm:text-base leading-relaxed max-w-lg">
            Let's construct a lightning-fast, high-converting checkout experience custom designed for your brand.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-primary hover:bg-[#2a6350] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(16,185,129,0.25)] text-center group"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <a
              href="https://wa.me/919917780656"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:bg-white/[0.02] text-center"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-xs text-[#8e8e93] pt-6 border-t border-white/[0.08] w-full max-w-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Dehradun, Uttarakhand, India</span>
            </div>
            <div className="hidden sm:block text-white/10">|</div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              <span>Registered Enterprise: SALEPXL</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

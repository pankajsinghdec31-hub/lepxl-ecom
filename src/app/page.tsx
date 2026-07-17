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
  Sparkles,
  Laptop,
  CheckCircle2,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryBox from "@/components/EnquiryBox";
import InteractiveFunnel from "@/components/InteractiveFunnel";
import ROICalculator from "@/components/ROICalculator";
import ABTestingSimulator from "@/components/ABTestingSimulator";
import AnimatedDashboard from "@/components/AnimatedDashboard";
import SkincarePDP from "@/components/SkincarePDP";
import StartProjectForm from "@/components/StartProjectForm";

// FAQ Items
const FAQ_ITEMS = [
  {
    q: "How long does a Shopify store build take?",
    a: "Standard builds require 2 to 3 weeks. Custom storefronts and complex integrations take 4 to 6 weeks. We prioritize optimization, speed tuning, and checkout validation."
  },
  {
    q: "Can you redesign an existing Shopify store?",
    a: "Yes. We revamp theme layouts, optimize mobile UX, and accelerate loading speeds while preserving order logs, collections, and customer records."
  },
  {
    q: "Do you build custom Shopify features?",
    a: "Absolutely. We engineer custom sections, option configurators, slide-out drawers, and API connections tailored to your inventory setups."
  },
  {
    q: "Do you create Shopify stores for dropshipping?",
    a: "Yes. We build D2C-centric dropshipping stores featuring custom supplier sync pipelines, optimized landing templates, and fast checkouts."
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

// Testimonials
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

// Curated Project Data
const HOME_PROJECTS: MockupConfig[] = [
  {
    name: "Discover Pilgrim",
    industry: "Skincare & Beauty",
    theme: "light",
    bgColor: "bg-[#faf8f5]",
    textColor: "text-[#2d2926]",
    primaryColor: "#cbf351",
    heroText: "SECRETS OF JEJU",
    heroSub: "Premium Korean Beauty Routines",
    products: [ { name: "Jeju Volcanic Mask", price: "₹699" }, { name: "French Vinotherapy Serum", price: "₹1,250" } ],
    image: "/wellness_mockup.png",
    description: "Bespoke Shopify OS 2.0 storefront featuring dynamic skincare routine builders, Jeju-secrets ingredient paths, and cart upsell recommendations."
  },
  {
    name: "Cosmix Superfoods",
    industry: "Plant-Based Nutrition",
    theme: "light",
    bgColor: "bg-[#fcfaf4]",
    textColor: "text-[#3c3f38]",
    primaryColor: "#10b981",
    heroText: "FIND YOUR MIX",
    heroSub: "Organic Plant-Based Superfoods",
    products: [ { name: "No-Bloat Mix", price: "₹599" }, { name: "Healthy Hair Blend", price: "₹680" } ],
    image: "/supplement_mockup.png",
    description: "Custom theme build integrating an interactive health quiz engine, bundle-box builder drawer, and subscription-box flows."
  },
  {
    name: "The Wheels Co",
    industry: "Automotive Accessories",
    theme: "dark",
    bgColor: "bg-[#0c0c0c]",
    textColor: "text-white",
    primaryColor: "#cbf351",
    heroText: "FORCE AHEAD",
    heroSub: "Premium Carbon Accessories",
    products: [ { name: "Carbon Steering", price: "₹24,999" }, { name: "Alloy Hubcaps", price: "₹4,500" } ],
    image: "/apparel_mockup.png",
    description: "Redesigned Shopify product layout templates and single-tap checkout modules, boosting AOV and checkout speeds."
  }
];

const LOGO_ROW_1 = [
  { src: "https://jhango-images.b-cdn.net/images/adil-quadri-logo.webp", alt: "Adil Quadri" },
  { src: "https://jhango-images.b-cdn.net/images/aumtea-logo.webp", alt: "Aumtea" },
  { src: "https://jhango-images.b-cdn.net/images/b5ive-logo.webp", alt: "B5ive" },
  { src: "https://jhango-images.b-cdn.net/images/biotastic-logo.webp", alt: "Biotastic" },
  { src: "https://jhango-images.b-cdn.net/images/logo-40.webp", alt: "Logo 40" },
  { src: "https://jhango-images.b-cdn.net/images/mojo-vibe.webp", alt: "Mojo Vibe" },
  { src: "https://jhango-images.b-cdn.net/images/varq-jewels-logo-jhango.webp", alt: "Varq Jewels" },
  { src: "https://jhango-images.b-cdn.net/images/amp-krafts.webp", alt: "AMP Krafts" },
  { src: "https://jhango-images.b-cdn.net/images/amorfi-logo.webp", alt: "Amorfi" },
  { src: "https://jhango-images.b-cdn.net/images/blissway-logo.webp", alt: "Blissway" },
  { src: "https://jhango-images.b-cdn.net/images/brown-logo.webp", alt: "Brown" },
  { src: "https://jhango-images.b-cdn.net/images/logo-55.webp", alt: "Logo 55" },
  { src: "https://jhango-images.b-cdn.net/images/logo-56.webp", alt: "Logo 56" },
  { src: "https://jhango-images.b-cdn.net/images/logo-58.webp", alt: "Logo 58" },
  { src: "https://jhango-images.b-cdn.net/images/logo-28.webp", alt: "Logo 28" },
  { src: "https://jhango-images.b-cdn.net/images/logo-29.webp", alt: "Logo 29" },
  { src: "https://jhango-images.b-cdn.net/images/logo-30.webp", alt: "Logo 30" },
  { src: "https://jhango-images.b-cdn.net/images/logo-31.webp", alt: "Logo 31" },
  { src: "https://jhango-images.b-cdn.net/images/logo-32.webp", alt: "Logo 32" },
  { src: "https://jhango-images.b-cdn.net/images/logo-33.webp", alt: "Logo 33" },
  { src: "https://jhango-images.b-cdn.net/images/logo-34.webp", alt: "Logo 34" },
  { src: "https://jhango-images.b-cdn.net/images/logo-35.webp", alt: "Logo 35" },
  { src: "https://jhango-images.b-cdn.net/images/logo-36.webp", alt: "Logo 36" },
  { src: "https://jhango-images.b-cdn.net/images/logo-37.webp", alt: "Logo 37" },
  { src: "https://jhango-images.b-cdn.net/images/logo-38.webp", alt: "Logo 38" },
  { src: "https://jhango-images.b-cdn.net/images/logo-39.webp", alt: "Logo 39" },
  { src: "https://jhango-images.b-cdn.net/images/logo-41.webp", alt: "Logo 41" },
  { src: "https://jhango-images.b-cdn.net/images/logo-42.webp", alt: "Logo 42" },
  { src: "https://jhango-images.b-cdn.net/images/logo-43.webp", alt: "Logo 43" },
  { src: "https://jhango-images.b-cdn.net/images/logo-44.webp", alt: "Logo 44" },
  { src: "https://jhango-images.b-cdn.net/images/logo-45.webp", alt: "Logo 45" },
  { src: "https://jhango-images.b-cdn.net/images/logo-46.webp", alt: "Logo 46" },
  { src: "https://jhango-images.b-cdn.net/images/logo-47.webp", alt: "Logo 47" },
  { src: "https://jhango-images.b-cdn.net/images/logo-48.webp", alt: "Logo 48" },
  { src: "https://jhango-images.b-cdn.net/images/logo-49.webp", alt: "Logo 49" },
  { src: "https://jhango-images.b-cdn.net/images/logo-50.webp", alt: "Logo 50" },
  { src: "https://jhango-images.b-cdn.net/images/logo-51.webp", alt: "Logo 51" }
];

const LOGO_ROW_2 = [
  { src: "https://jhango-images.b-cdn.net/images/logo-52.webp", alt: "Logo 52" },
  { src: "https://jhango-images.b-cdn.net/images/logo-53.webp", alt: "Logo 53" },
  { src: "https://jhango-images.b-cdn.net/images/logo-54.webp", alt: "Logo 54" },
  { src: "https://jhango-images.b-cdn.net/images/logo-lil.webp", alt: "Lil" },
  { src: "https://jhango-images.b-cdn.net/images/logo-luzito.webp", alt: "Luzito" },
  { src: "https://jhango-images.b-cdn.net/images/logo-rusty-brown.webp", alt: "Rusty Brown" },
  { src: "https://jhango-images.b-cdn.net/images/new-logo.webp", alt: "New Logo" },
  { src: "https://jhango-images.b-cdn.net/images/quantum-logo-1.webp", alt: "Quantum" },
  { src: "https://jhango-images.b-cdn.net/images/runbugz-logo.webp", alt: "RunBugz" },
  { src: "https://jhango-images.b-cdn.net/images/sleep-shell.webp", alt: "Sleep Shell" },
  { src: "https://jhango-images.b-cdn.net/images/space-age-foods-logo.webp", alt: "Space Age Foods" },
  { src: "https://jhango-images.b-cdn.net/images/wag-wonders-logo.webp", alt: "Wag Wonders" },
  { src: "https://jhango-images.b-cdn.net/images/wednesday-lifestyle-logo-jhango.webp", alt: "Wednesday Lifestyle" },
  { src: "https://jhango-images.b-cdn.net/images/arsya-logo.webp", alt: "Arsya" },
  { src: "https://jhango-images.b-cdn.net/images/aryaki-logo.webp", alt: "Aryaki" },
  { src: "https://jhango-images.b-cdn.net/images/boujee-beauty.webp", alt: "Boujee Beauty" },
  { src: "https://jhango-images.b-cdn.net/images/cosmaya-logo.webp", alt: "Cosmaya" },
  { src: "https://jhango-images.b-cdn.net/images/invisel-logo.webp", alt: "Invisel" },
  { src: "https://jhango-images.b-cdn.net/images/logo-10.webp", alt: "Logo 10" },
  { src: "https://jhango-images.b-cdn.net/images/logo-12.webp", alt: "Logo 12" },
  { src: "https://jhango-images.b-cdn.net/images/logo-13.webp", alt: "Logo 13" },
  { src: "https://jhango-images.b-cdn.net/images/logo-14.webp", alt: "Logo 14" },
  { src: "https://jhango-images.b-cdn.net/images/logo-19.webp", alt: "Logo 19" },
  { src: "https://jhango-images.b-cdn.net/images/logo-2.webp", alt: "Logo 2" },
  { src: "https://jhango-images.b-cdn.net/images/logo-20.webp", alt: "Logo 20" },
  { src: "https://jhango-images.b-cdn.net/images/logo-21.webp", alt: "Logo 21" },
  { src: "https://jhango-images.b-cdn.net/images/logo-22.webp", alt: "Logo 22" },
  { src: "https://jhango-images.b-cdn.net/images/logo-24.webp", alt: "Logo 24" },
  { src: "https://jhango-images.b-cdn.net/images/logo-25.webp", alt: "Logo 25" },
  { src: "https://jhango-images.b-cdn.net/images/logo-26.webp", alt: "Logo 26" },
  { src: "https://jhango-images.b-cdn.net/images/logo-5.webp", alt: "Logo 5" },
  { src: "https://jhango-images.b-cdn.net/images/logo-7.webp", alt: "Logo 7" },
  { src: "https://jhango-images.b-cdn.net/images/logo-8.webp", alt: "Logo 8" },
  { src: "https://jhango-images.b-cdn.net/images/logo-9.webp", alt: "Logo 9" },
  { src: "https://jhango-images.b-cdn.net/images/logo-primary-2026-03-24-1.webp", alt: "Logo Primary" },
  { src: "https://jhango-images.b-cdn.net/images/logo.webp", alt: "Logo" },
  { src: "https://jhango-images.b-cdn.net/images/sasto-logo.webp", alt: "Sasto" },
  { src: "https://jhango-images.b-cdn.net/images/vanalaya-logo.webp", alt: "Vanalaya" },
  { src: "https://jhango-images.b-cdn.net/images/woof-misitry.webp", alt: "Woof Ministry" }
];

const PORTFOLIO_IMAGES_ROW1 = [
  { src: "https://jhango-images.b-cdn.net/images/ownly-club.webp", alt: "Ownly Club" },
  { src: "https://jhango-images.b-cdn.net/images/pretty-kitty.webp", alt: "Pretty Kitty" },
  { src: "https://jhango-images.b-cdn.net/images/sobo-beauty.webp", alt: "Sobo Beauty" },
  { src: "https://jhango-images.b-cdn.net/images/well-essentials.webp", alt: "Well Essentials" },
  { src: "https://jhango-images.b-cdn.net/images/wyrd-in.webp", alt: "Wyrd" },
  { src: "https://jhango-images.b-cdn.net/images/amarose.webp", alt: "Amarose" },
  { src: "https://jhango-images.b-cdn.net/images/anukiran.webp", alt: "Anukiran" },
  { src: "https://jhango-images.b-cdn.net/images/biotastic.webp", alt: "Biotastic" }
];

const PORTFOLIO_IMAGES_ROW2 = [
  { src: "https://jhango-images.b-cdn.net/images/crumbbs-in.webp", alt: "Crumbbs" },
  { src: "https://jhango-images.b-cdn.net/images/floof-and-co.webp", alt: "Floof & Co" },
  { src: "https://jhango-images.b-cdn.net/images/kaayu-world.webp", alt: "Kaayu World" },
  { src: "https://jhango-images.b-cdn.net/images/kohkayn-com.webp", alt: "Kohkayn" },
  { src: "https://jhango-images.b-cdn.net/images/newdru.webp", alt: "Newdru" },
  { src: "https://jhango-images.b-cdn.net/images/skin-basics.webp", alt: "Skin Basics" },
  { src: "https://jhango-images.b-cdn.net/images/sleep-shell-2.webp", alt: "Sleep Shell" },
  { src: "https://jhango-images.b-cdn.net/images/swadezi.webp", alt: "Swadezi" }
];

const CAROUSEL_ITEMS = [
  {
    title: "Instant CRO Audit",
    subtitle: "Identify conversion leaks in your funnel",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejA3c2s2OTMxbnNxNXF4YW5tcTRkZ3FmZXkyYjFidGFpdTgzczYydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26EOCf4GvA6p9w8kE/giphy.gif",
    link: "#audit",
    badge: "Lead Diagnostics"
  },
  {
    title: "OS 2.0 Custom Themes",
    subtitle: "Clean Liquid engine for lightning-fast loads",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejc1b2c4OGM3M3VzN3ZndjR0dmN5ZTN1M3N5bTFzbnN5bmFzbWdxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378c0upZm7TqIDrG/giphy.gif",
    link: "#capabilities",
    badge: "Speed Engineered"
  },
  {
    title: "Smart Slide Cart Drawers",
    subtitle: "Increase average order values natively",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3h0Y3dyNjM5M3RwbjZtcDFoOTV4NGdmaDZ0dHc4dmtsZXo4d3A1MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xezQGU5RcCDj35S/giphy.gif",
    link: "#capabilities",
    badge: "Conversion Built"
  },
  {
    title: "Headless Next.js Storefronts",
    subtitle: "React-powered checks at custom scale",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3d6bms4NDNkbzBwMGpxdzBrOTI0MG5zOTk4bGF0OTAwcjRpb3AwOWYmcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t3s3iY3s0rKAw/giphy.gif",
    link: "#capabilities",
    badge: "Headless Scale"
  }
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState<"speed" | "apps" | "cro">("speed");
  const [galleryTab, setGalleryTab] = useState<"home" | "product" | "collection">("home");

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
    <div className="relative overflow-hidden bg-bg-dark text-text-light min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 16px)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-100% - 16px)); }
          100% { transform: translateX(0); }
        }
        .marquee-container {
          display: flex;
          overflow: hidden;
          user-select: none;
          gap: 16px;
          width: 100%;
        }
        .marquee-content {
          flex-shrink: 0;
          display: flex;
          justify-content: space-around;
          min-width: 100%;
          gap: 16px;
          animation: scroll-left var(--marquee-speed, 50s) linear infinite;
        }
        .marquee-content-reverse {
          flex-shrink: 0;
          display: flex;
          justify-content: space-around;
          min-width: 100%;
          gap: 16px;
          animation: scroll-right var(--marquee-speed, 50s) linear infinite;
        }
        .marquee-pause:hover .marquee-content,
        .marquee-pause:hover .marquee-content-reverse {
          animation-play-state: paused;
        }
      `}} />
      {/* FLOATING NEON BACKDROP DECORATIONS */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[400px] rounded-full bg-primary/3 blur-[130px] animate-blob-slow-1 pointer-events-none" />
      <div className="absolute top-[15%] right-[-5%] w-[40%] h-[500px] rounded-full bg-purple-600/3 blur-[150px] pointer-events-none" />
      <div className="absolute top-[50%] left-[5%] w-[35%] h-[400px] rounded-full bg-primary/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[8%] right-[5%] w-[35%] h-[450px] rounded-full bg-purple-600/3 blur-[130px] pointer-events-none" />

      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-8 pb-16 px-6 z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left animate-fade-blur">
            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-black tracking-tight text-white leading-none">
              We Engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand-lime font-grotesk uppercase">
                Shopify Stores
              </span> <br />
              That Convert.
            </h1>

            <p className="text-[#8e8e93] text-base sm:text-lg leading-relaxed max-w-xl">
              Sub-1.2s mobile loading speeds, custom app logic, and high-converting checkouts designed for scaling D2C brands. We replace heavy apps with clean, native code.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
              <a
                href="#audit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-brand-lime hover:bg-[#b0dd40] transition-all duration-300 neon-shadow-lime hover:scale-[1.02] text-center"
              >
                <span>Start Free CRO Audit</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300 text-center hover:bg-white/[0.02]"
              >
                <span>View Case Studies</span>
              </Link>
            </div>

            {/* Credibility Indicator */}
            <div className="pt-6 border-t border-white/[0.05] flex items-center gap-6 mt-4">
              <div className="flex -space-x-3">
                <span className="w-9 h-9 rounded-full bg-[#16181c] border-2 border-[#0a0b0d] flex items-center justify-center text-[10px] font-bold text-[#8e8e93]">SB</span>
                <span className="w-9 h-9 rounded-full bg-[#16181c] border-2 border-[#0a0b0d] flex items-center justify-center text-[10px] font-bold text-[#8e8e93]">WE</span>
                <span className="w-9 h-9 rounded-full bg-[#16181c] border-2 border-[#0a0b0d] flex items-center justify-center text-[10px] font-bold text-[#8e8e93]">SZ</span>
              </div>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                Trusted by <span className="text-white font-semibold">100+ brands</span> to build, redesign, and speed-tune storefronts.
              </p>
            </div>
          </div>

          {/* Right Column Lead Form */}
          <div className="lg:col-span-5 relative z-20 w-full animate-fade-blur" style={{ animationDelay: "0.2s" }}>
            <StartProjectForm />
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS TICKER */}
      <section className="bg-white/[0.01] py-8 border-y border-white/[0.05] relative overflow-hidden z-10">
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

      {/* 3. HORIZONTAL SCROLL SHOWCASE CAROUSEL (Directly below Hero) */}
      <section className="relative px-0 pt-12 pb-6 z-10">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">Explore Platform</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">Agency Features & Tools</h2>
        </div>
        
        <div className="overflow-x-auto hide-scrollbar min-w-0 grid px-6">
          <ul className="flex gap-5 min-w-0 *:flex-[0_0_19.5rem] md:*:flex-[0_0_24rem] xl:*:flex-[0_0_28rem] pb-4">
            {CAROUSEL_ITEMS.map((item, idx) => (
              <li key={idx}>
                <div className="group grid rounded-2xl gap-3 transition hover:text-brand-lime relative p-4 bg-[#16181c] border border-white/[0.06] hover:border-brand-lime/30 transition-all duration-300">
                  <a href={item.link} className="absolute inset-0 z-10">
                    <span className="sr-only">Open {item.title}</span>
                  </a>
                  
                  <figure className="group relative overflow-hidden rounded-xl aspect-[1.77] w-full bg-[#0a0b0d]">
                    {/* Media Image Showcase */}
                    <img
                      alt={item.title}
                      loading="lazy"
                      src={item.image}
                      className="transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none absolute inset-0 object-cover size-full opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating top badge */}
                    <span className="absolute top-3 left-3 bg-[#0a0b0d]/80 text-white text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border border-white/10">
                      {item.badge}
                    </span>
                  </figure>

                  <div className="text-left flex flex-col gap-1">
                    <h3 className="uppercase font-grotesk truncate text-sm font-bold text-white group-hover:text-brand-lime transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#8e8e93] text-xs truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. PREMIUM STOREFRONT GALLERIES */}
      <section className="py-24 px-6 bg-[#08090a] relative z-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-8">
            <div className="flex flex-col gap-3 text-left">
              <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
                Design Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-grotesk">
                Bespoke Storefront Galleries
              </h2>
              <p className="text-[#8e8e93] text-sm max-w-xl">
                Explore our high-fidelity layout components built specifically for Shopify. We design with a visual-first approach focusing on UX clarity.
              </p>
            </div>

            {/* Gallery Tabs */}
            <div className="flex bg-[#16181c] p-1.5 rounded-xl border border-white/[0.06] w-max md:self-end">
              {[
                { id: "home", label: "Homepages" },
                { id: "product", label: "Product Pages" },
                { id: "collection", label: "Collections" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setGalleryTab(tab.id as any)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    galleryTab === tab.id
                      ? "bg-brand-lime text-black"
                      : "text-[#8e8e93] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryTab === "home" && [
              {
                title: "Discover Pilgrim Jeju Secrets Splash",
                tag: "Beauty & Routine Splash",
                metric: "+42% Mobile CTR",
                image: "/wellness_mockup.png",
                desc: "High-impact editorial storytelling hero connecting customers with JeJu island volcanic skincare ingredients."
              },
              {
                title: "Cosmix Wellness Find Your Mix Grid",
                tag: "Wellness Editorial Catalog",
                metric: "5.4% Checkout Conv",
                image: "/supplement_mockup.png",
                desc: "Nature-inspired, clean grid layouts guiding customers to personalized organic protein superfoods."
              },
              {
                title: "The Wheels Co Premium Hero",
                tag: "Luxury Dark Automotive",
                metric: "1.2s Load Speed",
                image: "/apparel_mockup.png",
                desc: "Bold high-contrast layout showing luxury carbon automotive steering wheels with full interactive overlays."
              }
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col gap-4 text-left">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] group-hover:border-brand-lime/20 transition-all duration-500 shadow-md">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 right-4 bg-black/80 text-brand-lime font-mono text-[9px] font-bold py-1 px-2.5 rounded-full border border-brand-lime/20 backdrop-blur-sm shadow-lg">
                    {item.metric}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#8e8e93] font-mono uppercase tracking-wider">{item.tag}</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-lime transition-colors">{item.title}</h4>
                  <p className="text-xs text-[#7a7a7a] mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            {galleryTab === "product" && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full">
                <SkincarePDP />
              </div>
            )}

            {galleryTab === "collection" && [
              {
                title: "Ultra-Fast Filter & Facet Drawer",
                tag: "Responsive Navigation",
                metric: "Sub-0.4s Query Speeds",
                image: "/wellness_mockup.png",
                desc: "Shopify Search & Discovery API integration mapping collections without reloading the storefront."
              },
              {
                title: "Single-Tap ATC Collection Cards",
                tag: "Quick Buy Integration",
                metric: "+24% Collection ATC",
                image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejA3c2s2OTMxbnNxNXF4YW5tcTRkZ3FmZXkyYjFidGFpdTgzczYydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26EOCf4GvA6p9w8kE/giphy.gif",
                desc: "Visual swatches and size grid overlaid directly on catalog grids for fast purchasing flows."
              },
              {
                title: "Organic Cosmix Mix Finder Bar",
                tag: "Custom Discovery",
                metric: "+15% Product Discovery",
                image: "/supplement_mockup.png",
                desc: "Sticky navigation banner matching customer health symptoms to relevant collection pages instantly."
              }
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col gap-4 text-left">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] group-hover:border-brand-lime/20 transition-all duration-500 shadow-md">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 right-4 bg-black/80 text-brand-lime font-mono text-[9px] font-bold py-1 px-2.5 rounded-full border border-brand-lime/20 backdrop-blur-sm shadow-lg">
                    {item.metric}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#8e8e93] font-mono uppercase tracking-wider">{item.tag}</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-lime transition-colors">{item.title}</h4>
                  <p className="text-xs text-[#7a7a7a] mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CAPABILITY SHOWCASE WITH INTERACTIVE TABS */}
      <section id="capabilities" className="py-24 px-6 bg-[#0c0d10]/40 border-y border-white/[0.05] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
              Agency Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-grotesk">
              Engineered To Convert
            </h2>
            <p className="text-[#8e8e93] text-sm leading-relaxed">
              We replace unstable third-party apps with custom visual logic, resulting in sub-1.5s mobile loading speeds and dynamic buying options.
            </p>

            {/* Interactive Capability Tab Triggers */}
            <div className="flex flex-wrap justify-center gap-3 mt-6 bg-[#16181c]/50 p-2 rounded-2xl border border-white/[0.06] w-max mx-auto">
              {[
                { id: "speed", label: "Speed Tuning" },
                { id: "apps", label: "Custom App Features" },
                { id: "cro", label: "CRO Simulator" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-brand-lime text-black"
                      : "text-[#8e8e93] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Tab Contents */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {activeTab === "speed" && (
                <motion.div
                  key="speed-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                    <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">01. Architecture</span>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight font-grotesk">Shopify Speed Optimization</h3>
                    <p className="text-[#8e8e93] text-sm leading-relaxed">
                      We audit and rebuild heavy scripts. By implementing lazy-loaded assets, code-deferred scripts, and custom liquid components, we achieve clean scores under 1.5 seconds.
                    </p>
                    <div className="flex gap-8 border-t border-white/5 pt-6 mt-2">
                      <div>
                        <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">Mobile Load Speed</span>
                        <span className="block text-2xl font-bold text-white font-mono mt-1">98/100</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">Conversion Boost</span>
                        <span className="block text-2xl font-bold text-brand-lime font-mono mt-1">+42% Avg.</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-7 group">
                    <div className="w-full aspect-[16/10] rounded-2xl bg-[#16181c] border border-white/[0.08] overflow-hidden shadow-2xl transition-all duration-500 hover:border-brand-lime/30 relative">
                      <div className="px-4 py-2.5 bg-[#0c0d10]/60 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/60" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                          <span className="w-2 h-2 rounded-full bg-green-500/60" />
                        </div>
                        <span className="text-[9px] text-[#8e8e93] font-mono">boutique.salepxl.com/shop</span>
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
                            <div key={i} className="flex flex-col gap-1.5 p-2 rounded-xl bg-white/[0.01] border border-white/5 hover:border-brand-lime/20 transition-all duration-300">
                              <div className="aspect-[4/5] w-full rounded-lg overflow-hidden relative bg-neutral-900">
                                <img src={item.img} alt="" className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[8px] font-bold text-white truncate">{item.title}</span>
                              <span className="text-[8px] text-brand-lime font-mono">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "apps" && (
                <motion.div
                  key="apps-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  <div className="lg:col-span-7 group">
                    <div className="w-full aspect-[16/10] rounded-2xl bg-[#16181c] border border-white/[0.08] overflow-hidden shadow-2xl transition-all duration-500 hover:border-brand-lime/30 relative">
                      <div className="px-4 py-2.5 bg-[#0c0d10]/60 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/60" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                          <span className="w-2 h-2 rounded-full bg-green-500/60" />
                        </div>
                        <span className="text-[9px] text-[#8e8e93] font-mono">carbon.salepxl.com/products/steering</span>
                        <span className="w-2 h-2 bg-white/10 rounded-full" />
                      </div>
                      <div className="relative w-full h-[calc(100%-37px)] bg-[#0c0c0c] p-6 flex items-start gap-4 text-left">
                        <div className="flex-1 flex flex-col gap-3">
                          <div className="aspect-[4/3] w-full rounded-xl bg-white/5 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&q=80" alt="" className="w-full h-full object-cover" />
                          </div>
                          <h4 className="text-[10px] font-bold text-white">Carbon Steering Wheel</h4>
                          <span className="text-[10px] text-brand-lime font-mono">₹24,999</span>
                        </div>
                        {/* Slide-out cart mock */}
                        <div className="w-[150px] h-full bg-[#121214] border-l border-white/10 p-3 absolute right-0 top-0 bottom-0 flex flex-col justify-between shadow-2xl z-20">
                          <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                              <span className="text-[8px] font-bold text-white font-mono">CART (1)</span>
                            </div>
                            <div className="flex gap-2 items-center bg-white/[0.02] p-1.5 rounded border border-white/5">
                              <div className="w-6 h-6 rounded bg-white/10 overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&q=80" alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-grow min-w-0">
                                <p className="text-[6px] text-white font-bold truncate">Steering Wheel</p>
                                <p className="text-[6px] text-brand-lime font-mono">₹24,999</p>
                              </div>
                            </div>
                          </div>
                          <button className="w-full py-2 bg-brand-lime text-black text-[8px] font-bold uppercase rounded-lg">Checkout</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                    <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">02. Engagement</span>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight font-grotesk">Custom Cart & Option Drawers</h3>
                    <p className="text-[#8e8e93] text-sm leading-relaxed">
                      We develop custom upsell modules, sticky add-to-carts, product builders, and options drawers directly inside themes. No subscription apps required.
                    </p>
                    <div className="flex gap-8 border-t border-white/5 pt-6 mt-2">
                      <div>
                        <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">AOV Increase</span>
                        <span className="block text-2xl font-bold text-white font-mono mt-1">+24% Avg.</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider">App Fees Saved</span>
                        <span className="block text-2xl font-bold text-brand-lime font-mono mt-1">$450/mo Avg.</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "cro" && (
                <motion.div
                  key="cro-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col gap-6"
                >
                  <div className="text-left max-w-2xl mb-2">
                    <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">03. Optimizations</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-grotesk">A/B Conversion Rate Sandbox</h3>
                    <p className="text-[#8e8e93] text-sm leading-relaxed mt-2">
                      Compare layout components directly. Play with the simulator below to toggle optimization points and compare conversion variables.
                    </p>
                  </div>
                  <div className="w-full p-6 rounded-3xl bg-[#16181c] border border-white/[0.06] shadow-xl">
                    <ABTestingSimulator />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6. OUR STORE SCALE PROCESS */}
      <section className="py-24 px-6 bg-bg-dark border-b border-white/[0.05] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-grotesk">
              Our Store Rebuild Process
            </h2>
            <p className="text-[#8e8e93] text-sm">
              We follow a rigorous, 4-step engineering pipeline to take D2C stores from bloated and slow to optimized scale machines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Funnel & Speed Diagnostics",
                desc: "We run deep profile audits on your storefront scripts and cart checkout flow to identify conversion friction."
              },
              {
                step: "02",
                title: "Ultra-Premium UI/UX Design",
                desc: "We design custom layout wireframes tailored for your products, focusing heavily on lightning-fast routine builders and single-tap actions."
              },
              {
                step: "03",
                title: "Bespoke Clean Code Rebuild",
                desc: "We write lightweight Shopify OS 2.0 themes or headless Next.js frontends, completely removing unstable app scripts."
              },
              {
                step: "04",
                title: "Post-Launch A/B Testing",
                desc: "We continuously A/B test layouts, pricing strategies, and slide drawers to optimize your average order value (AOV)."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#16181c] border border-white/[0.06] flex flex-col gap-6 text-left hover:border-brand-lime/10 transition-all duration-300 relative group">
                <span className="text-5xl font-black text-white/5 group-hover:text-brand-lime/10 transition-colors font-grotesk absolute top-4 right-6 select-none font-bold">
                  {item.step}
                </span>
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-bold text-white group-hover:text-brand-lime transition-colors mt-4">{item.title}</h4>
                  <p className="text-xs text-[#8e8e93] leading-relaxed mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE ROI CALCULATOR SECTION */}
      <section id="roi-calculator" className="py-24 px-6 relative overflow-hidden border-b border-white/[0.05] z-10 bg-[#08090a]">
        <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-lime/[0.01] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-purple-600/[0.01] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-12 text-center items-center">
          <div className="max-w-3xl flex flex-col gap-4">
            <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
              ROI Simulator
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase font-grotesk">
              Stop Leaking Sales. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-lime">
                Unlock Your Store's True Potential
              </span>
            </h2>
            <p className="text-[#8e8e93] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              When page speed increases and mobile friction disappears, conversion rates spike—lifting D2C revenues without increasing ad spend.
            </p>
          </div>
          
          <div className="w-full max-w-5xl">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* 6. TRUSTED BY 800+ LEADING BRANDS LOGO SECTION */}
      <section className="py-12 bg-white relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 text-center items-center mb-8">
          <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest font-black">
            Trusted by 800+ Leading Brands
          </span>
        </div>

        {/* Row 1 Logos */}
        <div className="marquee-container mb-6">
          <div className="marquee-content" style={{ "--marquee-speed": "40s" } as React.CSSProperties}>
            {LOGO_ROW_1.map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto object-contain mx-6 opacity-85 hover:opacity-100 transition-opacity duration-300 select-none pointer-events-none"
                loading="lazy"
              />
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true" style={{ "--marquee-speed": "40s" } as React.CSSProperties}>
            {LOGO_ROW_1.map((logo, idx) => (
              <img
                key={idx + "-dup"}
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto object-contain mx-6 opacity-85 hover:opacity-100 transition-opacity duration-300 select-none pointer-events-none"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Row 2 Logos - Reverse */}
        <div className="marquee-container">
          <div className="marquee-content-reverse" style={{ "--marquee-speed": "40s" } as React.CSSProperties}>
            {LOGO_ROW_2.map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto object-contain mx-6 opacity-85 hover:opacity-100 transition-opacity duration-300 select-none pointer-events-none"
                loading="lazy"
              />
            ))}
          </div>
          <div className="marquee-content-reverse" aria-hidden="true" style={{ "--marquee-speed": "40s" } as React.CSSProperties}>
            {LOGO_ROW_2.map((logo, idx) => (
              <img
                key={idx + "-dup"}
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto object-contain mx-6 opacity-85 hover:opacity-100 transition-opacity duration-300 select-none pointer-events-none"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. SHOPIFY PORTFOLIO MARQUEE SHOWCASE */}
      <section className="py-24 relative overflow-hidden bg-bg-dark border-b border-white/[0.05] z-10">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col gap-4 text-center">
          <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
            Recent Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-grotesk">
            Stores We've Built & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">Transformed</span>
          </h2>
        </div>

        {/* Row 1 Marquee */}
        <div className="marquee-container marquee-pause mb-6">
          <div className="marquee-content" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW1.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-brand-lime/30 transition-all duration-300">
                <img src={img.src} alt={img.alt} className="w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW1.map((img, idx) => (
              <div key={idx + "-dup"} className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-brand-lime/30 transition-all duration-300">
                <img src={img.src} alt={img.alt} className="w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Marquee - Reverse */}
        <div className="marquee-container marquee-pause">
          <div className="marquee-content-reverse" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW2.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-brand-lime/30 transition-all duration-300">
                <img src={img.src} alt={img.alt} className="w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="marquee-content-reverse" aria-hidden="true" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW2.map((img, idx) => (
              <div key={idx + "-dup"} className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-brand-lime/30 transition-all duration-300">
                <img src={img.src} alt={img.alt} className="w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:bg-white/[0.02]">
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4 text-brand-lime" />
          </Link>
        </div>
      </section>

      {/* 9. BEFORE & AFTER PERFORMANCE COMPARISON */}
      <section className="py-24 px-6 bg-[#0c0d10]/40 border-y border-white/[0.05] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
              Engineering Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-grotesk">
              Legacy vs. SalePXL Rebuilds
            </h2>
            <p className="text-[#8e8e93] text-sm">
              We replace sluggish, heavy pre-built templates with optimized custom engines. The difference is measurable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Legacy Store */}
            <div className="p-8 rounded-3xl bg-[#16181c]/40 border border-red-500/10 flex flex-col gap-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/2 rounded-full blur-3xl pointer-events-none" />
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-4">
                <h4 className="text-lg font-bold text-white">Traditional App-Heavy Theme</h4>
                <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/25 px-3 py-1 rounded-full font-mono uppercase font-bold">
                  Legacy
                </span>
              </div>
              
              <ul className="flex flex-col gap-4">
                {[
                  { label: "Mobile Speed Index", val: "6.8 seconds (Slow)", ok: false },
                  { label: "Apps Installed", val: "28 third-party apps loading script tags", ok: false },
                  { label: "Codebase Size", val: "8.4 MB of bloated Javascript/CSS", ok: false },
                  { label: "Add-To-Cart Friction", val: "Multi-click redirect to slow cart pages", ok: false },
                  { label: "Average Mobile Conversion", val: "1.1% to 1.5%", ok: false }
                ].map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-[#8e8e93] font-semibold">{item.label}</span>
                    <span className="text-red-400 font-mono font-bold text-right">{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SalePXL Optimized Store */}
            <div className="p-8 rounded-3xl bg-[#16181c]/70 border border-brand-lime/10 flex flex-col gap-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-4">
                <h4 className="text-lg font-bold text-white">SalePXL Custom Engine</h4>
                <span className="text-[10px] bg-brand-lime/10 text-brand-lime border border-brand-lime/25 px-3 py-1 rounded-full font-mono uppercase font-bold neon-shadow-lime">
                  Optimized
                </span>
              </div>
              
              <ul className="flex flex-col gap-4">
                {[
                  { label: "Mobile Speed Index", val: "1.2 seconds (Instant)", ok: true },
                  { label: "Apps Installed", val: "0 apps (Fully coded custom feature logic)", ok: true },
                  { label: "Codebase Size", val: "1.2 MB lightweight bundle asset load", ok: true },
                  { label: "Add-To-Cart Friction", val: "Instant AJAX slide drawer with upsell hooks", ok: true },
                  { label: "Average Mobile Conversion", val: "4.2% to 4.86%", ok: true }
                ].map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-[#8e8e93] font-semibold">{item.label}</span>
                    <span className="text-brand-lime font-mono font-bold text-right">{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS SLIDER */}
      <section className="py-24 px-6 relative bg-white/[0.01] z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 text-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-grotesk uppercase">
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
                className="w-full p-8 md:p-12 rounded-3xl bg-[#16181c] border border-white/[0.06] flex flex-col gap-6 relative text-left shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-[#cbf351]">
                    {[...Array(TESTIMONIALS[currentTestimonial].stars || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-5xl font-serif text-[#cbf351] opacity-20 leading-none">“</span>
                </div>
                
                <p className="text-base sm:text-lg text-white italic leading-relaxed relative z-10 font-medium">
                  {TESTIMONIALS[currentTestimonial].quote}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#cbf351]/10 border border-[#cbf351]/20 text-[#cbf351] font-mono font-bold text-xs flex items-center justify-center">
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
                  <span className="text-[10px] bg-[#cbf351]/15 border border-[#cbf351]/30 text-[#cbf351] px-4 py-1.5 rounded-full font-bold font-mono text-center self-start sm:self-center">
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
                    currentTestimonial === idx ? "bg-brand-lime w-6" : "bg-white/10"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="py-24 px-6 bg-bg-dark border-y border-white/[0.05] relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-grotesk">
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
                  className="rounded-2xl bg-[#16181c]/40 border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-brand-lime/20"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left text-white hover:text-[#cbf351] transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4.5 h-4.5 text-brand-lime shrink-0" />
                      <span className="text-sm sm:text-base font-semibold">{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8e8e93] shrink-0 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180 text-brand-lime" : ""
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

      {/* 10. FINAL NEON CTA BANNER SECTION */}
      <section id="audit" className="py-24 px-6 relative overflow-hidden text-center bg-black border-t border-white/[0.05] z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-lime/[0.01] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-8 items-center p-12 rounded-3xl bg-[#16181c]/50 border border-brand-lime/20 neon-shadow-lime">
          <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
            Accelerate Growth
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-xl font-grotesk uppercase">
            Ready to Build Your Shopify Store?
          </h2>

          <p className="text-[#8e8e93] text-sm sm:text-base leading-relaxed max-w-lg">
            Let's construct a lightning-fast, high-converting checkout experience custom designed for your brand. Get a free audit and consultation today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-brand-lime hover:bg-[#b0dd40] transition-all duration-300 text-center"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a
              href="https://wa.me/919917780656"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:bg-white/[0.02] text-center"
            >
              <Phone className="w-4 h-4 text-brand-lime" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-xs text-[#8e8e93] pt-6 border-t border-white/[0.08] w-full max-w-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-lime" />
              <span>Dehradun, Uttarakhand, India</span>
            </div>
            <div className="hidden sm:block text-white/10">|</div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-brand-lime" />
              <span>Registered Enterprise: SALEPXL</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

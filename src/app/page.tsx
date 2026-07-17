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
  Activity,
  ThumbsUp,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryBox from "@/components/EnquiryBox";
import InteractiveFunnel from "@/components/InteractiveFunnel";

import AnimatedDashboard from "@/components/AnimatedDashboard";
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

// Google Reviews data for scrolling marquee
const GOOGLE_REVIEWS_ROW1 = [
  {
    name: "Monica Fernandes",
    avatarColor: "bg-amber-600",
    avatarText: "MF",
    metadata: "Local Guide · 28 reviews · 10 photos",
    stars: 5,
    timeAgo: "2 months ago",
    text: "We run 50+ A/B tests a quarter with their CRO retainer. Every test teaches us something about our customers. They run experiments rigorously and never call winners early. Real CRO done right."
  },
  {
    name: "James Park",
    avatarColor: "bg-rose-600",
    avatarText: "JP",
    metadata: "Local Guide · 13 reviews · 5 photos",
    stars: 5,
    timeAgo: "5 months ago",
    text: "The gamified cart drawer increased our AOV by 35%. Customers actually engage with the cart now — adding qualifying products to unlock free shipping. Beautifully built and never breaks."
  },
  {
    name: "Deepak Nair",
    avatarColor: "bg-blue-600",
    avatarText: "DN",
    metadata: "Local Guide · 36 reviews · 18 photos",
    stars: 5,
    timeAgo: "7 months ago",
    text: "SalePXL understands Shopify at a code level. They've solved problems for us that other agencies said weren't possible — custom Liquid logic, Storefront API hacks, Shopify Functions. Engineering excellence."
  },
  {
    name: "Malay Trivedi",
    avatarColor: "bg-sky-500",
    avatarText: "MT",
    metadata: "Local Guide · 18 reviews",
    stars: 5,
    timeAgo: "2 weeks ago",
    text: "SalePXL completely transformed our store. Conversion rate doubled in a month. Krish and team are highly technical, and actually understand e-commerce revenue. Best agency in India hands down."
  }
];

const GOOGLE_REVIEWS_ROW2 = [
  {
    name: "Chris Hanson",
    avatarColor: "bg-purple-600",
    avatarText: "CH",
    metadata: "Local Guide · 17 reviews · 6 photos",
    stars: 5,
    timeAgo: "4 months ago",
    text: "Shopify integration now syncs perfectly with our ERP software. Inventory is a breeze across 4 retail outlets and the e-commerce site. Real-time updates prevent oversells."
  },
  {
    name: "Sneha Rao",
    avatarColor: "bg-red-500",
    avatarText: "SR",
    metadata: "Local Guide · 21 reviews · 9 photos",
    stars: 5,
    timeAgo: "3 months ago",
    text: "ChatGPT-powered concierge handles 60% of customer queries automatically — sizing, returns, product recommendations. Customer support team can now focus on actual issues. Incredible build."
  },
  {
    name: "Mark Donovan",
    avatarColor: "bg-indigo-600",
    avatarText: "MD",
    metadata: "Local Guide · 44 reviews · 20 photos",
    stars: 5,
    timeAgo: "8 months ago",
    text: "Best agency partner we've had across 12 years of running e-commerce brands. They are like an extension of our internal team — proactive, accountable, and technically world-class."
  },
  {
    name: "Alisha Kapoor",
    avatarColor: "bg-emerald-600",
    avatarText: "AK",
    metadata: "Local Guide · 32 reviews · 13 photos",
    stars: 5,
    timeAgo: "6 months ago",
    text: "Five stores built with SalePXL and counting. Consistent quality every single time, regardless of project size. They scale operations beautifully and don't drop the ball as their team grows."
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
  const [showFormModal, setShowFormModal] = useState(false);

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
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[400px] rounded-full bg-[#36F4A4]/[0.02] blur-[130px] animate-blob-slow-1 pointer-events-none" />
      <div className="absolute top-[15%] right-[-5%] w-[40%] h-[500px] rounded-full bg-[#051517]/60 blur-[150px] pointer-events-none" />
      <div className="absolute top-[50%] left-[5%] w-[35%] h-[400px] rounded-full bg-[#36F4A4]/[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[8%] right-[5%] w-[35%] h-[450px] rounded-full bg-[#051517]/50 blur-[130px] pointer-events-none" />

      {/* 1. SHOPIFY-STYLE HERO — full bleed video, text bottom-left */}
      <section className="relative w-full h-screen overflow-hidden">

        {/* ── FULL-BLEED VIDEO BACKGROUND ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Local user video */}
          <source src="/download (3).mp4" type="video/mp4" />
          {/* Backup test videos */}
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />

        </video>


        {/* ── OVERLAYS ── */}
        {/* Left-side darkening so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
        {/* Bottom darkening */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {/* Bottom page blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02090a] to-transparent" />

        {/* ── HERO CONTENT — anchored bottom-left like Shopify ── */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 z-10">

          {/* Agency badge */}
          <div className="mb-5 animate-fade-blur">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.06] text-white/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#36F4A4] animate-pulse" />
              India's #1 Shopify Agency
            </span>
          </div>

          {/* Giant headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.0] tracking-tight max-w-3xl animate-fade-blur" style={{ animationDelay: "0.05s" }}>
            We Build<br />
            Shopify Stores<br />
            <span className="text-[#36F4A4]">That Sell.</span>
          </h1>

          {/* Sub-copy */}
          <p className="mt-5 text-white/75 text-base sm:text-lg leading-relaxed max-w-lg animate-fade-blur" style={{ animationDelay: "0.1s" }}>
            Sub-1.2s load speeds, custom-coded logic and<br className="hidden sm:block" />
            high-converting checkouts for D2C brands.
          </p>

          {/* CTA buttons — Shopify pill style, both open modal */}
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-blur" style={{ animationDelay: "0.15s" }}>
            <button
              onClick={() => setShowFormModal(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-all duration-200 hover:scale-[1.02]"
            >
              Start Your Project
            </button>
            <button
              onClick={() => setShowFormModal(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/60 text-white text-sm font-semibold hover:bg-white/10 hover:border-white transition-all duration-200 backdrop-blur-sm"
            >
              {/* Play circle icon inline */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
              Why SalePXL?
            </button>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-blur" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["SB","WE","SZ","AK"].map((t, i) => (
                  <span key={i} className="w-6 h-6 rounded-full bg-[#1a3a2a] border-2 border-[#02090a] flex items-center justify-center text-[8px] font-bold text-[#36F4A4]">{t}</span>
                ))}
              </div>
              <span className="text-white/60 text-xs">Trusted by <strong className="text-white">800+ brands</strong></span>
            </div>
            <span className="text-white/20 hidden sm:block">|</span>
            <span className="text-white/60 text-xs"><strong className="text-white">100+</strong> stores built</span>
            <span className="text-white/20 hidden sm:block">|</span>
            <span className="text-white/60 text-xs"><strong className="text-white">Sub-1.2s</strong> avg load speed</span>
          </div>
        </div>
      </section>


      {/* ── FORM MODAL — works on all screen sizes ── */}
      {showFormModal && (
        <div
          className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowFormModal(false)}
          />

          {/* Sheet: bottom-sheet on mobile, centered card on desktop */}
          <div className="relative w-full sm:w-auto sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#02090a]/80 backdrop-blur-2xl border-t sm:border border-white/10 shadow-2xl animate-fade-blur">
            {/* Handle bar (mobile only) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <span className="text-xs text-[#a1a1aa] font-mono uppercase tracking-wider">Start Your Project</span>
              <button
                onClick={() => setShowFormModal(false)}
                className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="px-3 pb-8 pt-1">
              <StartProjectForm />
            </div>
          </div>
        </div>
      )}


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

      {/* 2. TRUST STATS TICKER */}
      <section className="bg-white/[0.01] py-8 border-y border-white/[0.05] relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-center">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1 items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] text-[#a1a1aa] uppercase tracking-wider font-bold">
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
                <div className="group grid rounded-2xl gap-3 transition hover:text-brand-lime relative p-4 bg-[#051517] border border-[#1a2e32] hover:border-brand-lime/30 transition-all duration-300">
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
                    <p className="text-[#a1a1aa] text-xs truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
              <div key={idx} className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden border border-[#1a2e32] hover:border-brand-lime/30 transition-all duration-300">
                <img src={img.src} alt={img.alt} className="w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW1.map((img, idx) => (
              <div key={idx + "-dup"} className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden border border-[#1a2e32] hover:border-brand-lime/30 transition-all duration-300">
                <img src={img.src} alt={img.alt} className="w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Marquee - Reverse */}
        <div className="marquee-container marquee-pause">
          <div className="marquee-content-reverse" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW2.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden border border-[#1a2e32] hover:border-brand-lime/30 transition-all duration-300">
                <img src={img.src} alt={img.alt} className="w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="marquee-content-reverse" aria-hidden="true" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW2.map((img, idx) => (
              <div key={idx + "-dup"} className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden border border-[#1a2e32] hover:border-brand-lime/30 transition-all duration-300">
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
      <section className="py-24 px-6 bg-[#02090a]/40 border-y border-white/[0.05] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
              Engineering Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-grotesk">
              Legacy vs. SalePXL Rebuilds
            </h2>
            <p className="text-[#a1a1aa] text-sm">
              We replace sluggish, heavy pre-built templates with optimized custom engines. The difference is measurable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Legacy Store */}
            <div className="p-8 rounded-3xl bg-[#051517]/40 border border-red-500/10 flex flex-col gap-6 text-left relative overflow-hidden">
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
                    <span className="text-[#a1a1aa] font-semibold">{item.label}</span>
                    <span className="text-red-400 font-mono font-bold text-right">{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SalePXL Optimized Store */}
            <div className="p-8 rounded-3xl bg-[#051517]/70 border border-brand-lime/10 flex flex-col gap-6 text-left relative overflow-hidden">
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
                    <span className="text-[#a1a1aa] font-semibold">{item.label}</span>
                    <span className="text-brand-lime font-mono font-bold text-right">{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GOOGLE REVIEWS SECTION */}
      <section className="py-24 relative overflow-hidden bg-bg-dark border-t border-white/[0.05] z-10">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col gap-4 text-center">
          <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
            Google Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-grotesk">
            Trusted by Founders & Teams <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">Worldwide</span>
          </h2>
        </div>

        {/* Row 1 reviews marquee */}
        <div className="marquee-container marquee-pause mb-6">
          <div className="marquee-content" style={{ "--marquee-speed": "60s" } as React.CSSProperties}>
            {GOOGLE_REVIEWS_ROW1.map((review, idx) => (
              <div key={idx} className="flex-shrink-0 w-[380px] p-6 rounded-2xl bg-[#051517] border border-[#1a2e32] hover:border-brand-lime/20 transition-all duration-300 flex flex-col gap-4 text-left shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-full text-white font-bold text-sm flex items-center justify-center ${review.avatarColor}`}>
                      {review.avatarText}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm">{review.name}</p>
                      <p className="text-[10px] text-[#a1a1aa] font-medium">{review.metadata}</p>
                    </div>
                  </div>
                  {/* Google 'G' Icon */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#a1a1aa] text-xs">•</span>
                  <span className="text-[#a1a1aa] text-[11px] font-medium">{review.timeAgo}</span>
                </div>

                <p className="text-[#d1d1d6] text-xs leading-relaxed font-normal flex-grow">
                  {review.text}
                </p>

                <div className="border-t border-white/[0.05] pt-4 flex gap-4 items-center mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-brand-lime transition-colors cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-brand-lime transition-colors cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true" style={{ "--marquee-speed": "60s" } as React.CSSProperties}>
            {GOOGLE_REVIEWS_ROW1.map((review, idx) => (
              <div key={idx + "-dup"} className="flex-shrink-0 w-[380px] p-6 rounded-2xl bg-[#051517] border border-[#1a2e32] hover:border-brand-lime/20 transition-all duration-300 flex flex-col gap-4 text-left shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-full text-white font-bold text-sm flex items-center justify-center ${review.avatarColor}`}>
                      {review.avatarText}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm">{review.name}</p>
                      <p className="text-[10px] text-[#a1a1aa] font-medium">{review.metadata}</p>
                    </div>
                  </div>
                  {/* Google 'G' Icon */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#a1a1aa] text-xs">•</span>
                  <span className="text-[#a1a1aa] text-[11px] font-medium">{review.timeAgo}</span>
                </div>

                <p className="text-[#d1d1d6] text-xs leading-relaxed font-normal flex-grow">
                  {review.text}
                </p>

                <div className="border-t border-white/[0.05] pt-4 flex gap-4 items-center mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-brand-lime transition-colors cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-brand-lime transition-colors cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 reviews marquee - Reverse */}
        <div className="marquee-container marquee-pause">
          <div className="marquee-content-reverse" style={{ "--marquee-speed": "60s" } as React.CSSProperties}>
            {GOOGLE_REVIEWS_ROW2.map((review, idx) => (
              <div key={idx} className="flex-shrink-0 w-[380px] p-6 rounded-2xl bg-[#051517] border border-[#1a2e32] hover:border-brand-lime/20 transition-all duration-300 flex flex-col gap-4 text-left shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-full text-white font-bold text-sm flex items-center justify-center ${review.avatarColor}`}>
                      {review.avatarText}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm">{review.name}</p>
                      <p className="text-[10px] text-[#a1a1aa] font-medium">{review.metadata}</p>
                    </div>
                  </div>
                  {/* Google 'G' Icon */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#a1a1aa] text-xs">•</span>
                  <span className="text-[#a1a1aa] text-[11px] font-medium">{review.timeAgo}</span>
                </div>

                <p className="text-[#d1d1d6] text-xs leading-relaxed font-normal flex-grow">
                  {review.text}
                </p>

                <div className="border-t border-white/[0.05] pt-4 flex gap-4 items-center mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-brand-lime transition-colors cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-brand-lime transition-colors cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="marquee-content-reverse" aria-hidden="true" style={{ "--marquee-speed": "60s" } as React.CSSProperties}>
            {GOOGLE_REVIEWS_ROW2.map((review, idx) => (
              <div key={idx + "-dup"} className="flex-shrink-0 w-[380px] p-6 rounded-2xl bg-[#051517] border border-[#1a2e32] hover:border-brand-lime/20 transition-all duration-300 flex flex-col gap-4 text-left shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-full text-white font-bold text-sm flex items-center justify-center ${review.avatarColor}`}>
                      {review.avatarText}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm">{review.name}</p>
                      <p className="text-[10px] text-[#a1a1aa] font-medium">{review.metadata}</p>
                    </div>
                  </div>
                  {/* Google 'G' Icon */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#a1a1aa] text-xs">•</span>
                  <span className="text-[#a1a1aa] text-[11px] font-medium">{review.timeAgo}</span>
                </div>

                <p className="text-[#d1d1d6] text-xs leading-relaxed font-normal flex-grow">
                  {review.text}
                </p>

                <div className="border-t border-white/[0.05] pt-4 flex gap-4 items-center mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-brand-lime transition-colors cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-brand-lime transition-colors cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </span>
                </div>
              </div>
            ))}
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
                  className="rounded-2xl bg-[#051517]/40 border border-[#1a2e32] overflow-hidden transition-all duration-300 hover:border-brand-lime/20"
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
                      className={`w-4 h-4 text-[#a1a1aa] shrink-0 transition-transform duration-300 ${
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
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed border-t border-white/[0.03]">
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

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-8 items-center p-12 rounded-3xl bg-[#051517]/50 border border-brand-lime/20 neon-shadow-lime">
          <span className="text-xs text-brand-lime font-mono uppercase tracking-widest font-bold">
            Accelerate Growth
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-xl font-grotesk uppercase">
            Ready to Build Your Shopify Store?
          </h2>

          <p className="text-[#a1a1aa] text-sm sm:text-base leading-relaxed max-w-lg">
            Let's construct a lightning-fast, high-converting checkout experience custom designed for your brand. Get a free audit and consultation today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-brand-lime hover:bg-[#1de896] transition-all duration-300 text-center"
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-xs text-[#a1a1aa] pt-6 border-t border-white/[0.08] w-full max-w-lg">
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

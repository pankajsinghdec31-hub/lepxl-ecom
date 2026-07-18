"use client";

import React, { useState, useEffect, useRef } from "react";
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

// Google Reviews consolidated data for the interactive reviews layout
const GOOGLE_REVIEWS_CONSOLIDATED = [
  {
    name: "Malay Trivedi",
    avatarColor: "bg-sky-500",
    avatarText: "MT",
    metadata: "Local Guide · 18 reviews",
    stars: 5,
    timeAgo: "2 weeks ago",
    headline: "Conversion rate doubled in a month",
    text: "SalePXL completely transformed our store. Conversion rate doubled in a month. Krish and team are highly technical, and actually understand e-commerce revenue. Best agency in India hands down.",
    image: "/apparel_mockup.png",
    statVal: "+100%",
    statLabel: "Conversion Boost"
  },
  {
    name: "James Park",
    avatarColor: "bg-rose-600",
    avatarText: "JP",
    metadata: "Local Guide · 13 reviews · 5 photos",
    stars: 5,
    timeAgo: "5 months ago",
    headline: "AOV increased by 35%",
    text: "The gamified cart drawer increased our AOV by 35%. Customers actually engage with the cart now — adding qualifying products to unlock free shipping. Beautifully built and never breaks.",
    image: "/supplement_mockup.png",
    statVal: "+35%",
    statLabel: "AOV Increase"
  },
  {
    name: "Monica Fernandes",
    avatarColor: "bg-amber-600",
    avatarText: "MF",
    metadata: "Local Guide · 28 reviews · 10 photos",
    stars: 5,
    timeAgo: "2 months ago",
    headline: "Real CRO done right",
    text: "We run 50+ A/B tests a quarter with their CRO retainer. Every test teaches us something about our customers. They run experiments rigorously and never call winners early. Real CRO done right.",
    image: "/apparel_mockup.png",
    statVal: "50+",
    statLabel: "Tests / Quarter"
  },
  {
    name: "Deepak Nair",
    avatarColor: "bg-blue-600",
    avatarText: "DN",
    metadata: "Local Guide · 36 reviews · 18 photos",
    stars: 5,
    timeAgo: "7 months ago",
    headline: "Engineering excellence",
    text: "SalePXL understands Shopify at a code level. They've solved problems for us that other agencies said weren't possible — custom Liquid logic, Storefront API hacks, Shopify Functions. Engineering excellence.",
    image: "/jewelry_mockup.png",
    statVal: "Sub-1.2s",
    statLabel: "Load Velocity"
  },
  {
    name: "Sneha Rao",
    avatarColor: "bg-red-500",
    avatarText: "SR",
    metadata: "Local Guide · 21 reviews · 9 photos",
    stars: 5,
    timeAgo: "3 months ago",
    headline: "Incredible AI integration",
    text: "ChatGPT-powered concierge handles 60% of customer queries automatically — sizing, returns, product recommendations. Customer support team can now focus on actual issues. Incredible build.",
    image: "/aumtea_mockup.png",
    statVal: "60%",
    statLabel: "Auto Support leads"
  }
];

// Trust Stats
const TRUST_STATS = [
  { label: "Experience", value: "10+ Years" },
  { label: "Brands Scaled", value: "100+ Brands" },
  { label: "Average Speed", value: "Sub-2.0s" },
  { label: "Revenue Generated", value: "Millions" }
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

const PORTFOLIO_CARDS = [
  {
    label: "SOBO Beauty",
    image: "/imgi_80_sobo-beauty.webp",
    alt: "Premium cosmetics and beauty store with a conversion-optimized sticky buy bar.",
    category: "Cosmetics & Beauty"
  },
  {
    label: "Swadezi",
    image: "/imgi_93_swadezi.webp",
    alt: "Ethnic apparel boutique with speed-optimized layouts, minimal custom code, and clean navigation.",
    category: "Ethnic Apparel"
  },
  {
    label: "Aumtea",
    image: "/aumtea_mockup.png",
    alt: "D2C organic tea and beverages storefront with streamlined checkout and custom brand typography.",
    category: "Tea & Beverages"
  },
  {
    label: "Kohkayn Basics",
    image: "/imgi_89_kohkayn-com.webp",
    alt: "Modern basics apparel store built with Next.js Headless storefront for lightning fast page loads.",
    category: "Modern Apparel"
  },
  {
    label: "Well Essentials",
    image: "/imgi_81_well-essentials.webp",
    alt: "Superfoods and wellness brand featuring tailored conversion paths and lazy-loaded rich media.",
    category: "Superfoods & Health"
  },
  {
    label: "Amarose Perfumes",
    image: "/imgi_83_amarose.webp",
    alt: "Luxury fragrance shop with a bespoke scent finder quiz, raising customer engagement and conversions.",
    category: "Luxury Fragrances"
  },
  {
    label: "Skin Basics",
    image: "/imgi_91_skin-basics.webp",
    alt: "Premium leather goods storefront equipped with trust badges and a customized single-click slide cart drawer.",
    category: "Premium Leather Goods"
  },
  {
    label: "Glyters Jewelry",
    image: "/jewelry_mockup.png",
    alt: "Fashion jewelry destination with responsive mobile layouts and custom drawer checkout integrations.",
    category: "Fashion Jewelry"
  },
  {
    label: "RCFYIY Boutique",
    image: "/apparel_mockup.png",
    alt: "High-end fashion editorial store focused on high visual appeal, immersive zoom, and rapid checkout.",
    category: "Fashion Boutique"
  },
  {
    label: "NutriBlend Ecom",
    image: "/supplement_mockup.png",
    alt: "Bespoke sports nutrition D2C store featuring custom bundle builder and lightning-fast checkout flow.",
    category: "Sports Nutrition"
  }
];

const BUILD_PROCESS_STEPS = [
  {
    num: "01",
    title: "Plan Your Store",
    desc: "Collaborate on structural architecture, design mockups, and layout strategies before writing a single line of code.",
    desktopImg: "/wellness_mockup.png",
    mobileImg: "/imgi_93_swadezi.webp"
  },
  {
    num: "02",
    title: "Build with Shopify Experts",
    desc: "Get clean custom liquid code, speed-optimized theme configuration, and robust API integrations from certified developers.",
    desktopImg: "/apparel_mockup.png",
    mobileImg: "/imgi_80_sobo-beauty.webp"
  },
  {
    num: "03",
    title: "Increase Sales & Conversions",
    desc: "Accelerate checkout flows, integrate smart upsell drawers, and maximize average order value with data-driven CRO.",
    desktopImg: "/jewelry_mockup.png",
    mobileImg: "/imgi_81_well-essentials.webp"
  }
];

const APP_ICONS: { name: string; highlight: boolean; src?: string; svg?: React.ReactNode }[] = [
  { name: "Shopify", src: "https://cdn.simpleicons.org/shopify", highlight: true },
  {
    name: "Stripe",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 max-h-[80%] max-w-[80%] object-contain select-none pointer-events-none transition-all duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.978 11.072c0-1.229-.618-1.668-1.49-1.668-.962 0-1.494.515-1.494 1.427 0 2.25 6.273 1.157 6.273 5.378 0 3.208-2.622 4.543-5.56 4.543-3.155 0-5.667-1.39-5.667-4.088h2.793c.03 1.332.95 1.864 2.1 1.864 1.096 0 1.878-.456 1.878-1.47 0-2.459-6.273-1.455-6.273-5.396 0-2.996 2.459-4.527 5.396-4.527 2.894 0 5.148.973 5.337 3.398h-2.986zm1.326-8.877L18.15.59v3.74l-2.846.804V2.195z" fill="url(#stripe-grad)" />
        <defs>
          <linearGradient id="stripe-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#635BFF" />
            <stop offset="100%" stopColor="#80E9FF" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: "Razorpay",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 max-h-[80%] max-w-[80%] object-contain select-none pointer-events-none transition-all duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 22V2H13.5C17.0899 2 20 4.91015 20 8.5C20 11.2333 18.3072 13.572 15.9084 14.5097L20 22H14.5L11 15H8V22H4ZM8 6V11H13C14.3807 11 15.5 9.88071 15.5 8.5C15.5 7.11929 14.3807 6 13 6H8Z" fill="url(#razorpay-grad)" />
        <path d="M10 7.5L13.5 10.5L10 11.5L12 7.5H10Z" fill="#FFFFFF" />
        <defs>
          <linearGradient id="razorpay-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B72E7" />
            <stop offset="100%" stopColor="#002970" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: "Shiprocket",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 max-h-[80%] max-w-[80%] object-contain select-none pointer-events-none transition-all duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8 6 5 11 5 15C5 18.866 8.134 22 12 22C15.866 22 19 18.866 19 15C19 11 16 6 12 2Z" fill="url(#shiprocket-grad)" />
        <path d="M12 6L15 11H9L12 6Z" fill="#FFFFFF" />
        <circle cx="12" cy="15" r="2.5" fill="#FFFFFF" />
        <defs>
          <linearGradient id="shiprocket-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: "Delhivery",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 max-h-[80%] max-w-[80%] object-contain select-none pointer-events-none transition-all duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19H4V3Z" fill="url(#delhivery-grad)" />
        <rect x="8" y="7" width="4" height="4" fill="#FFFFFF" />
        <rect x="8" y="13" width="4" height="4" fill="#FFFFFF" />
        <defs>
          <linearGradient id="delhivery-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF5000" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: "GoKwik",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 max-h-[80%] max-w-[80%] object-contain select-none pointer-events-none transition-all duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#gokwik-bg)" />
        <path d="M6 12L11 17L19 9" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 5L17 9L13 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <defs>
          <linearGradient id="gokwik-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: "Whatmore",
    highlight: true,
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 max-h-[80%] max-w-[80%] object-contain select-none pointer-events-none transition-all duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#whatmore-bg)" />
        <path d="M10 8L16 12L10 16V8Z" fill="#FFFFFF" />
        <circle cx="6" cy="6" r="1.5" fill="#FFFFFF" opacity="0.7" />
        <circle cx="6" cy="12" r="1.5" fill="#FFFFFF" opacity="0.7" />
        <circle cx="6" cy="18" r="1.5" fill="#FFFFFF" opacity="0.7" />
        <circle cx="18" cy="6" r="1.5" fill="#FFFFFF" opacity="0.7" />
        <circle cx="18" cy="12" r="1.5" fill="#FFFFFF" opacity="0.7" />
        <circle cx="18" cy="18" r="1.5" fill="#FFFFFF" opacity="0.7" />
        <defs>
          <linearGradient id="whatmore-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  { name: "PayPal", src: "https://cdn.simpleicons.org/paypal", highlight: true },
  { name: "Apple Pay", src: "https://cdn.simpleicons.org/applepay", highlight: false },
  { name: "Google Pay", src: "https://cdn.simpleicons.org/googlepay", highlight: true },
  { name: "Amazon", src: "https://cdn.simpleicons.org/amazon", highlight: false },
  { name: "Klarna", src: "https://cdn.simpleicons.org/klarna", highlight: true },
  { name: "Afterpay", src: "https://cdn.simpleicons.org/afterpay", highlight: false },
  { name: "Affirm", src: "https://cdn.simpleicons.org/affirm", highlight: true },
  { name: "Mailchimp", src: "https://cdn.simpleicons.org/mailchimp", highlight: false },
  { name: "Zendesk", src: "https://cdn.simpleicons.org/zendesk", highlight: true },
  { name: "Google Analytics", src: "https://cdn.simpleicons.org/googleanalytics", highlight: false },
  { name: "Google Tag Manager", src: "https://cdn.simpleicons.org/googletagmanager", highlight: true },
  { name: "Microsoft Clarity", src: "https://cdn.simpleicons.org/microsoft", highlight: false },
  { name: "Meta Pixel", src: "https://cdn.simpleicons.org/meta", highlight: true },
  { name: "TikTok Shop", src: "https://cdn.simpleicons.org/tiktok", highlight: false },
  { name: "Facebook Shop", src: "https://cdn.simpleicons.org/facebook", highlight: true },
  { name: "Instagram Shopping", src: "https://cdn.simpleicons.org/instagram", highlight: false },
  { name: "Pinterest Shopping", src: "https://cdn.simpleicons.org/pinterest", highlight: true },
  { name: "eBay", src: "https://cdn.simpleicons.org/ebay", highlight: false }
];


export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPortfolio = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 450; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [activeDevTab, setActiveDevTab] = useState<"checkout" | "ui" | "ai">("checkout");

  // Typewriter effect state for hero headline dynamic text
  const words = [
    "high-converting stores",
    "lightning-fast Shopify sites",
    "stores customers trust",
    "revenue-driven brands",
    "premium brand experiences"
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const handleType = () => {
      const fullWord = words[wordIndex];
      
      if (!isDeleting) {
        // Typing
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        
        if (currentText === fullWord) {
          setTypingSpeed(2200); // Wait 2.2 seconds before starting to erase
          setIsDeleting(true);
        } else {
          setTypingSpeed(100 + Math.random() * 40); // Subtle natural variation
        }
      } else {
        // Erasing
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(350); // Pause before next word
        } else {
          setTypingSpeed(60); // Faster erasing speed
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

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
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      {/* FLOATING NEON BACKDROP DECORATIONS */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[400px] rounded-full bg-[#36F4A4]/[0.02] blur-[130px] animate-blob-slow-1 pointer-events-none" />
      <div className="absolute top-[15%] right-[-5%] w-[40%] h-[500px] rounded-full bg-[#051517]/60 blur-[150px] pointer-events-none" />
      <div className="absolute top-[50%] left-[5%] w-[35%] h-[400px] rounded-full bg-[#36F4A4]/[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[8%] right-[5%] w-[35%] h-[450px] rounded-full bg-[#051517]/50 blur-[130px] pointer-events-none" />

      {/* 1. SHOPIFY-STYLE HERO — full bleed video, text bottom-left */}
      <section className="relative w-full h-[100dvh] min-h-[580px] overflow-hidden">

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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        {/* Bottom darkening */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Bottom page blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />

        {/* ── HERO CONTENT — anchored bottom-left like Shopify ── */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-20 z-10">
          <div className="max-w-[1360px] mx-auto px-6">
            {/* Agency badge */}
            <div className="mb-3 sm:mb-4 animate-fade-blur flex justify-start">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.06] text-white/80 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                India's #1 Shopify Agency
              </span>
            </div>

            {/* Giant headline */}
            <h1 className="text-[2.65rem] xs:text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[4.5rem] font-light text-white leading-[1.1] tracking-tight max-w-3xl animate-fade-blur text-left" style={{ animationDelay: "0.05s" }}>
              We build<br />
              <span className="text-white">
                {currentText}
                <span className="typewriter-cursor" />
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="mt-4 sm:mt-5 text-white/70 text-lg sm:text-xl font-light leading-relaxed max-w-xl animate-fade-blur text-left" style={{ animationDelay: "0.1s" }}>
              Traffic comes from anywhere, but trust comes from your store.<br />
              We design and engineer high-converting Shopify experiences that scale.
            </p>

            {/* CTA buttons — Full-width stacked on mobile, auto-width left-aligned on desktop */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-start gap-3 w-full sm:w-auto max-w-sm sm:max-w-none animate-fade-blur" style={{ animationDelay: "0.15s" }}>
              <button
                onClick={() => setShowFormModal(true)}
                className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2 px-8 h-13 rounded-full text-black bg-white text-xs sm:text-sm font-bold shadow-sm cursor-pointer"
              >
                Start for free
              </button>
              <button
                onClick={() => setShowFormModal(true)}
                className="w-full sm:w-auto btn-secondary inline-flex items-center justify-center gap-2 px-8 h-13 rounded-full border border-white text-white text-xs sm:text-sm font-semibold backdrop-blur-sm cursor-pointer"
              >
                {/* Play circle icon inline */}
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 premium-hover-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                </svg>
                <span>Why we build Shopify</span>
              </button>
            </div>

            {/* Trust strip - hidden on mobile, visible from sm up */}
            <div className="mt-5 sm:mt-7 hidden sm:flex flex-row flex-wrap items-center justify-start gap-x-5 gap-y-2 animate-fade-blur" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2 justify-center">
                <div className="flex -space-x-1.5">
                  {["SB","WE","SZ","AK"].map((t, i) => (
                    <span key={i} className="w-5.5 h-5.5 rounded-full bg-primary/10 border border-[#050505] flex items-center justify-center text-[7px] font-bold text-primary">{t}</span>
                  ))}
                </div>
                <span className="text-white/60 text-xs">Trusted by <strong className="text-white">800+ brands</strong></span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-white/60 text-xs text-center"><strong className="text-white">100+</strong> stores built</span>
              <span className="text-white/20">|</span>
              <span className="text-white/60 text-xs text-center"><strong className="text-white">Sub-1.2s</strong> avg speed</span>
            </div>
          </div>
        </div>
      </section>


      {/* ── OMNICHANNEL / SELL EVERYWHERE SECTION ── */}
      <section className="py-16 md:py-24 lg:py-36 relative z-20 overflow-hidden bg-bg-dark border-t border-b border-white/[0.08] rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px]">
        <div className="max-w-[1360px] mx-auto px-6">
          
          {/* Main big headline & Navigation controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-4xl text-left">
              <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light leading-[1.2] tracking-tight font-grotesk select-none flex flex-wrap gap-x-4 gap-y-3">
                <span className="text-white/30 mr-1 transition-all duration-300 hover:text-white cursor-default">
                  Sell <span className="light-gradient-text font-normal">everywhere</span> people shop.
                </span>
                <span className="premium-highlight text-white transition-all duration-300 hover:text-primary cursor-default">Online and in person.</span>
                <span className="text-white/60 transition-all duration-300 hover:text-white cursor-default">Across AI and on social.</span>
                <span className="text-white/30 transition-all duration-300 hover:text-white cursor-default">Locally and globally.</span>
              </h2>
            </div>
            
            {/* Carousel navigation arrows */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                onClick={() => scrollPortfolio("left")}
                className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-sm shadow-md"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollPortfolio("right")}
                className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-sm shadow-md"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cards grid / Carousel */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth w-full"
          >
            {PORTFOLIO_CARDS.map((card, idx) => {
              return (
                <div 
                  key={idx}
                  className="flip-card relative w-[85vw] sm:w-[360px] md:w-[400px] lg:w-[440px] aspect-[1046/800] snap-start shrink-0 rounded-[24px] cursor-pointer"
                >
                  <div className="flip-card-inner">
                    {/* Front Side */}
                    <div className="flip-card-front overflow-hidden border border-white/[0.08] bg-[#101010] rounded-[24px]">
                      <img 
                        src={card.image} 
                        alt={card.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700"
                      />
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                      
                      {/* Badge on front (website name) */}
                      <span className="absolute top-4 left-4 bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/[0.08] backdrop-blur-sm z-10">
                        {card.label}
                      </span>
                    </div>

                    {/* Back Side */}
                    <div className="flip-card-back overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#101010] to-[#070707] flex flex-col items-center justify-center p-6 text-center select-none rounded-[24px]">
                      {/* Decorative glowing blobs */}
                      <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none" />

                      {/* Website Name */}
                      <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight font-grotesk mb-2">
                        {card.label}
                      </h3>
                      
                      {/* Category Badge */}
                      <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-semibold tracking-widest text-primary uppercase px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        {card.category}
                      </span>

                      {/* Description / Alt text */}
                      <p className="text-white/70 text-[11px] sm:text-xs max-w-[85%] leading-relaxed">
                        {card.alt}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── BUILD LAUNCH SCALE SECTION ── */}
      <section className="py-16 md:py-24 lg:py-36 relative z-10 overflow-hidden bg-gradient-to-b from-[#050505] to-[#011a12] border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.06] text-white/80 backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Built Ecom Store
            </span>
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight font-grotesk mt-2">
              Build. <span className="light-gradient-text font-normal">Launch.</span> <span className="premium-highlight">Scale.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: Interactive Mockup Cards */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-start pl-6 pr-12 pb-12 pt-6 select-none">
              <div className="relative w-[280px] sm:w-[340px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/[0.08] bg-[#101010]">
                {BUILD_PROCESS_STEPS.map((step, idx) => (
                  <motion.img
                    key={idx}
                    src={step.desktopImg}
                    alt={step.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === idx ? 0.8 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}
              </div>
              <div className="absolute bottom-[-10px] right-[10px] sm:right-[-20px] w-[160px] sm:w-[200px] aspect-[9/19] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-[6px] border-[#050505] bg-[#101010]">
                {BUILD_PROCESS_STEPS.map((step, idx) => (
                  <motion.img
                    key={idx}
                    src={step.mobileImg}
                    alt={step.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === idx ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Right side: Interactive Collapsible Steps List */}
            <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-8">
              <div className="flex flex-col">
                {BUILD_PROCESS_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveStep(idx)}
                      className="group cursor-pointer py-6 border-b border-white/[0.08] flex flex-col gap-2 transition-all duration-300"
                    >
                      <div className="flex items-baseline gap-5">
                        <span className={`font-mono text-sm font-bold transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-white/40 group-hover:text-primary/70"
                        }`}>
                          {step.num}
                        </span>
                        <h3 className={`text-xl sm:text-2xl font-light tracking-tight transition-colors duration-300 ${
                          isActive ? "text-white" : "text-[#8e8e93] group-hover:text-white"
                        }`}>
                          {step.title}
                        </h3>
                      </div>
                      {/* Collapsible description */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isActive ? "auto" : 0, 
                          opacity: isActive ? 1 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-10"
                      >
                        <p className="text-sm text-white/70 leading-relaxed pt-2 max-w-md">
                          {step.desc}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-start pl-10">
                <button
                  onClick={() => setShowFormModal(true)}
                  className="w-full sm:w-auto btn-primary inline-flex items-center justify-center px-8 h-13 rounded-full text-black text-xs sm:text-sm font-bold shadow-[0_4px_12px_rgba(255,255,255,0.08)] cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-36 relative z-20 overflow-hidden bg-gradient-to-b from-[#160528] to-[#080214] border-b border-t border-white/[0.08] rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left side text column */}
            <div className="w-full lg:w-[45%] text-left flex flex-col justify-center">
              <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white leading-[1.1] tracking-tight font-grotesk">
                Customize <span className="light-gradient-text font-normal">everything</span> with <span className="premium-highlight">apps</span>
              </h2>
              <p className="mt-6 text-white/70 text-lg sm:text-xl font-light leading-relaxed max-w-lg">
                The Shopify App Store has <a href="https://apps.shopify.com" target="_blank" rel="noopener noreferrer" className="underline text-white hover:text-primary transition-colors font-semibold">21,000+ commerce apps</a> for whatever specialized features your business might need.
              </p>
            </div>

            {/* Right side interactive app grid */}
            <div className="w-full lg:w-[55%] relative select-none">
              {/* Fade out mask overlays on desktop */}
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080214] to-transparent pointer-events-none z-20 hidden lg:block" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080214] to-transparent pointer-events-none z-20 hidden lg:block" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#160528] to-transparent pointer-events-none z-20 hidden lg:block" />

              <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 sm:gap-4 max-h-[480px] overflow-hidden lg:pr-8 pr-0">
                {APP_ICONS.map((app, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-[20px] flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-115 hover:rotate-[2deg] hover:z-30 cursor-pointer shadow-lg bg-white border border-white/[0.08] ${
                      app.highlight 
                        ? "opacity-100 hover:shadow-2xl hover:shadow-primary/20" 
                        : "opacity-35 hover:opacity-100 hover:shadow-2xl hover:shadow-primary/15"
                    }`}
                    style={{
                      transitionDelay: `${(idx % 8) * 15}ms`
                    }}
                    title={app.name}
                  >
                    {app.svg ? (
                      app.svg
                    ) : (
                      <img 
                        src={app.src} 
                        alt={app.name}
                        loading="lazy"
                        className="max-h-[80%] max-w-[80%] object-contain select-none pointer-events-none transition-all duration-300"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-36 relative z-20 overflow-hidden bg-gradient-to-b from-[#041328] to-[#020a16] border-t border-b border-white/[0.08] rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px]">
        <div className="max-w-[1360px] mx-auto px-6">
          
          {/* Header & Copywriting */}
          <div className="max-w-3xl text-left mb-16 flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.06] text-primary backdrop-blur-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Conversion Diagnostics
            </span>
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight leading-[1.1] font-grotesk mt-2">
              Hyper-Optimized.<br />
              <span className="premium-highlight text-white"><span className="light-gradient-text font-normal">Designed</span> to Convert.</span>
            </h2>
            <p className="text-white/70 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mt-2">
              We replace sluggish, heavy pre-built templates with custom Liquid engines and advanced conversion architectures. Built to turn traffic into high-value customers natively.
            </p>
          </div>

          {/* Interactive Pills Selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { id: "checkout", label: "CRO-Optimized Checkout" },
              { id: "ui", label: "Premium UI Experience" },
              { id: "ai", label: "Agentic Commerce (AI)" },
            ].map((tab) => {
              const isActive = activeDevTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDevTab(tab.id as any)}
                  className={`px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                    isActive
                      ? "btn-primary h-auto text-black font-bold shadow-md"
                      : "btn-secondary h-auto text-white/60 border border-white/[0.08]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Main Showcase Panel */}
          <div className="relative w-full bg-gradient-to-br from-[#101010] to-[#070707] border border-white/[0.08] rounded-[24px] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,227,154,0.04),transparent_60%)] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
              
              {/* Left Column: Simulated Code/Terminal Console */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-[20px] bg-black/60 border border-white/[0.08] overflow-hidden min-h-[380px] font-mono text-xs text-left shadow-2xl">
                
                {/* Console Window Header */}
                <div className="px-4 py-3 bg-[#0B0B0B] border-b border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[10px] text-white/40 ml-2 font-mono">
                      {activeDevTab === "checkout" && "shopify --zsh - 100x30"}
                      {activeDevTab === "ui" && "theme.liquid - Liquid editor"}
                      {activeDevTab === "ai" && "ai-concierge.ts - TypeScript"}
                    </span>
                  </div>
                  <span className="text-[9px] text-primary/50 border border-primary/20 px-2 py-0.5 rounded uppercase font-semibold">
                    {activeDevTab === "checkout" && "zsh terminal"}
                    {activeDevTab === "ui" && "liquid engine"}
                    {activeDevTab === "ai" && "agentic backend"}
                  </span>
                </div>

                {/* Console Content */}
                <div className="p-6 flex-grow overflow-auto text-white/70 leading-relaxed select-none">
                  {activeDevTab === "checkout" && (
                    <div className="flex flex-col gap-2">
                      <p className="text-white/40 font-mono">// Instantiating Custom Checkout Engine</p>
                      <p className="text-white">$ npx -y create-salepxl-storefront@latest ./</p>
                      <p className="text-primary font-bold">✓ Initialized high-converting storefront skeleton</p>
                      <p className="text-primary font-bold">✓ Applied custom single-tap checkout modules</p>
                      <p className="text-white mt-2">? Enter target performance rating (0-100): <span className="text-primary font-bold underline">98</span></p>
                      <p className="text-primary mt-2">✓ Cart drawer latency optimized: 0.12s</p>
                      <p className="text-primary">✓ Preloaded main collection assets: Saved 2.4MB payload</p>
                      <p className="text-white/60 mt-2 font-bold font-mono">
                        Speed Index: 1.2s | Core Web Vitals: Passing
                      </p>
                    </div>
                  )}

                  {activeDevTab === "ui" && (
                    <div className="flex flex-col gap-1 font-mono text-[11px]">
                      <p className="text-white/40 font-mono">// Custom Liquid Section with Hover State Transitions</p>
                      <p className="text-white">{"<div className=\"relative group rounded-3xl overflow-hidden\">"}</p>
                      <p className="text-primary pl-4">{"{% if product.hover_image %}"}</p>
                      <p className="text-white pl-8">{"<img src=\"{{ product.hover_image | img_url: 'large' }}\""}</p>
                      <p className="text-primary pl-12">{"class=\"absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100\" />"}</p>
                      <p className="text-primary pl-4">{"{% endif %}"}</p>
                      <p className="text-white pl-4">{"<button class=\"transition-all duration-300 active:scale-95\">"}</p>
                      <p className="text-amber-300 pl-8">{"Quick Buy + Free Gift"}</p>
                      <p className="text-white pl-4">{"</button>"}</p>
                      <p className="text-white">{"</div>"}</p>
                      <p className="text-emerald-400 mt-3 font-semibold font-mono">// Rendering UI layout with sub-16ms frames</p>
                    </div>
                  )}

                  {activeDevTab === "ai" && (
                    <div className="flex flex-col gap-2">
                      <p className="text-white/40 font-mono">// Live Agentic Chat Assistant Context</p>
                      <p className="text-primary">{"{"}</p>
                      <p className="text-white pl-4">"agent": "SalePXL AI Concierge",</p>
                      <p className="text-white pl-4">"intent": "Recommend products for sensitive skin",</p>
                      <p className="text-white pl-4">"action": "Querying Jeju-secrets collection API...",</p>
                      <p className="text-white pl-4">"results": [</p>
                      <p className="text-amber-300 pl-8">{"{ \"name\": \"Jeju Volcanic Mask\", \"matchScore\": \"98%\" }"}</p>
                      <p className="text-white pl-4">]</p>
                      <p className="text-primary">{"}"}</p>
                      <p className="text-primary mt-2 font-mono">✓ AI Concierge initialized. Ready to auto-close sales.</p>
                    </div>
                  )}
                </div>

                {/* Console Footer */}
                <div className="px-4 py-3 bg-[#0B0B0B]/80 border-t border-white/[0.08] text-[10px] text-white/30 flex justify-between">
                  <span>System: MacOS</span>
                  <span>SalePXL CRO V3.0</span>
                </div>
              </div>

              {/* Right Column: Live Visual Preview */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center relative">
                
                {/* Visual Preview Container */}
                <div className="w-full max-w-[320px] aspect-[4/5] rounded-[24px] overflow-hidden border border-white/[0.08] bg-[#101010] relative shadow-2xl group transition-all duration-500 hover:scale-[1.015] hover:shadow-2xl hover:shadow-black/70 flex flex-col justify-between p-6">
                  
                  {activeDevTab === "checkout" && (
                    <>
                      {/* Product Header */}
                      <div className="flex justify-between items-start w-full">
                        <span className="text-[10px] bg-primary/10 text-primary border border-primary/25 px-2.5 py-1 rounded-full font-mono font-bold tracking-wider">
                          SAVING 2.4MB
                        </span>
                        <div className="text-right">
                          <span className="text-[10px] text-white/50 block font-mono">LOAD SPEED</span>
                          <span className="text-primary font-bold font-mono">1.2s (Instant)</span>
                        </div>
                      </div>

                      {/* Middle Card: Image & Cart Slide-In */}
                      <div className="my-auto flex flex-col items-center">
                        <div className="relative w-36 h-36 rounded-[20px] overflow-hidden border border-white/[0.08] bg-white/5 p-2 mb-3">
                          <img 
                            src="/wellness_mockup.png" 
                            alt="Jeju Volcanic Mask" 
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-primary text-[8px] font-bold px-2 py-0.5 rounded-full border border-white/[0.08]">
                            BEST SELLER
                          </div>
                        </div>
                        <h4 className="text-white font-semibold text-sm">Jeju Volcanic Mask</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-white/50 line-through">₹999</span>
                          <span className="text-xs text-primary font-bold">₹699</span>
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold">SAVE 30%</span>
                        </div>
                      </div>

                      {/* Checkout Footer Button */}
                      <div className="flex flex-col gap-2 w-full">
                        {/* Dynamic AOV indicator */}
                        <div className="flex justify-between items-center text-[10px] text-white/60 font-mono border-t border-white/5 pt-3">
                          <span>Progress: Add ₹301 for FREE Shipping</span>
                          <span className="text-primary font-bold">70%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-primary h-full w-[70%]" />
                        </div>
                        <button className="w-full h-11 mt-1 rounded-full bg-white hover:bg-[#f5f5f7] text-black text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer hover:scale-[1.01] shadow-sm">
                          Secure Express Checkout
                        </button>
                      </div>
                    </>
                  )}

                  {activeDevTab === "ui" && (
                    <>
                      {/* Live UI interaction mockup */}
                      <div className="flex justify-between items-start w-full">
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/25 px-2.5 py-1 rounded-full font-mono font-bold">
                          MICRO-INTERACTION
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                          <span className="text-[10px] text-white/60 font-mono">60 FPS</span>
                        </div>
                      </div>

                      {/* Product display card */}
                      <div className="my-auto flex flex-col items-center">
                        <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-2 mb-3 cursor-pointer group/hover">
                          {/* Main Image */}
                          <img 
                            src="/supplement_mockup.png" 
                            alt="Supplement pack" 
                            className="w-full h-full object-contain transition-transform duration-500 group-hover/hover:scale-105"
                          />
                          {/* Custom hover glow */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                            <span className="text-[9px] text-primary font-mono tracking-widest font-black uppercase">HOVER FOR PREVIEW</span>
                          </div>
                        </div>
                        
                        {/* Rating stars */}
                        <div className="flex gap-0.5 text-amber-400 text-xs">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                          <span className="text-[10px] text-white/40 ml-1">(4.9/5)</span>
                        </div>
                        <h4 className="text-white font-semibold text-sm mt-1">Superfood Daily Mix</h4>
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        {/* Interactive size selectors */}
                        <div className="flex justify-center gap-2 mb-1">
                          {["30 Servings", "60 Servings", "90 Servings"].map((size, idx) => (
                            <span 
                              key={idx} 
                              className={`text-[9px] px-2.5 py-1 rounded-full border cursor-pointer transition-all duration-200 ${
                                idx === 0 
                                  ? "border-primary text-primary bg-primary/5" 
                                  : "border-white/10 text-white/50 hover:text-white"
                              }`}
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                        <button className="w-full h-11 rounded-full bg-primary hover:bg-primary-hover text-black text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm">
                          Instant Add to Cart
                        </button>
                      </div>
                    </>
                  )}

                  {activeDevTab === "ai" && (
                    <>
                      {/* AI Concierge Chat Interface */}
                      <div className="flex justify-between items-center border-b border-white/5 pb-3 w-full">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span className="text-xs text-white font-semibold font-mono">SalePXL AI Concierge</span>
                        </div>
                        <span className="text-[9px] text-white/40 font-mono">LIVE AGENT</span>
                      </div>

                      {/* Chat messages stream */}
                      <div className="flex-grow my-4 flex flex-col gap-3 justify-end overflow-y-auto w-full">
                        
                        {/* User Message */}
                        <div className="flex justify-end w-full">
                          <div className="bg-white/5 border border-white/10 text-white text-[10px] p-2.5 rounded-[16px] rounded-tr-sm max-w-[85%] text-right">
                            I have sensitive skin and want a volcanic clay mask. Anything suitable?
                          </div>
                        </div>

                        {/* Agent Message */}
                        <div className="flex justify-start items-start gap-2 w-full">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary border border-primary/25 flex items-center justify-center font-bold text-[8px] font-mono shrink-0 mt-0.5">
                            AI
                          </span>
                          <div className="bg-[#101010] border border-primary/20 text-white text-[10px] p-2.5 rounded-[16px] rounded-tl-sm max-w-[85%] text-left">
                            <p>Based on your query, the <strong>Jeju Volcanic Mask</strong> is formulated exactly for sensitive skin.</p>
                            <div className="mt-2.5 p-2 bg-black/40 border border-white/10 rounded-[12px] flex items-center gap-2">
                              <img src="/wellness_mockup.png" className="w-8 h-8 object-contain" />
                              <div className="flex-grow">
                                <p className="text-[8px] font-bold text-white leading-tight">Jeju Volcanic Mask</p>
                                <p className="text-[8px] text-primary font-mono">₹699 • <span className="line-through text-white/30">₹999</span></p>
                              </div>
                              <button className="px-3 h-7 bg-[#ffffff] text-black text-[8px] font-bold rounded-full uppercase tracking-wider shrink-0 cursor-pointer hover:bg-[#f5f5f7] transition-all">
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Chat Input Simulation */}
                      <div className="relative pt-2 border-t border-white/5 w-full">
                        <div className="w-full bg-white/5 border border-white/10 rounded-full h-10 px-3.5 py-2 text-[10px] text-white/40 flex justify-between items-center">
                          <span>Recommend another skincare routine...</span>
                          <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}

                </div>

                {/* Floating Speed Widget */}
                <div className="absolute bottom-[-16px] right-[-16px] z-20 w-44 p-4 rounded-[20px] bg-[#101010] border border-primary/20 flex items-center gap-3 shadow-xl backdrop-blur-md">
                  <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center font-mono font-bold text-xs text-primary bg-black/50">
                    98
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] text-[#a1a1aa] block font-mono">SPEED SCORE</span>
                    <span className="text-[11px] text-white font-bold">Core Web Vitals</span>
                  </div>
                </div>

              </div>

            </div>
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
          <div className="relative w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#0a0a0a]/95 backdrop-blur-2xl border-t sm:border border-white/[0.08] shadow-2xl animate-fade-blur">
            {/* Handle bar (mobile only) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300 z-50"
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Form */}
            <div className="p-6 sm:p-10 md:p-12">
              <StartProjectForm />
            </div>
          </div>
        </div>
      )}


      {/* 6. TRUSTED BY 800+ LEADING BRANDS LOGO SECTION */}
      <section className="py-16 md:py-24 lg:py-36 bg-white relative z-20 overflow-hidden rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px]">
        <div className="max-w-[1360px] mx-auto px-6 flex flex-col gap-6 text-center items-center mb-8">
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
      <section className="bg-white/[0.01] py-10 border-y border-white/[0.08] relative overflow-hidden z-10">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1 items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HORIZONTAL SCROLL SHOWCASE CAROUSEL (Directly below Hero) */}
      <section className="relative px-0 py-16 md:py-24 lg:py-36 z-20 rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px] border-t border-white/[0.08] bg-gradient-to-b from-[#031022] to-[#050505]">
        <div className="max-w-[1360px] mx-auto px-6 mb-6">
          <h2 className="premium-heading text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">Agency <span className="premium-highlight"><span className="light-gradient-text font-normal">Features</span> & Tools</span></h2>
        </div>
        
        <div className="overflow-x-auto hide-scrollbar min-w-0 grid px-6">
          <ul className="flex gap-5 min-w-0 *:flex-[0_0_19.5rem] md:*:flex-[0_0_24rem] xl:*:flex-[0_0_28rem] pb-4">
            {CAROUSEL_ITEMS.map((item, idx) => (
              <li key={idx}>
                <div className="premium-hover-card group grid rounded-[24px] gap-3 relative p-5 bg-gradient-to-b from-[#101010] to-[#070707] border border-white/[0.08] transition-all duration-500">
                  <a href={item.link} className="absolute inset-0 z-10">
                    <span className="sr-only">Open {item.title}</span>
                  </a>
                  
                  <figure className="premium-hover-image-container relative overflow-hidden rounded-[16px] aspect-[1.77] w-full bg-[#050505]">
                    {/* Media Image Showcase */}
                    <img
                      alt={item.title}
                      loading="lazy"
                      src={item.image}
                      className="premium-hover-image pointer-events-none select-none absolute inset-0 object-cover size-full opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating top badge */}
                    <span className="absolute top-3 left-3 bg-[#050505]/80 text-white text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border border-white/[0.08]">
                      {item.badge}
                    </span>
                  </figure>

                  <div className="text-left flex flex-col gap-1">
                    <h3 className="uppercase font-grotesk truncate text-sm font-bold text-white group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs truncate">
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
      <section className="py-16 md:py-24 lg:py-36 relative overflow-hidden bg-bg-dark border-b border-white/[0.08] z-10">
        <div className="max-w-[1360px] mx-auto px-6 mb-12 flex flex-col gap-4 text-center">
          <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
            Recent Work
          </span>
          <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight font-grotesk">
            Stores <span className="light-gradient-text font-normal">We've</span> Built & <span className="premium-highlight text-white">Transformed</span>
          </h2>
        </div>

        {/* Row 1 Marquee */}
        <div className="marquee-container marquee-pause mb-6">
          <div className="marquee-content" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW1.map((img, idx) => (
              <div key={idx} className="premium-hover-image-container flex-shrink-0 w-[280px] rounded-[24px] border border-white/[0.08] hover:border-primary/30 shadow-sm">
                <img src={img.src} alt={img.alt} className="premium-hover-image w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW1.map((img, idx) => (
              <div key={idx + "-dup"} className="premium-hover-image-container flex-shrink-0 w-[280px] rounded-[24px] border border-white/[0.08] hover:border-primary/30 shadow-sm">
                <img src={img.src} alt={img.alt} className="premium-hover-image w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Marquee - Reverse */}
        <div className="marquee-container marquee-pause">
          <div className="marquee-content-reverse" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW2.map((img, idx) => (
              <div key={idx} className="premium-hover-image-container flex-shrink-0 w-[280px] rounded-[24px] border border-white/[0.08] hover:border-primary/30 shadow-sm">
                <img src={img.src} alt={img.alt} className="premium-hover-image w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="marquee-content-reverse" aria-hidden="true" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW2.map((img, idx) => (
              <div key={idx + "-dup"} className="premium-hover-image-container flex-shrink-0 w-[280px] rounded-[24px] border border-white/[0.08] hover:border-primary/30 shadow-sm">
                <img src={img.src} alt={img.alt} className="premium-hover-image w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio" className="btn-secondary inline-flex items-center justify-center gap-2 px-8 h-13 rounded-full text-sm font-semibold uppercase tracking-wider text-white border border-white/20">
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4 text-primary premium-hover-icon" />
          </Link>
        </div>
      </section>

      {/* 9. BEFORE & AFTER PERFORMANCE COMPARISON */}
      <section className="py-16 md:py-24 lg:py-36 px-6 bg-gradient-to-b from-[#070e17] to-[#04080d] border-y border-white/[0.08] relative z-20 rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-16 px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              Engineering Proof
            </span>
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight font-grotesk">
              Legacy <span className="light-gradient-text font-normal">vs.</span> <span className="premium-highlight">SalePXL Rebuilds</span>
            </h2>
            <p className="text-white/70 text-base font-light">
              We replace sluggish, heavy pre-built templates with optimized custom engines. The difference is measurable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Legacy Store */}
            <div className="premium-hover-card p-8 rounded-[24px] bg-gradient-to-b from-[#101010] to-[#070707] border border-red-500/15 flex flex-col gap-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex justify-between items-center border-b border-white/[0.08] pb-4">
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
                    <span className="text-white/70 font-semibold">{item.label}</span>
                    <span className="text-red-400 font-mono font-bold text-right">{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SalePXL Optimized Store */}
            <div className="premium-hover-card p-8 rounded-[24px] bg-gradient-to-b from-[#101010] to-[#070707] border border-primary/20 flex flex-col gap-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex justify-between items-center border-b border-white/[0.08] pb-4">
                <h4 className="text-lg font-bold text-white">SalePXL Custom Engine</h4>
                <span className="text-[10px] bg-primary/10 text-primary border border-primary/25 px-3 py-1 rounded-full font-mono uppercase font-bold neon-shadow-lime">
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
                    <span className="text-white/70 font-semibold">{item.label}</span>
                    <span className="text-primary font-mono font-bold text-right">{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GOOGLE REVIEWS SECTION */}
      <section className="py-16 md:py-24 lg:py-36 relative overflow-hidden bg-gradient-to-b from-[#120324] to-[#070114] border-t border-white/[0.08] rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px] z-20">
        <div className="max-w-[1360px] mx-auto px-6">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.06] text-white/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Google Reviews
            </span>
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight leading-[1.1] font-grotesk mt-2">
              Loved <span className="light-gradient-text font-normal">by</span> Founders <span className="premium-highlight text-white">& Teams Worldwide</span>
            </h2>
          </div>

          {/* Main Card Container */}
          <div className="w-full bg-gradient-to-br from-[#101010] to-[#070707] border border-white/[0.08] rounded-[24px] p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col gap-12 shadow-2xl">
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,227,154,0.06),transparent_60%)] pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
              
              {/* Left Side: Avatar Side Tabs (Flags equivalent) */}
              <div className="flex lg:flex-col flex-row gap-3 items-center justify-center flex-wrap">
                {GOOGLE_REVIEWS_CONSOLIDATED.map((tab, idx) => {
                  const isActive = activeReviewIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveReviewIdx(idx)}
                      onMouseEnter={() => setActiveReviewIdx(idx)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${tab.avatarColor} text-white cursor-pointer relative ${
                        isActive 
                          ? "ring-[3px] ring-primary ring-offset-4 ring-offset-[#101010] scale-110 shadow-lg shadow-primary/25" 
                          : "opacity-45 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      {tab.avatarText}
                      {/* Active indicator dot */}
                      {isActive && (
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-[#101010] flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-black rounded-full" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Middle: Main Review Card (Swiping sweater image equivalent) */}
              <div className="flex-grow w-full flex justify-center items-center">
                <div className="relative w-[280px] sm:w-[320px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl border border-white/[0.08] bg-[#101010] group">
                  
                  {/* Store image mockups cross-fade */}
                  {GOOGLE_REVIEWS_CONSOLIDATED.map((tab, idx) => (
                    <motion.img
                      key={idx}
                      src={tab.image}
                      alt={tab.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeReviewIdx === idx ? 0.6 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent pointer-events-none" />

                  {/* Rating Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-black text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <span className="text-amber-500">★</span>
                    <span>5.0 rating</span>
                  </div>

                  {/* Profile overlay at the bottom */}
                  <div className="absolute bottom-6 inset-x-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].avatarColor}`}>
                        {GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].avatarText}
                      </span>
                      <div>
                        <p className="font-bold text-white text-sm">{GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].name}</p>
                        <p className="text-[9px] text-white/50 font-mono">{GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].metadata}</p>
                      </div>
                    </div>

                    <div className="w-full h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 text-center text-xs font-semibold text-white transition-all cursor-pointer">
                      Google Verified Reviewer
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Overlay Statistics and World Map (Dotted map equivalent) */}
              <div className="w-full lg:w-[45%] relative flex flex-col gap-6 select-none min-h-[280px] justify-center items-center lg:items-start">
                
                {/* SVG Dotted Map Background */}
                <div className="absolute inset-0 opacity-[0.06] text-primary pointer-events-none flex items-center justify-center">
                  <svg className="w-full h-full max-h-[220px]" viewBox="0 0 1000 500" fill="currentColor">
                    {/* Dotted grid approximation of map */}
                    <circle cx="150" cy="150" r="4"/><circle cx="170" cy="140" r="4"/><circle cx="190" cy="150" r="4"/><circle cx="210" cy="160" r="4"/>
                    <circle cx="230" cy="170" r="4"/><circle cx="250" cy="150" r="4"/><circle cx="270" cy="130" r="4"/><circle cx="290" cy="140" r="4"/>
                    <circle cx="310" cy="160" r="4"/><circle cx="330" cy="180" r="4"/><circle cx="350" cy="170" r="4"/><circle cx="370" cy="150" r="4"/>
                    <circle cx="500" cy="200" r="4"/><circle cx="520" cy="220" r="4"/><circle cx="540" cy="240" r="4"/><circle cx="560" cy="220" r="4"/>
                    <circle cx="580" cy="200" r="4"/><circle cx="600" cy="180" r="4"/><circle cx="620" cy="190" r="4"/><circle cx="640" cy="210" r="4"/>
                    <circle cx="660" cy="230" r="4"/><circle cx="680" cy="220" r="4"/><circle cx="700" cy="200" r="4"/><circle cx="720" cy="210" r="4"/>
                    <circle cx="740" cy="230" r="4"/><circle cx="760" cy="240" r="4"/><circle cx="780" cy="250" r="4"/><circle cx="800" cy="220" r="4"/>
                  </svg>
                </div>

                {/* Floating Metric Card (A4 Package equivalent) */}
                <div className="relative z-10 w-full max-w-[280px] p-5 rounded-[20px] bg-[#101010] border border-white/[0.08] flex flex-col gap-3 shadow-xl">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] text-white/50 font-mono uppercase tracking-wider">Growth Performance</span>
                    <span className="text-[9px] bg-primary/10 text-primary border border-primary/25 px-2 py-0.5 rounded-full font-mono font-bold">ACTIVE</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                      {GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].statVal}
                    </span>
                    <span className="text-[11px] text-[#a1a1aa] font-medium font-mono">
                      {GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].statLabel}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8e8e93]">
                    Measured metric from customer Shopify dashboard logs post-launch.
                  </p>
                </div>

                {/* Second Floating Checklist Card (Unfulfilled equivalent) */}
                <div className="relative z-10 w-full max-w-[280px] p-5 rounded-[20px] bg-[#101010] border border-white/[0.08] flex flex-col gap-2.5 shadow-xl">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-1">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-[10px] text-[#a1a1aa] font-mono uppercase tracking-wider">SalePXL Audit Checklist</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-white">
                    <span>99.9% Server Uptime</span>
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-white">
                    <span>Sub-1.5s Load Velocity</span>
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-white">
                    <span>MSME Certified Devs</span>
                    <span className="text-primary font-bold">✓</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom: Active Review Quote Text */}
            <div className="border-t border-white/10 pt-8 text-left max-w-4xl relative z-10">
              <span className="text-amber-500 flex gap-0.5 mb-3 text-lg">
                {[...Array(GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].stars)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug font-grotesk">
                "{GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].headline}"
              </h3>
              <p className="mt-4 text-[#a1a1aa] text-base leading-relaxed">
                {GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].text}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="py-16 md:py-24 lg:py-36 px-6 bg-bg-dark border-y border-white/[0.08] relative z-20 rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px]">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              FAQ
            </span>
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight font-grotesk">
              Auditing <span className="premium-highlight"><span className="light-gradient-text font-normal">Process</span> Details</span>
            </h2>
          </div>

          {/* Accordion FAQ list */}
          <div className="flex flex-col gap-4 text-left">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="premium-hover-card rounded-[20px] bg-[#101010] border border-white/[0.08] overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left text-white hover:text-primary transition-colors focus:outline-none group"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4.5 h-4.5 text-primary shrink-0 premium-hover-icon" />
                      <span className="text-sm sm:text-base font-semibold">{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180 text-primary" : "group-hover:text-primary"
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
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/[0.08]">
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
      <section id="audit" className="py-20 md:py-28 lg:py-40 px-6 relative overflow-hidden text-center bg-gradient-to-b from-[#002e1b] to-[#00140c] border-t border-white/[0.08] rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px] z-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col gap-8 items-center">
          <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
            Accelerate Growth
          </span>
          
          <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight leading-tight max-w-none font-grotesk">
            Ready <span className="light-gradient-text font-normal">to</span> Build Your <span className="premium-highlight">Shopify Store?</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Let's construct a lightning-fast, high-converting checkout experience custom designed for your brand.<br className="hidden sm:block" /> Get a free audit and consultation today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2 px-8 h-13 rounded-full text-sm font-bold uppercase tracking-wider text-black bg-white shadow-sm cursor-pointer"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4 premium-hover-icon" />
            </Link>
            
            <a
              href="https://wa.me/919917780656"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-secondary inline-flex items-center justify-center gap-2 px-8 h-13 rounded-full text-sm font-semibold uppercase tracking-wider text-white border border-white/20 text-center cursor-pointer"
            >
              <Phone className="w-4 h-4 text-primary premium-hover-icon" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-xs text-white/50 pt-6 border-t border-white/[0.08] w-full max-w-lg">
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

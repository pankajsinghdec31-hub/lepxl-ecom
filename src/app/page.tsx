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

const TAB_DATA = [
  {
    title: "Online and in person.",
    cards: [
      {
        type: "link",
        label: "SOBO Beauty",
        href: "https://sobobeauty.com/",
        image: "/imgi_80_sobo-beauty.webp",
        alt: "SOBO Beauty curated cosmetics store design"
      },
      {
        type: "link",
        label: "Swadezi",
        href: "https://swadezi.com/",
        image: "/imgi_93_swadezi.webp",
        alt: "Swadezi ethnic apparel boutique custom theme design",
        subTitle: "THE DESIGN COLLECTION"
      },
      {
        type: "video",
        label: "Interactive UI",
        image: "https://cdn.shopify.com/b/shopify-brochure2-assets/4a9828c3264de541545637026e9de272.jpg",
        video: "https://cdn.shopify.com/b/shopify-brochure2-assets/4ea4c67da04aea216ee972ec1b9bfb08.mp4",
        alt: "Why choose SalePXL preview poster"
      }
    ]
  },
  {
    title: "Across AI and on social.",
    cards: [
      {
        type: "link",
        label: "Kohkayn Basics",
        href: "https://kohkayn.com/",
        image: "/imgi_89_kohkayn-com.webp",
        alt: "Kohkayn Basics apparel store custom Next.js design"
      },
      {
        type: "link",
        label: "Well Essentials",
        href: "https://wellessentials.com/",
        image: "/imgi_81_well-essentials.webp",
        alt: "Well Essentials health superfoods speed optimized design"
      },
      {
        type: "link",
        label: "Amarose Perfumes",
        href: "https://amarose.com/",
        image: "/imgi_83_amarose.webp",
        alt: "Amarose premium scent store UX audit and layout design"
      }
    ]
  },
  {
    title: "Locally and globally.",
    cards: [
      {
        type: "link",
        label: "Skin Basics",
        href: "https://skinbasics.com/",
        image: "/imgi_91_skin-basics.webp",
        alt: "Skin Basics premium leather goods e-commerce storefront"
      },
      {
        type: "link",
        label: "Glyters Jewelry",
        href: "https://www.glyters.com/",
        image: "/jewelry_mockup.png",
        alt: "Glyters Fashion Jewelry custom theme development"
      },
      {
        type: "link",
        label: "RCFYIY Boutique",
        href: "https://rcfyiy-uj.myshopify.com/",
        image: "/apparel_mockup.png",
        alt: "RCFYIY Fashion Editorial brand storefront build"
      }
    ]
  }
];

interface CoreApp {
  name: string;
  bg: string;
  color: string;
  viewBox?: string;
  fill?: string;
  path: string;
}

const CORE_APPS: CoreApp[] = [
  { name: "Shopify", bg: "bg-[#95BF47]", color: "#95BF47", viewBox: "0 0 34 37", fill: "fill-white", path: "M28.45 10.98c-.46-1.22-1.55-2.02-2.82-2.12l-5.68-.42L18.42 2.3c-.34-1.29-1.4-2.19-2.7-2.31-1.3-.12-2.51.58-3.04 1.8L8.14 11.23l-3.32-.25c-1.32-.1-2.52.56-3.08 1.77l-1.56 3.4a2.95 2.95 0 00.17 2.98c.57.88 1.57 1.41 2.65 1.41h26.79c1.08 0 2.08-.53 2.65-1.41a2.95 2.95 0 00.17-2.98l-4.16-9.17z M15.72 1.02c-2.48 0-4.48 2-4.48 4.48v3.36h8.96V5.5c0-2.48-2-4.48-4.48-4.48z M6.16 36.5h19.04c2.41 0 4.37-1.96 4.37-4.37V14.18H1.79v17.95c0 2.41 1.96 4.37 4.37 4.37z M13.62 19.5c0-1.2.98-2.18 2.18-2.18 1.2 0 2.18.98 2.18 2.18v4.8c0 1.2-.98 2.18-2.18 2.18-1.2 0-2.18-.98-2.18-2.18v-4.8z" },
  { name: "Meta", bg: "bg-[#0064E0]", color: "#0064E0", fill: "fill-white", path: "M17 7c-1.8 0-3.3 1-4.2 2.5C11.9 8 10.4 7 8.6 7 5.5 7 3 9.5 3 12.6s2.5 5.6 5.6 5.6c1.8 0 3.3-1 4.2-2.5.9 1.5 2.4 2.5 4.2 2.5 3.1 0 5.6-2.5 5.6-5.6S20.1 7 17 7zm-8.4 9.2c-2 0-3.6-1.6-3.6-3.6s1.6-3.6 3.6-3.6 3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6zm8.4 0c-2 0-3.6-1.6-3.6-3.6s1.6-3.6 3.6-3.6 3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6z" },
  { name: "TikTok", bg: "bg-black", color: "#FE2C55", fill: "fill-white", path: "M12.5 2v10.5a3.5 3.5 0 1 1-3.5-3.5h1V6a6.5 6.5 0 1 0 6 6.5V6a5.5 5.5 0 0 1-3.5-4h-2.5z" },
  { name: "Google", bg: "bg-white", color: "#EA4335", path: "M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.12-5.136 4.12A5.72 5.72 0 0 1 8.28 12.8a5.72 5.72 0 0 1 5.71-5.72c2.47 0 4.41 1.487 5.25 3.525l3.86-1.5c-1.425-3.488-4.838-5.9-8.86-5.9C8.38 3.2 4 7.58 4 12.8s4.38 9.6 9.75 9.6c5.58 0 9.87-3.93 9.87-9.8 0-.665-.08-1.285-.2-1.83H12.24z" },
  { name: "Pinterest", bg: "bg-white", color: "#BD081C", fill: "fill-[#BD081C]", path: "M12 2C6.48 2 2 6.48 2 12c0 4.17 2.56 7.75 6.2 9.25-.1-.78-.19-1.98.04-2.84l1.64-6.93s-.42-.84-.42-2.07c0-1.94 1.13-3.39 2.53-3.39 1.19 0 1.77.9 1.77 1.97 0 1.2-.76 2.99-1.16 4.65-.33 1.39.7 2.52 2.07 2.52 2.48 0 4.39-2.62 4.39-6.4 0-3.35-2.4-5.69-5.84-5.69-3.98 0-6.32 2.98-6.32 6.07 0 1.2.46 2.49 1.04 3.19.11.14.13.26.1.39l-.39 1.58c-.06.26-.2.32-.46.2-1.72-.8-2.8-3.32-2.8-5.34 0-4.35 3.16-8.35 9.12-8.35 4.79 0 8.5 3.41 8.5 7.97 0 4.76-3 8.59-7.16 8.59-1.4 0-2.72-.73-3.17-1.59l-.86 3.29c-.31 1.2-1.15 2.7-1.72 3.62C9.44 21.78 10.69 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" },
  { name: "Snapchat", bg: "bg-[#FFFC00]", color: "#FFFC00", fill: "fill-black", path: "M12 2c-3.15 0-5.62 2.4-5.62 5.56 0 1.02.26 1.86.73 2.52-.44.25-.79.74-.79 1.34 0 .96.88 1.48 2.05 1.54.1.28.32.74.88 1.02-.97.26-2.58.83-2.58 2.37 0 1.53 1.56 1.9 3.82 1.9s3.82-.37 3.82-1.9c0-1.54-1.61-2.11-2.58-2.37.56-.28.78-.74.88-1.02 1.17-.06 2.05-.58 2.05-1.54 0-.6-.35-1.09-.79-1.34.47-.66.73-1.5.73-2.52 0-3.16-2.47-5.56-5.62-5.56z" },
  { name: "Spotify", bg: "bg-[#191414]", color: "#1DB954", fill: "fill-[#1DB954]", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.58 14.42c-.18.29-.56.38-.85.2-2.34-1.43-5.3-1.75-8.77-.96-.33.07-.66-.14-.73-.47-.07-.33.14-.66.47-.73 3.8-.87 7.08-.51 9.7.1.29.18.38.56.2.85zm1.22-2.73c-.22.36-.69.48-1.05.26-2.68-1.65-6.78-2.13-9.95-1.17-.4.12-.82-.1-.94-.5-.12-.4.1-.82.5-.94 3.63-1.1 8.15-.57 11.18 1.29.36.22.48.69.26 1.05zm.1-2.82C14.73 8.84 9.5 8.67 6.46 9.59c-.48.15-.99-.12-1.14-.6-.15-.48.12-.99.6-1.14 3.51-1.07 9.27-.88 12.98 1.32.44.26.58.82.32 1.26-.26.44-.82.58-1.26.32z" },
  { name: "Canva", bg: "bg-[#00C4CC]", color: "#00C4CC", fill: "fill-white", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 6.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-6 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm3 9.5c-2.33 0-4.31-1.46-5.1-3.5h10.2c-.79 2.04-2.77 3.5-5.1 3.5z" },
  { name: "Klaviyo", bg: "bg-white", color: "#FE5C5C", fill: "fill-[#FE5C5C]", path: "M19.5 12c0 4.14-3.36 7.5-7.5 7.5S4.5 16.14 4.5 12 7.86 4.5 12 4.5s7.5 3.36 7.5 7.5zM12 7.5l-3.5 3.5h2v5.5h3v-5.5h2z" },
  { name: "Mailchimp", bg: "bg-[#FFE01B]", color: "#FFE01B", fill: "fill-black", path: "M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12s4.48-10 10-10zm2 8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-4 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm2 6c2.5 0 4-1.5 4-3H8c0 1.5 1.5 3 4 3z" },
  { name: "Stripe", bg: "bg-[#635BFF]", color: "#635BFF", fill: "fill-white", path: "M20 10h-5.5V8.5h5.5V7h-5.5C13 7 11.5 8.5 11.5 10c0 1.5 1.5 3 3 3h5.5v1.5h-5.5V16h5.5C21.5 16 23 14.5 23 13c0-1.5-1.5-3-3-3z M12.5 10c0-1.5 1.5-3 3-3V13c-1.5 0-3-1.5-3-3z" },
  { name: "PayPal", bg: "bg-[#003087]", color: "#003087", fill: "fill-white", path: "M20.06 7.21c-.4-2.12-2.18-3.71-4.45-3.71H8.05c-.6 0-1.12.42-1.24 1.01L4.1 18.06c-.08.43.25.82.68.82h3.29c.47 0 .88-.33.98-.79l1.01-4.74h2.78c3.19 0 5.68-1.59 6.38-4.74.33-1.47.16-2.73-.5-3.4z" },
  { name: "Klarna", bg: "bg-[#FFB3C7]", color: "#FFB3C7", fill: "fill-black", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H9v-2h4c1.1 0 2-.9 2-2s-.9-2-2-2H9V6h4c2.2 0 4 1.8 4 4s-1.8 4-4 4z" },
  { name: "QuickBooks", bg: "bg-[#2CA01C]", color: "#2CA01C", fill: "fill-white", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H9V9h2V5h2v4h2v4h-2v4h-2z" }
];

const APP_ICONS = Array.from({ length: 56 }).map((_, idx) => {
  const core = CORE_APPS[idx % CORE_APPS.length];
  return {
    ...core,
    highlight: idx % 3 === 0
  };
});

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [hoveredCard3, setHoveredCard3] = useState(false);
  const [playVideoModal, setPlayVideoModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Typewriter effect state for hero headline dynamic text
  const words = [
    "AI all-star",
    "household name",
    "solo-preneur",
    "category creator",
    "global empire",
    "store they line up for",
    "big thing"
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02090a] to-transparent" />

        {/* ── HERO CONTENT — anchored bottom-left like Shopify ── */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-20 z-10">
          <div className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-20">
            {/* Agency badge */}
            <div className="mb-3 sm:mb-4 animate-fade-blur flex justify-start">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.06] text-white/80 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#36F4A4] animate-pulse" />
                India's #1 Shopify Agency
              </span>
            </div>

            {/* Giant headline */}
            <h1 className="text-[2.65rem] xs:text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.08] sm:leading-[1.0] tracking-tight max-w-3xl animate-fade-blur text-left" style={{ animationDelay: "0.05s" }}>
              Be the next<br />
              <span className="text-white">
                {currentText}
                <span className="typewriter-cursor" />
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="mt-4 sm:mt-5 text-white/80 text-base sm:text-lg leading-relaxed max-w-lg animate-fade-blur text-left" style={{ animationDelay: "0.1s" }}>
              Dream big and build fast on Shopify.<br />
              The world's best commerce platform.
            </p>

            {/* CTA buttons — Full-width stacked on mobile, auto-width left-aligned on desktop */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-start gap-3 w-full sm:w-auto max-w-sm sm:max-w-none animate-fade-blur" style={{ animationDelay: "0.15s" }}>
              <button
                onClick={() => setShowFormModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:px-7 sm:py-3.5 rounded-full bg-white text-black text-xs sm:text-sm font-bold hover:bg-white/90 transition-all duration-200 hover:scale-[1.01]"
              >
                Start for free
              </button>
              <button
                onClick={() => setShowFormModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:px-7 sm:py-3.5 rounded-full border border-white text-white text-xs sm:text-sm font-semibold hover:bg-white/10 hover:border-white transition-all duration-200 backdrop-blur-sm"
              >
                {/* Play circle icon inline */}
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    <span key={i} className="w-5.5 h-5.5 rounded-full bg-[#1a3a2a] border border-[#02090a] flex items-center justify-center text-[7px] font-bold text-[#36F4A4]">{t}</span>
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
      <section className="py-24 relative z-10 overflow-hidden bg-bg-dark border-b border-white/[0.05] rounded-t-[32px] md:rounded-t-[48px]">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-20">
          
          {/* Main big headline / Interactive Tabs */}
          <div className="max-w-5xl text-left mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-[3.25rem] font-normal leading-[1.2] tracking-tight font-grotesk select-none flex flex-wrap gap-x-4 gap-y-3">
              <span className="text-white/30 mr-1">
                Sell everywhere people shop.
              </span>
              {[
                "Online and in person.",
                "Across AI and on social.",
                "Locally and globally."
              ].map((text, idx) => {
                const isActive = activeTab === idx;
                return (
                  <span
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`cursor-pointer transition-colors duration-300 inline-block ${
                      isActive 
                        ? "text-white" 
                        : "text-white/30 hover:text-[#36F4A4]"
                    }`}
                  >
                    {text}
                  </span>
                );
              })}
            </h2>
          </div>

          {/* Cards grid / Carousel with Framer Motion transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory scrollbar-none pb-4 md:pb-0"
            >
              {TAB_DATA[activeTab].cards.map((card, idx) => {
                if (card.type === "video") {
                  return (
                    <div 
                      key={idx}
                      onMouseEnter={() => setHoveredCard3(true)}
                      onMouseLeave={() => setHoveredCard3(false)}
                      className="relative h-[450px] sm:h-[520px] rounded-2xl overflow-hidden group border border-white/5 bg-[#0a0b0d] transition-all duration-500 hover:scale-[1.015] hover:shadow-2xl hover:shadow-black/50 cursor-pointer snap-start shrink-0 w-[85vw] sm:w-[360px] md:w-auto"
                    >
                      {/* Background poster image */}
                      <img 
                        src={card.image} 
                        alt={card.alt}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-103 ${hoveredCard3 ? "opacity-0" : "opacity-100"}`}
                      />

                      {/* Video playing inline on hover */}
                      <video
                        src={card.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hoveredCard3 ? "opacity-100 scale-103" : "opacity-0 pointer-events-none"}`}
                      />

                      {/* Vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Small top-left branding badge */}
                      <span className="absolute top-4 left-4 bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm z-10">
                        {card.label}
                      </span>

                      {/* Floating button at bottom-right */}
                      <div className="absolute bottom-6 right-6 z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayVideoModal(true);
                          }}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-black/70 hover:bg-white text-white hover:text-black text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md border border-white/20 hover:border-white transition-all duration-300 shadow-lg cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Why choose SalePXL</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                // Normal link card
                return (
                  <a 
                    key={idx}
                    href={card.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative block h-[450px] sm:h-[520px] rounded-2xl overflow-hidden group border border-white/5 bg-[#0a0b0d] transition-all duration-500 hover:scale-[1.015] hover:shadow-2xl hover:shadow-black/50 snap-start shrink-0 w-[85vw] sm:w-[360px] md:w-auto"
                  >
                    {/* Image filling the card */}
                    <img 
                      src={card.image} 
                      alt={card.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Optional subTitle & Explore link overlay for cards like Kotn */}
                    {card.subTitle ? (
                      <>
                        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 right-6 text-left flex flex-col gap-2 z-10">
                          <span className="text-white font-normal text-lg tracking-tight leading-tight">
                            {card.subTitle}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#36F4A4] uppercase">
                            <span>Explore Now</span>
                            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </>
                    ) : null}

                    {/* Small top-left branding badge */}
                    <span className="absolute top-4 left-4 bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm z-10">
                      {card.label}
                    </span>
                  </a>
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── CUSTOMIZE WITH APPS SECTION ── */}
      <section className="py-24 relative z-10 overflow-hidden bg-bg-dark border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left side text column */}
            <div className="w-full lg:w-[45%] text-left flex flex-col justify-center">
              <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight font-grotesk">
                Customize everything with apps
              </h2>
              <p className="mt-6 text-[#a1a1aa] text-base sm:text-lg leading-relaxed max-w-lg">
                The Shopify App Store has <a href="https://apps.shopify.com" target="_blank" rel="noopener noreferrer" className="underline text-white hover:text-[#36F4A4] transition-colors font-semibold">21,000+ commerce apps</a> for whatever specialized features your business might need.
              </p>
            </div>

            {/* Right side interactive app grid */}
            <div className="w-full lg:w-[55%] relative select-none">
              {/* Fade out mask overlays on desktop */}
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#02090a] to-transparent pointer-events-none z-20 hidden lg:block" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02090a] to-transparent pointer-events-none z-20 hidden lg:block" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#02090a] to-transparent pointer-events-none z-20 hidden lg:block" />

              <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 sm:gap-4 max-h-[480px] overflow-hidden lg:pr-8 pr-0">
                {APP_ICONS.map((app, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-2xl flex items-center justify-center p-3.5 sm:p-4 transition-all duration-300 hover:scale-115 hover:rotate-[2deg] hover:z-30 cursor-pointer shadow-lg group ${app.bg} ${
                      app.highlight 
                        ? "opacity-100 hover:shadow-2xl hover:shadow-white/20" 
                        : "opacity-35 hover:opacity-100 hover:shadow-2xl"
                    }`}
                    style={{
                      transitionDelay: `${(idx % 8) * 15}ms`
                    }}
                    title={app.name}
                  >
                    <svg 
                      viewBox={app.viewBox || "0 0 24 24"} 
                      className={`w-full h-full ${app.fill || "fill-current"}`}
                    >
                      <path d={app.path} />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── VIDEO PLAYER MODAL ── */}
      {playVideoModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-blur" role="dialog" aria-modal="true">
          <button 
            onClick={() => setPlayVideoModal(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50"
            aria-label="Close video player"
          >
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
          
          <div className="w-full max-w-5xl px-4 aspect-video">
            <video
              src="https://cdn.shopify.com/b/shopify-brochure2-assets/4ea4c67da04aea216ee972ec1b9bfb08.mp4"
              controls
              autoPlay
              playsInline
              className="w-full h-full rounded-2xl shadow-2xl border border-white/10 bg-black"
            />
          </div>
        </div>
      )}


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

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
  Share2,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import EnquiryBox from "@/components/EnquiryBox";
import InteractiveFunnel from "@/components/InteractiveFunnel";
import { copyImages } from "./how-it-works/actions";

import AnimatedDashboard from "@/components/AnimatedDashboard";
import StartProjectForm from "@/components/StartProjectForm";
import GrowthFormulaSection from "@/components/GrowthFormulaSection";
import InteractiveComparison from "@/components/InteractiveComparison";

// FAQ Items
const FAQ_ITEMS = [
  {
    q: "What is your typical project delivery timeline?",
    a: "Our standard delivery timeline is 3 to 7 days, depending on the complexity and custom features required for your Shopify store."
  },
  {
    q: "Do you handle shipping configurations?",
    a: "Yes. We handle complete shipping setups. Since we are official partners with multiple shipping companies (such as Shiprocket, Delhivery, etc.), we help you integrate optimal rates and automated order sync directly in your dashboard."
  },
  {
    q: "Do you configure payment gateways?",
    a: "Yes. We provide complete payment gateway setup. We are partners with multiple gateway provider companies (including Razorpay, Stripe, Paytm, etc.) to ensure a smooth, secure checkout flow for your customers."
  },
  {
    q: "What after-sales support do you offer?",
    a: "We offer complimentary support for soft changes (minor text adjustments, banner updates, bug fixes, layout tweaks) for up to 1 month post-launch."
  },
  {
    q: "Will we receive dashboard training?",
    a: "Absolutely. We provide a complete Shopify dashboard training session. We will guide you through product listings, updating homepage banners, setting up discount offers, and understanding overall store metrics."
  },
  {
    q: "What are your payment terms?",
    a: "Our standard payment term is 50% advance to initiate the build and the remaining 50% upon successful delivery of the project."
  },
  {
    q: "Is the storefront fully search engine optimized (SEO friendly)?",
    a: "Yes. We build stores with standard SEO practices in mind, including meta description fields, semantic HTML5 structure, image alt-tag configs, and page speed optimization to help you rank higher on Google search results."
  },
  {
    q: "Will my store be responsive and mobile-friendly?",
    a: "Yes. Over 80% of e-commerce traffic comes from mobile devices, so we follow a strict mobile-first design system. Touch targets, checkout slides, and image banners are fully optimized for all screen sizes."
  },
  {
    q: "Do you design custom graphics and banners for the store?",
    a: "Yes. We create customized, high-converting banner designs and collection graphics tailored to your brand identity, ensuring a premium, polished storefront aesthetic."
  },
  {
    q: "Can you migrate my existing store to Shopify?",
    a: "Yes. We handle complete migrations from WooCommerce, Magento, Wix, or other e-commerce platforms. We migrate products, client databases, collections, and configurations cleanly without losing search index rankings."
  },
  {
    q: "Do you offer AI product photoshoots and listing setup?",
    a: "Yes. We offer AI-powered product photoshoots depending on the product type. We also include up to 20 free product listings complete with AI-generated photoshoot imagery to get your store live quickly with premium visuals."
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
    headline: "Fully Built & Live in 3 Days!",
    text: "The speed of execution was incredible. Our Shopify Store was fully designed, built, and launched in just 3 days without cutting any corners on layout quality or performance.",
    image: "/founder_4.jpg",
    statVal: "3 Days",
    statLabel: "Delivery Speed",
    category: "Clothing & Apparel Store"
  },
  {
    name: "James Park",
    avatarColor: "bg-rose-600",
    avatarText: "JP",
    metadata: "Local Guide · 13 reviews · 5 photos",
    stars: 5,
    timeAgo: "5 months ago",
    headline: "Premium High-Converting Design",
    text: "The design speed and quality are phenomenal. They built custom sections that fit our branding guidelines perfectly, giving us a unique and high-converting storefront design.",
    image: "/founder_5.jpg",
    statVal: "+85%",
    statLabel: "Brand Appeal",
    category: "Health & Wellness Store"
  },
  {
    name: "Monica Fernandes",
    avatarColor: "bg-amber-600",
    avatarText: "MF",
    metadata: "Local Guide · 28 reviews · 10 photos",
    stars: 5,
    timeAgo: "2 months ago",
    headline: "Optimized & Branded Storefront",
    text: "Our storefront is now fully optimized for mobile devices and perfectly represents our brand style. The checkout flow is fast and completely frictionless.",
    image: "/founder_2.jpg",
    statVal: "+4.2%",
    statLabel: "Conversion Rate",
    category: "Bracelet & Jewelry Store"
  },
  {
    name: "Deepika Nair",
    avatarColor: "bg-blue-600",
    avatarText: "DN",
    metadata: "Local Guide · 36 reviews · 18 photos",
    stars: 5,
    timeAgo: "7 months ago",
    headline: "AI Photoshoot Saved Photo Costs",
    text: "Their AI photoshoot service saved us lakhs in photography expenses. It turned basic flat-lay pictures into premium lifestyle catalog shots instantly.",
    image: "/founder_3.jpg",
    statVal: "-90%",
    statLabel: "Photoshoot Costs",
    category: "Furniture & Home Decor Store"
  },
  {
    name: "Sneha Rao",
    avatarColor: "bg-red-500",
    avatarText: "SR",
    metadata: "Local Guide · 21 reviews · 9 photos",
    stars: 5,
    timeAgo: "3 months ago",
    headline: "Dedicated Developer Team Support",
    text: "The post-launch team support has been outstanding. They resolved minor adjustments instantly, provided complete dashboard training, and acted like true partners.",
    image: "/founder_1.jpg",
    statVal: "+3.8x",
    statLabel: "Customer LTV",
    category: "Organic Tea & Beverages Store"
  }
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
  { src: "/chomp.jpg", alt: "Chomp Brand" },
  { src: "/offlimits.jpg", alt: "OffLimits" },
  { src: "/baboon.jpg", alt: "Baboon to the Moon" },
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
  { src: "/spanx.jpg", alt: "Spanx" },
  { src: "/glossier.png", alt: "Glossier" },
  { src: "https://jhango-images.b-cdn.net/images/crumbbs-in.webp", alt: "Crumbbs" },
  { src: "https://jhango-images.b-cdn.net/images/floof-and-co.webp", alt: "Floof & Co" },
  { src: "https://jhango-images.b-cdn.net/images/kaayu-world.webp", alt: "Kaayu World" },
  { src: "https://jhango-images.b-cdn.net/images/kohkayn-com.webp", alt: "Kohkayn" },
  { src: "https://jhango-images.b-cdn.net/images/newdru.webp", alt: "Newdru" },
  { src: "https://jhango-images.b-cdn.net/images/skin-basics.webp", alt: "Skin Basics" },
  { src: "https://jhango-images.b-cdn.net/images/sleep-shell-2.webp", alt: "Sleep Shell" },
  { src: "https://jhango-images.b-cdn.net/images/swadezi.webp", alt: "Swadezi" }
];



const PORTFOLIO_CARDS = [
  {
    label: "Chomp Brand",
    image: "/chomp.jpg",
    alt: "Designed a premium skateboarding and streetwear collaborative storefront with interactive drop layouts.",
    category: "Apparel & Skateboarding"
  },
  {
    label: "OffLimits",
    image: "/offlimits.jpg",
    alt: "Cereal brand experience featuring custom gamified mechanics and high-impact digital storytelling.",
    category: "Vegan Cereal"
  },
  {
    label: "Baboon to the Moon",
    image: "/baboon.jpg",
    alt: "Modern technical bags store with high-contrast colorways, sticky CTAs, and curated catalog navigation.",
    category: "Premium Travel Bags"
  },
  {
    label: "Spanx",
    image: "/spanx.jpg",
    alt: "Optimized premium apparel collections showcasing fit finders and multi-region storefront synchronization.",
    category: "Apparel & Shapewear"
  },
  {
    label: "Glossier",
    image: "/glossier.png",
    alt: "Aesthetic makeup storefront featuring high-converting skincare routes and intuitive checkout drawers.",
    category: "Cosmetics & Beauty"
  },
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
    title: "Strategy & Planning",
    desc: "We understand your brand, products, and audience to create a Shopify store built for maximum conversions.",
    desktopImg: "/process_plan_mockup.png",
    mobileImg: "/process_plan_mockup.png"
  },
  {
    num: "02",
    title: "Build High-CRO Shopify Stores",
    desc: "We design and develop lightning-fast, mobile-first Shopify stores with custom Liquid development, premium UX, and conversion-focused layouts.",
    desktopImg: "/experts_desktop.png",
    mobileImg: "/experts_mobile.png"
  },
  {
    num: "03",
    title: "Optimize & Scale",
    desc: "From CRO improvements and performance optimization to advanced Shopify features, we help your store increase sales and scale profitably.",
    desktopImg: "/process_sales_mockup.png",
    mobileImg: "/process_sales_mockup.png"
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
  { name: "CCAvenue", src: "/ccavenue.png", highlight: true },
  { name: "Cashfree Payments", src: "/cashfree.png", highlight: true },
  { name: "Shadowfax", src: "/shadowfax.png", highlight: true },
  { name: "Ekart Logistics", src: "/ekart.png", highlight: true },
  { name: "DTDC", src: "/dtdc.png", highlight: true },
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


const TrafficParticles = ({ active }: { active: boolean }) => {
  return (
    <div className="relative w-full h-16 bg-black/40 border border-white/5 rounded-xl overflow-hidden flex items-center justify-between px-4 mt-4">
      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-500 ${active ? "border-primary/50 text-primary bg-primary/5 shadow-[0_0_15px_rgba(34,227,154,0.15)]" : "border-white/10 text-white/30"}`}>
        Store
      </div>
      <div className="relative flex-grow h-12 overflow-hidden mx-4 flex items-center justify-center">
        {active ? (
          <>
            <span className="absolute w-1.5 h-1.5 rounded-full bg-primary/80" style={{ animation: 'traffic-particle 1.5s infinite linear 0s' }} />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-primary/80" style={{ animation: 'traffic-particle 1.5s infinite linear 0.4s' }} />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-primary/80" style={{ animation: 'traffic-particle 1.5s infinite linear 0.8s' }} />
            <span className="absolute w-1 h-1 rounded-full bg-primary/40" style={{ animation: 'traffic-particle 1.5s infinite linear 0.2s' }} />
            <span className="absolute w-1 h-1 rounded-full bg-primary/40" style={{ animation: 'traffic-particle 1.5s infinite linear 0.6s' }} />
          </>
        ) : (
          <div className="text-[10px] text-white/10 font-mono tracking-widest">HOVER TO FLOW</div>
        )}
      </div>
      <div className="text-right shrink-0">
        <span className="text-[9px] text-white/40 block font-mono">TRAFFIC</span>
        <span className={`text-xs font-bold font-mono transition-colors duration-500 ${active ? "text-primary" : "text-white/60"}`}>
          {active ? "+2,450%" : "Attract Mode"}
        </span>
      </div>
    </div>
  );
};

const TrustMeter = ({ active }: { active: boolean }) => {
  return (
    <div className="relative w-full h-16 bg-black/40 border border-white/5 rounded-xl overflow-hidden flex items-center justify-between px-4 mt-4 transition-all duration-500">
      <div className="flex flex-col text-left shrink-0">
        <span className="text-[9px] text-white/40 block font-mono">SECURE SSL</span>
        <span className={`text-xs font-bold font-mono transition-colors duration-500 ${active ? "text-primary" : "text-white/60"}`}>
          {active ? "99.9% TRUSTED" : "UNVERIFIED"}
        </span>
      </div>
      
      <div className="flex items-center justify-center relative w-10 h-10">
        {active ? (
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(34,227,154,0.3)] text-xs">
            ✓
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 text-xs">
            ?
          </div>
        )}
      </div>
      
      <div className="w-20 bg-white/5 h-1.5 rounded-full overflow-hidden shrink-0">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: active ? "100%" : "40%" }}
        />
      </div>
    </div>
  );
};

const UserJourneyMockup = ({ active }: { active: boolean }) => {
  return (
    <div className="relative w-full h-16 bg-black/40 border border-white/5 rounded-xl overflow-hidden flex items-center justify-between px-4 mt-4">
      <div className="flex gap-1.5 items-center my-auto w-full justify-between">
        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs transition-all ${active ? "border-primary/40 bg-primary/5 text-primary" : "border-white/10 text-white/30"}`}>
          🛒
        </div>
        <div className="flex-grow mx-2 relative h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-[1500ms] ease-out"
            style={{ width: active ? "100%" : "0%" }}
          />
        </div>
        <div className={`w-14 h-8 rounded-lg border flex flex-col items-center justify-center transition-all ${active ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-white/30"}`}>
          <span className="text-[8px] font-mono leading-none">CHECKOUT</span>
          <span className="text-[9px] font-bold mt-0.5">{active ? "Instant" : "Slow"}</span>
        </div>
      </div>
    </div>
  );
};

const PerformanceMeter = ({ active }: { active: boolean }) => {
  return (
    <div className="relative w-full h-16 bg-black/40 border border-white/5 rounded-xl overflow-hidden flex items-center justify-between px-4 mt-4">
      <div className="text-left shrink-0">
        <span className="text-[9px] text-white/40 block font-mono">SPEED INDEX</span>
        <span className={`text-xs font-bold font-mono transition-colors duration-500 ${active ? "text-primary" : "text-amber-500"}`}>
          {active ? "100/100" : "70/100"}
        </span>
      </div>

      <div className="relative w-20 h-10 flex items-center justify-center overflow-hidden">
        <svg className="w-16 h-16 transform -rotate-180" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#222"
            strokeWidth="10"
            fill="none"
            strokeDasharray="125 250"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={active ? "#22E39A" : "#D97706"}
            strokeWidth="10"
            fill="none"
            strokeDasharray={active ? "125 250" : "85 250"}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute bottom-0 text-[9px] font-mono text-white/40">CORE INDEX</span>
      </div>

      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${active ? "bg-primary/10 text-primary border border-primary/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"}`}>
        {active ? "FAST" : "SLOW"}
      </span>
    </div>
  );
};

const RevenueGraph = ({ activeCount }: { activeCount: number }) => {
  const getPath = () => {
    switch (activeCount) {
      case 0: return "M10 80 Q 40 80, 70 80 T 130 80";
      case 1: return "M10 80 Q 40 75, 70 70 T 130 65";
      case 2: return "M10 80 Q 40 70, 70 60 T 130 45";
      case 3: return "M10 80 Q 40 60, 70 50 T 130 25";
      case 4: return "M10 80 Q 40 45, 70 25 T 130 10";
      default: return "M10 80 Q 40 80, 70 80 T 130 80";
    }
  };

  return (
    <div className="relative w-full h-24 bg-black/40 border border-white/10 rounded-xl overflow-hidden mt-4">
      <svg className="w-full h-full" viewBox="0 0 140 90">
        <line x1="10" y1="10" x2="130" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="10" y1="35" x2="130" y2="35" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="10" y1="60" x2="130" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        
        {activeCount > 0 && (
          <path
            d={`${getPath()} L 130 80 L 10 80 Z`}
            fill="url(#chart-area-grad)"
            className="transition-all duration-1000 ease-out"
          />
        )}
        
        <path
          d={getPath()}
          fill="none"
          stroke={activeCount === 4 ? "#22E39A" : "rgba(255,255,255,0.2)"}
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        
        <defs>
          <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22E39A" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22E39A" stopOpacity="0.0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const getStepIcon = (iconName: string) => {
  switch (iconName) {
    case "Sliders": return <Sliders className="w-5 h-5" />;
    case "Code": return <Code className="w-5 h-5" />;
    case "CheckCircle2": return <CheckCircle2 className="w-5 h-5" />;
    case "Zap": return <Zap className="w-5 h-5" />;
    default: return null;
  }
};

const FUNNEL_STEPS = [
  {
    num: "01",
    short: "Sources",
    title: "Traffic Sources",
    subtitle: "Organic SEO, Google Ads, Meta Ads, Instagram, TikTok",
    desc: "We drive targeted, high-intent traffic from organic searches, search engine ads, and social media platforms to the store front.",
    sources: ["Organic SEO", "Google Ads", "Meta Ads", "Instagram", "TikTok"]
  },
  {
    num: "02",
    short: "Traffic",
    title: "TRAFFIC",
    subtitle: "Qualified Customer Entry",
    desc: "Attract and secure high-intent shoppers on the store's landing layers, creating consistent growth momentum.",
    sources: ["High Intent Visitors", "Targeted Audience", "Minimal Bounce Rate"]
  },
  {
    num: "03",
    short: "Impression",
    title: "Website First Impression",
    subtitle: "Immediate Visual Engagement",
    desc: "Within milliseconds, visitors experience a premium, custom interface that loads instantly and positions your brand at the top tier.",
    sources: ["Sub-1.2s mobile loading", "99/100 Speed Score", "Sleek typography", "Zero layout shift"]
  },
  {
    num: "04",
    short: "Trust",
    title: "TRUST",
    subtitle: "Eliminating Buying Friction",
    desc: "Authentic trust signals, reviews, clear policies, and secure badges give customers the confidence to purchase.",
    sources: ["SSL secured certificate", "MSME Registered seal", "★ 5.0 Star Ratings", "Secure Payment Gateway"]
  },
  {
    num: "05",
    short: "Experience",
    title: "SHOPPING EXPERIENCE",
    subtitle: "Seamless Product Discovery",
    desc: "Fluid page navigation, crystal-clear media, sticky add-to-cart, and interactive product choices make selection effortless.",
    sources: ["Interactive size overlays", "Sticky buy drawer", "Instant cart drawers", "Smooth image swiping"]
  },
  {
    num: "06",
    short: "Boosters",
    title: "CONVERSION BOOSTERS",
    subtitle: "Maximizing Average Order Value",
    desc: "Smart upsell recommendations, automatic bundle builders, and express checkout sliders are placed strategically.",
    sources: ["Frequently bought together", "Express UPI checkout", "Tiered free shipping goal", "Cart upsell recommendations"]
  },
  {
    num: "07",
    short: "Purchase",
    title: "PURCHASE",
    subtitle: "Frictionless Checkout",
    desc: "A streamlined checkout process supporting all local payment gateways with zero redirection delays.",
    sources: ["Google Pay & Apple Pay", "Credit/Debit & Netbanking", "One-click UPI payment", "COD security checks"]
  },
  {
    num: "08",
    short: "Retention",
    title: "RETENTION",
    subtitle: "Turning Buyers Into Fans",
    desc: "Post-purchase alerts, automated loyalty emails, and WhatsApp status tracking build lifetime customer value.",
    sources: ["WhatsApp tracking link", "Automated email discount", "Cohort analytics: +40%", "Customer account portal"]
  },
  {
    num: "09",
    short: "Scale",
    title: "SCALE",
    subtitle: "Compound Monthly Growth",
    desc: "Higher conversion rate and larger basket size maximize your ROAS, enabling you to scale ad budgets profitably.",
    sources: ["2x to 4x ROAS increase", "Higher ad budget capability", "Compound monthly revenue", "Market expansion ready"]
  }
];

// ────────────────────────────────────────────────────────
// ── CARTOON STORYBOARD HELPER COMPONENTS ────────────────
// ────────────────────────────────────────────────────────

const StoreFrontSVG = ({ doorRotate, lightsOn }: { doorRotate: any; lightsOn: boolean }) => (
  <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-end justify-center select-none">
    <div className={`w-40 h-32 sm:w-48 sm:h-36 rounded-t-lg border-4 border-slate-900 relative transition-colors duration-500 ${lightsOn ? 'bg-amber-50' : 'bg-slate-100'} shadow-md`}>
      <div className="absolute -top-4 -left-3 -right-3 h-8 bg-rose-400 border-4 border-slate-900 rounded-lg flex overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`flex-1 h-full ${i % 2 === 0 ? 'bg-rose-400' : 'bg-white'}`} />
        ))}
      </div>
      <div className="absolute top-8 left-3 w-10 h-12 bg-blue-100 border-4 border-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
        <div className="w-full h-0.5 bg-slate-900/10 rotate-45" />
      </div>
      <div className="absolute top-8 right-3 w-10 h-12 bg-blue-100 border-4 border-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
        <div className="w-full h-0.5 bg-slate-900/10 -rotate-45" />
      </div>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-300 border-4 border-slate-900 px-3 py-1 rounded-lg shadow-sm font-mono text-[9px] font-bold text-slate-900 tracking-wider">
        STORE
      </div>
      <motion.div 
        style={{ rotateY: doorRotate, originX: 0 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-20 bg-rose-500 border-4 border-slate-900 rounded-t-lg z-10 flex items-center justify-end pr-1"
      >
        <div className="w-2 h-2 rounded-full bg-yellow-300 border-2 border-slate-900" />
      </motion.div>
      {lightsOn && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-16 bg-yellow-100/50 blur-sm rounded-t-lg" />
      )}
    </div>
  </div>
);

const StoreOwnerSVG = ({ smile }: { smile: boolean }) => (
  <div className="w-20 h-28 relative flex flex-col items-center justify-end select-none">
    <div className="w-9 h-9 rounded-full bg-[#fde047] border-3 border-slate-900 relative">
      <div className="absolute -top-1 -inset-x-0.5 h-3.5 rounded-t-full bg-slate-700" />
      <div className="flex gap-2 justify-center mt-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
      </div>
      <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 border-b-3 border-slate-900 rounded-b-full transition-all duration-300 ${smile ? 'scale-y-125' : 'scale-y-75'}`} />
    </div>
    <div className="w-10 h-12 bg-teal-500 border-3 border-slate-900 rounded-t-xl -mt-1 relative flex items-center justify-center">
      <div className="w-4 h-6 bg-slate-800 border-2 border-slate-900 rounded-md flex items-center justify-center absolute -left-2 top-1.5 rotate-[12deg] shadow-md">
        <div className="w-2.5 h-4 bg-green-300 rounded-sm animate-pulse" />
      </div>
    </div>
  </div>
);

const CartSVG = ({ opacity, x }: { opacity: any; x: any }) => (
  <motion.div 
    style={{ opacity, x }}
    className="w-20 h-20 absolute left-24 bottom-0 flex items-end justify-center select-none z-20 pointer-events-none"
  >
    <div className="w-16 h-10 border-4 border-slate-900 bg-white rounded-b-xl relative flex items-center justify-center">
      <div className="absolute top-1 left-2 right-2 h-0.5 bg-slate-900/10" />
      <div className="absolute top-2.5 left-3 right-3 h-0.5 bg-slate-900/10" />
      <div className="absolute -left-3 top-0.5 w-4 h-1 bg-slate-900 rounded-full rotate-[35deg]" />
      <div className="absolute -left-4 top-1.5 w-1.5 h-5 bg-slate-900 rounded-full" />
    </div>
    <div className="absolute bottom-0 left-3 w-4 h-4 rounded-full bg-slate-800 border-3 border-slate-900" />
    <div className="absolute bottom-0 right-3 w-4 h-4 rounded-full bg-slate-800 border-3 border-slate-900" />
  </motion.div>
);

const ProductNode = ({ 
  x, 
  y, 
  opacity, 
  iconType 
}: { 
  x: any; 
  y: any; 
  opacity: any; 
  iconType: 'shirt' | 'bag' | 'shoe' 
}) => {
  const bgColors = {
    shirt: 'bg-emerald-400',
    bag: 'bg-indigo-400',
    shoe: 'bg-rose-400'
  };
  
  return (
    <motion.div 
      style={{ x, y, opacity }}
      className={`w-9 h-9 rounded-full border-3 border-slate-900 flex items-center justify-center shadow-md absolute z-30 ${bgColors[iconType]}`}
    >
      {iconType === 'shirt' && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-900"><path d="M20.38 3.46L16 6.14V2H8v4.14L3.62 3.46a2 2 0 00-2.38.9L1 5v9a2 2 0 001.27 1.86l7.73 3.12V22h4v-3.02l7.73-3.12A2 2 0 0023 14V5a2 2 0 00-.62-.64 2 2 0 00-2-.9z"/></svg>
      )}
      {iconType === 'bag' && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-900"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
      )}
      {iconType === 'shoe' && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-900"><path d="M3 12h18M3 16h18M4 8h16"/></svg>
      )}
    </motion.div>
  );
};

const Character = ({ 
  leftLegRot, 
  rightLegRot, 
  leftArmRot, 
  rightArmRot, 
  bodyBounceY,
  accessory 
}: { 
  leftLegRot: any; 
  rightLegRot: any; 
  leftArmRot: any; 
  rightArmRot: any; 
  bodyBounceY: any;
  accessory: string;
}) => {
  return (
    <motion.div 
      style={{ y: bodyBounceY }}
      className="w-36 h-48 relative flex flex-col items-center justify-end select-none pointer-events-none z-30"
    >
      {accessory === 'balls' && (
        <div className="absolute top-2 inset-x-0 h-16 flex justify-between px-3 pointer-events-none">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] font-mono font-bold text-white shadow-lg shadow-emerald-500/40 animate-bounce">
            Org
          </div>
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[7px] font-mono font-bold text-white shadow-lg shadow-blue-500/40 animate-bounce" style={{ animationDelay: '0.2s' }}>
            Ads
          </div>
        </div>
      )}

      {accessory === 'gift' && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-8 h-8 bg-rose-500 border-3 border-slate-900 rounded-lg shadow-md z-20 flex flex-col items-center justify-center">
          <div className="absolute top-2.5 left-0 right-0 h-0.5 bg-yellow-400" />
          <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-yellow-400" />
        </div>
      )}

      <div className="w-14 h-14 rounded-full bg-[#fde047] border-4 border-slate-900 shadow-md relative flex items-center justify-center">
        <div className="absolute -top-1 -inset-x-0.5 h-5 rounded-t-full bg-slate-800" />
        <div className="flex gap-2.5 mt-1">
          <div className="w-2 h-2 rounded-full bg-slate-900" />
          <div className="w-2 h-2 rounded-full bg-slate-900" />
        </div>
        <div className="absolute bottom-2.5 w-4.5 h-2 border-b-3 border-slate-900 rounded-b-full" />
      </div>

      <div className="w-3.5 h-2 bg-[#fde047] border-x-3 border-slate-900 -mt-1 z-10" />

      <div className="w-13 h-18 rounded-[16px] bg-orange-500 border-4 border-slate-900 shadow-md relative flex items-center justify-center z-10">
        <span className="text-[8px] font-mono font-bold text-white/50">PXL</span>

        <motion.div 
          style={{ rotate: leftArmRot, originX: 0.5, originY: 0.1 }}
          className="absolute -left-3.5 top-1.5 w-3 h-12 rounded-full bg-orange-500 border-3 border-slate-900"
        />
        <motion.div 
          style={{ rotate: rightArmRot, originX: 0.5, originY: 0.1 }}
          className="absolute -right-3.5 top-1.5 w-3 h-12 rounded-full bg-orange-500 border-3 border-slate-900"
        />
      </div>

      <div className="flex gap-3.5 -mt-1.5 z-0 pb-1">
        <motion.div 
          style={{ rotate: leftLegRot, originX: 0.5, originY: 0 }}
          className="w-3.5 h-14 rounded-full bg-slate-800 border-3 border-slate-900"
        />
        <motion.div 
          style={{ rotate: rightLegRot, originX: 0.5, originY: 0 }}
          className="w-3.5 h-14 rounded-full bg-slate-800 border-3 border-slate-900"
        />
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  
  // Funnel Pipeline States
  const [activeFunnelStep, setActiveFunnelStep] = useState(0);
  const [isOptimizedStore, setIsOptimizedStore] = useState(true);

  // Process Timeline States
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [wireframeLayout, setWireframeLayout] = useState<Record<string, boolean>>({
    announcement: true,
    hero: true,
    features: true,
    testimonials: true,
    footer: true
  });
  const toggleWireframeLayout = (key: string) => {
    setWireframeLayout((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [activeDeviceView, setActiveDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [activeRevisionPin, setActiveRevisionPin] = useState<number | null>(null);
  const [customRevisionStyle, setCustomRevisionStyle] = useState<"minimal" | "editorial" | "dark">("minimal");

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditChecks, setAuditChecks] = useState<Record<string, boolean>>({
    ssl: false,
    domain: false,
    shipping: false,
    payment: false,
    pixels: false
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  // Storyboard Scroll Targets and Transforms
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted && containerRef.current ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const trackX = useTransform(scrollYProgress, [0, 0.85], ["0vw", "-400vw"]);
  const trackOpacity = useTransform(scrollYProgress, [0.85, 0.88], [1, 0]);
  const summaryOpacity = useTransform(scrollYProgress, [0.85, 0.88], [0, 1]);
  const summaryScale = useTransform(scrollYProgress, [0.85, 0.88], [0.95, 1]);

  // Robust React states for header and summary display coordination
  const [showHeader, setShowHeader] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const handleScroll = (v: number) => {
      setShowHeader(v < 0.15);
      setShowSummary(v >= 0.85);
    };
    // Sync initial state
    handleScroll(scrollYProgress.get());
    return scrollYProgress.onChange(handleScroll);
  }, [scrollYProgress]);

  const walkCycle = useTransform(scrollYProgress, (val) => {
    if (val >= 0.85) return 0;
    return val * 160;
  });

  const leftLegRotation = useTransform(walkCycle, (r) => Math.sin(r) * 28);
  const rightLegRotation = useTransform(walkCycle, (r) => -Math.sin(r) * 28);
  
  // Custom arm rot callbacks checking scroll progress values directly
  const leftArmRotation = useTransform(scrollYProgress, (v) => {
    if (v >= 0.72) return -45;
    const r = walkCycle.get();
    return Math.sin(r) * 20;
  });
  const rightArmRotation = useTransform(scrollYProgress, (v) => {
    if (v >= 0.72) return 45;
    const r = walkCycle.get();
    return -Math.sin(r) * 20;
  });
  const bodyBounceY = useTransform(walkCycle, (r) => Math.abs(Math.sin(r)) * 4 - 2);

  // Ball merge & throw transforms (Step 2)
  const ballX = useTransform(scrollYProgress, [0.18, 0.22, 0.23, 0.28], [-40, 0, 0, 320]);
  const ballY = useTransform(scrollYProgress, [0.18, 0.22, 0.23, 0.25, 0.28], [-40, -40, -40, -100, 20]);
  const ballScaleMerged = useTransform(scrollYProgress, [0.18, 0.22, 0.23, 0.25], [1, 1.8, 1.4, 1.4]);
  const ballColorMerged = useTransform(scrollYProgress, [0.18, 0.22, 0.23], ["#3b82f6", "#10b981", "#eab308"]);
  const thrownBallOpacity = useTransform(scrollYProgress, [0.18, 0.22, 0.28, 0.29], [1, 1, 1, 0]);
  const burstOpacity = useTransform(scrollYProgress, [0.21, 0.22, 0.24], [0, 1, 0]);

  // Step 2 triggers: door opening, badges, stars
  const doorRotate = useTransform(scrollYProgress, [0.28, 0.33], [0, 95]);
  const trustBadgesOpacity = useTransform(scrollYProgress, [0.28, 0.33], [0, 1]);
  const trustBadgesScale = useTransform(scrollYProgress, [0.28, 0.33], [0.6, 1]);
  const starsScale = useTransform(scrollYProgress, [0.29, 0.35], [0, 1]);

  // Step 3 triggers: Cart & products
  const cartOpacity = useTransform(scrollYProgress, [0.36, 0.39, 0.51, 0.54], [0, 1, 1, 0]);
  const cartX = useTransform(scrollYProgress, [0.36, 0.39], [100, 45]);
  
  const product1Opacity = useTransform(scrollYProgress, [0.41, 0.44, 0.52], [0, 1, 0]);
  const product1X = useTransform(scrollYProgress, [0.41, 0.46], [160, 45]);
  const product1Y = useTransform(scrollYProgress, [0.41, 0.46], [-50, 40]);
  
  const product2Opacity = useTransform(scrollYProgress, [0.45, 0.48, 0.52], [0, 1, 0]);
  const product2X = useTransform(scrollYProgress, [0.45, 0.50], [160, 48]);
  const product2Y = useTransform(scrollYProgress, [0.45, 0.50], [-50, 35]);

  const product3Opacity = useTransform(scrollYProgress, [0.49, 0.52, 0.54], [0, 1, 0]);
  const product3X = useTransform(scrollYProgress, [0.49, 0.53], [160, 52]);
  const product3Y = useTransform(scrollYProgress, [0.49, 0.53], [-50, 45]);

  const heartY = useTransform(scrollYProgress, [0.42, 0.54], [0, -100]);
  const heartOpacity = useTransform(scrollYProgress, [0.42, 0.45, 0.51, 0.54], [0, 1, 1, 0]);

  // Step 4 triggers: Sales notification, confetti, dancing
  const orderNotifY = useTransform(scrollYProgress, [0.55, 0.6], [-120, 0]);
  const orderNotifScale = useTransform(scrollYProgress, [0.55, 0.6, 0.62, 0.72], [0.5, 1.1, 1, 0]);
  const confettiOpacity = useTransform(scrollYProgress, [0.6, 0.63, 0.7, 0.72], [0, 1, 1, 0]);
  const confettiY = useTransform(scrollYProgress, [0.6, 0.72], [-10, 40]);
  const danceAngle = useTransform(scrollYProgress, (v) => {
    if (v >= 0.54 && v < 0.72) return Math.sin(v * 400) * 15;
    return 0;
  });
  const ownerJumpY = useTransform(scrollYProgress, (v) => {
    if (v >= 0.54 && v < 0.72) return Math.abs(Math.sin(v * 400)) * -25;
    return 0;
  });
  const coinY = useTransform(scrollYProgress, [0.6, 0.68, 0.72], [80, 0, -20]);

  const conf1X = useTransform(scrollYProgress, [0.6, 0.72], [0, -100]);
  const conf1Y = useTransform(scrollYProgress, [0.6, 0.72], [0, -120]);
  const conf2X = useTransform(scrollYProgress, [0.6, 0.72], [0, 100]);
  const conf2Y = useTransform(scrollYProgress, [0.6, 0.72], [0, -140]);
  const conf3X = useTransform(scrollYProgress, [0.6, 0.72], [0, 120]);
  const conf3Y = useTransform(scrollYProgress, [0.6, 0.72], [0, 80]);

  // Step 5 triggers: Loyalty gift, handshake, VIP badge
  const giftBoxOpacity = useTransform(scrollYProgress, [0.72, 0.75, 0.85, 0.88], [0, 1, 1, 0]);
  const giftBoxY = useTransform(scrollYProgress, [0.72, 0.76], [30, 0]);
  const giftBoxScale = useTransform(scrollYProgress, [0.72, 0.76], [0.5, 1]);
  const handshakeY = useTransform(scrollYProgress, (v) => {
    if (v >= 0.72 && v < 0.88) return Math.sin(v * 300) * 6;
    return 0;
  });
  const loyaltyHeartScale = useTransform(scrollYProgress, [0.76, 0.82, 0.86, 0.88], [0, 1.5, 1.5, 0]);
  const loyaltyRotation = useTransform(scrollYProgress, [0.72, 0.88], [0, 360]);

  // Dynamic states
  const [lightsOn, setLightsOn] = useState(false);
  const [characterAccessory, setCharacterAccessory] = useState('balls');

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      // 1. Sync funnel step
      const step = Math.min(Math.floor(v * 5.5), 4);
      if (step !== activeFunnelStep) {
        setActiveFunnelStep(step);
      }
      // 2. Sync lightsOn
      setLightsOn(v >= 0.28);
      // 3. Sync character accessory
      if (v < 0.18) {
        setCharacterAccessory('balls');
      } else if (v >= 0.54 && v < 0.72) {
        setCharacterAccessory('dancing');
      } else if (v >= 0.72 && v < 0.88) {
        setCharacterAccessory('gift');
      } else {
        setCharacterAccessory('none');
      }
    });
  }, [scrollYProgress, activeFunnelStep]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      if (isHoveringRef.current) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      if (el.scrollLeft >= maxScroll - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 420, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    if (showFormModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFormModal]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative overflow-x-clip bg-bg-dark text-text-light min-h-screen">
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
                Start with SalePXL
              </button>
              <a
                href="https://wa.me/919917780656?text=Hi%20SalePXL%20team%2C%20I'd%20like%20to%20discuss%20building%20a%20high-converting%20Shopify%20store."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-secondary inline-flex items-center justify-center gap-2 px-8 h-13 rounded-full border border-white text-white text-xs sm:text-sm font-semibold backdrop-blur-sm hover:border-emerald-400 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
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
                  Convert <span className="light-gradient-text font-normal">every visitor</span> into a loyal customer.
                </span>
                <span className="premium-highlight text-white transition-all duration-300 hover:text-primary cursor-default">High-converting storefronts.</span>
                <span className="text-white/60 transition-all duration-300 hover:text-white cursor-default">Seamless mobile checkout.</span>
                <span className="text-white/30 transition-all duration-300 hover:text-white cursor-default">Scaling brands to 8-figures.</span>
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
            onMouseEnter={() => { isHoveringRef.current = true; }}
            onMouseLeave={() => { isHoveringRef.current = false; }}
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
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 lg:pt-48 lg:pb-36 relative z-10 overflow-hidden bg-gradient-to-b from-[#050505] to-[#011a12] border-b border-white/[0.08]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 flex flex-col items-center">

            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight font-grotesk mt-2">
              Build. <span className="light-gradient-text font-normal">Launch.</span> <span className="premium-highlight">Scale.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: Video Browser Card (One Card) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-start select-none w-full">
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src="https://cdn.shopify.com/b/shopify-brochure2-assets/297a585daeef11b9368ee3f8f06c6ffd.webm" type="video/webm" />
                  <source src="/contact-us-page.webm" type="video/webm" />
                </video>
              </div>
            </div>

            {/* Right side: Interactive Collapsible Steps List */}
            <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-8">
              <div className="flex flex-col">
                {BUILD_PROCESS_STEPS.map((step, idx) => {
                  const isActive = activeProcessStep === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveProcessStep(idx)}
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
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm sm:text-base text-white/70 leading-relaxed pl-10 pt-1 pb-4">
                              {step.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Get Started Button */}
              <div className="mt-10 pl-10">
                <button
                  onClick={() => setShowFormModal(true)}
                  className="w-full sm:w-auto btn-primary inline-flex items-center justify-center px-10 h-14 rounded-full text-black text-sm font-bold shadow-[0_4px_12px_rgba(255,255,255,0.08)] cursor-pointer"
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
                Customize <span className="light-gradient-text font-normal">everything</span> with <span className="premium-highlight">Shopify Integrations</span>
              </h2>
              <p className="mt-6 text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-lg">
                We install and configure essential Shopify apps for reviews, upsells, bundles, loyalty programs, analytics, WhatsApp automation, email marketing, and store automation to increase sales, boost conversions, and improve customer retention.
              </p>
            </div>

            {/* Right side interactive app grid */}
            <div className="w-full lg:w-[55%] relative select-none">
              {/* Fade out mask overlays on desktop */}
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080214] to-transparent pointer-events-none z-20 hidden lg:block" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080214] to-transparent pointer-events-none z-20 hidden lg:block" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#160528] to-transparent pointer-events-none z-20 hidden lg:block" />

              <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-8 gap-3 sm:gap-4 max-h-[480px] overflow-hidden lg:pr-8 pr-0">
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

      {/* ── THE GROWTH FORMULA SECTION — Premium Dark Storytelling ── */}
      <GrowthFormulaSection onOpenModal={() => setShowFormModal(true)} />

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
          <div className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] border-t sm:border border-neutral-200/80 shadow-2xl animate-fade-blur">
            {/* Handle bar (mobile only) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-neutral-300" />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-black/[0.03] border border-neutral-200/60 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-black/[0.08] hover:border-neutral-300 transition-all duration-300 z-50"
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Form */}
            <div className="p-8 sm:p-14 md:p-16">
              <StartProjectForm onSuccess={() => setShowFormModal(false)} />
            </div>
          </div>
        </div>
      )}


      {/* 6. TRUSTED BY 800+ LEADING BRANDS LOGO SECTION */}
      <section className="py-16 md:py-24 lg:py-36 bg-white relative z-20 overflow-hidden rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px]">
        <div className="max-w-[1360px] mx-auto px-6 flex flex-col gap-6 text-center items-center mb-8">
          <span className="text-[10px] text-neutral-400 font-sans uppercase tracking-widest font-black">
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
      <section className="py-16 md:py-24 lg:py-36 relative overflow-hidden bg-bg-dark border-b border-white/[0.08] z-10">
        <div className="max-w-[1360px] mx-auto px-6 mb-12 flex flex-col gap-4 text-center">

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
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight font-grotesk">
              Why 90% of Stores Fail <span className="light-gradient-text font-normal">vs.</span> <span className="premium-highlight">The SalePXL Conversion Blueprint</span>
            </h2>
            <p className="text-white/70 text-base font-light">
              We replace sluggish, heavy pre-built templates with optimized custom engines. The difference is measurable.
            </p>
          </div>

          {/* Interactive Comparison Component */}
          <InteractiveComparison />
        </div>
      </section>

      {/* 10. LOVED BY FOUNDERS & TEAMS WORLDWIDE SECTION */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 lg:pt-48 lg:pb-36 relative overflow-hidden bg-gradient-to-b from-[#120324] to-[#070114] border-t border-white/[0.08] rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px] z-20">
        <div className="max-w-[1360px] mx-auto px-6">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col items-center gap-3">
            <span className="text-xs text-emerald-400 font-mono uppercase tracking-widest font-bold px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              Verified Founder Reviews
            </span>
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight leading-[1.1] font-grotesk mt-1">
              Loved <span className="light-gradient-text font-normal">by</span> Founders <span className="premium-highlight text-white">& Teams Worldwide</span>
            </h2>
          </div>

          {/* Founder Selector Tabs (Horizontal Scrollable Pills on Mobile, Grid on Desktop) */}
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 overflow-x-auto scrollbar-none pb-2 sm:pb-0 mb-6 sm:mb-8">
            {GOOGLE_REVIEWS_CONSOLIDATED.map((rev, idx) => {
              const isActive = activeReviewIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIdx(idx)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer shrink-0 min-w-[160px] sm:min-w-0 ${
                    isActive
                      ? "bg-emerald-950/80 border-emerald-500/70 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.02]"
                      : "bg-[#101010]/90 border-white/10 hover:border-white/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Founder Image Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={rev.image}
                      alt={rev.name}
                      className={`w-8 h-8 rounded-full object-cover border ${
                        isActive ? "border-emerald-400" : "border-white/20"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#101010]" />
                    )}
                  </div>

                  {/* Founder Name & Store Category */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate font-grotesk">{rev.name}</h4>
                    <p className="text-[9px] text-emerald-400/90 truncate font-mono mt-0.5">{rev.category}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Active Founder Review Card */}
          <div className="w-full bg-gradient-to-br from-[#101010] via-[#0c0c0c] to-[#070707] border border-white/[0.1] rounded-[24px] p-5 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl">
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 items-center relative z-10">
              
              {/* Left Side: Compact Founder Image Portrait (Hidden on mobile) */}
              <div className="hidden sm:flex lg:col-span-4 flex-col items-center justify-center">
                <div className="relative w-full max-w-[160px] sm:max-w-[220px] aspect-square rounded-[20px] overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-[#0a0a0a] group">
                  
                  {/* Active Founder Image */}
                  <motion.img
                    key={activeReviewIdx}
                    src={GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].image}
                    alt={GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                  {/* Top Category Tag */}
                  <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-slate-900/90 border border-emerald-500/40 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-bold text-emerald-300 backdrop-blur-md shadow-lg flex items-center gap-1">
                    <span>🛍️</span>
                    <span className="truncate max-w-[100px] sm:max-w-[130px]">{GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].category}</span>
                  </div>

                  {/* Bottom Founder Profile Info */}
                  <div className="absolute bottom-2 inset-x-2 sm:bottom-2.5 sm:inset-x-2.5 p-2 sm:p-2.5 rounded-xl bg-slate-950/90 border border-white/10 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <h4 className="text-[11px] sm:text-xs font-bold text-white font-grotesk truncate max-w-[90px] sm:max-w-[110px]">
                        {GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].name}
                      </h4>
                      <p className="text-[8px] sm:text-[9px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Verified</span>
                      </p>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-[11px] sm:text-xs font-bold text-white block">{GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].statVal}</span>
                      <span className="text-[7px] sm:text-[8px] text-white/50 block">{GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Active Review Quote & Ratings Card (8 cols) */}
              <div className="lg:col-span-8 flex flex-col justify-center space-y-3.5 sm:space-y-5 text-left">
                
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1.5 text-amber-400 text-lg sm:text-xl">
                  {[...Array(GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].stars)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Review Headline in large quote font */}
                <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug font-grotesk">
                  "{GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].headline}"
                </h3>

                {/* Review Body Text */}
                <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans font-normal">
                  {GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].text}
                </p>

                {/* Founder Info Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                  <img
                    src={GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].image}
                    alt={GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].name}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-emerald-400 shadow-md"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white font-grotesk">
                      {GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].name}
                    </h4>
                    <p className="text-[10px] text-emerald-400 font-mono">
                      {GOOGLE_REVIEWS_CONSOLIDATED[activeReviewIdx].category}
                    </p>
                  </div>
                </div>

              </div>

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

          
          <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight leading-tight max-w-none font-grotesk">
            Ready <span className="light-gradient-text font-normal">to</span> Build Your <span className="premium-highlight">Shopify Store?</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Let's build a high converting Shopify store and faster checkout experience custom designed for your ecom brand.<br className="hidden sm:block" /> Get a free audit and consultation today.
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

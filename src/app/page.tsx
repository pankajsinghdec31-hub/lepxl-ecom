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
    title: "Planning & Discovery",
    desc: "Understand your business, goals, target audience, competitors, and project requirements. We define the website structure, features, functionality, and growth strategy before design begins.",
    highlights: [
      "Business Discussion",
      "Competitor Research",
      "Website Strategy",
      "Feature Planning",
      "User Journey",
      "Project Roadmap"
    ],
    icon: "Sliders"
  },
  {
    num: "02",
    title: "UI/UX Design & Development",
    desc: "Design a premium Shopify experience and develop a fast, responsive, conversion-focused storefront optimized for every device.",
    highlights: [
      "Homepage Design",
      "Collection Pages",
      "Product Pages",
      "Mobile Responsive",
      "Shopify Development",
      "Performance Optimization"
    ],
    icon: "Code"
  },
  {
    num: "03",
    title: "Review & Refinement",
    desc: "Review every section together, gather feedback, refine the design, improve user experience, and make final adjustments before launch.",
    highlights: [
      "Client Review",
      "Design Revisions",
      "UX Improvements",
      "Quality Assurance",
      "Final Approval"
    ],
    icon: "CheckCircle2"
  },
  {
    num: "04",
    title: "Store Launch & Integrations",
    desc: "Configure your Shopify store for real business operations and launch with all essential integrations.",
    highlights: [
      "Payment Gateway Integration",
      "Shipping Configuration",
      "Domain Setup",
      "Email Notifications",
      "Analytics & Tracking",
      "Store Launch"
    ],
    icon: "Zap"
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

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [activeGrowthCard, setActiveGrowthCard] = useState<number>(0);
  const [activatedGrowthCards, setActivatedGrowthCards] = useState<number[]>([0]);

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

  const simulateGrowthFlow = () => {
    setActivatedGrowthCards([0]);
    setActiveGrowthCard(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < 4) {
        setActiveGrowthCard(step);
        setActivatedGrowthCards(prev => {
          if (!prev.includes(step)) return [...prev, step];
          return prev;
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.06] text-primary backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Our Workflow
            </span>
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight font-grotesk mt-2">
              Our <span className="light-gradient-text font-normal">Proven</span> <span className="premium-highlight">Process</span>
            </h2>
            <p className="mt-4 text-white/70 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              How we build high-converting Shopify stores, from initial strategy to deployment.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="relative z-20">
            {/* Desktop horizontal connecting line */}
            <div className="hidden lg:block absolute top-[56px] left-[56px] right-[calc(25%-56px)] h-[1px] bg-gradient-to-r from-primary/30 via-white/10 to-transparent pointer-events-none z-10" />
            
            {/* Mobile/Tablet vertical connecting line */}
            <div className="absolute left-[56px] top-[56px] bottom-[56px] w-[1px] bg-gradient-to-b from-primary/30 via-white/10 to-transparent lg:hidden pointer-events-none z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {BUILD_PROCESS_STEPS.map((item, idx) => {
                const isActive = activeProcessStep === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    onClick={() => setActiveProcessStep(idx)}
                    className={`group relative flex flex-col justify-between bg-black/40 backdrop-blur-md border rounded-[24px] p-8 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[460px] select-none cursor-pointer ${
                      isActive 
                        ? "border-primary/50 ring-2 ring-primary/10 shadow-[0_0_30px_rgba(203,243,81,0.1)] opacity-100" 
                        : "border-white/[0.08] opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* Subtle hover gradient glow inside the card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] pointer-events-none" />
                    
                    <div>
                      {/* Top Row: Number & Icon */}
                      <div className="flex items-center justify-between mb-8 relative">
                        <span className={`font-mono text-4xl font-extralight tracking-tighter transition-colors duration-500 ${
                          isActive ? "text-primary/40" : "text-white/25 group-hover:text-primary/30"
                        }`}>
                          {item.num}
                        </span>
                        
                        {/* Elegant circle icon */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-inner ${
                          isActive
                            ? "text-black bg-primary border-primary"
                            : "bg-white/[0.04] border-white/[0.08] text-white/60 group-hover:text-primary group-hover:bg-primary/[0.08] group-hover:border-primary/30"
                        }`}>
                          {getStepIcon(item.icon)}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className={`text-xl font-light tracking-tight transition-colors duration-500 mb-4 ${
                        isActive ? "text-primary font-normal" : "text-white group-hover:text-primary"
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                        {item.desc}
                      </p>
                    </div>

                    {/* Highlights List */}
                    <div className="border-t border-white/[0.08] pt-6 mt-auto">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40 block mb-3">
                        Highlights
                      </span>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/70 font-light">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-primary" : "bg-primary/70"}`} />
                            <span className="truncate" title={h}>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Explorer pill */}
                    <div className="mt-4 flex items-center justify-center">
                      <span className={`text-[10px] font-mono uppercase tracking-wider transition-opacity ${
                        isActive ? "text-primary opacity-100 font-bold" : "text-white/30 opacity-0 group-hover:opacity-100"
                      }`}>
                        {isActive ? "Active View" : "Explore Workspace →"}
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Showcase Panel */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 w-full rounded-[24px] bg-[#0c0c0e]/60 border border-white/[0.08] p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.015] blur-[100px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {activeProcessStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-5 flex flex-col gap-4 text-left">
                      <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">Phase 1 Workflow</span>
                      <h4 className="text-2xl font-bold tracking-tight text-white font-grotesk">Interactive Wireframe Planner</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        We map the structural hierarchy of your homepage before writing custom code. Try toggling layout blocks on/off to visualize how we plan user experience.
                      </p>
                      
                      <div className="flex flex-col gap-2 mt-2">
                        {Object.keys(wireframeLayout).map((key) => (
                          <button
                            key={key}
                            onClick={() => toggleWireframeLayout(key)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                              wireframeLayout[key]
                                ? "bg-primary/5 border-primary/20 text-white"
                                : "bg-white/[0.01] border-white/5 text-white/40 hover:bg-white/[0.02]"
                            }`}
                          >
                            <span className="capitalize font-semibold">{key.replace("-", " ")} Block</span>
                            <span className={`w-4 h-4 rounded flex items-center justify-center border text-[9px] font-bold ${
                              wireframeLayout[key] ? "bg-primary border-primary text-black" : "border-white/20"
                            }`}>
                              {wireframeLayout[key] && "✓"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-[#121214]/60 p-6 flex flex-col gap-3 min-h-[340px] justify-start shadow-inner">
                      <div className="flex justify-between items-center pb-3 border-b border-white/5 text-[10px] text-white/30 font-mono">
                        <span>WIREFRAME DIAGRAM</span>
                        <span className="text-primary font-bold">SALE PXL VISUALIZER</span>
                      </div>
                      
                      <AnimatePresence>
                        {wireframeLayout.announcement && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="h-6 bg-white/[0.03] border border-dashed border-white/10 rounded flex items-center justify-center text-[8px] text-white/30 uppercase tracking-widest font-mono">
                            Announcement Bar
                          </motion.div>
                        )}
                        {wireframeLayout.hero && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="h-28 bg-white/[0.03] border border-dashed border-white/10 rounded flex flex-col justify-center px-4 gap-2">
                            <div className="h-3 w-1/3 bg-white/10 rounded-full" />
                            <div className="h-6 w-3/4 bg-white/5 rounded-md" />
                            <div className="h-6 w-20 bg-primary/20 border border-primary/20 rounded-full" />
                          </motion.div>
                        )}
                        {wireframeLayout.features && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-3 gap-2">
                            <div className="h-20 bg-white/[0.02] border border-dashed border-white/10 rounded flex items-center justify-center text-[7px] text-white/20">Prod 1</div>
                            <div className="h-20 bg-white/[0.02] border border-dashed border-white/10 rounded flex items-center justify-center text-[7px] text-white/20">Prod 2</div>
                            <div className="h-20 bg-white/[0.02] border border-dashed border-white/10 rounded flex items-center justify-center text-[7px] text-white/20">Prod 3</div>
                          </motion.div>
                        )}
                        {wireframeLayout.testimonials && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="h-16 bg-white/[0.03] border border-dashed border-white/10 rounded flex flex-col justify-center px-4 gap-1.5">
                            <div className="flex gap-0.5"><span className="text-primary text-[8px]">★★★★★</span></div>
                            <div className="h-2.5 w-full bg-white/5 rounded" />
                          </motion.div>
                        )}
                        {wireframeLayout.footer && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="h-10 bg-white/[0.03] border border-dashed border-white/10 rounded flex items-center justify-center text-[8px] text-white/25 uppercase tracking-widest font-mono">
                            Footer Columns
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {activeProcessStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-5 flex flex-col gap-4 text-left">
                      <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">Phase 2 Workflow</span>
                      <h4 className="text-2xl font-bold tracking-tight text-white font-grotesk">Device Responsive Sandbox</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        We build every layout with a strict mobile-first paradigm. Toggle views to see how the product layout dynamically adapts from desktop side-by-side splits to thumb-friendly mobile slides.
                      </p>

                      <div className="flex gap-2.5 mt-2 bg-white/5 p-1 rounded-xl w-max">
                        <button
                          onClick={() => setActiveDeviceView("desktop")}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                            activeDeviceView === "desktop" ? "bg-white text-black" : "text-white/60 hover:text-white"
                          }`}
                        >
                          Desktop Grid
                        </button>
                        <button
                          onClick={() => setActiveDeviceView("mobile")}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                            activeDeviceView === "mobile" ? "bg-white text-black" : "text-white/60 hover:text-white"
                          }`}
                        >
                          Mobile Viewport
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-7 flex justify-center items-center p-4 bg-black/40 rounded-2xl border border-white/5 min-h-[340px]">
                      <motion.div
                        animate={{
                          width: activeDeviceView === "desktop" ? "100%" : "300px",
                          height: activeDeviceView === "desktop" ? "240px" : "320px",
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        className="bg-[#0c0c0e] rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl p-4 gap-3"
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[8px] font-mono text-white/30">
                          <span>SHOPPING APP</span>
                          <span>{activeDeviceView === "desktop" ? "1440x900 px" : "390x844 px"}</span>
                        </div>

                        {activeDeviceView === "desktop" ? (
                          <div className="grid grid-cols-2 gap-4 h-full items-center">
                            <div className="h-full rounded-lg bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 border border-white/5 flex items-center justify-center text-[10px] text-white/30 font-bold uppercase">Product Media</div>
                            <div className="flex flex-col gap-2.5 justify-center">
                              <span className="text-[7px] text-primary font-mono uppercase font-bold">Premium Silk Hoodie</span>
                              <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                              <div className="h-1.5 w-full bg-white/5 rounded-full" />
                              <div className="h-8 bg-white text-black text-[9px] font-bold rounded-lg flex items-center justify-center uppercase tracking-wider mt-2">Add To Cart</div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3 h-full justify-between">
                            <div className="h-32 rounded-lg bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 border border-white/5 flex items-center justify-center text-[9px] text-white/30 font-bold uppercase">Product Media Slider</div>
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[7px] text-primary font-mono uppercase font-bold">Premium Silk Hoodie</span>
                              <div className="h-1.5 w-1/2 bg-white/10 rounded-full" />
                            </div>
                            <div className="h-9 bg-white text-black text-[9px] font-bold rounded-lg flex items-center justify-center uppercase tracking-wider">Add To Cart</div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeProcessStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-5 flex flex-col gap-4 text-left">
                      <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">Phase 3 Workflow</span>
                      <h4 className="text-2xl font-bold tracking-tight text-white font-grotesk">Interactive Revisions Board</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Revisions are simple. We map annotations directly on layout drafts. Try clicking on revision marker pins in the visualizer to explore changes and toggle layout styles.
                      </p>

                      <div className="flex gap-2.5 mt-2">
                        {(["minimal", "editorial", "dark"] as const).map((style) => (
                          <button
                            key={style}
                            onClick={() => setCustomRevisionStyle(style)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all border ${
                              customRevisionStyle === style
                                ? "bg-primary border-primary text-black font-bold"
                                : "bg-white/[0.02] border-white/5 text-white/60 hover:bg-white/5"
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-7 relative rounded-2xl border border-white/5 bg-[#101012] p-5 flex flex-col gap-3 min-h-[340px] justify-between shadow-2xl">
                      
                      <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent pointer-events-none" />

                      {/* Homepage mockup layout container */}
                      <div className={`flex-grow border border-white/5 p-4 rounded-xl flex flex-col gap-4 relative transition-all duration-500 ${
                        customRevisionStyle === "minimal" 
                          ? "bg-white text-black" 
                          : customRevisionStyle === "editorial"
                          ? "bg-[#faf6f0] text-[#332211]"
                          : "bg-black text-white"
                      }`}>
                        
                        <div className="flex justify-between items-center text-[7px] font-bold border-b border-black/5 pb-1">
                          <span>STOREFRONT AUDIT</span>
                          <span>CART (0)</span>
                        </div>

                        <div className="flex flex-col items-center gap-1.5 py-6">
                          <span className="text-[6px] tracking-widest uppercase font-mono">FALL COLLECTION 2026</span>
                          <h4 className="text-xs font-bold uppercase tracking-tight text-center font-grotesk">Bold Design Retails</h4>
                        </div>

                        {/* Interactive Pins */}
                        {/* Pin 1: Hero title */}
                        <button
                          onClick={() => setActiveRevisionPin(1)}
                          className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary text-black border border-white flex items-center justify-center text-[10px] font-bold animate-bounce z-20 cursor-pointer shadow-lg shadow-primary/20"
                        >
                          1
                        </button>

                        {/* Pin 2: Style Theme */}
                        <button
                          onClick={() => setActiveRevisionPin(2)}
                          className="absolute bottom-[10%] right-[10%] w-6 h-6 rounded-full bg-indigo-500 text-white border border-white flex items-center justify-center text-[10px] font-bold animate-pulse z-20 cursor-pointer shadow-lg shadow-indigo-500/20"
                        >
                          2
                        </button>
                      </div>

                      {/* Pin descriptions box */}
                      <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3.5 z-10 text-left">
                        <span className="text-[9px] font-mono text-white/40 block mb-1">REVISION SPECIFICATION</span>
                        {activeRevisionPin === 1 && (
                          <p className="text-xs text-white/80">
                            <strong>Pin 1 (Typography)</strong>: Adjusted spacing and capitalization dynamically. "How it works" font applies custom Plus Jakarta Sans styling.
                          </p>
                        )}
                        {activeRevisionPin === 2 && (
                          <p className="text-xs text-white/80">
                            <strong>Pin 2 (Theme Styles)</strong>: Use the minimal, editorial, or dark styled triggers on the left to review dynamic colors and layouts.
                          </p>
                        )}
                        {!activeRevisionPin && (
                          <p className="text-xs text-white/40 italic">Click one of the numerical pins inside the layout draft above.</p>
                        )}
                      </div>

                    </div>
                  </motion.div>
                )}

                {activeProcessStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-5 flex flex-col gap-4 text-left">
                      <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">Phase 4 Workflow</span>
                      <h4 className="text-2xl font-bold tracking-tight text-white font-grotesk">Automated Launch Auditor</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        We don't just push your store live. We run a comprehensive audit simulating shipping channels, cart scripts, SSL layers, and pixels. Click the test tool below to execute a simulated audit.
                      </p>

                      <button
                        onClick={() => {
                          setIsAuditing(true);
                          setAuditProgress(0);
                          setAuditChecks({ ssl: false, domain: false, shipping: false, payment: false, pixels: false });
                          
                          // Run loading checks
                          const timer1 = setTimeout(() => {
                            setAuditChecks(prev => ({ ...prev, ssl: true }));
                            setAuditProgress(20);
                          }, 500);
                          const timer2 = setTimeout(() => {
                            setAuditChecks(prev => ({ ...prev, domain: true }));
                            setAuditProgress(40);
                          }, 1000);
                          const timer3 = setTimeout(() => {
                            setAuditChecks(prev => ({ ...prev, shipping: true }));
                            setAuditProgress(60);
                          }, 1500);
                          const timer4 = setTimeout(() => {
                            setAuditChecks(prev => ({ ...prev, payment: true }));
                            setAuditProgress(80);
                          }, 2000);
                          const timer5 = setTimeout(() => {
                            setAuditChecks(prev => ({ ...prev, pixels: true }));
                            setAuditProgress(100);
                            setIsAuditing(false);
                          }, 2500);
                        }}
                        disabled={isAuditing}
                        className="w-full sm:w-auto px-6 py-3.5 mt-2 rounded-xl bg-primary text-black font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all select-none cursor-pointer disabled:opacity-50"
                      >
                        {isAuditing ? `Auditing (${auditProgress}%)` : "Run Store Audit Checklist"}
                      </button>
                    </div>

                    <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-[#0e0e10] p-6 flex flex-col gap-3 min-h-[340px] justify-between shadow-inner text-left">
                      
                      <div className="flex justify-between items-center pb-2 border-b border-white/5 text-[10px] text-white/30 font-mono">
                        <span>LAUNCH READINESS CHECKS</span>
                        <span className="text-emerald-400">ACTIVE LOGS</span>
                      </div>

                      <div className="flex-grow flex flex-col gap-3 mt-2 justify-center">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/60">SSL Certificate Status</span>
                          <span className={auditChecks.ssl ? "text-primary font-bold" : "text-white/20"}>
                            {auditChecks.ssl ? "✓ SECURED (Let's Encrypt)" : "Pending..."}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/60">Domain Configuration (CNAME/A Pointing)</span>
                          <span className={auditChecks.domain ? "text-primary font-bold" : "text-white/20"}>
                            {auditChecks.domain ? "✓ CONNECTED" : "Pending..."}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/60">Logistics Carrier Webhook</span>
                          <span className={auditChecks.shipping ? "text-primary font-bold" : "text-white/20"}>
                            {auditChecks.shipping ? "✓ ACTIVE (Shiprocket API)" : "Pending..."}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/60">Payment Gateway Handshake (Test Key)</span>
                          <span className={auditChecks.payment ? "text-primary font-bold" : "text-white/20"}>
                            {auditChecks.payment ? "✓ STABLE (Razorpay / Stripe)" : "Pending..."}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/60">Meta Pixel & GA4 Tag Handshake</span>
                          <span className={auditChecks.pixels ? "text-primary font-bold" : "text-white/20"}>
                            {auditChecks.pixels ? "✓ RUNNING (Pageview Event)" : "Pending..."}
                          </span>
                        </div>
                      </div>

                      {auditProgress === 100 && (
                        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-center font-bold text-xs select-none">
                          ALL LAUNCH PROTOCOLS CHECKED - STORE IS READY TO SELL 🚀
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="mt-16 flex justify-center z-20 relative">
            <button
              onClick={() => setShowFormModal(true)}
              className="w-full sm:w-auto btn-primary inline-flex items-center justify-center px-10 h-14 rounded-full text-black text-sm font-bold shadow-[0_4px_12px_rgba(255,255,255,0.08)] cursor-pointer"
            >
              Get Started
            </button>
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

      <section className="py-20 md:py-28 lg:py-40 relative z-20 overflow-hidden bg-gradient-to-b from-[#020a16] to-[#050505] border-t border-b border-white/[0.08] rounded-t-[32px] md:rounded-t-[48px] mt-[-32px] md:mt-[-48px]">
        {/* Glowing background details */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-primary/[0.015] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-primary/[0.015] rounded-full blur-[100px] pointer-events-none" />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes traffic-particle {
            0% {
              transform: translateX(-35px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateX(35px);
              opacity: 0;
            }
          }
          @keyframes dash-scroll {
            to {
              stroke-dashoffset: -20;
            }
          }
          .particle-glow-path {
            animation: dash-scroll 1.2s infinite linear;
          }
        ` }} />

        <div className="max-w-[1360px] mx-auto px-6">
          
          {/* Header & Copywriting */}
          <div className="max-w-3xl text-left mb-16 flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.06] text-primary backdrop-blur-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Growth Engine
            </span>
            <h2 className="premium-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-white tracking-tight leading-[1.1] font-grotesk mt-2">
              Hyper-Optimized.<br />
              <span className="premium-highlight text-white"><span className="light-gradient-text font-normal">Designed</span> to Convert.</span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-2xl mt-2">
              A successful Shopify store isn't built by design alone. Real growth happens when every part of the customer journey works together. We optimize every touchpoint to transform traffic into loyal customers and sustainable revenue.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button 
                onClick={simulateGrowthFlow}
                className="btn-primary px-6 h-10 text-xs rounded-full text-black font-semibold flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] transition-all"
              >
                <span>Simulate Full Growth Flow</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              </button>
              {activatedGrowthCards.length > 1 && (
                <button 
                  onClick={() => setActivatedGrowthCards([0])}
                  className="btn-secondary px-5 h-10 text-xs rounded-full text-white/70 border border-white/10 hover:text-white cursor-pointer hover:bg-white/5 transition-all"
                >
                  Reset Flow
                </button>
              )}
            </div>
          </div>

          {/* Interactive Storytelling Layout */}
          <div className="relative w-full z-20">
            
            {/* SVG Connecting Flow Lines (Desktop Only) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
              <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Card 1 to Center */}
                <path
                  d="M 32% 25% C 36% 25%, 36% 40%, 40% 40%"
                  stroke={activeGrowthCard === 0 ? "#22E39A" : "rgba(255,255,255,0.06)"}
                  strokeWidth="2"
                  className="transition-colors duration-500"
                />
                {activeGrowthCard === 0 && (
                  <path
                    d="M 32% 25% C 36% 25%, 36% 40%, 40% 40%"
                    stroke="#22E39A"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    className="particle-glow-path"
                  />
                )}

                {/* Card 2 to Center */}
                <path
                  d="M 32% 75% C 36% 75%, 36% 60%, 40% 60%"
                  stroke={activeGrowthCard === 1 ? "#22E39A" : "rgba(255,255,255,0.06)"}
                  strokeWidth="2"
                  className="transition-colors duration-500"
                />
                {activeGrowthCard === 1 && (
                  <path
                    d="M 32% 75% C 36% 75%, 36% 60%, 40% 60%"
                    stroke="#22E39A"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    className="particle-glow-path"
                  />
                )}

                {/* Card 3 to Center */}
                <path
                  d="M 68% 25% C 64% 25%, 64% 40%, 60% 40%"
                  stroke={activeGrowthCard === 2 ? "#22E39A" : "rgba(255,255,255,0.06)"}
                  strokeWidth="2"
                  className="transition-colors duration-500"
                />
                {activeGrowthCard === 2 && (
                  <path
                    d="M 68% 25% C 64% 25%, 64% 40%, 60% 40%"
                    stroke="#22E39A"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    className="particle-glow-path"
                  />
                )}

                {/* Card 4 to Center */}
                <path
                  d="M 68% 75% C 64% 75%, 64% 60%, 60% 60%"
                  stroke={activeGrowthCard === 3 ? "#22E39A" : "rgba(255,255,255,0.06)"}
                  strokeWidth="2"
                  className="transition-colors duration-500"
                />
                {activeGrowthCard === 3 && (
                  <path
                    d="M 68% 75% C 64% 75%, 64% 60%, 60% 60%"
                    stroke="#22E39A"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    className="particle-glow-path"
                  />
                )}
              </svg>
            </div>

            {/* Symmetrical 3-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-20">
              
              {/* Left Column: Cards 1 & 2 */}
              <div className="lg:col-span-4 flex flex-col gap-8 justify-between">
                
                {/* 01. Traffic Card */}
                <motion.div
                  onMouseEnter={() => {
                    setActiveGrowthCard(0);
                    if (!activatedGrowthCards.includes(0)) setActivatedGrowthCards(p => [...p, 0]);
                  }}
                  className={`flex flex-col justify-between bg-black/40 backdrop-blur-md border rounded-[24px] p-8 transition-all duration-500 min-h-[260px] cursor-pointer select-none ${
                    activeGrowthCard === 0 ? "border-primary/40 shadow-[0_15px_30px_rgba(34,227,154,0.05)] scale-[1.01]" : "border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-extralight text-white/20">01</span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        activeGrowthCard === 0 ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/[0.02] border-white/5 text-white/50"
                      }`}>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className={`text-xl font-light tracking-tight transition-colors duration-300 ${activeGrowthCard === 0 ? "text-primary font-normal" : "text-white"}`}>
                      Traffic
                    </h3>
                    <p className="text-sm text-white/60 font-light mt-3 leading-relaxed">
                      Sales begin with qualified visitors. We help you attract high-intent customers through both Paid Marketing and Organic Growth strategies.
                    </p>
                  </div>

                  <TrafficParticles active={activeGrowthCard === 0} />

                  <div className="border-t border-white/[0.05] pt-4 mt-6">
                    <ul className="grid grid-cols-2 gap-2 text-xs text-white/70 font-light">
                      {["Meta Ads", "Google Ads", "SEO", "Social Media", "Organic Traffic", "High Intent Visitors"].map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary/80" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* 02. Trust Card */}
                <motion.div
                  onMouseEnter={() => {
                    setActiveGrowthCard(1);
                    if (!activatedGrowthCards.includes(1)) setActivatedGrowthCards(p => [...p, 1]);
                  }}
                  className={`flex flex-col justify-between bg-black/40 backdrop-blur-md border rounded-[24px] p-8 transition-all duration-500 min-h-[260px] cursor-pointer select-none ${
                    activeGrowthCard === 1 ? "border-primary/40 shadow-[0_15px_30px_rgba(34,227,154,0.05)] scale-[1.01]" : "border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-extralight text-white/20">02</span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        activeGrowthCard === 1 ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/[0.02] border-white/5 text-white/50"
                      }`}>
                        <Award className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className={`text-xl font-light tracking-tight transition-colors duration-300 ${activeGrowthCard === 1 ? "text-primary font-normal" : "text-white"}`}>
                      Build Trust
                    </h3>
                    <p className="text-sm text-white/60 font-light mt-3 leading-relaxed">
                      Your website is your digital storefront. A premium design instantly builds credibility and gives customers the confidence to purchase.
                    </p>
                  </div>

                  <TrustMeter active={activeGrowthCard === 1} />

                  <div className="border-t border-white/[0.05] pt-4 mt-6">
                    <ul className="grid grid-cols-2 gap-2 text-xs text-white/70 font-light">
                      {["Premium UI Design", "Professional Branding", "Product Presentation", "Social Proof", "Reviews", "Secure Checkout"].map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary/80" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

              </div>

              {/* Center Column: The Visual Outcome Dashboard */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div className="relative w-full h-full bg-gradient-to-br from-[#0c0c0c] to-[#040404] border border-white/[0.08] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative select-none">
                  {/* Subtle glowing overlay behind center card */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,227,154,0.06),transparent_70%)] pointer-events-none" />

                  {/* Logo Center */}
                  <div className="text-center mt-4 relative z-20">
                    <div className="relative w-20 h-20 rounded-full bg-black/40 border border-white/[0.08] flex items-center justify-center shadow-[0_0_40px_rgba(34,227,154,0.1)] mx-auto">
                      <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping pointer-events-none" />
                      <svg viewBox="0 0 24 24" className="w-10 h-10 text-primary" fill="currentColor">
                        <path d="M19.58 7.37L12.35 1.15a1 1 0 00-1.34 0L3.78 7.37a1 1 0 00-.31.73v9.64a1 1 0 00.31.73l7.23 6.22a1 1 0 001.34 0l7.23-6.22a1 1 0 00.31-.73V8.1a1 1 0 00-.31-.73zM12 3l6.5 5.58L12 14.16 5.5 8.58 12 3zm6.5 13.82l-6.5 5.58-6.5-5.58V9.75l6.5 5.58 6.5-5.58v7.07z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono tracking-widest block mt-4 uppercase">HIGH CONVERTING ENGINE</span>
                    <h4 className="text-white font-grotesk text-lg font-light mt-1">Shopify Store Core</h4>
                  </div>

                  {/* Dynamic Metric Cloud */}
                  <div className="my-6 relative z-20">
                    {activatedGrowthCards.length === 4 ? (
                      <div className="flex flex-col gap-4">
                        {/* Achievements Grid */}
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] text-white/90 font-mono border-b border-white/5 pb-3">
                          <div className="flex items-center gap-1"><span className="text-primary font-bold">✓</span> Conversion Up</div>
                          <div className="flex items-center gap-1"><span className="text-primary font-bold">✓</span> More Sales</div>
                          <div className="flex items-center gap-1"><span className="text-primary font-bold">✓</span> Fast Growth</div>
                          <div className="flex items-center gap-1"><span className="text-primary font-bold">✓</span> Max Retention</div>
                        </div>

                        {/* Floating Metrics Cloud */}
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {[
                            "↑ Conversion Rate",
                            "↑ ROAS",
                            "↑ Revenue",
                            "↑ Average Order Value",
                            "↑ Returning Customers"
                          ].map((metric, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.08 }}
                              className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary"
                            >
                              {metric}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 border border-dashed border-white/10 rounded-xl bg-black/20 text-center min-h-[110px]">
                        <span className="text-xs text-white/40 leading-relaxed font-light">
                          Hover over the surrounding elements to unlock full growth diagnostics
                        </span>
                        <div className="mt-3 flex items-center gap-1.5">
                          {[0, 1, 2, 3].map((step) => {
                            const done = activatedGrowthCards.includes(step);
                            return (
                              <div 
                                key={step} 
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  done ? "bg-primary scale-110 shadow-[0_0_8px_rgba(34,227,154,0.8)]" : "bg-white/10"
                                }`} 
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Revenue Graph widget */}
                  <div className="relative z-20">
                    <div className="flex justify-between items-end text-[10px] text-white/40 font-mono">
                      <span>LTM Revenue Graph</span>
                      <span className={activatedGrowthCards.length === 4 ? "text-primary" : ""}>
                        {activatedGrowthCards.length === 4 ? "PEAK REVENUE" : `STAGE ${activatedGrowthCards.length}/4`}
                      </span>
                    </div>
                    <RevenueGraph activeCount={activatedGrowthCards.length} />
                  </div>

                  {/* Glowing Statement */}
                  {activatedGrowthCards.length === 4 && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-[11px] sm:text-xs text-center text-white/80 leading-relaxed pt-4 border-t border-white/5 mt-4 font-light italic relative z-20"
                    >
                      "When <span className="text-primary font-semibold">Traffic</span>, <span className="text-primary font-semibold">Trust</span>, <span className="text-primary font-semibold">Customer Experience</span>, and <span className="text-primary font-semibold">Performance</span> work together, <span className="light-gradient-text font-semibold uppercase tracking-wider">Sales become the natural outcome</span>."
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Right Column: Cards 3 & 4 */}
              <div className="lg:col-span-4 flex flex-col gap-8 justify-between">
                
                {/* 03. Customer Experience Card */}
                <motion.div
                  onMouseEnter={() => {
                    setActiveGrowthCard(2);
                    if (!activatedGrowthCards.includes(2)) setActivatedGrowthCards(p => [...p, 2]);
                  }}
                  className={`flex flex-col justify-between bg-black/40 backdrop-blur-md border rounded-[24px] p-8 transition-all duration-500 min-h-[260px] cursor-pointer select-none ${
                    activeGrowthCard === 2 ? "border-primary/40 shadow-[0_15px_30px_rgba(34,227,154,0.05)] scale-[1.01]" : "border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-extralight text-white/20">03</span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        activeGrowthCard === 2 ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/[0.02] border-white/5 text-white/50"
                      }`}>
                        <Smartphone className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className={`text-xl font-light tracking-tight transition-colors duration-300 ${activeGrowthCard === 2 ? "text-primary font-normal" : "text-white"}`}>
                      Customer Experience
                    </h3>
                    <p className="text-sm text-white/60 font-light mt-3 leading-relaxed">
                      Every interaction matters. We create intuitive shopping experiences that make browsing effortless and purchasing seamless.
                    </p>
                  </div>

                  <UserJourneyMockup active={activeGrowthCard === 2} />

                  <div className="border-t border-white/[0.05] pt-4 mt-6">
                    <ul className="grid grid-cols-2 gap-2 text-xs text-white/70 font-light">
                      {["Easy Navigation", "Mobile Responsive", "Interactive Design", "Smart Product Discovery", "Smooth Checkout", "Conversion-Focused UX"].map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/80 shrink-0" />
                          <span className="truncate" title={h}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* 04. Performance Card */}
                <motion.div
                  onMouseEnter={() => {
                    setActiveGrowthCard(3);
                    if (!activatedGrowthCards.includes(3)) setActivatedGrowthCards(p => [...p, 3]);
                  }}
                  className={`flex flex-col justify-between bg-black/40 backdrop-blur-md border rounded-[24px] p-8 transition-all duration-500 min-h-[260px] cursor-pointer select-none ${
                    activeGrowthCard === 3 ? "border-primary/40 shadow-[0_15px_30px_rgba(34,227,154,0.05)] scale-[1.01]" : "border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-extralight text-white/20">04</span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        activeGrowthCard === 3 ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/[0.02] border-white/5 text-white/50"
                      }`}>
                        <Zap className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className={`text-xl font-light tracking-tight transition-colors duration-300 ${activeGrowthCard === 3 ? "text-primary font-normal" : "text-white"}`}>
                      Performance & Optimization
                    </h3>
                    <p className="text-sm text-white/60 font-light mt-3 leading-relaxed">
                      A fast website converts better. We optimize every technical detail to deliver lightning-fast loading, better engagement, and higher conversions.
                    </p>
                  </div>

                  <PerformanceMeter active={activeGrowthCard === 3} />

                  <div className="border-t border-white/[0.05] pt-4 mt-6">
                    <ul className="grid grid-cols-2 gap-2 text-xs text-white/70 font-light">
                      {["Page Speed", "Core Web Vitals", "Shopify Optimization", "Clean Code", "Performance Monitoring", "Faster Checkout"].map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/80 shrink-0" />
                          <span className="truncate" title={h}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

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
          <div className="relative w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] border-t sm:border border-neutral-200/80 shadow-2xl animate-fade-blur">
            {/* Handle bar (mobile only) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-neutral-300" />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-black/[0.03] border border-neutral-200/60 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-black/[0.08] hover:border-neutral-300 transition-all duration-300 z-50"
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
                      className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
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
                      </div>
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

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Compass,
  Zap,
  Phone,
  MapPin,
  ChevronDown,
  Building,
  HelpCircle,
  Percent,
  Play,
  ArrowUpRight,
  Layers,
  BarChart3,
  Mail,
  ExternalLink,
  Gem,
  Shirt,
  Watch,
  Sparkles,
  Leaf,
  Briefcase,
  Eye,
  ShoppingBag,
  Smartphone,
  Code,
  Sliders,
  Star,
  Laptop
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryBox from "@/components/EnquiryBox";
import InteractiveFunnel from "@/components/InteractiveFunnel";
import ROICalculator from "@/components/ROICalculator";
import ABTestingSimulator from "@/components/ABTestingSimulator";

// FAQ Items
const FAQ_ITEMS = [
  {
    q: "How long does a Shopify store take?",
    a: "A standard Shopify store build takes about 2 to 3 weeks. For custom storefronts, complex integrations, or large product catalogs, it can take 4 to 6 weeks. We focus on quality, speed optimization, and thorough testing before launching."
  },
  {
    q: "Can you redesign an existing Shopify store?",
    a: "Yes, we specialize in Shopify redesigns. We can revamp your storefront layout, improve mobile UX, accelerate page loading speeds, and optimize conversion pathways while preserving your existing products, customers, and order history."
  },
  {
    q: "Do you build custom Shopify features?",
    a: "Absolutely. We develop custom Shopify sections, product configurators, custom cart drawers, third-party ERP/CRM integrations, and custom Liquid functionalities tailored specifically to your business requirements."
  },
  {
    q: "Do you create Shopify stores for dropshipping?",
    a: "Yes, we build high-converting, trust-focused dropshipping stores. We integrate seamless supplier sync APIs (like DSers, Zendrop, or CJ Dropshipping), configure shipping rules, and design high-converting layouts that make your dropshipping brand stand out."
  },
  {
    q: "Will my Shopify store work on mobile?",
    a: "Yes, every store we build is designed with a mobile-first philosophy. Over 80% of e-commerce traffic comes from mobile devices, so we ensure your site is lightning-fast, easy to navigate, and has a frictionless mobile checkout experience."
  },
  {
    q: "Can I edit my website after delivery?",
    a: "Yes! We build all our stores using Shopify Online Store 2.0 sections and blocks. This allows you to easily edit text, images, banners, and reorder layouts directly from the Shopify Theme Editor without writing a single line of code. We also provide a training walkthrough upon handoff."
  }
];

// Testimonials Slider Data
const TESTIMONIALS = [
  {
    quote: "SalePXL rebuilt our storefront and took our conversion rate from 1.1% to 4.2%. Our monthly revenue grew by 5x in just 90 days. Their focus on custom speed and mobile user experience is what other agencies lack.",
    author: "Rohan Malhotra",
    role: "Founder, The Wheels Co",
    growth: "+410% Revenue Growth",
    avatar: "RM",
    stars: 5
  },
  {
    quote: "We migrated our store from BigCommerce to a custom Shopify setup with SalePXL. The checkout conversion rate improved instantly, and our page speeds dropped to under 1.5 seconds. They are true Shopify experts.",
    author: "Sneha Sharma",
    role: "ECommerce Director, Glyters",
    growth: "+150% Sales Boost",
    avatar: "SS",
    stars: 5
  },
  {
    quote: "Our store load speed went from 6.8 seconds to 1.9 seconds after the rebuild. The instant impact on our customer trust and add-to-cart rate was incredible. They are truly Shopify experts.",
    author: "Vipul Shah",
    role: "Marketing Head, Ratan Rashi",
    growth: "+310% Conversion Rate",
    avatar: "VS",
    stars: 5
  }
];

// Key stats for Trust Bar
const TRUST_STATS = [
  { label: "Experience", value: "10+ Years" },
  { label: "Brands Scaled", value: "100+ Brands" },
  { label: "Average Speed", value: "Sub-2.0s" },
  { label: "Revenue Generated", value: "Millions" },
  { label: "MSME Registered", value: "Udyam Certified" }
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
  image?: string;
}

const ALL_STORES: MockupConfig[] = [
  {
    name: "The Wheels Co",
    industry: "Automotive Accessories",
    theme: "dark",
    bgColor: "bg-[#0c0c0c]",
    textColor: "text-white",
    primaryColor: "#00AF56",
    heroText: "FORCE AHEAD",
    heroSub: "Premium Carbon Accessories",
    products: [ { name: "Carbon Steering", price: "₹24,999" }, { name: "Alloy Hubcaps", price: "₹4,500" } ]
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
    image: "/apparel_mockup.png"
  },
  {
    name: "Glyters Jewellery",
    industry: "Fashion Jewelry",
    theme: "dark",
    bgColor: "bg-[#0b0f19]",
    textColor: "text-white",
    primaryColor: "#3b82f6",
    heroText: "SHINE ALWAYS",
    heroSub: "D2C Diamond Studs & Bands",
    products: [ { name: "Tennis Bracelet", price: "₹38,000" }, { name: "Star Hoop Studs", price: "₹4,200" } ]
  },
  {
    name: "Brahmras Natural",
    industry: "Organic Wellness",
    theme: "light",
    bgColor: "bg-[#f4fbf7]",
    textColor: "text-[#0d2a1c]",
    primaryColor: "#15803d",
    heroText: "VEDIC ELIXIRS",
    heroSub: "Pure Cold-Pressed Juices",
    products: [ { name: "Ashwagandha Extract", price: "₹590" }, { name: "Triphala Amla Juice", price: "₹420" } ],
    image: "/wellness_mockup.png"
  },
  {
    name: "Panihari Vastra",
    industry: "Ethnic Apparel",
    theme: "light",
    bgColor: "bg-[#faf8f5]",
    textColor: "text-[#2b1f1d]",
    primaryColor: "#b45309",
    heroText: "JAIPURI ETHNICS",
    heroSub: "Handloom block prints",
    products: [ { name: "Anarkali Kurta Set", price: "₹4,500" }, { name: "Mulmul Dupatta", price: "₹1,200" } ]
  },
  {
    name: "Chashma",
    industry: "Premium Eyewear",
    theme: "light",
    bgColor: "bg-[#f8fafc]",
    textColor: "text-[#0f172a]",
    primaryColor: "#0f172a",
    heroText: "DESIGNER GLASSES",
    heroSub: "Anti-Glare Computer Lenses",
    products: [ { name: "Urban Acetate Frame", price: "₹2,999" }, { name: "Classic Aviator", price: "₹3,400" } ]
  },
  {
    name: "Suvastra Varnam",
    industry: "Luxury Sarees",
    theme: "light",
    bgColor: "bg-[#fdf6f0]",
    textColor: "text-[#3b1c0a]",
    primaryColor: "#9d174d",
    heroText: "HERITAGE SILKS",
    heroSub: "Bespoke Kanchipuram Sarees",
    products: [ { name: "Banarasi Silk Brocade", price: "₹45,000" }, { name: "Tussar Handloom", price: "₹22,000" } ]
  },
  {
    name: "Hay Clothing",
    industry: "Contemporary Apparel",
    theme: "dark",
    bgColor: "bg-[#070708]",
    textColor: "text-white",
    primaryColor: "#f43f5e",
    heroText: "STREETWEAR BAGS",
    heroSub: "Oversized Streetwear Hoods",
    products: [ { name: "Heavyweight Hoodie", price: "₹3,200" }, { name: "Relaxed Joggers", price: "₹2,400" } ]
  },
  {
    name: "Prisachi Designs",
    industry: "Designer Apparel",
    theme: "light",
    bgColor: "bg-[#faf9f6]",
    textColor: "text-[#1c1c1c]",
    primaryColor: "#0891b2",
    heroText: "CONTEMPORARY",
    heroSub: "Modern Couture Lines",
    products: [ { name: "Linen Trench Coat", price: "₹14,999" }, { name: "Asymmetrical Dress", price: "₹8,500" } ]
  },
  {
    name: "Anand Sweets",
    industry: "Gourmet Foods",
    theme: "light",
    bgColor: "bg-[#fffdf5]",
    textColor: "text-[#5c3a00]",
    primaryColor: "#d97706",
    heroText: "ROYAL SWEETS",
    heroSub: "Premium Assorted Kaju Gift Packs",
    products: [ { name: "Saffron Peda Box", price: "₹650" }, { name: "Baklava Gifting Tray", price: "₹1,850" } ]
  },
  {
    name: "Ratan Rashi",
    industry: "Precious Gemstones",
    theme: "light",
    bgColor: "bg-[#fdfbf7]",
    textColor: "text-[#3f2e1a]",
    primaryColor: "#c29d59",
    heroText: "NATURAL GEMSTONES",
    heroSub: "100% Certified Vedic Gemstones",
    products: [ { name: "Yellow Sapphire 4.2ct", price: "₹18,500" }, { name: "Natural Emerald Ring", price: "₹15,200" } ]
  },
  {
    name: "Get My Couch",
    industry: "Luxury Furniture",
    theme: "light",
    bgColor: "bg-[#fafaf9]",
    textColor: "text-[#292524]",
    primaryColor: "#0d9488",
    heroText: "MODULAR SOFAS",
    heroSub: "Custom Modular Sectionals",
    products: [ { name: "L-Shape Velvet Couch", price: "₹89,000" }, { name: "Modern Accent Chair", price: "₹18,500" } ]
  },
  {
    name: "Shop Selectives",
    industry: "Curated Cosmetics",
    theme: "light",
    bgColor: "bg-[#fffbfb]",
    textColor: "text-[#3b1a20]",
    primaryColor: "#db2777",
    heroText: "VEGAN BEAUTY",
    heroSub: "Cruelty-Free Tinted Balms",
    products: [ { name: "Dewy Skin Serum", price: "₹1,450" }, { name: "Tinted Lip Oil", price: "₹950" } ]
  },
  {
    name: "Humble Organic Labs",
    industry: "Superfoods & Health",
    theme: "light",
    bgColor: "bg-[#f5fbf2]",
    textColor: "text-[#1c3311]",
    primaryColor: "#16a34a",
    heroText: "SUPERFOOD BLENDS",
    heroSub: "Certified USDA Organic Energy Greens",
    products: [ { name: "Alkalizing Greens Pow", price: "₹2,400" }, { name: "Raw Maca Capsules", price: "₹1,200" } ],
    image: "/supplement_mockup.png"
  },
  {
    name: "Minimal Thread",
    industry: "Basics Apparel",
    theme: "dark",
    bgColor: "bg-[#09090b]",
    textColor: "text-white",
    primaryColor: "#27272a",
    heroText: "ESSENTIAL WEAR",
    heroSub: "Boxy Pocket Tees & Chinos",
    products: [ { name: "Boxy Tee Black", price: "₹1,200" }, { name: "Canvas Chino Pants", price: "₹2,800" } ]
  },
  {
    name: "Aura Fragrances",
    industry: "Luxury Perfumes",
    theme: "dark",
    bgColor: "bg-[#0a060d]",
    textColor: "text-white",
    primaryColor: "#db2777",
    heroText: "LUXURY SCENTS",
    heroSub: "French Amber & Oud Perfume",
    products: [ { name: "Nocturnal Oud 50ml", price: "₹9,500" }, { name: "Saffron Amber Mist", price: "₹6,800" } ],
    image: "/jewelry_mockup.png"
  },
  {
    name: "NutriBlend Ecom",
    industry: "Sports Nutrition",
    theme: "dark",
    bgColor: "bg-[#0c0d0a]",
    textColor: "text-white",
    primaryColor: "#ea580c",
    heroText: "WHEY ISOLATES",
    heroSub: "Zero Carb Elite Whey Protein",
    products: [ { name: "Whey Protein 2kg", price: "₹6,400" }, { name: "Micronized Creatine", price: "₹990" } ]
  },
  {
    name: "Urban Dwellings",
    industry: "Home Decor & Accents",
    theme: "light",
    bgColor: "bg-[#fbfaf8]",
    textColor: "text-[#2e2620]",
    primaryColor: "#7c2d12",
    heroText: "CLAY ACCENTS",
    heroSub: "Ceramic Vases & Tableware",
    products: [ { name: "Textured Clay Vase", price: "₹1,800" }, { name: "Rattan Wall Planter", price: "₹1,400" } ]
  },
  {
    name: "Luxe Leather",
    industry: "Leather Goods",
    theme: "light",
    bgColor: "bg-[#faf7f2]",
    textColor: "text-[#3b2413]",
    primaryColor: "#ca8a04",
    heroText: "GRAIN LEATHERS",
    heroSub: "Full-Grain Travel Duffles",
    products: [ { name: "Travel Duffle Bag", price: "₹14,500" }, { name: "Slim Bifold Wallet", price: "₹2,200" } ]
  },
  {
    name: "Zenith Watches",
    industry: "Horology & Accessories",
    theme: "dark",
    bgColor: "bg-[#0a0b0d]",
    textColor: "text-white",
    primaryColor: "#94a3b8",
    heroText: "AUTOMATICS",
    heroSub: "Skeleton Chronographs",
    products: [ { name: "Skeleton Chronograph", price: "₹42,000" }, { name: "GMT Automatic Watch", price: "₹28,000" } ]
  }
];

function getIndustryImages(industry: string) {
  const ind = industry.toLowerCase();
  
  if (ind.includes("automotive")) {
    return {
      hero: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=200&q=80",
        "https://images.unsplash.com/photo-1611245781467-df5b4af7f2ff?w=200&q=80"
      ]
    };
  }
  if (ind.includes("gemstone") || ind.includes("jewelry") || ind.includes("perfume") || ind.includes("fragrance")) {
    return {
      hero: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80"
      ]
    };
  }
  if (ind.includes("apparel") || ind.includes("clothing") || ind.includes("fashion") || ind.includes("boutique")) {
    return {
      hero: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&q=80",
        "https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?w=200&q=80"
      ]
    };
  }
  if (ind.includes("eyewear") || ind.includes("glasses")) {
    return {
      hero: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&q=80",
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=200&q=80"
      ]
    };
  }
  if (ind.includes("wellness") || ind.includes("health") || ind.includes("nutrition") || ind.includes("superfood")) {
    return {
      hero: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&q=80",
        "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf4?w=200&q=80"
      ]
    };
  }
  if (ind.includes("food") || ind.includes("sweet")) {
    return {
      hero: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1558961309-db6f1b3e1022?w=200&q=80",
        "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=200&q=80"
      ]
    };
  }
  if (ind.includes("furniture") || ind.includes("decor") || ind.includes("dwelling")) {
    return {
      hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80"
      ]
    };
  }
  if (ind.includes("cosmetics") || ind.includes("beauty")) {
    return {
      hero: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80"
      ]
    };
  }
  if (ind.includes("leather")) {
    return {
      hero: "https://images.unsplash.com/photo-1473187983305-f615310e7daa?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80",
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80"
      ]
    };
  }
  if (ind.includes("watch") || ind.includes("horology")) {
    return {
      hero: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      products: [
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&q=80",
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&q=80"
      ]
    };
  }
  
  return {
    hero: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    products: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80"
    ]
  };
}

function StorefrontMockup({ store }: { store: MockupConfig }) {
  const isDark = store.theme === "dark";
  const assets = getIndustryImages(store.industry);
  
  return (
    <div className={`w-full h-full flex flex-col ${store.bgColor} ${store.textColor} font-sans select-none overflow-hidden relative text-left`}>
      {/* Header Bar */}
      <div className={`px-4 py-2 border-b flex items-center justify-between text-[8px] uppercase tracking-wider font-bold ${
        isDark ? "border-white/5 bg-black/15 text-white/60" : "border-black/5 bg-black/[0.02] text-black/60"
      }`}>
        <span className="font-black" style={{ color: store.primaryColor }}>{store.name}</span>
        <div className="flex gap-2">
          <span>Shop</span>
          <span>Story</span>
          <span>Cart (0)</span>
        </div>
      </div>

      {/* Hero Banner Area */}
      <div className="relative py-3 px-4 flex flex-col justify-center min-h-[70px] overflow-hidden">
        {/* Real Product Background image */}
        <img
          src={assets.hero}
          alt="Banner cover"
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none filter brightness-50"
        />
        <div 
          className="absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full blur-xl opacity-20 pointer-events-none"
          style={{ backgroundColor: store.primaryColor }}
        />
        <div className="relative z-10 flex flex-col gap-0.5">
          <span className="text-[5px] uppercase tracking-widest font-bold opacity-75">New Collection</span>
          <h4 className="text-[10px] font-black leading-tight tracking-tight uppercase max-w-[150px]">{store.heroText}</h4>
          <p className="text-[5px] opacity-60 leading-normal max-w-[130px] line-clamp-2">{store.heroSub}</p>
        </div>
      </div>

      {/* Products Row Grid */}
      <div className="grid grid-cols-2 gap-2 p-2 flex-1 items-start bg-black/[0.02]">
        {store.products.map((p, i) => (
          <div key={i} className={`flex flex-col gap-0.5 p-1 rounded-lg border ${
            isDark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-white shadow-sm"
          }`}>
            {/* Real Product Image from Unsplash */}
            <div className="aspect-[16/10] w-full rounded-md flex items-center justify-center relative overflow-hidden bg-black/20 border border-white/5">
              <img
                src={assets.products[i] || assets.products[0]}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <span className="text-[6px] font-bold truncate">{p.name}</span>
            <div className="flex justify-between items-center text-[6px] font-mono mt-0.5">
              <span className="opacity-70 font-semibold">{p.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

  // Auto Slider for Testimonials
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
    <div className="relative">
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[400px] rounded-full bg-[#00AF56]/10 blur-[130px] animate-blob-slow-1 pointer-events-none" />
      <div className="absolute top-[15%] right-[-5%] w-[40%] h-[500px] rounded-full bg-emerald-500/5 blur-[150px] animate-blob-slow-2 pointer-events-none" />
      <div className="absolute top-[50%] left-[5%] w-[35%] h-[400px] rounded-full bg-[#00AF56]/5 blur-[120px] animate-blob-slow-1 pointer-events-none" />
      <div className="absolute bottom-[8%] right-[5%] w-[35%] h-[450px] rounded-full bg-[#00AF56]/8 blur-[130px] animate-blob-slow-2 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center pt-12 pb-24 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column Copy */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00AF56]/10 border border-[#00AF56]/20 w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AF56] animate-pulse" />
              <span className="text-[10px] text-[#00AF56] font-mono uppercase tracking-wider font-bold">
                The Shopify Growth Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight text-white leading-tight">
              Build a Shopify Store That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0E0E0] to-[#00AF56]">
                Turns Visitors Into Customers
              </span>
            </h1>

            <p className="text-[#9C9C9C] text-base sm:text-lg leading-relaxed max-w-xl">
              Launch a high-converting Shopify store from scratch, redesign your existing store, or build custom Shopify solutions tailored to your business. We create Shopify experiences that build customer trust and increase conversions.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,175,86,0.35)] text-center group"
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
                <Phone className="w-4 h-4 text-[#00AF56]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Extra Credibility Indicator */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center gap-6">
              <div className="flex -space-x-3">
                <span className="w-9 h-9 rounded-full bg-[#181818] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-white">SB</span>
                <span className="w-9 h-9 rounded-full bg-[#181818] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-white">WE</span>
                <span className="w-9 h-9 rounded-full bg-[#181818] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-white">SZ</span>
              </div>
              <p className="text-xs text-[#8C8C8C] leading-relaxed">
                Trusted by <span className="text-white font-semibold">100+ brands</span> to build, redesign, and optimize Shopify storefronts.
              </p>
            </div>
          </div>

          {/* Right Column Interactive Dashboard */}
          <div className="lg:col-span-5 relative">
            <EnquiryBox />
          </div>
        </div>
      </section>

      {/* TRUST BAR TICKER */}
      <section className="bg-[#0b0b0c] py-10 border-y border-white/[0.06] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-center">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1 items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUSTED BY BRAND LOGOS */}
      <section className="py-20 px-6 relative overflow-hidden bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 text-center items-center">
          <div className="max-w-2xl flex flex-col gap-3">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Trusted Partners
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Trusted by Growing Ecommerce Brands
            </h2>
            <p className="text-[#8C8C8C] text-sm leading-relaxed">
              We've helped businesses across multiple industries launch and grow with professionally built Shopify stores.
            </p>
          </div>

          {/* Monochrome Styled Brand Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 w-full max-w-5xl mt-4">
            {PORTFOLIO_STORES.map((store, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-[#0d0d0f]/40 border border-white/[0.04] flex items-center justify-center min-h-[90px] hover:border-[#00AF56]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,175,86,0.05)] cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00AF56]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="text-sm md:text-base font-black tracking-widest text-[#8C8C8C] group-hover:text-white uppercase transition-colors duration-300 font-mono">
                  {store.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="py-28 px-6 relative overflow-hidden bg-[#0b0b0c] border-y border-white/[0.06]">
        {/* Colorful floating background elements */}
        <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#00AF56]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-12 text-center items-center">
          <div className="max-w-3xl flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Conversion ROI Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              See How Much Revenue <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00AF56]">
                You Are Leaving On The Table
              </span>
            </h2>
            <p className="text-[#8C8C8C] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              When storefront load speeds drop and mobile UX is optimized, your conversion rate spikes, increasing revenue without spending a single rupee more on traffic.
            </p>
          </div>
          
          <ROICalculator />
        </div>
      </section>

      {/* SHOPIFY PHILOSOPHY SECTION */}
      <section className="py-28 px-6 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              The SalePixel Core Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Traffic Brings Visitors. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00AF56]">
                Trust Creates Customers.
              </span>
            </h2>
            <p className="text-[#8C8C8C] text-sm sm:text-base leading-relaxed mt-2 max-w-2xl mx-auto">
              Visitors can come from anywhere—Google, social media, referrals, email, or other marketing channels. But traffic alone doesn't generate sales. Customers purchase when they trust your brand. A professionally designed Shopify store creates confidence, improves the shopping experience, and removes friction from the buying journey. At SalePixel, we build Shopify stores that earn customer trust and convert more visitors into buyers.
            </p>
          </div>

          {/* Interactive Flow Diagram */}
          <InteractiveFunnel />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 px-6 bg-[#111111] border-y border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-4 text-left max-w-xl">
              <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
                Services & Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineered for Conversion. Optimized for Performance.
              </h2>
            </div>
            <p className="text-[#8C8C8C] text-sm md:max-w-sm leading-relaxed">
              We provide full-stack Shopify solutions that combine custom UI/UX design with clean code architectures, lightning-fast speeds, and seamless migrations.
            </p>
          </div>

          {/* Grid of Interactive Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Shopify Store Development",
                desc: "High-performance storefront development using optimized code architectures, Next.js, and custom templates built for lightning-fast speeds.",
                metrics: "PageSpeed Score: 95+"
              },
              {
                title: "Shopify CRO Audits",
                desc: "Deep user-behavior mapping and session recording analysis to identify layout friction points and design optimized pathways.",
                metrics: "Avg. +40% CR Boost"
              },
              {
                title: "Shopify Store Migrations",
                desc: "Seamless migration of products, collections, customers, SEO paths, and design assets from BigCommerce, WooCommerce, or custom platforms.",
                metrics: "Zero SEO Traffic Loss"
              },
              {
                title: "Speed & Performance Tuning",
                desc: "Under-the-hood optimization, code splitting, asset loading strategy, and script management to reach sub-2.0 second page loads.",
                metrics: "Consistently 90+ Score"
              },
              {
                title: "Custom Landing Pages",
                desc: "Designing and engineering tailored, product-focused promotional landing pages for catalog launches and marketing events.",
                metrics: "Sub-1.5s Load Velocity"
              },
              {
                title: "App & Custom Integrations",
                desc: "Connecting custom inventory ERPs, logistics APIs, CRM platforms, subscriptions, and custom features into your store.",
                metrics: "100% API Sync Rate"
              }
            ].map((srv, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-[#181818] border border-white/[0.05] hover:border-[#00AF56]/30 transition-all duration-300 flex flex-col justify-between min-h-[250px] overflow-hidden"
              >
                {/* Micro green glow on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#00AF56]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] group-hover:bg-[#00AF56]/10 flex items-center justify-center text-white group-hover:text-[#00AF56] transition-colors duration-300">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00AF56] transition-colors duration-200">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-[#8C8C8C] leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.05] flex justify-between items-center text-xs">
                  <span className="text-[#8C8C8C] uppercase tracking-wider font-mono">Performance Metric</span>
                  <span className="font-bold text-white font-mono">{srv.metrics}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA trigger */}
          <div className="flex justify-center mt-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-white hover:text-[#00AF56] transition-colors group"
            >
              <span>Explore All Our Growth Capabilities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* AB TESTING SIMULATOR SECTION */}
      <section className="py-28 px-6 relative overflow-hidden bg-[#050505] border-b border-white/[0.06]">
        {/* Floating gradient circle */}
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col gap-12 text-center items-center">
          <div className="max-w-3xl flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              A/B Conversion Sandbox
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Optimize The Destination <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00AF56]">
                Before Scaling The Ads
              </span>
            </h2>
            <p className="text-[#8C8C8C] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Compare a standard, unoptimized template with a custom SalePXL high-converting storefront setup. Click the hotspots to explore design and speed parameters.
            </p>
          </div>

          <ABTestingSimulator />
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE SALEPIXEL */}
      <section className="py-28 px-6 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Header */}
          <div className="max-w-2xl text-left flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Why Partner With Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built on Conversion Psychology & Real-time Data
            </h2>
            <p className="text-[#8C8C8C] text-sm leading-relaxed">
              We do not write generic reports or run standard agency templates. We treat your digital product representation seriously, ensuring conversion optimizations are integrated into the storefront architecture.
            </p>
          </div>

          {/* Grid of 6 Premium Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Premium Store Design",
                desc: "Beautiful Shopify stores designed to reflect your brand.",
                icon: Sparkles
              },
              {
                title: "Mobile-First Experience",
                desc: "Perfect experience across every device.",
                icon: Smartphone
              },
              {
                title: "Conversion-Focused Layouts",
                desc: "Every page is designed to maximize conversions.",
                icon: TrendingUp
              },
              {
                title: "Fast Performance",
                desc: "Optimized for speed and user experience.",
                icon: Zap
              },
              {
                title: "Custom Shopify Development",
                desc: "Tailored Shopify functionality built for your business.",
                icon: Code
              },
              {
                title: "Easy Content Management",
                desc: "Manage your website easily using Shopify's Online Store 2.0 sections.",
                icon: Sliders
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-8 rounded-3xl bg-[#0d0d0f]/80 border border-white/[0.05] hover:border-[#00AF56]/30 transition-all duration-300 flex flex-col gap-5 overflow-hidden shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00AF56]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="w-12 h-12 rounded-xl bg-[#00AF56]/10 text-[#00AF56] flex items-center justify-center shrink-0 group-hover:bg-[#00AF56] group-hover:text-black transition-all duration-300">
                    <IconComp className="w-5.5 h-5.5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#00AF56] transition-colors duration-200">{item.title}</h3>
                    <p className="text-xs text-[#8C8C8C] leading-relaxed mt-2">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: PORTFOLIO RECENT PROJECTS */}
      <section className="py-28 px-6 bg-[#0b0b0c] border-y border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Shopify Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Recent Shopify Projects
            </h2>
            <p className="text-[#8C8C8C] text-sm">
              Explore our recent custom Shopify builds combining high-end design aesthetics with optimized checkout performance.
            </p>
          </div>

          {/* Elegant 3-column Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOME_PROJECTS.map((proj, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-[#0d0d0f]/80 border border-white/[0.05] hover:border-[#00AF56]/20 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                {/* Visual mockups container */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#050505] p-3 border-b border-white/[0.04] flex items-center justify-center">
                  
                  {/* Desktop Browser Window Preview (HTML CSS Mockup) */}
                  <div className={`w-[90%] aspect-[16/10] rounded-xl border border-white/[0.06] ${proj.bgColor} ${proj.textColor} font-sans shadow-lg overflow-hidden flex flex-col self-start`}>
                    {/* Fake Header bar */}
                    <div className="px-2 py-1 bg-black/10 border-b border-black/[0.03] flex items-center justify-between text-[6px]">
                      <div className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                      </div>
                      <span className="font-mono scale-90 opacity-60 truncate max-w-[80px]">{proj.name.toLowerCase().replace(" ", "")}.com</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-black/5" />
                    </div>
                    {/* Fake body */}
                    <div className="p-2 flex flex-col gap-1.5 flex-1 justify-start">
                      <div className="flex justify-between items-center text-[5px] scale-95 border-b border-black/[0.04] pb-1 opacity-70">
                        <span className="font-black" style={{ color: proj.primaryColor }}>{proj.name}</span>
                        <div className="flex gap-1.5">
                          <span>Shop</span>
                          <span>Cart (0)</span>
                        </div>
                      </div>
                      {/* Fake Banner */}
                      <div className="bg-black/5 rounded p-1.5 relative overflow-hidden flex flex-col justify-center min-h-[35px]">
                        <div className="relative z-10 flex flex-col">
                          <span className="text-[4px] uppercase tracking-widest font-bold opacity-60">New Collection</span>
                          <span className="text-[6px] font-black leading-tight max-w-[80px]">{proj.heroText}</span>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-[45%] bg-black/10 rounded flex items-center justify-center text-[8px] opacity-20">
                          <ShoppingBag className="w-4.5 h-4.5" />
                        </div>
                      </div>
                      {/* Fake Products row */}
                      <div className="grid grid-cols-2 gap-1.5 mt-0.5">
                        {proj.products.map((p, pidx) => (
                          <div key={pidx} className="bg-black/[0.02] border border-black/[0.03] rounded p-1 flex flex-col gap-0.5">
                            <div className="aspect-[16/10] bg-black/5 rounded-sm" />
                            <span className="text-[4px] font-bold truncate">{p.name}</span>
                            <span className="text-[4px] opacity-70 font-mono">{p.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Preview Overlay (Overlapping phone screenshot) */}
                  <div className="absolute bottom-2.5 right-2.5 w-[33%] aspect-[9/16.2] rounded-xl border border-white/[0.12] bg-[#070708] overflow-hidden shadow-2xl z-20 group-hover:scale-102 transition-transform duration-300">
                    {/* Phone speaker / camera notch */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full z-30" />
                    {/* Actual screenshot image loaded inside mobile phone mockup */}
                    <img
                      src={proj.image}
                      alt={`${proj.name} mobile view`}
                      className="w-full h-full object-cover object-top filter brightness-95"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Info and tags */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-white group-hover:text-[#00AF56] transition-colors">{proj.name}</h3>
                      <span className="text-[9px] bg-white/[0.04] border border-white/[0.06] text-[#8C8C8C] px-2 py-0.5 rounded-full font-mono uppercase">
                        {proj.industry}
                      </span>
                    </div>
                    <p className="text-xs text-[#8C8C8C] leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW SHOWCASE */}
      <section className="py-20 relative overflow-hidden bg-[#050505] border-b border-white/[0.06]">
        {/* CSS Keyframe animations for auto-scrolling marquee */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marquee-left 40s linear infinite;
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marquee-right 40s linear infinite;
          }
          .marquee-container:hover .animate-marquee-left,
          .marquee-container:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        ` }} />

        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[400px] rounded-full bg-[#00AF56]/[0.02] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Storefront Showcases
          </h2>
        </div>

        {/* Row 1: Landscape mockups scrolling left (Brands 1-6) */}
        <div className="w-full overflow-hidden marquee-container py-3">
          <div className="animate-marquee-left flex gap-6">
            {[...PORTFOLIO_STORES, ...PORTFOLIO_STORES, ...PORTFOLIO_STORES].map((store, idx) => (
              <div
                key={idx}
                className="w-[200px] sm:w-[260px] md:w-[320px] flex flex-col rounded-2xl bg-[#0d0d0f] border border-white/[0.06] overflow-hidden hover:border-[#00AF56]/30 transition-all duration-500 shrink-0"
                style={{ aspectRatio: "400/715" }}
              >
                {/* Browser dots top bar */}
                <div className="px-4 py-2 bg-[#141416] border-b border-white/[0.04] flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/[0.05]" />
                </div>
                {/* Mockup Image Container */}
                <div className="relative flex-1 w-full overflow-hidden bg-[#050505]">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-black bg-white hover:bg-white/90 transition-all text-center"
          >
            <span>Explore All Portfolio Brands</span>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS AUTO-SLIDER */}
      <section className="py-28 px-6 relative bg-[#050505]">
        <div className="max-w-5xl mx-auto flex flex-col gap-12 text-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          {/* Testimonial slider card */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full p-8 md:p-12 rounded-3xl bg-[#0d0d0f]/80 backdrop-blur-md border border-white/[0.06] flex flex-col gap-6 relative text-left shadow-xl"
              >
                {/* Stars and quote icon */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(TESTIMONIALS[currentTestimonial].stars || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-5xl font-serif text-[#00AF56] opacity-20 leading-none">
                    “
                  </span>
                </div>
                
                <p className="text-base sm:text-lg text-[#D7D7D7] italic leading-relaxed relative z-10">
                  {TESTIMONIALS[currentTestimonial].quote}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#00AF56]/10 border border-[#00AF56]/20 text-[#00AF56] font-mono font-bold text-xs flex items-center justify-center">
                      {TESTIMONIALS[currentTestimonial].avatar || "SP"}
                    </span>
                    <div className="text-left">
                      <p className="font-bold text-white text-sm">
                        {TESTIMONIALS[currentTestimonial].author}
                      </p>
                      <p className="text-xs text-[#8C8C8C]">
                        {TESTIMONIALS[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#00AF56]/15 border border-[#00AF56]/30 text-[#00AF56] px-4 py-1.5 rounded-full font-bold font-mono text-center self-start sm:self-center">
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
                    currentTestimonial === idx ? "bg-[#00AF56] w-6" : "bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-28 px-6 bg-[#0b0b0c] border-y border-white/[0.06] relative">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Any Questions? Look Here.
            </h2>
            <p className="text-[#8C8C8C] text-sm">
              Find answers to commonly asked questions about our Shopify design, development, and conversion audit processes.
            </p>
          </div>

          {/* Accordion FAQ list */}
          <div className="flex flex-col gap-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#0d0d0f] border border-white/[0.05] overflow-hidden transition-all duration-300 hover:border-white/10"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left text-white hover:text-[#00AF56] transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4.5 h-4.5 text-[#00AF56] shrink-0" />
                      <span className="text-sm sm:text-base font-semibold">{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C8C8C] shrink-0 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180 text-[#00AF56]" : ""
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
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#8C8C8C] leading-relaxed border-t border-white/[0.03]">
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
      <section className="py-32 px-6 relative overflow-hidden text-center bg-[#050505]">
        {/* Glowing visual indicators */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00AF56]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-8 items-center">
          <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
            Accelerate Growth
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Ready to Build Your Shopify Store?
          </h2>

          <p className="text-[#8C8C8C] text-sm sm:text-base leading-relaxed max-w-xl">
            Whether you're launching a new brand or upgrading an existing Shopify store, we'll help you create a shopping experience your customers trust.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,175,86,0.4)] text-center group"
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
              <Phone className="w-4 h-4 text-[#00AF56]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-xs text-[#8C8C8C] pt-6 border-t border-white/[0.05] w-full max-w-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00AF56]" />
              <span>Dehradun, Uttarakhand, India</span>
            </div>
            <div className="hidden sm:block text-white/10">|</div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#00AF56]" />
              <span>Registered Enterprise: SALEPXL</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

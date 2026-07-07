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
  ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryBox from "@/components/EnquiryBox";
import InteractiveFunnel from "@/components/InteractiveFunnel";
import ROICalculator from "@/components/ROICalculator";
import ABTestingSimulator from "@/components/ABTestingSimulator";

// FAQ Items
const FAQ_ITEMS = [
  {
    q: "What makes SalePXL different from other digital ad agencies?",
    a: "Unlike generic agencies that focus only on running ads, SalePXL is a Shopify Growth Partner. We address both traffic AND conversion. We optimize your website speed, design, trust signals, and user experience (CRO) before scaling traffic with Meta and Google Ads. This reduces your Cost Per Acquisition (CPA) and maximizes your Return on Ad Spend (ROAS)."
  },
  {
    q: "Do you design Shopify stores from scratch or optimize existing ones?",
    a: "We do both. We can build custom, high-converting Shopify stores from scratch using clean code and conversion psychology. We also perform deep CRO audits and redesign existing Shopify storefronts to unlock immediate gains in conversion rates, speed, and mobile responsiveness."
  },
  {
    q: "What ad budgets do you typically work with?",
    a: "We work with brands scaling from initial traction to high-growth phases. While we manage campaigns starting at modest budgets (e.g. ₹20,000/mo for pilot testing), our framework is engineered for brands scaling past ₹2 Lakhs to ₹10 Lakhs+ in monthly ad spend who want to maximize their ROAS efficiently."
  },
  {
    q: "Do you handle the creative production (images/videos) for Meta Ads?",
    a: "Yes! We formulate the creative strategy, scripting, and visual hooks. Creative is the single most important lever in modern advertising, so we work closely with your brand to produce high-performing static graphics, dynamic motion design, and high-converting UGC (User Generated Content) video ads."
  },
  {
    q: "What is the typical timeframe to see performance scaling results?",
    a: "Website optimization and store development usually take 2 to 4 weeks depending on complexity. Once campaigns launch, we typically see positive leading indicators (lower cost-per-click, improved add-to-cart rates) in the first 7-14 days, followed by sustained, profitable scaling within 30-60 days."
  },
  {
    q: "How does your Conversion Rate Optimization (CRO) process work?",
    a: "We analyze hot-maps, session recordings, and custom checkout funnels to find where users drop off. Then, we apply sales psychology frameworks: streamlining product pages, adding clear trust trust-badges, improving cart drawers, and accelerating page speeds to double or triple your conversion rates."
  },
  {
    q: "Is SalePXL a government-registered agency?",
    a: "Yes, we are a government registered MSME enterprise. Registered under the Name: SALEPXL with Udyam Registration Number: UDYAM-UK-05-0097916, operating transparently out of Dehradun, Uttarakhand, India."
  },
  {
    q: "How do we get started with SalePXL?",
    a: "The first step is booking a free 30-minute Shopify Growth Strategy Call. We will audit your current storefront, analyze your traffic channels, and give you a step-by-step roadmap to scale your brand. Click any 'Book Strategy Call' button to pick a date."
  }
];

// Testimonials Slider Data
const TESTIMONIALS = [
  {
    quote: "SalePXL rebuilt our storefront and took our conversion rate from 1.1% to 4.2%. Combined with their Meta Ads scaling, our monthly revenue grew by 5x in just 90 days. Their focus on the website experience is what other agencies lack.",
    author: "Rohan Malhotra",
    role: "Founder, The Wheels Co",
    growth: "+410% Revenue Growth"
  },
  {
    quote: "Managing ₹5 Lakhs in monthly ad spend was giving us a 2.1x ROAS. Pankaj and the SalePXL team stepped in, optimized our landing pages, and restructured our Google PMax campaigns. We are now running at an 8.7x ROAS.",
    author: "Sneha Sharma",
    role: "ECommerce Director, Glyters",
    growth: "8.76x Scale ROAS"
  },
  {
    quote: "Our store load speed went from 6.8 seconds to 1.9 seconds after the rebuild. The instant impact on our customer trust and add-to-cart rate was incredible. They are truly Shopify experts.",
    author: "Vipul Shah",
    role: "Marketing Head, Ratan Rashi",
    growth: "-42% CPA Reduction"
  }
];

// Key stats for Trust Bar
const TRUST_STATS = [
  { label: "Experience", value: "10+ Years" },
  { label: "Brands Scaled", value: "100+ Brands" },
  { label: "Ad Spend Managed", value: "₹20Cr+" },
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
      <div className="absolute top-[15%] right-[-5%] w-[40%] h-[500px] rounded-full bg-indigo-500/10 blur-[150px] animate-blob-slow-2 pointer-events-none" />
      <div className="absolute top-[50%] left-[5%] w-[35%] h-[400px] rounded-full bg-fuchsia-500/5 blur-[120px] animate-blob-slow-1 pointer-events-none" />
      <div className="absolute bottom-[8%] right-[5%] w-[35%] h-[450px] rounded-full bg-[#00AF56]/8 blur-[130px] animate-blob-slow-2 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column Copy */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00AF56]/10 border border-[#00AF56]/20 w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AF56] animate-pulse" />
              <span className="text-[10px] text-[#00AF56] font-mono uppercase tracking-wider font-bold">
                The Shopify Growth Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Scale Your Shopify Brand With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D7D7D7] to-[#00AF56]">
                High-Converting Stores
              </span>{" "}
              & Performance Marketing
            </h1>

            <p className="text-[#D7D7D7] text-base sm:text-lg leading-relaxed max-w-xl">
              We help eCommerce brands scale revenue through premium Shopify development, CRO optimization, Meta Ads, and Google Ads management. No vanity metrics—just pure profitable scaling.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,175,86,0.35)] text-center group"
              >
                <span>Book Free Strategy Call</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300 text-center hover:bg-white/[0.02]"
              >
                <span>View Portfolio</span>
              </Link>
            </div>

            {/* Extra Credibility Indicator */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-6">
              <div className="flex -space-x-3">
                <span className="w-9 h-9 rounded-full bg-[#181818] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-white">TWC</span>
                <span className="w-9 h-9 rounded-full bg-[#181818] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-white">RR</span>
                <span className="w-9 h-9 rounded-full bg-[#181818] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-white">GL</span>
              </div>
              <p className="text-xs text-[#8C8C8C] leading-relaxed">
                Trusted by <span className="text-white font-semibold">100+ brands</span> to build, optimize, and scale campaigns.
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
      <section className="bg-[#111111] py-8 border-y border-white/[0.08] relative overflow-hidden">
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

      {/* ROI CALCULATOR SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Colorful floating background elements */}
        <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[120px] animate-blob-slow-1 pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#00AF56]/10 blur-[120px] animate-blob-slow-2 pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-12 text-center items-center">
          <div className="max-w-3xl flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              ROAS Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              See How Much Revenue <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00AF56]">
                You Are Leaving On The Table
              </span>
            </h2>
            <p className="text-[#8C8C8C] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              When conversion rates spike, customer acquisition cost falls exponentially. Use our interactive ROI calculator to estimate the scale potential of your brand.
            </p>
          </div>
          
          <ROICalculator />
        </div>
      </section>

      {/* SHOPIFY PHILOSOPHY SECTION */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              The SalePXL Core Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Traffic Brings Visitors. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00AF56]">
                Your Store Creates Trust.
              </span>{" "}
              Trust Creates Sales.
            </h2>
            <p className="text-[#8C8C8C] text-sm sm:text-base leading-relaxed mt-2">
              Most ad agencies focus solely on launching campaigns. If your website is slow, lacks conversion UX, or looks generic, you are burning your ad spend. We optimize the destination first, then scale the traffic.
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
                Engineered for Conversion. Optimized for Scale.
              </h2>
            </div>
            <p className="text-[#8C8C8C] text-sm md:max-w-sm leading-relaxed">
              We provide full-stack Shopify solutions that combine high-end UI design with rigorous mathematical testing and media buying frameworks.
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
                title: "Meta Ads Performance Scaling",
                desc: "Rigorous media buying structures on Facebook & Instagram utilizing high-frequency asset testing and conversion APIs.",
                metrics: "₹20Cr+ Managed Spend"
              },
              {
                title: "Google Ads (Search & PMax)",
                desc: "Capturing high-intent customer search queries and scaling product listing reach through advanced Google Performance Max campaigns.",
                metrics: "8.76x ROAS Case Study"
              },
              {
                title: "Custom Landing Pages",
                desc: "Building highly relevant, product-focused landing pages mapped directly to paid ad creatives to keep CPA as low as possible.",
                metrics: "Sub-1.5s Load Velocity"
              },
              {
                title: "Email & Retention Marketing",
                desc: "Designing personalized lifecycle sequences, cart abandonment recovery flows, and SMS marketing tactics to maximize LTV.",
                metrics: "30% Revenue from Flows"
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
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#111111] to-[#050505] border-b border-white/[0.08]">
        {/* Floating gradient circle */}
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-fuchsia-500/5 blur-[150px] animate-blob-slow-2 pointer-events-none" />
        
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

      {/* WHY SALEPXL SECTION */}
      <section className="py-24 px-6 relative">
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
              We do not write generic reports or run standard agency templates. We treat your ad budget like our own, ensuring conversion optimizations are integrated into the storefront architecture.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sales Psychology Design",
                desc: "Placing copy, testimonials, and buy flows exactly where they capture focus and mitigate checkout hesitation.",
                icon: Compass
              },
              {
                title: "Lightning Speed Performance",
                desc: "Compressing images, lazy-loading heavy assets, and keeping scripts clean to maximize page velocity.",
                icon: Zap
              },
              {
                title: "Transparent reporting",
                desc: "No hidden dashboards. We provide weekly performance logs detailing spend, conversions, and exact blended ROAS.",
                icon: BarChart3
              },
              {
                title: "Continuous Optimizations",
                desc: "A/B testing layouts, pricing options, landing page designs, and ad assets week-in and week-out.",
                icon: TrendingUp
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#181818] border border-white/[0.05] flex flex-col gap-4"
                >
                  <span className="w-10 h-10 rounded-lg bg-[#00AF56]/10 text-[#00AF56] flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" />
                  </span>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-[#8C8C8C] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASE STUDIES SECTION */}
      <section className="py-24 px-6 bg-[#111111] border-y border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Case Studies & Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real Performance. Documented Scaling.
            </h2>
            <p className="text-[#8C8C8C] text-sm">
              Take a look at how we take brand budgets and route them through conversion-optimized layouts to generate real, profitable scaling.
            </p>
          </div>

          {/* Interactive Case Study Card */}
          <div className="p-8 md:p-12 rounded-3xl bg-[#181818] border border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#00AF56]/[0.04] blur-[100px] pointer-events-none" />

            {/* Left side case details */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] w-max">
                <span className="text-[10px] text-white font-mono uppercase tracking-wider">Case ID: #ECOM-SCALE</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                How we scaled a high-growth brand with minimal ad risk
              </h3>

              <p className="text-sm text-[#8C8C8C] leading-relaxed">
                By designing a high-converting, lightning-fast landing page template and routing high-intent search query traffic, we achieved a significant ROAS jump during the scaling phase.
              </p>

              {/* Stat Counters */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.06]">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider">Ad Spend</span>
                  <span className="text-xl md:text-2xl font-bold text-white font-mono mt-0.5">₹21,000</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider">Generated Sales</span>
                  <span className="text-xl md:text-2xl font-bold text-[#00AF56] font-mono mt-0.5">₹1,86,897</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider">Scale ROAS</span>
                  <span className="text-xl md:text-2xl font-bold text-white font-mono mt-0.5">8.76x</span>
                </div>
              </div>
            </div>

            {/* Right side case chart */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#111111] border border-white/[0.05] flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.04]">
                <span className="text-xs font-semibold text-white">Scaling Curve Breakdown</span>
                <span className="text-[10px] text-[#00AF56] font-mono">+789% Net growth</span>
              </div>

              {/* Simple beautiful SVG Bar/Line graph */}
              <div className="h-44 relative w-full pt-4">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="white" strokeWidth="0.06" opacity="0.2" strokeDasharray="1,1" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.06" opacity="0.2" strokeDasharray="1,1" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="white" strokeWidth="0.06" opacity="0.2" strokeDasharray="1,1" />
                  
                  {/* Revenue Growth Path */}
                  <path
                    d="M 5 35 L 20 30 L 45 28 L 65 19 L 85 11 L 95 4"
                    fill="none"
                    stroke="#00AF56"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  {/* Area beneath curve */}
                  <path
                    d="M 5 35 L 20 30 L 45 28 L 65 19 L 85 11 L 95 4 L 95 38 L 5 38 Z"
                    fill="url(#caseGlow)"
                    opacity="0.2"
                  />

                  {/* Spent Line in Red (extremely low flat line) */}
                  <path
                    d="M 5 36 L 20 35 L 45 35 L 65 35 L 85 34 L 95 34"
                    fill="none"
                    stroke="#8c8c8c"
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />
                  
                  <defs>
                    <linearGradient id="caseGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00AF56" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00AF56" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Indicators */}
                  <circle cx="95" cy="4" r="1.5" fill="#00AF56" />
                  <circle cx="95" cy="34" r="1.2" fill="#8c8c8c" />
                </svg>

                {/* Graph Labels */}
                <div className="absolute top-2 right-4 flex flex-col gap-1 text-[9px] bg-black/40 p-2 rounded border border-white/[0.04]">
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00AF56]" />
                    <span>Revenue: ₹1.86L</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#8C8C8C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C8C8C]" />
                    <span>Ad Spend: ₹21k</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#8C8C8C] mt-2 font-mono">
                <span>Phase 1 (Setup)</span>
                <span>Phase 2 (Creative Testing)</span>
                <span>Phase 3 (Scaling)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.08] text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/[0.02] transition-all"
            >
              <span>Explore More Performance Case Studies</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW SHOWCASE */}
      <section className="py-24 relative overflow-hidden bg-[#050505] border-y border-white/[0.08]">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[400px] rounded-full bg-[#00AF56]/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00AF56] via-white to-[#00AF56] tracking-tight uppercase">
            Store Who Have Built
          </h2>
        </div>

        {/* Row 1: Landscape mockups scrolling left (Brands 1-10) */}
        <div className="w-full overflow-hidden marquee-container py-3">
          <div className="animate-marquee-left flex gap-6">
            {[...PORTFOLIO_STORES, ...PORTFOLIO_STORES, ...PORTFOLIO_STORES].map((store, idx) => (
              <div
                key={idx}
                className="w-[240px] sm:w-[320px] md:w-[400px] flex flex-col rounded-3xl bg-[#111111] border border-white/[0.08] overflow-hidden hover:border-[#00AF56]/30 hover:shadow-[0_0_30px_rgba(0,175,86,0.15)] transition-all duration-500 shrink-0"
                style={{ aspectRatio: "400/715" }}
              >
                {/* Browser dots top bar */}
                <div className="px-4 py-3 bg-[#181818] border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/[0.05]" />
                </div>
                {/* Mockup Image Container */}
                <div className="relative flex-1 w-full overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Portrait mockups scrolling right (Brands 11-20) */}
        <div className="w-full overflow-hidden marquee-container py-3 mt-4">
          <div className="animate-marquee-right flex gap-6">
            {[...PORTFOLIO_STORES, ...PORTFOLIO_STORES, ...PORTFOLIO_STORES].reverse().map((store, idx) => (
              <div
                key={idx}
                className="w-[240px] sm:w-[320px] md:w-[400px] flex flex-col rounded-3xl bg-[#111111] border border-white/[0.08] overflow-hidden hover:border-[#00AF56]/30 hover:shadow-[0_0_30px_rgba(0,175,86,0.15)] transition-all duration-500 shrink-0"
                style={{ aspectRatio: "400/715" }}
              >
                {/* Browser dots top bar */}
                <div className="px-4 py-3 bg-[#181818] border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/[0.05]" />
                </div>
                {/* Mockup Image Container */}
                <div className="relative flex-1 w-full overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
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
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto flex flex-col gap-12 text-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Brand Founders Say
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
                className="w-full p-8 md:p-12 rounded-3xl bg-[#181818]/60 backdrop-blur-md border border-white/[0.06] flex flex-col gap-6 relative"
              >
                <span className="text-5xl font-serif text-[#00AF56] opacity-30 absolute top-4 left-6 leading-none">
                  “
                </span>
                
                <p className="text-base sm:text-lg md:text-xl text-[#D7D7D7] italic leading-relaxed relative z-10">
                  {TESTIMONIALS[currentTestimonial].quote}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.05]">
                  <div className="text-left">
                    <p className="font-bold text-white text-base">
                      {TESTIMONIALS[currentTestimonial].author}
                    </p>
                    <p className="text-xs text-[#8C8C8C]">
                      {TESTIMONIALS[currentTestimonial].role}
                    </p>
                  </div>
                  <span className="text-xs bg-[#00AF56]/15 border border-[#00AF56]/30 text-[#00AF56] px-4 py-1.5 rounded-full font-bold font-mono">
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
      <section className="py-24 px-6 bg-[#111111] border-y border-white/[0.08] relative">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Any Questions? Look Here.
            </h2>
            <p className="text-[#8C8C8C] text-sm">
              We believe in transparent operational parameters. If you have specific billing or onboarding inquiries, read below.
            </p>
          </div>

          {/* Accordion FAQ list */}
          <div className="flex flex-col gap-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#181818] border border-white/[0.05] overflow-hidden transition-all duration-300"
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
      <section className="py-28 px-6 relative overflow-hidden text-center">
        {/* Glowing visual indicators */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00AF56]/[0.06] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-8 items-center">
          <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
            Accelerate Growth
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Ready To Scale Your Shopify Business?
          </h2>

          <p className="text-[#8C8C8C] text-sm sm:text-base leading-relaxed max-w-xl">
            Stop wasting budgets routing cold traffic to slow storefronts that fail to generate conversion trust. Let's build a bespoke storefront that maximizes your ROAS.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,175,86,0.4)] text-center group"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <a
              href="tel:+919917780656"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:bg-white/[0.02] text-center"
            >
              <Phone className="w-4 h-4 text-[#00AF56]" />
              <span>Call +91 9917780656</span>
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

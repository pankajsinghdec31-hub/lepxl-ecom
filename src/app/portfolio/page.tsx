"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Laptop,
  Gem,
  Shirt,
  Watch,
  Sparkles,
  Leaf,
  Briefcase,
  Eye,
  ShoppingBag,
  Shield,
  Layers,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface Project {
  name: string;
  url: string;
  industry: string;
  category: "dev" | "cro";
  services: string[];
  description: string;
  accentColor: string;
}

const PROJECTS: Project[] = [
  {
    name: "Chomp Brand",
    url: "#",
    industry: "Apparel & Skateboarding",
    category: "dev",
    services: ["Custom Shopify Storefront", "Mobile-First Product Grid", "Interactive Visual Sliders"],
    description: "Designed a premium skateboarding and streetwear collaborative storefront with interactive drop layouts.",
    accentColor: "#10b981",
  },
  {
    name: "OffLimits",
    url: "#",
    industry: "Vegan & Gluten-Free Cereal",
    category: "dev",
    services: ["Shopify Custom Theme", "Interactive Brand Mascot Sections", "AOV Drawer Optimization"],
    description: "Cereal brand experience featuring custom gamified mechanics and high-impact digital storytelling.",
    accentColor: "#3b82f6",
  },
  {
    name: "Baboon to the Moon",
    url: "#",
    industry: "Premium Travel Bags",
    category: "cro",
    services: ["PDP Redesign", "Mobile buying paths", "Interactive Product Showcase"],
    description: "Modern technical bags store with high-contrast colorways, sticky CTAs, and curated catalog navigation.",
    accentColor: "#fbbf24",
  },
  {
    name: "Spanx",
    url: "#",
    industry: "Apparel & Shapewear",
    category: "dev",
    services: ["Bespoke Liquid Configurations", "High-Load Optimization", "Custom Bundle Builders"],
    description: "Optimized premium apparel collections showcasing fit finders and multi-region storefront synchronization.",
    accentColor: "#ec4899",
  },
  {
    name: "Glossier",
    url: "#",
    industry: "Cosmetics & Beauty",
    category: "cro",
    services: ["Skincare PDP Redesign", "A/B Conversion Testing", "Sticky Buy Drawer Integration"],
    description: "Aesthetic makeup storefront featuring high-converting skincare routes and intuitive checkout drawers.",
    accentColor: "#8b5cf6",
  },
  {
    name: "The Wheels Co",
    url: "https://thewheelsco.com/",
    industry: "Automotive Accessories",
    category: "cro",
    services: ["Shopify Custom Design", "High-Converting PDP Layout", "AOV Optimization"],
    description: "Redesigned Shopify layouts, lifting conversion rates from 1.1% to 4.2%.",
    accentColor: "#10b981",
  },
  {
    name: "Ratan Rashi",
    url: "https://ratanrashi.in/",
    industry: "Precious Gemstones",
    category: "cro",
    services: ["Shopify CRO", "UX Navigation Tuning", "Trust Factors Integration"],
    description: "Optimized gem selectors, increasing order values.",
    accentColor: "#fbbf24",
  },
  {
    name: "RCFYIY Shopify",
    url: "https://rcfyiy-uj.myshopify.com/",
    industry: "Fashion Boutique",
    category: "dev",
    services: ["Shopify Store Rebuild", "Responsive Mobile UX", "Cart Optimizer"],
    description: "Developed editorial layouts with fast single-tap buy path.",
    accentColor: "#ec4899",
  },
  {
    name: "Glyters",
    url: "https://www.glyters.com/",
    industry: "Fashion Jewelry",
    category: "dev",
    services: ["Shopify Theme Development", "Mobile-First UX Rebuild", "Custom Cart Drawer"],
    description: "Rebuilt storefront with speed and jewelry drawers.",
    accentColor: "#3b82f6",
  },
  {
    name: "Swadezi",
    url: "https://swadezi.com/",
    industry: "Ethnic Apparel",
    category: "dev",
    services: ["Shopify Layout Development", "Speed Acceleration", "Shopify Setup"],
    description: "Minimal custom theme securing a 97 speed score.",
    accentColor: "#10b981",
  },
  {
    name: "Chashma",
    url: "https://chashma.com/",
    industry: "Premium Eyewear",
    category: "cro",
    services: ["UX Audit", "Add-To-Cart CRO Optimization", "Checkout Streamlining"],
    description: "Integrated lens selectors, reducing checkout drop-offs.",
    accentColor: "#6366f1",
  },
  {
    name: "Suvastra Varnam",
    url: "https://suvastravarnam.in/",
    industry: "Luxury Sarees",
    category: "dev",
    services: ["Bespoke Shopify Setup", "AOV Optimization", "Trust Builder"],
    description: "Bespoke saree bundles, lifting product margins.",
    accentColor: "#8b5cf6",
  },
  {
    name: "Hay Clothing",
    url: "https://www.hayclothing.in/",
    industry: "Contemporary Apparel",
    category: "dev",
    services: ["Custom Shopify Sections", "Logistics API Integration", "Retention Architecture"],
    description: "Custom delivery hooks and order sync systems.",
    accentColor: "#f43f5e",
  },
  {
    name: "Prisachi",
    url: "https://www.prisachi.com/",
    industry: "Designer Apparel",
    category: "cro",
    services: ["Sales Psychology Layouts", "A/B Testing", "Visual Redesign"],
    description: "Fine-tuned trust signals, lifting landing conversions.",
    accentColor: "#06b6d4",
  },
  {
    name: "Anand Sweets",
    url: "https://www.anandsweets.in/",
    industry: "Gourmet Foods",
    category: "dev",
    services: ["Shopify Store Setup", "Delivery Integration", "Locational Checkout"],
    description: "Locational checks and optimized sweets checkouts.",
    accentColor: "#f97316",
  },
  {
    name: "Brahmras Natural",
    url: "https://www.brahmrasnatural.com/",
    industry: "Organic Wellness",
    category: "cro",
    services: ["Subscription CRO", "Value Proposition Copy", "Speed Optimization"],
    description: "Subscription selectors boosting recurring buyers.",
    accentColor: "#84cc16",
  },
  {
    name: "Get My Couch",
    url: "https://www.getmycouch.com/",
    industry: "Luxury Furniture",
    category: "dev",
    services: ["Shopify Store Customization", "3D Asset Viewer Integration", "High AOV Conversion UX"],
    description: "Interactive config configurations for premium sofas.",
    accentColor: "#0f766e",
  },
  {
    name: "SOBO Beauty",
    url: "https://sobobeauty.com/",
    industry: "Curated Cosmetics",
    category: "cro",
    services: ["Shopify Store Redesign", "Mobile Sticky Buy Box", "Cosmetics Collections Grid"],
    description: "Streamlined mobile checkout path, minimizing drops.",
    accentColor: "#d946ef",
  },
  {
    name: "Well Essentials",
    url: "https://wellessentials.com/",
    industry: "Superfoods & Health",
    category: "cro",
    services: ["Shopify Speed Tuning", "Asset Lazy-Loading", "Page Speed Optimization"],
    description: "Asset pipelines tuning, securing 95+ speed.",
    accentColor: "#22c55e",
  },
  {
    name: "Kohkayn",
    url: "https://kohkayn.com/",
    industry: "Modern Basics Apparel",
    category: "dev",
    services: ["Next.js Headless Store", "Lightning Speed Rebuild", "Tailwind Config"],
    description: "Custom framework rendering pages in 1.1s.",
    accentColor: "#111827",
  },
  {
    name: "Amarose",
    url: "https://amarose.com/",
    industry: "Luxury Perfumes",
    category: "cro",
    services: ["UX Audit", "Scent Finder Quiz", "Add-To-Cart CRO"],
    description: "Scent matching quizzes, increasing carts by 35%.",
    accentColor: "#db2777",
  },
  {
    name: "NutriBlend Ecom",
    url: "https://nutriblend.in/",
    industry: "Sports Nutrition",
    category: "dev",
    services: ["Shopify Custom Development", "Bundle Builder App", "ERP Sync Integration"],
    description: "Bespoke bundle selectors and ERP routing sync.",
    accentColor: "#0284c7",
  },
  {
    name: "Urban Dwellings",
    url: "https://urbandwellings.co/",
    industry: "Home Decor & Accents",
    category: "dev",
    services: ["Shopify Liquid Customization", "Visual Catalog Build", "Mobile Sticky CTA"],
    description: "Editorial sliders and interactive quick-shop grids.",
    accentColor: "#78350f",
  },
  {
    name: "Skin Basics",
    url: "https://skinbasics.com/",
    industry: "Leather Goods",
    category: "cro",
    services: ["Conversion Rate Audit", "Trust Badging", "Optimized Checkout Drawer"],
    description: "Billing streamlining and MSME trust seals.",
    accentColor: "#ca8a04",
  },
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

function getMockupConfig(name: string, category: string, industry: string): MockupConfig {
  const lowerName = name.toLowerCase();
  
  let theme: "dark" | "light" = "light";
  let primaryColor = "#10b981";
  let bgColor = "bg-[#faf8f5]";
  let textColor = "text-[#2b1f1d]";
  let heroText = "SUMMER COLLECTION";
  let heroSub = "Explore our premium handpicked catalog";
  let products = [ { name: "Best Seller Item", price: "₹2,500" }, { name: "New Arrival Set", price: "₹4,800" } ];
  let image: string | undefined = undefined;

  if (lowerName.includes("chomp")) {
    image = "/chomp.jpg";
  } else if (lowerName.includes("offlimits")) {
    image = "/offlimits.jpg";
  } else if (lowerName.includes("baboon")) {
    image = "/baboon.jpg";
  } else if (lowerName.includes("spanx")) {
    image = "/spanx.jpg";
  } else if (lowerName.includes("glossier")) {
    image = "/glossier.png";
  } else if (lowerName.includes("sobo")) {
    image = "/imgi_80_sobo-beauty.webp";
  } else if (lowerName.includes("well essentials") || lowerName.includes("humble")) {
    image = "/imgi_81_well-essentials.webp";
  } else if (lowerName.includes("amarose")) {
    image = "/imgi_83_amarose.webp";
  } else if (lowerName.includes("kohkayn")) {
    image = "/imgi_89_kohkayn-com.webp";
  } else if (lowerName.includes("skin basics")) {
    image = "/imgi_91_skin-basics.webp";
  } else if (lowerName.includes("swadezi")) {
    image = "/imgi_93_swadezi.webp";
  } else if (lowerName.includes("wheels")) {
    image = "/imgi_89_kohkayn-com.webp";
  } else if (lowerName.includes("ratan") || lowerName.includes("glyters")) {
    image = "/jewelry_mockup.png";
  } else if (lowerName.includes("chashma") || lowerName.includes("couch")) {
    image = "/imgi_91_skin-basics.webp";
  } else if (lowerName.includes("suvastra") || lowerName.includes("hay clothing") || lowerName.includes("prisachi") || lowerName.includes("rcfyiy")) {
    image = "/apparel_mockup.png";
  } else if (lowerName.includes("anand") || lowerName.includes("urban dwellings")) {
    image = "/wellness_mockup.png";
  } else if (lowerName.includes("nutriblend")) {
    image = "/supplement_mockup.png";
  } else if (lowerName.includes("brahmras")) {
    image = "/wellness_mockup.png";
  }

  if (lowerName.includes("wheels")) {
    theme = "dark";
    bgColor = "bg-[#0c0c0c]";
    textColor = "text-white";
    primaryColor = "#10b981";
    heroText = "FORCE AHEAD";
    heroSub = "Premium carbon parts & accessories";
    products = [ { name: "Carbon Steering", price: "₹24,999" }, { name: "Alloy Hubcaps", price: "₹4,500" } ];
  } else if (lowerName.includes("ratan rashi")) {
    theme = "light";
    bgColor = "bg-[#fdfbf7]";
    textColor = "text-[#3f2e1a]";
    primaryColor = "#c29d59";
    heroText = "NATURAL GEMS";
    heroSub = "100% Certified natural gemstones";
    products = [ { name: "Yellow Sapphire 4.2ct", price: "₹18,500" }, { name: "Natural Ruby Ring", price: "₹12,400" } ];
  } else if (lowerName.includes("glyters")) {
    theme = "dark";
    bgColor = "bg-[#0b0f19]";
    textColor = "text-white";
    primaryColor = "#3b82f6";
    heroText = "SHINE ALWAYS";
    heroSub = "D2C diamond hoops and rings";
    products = [ { name: "Tennis Bracelet 18k", price: "₹38,000" }, { name: "Star Hoop Studs", price: "₹4,200" } ];
  } else if (lowerName.includes("chashma")) {
    theme = "light";
    bgColor = "bg-[#f8fafc]";
    textColor = "text-[#0f172a]";
    primaryColor = "#0f172a";
    heroText = "DESIGNER GLASSES";
    heroSub = "Premium anti-glare computer lenses";
    products = [ { name: "Urban Acetate Frame", price: "₹2,999" }, { name: "Classic Aviator", price: "₹3,400" } ];
  } else if (lowerName.includes("suvastra")) {
    theme = "light";
    bgColor = "bg-[#fdf6f0]";
    textColor = "text-[#3b1c0a]";
    primaryColor = "#9d174d";
    heroText = "HERITAGE SILKS";
    heroSub = "Bespoke Kanchipuram silk sarees";
    products = [ { name: "Banarasi Silk Brocade", price: "₹45,000" }, { name: "Tussar Handloom Saree", price: "₹22,000" } ];
  } else if (lowerName.includes("hay clothing")) {
    theme = "dark";
    bgColor = "bg-[#070708]";
    textColor = "text-white";
    primaryColor = "#f43f5e";
    heroText = "ESSENTIAL HOODS";
    heroSub = "Oversized streetwear basic hoods";
    products = [ { name: "Heavyweight Hoodie", price: "₹3,200" }, { name: "Relaxed Joggers", price: "₹2,400" } ];
  } else if (lowerName.includes("prisachi")) {
    theme = "light";
    bgColor = "bg-[#faf9f6]";
    textColor = "text-[#1c1c1c]";
    primaryColor = "#0891b2";
    heroText = "CONTEMPORARY";
    heroSub = "Modern contemporary luxury dresses";
    products = [ { name: "Linen Trench Coat", price: "₹14,999" }, { name: "Asymmetrical Dress", price: "₹8,500" } ];
  } else if (lowerName.includes("anand")) {
    theme = "light";
    bgColor = "bg-[#fffdf5]";
    textColor = "text-[#5c3a00]";
    primaryColor = "#d97706";
    heroText = "ROYAL SWEETS";
    heroSub = "Assorted gourmet dry fruit box set";
    products = [ { name: "Assorted Kaju Box", price: "₹1,850" }, { name: "Saffron Peda 500g", price: "₹650" } ];
  } else if (lowerName.includes("get my couch")) {
    theme = "light";
    bgColor = "bg-[#fafaf9]";
    textColor = "text-[#292524]";
    primaryColor = "#0d9488";
    heroText = "MODULAR SOFAS";
    heroSub = "Custom modular sectionals and sofas";
    products = [ { name: "Modular Velvet Couch", price: "₹89,000" }, { name: "Accent Velvet Chair", price: "₹18,500" } ];
  } else if (lowerName.includes("nutriblend")) {
    theme = "dark";
    bgColor = "bg-[#0c0d0a]";
    textColor = "text-white";
    primaryColor = "#ea580c";
    heroText = "POWER ELITE";
    heroSub = "Premium protein whey isolates";
    products = [ { name: "Whey Protein 2kg", price: "₹6,400" }, { name: "Micronized Creatine", price: "₹990" } ];
  } else if (lowerName.includes("urban dwellings")) {
    theme = "light";
    bgColor = "bg-[#fbfaf8]";
    textColor = "text-[#2e2620]";
    primaryColor = "#7c2d12";
    heroText = "CLAY VASES";
    heroSub = "Handcrafted organic ceramic decor";
    products = [ { name: "Textured Clay Vase", price: "₹1,800" }, { name: "Rattan Hanging Pot", price: "₹1,400" } ];
  }

  return { name, industry, theme, bgColor, textColor, primaryColor, heroText, heroSub, products, image };
}

function ProductIcon({ industry }: { industry: string }) {
  const ind = industry.toLowerCase();
  
  if (ind.includes("automotive")) return <Shield className="w-4 h-4 text-white/90" />;
  if (ind.includes("gemstone") || ind.includes("jewelry") || ind.includes("perfume") || ind.includes("fragrance")) {
    return <Gem className="w-4 h-4 text-white/90" />;
  }
  if (ind.includes("apparel") || ind.includes("clothing") || ind.includes("fashion") || ind.includes("boutique")) {
    return <Shirt className="w-4 h-4 text-white/90" />;
  }
  if (ind.includes("eyewear") || ind.includes("glasses")) {
    return <Eye className="w-4 h-4 text-white/90" />;
  }
  if (ind.includes("wellness") || ind.includes("health") || ind.includes("nutrition") || ind.includes("superfood")) {
    return <Leaf className="w-4 h-4 text-white/90" />;
  }
  if (ind.includes("food") || ind.includes("sweet")) {
    return <ShoppingBag className="w-4 h-4 text-white/90" />;
  }
  if (ind.includes("furniture") || ind.includes("decor") || ind.includes("dwelling")) {
    return <Layers className="w-4 h-4 text-white/90" />;
  }
  if (ind.includes("cosmetics") || ind.includes("beauty")) {
    return <Sparkles className="w-4 h-4 text-white/90" />;
  }
  if (ind.includes("leather")) {
    return <Briefcase className="w-4 h-4 text-white/90" />;
  }
  if (ind.includes("watch") || ind.includes("horology")) {
    return <Watch className="w-4 h-4 text-white/90" />;
  }
  return <ShoppingBag className="w-4 h-4 text-white/90" />;
}

function StorefrontMockup({ store }: { store: MockupConfig }) {
  const isDark = store.theme === "dark";
  
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
        <div 
          className="absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full blur-xl opacity-30 pointer-events-none"
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
            <div className="aspect-[16/10] w-full rounded-md flex items-center justify-center relative overflow-hidden bg-black/20 border border-white/5">
              <div 
                className="absolute inset-0 opacity-15 blur-md pointer-events-none"
                style={{ background: `radial-gradient(circle, ${store.primaryColor}, transparent)` }}
              />
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center shadow-inner relative z-10"
                style={{ backgroundColor: `${store.primaryColor}20`, border: `1px solid ${store.primaryColor}40` }}
              >
                <ProductIcon industry={store.industry} />
              </div>
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

const TABS = [
  { id: "all", name: "All Builds", tagline: "Our full catalog of Shopify storefronts and speed architectures." },
  { id: "themes", name: "Liquid & Themes", tagline: "Traditional Shopify setups with highly customized layouts." },
  { id: "headless", name: "Next.js & Headless", tagline: "Decoupled dynamic storefronts built for extreme layout freedom." },
  { id: "cro", name: "CRO & Optimization", tagline: "Storefronts fine-tuned specifically for conversion metrics." }
];

const APP_INTEGRATIONS = [
  { name: "Shiprocket", type: "Logistics Sync", desc: "Automate shipping labels, courier dispatch routing and tracking emails." },
  { name: "Delhivery", type: "Fulfillment Sync", desc: "Enterprise API integration for automatic order weight and delivery tracking." },
  { name: "Razorpay", type: "Payment Gateway", desc: "Native checkout integration with fast UPI buy selectors and credit options." },
  { name: "Stripe", type: "Global Checkout", desc: "Multi-currency checkout accepting cards, Apple Pay, and digital wallets worldwide." },
  { name: "Gokwik", type: "One-Click Checkout", desc: "Skip cart to checkout drawer, reducing address-input leakage by 25%." },
  { name: "Whatamore", type: "Interactive Feeds", desc: "Embed shoppable reels and visual user-generated reviews right on PDP pages." }
];

const TESTIMONIALS = [
  {
    quote: "We love our theme. It's simple to navigate. It's easy to update. My dev team moves at laser speed. If we have an idea, it's implemented same-day.",
    author: "Joshua Ariza",
    role: "Founder and CEO, Chomp Brand",
    img: "/imgi_91_skin-basics.webp"
  },
  {
    quote: "Loading speed is flawless and instant on mobile and desktop—providing a seamless experience for customers globally, regardless of device.",
    author: "Alex Murton",
    role: "Managing Director, Studio Almond (Blunt Umbrellas)",
    img: "/imgi_93_swadezi.webp"
  },
  {
    quote: "SalePXL allowed us to build the most playful customer experiences while maintaining complete control of our development process.",
    author: "Emily Miller",
    role: "CEO & Founder, OffLimits Cereal",
    img: "/imgi_83_amarose.webp"
  }
];

const ACCORDIONS = [
  {
    title: "Mobile-Ready Layouts",
    desc: "Every viewport layout is designed responsively, ensuring single-tap purchase options look gorgeous and load seamlessly on mobile screens."
  },
  {
    title: "Instant Search & Navigation Filters",
    desc: "Help users locate custom variants inside complex catalogs instantly with edge-cached filter tags and predictive search routing."
  },
  {
    title: "Rich Media & 3D Configurators",
    desc: "Demonstrate craftsmanship using sticky product video embeds, hover-to-zoom galleries, and high-fidelity 3D modeling blocks."
  },
  {
    title: "Internationalization & Currencies",
    desc: "Instantly adjust pricing tables, languages, and delivery conditions dynamically depending on customer geographic headers."
  }
];

interface SlideData {
  num: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  mockup: React.ReactNode;
}

function PortfolioCard({ proj, heightClass }: { proj: Project; heightClass: string }) {
  const store = getMockupConfig(proj.name, proj.category, proj.industry);
  const isCustom = proj.services.some(
    (s) =>
      s.toLowerCase().includes("headless") ||
      s.toLowerCase().includes("next.js") ||
      s.toLowerCase().includes("custom liquid")
  );

  const hasLink = proj.url && proj.url !== "#" && proj.url !== "";

  const cardContent = (
    <>
      {/* Mockup screen or image container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/5">
        {store.image ? (
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <StorefrontMockup store={store} />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#fafcfc]/45 via-transparent to-transparent pointer-events-none z-0" />

      {/* Badge at the bottom left */}
      <div className="absolute bottom-4 left-4 z-10 select-none">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase backdrop-blur-md border shadow-sm ${
            isCustom
              ? "bg-[#004dff] text-white border-blue-400/20"
              : "bg-white/80 text-neutral-800 border-neutral-200"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isCustom ? "bg-white" : "bg-emerald-600"}`} />
          {isCustom ? "Custom Liquid" : "Theme"}
        </span>
      </div>

      {/* Hover overlay with domain */}
      {hasLink && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20 gap-2">
          <span className="text-white text-sm font-bold tracking-wide flex items-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
            {proj.url.replace("https://", "").replace("www.", "")}
            <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2.5} />
          </span>
        </div>
      )}
    </>
  );

  const containerClasses = `relative group overflow-hidden rounded-[24px] border border-neutral-200/60 bg-white/70 w-full shrink-0 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.02)] backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/30 ${heightClass} ${hasLink ? "" : "cursor-default"}`;

  if (!hasLink) {
    return (
      <div className={containerClasses}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={proj.url}
      target="_blank"
      rel="noopener noreferrer"
      className={containerClasses}
    >
      {cardContent}
    </Link>
  );
}

function StickySlideshow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted && containerRef.current ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return;
    if (latest < 0.33) {
      setActiveSlide(0);
    } else if (latest < 0.66) {
      setActiveSlide(1);
    } else {
      setActiveSlide(2);
    }
  });

  const SLIDES: SlideData[] = [
    {
      num: "01",
      title: "Liquid & Theme Rebuilds",
      tagline: "High-speed. Native flexibility.",
      description: "We optimize Shopify's core Liquid layout files, removing render-blocking scripts and setting up sections so your team can customize layouts.",
      bullets: [
        "Dynamic drag-and-drop sections layout configuration.",
        "Removed render-blocking scripts for 95+ mobile page speeds.",
        "Native multi-language and multi-currency configurations."
      ],
      mockup: (
        <div className="w-full h-full bg-white border border-neutral-200 p-6 flex flex-col justify-between text-left relative overflow-hidden font-mono shadow-sm rounded-2xl">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 text-[10px] text-neutral-400">
            <span>theme.liquid</span>
            <span className="text-emerald-600">Shopify 2.0</span>
          </div>
          <div className="flex-1 py-4 text-xs space-y-2 text-emerald-700 overflow-hidden">
            <p className="text-neutral-400">{"{% comment %} Main Storefront Layout {% endcomment %}"}</p>
            <p>{"<div class=\"shopify-section\" id=\"header\">"}</p>
            <p className="pl-4">{"{% section 'announcement-bar' %}"}</p>
            <p className="pl-4">{"{% section 'header-navigation' %}"}</p>
            <p>{"</div>"}</p>
            <p>{"<main role=\"main\" id=\"MainContent\">"}</p>
            <p className="pl-4 text-neutral-900">{"{{ content_for_layout }}"}</p>
            <p>{"</main>"}</p>
          </div>
          <div className="border-t border-neutral-200 pt-3 text-[10px] text-emerald-600 font-bold flex items-center justify-between">
            <span>STATUS: COMPILED SUCCESSFULLY</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          </div>
        </div>
      )
    },
    {
      num: "02",
      title: "Next.js Headless Stores",
      tagline: "Extreme freedom. Lightning speed.",
      description: "By decoupling the frontend from Shopify's back-end, we build Next.js interfaces running on the edge, rendering collection loads in 1.1s.",
      bullets: [
        "Decoupled frontend built with Next.js App Router & Tailwind CSS.",
        "Global edge-network delivery with Vercel and Oxygen hosting.",
        "Sub-second client navigation with pre-fetched catalog queries."
      ],
      mockup: (
        <div className="w-full h-full bg-white border border-neutral-200 p-6 flex flex-col justify-between text-left relative overflow-hidden font-mono shadow-sm rounded-2xl">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 text-[10px] text-neutral-400">
            <span>src/app/product/page.tsx</span>
            <span className="text-blue-600 font-bold">Next.js</span>
          </div>
          <div className="flex-1 py-4 text-xs space-y-1.5 text-blue-700 overflow-hidden">
            <p className="text-neutral-400">{"// Fetch Shopify Storefront APIs"}</p>
            <p>{"import { getProduct } from '@/lib/shopify';"}</p>
            <p>{"export default async function Product({ params }) {"}</p>
            <p className="pl-4">{"const product = await getProduct(params.handle);"}</p>
            <p className="pl-4">{"return ("}</p>
            <p className="pl-8">{"<main className=\"min-h-screen bg-black\">"}</p>
            <p className="pl-12 text-neutral-900">{"<ProductHero product={product} />"}</p>
            <p className="pl-8">{"</main>"}</p>
            <p className="pl-4">{"}"}</p>
          </div>
          <div className="border-t border-neutral-200 pt-3 text-[10px] text-blue-600 font-bold flex items-center justify-between">
            <span>DEPLOY: ACTIVE ON VERCEL EDGE</span>
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          </div>
        </div>
      )
    },
    {
      num: "03",
      title: "Checkout & Conversion (CRO)",
      tagline: "Frictionless checkout. Higher ROAS.",
      description: "We tune billing and address forms, integrate express payment sliders, and configure marketing event pixels to scale AOV from day one.",
      bullets: [
        "Frictionless express UPI purchase drawer integration.",
        "Auto-filled address overlays minimizing typing drop-off.",
        "Google Analytics 4 & Meta Purchase event triggers fully tuned."
      ],
      mockup: (
        <div className="w-full h-full bg-white border border-neutral-200 p-6 flex flex-col justify-between text-left relative overflow-hidden font-mono shadow-sm rounded-2xl">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 text-[10px] text-neutral-400">
            <span>Checkout Funnel Analytics</span>
            <span className="text-amber-600 font-bold">Live CRO</span>
          </div>
          <div className="flex-1 py-4 text-xs flex flex-col justify-center gap-3">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>Checkout Conversion Rate</span>
                <span className="text-emerald-600 font-bold">+18.4%</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[84%]" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>Cart Abandonment Rate</span>
                <span className="text-emerald-600 font-bold">-32.1%</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[28%]" />
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-3 text-[10px] text-amber-600 font-bold flex items-center justify-between">
            <span>AOV OPTIMIZATION: STATUS ONLINE</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full border-t border-neutral-200/60 pt-12">
      {isDesktop ? (
        // Desktop Layout: 300vh Scroll-driven Sticky vertical slideshow
        <div className="relative h-[300vh] w-full">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden w-full">
            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Staggered feature description items */}
              <div className="col-span-5 flex flex-col gap-10 text-left">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-emerald-700 uppercase tracking-widest font-mono font-bold">Standard features</span>
                  <h2 className="text-3xl md:text-4xl font-light font-grotesk text-neutral-900">Built with premium foundations</h2>
                </div>

                <div className="flex flex-col gap-6 relative pl-4 border-l border-neutral-200/60">
                  {SLIDES.map((slide, idx) => {
                    const isActive = activeSlide === idx;
                    return (
                      <div
                        key={idx}
                        className={`transition-all duration-500 flex flex-col gap-2 cursor-pointer ${
                          isActive ? "opacity-100 scale-102 pl-2" : "opacity-35"
                        }`}
                        onClick={() => {
                          const scrollStep = window.innerHeight * idx;
                          window.scrollTo({
                            top: (containerRef.current?.offsetTop || 0) + scrollStep,
                            behavior: "smooth"
                          });
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs ${isActive ? "text-emerald-600" : "text-neutral-400"}`}>{slide.num}.</span>
                          <h3 className="text-lg font-bold text-neutral-900">{slide.title}</h3>
                        </div>
                        {isActive && (
                          <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mt-1">
                            {slide.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Sticky Mockup container swapping with AnimatePresence */}
              <div className="col-span-7 h-[360px] relative flex items-center justify-center">
                <div className="w-full h-full max-w-[500px] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {SLIDES[activeSlide].mockup}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        // Mobile Layout: Click-to-select Tabs layout
        <div className="w-full flex flex-col gap-8 px-6 pb-12 text-left">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs text-emerald-700 uppercase tracking-widest font-mono font-bold">Standard features</span>
            <h2 className="text-3xl font-light font-grotesk text-neutral-900">Built with premium foundations</h2>
          </div>

          {/* Tab selector */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-neutral-200/60 font-sans">
            {SLIDES.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-full border ${
                  activeSlide === idx
                    ? "bg-black text-white border-black"
                    : "text-neutral-500 border-neutral-200 hover:text-neutral-900"
                }`}
              >
                {slide.title.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className="h-[220px] w-full max-w-sm mx-auto">
              {SLIDES[activeSlide].mockup}
            </div>

            <div className="flex flex-col gap-3 text-left">
              <span className="text-xs font-mono text-emerald-700 uppercase font-bold">{SLIDES[activeSlide].tagline}</span>
              <h3 className="text-xl font-bold text-neutral-900 font-grotesk">{SLIDES[activeSlide].title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">{SLIDES[activeSlide].description}</p>
              
              <ul className="mt-2 space-y-2 font-sans">
                {SLIDES[activeSlide].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-500 leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState<"all" | "themes" | "headless" | "cro">("all");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const masonrySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted && masonrySectionRef.current ? masonrySectionRef : undefined,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "themes") {
      return p.category === "dev" && !p.services.some(s => s.toLowerCase().includes("headless") || s.toLowerCase().includes("next.js"));
    }
    if (filter === "headless") {
      return p.services.some(s => s.toLowerCase().includes("headless") || s.toLowerCase().includes("next.js"));
    }
    if (filter === "cro") {
      return p.category === "cro";
    }
    return true;
  });

  const col1: Project[] = [];
  const col2: Project[] = [];
  const col3: Project[] = [];

  filteredProjects.forEach((proj, idx) => {
    if (idx % 3 === 0) col1.push(proj);
    else if (idx % 3 === 1) col2.push(proj);
    else col3.push(proj);
  });

  const getCardHeight = (colIdx: number, cardIdx: number) => {
    if (colIdx === 0) {
      return cardIdx % 2 === 0 ? "h-[220px] sm:h-[260px]" : "h-[360px] sm:h-[440px]";
    } else if (colIdx === 1) {
      return cardIdx % 2 === 0 ? "h-[360px] sm:h-[440px]" : "h-[220px] sm:h-[260px]";
    } else {
      return cardIdx % 2 === 0 ? "h-[240px] sm:h-[280px]" : "h-[350px] sm:h-[420px]";
    }
  };

  return (
    <div className="relative pt-28 sm:pt-44 pb-12 sm:pb-24 px-4 sm:px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Background glow highlights */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#fafcfc] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-teal-400/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10 sm:gap-20">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto flex flex-col gap-3 sm:gap-5">

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Build Your Online Store: <br />
            <span className="font-normal bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Use Themes or Go Headless
            </span>
          </h1>
          <p className="text-neutral-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Whether looking to optimize Liquid structures or launch a custom Next.js storefront, browse our curated D2C storefront layouts scaling performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-2 sm:mt-4 font-sans">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 transition-all duration-300 shadow-lg hover:scale-[1.02]"
            >
              Book Free Audit Call
            </Link>
            <Link
              href="https://wa.me/919917780656"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-700 border border-neutral-200 bg-white hover:bg-neutral-50 transition-all duration-300"
            >
              WhatsApp Pankaj
            </Link>
          </div>
        </section>

        {/* MASONRY GRID PROJECTS SHOWCASE WITH OPPOSITE SCROLLING */}
        <section ref={masonrySectionRef} className="flex flex-col gap-6 sm:gap-10">
          <div className="flex flex-col gap-2 sm:gap-3 text-left">
            <span className="text-[10px] sm:text-xs text-emerald-700 uppercase tracking-widest font-mono font-bold">Choose your stack</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-grotesk">Join millions of merchants on Shopify</h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl font-sans">All kinds of businesses. All kinds of stores. All built to sell with custom storefronts and optimized engines.</p>
          </div>



          {/* 3-Column Vertical Masonry Grid with Column 1 & 3 moving up, Column 2 moving down on scroll */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4 overflow-hidden md:overflow-visible">
            {/* Column 1 */}
            <motion.div style={isDesktop ? { y: y1 } : undefined} className="flex flex-col gap-6">
              {col1.map((proj, idx) => (
                <PortfolioCard
                  key={proj.name}
                  proj={proj}
                  heightClass={getCardHeight(0, idx)}
                />
              ))}
            </motion.div>

            {/* Column 2 - Opposite scrolling */}
            <motion.div style={isDesktop ? { y: y2 } : undefined} className="flex flex-col gap-6">
              {col2.map((proj, idx) => (
                <PortfolioCard
                  key={proj.name}
                  proj={proj}
                  heightClass={getCardHeight(1, idx)}
                />
              ))}
            </motion.div>

            {/* Column 3 */}
            <motion.div style={isDesktop ? { y: y3 } : undefined} className="flex flex-col gap-6">
              {col3.map((proj, idx) => (
                <PortfolioCard
                  key={proj.name}
                  proj={proj}
                  heightClass={getCardHeight(2, idx)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* STICKY VERTICAL SLIDESHOW */}
        <StickySlideshow />

        {/* APP INTEGRATION GRID */}
        <section className="flex flex-col gap-12 border-t border-neutral-200/60 pt-24 text-left">
          <div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
            <span className="text-xs text-emerald-700 uppercase tracking-widest font-mono font-bold">Commerce Integrations</span>
            <h2 className="text-3xl md:text-4xl font-light font-grotesk text-neutral-900">Do more with custom apps</h2>
            <p className="text-sm text-neutral-500 max-w-xl mx-auto font-sans">We connect top-tier logistics, checkout overlays, and checkout drawers directly into your layout.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {APP_INTEGRATIONS.map((app, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-neutral-200/60 hover:border-emerald-500/30 transition-all duration-300 flex flex-col gap-3 text-left shadow-sm backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-900">{app.name}</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-50 border border-emerald-200/50 text-emerald-700 rounded-md font-bold uppercase">{app.type}</span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed mt-1">{app.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS SLIDER */}
        <section className="flex flex-col gap-10 border-t border-neutral-200/60 pt-24 items-center">
          <div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
            <span className="text-xs text-emerald-700 uppercase tracking-widest font-mono font-bold">Founders Feedback</span>
            <h2 className="text-3xl md:text-4xl font-light font-grotesk text-neutral-900">Loved by scaling brands</h2>
          </div>

          <div className="relative w-full max-w-4xl min-h-[220px] flex flex-col justify-center bg-white border border-neutral-200/60 rounded-3xl p-8 sm:p-12 shadow-sm backdrop-blur-xl font-sans text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6 text-center sm:text-left"
              >
                <p className="text-sm sm:text-base italic text-neutral-700 leading-relaxed">
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-neutral-200/60 pt-6 mt-2">
                  <img
                    src={TESTIMONIALS[activeTestimonial].img}
                    alt={TESTIMONIALS[activeTestimonial].author}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                  />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-neutral-900">{TESTIMONIALS[activeTestimonial].author}</h4>
                    <p className="text-[10px] text-neutral-500">{TESTIMONIALS[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2.5 mt-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeTestimonial === i ? "bg-emerald-600 w-6" : "bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ACCORDION FEATURES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-neutral-200/60 pt-24 items-start text-left">
          <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-32">
            <span className="text-xs text-emerald-700 uppercase tracking-widest font-mono font-bold">Standard features</span>
            <h2 className="text-3xl md:text-4xl font-light font-grotesk text-neutral-900">Plus all the features you need, out of the box</h2>
            <p className="text-sm text-neutral-500 leading-relaxed font-sans">
              We ensure our layouts are packed with high-converting features, optimized responsively to maintain high catalog engagement.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3 font-sans w-full">
            {ACCORDIONS.map((acc, idx) => {
              const isOpen = activeAccordion === idx;
              return (
                <div
                  key={idx}
                  className={`border border-neutral-200/60 rounded-2xl overflow-hidden transition-all duration-300 bg-white/70 ${
                    isOpen ? "border-emerald-500/20" : ""
                  }`}
                >
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-neutral-900 hover:text-emerald-700 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{acc.title}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-600 border-t border-neutral-200/60 pt-4 bg-neutral-50/50">
                          {acc.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="mt-8 p-8 md:p-12 rounded-3xl bg-white border border-neutral-200/60 text-center flex flex-col gap-6 items-center relative overflow-hidden font-sans shadow-sm backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/[0.02] blur-[100px] pointer-events-none" />
          
          <h2 className="text-2xl md:text-3xl font-light font-grotesk text-neutral-900 max-w-2xl">
            Want to see your Shopify store listed here with scaling <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal">ROAS?</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl leading-relaxed">
            Let Pankaj and the SalePXL team analyze your storefront layout, isolate checkout leakage points, and build a high-performance blueprint.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Book Free Audit Call</span>
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </Link>
        </section>

      </div>
    </div>
  );
}

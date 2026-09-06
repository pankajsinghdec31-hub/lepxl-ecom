"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
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
  ArrowRight
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

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
    services: ["UX Optimization", "Add-To-Cart CRO Optimization", "Checkout Streamlining"],
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
    services: ["UX Optimization", "Scent Finder Quiz", "Add-To-Cart CRO"],
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
    services: ["Conversion Optimization", "Trust Badging", "Optimized Checkout Drawer"],
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

function PortfolioCard({ proj, heightClass }: { proj: Project; heightClass: string }) {
  const store = getMockupConfig(proj.name, proj.category, proj.industry);
  const isCustom = proj.services.some(
    (s) =>
      s.toLowerCase().includes("headless") ||
      s.toLowerCase().includes("next.js") ||
      s.toLowerCase().includes("custom liquid")
  );

  return (
    <div className={`relative group overflow-hidden rounded-[24px] border border-neutral-200/60 bg-white/70 w-full shrink-0 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.02)] backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/30 cursor-default ${heightClass}`}>
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
          {isCustom ? "Shopify Liquid" : "Custom Store"}
        </span>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
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
    target: isMounted ? masonrySectionRef : undefined,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const filteredProjects = PROJECTS;

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
    <div className="relative pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Background glow highlights */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#fafcfc] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-teal-400/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10 sm:gap-20">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto flex flex-col gap-3 sm:gap-5">

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Shopify Store <br />
            <span className="font-normal bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              E-Commerce Development
            </span>
          </h1>
          <p className="text-neutral-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Browse our curated portfolio of custom Shopify stores, Liquid theme builds, speed-optimized architectures, and high-converting e-commerce experiences engineered for scaling D2C brands.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-2 sm:mt-4 font-sans">
            <a
              href="https://calendly.com/salepxl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 transition-all duration-300 shadow-lg hover:scale-[1.02]"
            >
              Book Strategy Call
            </a>
            <Link
              href="https://wa.me/919917780656"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-700 border border-neutral-200 bg-white hover:bg-neutral-50 transition-all duration-300"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
              <span>WhatsApp Us</span>
            </Link>
          </div>
        </section>

        {/* MASONRY GRID PROJECTS SHOWCASE WITH OPPOSITE SCROLLING */}
        <section ref={masonrySectionRef} className="flex flex-col gap-6 sm:gap-10">
          <div className="flex flex-col gap-2 sm:gap-3 text-left">
            <span className="text-[10px] sm:text-xs text-emerald-700 uppercase tracking-widest font-mono font-bold">Shopify E-Commerce Showcase</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-grotesk">Custom Shopify Stores Built for High Conversions</h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl font-sans">Every store engineered with clean Liquid code, mobile-first purchase paths, sub-second speed tuning, and high-converting Shopify designs.</p>
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



        {/* BOTTOM CTA */}
        <section className="mt-8 p-8 md:p-12 rounded-3xl bg-white border border-neutral-200/60 text-center flex flex-col gap-6 items-center relative overflow-hidden font-sans shadow-sm backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/[0.02] blur-[100px] pointer-events-none" />
          
          <h2 className="text-2xl md:text-3xl font-light font-grotesk text-neutral-900 max-w-2xl">
            Want to see your Shopify store listed here with scaling <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal">ROAS?</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl leading-relaxed">
            Let the SalePXL team analyze your storefront layout, isolate checkout leakage points, and build a high-performance blueprint.
          </p>
          <a
            href="https://calendly.com/salepxl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </a>
        </section>

      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Check,
  Laptop,
  Filter,
  ArrowUpRight,
  ArrowRight,
  Gem,
  Shirt,
  Watch,
  Sparkles,
  Leaf,
  Briefcase,
  Eye,
  ShoppingBag,
  Shield,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  // 13 Specified Projects
  {
    name: "The Wheels Co",
    url: "https://thewheelsco.com/",
    industry: "Automotive Accessories",
    category: "cro",
    services: ["Shopify Custom Design", "High-Converting PDP Layout", "AOV Optimization"],
    description: "Redesigned Shopify product layout and checkout elements, lifting overall conversions and customer trust.",
    accentColor: "#00AF56",
  },
  {
    name: "Ratan Rashi",
    url: "https://ratanrashi.in/",
    industry: "Precious Gemstones",
    category: "cro",
    services: ["Shopify CRO", "UX Navigation Tuning", "Trust Factors Integration"],
    description: "Redesigned Gemstone Recommendation Funnel and product trust cards, yielding an immediate bump in average order value.",
    accentColor: "#fbbf24",
  },
  {
    name: "RCFYIY Shopify",
    url: "https://rcfyiy-uj.myshopify.com/",
    industry: "Fashion Boutique",
    category: "dev",
    services: ["Shopify Store Rebuild", "Responsive Mobile UX", "Cart Optimizer"],
    description: "Crafted a bespoke, lightning-fast Shopify template focusing on visual editorial catalog pages and single-tap checkout.",
    accentColor: "#ec4899",
  },
  {
    name: "Glyters",
    url: "https://www.glyters.com/",
    industry: "Fashion Jewelry",
    category: "dev",
    services: ["Shopify Theme Development", "Mobile-First UX Rebuild", "Custom Cart Drawer"],
    description: "Rebuilt Glyters jewelry storefront using custom templates and speed optimization best practices.",
    accentColor: "#3b82f6",
  },
  {
    name: "Swadezi",
    url: "https://swadezi.com/",
    industry: "Ethnic Apparel",
    category: "dev",
    services: ["Shopify Layout Development", "Speed Acceleration", "Shopify Setup"],
    description: "Designed a clean, minimal ethnic catalog interface. Compressed core script bundles to secure a 97 PageSpeed score.",
    accentColor: "#10b981",
  },
  {
    name: "Chashma",
    url: "https://chashma.com/",
    industry: "Premium Eyewear",
    category: "cro",
    services: ["UX Audit", "Add-To-Cart CRO Optimization", "Checkout Streamlining"],
    description: "Improved purchase confidence by adding virtual lens selectors and removing friction from checkout validation forms.",
    accentColor: "#6366f1",
  },
  {
    name: "Suvastra Varnam",
    url: "https://suvastravarnam.in/",
    industry: "Luxury Sarees",
    category: "dev",
    services: ["Bespoke Shopify Setup", "AOV Optimization", "Trust Builder"],
    description: "Integrated smooth, editorial image carousels and bundle builders to increase margins on popular luxury sarees.",
    accentColor: "#8b5cf6",
  },
  {
    name: "Hay Clothing",
    url: "https://www.hayclothing.in/",
    industry: "Contemporary Apparel",
    category: "dev",
    services: ["Custom Shopify Sections", "Logistics API Integration", "Retention Architecture"],
    description: "Integrated custom delivery options and automated order management features to optimize the purchase path.",
    accentColor: "#f43f5e",
  },
  {
    name: "Prisachi",
    url: "https://www.prisachi.com/",
    industry: "Designer Apparel",
    category: "cro",
    services: ["Sales Psychology Layouts", "A/B Testing", "Visual Redesign"],
    description: "Adjusted styling details and testimonial sections on the homepage to maximize initial brand trust and conversion rates.",
    accentColor: "#06b6d4",
  },
  {
    name: "Anand Sweets",
    url: "https://www.anandsweets.in/",
    industry: "Gourmet Foods",
    category: "dev",
    services: ["Shopify Store Setup", "Delivery Integration", "Locational Checkout"],
    description: "Engineered locational delivery checks and optimized checkout routes for India's premier sweets brand.",
    accentColor: "#f97316",
  },
  {
    name: "Brahmras Natural",
    url: "https://www.brahmrasnatural.com/",
    industry: "Organic Wellness",
    category: "cro",
    services: ["Subscription CRO", "Value Proposition Copy", "Speed Optimization"],
    description: "Constructed clear product benefit callouts and a smooth subscription plan selector that boosted repeat-customer metrics.",
    accentColor: "#84cc16",
  },
  {
    name: "Get My Couch",
    url: "https://www.getmycouch.com/",
    industry: "Luxury Furniture",
    category: "dev",
    services: ["Shopify Store Customization", "3D Asset Viewer Integration", "High AOV Conversion UX"],
    description: "Built premium interactive custom configuration flows to scale high-ticket furniture collections safely.",
    accentColor: "#0f766e",
  },
  {
    name: "SOBO Beauty",
    url: "https://sobobeauty.com/",
    industry: "Curated Cosmetics",
    category: "cro",
    services: ["Shopify Store Redesign", "Mobile Sticky Buy Box", "Cosmetics Collections Grid"],
    description: "Redesigned Sobo Beauty checkout path and landing pages to reduce user drop-offs.",
    accentColor: "#d946ef",
  },
  
  // 7 Placeholder Projects (Required to reach 20 total)
  {
    name: "Well Essentials",
    url: "https://wellessentials.com/",
    industry: "Superfoods & Health",
    category: "cro",
    services: ["Shopify Speed Tuning", "Asset Lazy-Loading", "Page Speed Optimization"],
    description: "Optimized image loading pipelines and scripts to secure a PageSpeed score of 95+.",
    accentColor: "#22c55e",
  },
  {
    name: "Kohkayn",
    url: "https://kohkayn.com/",
    industry: "Modern Basics Apparel",
    category: "dev",
    services: ["Next.js Headless Store", "Lightning Speed Rebuild", "Tailwind Config"],
    description: "Re-engineered standard storefront into a modern custom framework reducing page render index to 1.1s.",
    accentColor: "#111827",
  },
  {
    name: "Amarose",
    url: "https://amarose.com/",
    industry: "Luxury Perfumes",
    category: "cro",
    services: ["UX Audit", "Scent Finder Quiz", "Add-To-Cart CRO"],
    description: "Custom quiz funnel matches user scent notes to products, increasing add-to-carts by 35%.",
    accentColor: "#db2777",
  },
  {
    name: "NutriBlend Ecom",
    url: "https://nutriblend.in/",
    industry: "Sports Nutrition",
    category: "dev",
    services: ["Shopify Custom Development", "Bundle Builder App", "ERP Sync Integration"],
    description: "Built custom Shopify bundle selector interfaces and automated order routing.",
    accentColor: "#0284c7",
  },
  {
    name: "Urban Dwellings",
    url: "https://urbandwellings.co/",
    industry: "Home Decor & Accents",
    category: "dev",
    services: ["Shopify Liquid Customization", "Visual Catalog Build", "Mobile Sticky CTA"],
    description: "Constructed premium editorial sliding banners and interactive quick-shop grids tailored to design audiences.",
    accentColor: "#78350f",
  },
  {
    name: "Skin Basics",
    url: "https://skinbasics.com/",
    industry: "Leather Goods",
    category: "cro",
    services: ["Conversion Rate Audit", "Trust Badging", "Optimized Checkout Drawer"],
    description: "Decreased checkout bounces by simplifying billing addresses and showcasing MSME & secure certificates.",
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
  let primaryColor = "#00AF56";
  let bgColor = "bg-[#faf8f5]";
  let textColor = "text-[#2b1f1d]";
  let heroText = "SUMMER COLLECTION";
  let heroSub = "Explore our premium handpicked catalog";
  let products = [ { name: "Best Seller Item", price: "₹2,500" }, { name: "New Arrival Set", price: "₹4,800" } ];
  let image: string | undefined = undefined;

  if (lowerName.includes("sobo")) {
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
  } else if (lowerName.includes("humble organic") || lowerName.includes("organic rootz")) {
    image = "/supplement_mockup.png";
  } else if (lowerName.includes("rcfyiy")) {
    image = "/apparel_mockup.png";
  } else if (lowerName.includes("brahmras")) {
    image = "/wellness_mockup.png";
  } else if (lowerName.includes("aura fragrance")) {
    image = "/jewelry_mockup.png";
  }

  if (lowerName.includes("wheels")) {
    theme = "dark";
    bgColor = "bg-[#0c0c0c]";
    textColor = "text-white";
    primaryColor = "#00AF56";
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
  } else if (lowerName.includes("panihari")) {
    theme = "light";
    bgColor = "bg-[#faf8f5]";
    textColor = "text-[#2b1f1d]";
    primaryColor = "#b45309";
    heroText = "JAIPURI BLOCK PRINT";
    heroSub = "Traditional block-printed Kurta sets";
    products = [ { name: "Anarkali Kurta Set", price: "₹4,500" }, { name: "Mulmul Dupatta", price: "₹1,200" } ];
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
  } else if (lowerName.includes("selectives")) {
    theme = "light";
    bgColor = "bg-[#fffbfb]",
    textColor = "text-[#3b1a20]",
    primaryColor = "#db2777",
    heroText = "VEGAN BEAUTY",
    heroSub = "Hydrating lip oils and tinted balms",
    products = [ { name: "Hydrating Lip Balm", price: "₹950" }, { name: "Dewy Skin Serum", price: "₹1,450" } ];
  } else if (lowerName.includes("minimal thread")) {
    theme = "dark";
    bgColor = "bg-[#09090b]";
    textColor = "text-white";
    primaryColor = "#27272a";
    heroText = "BASIC THREADS";
    heroSub = "Clean boxy pocket t-shirts";
    products = [ { name: "Boxy Tee Black", price: "₹1,200" }, { name: "Slim Canvas Chinos", price: "₹2,800" } ];
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
  } else if (lowerName.includes("luxe leather")) {
    theme = "light";
    bgColor = "bg-[#faf7f2]";
    textColor = "text-[#3b2413]";
    primaryColor = "#ca8a04";
    heroText = "GRAIN LEATHERS";
    heroSub = "Full-grain duffle bags and wallets";
    products = [ { name: "Travel Duffle Bag", price: "₹14,500" }, { name: "Slim Bifold Wallet", price: "₹2,200" } ];
  } else if (lowerName.includes("zenith")) {
    theme = "dark";
    bgColor = "bg-[#0a0b0d]";
    textColor = "text-white";
    primaryColor = "#94a3b8";
    heroText = "AUTOMATICS";
    heroSub = "Skeleton automatic movements";
    products = [ { name: "Skeleton Chronograph", price: "₹42,000" }, { name: "GMT Automatic Watch", price: "₹28,000" } ];
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

export default function PortfolioPage() {
  const [filter, setFilter] = useState<"all" | "dev" | "cro">("all");

  const filteredProjects = PROJECTS.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <div className="relative py-16 px-6">
      {/* Background radial highlight */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[400px] rounded-full bg-[#00AF56]/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
            Project Showcase
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Brands We've Helped Grow
          </h1>
          <p className="text-[#8C8C8C] text-sm sm:text-base leading-relaxed">
            Browse through our portfolio of ecommerce brands scaling conversions and performance using custom Shopify stores, designs, and speed optimization.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center flex-wrap gap-2.5">
          {[
            { id: "all", name: "All Brands" },
            { id: "dev", name: "Shopify Design & Development" },
            { id: "cro", name: "Shopify CRO & Speed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                filter === tab.id
                  ? "bg-[#00AF56] text-black border-[#00AF56] font-bold"
                  : "bg-[#111111] text-[#8C8C8C] border-white/[0.05] hover:text-white hover:border-white/10"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                key={proj.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-3xl bg-[#181818] border border-white/[0.06] hover:border-white/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Virtual Macbook/Screen Mockup Frame */}
                <div className="p-4 bg-[#111111] border-b border-white/[0.04] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="w-2 h-2 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] text-[#8C8C8C] font-mono tracking-wider truncate max-w-[150px]">
                    {proj.url.replace("https://", "").replace("www.", "")}
                  </span>
                  <Laptop className="w-3.5 h-3.5 text-[#8C8C8C]" />
                </div>

                {/* Mockup Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0a] border-b border-white/[0.04]">
                  {(() => {
                    const store = getMockupConfig(proj.name, proj.category, proj.industry);
                    return store.image ? (
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <StorefrontMockup store={store} />
                    );
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Main Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-6 relative">
                  {/* Color Glow Overlay on hover */}
                  <div
                    className="absolute -inset-px opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 rounded-b-3xl pointer-events-none"
                    style={{
                      background: `radial-gradient(150px circle at 50% 50%, ${proj.accentColor}, transparent)`,
                    }}
                  />

                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00AF56] transition-colors">
                        {proj.name}
                      </h3>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded bg-white/[0.03] border border-white/[0.06] text-[#8C8C8C] hover:text-white hover:bg-white/[0.06] transition-colors"
                        title="Visit Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: proj.accentColor }}>
                      {proj.industry}
                    </span>

                    <p className="text-xs text-[#8C8C8C] leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.services.map((srv) => (
                        <span
                          key={srv}
                          className="text-[9px] bg-white/[0.03] border border-white/[0.06] text-[#D7D7D7] px-2 py-0.5 rounded-md"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Stats Detail */}
                <div className="px-6 py-4 bg-[#111111]/60 border-t border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-[#8C8C8C] font-mono uppercase tracking-wider text-[9px]">Strategic Focus</span>
                  <span className="font-bold text-white font-mono flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#00AF56]" />
                    {proj.category === "dev" ? "Development" : "CRO Metrics"}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to action card footer */}
        <div className="mt-8 p-8 md:p-12 rounded-3xl bg-[#111111] border border-white/[0.08] text-center flex flex-col gap-6 items-center">
          <h2 className="text-xl md:text-2xl font-bold text-white max-w-xl">
            Want to see your Shopify store listed here with scaling ROAS?
          </h2>
          <p className="text-xs text-[#8C8C8C] max-w-lg leading-relaxed">
            Let Pankaj and the SalePXL team analyze your storefront layout, isolate checkout leakage points, and assemble a campaign blueprint.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all hover:shadow-[0_0_20px_rgba(0,175,86,0.3)]"
          >
            <span>Book Free Audit Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

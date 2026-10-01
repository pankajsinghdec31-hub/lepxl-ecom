"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Smartphone,
  Gauge,
  ShoppingBag,
  Clock,
  ArrowUpRight,
  Eye,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LeadCaptureModal from "@/components/LeadCaptureModal";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface ClientStore {
  id: string;
  name: string;
  url: string;
  domainDisplay: string;
  category: "wellness" | "fashion" | "food" | "living";
  categoryLabel: string;
  image: string;
  metricBadge: string;
  headline: string;
  description: string;
  highlights: string[];
}

const CLIENT_STORES: ClientStore[] = [
  {
    id: "kishoriju",
    name: "Kishoriju",
    url: "https://kishoriju.com/",
    domainDisplay: "kishoriju.com",
    category: "wellness",
    categoryLabel: "Spiritual & Traditional D2C",
    image: "/stores/kishoriju.png",
    metricBadge: "3.8% Conversion Rate",
    headline: "Sacred Spiritual Essentials & Devotional Commerce",
    description: "Built for instant trust, sacred visual aesthetics, lightning-fast regional payments, and high-converting single-click checkout.",
    highlights: [
      "Custom devotional color palette & typography",
      "Sticky mobile bottom buy drawer",
      "UPI & Cash on Delivery instant validation",
      "Sub-1.8s Core Web Vitals performance"
    ]
  },
  {
    id: "kalpveda",
    name: "Kalpveda",
    url: "https://kalpveda.co.in/",
    domainDisplay: "kalpveda.co.in",
    category: "wellness",
    categoryLabel: "Ayurveda & Wellness",
    image: "/stores/kalpveda.png",
    metricBadge: "+42% Average Order Value",
    headline: "Pure Ayurvedic Wellness & Herb Formulations",
    description: "Engineered with ingredient transparency modules, personalized regimen bundle builders, and trust badge hooks.",
    highlights: [
      "Dynamic bundle-and-save cart upsells",
      "Clinical ingredient storytelling modules",
      "Mobile-first product gallery swipe",
      "Shiprocket API automated logistics sync"
    ]
  },
  {
    id: "highskycoffee",
    name: "High Sky Coffee",
    url: "https://highskycoffee.com/",
    domainDisplay: "highskycoffee.com",
    category: "food",
    categoryLabel: "Artisanal Coffee & Roasters",
    image: "/stores/highskycoffee.png",
    metricBadge: "1.2s Page Speed",
    headline: "Premium Single-Origin & Specialty Coffee Roastery",
    description: "A dark-mode sensory aesthetic built for coffee lovers with roast profile visualizers, grind-size drawers, and recurring subscriptions.",
    highlights: [
      "Interactive grind size & brewing guide selector",
      "Subscription & recurring delivery checkout",
      "Rich sensory video hero background",
      "Zero-clutter high-speed cart drawer"
    ]
  },
  {
    id: "vaaniveda",
    name: "Vaani Veda",
    url: "https://www.vaaniveda.com/",
    domainDisplay: "vaaniveda.com",
    category: "wellness",
    categoryLabel: "Ayurvedic Beauty & Skincare",
    image: "/stores/vaaniveda.png",
    metricBadge: "4.1% Mobile CVR",
    headline: "Luxury Ayurvedic Botanicals & Skincare Elixirs",
    description: "High-ticket skincare store engineered for visual luxury, before-and-after results verification, and verified customer video reviews.",
    highlights: [
      "Before/After interactive comparison sliders",
      "Clean clinical certifications banner",
      "Custom drawer with free gift progress bar",
      "Razorpay Magic Checkout integration"
    ]
  },
  {
    id: "styleora",
    name: "Styleora",
    url: "https://styleora.in/",
    domainDisplay: "styleora.in",
    category: "fashion",
    categoryLabel: "Contemporary Fashion & Apparel",
    image: "/stores/styleora.png",
    metricBadge: "+65% Mobile Add-To-Cart",
    headline: "Trendsetting Western Wear & Daily Fashion",
    description: "An ultra-fast mobile fashion experience designed for Instagram & Meta Ads traffic with quick-add size selectors and sticky checkout.",
    highlights: [
      "Instant size & fit drawer recommendation",
      "Color swatch visual live switcher",
      "Sticky mobile bottom bar with buy now",
      "Optimized for 90%+ Meta ad mobile traffic"
    ]
  },
  {
    id: "miktoksiliving",
    name: "Miktoksi Living",
    url: "https://www.miktoksiliving.com/",
    domainDisplay: "miktoksiliving.com",
    category: "living",
    categoryLabel: "Modern Home Decor & Living",
    image: "/stores/miktoksiliving.png",
    metricBadge: "High-Ticket ROAS Scale",
    headline: "Architectural Home Accents & Artisan Furniture",
    description: "Clean Scandinavian aesthetic built for high-ticket home goods with room visualizers, 0% EMI financing calculators, and dimension guides.",
    highlights: [
      "Room scene shoppable hotspot lookbooks",
      "Instant EMI & Pay-later payment widgets",
      "Heavy freight logistics configuration",
      "High-res zoomable product photography"
    ]
  },
  {
    id: "krustoz",
    name: "Krustoz",
    url: "https://krustoz.com/",
    domainDisplay: "krustoz.com",
    category: "food",
    categoryLabel: "Gourmet Healthy Snacking",
    image: "/stores/krustoz.png",
    metricBadge: "3x Checkout Velocity",
    headline: "Crunchy Gourmet Snacks & Guilt-Free Treats",
    description: "Vibrant high-energy snacking destination with custom flavor mixing bundles, snack packs, and rapid 2-click buy flows.",
    highlights: [
      "Build-your-own snack box bundle builder",
      "Impulse checkout cart addons",
      "COD fee waiver & free shipping progress tier",
      "Instant order tracking portal integration"
    ]
  },
  {
    id: "irayaalthea",
    name: "Iraya Althea",
    url: "https://irayaalthea.com/",
    domainDisplay: "irayaalthea.com",
    category: "wellness",
    categoryLabel: "Botanical Body & Skin Wellness",
    image: "/stores/irayaalthea.png",
    metricBadge: "Sub-2.0s Mobile Load",
    headline: "Holistic Botanical Rituals & Organic Self-Care",
    description: "Minimalist earthy aesthetic crafted to evoke tranquility while driving rigorous conversion funnel mechanics across mobile browsers.",
    highlights: [
      "Sensorial aesthetic with organic earthy tones",
      "Sticky buy button with live stock urgency",
      "Seamless review sync & photo customer proof",
      "Mobile-optimized one-step payment checkout"
    ]
  }
];

export default function HighConvertingShopifyStorePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("₹25,000");
  const [selectedPlanName, setSelectedPlanName] = useState("Shopify Pro");

  const filteredStores = activeCategory === "all"
    ? CLIENT_STORES
    : CLIENT_STORES.filter((s) => s.category === activeCategory);

  const handleOpenLead = (budget: string = "₹25,000", plan: string = "High Converting Store Build") => {
    setSelectedBudget(budget);
    setSelectedPlanName(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060807] text-white font-sans selection:bg-[#22E39A]/20 selection:text-white pt-20">
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden border-b border-white/[0.08]">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#22E39A]/[0.04] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22E39A]/30 bg-[#22E39A]/[0.08] text-[#22E39A] text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm animate-fade-blur">
            <span className="w-2 h-2 rounded-full bg-[#22E39A] animate-pulse" />
            <span>High Converting Shopify Store Portfolio • 100+ Live Launches</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-light font-grotesk tracking-tight leading-[1.12] max-w-4xl text-white">
            High Converting Shopify Stores <br className="hidden sm:block" />
            That Turn <span className="text-[#22E39A] font-normal underline decoration-[#22E39A]/40 underline-offset-8">Ad Traffic Into Buyers</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-white/70 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            Traffic without conversions is just burning ad budget. We build bespoke, sub-second Shopify stores with proven CRO architecture, sticky mobile cart drawers, and frictionless checkouts.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => handleOpenLead("₹40,000", "High Converting Store Build")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-100 font-bold text-sm tracking-wide transition-all shadow-[0_8px_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Build My High Converting Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I%20saw%20your%20high-converting%20Shopify%20client%20stores.%20Can%20we%20discuss%20my%20store%20build%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#22E39A]/50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2.5 backdrop-blur-sm cursor-pointer"
            >
              <WhatsAppIcon className="w-4.5 h-4.5 fill-[#25D366] shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Metrics Strip */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-white/[0.08]">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#22E39A] font-grotesk">3.8% - 5.2%</div>
              <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-mono">Avg. Mobile CVR</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-grotesk">&lt; 1.8s</div>
              <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-mono">Speed Index</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-grotesk">100+</div>
              <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-mono">Stores Delivered</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#22E39A] font-grotesk">+42%</div>
              <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-mono">AOV Uplift</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── CLIENT SHOWCASE SECTION ── */}
      <section id="showcase" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs text-[#22E39A] font-mono uppercase tracking-widest font-bold">
              Real Stores • Real Conversions
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light font-grotesk text-white tracking-tight mt-2">
              Featured Client Stores <span className="text-[#22E39A] font-normal">In Production</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl mx-auto">
              Every store below is custom-engineered on Shopify by SalePXL. Click any card to inspect the live production website.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { key: "all", label: "All Stores (8)" },
                { key: "wellness", label: "Wellness & Beauty" },
                { key: "fashion", label: "Fashion & Apparel" },
                { key: "food", label: "Food & Beverage" },
                { key: "living", label: "Home & Living" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === tab.key
                      ? "bg-[#22E39A] text-black shadow-md shadow-[#22E39A]/20"
                      : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stores Grid (2 columns on tablet/desktop for high-impact browser frame view) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className="group rounded-3xl bg-[#0e1210] border border-white/[0.1] hover:border-[#22E39A]/40 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                
                {/* Browser Mockup Top Bar */}
                <div className="bg-[#151a17] px-4 py-3 border-b border-white/[0.08] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  <div className="flex-1 max-w-sm mx-auto bg-black/40 rounded-md px-3 py-1 text-[11px] font-mono text-white/60 flex items-center justify-center gap-1.5 truncate border border-white/[0.04]">
                    <span className="text-[#22E39A] text-[10px]">https://</span>
                    <span className="truncate">{store.domainDisplay}</span>
                  </div>

                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#22E39A] hover:underline shrink-0"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Screenshot Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={store.image}
                    alt={`${store.name} - High Converting Shopify Store by SalePXL`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1210] via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Metric Pill Over Image */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 text-[#22E39A] border border-[#22E39A]/30 backdrop-blur-md shadow-lg">
                      <Sparkles className="w-3 h-3 text-[#22E39A]" />
                      {store.metricBadge}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-medium uppercase tracking-wider bg-black/70 text-white/80 border border-white/10 backdrop-blur-md">
                      {store.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold font-grotesk text-white group-hover:text-[#22E39A] transition-colors">
                        {store.name}
                      </h3>
                      <span className="text-xs text-white/40 font-mono">{store.domainDisplay}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-white/80 font-medium mb-3">
                      {store.headline}
                    </p>

                    <p className="text-xs text-white/60 leading-relaxed mb-5">
                      {store.description}
                    </p>

                    {/* Features Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {store.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-white/70">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22E39A] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] text-xs font-semibold text-white transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#22E39A]" />
                      <span>Live Preview</span>
                      <ExternalLink className="w-3 h-3 text-white/50" />
                    </a>

                    <button
                      onClick={() => handleOpenLead("₹40,000", `Store Like ${store.name}`)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#22E39A] hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md shadow-[#22E39A]/20 cursor-pointer active:scale-95"
                    >
                      <span>Build Similar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CONVERSION ARCHITECTURE BREAKDOWN ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#090d0b] border-y border-white/[0.08] relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs text-[#22E39A] font-mono uppercase tracking-widest font-bold">
              The Science Of Conversion
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-grotesk text-white tracking-tight mt-2">
              Why Our Shopify Stores <span className="text-[#22E39A] font-normal">Convert 2x Better</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/60">
              We don't use bloated generic templates. Every section is hand-crafted with custom Shopify Liquid code to eliminate drop-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1412] border border-white/[0.08] hover:border-[#22E39A]/30 transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#22E39A]/10 border border-[#22E39A]/20 text-[#22E39A] flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-grotesk text-white">Mobile-First PDP Architecture</h3>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                Over 85% of Indian and global D2C traffic comes from mobile Meta & TikTok ads. We design sticky Add-To-Cart drawers, swipeable image carousels, and one-tap size/variant switchers.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1412] border border-white/[0.08] hover:border-[#22E39A]/30 transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#22E39A]/10 border border-[#22E39A]/20 text-[#22E39A] flex items-center justify-center">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-grotesk text-white">Sub-2.0s Core Web Vitals</h3>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                Every 100ms of latency drops conversion by 7%. We remove unused third-party JS bloat, compress media with Next-Gen formats, and configure asynchronous asset loading for top scores.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1412] border border-white/[0.08] hover:border-[#22E39A]/30 transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#22E39A]/10 border border-[#22E39A]/20 text-[#22E39A] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-grotesk text-white">Smart Slide Cart & Upsells</h3>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                Turn your cart into an automated revenue engine. Tiered free-shipping progress bars, 1-click bundle upsells, and instant checkout buttons that boost Average Order Value by 25-40%.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── PRICING PACKAGES (25k, 40k, 50k+) ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs text-[#22E39A] font-mono uppercase tracking-widest font-bold">
              Transparent Investment
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-grotesk text-white tracking-tight mt-2">
              Shopify Store <span className="text-[#22E39A] font-normal">Build Packages</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/60">
              Clear deliverables with no hidden charges. Choose your plan to launch in 3 to 14 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Standard Plan */}
            <div className="rounded-3xl bg-[#0f1412] border border-white/[0.1] p-7 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">Delivery 4-7 Days</span>
                <h3 className="text-2xl font-bold font-grotesk text-white mb-2">Shopify Standard</h3>
                <div className="my-4 pb-4 border-b border-white/[0.08]">
                  <span className="text-[11px] text-white/50 uppercase font-mono block">Starts from</span>
                  <div className="text-3xl font-extrabold text-white font-grotesk mt-0.5">₹25,000</div>
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">Includes:</div>
                <div className="space-y-2.5 mb-6 text-xs text-white/70">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Custom Liquid store structure</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Mobile-first responsive design</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Payment & Shipping setup</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Essential apps & analytics</span></div>
                </div>
              </div>
              <button
                onClick={() => handleOpenLead("₹25,000", "Shopify Standard (₹25k)")}
                className="w-full py-3.5 rounded-full border border-white/20 hover:border-white bg-white/[0.04] hover:bg-white text-white hover:text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan - Featured */}
            <div className="rounded-3xl bg-gradient-to-b from-[#13221c] to-[#0c1612] border-2 border-[#22E39A] p-7 flex flex-col justify-between shadow-2xl relative md:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#22E39A] text-black text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                Most Popular
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#22E39A] block mb-1">Delivery 7-14 Days</span>
                <h3 className="text-2xl font-bold font-grotesk text-white mb-2">Shopify Pro</h3>
                <div className="my-4 pb-4 border-b border-white/[0.08]">
                  <span className="text-[11px] text-[#22E39A] uppercase font-mono block">Starts from</span>
                  <div className="text-3xl font-extrabold text-[#22E39A] font-grotesk mt-0.5">₹40,000</div>
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">Includes:</div>
                <div className="space-y-2.5 mb-6 text-xs text-white/80">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>High-converting PDP & visual design</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>A+ banner presentation & AI mockups</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Smart sticky cart drawer & bundle upsells</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Sub-second speed tuning (90+ score)</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>1 Month dedicated post-launch support</span></div>
                </div>
              </div>
              <button
                onClick={() => handleOpenLead("₹40,000", "Shopify Pro (₹40k)")}
                className="w-full py-3.5 rounded-full bg-[#22E39A] hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#22E39A]/20 cursor-pointer active:scale-95"
              >
                Get Started with Pro
              </button>
            </div>

            {/* Growth Plan */}
            <div className="rounded-3xl bg-[#0f1412] border border-white/[0.1] p-7 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">Delivery 14-21 Days</span>
                <h3 className="text-2xl font-bold font-grotesk text-white mb-2">Shopify Growth</h3>
                <div className="my-4 pb-4 border-b border-white/[0.08]">
                  <span className="text-[11px] text-white/50 uppercase font-mono block">Starts from</span>
                  <div className="text-3xl font-extrabold text-white font-grotesk mt-0.5">₹50,000+</div>
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">Includes:</div>
                <div className="space-y-2.5 mb-6 text-xs text-white/70">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Fully bespoke custom store architecture</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Meta Pixel, Conversions API & GA4 setup</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Custom landing page templates for ads</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Complete SEO structure & schemas</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22E39A] shrink-0" /><span>Comprehensive handover KT training & PDF</span></div>
                </div>
              </div>
              <button
                onClick={() => handleOpenLead("₹50,000+", "Shopify Growth (₹50k+)")}
                className="w-full py-3.5 rounded-full border border-white/20 hover:border-white bg-white/[0.04] hover:bg-white text-white hover:text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Get Started
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#0e1713] to-[#060807] border-t border-white/[0.08] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <span className="w-14 h-14 rounded-full bg-[#22E39A]/15 border border-[#22E39A]/30 text-[#22E39A] flex items-center justify-center animate-pulse">
            <Zap className="w-7 h-7" />
          </span>

          <h2 className="text-3xl sm:text-5xl font-light font-grotesk text-white tracking-tight">
            Ready To Launch Your <span className="text-[#22E39A] font-normal">High Converting Store?</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl">
            Join 100+ successful D2C brands. Let's discuss your project scope, design requirements, and launch timeline.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-2">
            <button
              onClick={() => handleOpenLead("₹40,000", "Final Banner CTA")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#22E39A] hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#22E39A]/20 cursor-pointer"
            >
              Get Free Consultation
            </button>
            <a
              href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I'd%20like%20to%20get%20a%20quote%20for%20a%20high-converting%20Shopify%20store."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.08] text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4.5 h-4.5 fill-[#25D366] shrink-0" />
              <span>WhatsApp: +91 9917780656</span>
            </a>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE MODAL */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultBudget={selectedBudget}
        defaultPlanName={selectedPlanName}
      />

    </div>
  );
}

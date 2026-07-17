"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, Heart, Sparkles, Plus, Minus, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "/wellness_mockup.png",
  "/supplement_mockup.png",
  "/jewelry_mockup.png",
  "/apparel_mockup.png"
];

const INGREDIENTS = [
  {
    name: "24K Gold",
    desc: "Brightens skin tone, fights dullness, and boosts collagen synthesis to restore youthful elasticity.",
    benefit: "Anti-Ageing & Glow",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&q=80"
  },
  {
    name: "Niacinamide",
    desc: "Active vitamin B3 targets pigmentation blemishes, tightens enlarged pores, and repairs skin barrier.",
    benefit: "Clarifying & Pore Control",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80"
  },
  {
    name: "Korean White Lotus",
    desc: "Bespoke Jeju ingredient hydrates skin layers, soothens redness, and protects against toxic stressors.",
    benefit: "Deep Hydration & Calm",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80"
  }
];

export default function SkincarePDP() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("100ml + 30ml");
  const [activeTab, setActiveTab] = useState<"ingredients" | "howTo" | "shipping">("ingredients");
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <div className="w-full bg-[#121316]/50 rounded-3xl border border-white/[0.06] overflow-hidden p-6 sm:p-8 flex flex-col gap-12 text-left relative">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-lime/[0.015] blur-[100px] pointer-events-none" />

      {/* Main product box section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Product Images layout */}
        <div className="lg:col-span-7 grid grid-cols-12 gap-4">
          
          {/* Thumbnails vertical stack (Desktop) */}
          <div className="col-span-2 flex flex-col gap-2.5">
            {IMAGES.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`aspect-square rounded-xl overflow-hidden border transition-all duration-300 ${
                  activeImageIdx === idx 
                    ? "border-brand-lime bg-brand-lime/10 shadow-[0_0_12px_rgba(203,243,81,0.15)]" 
                    : "border-white/[0.08] hover:border-white/20 bg-white/[0.01]"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>

          {/* Main Visual showcase */}
          <div className="col-span-10 relative aspect-[4/4] rounded-2xl overflow-hidden bg-[#0c0d10] border border-white/[0.05] flex items-center justify-center p-6">
            <img 
              src={IMAGES[activeImageIdx]} 
              alt="Main Product Preview" 
              className="w-[90%] h-[90%] object-contain object-top rounded-xl select-none"
            />
            <span className="absolute top-4 left-4 bg-brand-lime/10 text-brand-lime font-mono text-[9px] font-bold px-3 py-1 rounded-full border border-brand-lime/20 tracking-wider uppercase">
              Jeju Secrets
            </span>
          </div>

        </div>

        {/* Right: Product Detail fields */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            
            {/* Brand and Stars */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-brand-lime font-mono uppercase tracking-widest font-bold">Discover Pilgrim</span>
              <div className="flex items-center gap-1 text-[#fbbf24]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-[10px] text-[#8e8e93] font-mono font-bold ml-1">5.0 (428 reviews)</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase font-grotesk mt-1 leading-tight">
              24K Gold Facial Mask & Brightening Serum Set
            </h3>
            <p className="text-[#8e8e93] text-xs leading-relaxed mt-1">
              Bespoke Korean routine built with pure gold leaf and botanical white lotus. Clinically tested to improve skin glow, repair cellular barriers, and increase elasticity within 14 days.
            </p>
          </div>

          {/* Price details in INR */}
          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-[9px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Special Offer Price</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-mono font-black text-white">₹1,250</span>
                <span className="text-sm font-mono text-[#8e8e93] line-through">₹1,650</span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/[0.08]" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] bg-brand-lime/10 text-brand-lime font-bold border border-brand-lime/20 px-2 py-0.5 rounded-full w-max text-[8px] uppercase tracking-wider font-mono">
                25% OFF
              </span>
              <span className="text-[9px] text-[#8e8e93] mt-1 font-semibold">Includes free shipping</span>
            </div>
          </div>

          {/* Size Selectors */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Select Kit Size</span>
            <div className="flex gap-2">
              {["50ml + 15ml", "100ml + 30ml"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                    selectedSize === size
                      ? "bg-brand-lime text-black border-brand-lime shadow-[0_0_10px_rgba(203,243,81,0.15)]"
                      : "bg-white/[0.02] border-white/[0.08] text-[#8e8e93] hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantities & Add-To-Cart */}
          <div className="flex flex-col gap-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Quantity</span>
              <div className="flex items-center rounded-xl bg-white/[0.02] border border-white/[0.08] p-1">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1 text-[#8e8e93] hover:text-white transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-mono font-bold text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1 text-[#8e8e93] hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Glowing Buy Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden ${
                isAdded 
                  ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                  : "bg-brand-lime text-black hover:bg-[#b0dd40] shadow-[0_0_20px_rgba(203,243,81,0.25)] hover:scale-[1.01]"
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Added to Cart!
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-1.5"
                  >
                    Add to Cart <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Collapsible Info Tabs */}
          <div className="flex flex-col border border-white/[0.08] rounded-2xl overflow-hidden bg-white/[0.01]">
            <div className="flex border-b border-white/[0.08] bg-white/[0.01]">
              {[
                { id: "ingredients", label: "Jeju Secrets" },
                { id: "howTo", label: "How to Use" },
                { id: "shipping", label: "Free Gifts" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2 ${
                    activeTab === tab.id
                      ? "border-brand-lime text-white bg-white/[0.02]"
                      : "border-transparent text-[#8e8e93] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="p-4 text-xs text-[#8e8e93] leading-relaxed">
              {activeTab === "ingredients" && (
                <p>Features 24K Pure Gold flakes for cell regeneration, skin-plumping Peptides, and moisture-binding Lotus extract sourced directly from Jeju Island, South Korea.</p>
              )}
              {activeTab === "howTo" && (
                <p>1. Cleanse face. 2. Apply 3-4 drops of Brightening Serum. 3. Smooth a generous layer of 24K Gold Mask. 4. Leave for 15 mins then wash off. Use twice weekly for optimal ROAS conversions.</p>
              )}
              {activeTab === "shipping" && (
                <p>Spend ₹1,500+ and get a free Jade Roller & Gua Sha massager kit. Added natively at checkout without third-party app scripts.</p>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Ingredient cards block (Matches the bottom stack of screenshot) */}
      <div className="flex flex-col gap-6 pt-6 border-t border-white/[0.08]">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-brand-lime font-mono uppercase tracking-widest font-bold">Ingredient Path</span>
          <h4 className="text-lg font-bold text-white uppercase font-grotesk">Jeju Skincare Secrets Inside</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INGREDIENTS.map((ing, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] hover:border-brand-lime/10 transition-all duration-300 flex flex-col gap-4 text-left group"
            >
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40 border border-white/[0.05]">
                <img 
                  src={ing.img} 
                  alt={ing.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] bg-white/[0.03] text-brand-lime border border-white/[0.05] px-2 py-0.5 rounded-full font-mono uppercase font-bold w-max">
                  {ing.benefit}
                </span>
                <h5 className="text-sm font-bold text-white group-hover:text-brand-lime transition-colors mt-1">{ing.name}</h5>
                <p className="text-xs text-[#8e8e93] leading-relaxed mt-1">{ing.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust certifications list */}
      <div className="flex flex-wrap items-center justify-around gap-6 py-4 px-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] text-xs text-[#8e8e93] font-mono uppercase tracking-wider font-bold">
        <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-lime" /> Dermatologically Tested</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-lime" /> 100% Vegan Ingredients</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-lime" /> Cruelty-Free certified</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-lime" /> FDA Approved Scale</span>
      </div>

    </div>
  );
}

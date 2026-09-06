"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  Building2,
  ArrowRight
} from "lucide-react";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import FoundersReviewsMarquee from "@/components/FoundersReviewsMarquee";

export default function PricingAndTrustSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("Under ₹29,999/-");
  const [selectedPlanName, setSelectedPlanName] = useState("");


  const PRICING_PLANS = [
    {
      id: "custom-shopify",
      name: "Custom Shopify Store",
      tagline: "E-commerce Starter",
      price: "₹25,000",
      priceSub: "Starting at",
      isPopular: false,
      budgetCategory: "Under ₹29,999/-",
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      description: "A conversion-focused Shopify setup for brands that need a professional store with the essential customizations to start selling.",
      features: [
        "Custom Shopify sections based on client requirements",
        "CRO-focused store structure",
        "Shopify product and collection setup",
        "Product images and promotional banners",
        "Payment gateway integration",
        "Shipping integration",
        "Essential Shopify app integrations",
        "Mobile-responsive design",
        "Essential pages and store setup",
        "Basic conversion-focused customization"
      ]
    },
    {
      id: "fully-customized",
      name: "Fully Customized Shopify Store",
      tagline: "Most Popular Choice",
      price: "₹40,000",
      priceSub: "Starting at",
      isPopular: true,
      badge: "MOST POPULAR",
      budgetCategory: "₹29,999/- ₹79,999/-",
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      description: "A more advanced Shopify experience with full branding and deeper customization across the store.",
      bestFor: "Established brands that want their Shopify store to look and feel completely unique rather than relying on standard theme sections.",
      features: [
        "A+ product imagery and product presentation",
        "A+ promotional banners and visual content",
        "Fully customized Shopify sections",
        "Custom product-page layouts",
        "Additional product templates where required",
        "Custom collection and landing-page sections",
        "Full brand-focused visual implementation",
        "Advanced product storytelling",
        "Essential app integrations",
        "CRO-focused customer journey",
        "Mobile and desktop optimization"
      ]
    },
    {
      id: "advanced-custom",
      name: "Shopify Advanced Custom",
      tagline: "Complete Growth Setup",
      price: "₹60,000",
      priceSub: "Starting at",
      isPopular: false,
      budgetCategory: "₹79,999/ +",
      icon: <Building2 className="w-6 h-6 text-emerald-400" />,
      description: "A complete custom Shopify growth setup built around the brand, customer journey, and long-term marketing requirements.",
      bestFor: "Brands looking for a complete Shopify foundation ready to sell, support marketing, analytics, paid ads, and future growth.",
      features: [
        "Fully customized store experience",
        "Advanced custom sections and templates",
        "Advanced product-page customization",
        "Custom landing pages",
        "Complete brand implementation",
        "Marketing & Meta Pixel / tracking setup",
        "Meta Ads & social media account setup",
        "Essential marketing & growth integrations",
        "SEO fundamentals and meta-tag setup",
        "Conversion tracking & CRO store architecture",
        "Performance and mobile optimization",
        "Essential growth-focused app integrations"
      ]
    }
  ];

  const handleOpenConnectModal = (planBudget: string, planName: string) => {
    setSelectedBudget(planBudget);
    setSelectedPlanName(planName);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-[#050505] text-white overflow-hidden">
      
      {/* AUTO-SCROLLING FOUNDERS & TEAMS REVIEWS MARQUEE */}
      <FoundersReviewsMarquee />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION 2: SHOPIFY STORE PACKAGES */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32 px-6 bg-gradient-to-b from-[#050505] via-[#070d14] to-[#050505] border-t border-white/[0.08]">

        <div className="max-w-[1360px] mx-auto flex flex-col gap-16 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-emerald-400"
            >
              Affordable Pricing. Experienced Team.
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight font-grotesk leading-tight"
            >
              Shopify Store <span className="text-emerald-400 font-normal">Packages</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto font-sans"
            >
              Transparent packages engineered for high conversions and long-term brand scaling.
            </motion.p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PRICING_PLANS.map((plan, idx) => {
              const isPopular = plan.isPopular;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className={`relative p-8 sm:p-10 rounded-[32px] flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
                    isPopular
                      ? "bg-[#091712]/90 border-2 border-emerald-500/60 shadow-[0_0_50px_rgba(34,227,154,0.15)] md:-translate-y-3"
                      : "bg-[#090b0e]/85 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-lg">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* Tagline */}
                    <div className="text-[11px] font-mono font-semibold text-emerald-400 mb-2 uppercase tracking-wider">
                      {plan.tagline}
                    </div>

                    {/* Title & Icon */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-grotesk tracking-tight leading-snug">
                        {plan.name}
                      </h3>
                      <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 shrink-0">
                        {plan.icon}
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="mb-6 pb-6 border-b border-white/10">
                      <span className="text-xs font-mono text-white/40 block mb-1 uppercase tracking-wider">
                        {plan.priceSub}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-white font-grotesk tracking-tight">
                          {plan.price}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-white/70 font-sans leading-relaxed mb-6">
                      {plan.description}
                    </p>

                    {/* Features List Header */}
                    <div className="text-xs font-bold text-white font-grotesk uppercase tracking-wider mb-3">
                      Includes:
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-white/80 font-sans leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Best For Box */}
                    {plan.bestFor && (
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                          Best For:
                        </span>
                        <p className="text-xs text-white/70 font-sans leading-relaxed">
                          {plan.bestFor}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTA Action Button */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => handleOpenConnectModal(plan.budgetCategory, plan.name)}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isPopular
                          ? "bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_4px_20px_rgba(34,227,154,0.3)] hover:scale-[1.02]"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                      }`}
                    >
                      <span>Connect with Us</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>


      {/* POPUP MODAL */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultBudget={selectedBudget}
        defaultPlanName={selectedPlanName}
      />

    </div>
  );
}

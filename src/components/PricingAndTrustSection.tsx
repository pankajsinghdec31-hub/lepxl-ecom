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
  const [selectedBudget, setSelectedBudget] = useState("Under ₹29,999");
  const [selectedPlanName, setSelectedPlanName] = useState("");

  const PRICING_PLANS = [
    {
      id: "custom-shopify",
      name: "Custom Shopify Store",
      tagline: "E-commerce Starter",
      price: "₹25,000",
      priceSub: "Starting at",
      isPopular: false,
      budgetCategory: "Under ₹29,999",
      icon: <Zap className="w-8 h-8 text-emerald-600" />,
      description: "A conversion-focused Shopify setup for brands that need a professional store with essential customizations to start selling.",
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
      budgetCategory: "₹30,000 - ₹79,999",
      icon: <Sparkles className="w-8 h-8 text-emerald-600" />,
      description: "A more advanced Shopify experience with full branding and deeper customization across the store.",
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
      budgetCategory: "₹80,000+",
      icon: <Building2 className="w-8 h-8 text-emerald-600" />,
      description: "A complete custom Shopify growth setup built around the brand, customer journey, and long-term marketing requirements.",
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
    <div className="w-full bg-white text-neutral-900 overflow-hidden">
      
      {/* AUTO-SCROLLING FOUNDERS & TEAMS REVIEWS MARQUEE */}
      <FoundersReviewsMarquee />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION 2: SHOPIFY STORE PACKAGES (Deliverables Agency Light Theme) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32 px-6 bg-neutral-50/60 border-t border-neutral-200">

        <div className="max-w-[1360px] mx-auto flex flex-col gap-16 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-emerald-600"
            >
              Affordable Pricing. Experienced Team.
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-light text-neutral-900 tracking-tight font-grotesk leading-tight"
            >
              Shopify Store <span className="text-emerald-600 font-normal">Packages</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-neutral-600 text-sm sm:text-base font-light max-w-xl mx-auto font-sans"
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
                  className={`relative rounded-[32px] bg-white flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden ${
                    isPopular
                      ? "border-2 border-emerald-500 shadow-emerald-500/10 md:-translate-y-3"
                      : "border border-neutral-200/80 shadow-neutral-200/40 hover:border-neutral-300"
                  }`}
                >
                  {/* Card Content Wrapper */}
                  <div className={`p-8 sm:p-10 flex flex-col justify-between flex-1 ${
                    isPopular ? "bg-gradient-to-b from-emerald-500/15 via-emerald-500/5 to-white" : ""
                  }`}>
                    
                    <div>
                      {/* Tagline */}
                      <div className="text-center text-xs font-sans font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                        {plan.tagline}
                      </div>

                      {/* Name */}
                      <h3 className="text-center text-2xl sm:text-3xl font-extrabold text-neutral-900 font-grotesk tracking-tight leading-snug mb-4">
                        {plan.name}
                      </h3>

                      {/* Icon Badge Center */}
                      <div className="flex justify-center my-4">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center shadow-sm">
                          {plan.icon}
                        </div>
                      </div>

                      {/* Price Block */}
                      <div className="text-center my-6 pb-6 border-b border-neutral-100">
                        <span className="text-xs font-sans font-medium text-neutral-500 uppercase tracking-wide block mb-1">
                          {plan.priceSub}
                        </span>
                        <div className="text-4xl sm:text-5xl font-black text-neutral-900 font-grotesk tracking-tight">
                          {plan.price}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-neutral-600 font-sans leading-relaxed mb-6 text-center">
                        {plan.description}
                      </p>

                      {/* Includes Header */}
                      <div className="text-xs font-bold text-neutral-900 font-grotesk uppercase tracking-wider mb-3">
                        Includes:
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        {plan.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-700 font-sans leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>


                    </div>

                    {/* CTA Action Button */}
                    <div className="pt-6 border-t border-neutral-100">
                      <button
                        type="button"
                        onClick={() => handleOpenConnectModal(plan.budgetCategory, plan.name)}
                        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          isPopular
                            ? "bg-[#22E39A] text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
                            : "bg-white text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white"
                        }`}
                      >
                        <span>Discuss This Plan</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

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

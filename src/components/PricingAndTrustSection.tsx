"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import LeadCaptureModal from "@/components/LeadCaptureModal";

export default function PricingAndTrustSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("Under ₹29,999");
  const [selectedPlanName, setSelectedPlanName] = useState("");

  const PRICING_PLANS = [
    {
      id: "shopify-standard",
      name: "Shopify Standard",
      tagline: "Delivery 4-7 Days",
      price: "₹25,000",
      priceSub: "Starting at",
      isPopular: false,
      budgetCategory: "Under ₹29,999",
      features: [
        "Custom Liquid sections based on requirements",
        "CRO-focused store structure & mobile design",
        "Product & collection layout configuration",
        "Payment gateway & shipping integration",
        "Essential Shopify app integrations",
        "Conversion-focused store launch setup"
      ]
    },
    {
      id: "shopify-pro",
      name: "Shopify Pro",
      tagline: "Delivery 7-14 Days",
      price: "₹40,000",
      priceSub: "Starting at",
      isPopular: true,
      badge: "MOST POPULAR",
      budgetCategory: "₹30,000 - ₹79,999",
      features: [
        "A+ product imagery & banner presentation",
        "Fully customized Liquid sections & PDP layouts",
        "Custom collection & landing-page templates",
        "Full brand-focused visual implementation",
        "CRO-focused customer journey & cart drawers",
        "Sub-second mobile & desktop performance tuning"
      ]
    },
    {
      id: "shopify-growth",
      name: "Shopify Growth",
      tagline: "Delivery 14-21 Days",
      price: "₹60,000",
      priceSub: "Starting at",
      isPopular: false,
      budgetCategory: "80,000+",
      features: [
        "Fully customized bespoke store experience",
        "Advanced product & landing-page customization",
        "Meta Pixel, CAPI & conversion tracking setup",
        "Meta Ads & social media account integration",
        "SEO fundamentals & meta-tag optimization",
        "Full growth architecture & app ecosystem"
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
      
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION 2: SHOPIFY STORE PACKAGES (Deliverables Agency Light Theme) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="relative py-6 sm:py-8 md:py-10 px-4 sm:px-6 bg-neutral-50/60 border-t border-neutral-200">

        <div className="max-w-[1360px] mx-auto flex flex-col gap-5 sm:gap-6 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-1">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-4xl md:text-5xl font-light text-neutral-900 tracking-tight font-grotesk leading-tight"
            >
              Affordable <span className="text-emerald-600 font-normal">Pricing</span>
            </motion.h2>
          </div>

          {/* Pricing Cards Grid (Standard Vertical Stack on Mobile, 3-Columns on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch max-w-md md:max-w-none mx-auto w-full">
            {PRICING_PLANS.map((plan, idx) => {
              const isPopular = plan.isPopular;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`relative rounded-2xl sm:rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden ${
                    isPopular
                      ? "border-2 border-emerald-500 shadow-emerald-500/10 md:-translate-y-1"
                      : "border border-neutral-200/80 shadow-neutral-200/40 hover:border-neutral-300"
                  }`}
                >
                  {/* Card Content Wrapper */}
                  <div className={`p-5 sm:p-6 lg:p-7 flex flex-col justify-between flex-1 ${
                    isPopular ? "bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-white" : ""
                  }`}>
                    
                    <div>
                      {/* Tagline */}
                      <div className="text-center text-[10px] sm:text-xs font-sans font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                        {plan.tagline}
                      </div>

                      {/* Name */}
                      <h3 className="text-center text-xl sm:text-2xl font-extrabold text-neutral-900 font-grotesk tracking-tight leading-snug mb-2">
                        {plan.name}
                      </h3>

                      {/* Price Block */}
                      <div className="text-center my-3 pb-3 border-b border-neutral-100">
                        <span className="text-[10px] sm:text-xs font-sans font-medium text-neutral-500 uppercase tracking-wide block mb-0.5">
                          {plan.priceSub}
                        </span>
                        <div className="text-3xl sm:text-4xl font-black text-neutral-900 font-grotesk tracking-tight">
                          {plan.price}
                        </div>
                      </div>

                      {/* Includes Header */}
                      <div className="text-[10px] sm:text-xs font-bold text-neutral-900 font-grotesk uppercase tracking-wider mb-2">
                        Includes:
                      </div>

                      {/* Features List */}
                      <div className="space-y-2 mb-4">
                        {plan.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-neutral-700 font-sans leading-tight">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* CTA Action Button */}
                    <div className="pt-3 border-t border-neutral-100 mt-auto">
                      <button
                        type="button"
                        onClick={() => handleOpenConnectModal(plan.budgetCategory, plan.name)}
                        className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          isPopular
                            ? "bg-[#22E39A] text-black hover:bg-emerald-400 shadow-md shadow-emerald-500/20 active:scale-95"
                            : "bg-white text-neutral-900 border border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-95"
                        }`}
                      >
                        <span>Discuss This Plan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
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

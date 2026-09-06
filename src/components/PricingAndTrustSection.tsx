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
      id: "starter",
      name: "E-commerce Starter",
      timeline: "Delivery in 1–2 weeks",
      price: "₹29,999",
      priceSub: "Starts at",
      isPopular: false,
      budgetCategory: "Under ₹29,999/-",
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      features: [
        "Premium Shopify Theme Setup & Branding",
        "Product Catalog Setup (Up to 30 Products)",
        "Payment Gateway & Shipping Integration",
        "Mobile-First Responsive UI",
        "Sub-2s Speed & Basic SEO Setup",
        "15-Day Post-Launch Support"
      ]
    },
    {
      id: "shopify-store",
      name: "Shopify Store",
      timeline: "Delivery within 2–3 weeks",
      price: "₹59,999",
      priceSub: "Starts at",
      isPopular: true,
      badge: "MOST POPULAR",
      budgetCategory: "₹29,999/- ₹79,999/-",
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      features: [
        "High-Converting UI/UX Branded Design",
        "Advanced Theme Customization & Custom Styling",
        "Up to 100 Product Listings & Custom Collections",
        "Custom Cart Upsell & High-Margin Bundle Offers",
        "Sub-2s Speed Optimization & Advanced Analytics",
        "1-on-1 Dedicated Shopify Specialist Support",
        "Meta Pixel & Google Analytics Setup"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      timeline: "Custom Timeline Based on Scope",
      price: "Custom",
      priceSub: "Starts at",
      isPopular: false,
      budgetCategory: "₹79,999/ +",
      icon: <Building2 className="w-6 h-6 text-emerald-400" />,
      features: [
        "Dedicated Expert Shopify Development Team",
        "Complex ERP, API & Custom System Integrations",
        "Headless Shopify & Custom App Development",
        "Omnichannel Sales & Marketing Automation",
        "Dedicated Account Manager & SLA Guarantee",
        "24/7 Priority Technical Support"
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
      {/* SECTION 2: AFFORDABLE PRICING. EXPERIENCED TEAM. */}
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
              Custom Shopify Packages
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight font-grotesk leading-tight"
            >
              Affordable Pricing. <br />
              <span className="text-emerald-400 font-normal">Experienced Team.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto font-sans"
            >
              No hidden developer markups or slow agency delays. High-converting Shopify stores engineered by senior Liquid specialists.
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
                    {/* Delivery Timeline Tag */}
                    <div className="text-[11px] font-mono font-semibold text-white/50 mb-3 uppercase tracking-wider">
                      {plan.timeline}
                    </div>

                    {/* Title & Icon */}
                    <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-grotesk tracking-tight">
                        {plan.name}
                      </h3>
                      <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 shrink-0">
                        {plan.icon}
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="mb-8">
                      <span className="text-xs font-mono text-white/40 block mb-1 uppercase tracking-wider">
                        {plan.priceSub}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-white font-grotesk tracking-tight">
                          {plan.price}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3.5 mb-8">
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
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

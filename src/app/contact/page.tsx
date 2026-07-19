"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import StartProjectForm from "@/components/StartProjectForm";

export default function ContactPage() {
  return (
    <div className="relative pt-44 pb-24 px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Background decoration glow */}
      <div className="absolute top-[10%] right-[-15%] w-[600px] h-[600px] bg-emerald-400/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] bg-teal-300/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-5">
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-sans uppercase tracking-widest font-bold bg-emerald-50 border border-emerald-200/50 px-4.5 py-1.5 rounded-full w-max mx-auto shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            Onboarding Queue
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Book Your Shopify <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Strategy Call</span>
          </h1>
          <p className="text-neutral-600 text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Stop wasting paid budgets sending traffic to low-conversion layouts. We design high-performing Shopify storefronts and optimize product pages to turn clicks into profitable customers.
          </p>
        </div>

        {/* Booking Form Card (Renders the unified StartProjectForm) */}
        <div className="max-w-3xl mx-auto w-full mt-4">
          <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-white/70 border border-neutral-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] backdrop-blur-xl relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/[0.02] blur-[80px] pointer-events-none" />
            <StartProjectForm />
          </div>
        </div>

      </div>
    </div>
  );
}

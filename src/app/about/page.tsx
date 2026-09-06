"use client";

import React from "react";
import { ArrowRight, Sparkles, BarChart3, Layers } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Subtle background decoration highlight */}
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-emerald-400/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] bg-teal-300/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-16 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-emerald-600">
            About SalePXL
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            We Build High-Converting <br />
            <span className="font-normal bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-sans">
              Shopify Stores That Create Product Value
            </span>
          </h1>
          <p className="text-neutral-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
            With 5 years of hands-on D2C engineering experience, we focus exclusively on e-commerce. Every team member brings deep store analytics expertise and custom UI/UX design to turn browsers into loyal buyers.
          </p>
        </div>

        <hr className="border-neutral-200/80" />

        {/* High UI/UX & E-commerce Only Core Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 font-sans text-left">
          <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-sm flex flex-col gap-4 hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 font-grotesk">High UI/UX & Custom Sections</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We design custom Liquid sections and visual product displays that highlight craftsmanship, build immediate buyer trust, and elevate perceived product value.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-sm flex flex-col gap-4 hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 font-grotesk">5+ Years Store Analytics Expertise</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Every engineer and designer on our team has hands-on e-commerce store analytics experience, optimizing conversion funnels, checkout drop-offs, and ROAS.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-sm flex flex-col gap-4 hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 font-grotesk">100% Exclusively E-Commerce</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We do not build corporate landing pages or generic sites. We build only high-converting Shopify e-commerce stores engineered for mobile speed and conversions.
            </p>
          </div>
        </section>

        <hr className="border-neutral-200/80" />

        {/* Minimal CTA Banner (Kept intact as requested) */}
        <section className="text-center py-8 sm:py-12 flex flex-col gap-6 sm:gap-8 items-center max-w-3xl mx-auto font-sans">
          <h2 className="text-2xl sm:text-4xl font-light font-grotesk tracking-tight leading-tight text-neutral-900">
            Let's design a high-converting store <br />
            for your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">brand.</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-lg leading-relaxed">
            Schedule a conversation with the SalePXL team to map out budget priorities, speed targets, and scale projections.
          </p>
          <a
            href="https://calendly.com/salepxl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 transition-all shadow-md group"
          >
            <span>Book Strategy Session</span>
            <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </section>

      </div>
    </div>
  );
}

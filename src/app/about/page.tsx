"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] text-neutral-900 pt-44 pb-24 relative overflow-hidden font-sans -mt-24">
      {/* Subtle background decoration highlight */}
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-emerald-400/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] bg-teal-300/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-24 relative z-10">
        
        {/* Editorial Page Header */}
        <section className="flex flex-col gap-6 max-w-3xl text-left">

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.1] text-neutral-900 font-grotesk">
            We build high-converting <br />
            <span className="font-normal bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Shopify storefronts.
            </span>
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mt-2">
            We are a dedicated Shopify development agency focusing exclusively on designing, coding, and optimizing e-commerce storefronts. We do only e-commerce setups.
          </p>
        </section>

        <hr className="border-neutral-200/80" />

        {/* Core Stats Row */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-12 font-sans py-2 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-4xl sm:text-5xl font-light font-grotesk tracking-tight text-neutral-900">5 Years</span>
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest font-semibold">ESTABLISHED HISTORY</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl sm:text-5xl font-light font-grotesk tracking-tight text-neutral-900">100%</span>
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest font-semibold">EXCLUSIVELY E-COMMERCE</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl sm:text-5xl font-light font-grotesk tracking-tight text-neutral-900">80+</span>
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest font-semibold">STORES LAUNCHED</span>
          </div>
        </section>

        <hr className="border-neutral-200/80" />

        {/* Narrative / Focus Areas Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start text-left">
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="text-xs text-emerald-700 font-mono uppercase tracking-[0.2em] font-bold">
              02 / Focus Areas
            </span>
            <h2 className="text-2xl sm:text-3xl font-light font-grotesk tracking-tight text-neutral-900">
              Only Ecom Setups.
            </h2>
          </div>
          
          <div className="md:col-span-8 flex flex-col gap-8 text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              We do not build corporate landing pages, directory lists, or generic websites. Over the past 5 years, we have aligned our entire engineering and design focus toward Shopify storefronts.
            </p>
            <p>
              Our core competencies include all-in-one e-commerce setups, Shopify store integrations, custom Shopify app builders, custom theme development, conversion-rate optimization (CRO), and advanced checkout optimization.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-neutral-100 mt-2">
              {[
                "Shopify Store Integrations",
                "Custom Theme Development",
                "Shopify App Builder Configs",
                "Custom Checkout Architectures",
                "Conversion Rate Optimization (CRO)",
                "Sub-second Performance Tuning"
              ].map((cap, index) => (
                <div key={index} className="flex items-center gap-2.5 text-xs text-neutral-800 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-neutral-200/80" />

        {/* Compliance and Office Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 font-sans text-left">
          
          {/* Conversion engineering details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-emerald-700 font-mono uppercase tracking-[0.2em] font-bold">
                03 / Performance &amp; CRO Standards
              </span>
              <h3 className="text-xl font-bold text-neutral-900 font-grotesk tracking-tight">Conversion-First Engineering</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-md">
              We don&apos;t just build templates — we engineer Shopify storefronts optimized for maximum speed, seamless user journeys, and higher average order values (AOV).
            </p>
            <div className="flex flex-col gap-2 border-t border-neutral-100 pt-4 font-mono text-[11px] text-neutral-500">
              <div className="flex justify-between">
                <span>Core Standards:</span>
                <span className="text-neutral-900 font-bold">Liquid &amp; Custom Apps</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile Load Speeds:</span>
                <span className="text-emerald-700 font-bold">Sub-1.5 Seconds</span>
              </div>
            </div>
          </div>

          {/* Location details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-emerald-700 font-mono uppercase tracking-[0.2em] font-bold">
                04 / Physical Office
              </span>
              <h3 className="text-xl font-bold text-neutral-900 font-grotesk tracking-tight">Dehradun, Uttarakhand</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-md">
              Operating from the foothills of the Himalayas in Dehradun, Uttarakhand, India. Our office handles development pipelines, speed optimizations, and storefront integrations for international clients.
            </p>
            <div className="flex flex-col gap-2 border-t border-neutral-100 pt-4 font-mono text-[11px] text-neutral-500">
              <div className="flex justify-between">
                <span>Coordinates:</span>
                <span className="text-neutral-900 font-bold">Dehradun, India</span>
              </div>
              <div className="flex justify-between">
                <span>Communications Hub:</span>
                <a href="tel:+919917780656" className="text-emerald-700 font-bold hover:underline">
                  +91 9917780656
                </a>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-neutral-200/80" />

        {/* Minimal CTA Banner */}
        <section className="text-center py-12 flex flex-col gap-8 items-center max-w-3xl mx-auto font-sans">
          <h2 className="text-2xl sm:text-4xl font-light font-grotesk tracking-tight leading-tight text-neutral-900">
            Let's design a high-converting store <br />
            for your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">brand.</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-lg leading-relaxed">
            Schedule a conversation with the SalePXL team to map out budget priorities, speed targets, and scale projections.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 transition-all shadow-md group"
          >
            <span>Book Strategy Session</span>
            <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </section>

      </div>
    </div>
  );
}

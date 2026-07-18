"use client";

import React from "react";
import Link from "next/link";
import { User, Shield, CheckCircle2, MapPin, Phone, Award, Clock, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative py-16 px-6 text-left">
      {/* Background decoration highlight */}
      <div className="absolute top-[15%] left-[-10%] w-[45%] h-[400px] bg-primary/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-10%] w-[40%] h-[400px] bg-primary/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
            Company Ledger
          </span>
          <h1 className="premium-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            About <span className="premium-highlight text-white">SalePXL</span>
          </h1>
          <p className="text-[#8e8e93] text-sm sm:text-base leading-relaxed">
            We build conversion-centric Shopify storefronts and scale them using paid media bidding models.
          </p>
        </div>

        {/* Founder Bio Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column Profile Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Apple styled founder glass card mockup */}
            <div className="relative w-full max-w-sm rounded-3xl glass-card overflow-hidden p-6 shadow-sm flex flex-col gap-6">
              <div className="aspect-square w-full rounded-2xl bg-gradient-to-tr from-white/[0.02] to-white/[0.06] border border-white/[0.05] flex items-center justify-center relative overflow-hidden group">
                <User className="w-20 h-20 text-[#8e8e93]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />
                
                {/* Float signature detail */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-base">Pankaj Singh</span>
                    <span className="text-[10px] text-primary font-mono tracking-widest uppercase font-bold">Founder & Growth Architect</span>
                  </div>
                </div>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="premium-hover-card p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
                  <div className="flex items-center gap-1 text-primary">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold font-mono">10+ Years</span>
                  </div>
                  <p className="text-[9px] text-[#8e8e93] uppercase tracking-wider mt-1 font-semibold">Experience</p>
                </div>
                <div className="premium-hover-card p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
                  <div className="flex items-center gap-1 text-primary">
                    <Award className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold font-mono">100+ Brands</span>
                  </div>
                  <p className="text-[9px] text-[#8e8e93] uppercase tracking-wider mt-1 font-semibold">Scaled</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Experience Details */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
              Founder Profile
            </span>
            <h2 className="premium-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pankaj <span className="premium-highlight text-white"><span className="light-gradient-text font-normal">Singh</span></span>
            </h2>
            
            <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
              A decade of experience engineering high-converting, sub-2.0s Shopify storefronts by blending custom UI/UX, CRO, and clean Liquid code.
            </p>

            <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
              Based in Uttarakhand, India, serving global D2C brands as a strategic technical architect for headless builds, migrations, and speed optimizations.
            </p>

            {/* Checklist of Core Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                "10+ Years Experience in ECommerce Strategy",
                "Custom Shopify Theme Development",
                "Advanced Shopify Liquid Optimization",
                "Shopify Speed & Performance Tuning",
                "API & ERP App Integration Architect",
                "Government Certified MSME Partner"
              ].map((cap, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-left">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-white font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corporate Integrity Section (MSME Registrations details) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Certificate Registration Card */}
          <div className="premium-hover-card p-8 rounded-3xl glass-card flex flex-col justify-between gap-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] text-[#8e8e93] font-mono uppercase tracking-widest font-semibold">Government Compliance</span>
                <h3 className="text-xl font-bold text-white mt-1">MSME Certified Enterprise</h3>
              </div>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                SalePXL is officially registered with the Ministry of Micro, Small and Medium Enterprises, Government of India. We Uphold transparent financial auditing and billing structures.
              </p>
            </div>

            {/* Registration Metadata */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.05] flex flex-col gap-2 font-mono text-xs text-left">
              <div className="flex justify-between">
                <span className="text-[#8e8e93]">Registered Name:</span>
                <span className="text-white font-semibold">SALEPXL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8e93]">Udyam Registration No:</span>
                <span className="text-primary font-semibold">UDYAM-UK-05-0097916</span>
              </div>
            </div>
          </div>

          {/* Location / Office Details */}
          <div className="premium-hover-card p-8 rounded-3xl glass-card flex flex-col justify-between gap-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] text-[#8e8e93] font-mono uppercase tracking-widest font-semibold">Location details</span>
                <h3 className="text-xl font-bold text-white mt-1">Dehradun, Uttarakhand</h3>
              </div>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                Operating from the serene landscapes of Dehradun, Uttarakhand, India. Our physical hub provides optimization and campaign consultation services globally.
              </p>
            </div>

            {/* Address Info Cards */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.05] flex flex-col gap-3 text-xs text-left">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-white">Dehradun, Uttarakhand, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+919917780656" className="text-white hover:text-primary transition-colors">
                  +91 9917780656
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="premium-hover-card p-8 md:p-12 rounded-3xl bg-[#0a0a0a] border border-white/[0.05] text-center flex flex-col gap-6 items-center">
          <h2 className="premium-heading text-xl md:text-2xl font-bold text-white max-w-xl">
            Let's <span className="light-gradient-text font-normal">design</span> a high-converting store for your <span className="premium-highlight text-white">brand.</span>
          </h2>
          <p className="text-xs text-[#8e8e93] max-w-lg leading-relaxed">
            Schedule a conversation with founder Pankaj Singh to map out budget priorities, speed targets, and scale projections.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white shadow-sm"
          >
            <span>Book Strategy Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

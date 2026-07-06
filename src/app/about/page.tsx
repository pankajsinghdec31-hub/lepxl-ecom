"use client";

import React from "react";
import Link from "next/link";
import { User, Shield, CheckCircle2, MapPin, Building2, Phone, Mail, Award, Clock, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative py-16 px-6">
      {/* Background decoration highlight */}
      <div className="absolute top-[15%] left-[-10%] w-[45%] h-[400px] bg-[#00AF56]/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-10%] w-[40%] h-[400px] bg-[#00AF56]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
            Company Ledger
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            About SalePXL
          </h1>
          <p className="text-[#8C8C8C] text-sm sm:text-base leading-relaxed">
            We are not just another digital ad agency. We build conversion-centric Shopify storefronts and scale them using paid media bidding models.
          </p>
        </div>

        {/* Founder Bio Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column Profile Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Apple styled founder glass card mockup */}
            <div className="relative w-full max-w-sm rounded-3xl bg-[#181818] border border-white/[0.08] overflow-hidden p-6 shadow-2xl flex flex-col gap-6">
              <div className="aspect-square w-full rounded-2xl bg-gradient-to-tr from-[#050505] to-[#111111] border border-white/[0.04] flex items-center justify-center relative overflow-hidden group">
                <User className="w-20 h-20 text-[#8C8C8C]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                
                {/* Float signature detail */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-base">Pankaj Singh</span>
                    <span className="text-[10px] text-[#00AF56] font-mono tracking-widest uppercase font-bold">Founder & Growth Architect</span>
                  </div>
                </div>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04]">
                  <div className="flex items-center gap-1 text-[#00AF56]">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold font-mono">10+ Years</span>
                  </div>
                  <p className="text-[9px] text-[#8C8C8C] uppercase tracking-wider mt-1 font-semibold">Experience</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04]">
                  <div className="flex items-center gap-1 text-[#00AF56]">
                    <Award className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold font-mono">100+ Brands</span>
                  </div>
                  <p className="text-[9px] text-[#8C8C8C] uppercase tracking-wider mt-1 font-semibold">Scaled</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Experience Details */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="text-xs text-[#00AF56] font-mono uppercase tracking-widest font-bold">
              Founder Profile
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pankaj Singh
            </h2>
            
            <p className="text-sm sm:text-base text-[#D7D7D7] leading-relaxed">
              With more than a decade of professional experience scaling eCommerce brands, Pankaj Singh established SalePXL to resolve the core efficiency drop in paid acquisition campaigns. Pankaj's core framework blends UI/UX speed optimization, customer buying psychology, and data attribution models.
            </p>

            <p className="text-xs sm:text-sm text-[#8C8C8C] leading-relaxed">
              Based in Dehradun, Uttarakhand, India, Pankaj acts as a strategic performance consultant to high-growth brands. He handles Meta Ads algorithms, Google Search structures, Performance Max campaign scaling, and custom Liquid script optimizations.
            </p>

            {/* Checklist of Core Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                "10+ Years Experience in ECommerce Strategy",
                "Certified Meta Performance Buying Expert",
                "Advanced Shopify Liquid Optimization",
                "Google Performance Max & Search Specialist",
                "Data Attribution & Server-Side Tracking Architect",
                "Government Certified MSME Partner"
              ].map((cap, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#00AF56] shrink-0" />
                  <span className="text-white font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corporate Integrity Section (MSME Registrations details) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Certificate Registration Card */}
          <div className="p-8 rounded-3xl bg-[#181818] border border-white/[0.06] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <span className="w-10 h-10 rounded-xl bg-[#00AF56]/10 text-[#00AF56] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] text-[#8C8C8C] font-mono uppercase tracking-widest">Government Compliance</span>
                <h3 className="text-xl font-bold text-white mt-1">MSME Certified Enterprise</h3>
              </div>
              <p className="text-xs text-[#8C8C8C] leading-relaxed">
                SalePXL is officially registered with the Ministry of Micro, Small and Medium Enterprises, Government of India. We uphold transparent financial auditing and billing structures.
              </p>
            </div>

            {/* Registration Metadata */}
            <div className="p-4 rounded-xl bg-black/45 border border-white/[0.04] flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#8C8C8C]">Registered Name:</span>
                <span className="text-white font-semibold">SALEPXL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8C8C]">Udyam Registration No:</span>
                <span className="text-[#00AF56] font-semibold">UDYAM-UK-05-0097916</span>
              </div>
            </div>
          </div>

          {/* Location / Office Details */}
          <div className="p-8 rounded-3xl bg-[#181818] border border-white/[0.06] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <span className="w-10 h-10 rounded-xl bg-[#00AF56]/10 text-[#00AF56] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] text-[#8C8C8C] font-mono uppercase tracking-widest">Location details</span>
                <h3 className="text-xl font-bold text-white mt-1">Dehradun, Uttarakhand</h3>
              </div>
              <p className="text-xs text-[#8C8C8C] leading-relaxed">
                Operating from the serene landscapes of Dehradun, Uttarakhand, India. Our physical hub provides optimization and campaign consultation services globally.
              </p>
            </div>

            {/* Address Info Cards */}
            <div className="p-4 rounded-xl bg-black/45 border border-white/[0.04] flex flex-col gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#00AF56] shrink-0" />
                <span className="text-[#D7D7D7]">Dehradun, Uttarakhand, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00AF56] shrink-0" />
                <a href="tel:+919917780656" className="text-[#D7D7D7] hover:text-white transition-colors">
                  +91 9917780656
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#111111] border border-white/[0.08] text-center flex flex-col gap-6 items-center">
          <h2 className="text-xl md:text-2xl font-bold text-white max-w-xl">
            Let's design a high-converting store for your brand.
          </h2>
          <p className="text-xs text-[#8C8C8C] max-w-lg leading-relaxed">
            Schedule a conversation with founder Pankaj Singh to map out budget priorities, speed targets, and scale projections.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#00AF56] hover:bg-[#00AF56]/90 transition-all hover:shadow-[0_0_20px_rgba(0,175,86,0.3)]"
          >
            <span>Book Strategy Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

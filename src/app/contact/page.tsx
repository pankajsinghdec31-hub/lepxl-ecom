"use client";

import React, { useState } from "react";
import { Phone, MapPin, Mail, ArrowRight, ShieldCheck, Check, Sparkles, Building, ShoppingBag, TrendingUp, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    brandName: "",
    projectCategory: "new-store",
    projectBudget: "1500-3500", // pre-select a logical default
    revenueBracket: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      brandName: "",
      projectCategory: "new-store",
      projectBudget: "1500-3500",
      revenueBracket: "",
      name: "",
      phone: "",
      email: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="relative py-16 px-6">
      {/* Background decoration glow */}
      <div className="absolute top-[10%] right-[-10%] w-[45%] h-[400px] bg-primary/[0.02] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[400px] bg-primary/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-xs text-primary font-mono uppercase tracking-widest font-bold">
            Onboarding Queue
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight">
            Book Your Shopify Strategy Call
          </h1>
          <p className="text-[#4a4a4a] text-sm sm:text-base leading-relaxed">
            Stop wasting paid budgets sending traffic to low-conversion layouts. We design high-performing Shopify storefronts and optimize product pages to turn clicks into profitable customers.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
          
          {/* Left Column Information Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] uppercase tracking-wider">
                Direct Contact Metrics
              </h2>
              
              {/* Phone card */}
              <div className="p-6 rounded-2xl bg-bg-secondary border border-black/[0.05] flex items-start gap-4 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#4a4a4a] font-mono uppercase tracking-wider">Telephony Hotline</span>
                  <a href="tel:+919917780656" className="text-[#1a1a1a] hover:text-primary font-bold text-base mt-0.5 transition-colors">
                    +91 9917780656
                  </a>
                  <span className="text-xs text-[#4a4a4a] mt-1">Available 10 AM - 7 PM IST</span>
                </div>
              </div>

              {/* Email card */}
              <div className="p-6 rounded-2xl bg-bg-secondary border border-black/[0.05] flex items-start gap-4 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#4a4a4a] font-mono uppercase tracking-wider">Electronic Mail</span>
                  <a href="mailto:growth@salepxl.com" className="text-[#1a1a1a] hover:text-primary font-bold text-base mt-0.5 transition-colors">
                    growth@salepxl.com
                  </a>
                  <span className="text-xs text-[#4a4a4a] mt-1">Response window: Under 12 Hours</span>
                </div>
              </div>

              {/* Office Location */}
              <div className="p-6 rounded-2xl bg-bg-secondary border border-black/[0.05] flex items-start gap-4 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#4a4a4a] font-mono uppercase tracking-wider">Physical Hub</span>
                  <span className="text-[#1a1a1a] font-bold text-base mt-0.5">
                    Dehradun, Uttarakhand, India
                  </span>
                  <span className="text-xs text-[#4a4a4a] mt-1">Himalayan Innovation Hub</span>
                </div>
              </div>
            </div>

            {/* Corporate registered information widget */}
            <div className="p-6 rounded-2xl bg-bg-secondary border border-black/[0.05] flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#4a4a4a] uppercase tracking-wider font-semibold">Government Certified MSME</span>
                  <span className="text-xs font-bold text-[#1a1a1a]">SALEPXL ENTERPRISE</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white border border-black/[0.05] text-[10px] font-mono text-[#4a4a4a] flex justify-between items-center">
                <span>Udyam Reg. No:</span>
                <span className="text-[#1a1a1a] font-bold">UDYAM-UK-05-0097916</span>
              </div>
            </div>

          </div>

          {/* Right Column Booking Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-black/[0.05] relative overflow-hidden flex flex-col justify-center shadow-sm">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs text-[#1a1a1a] font-bold uppercase tracking-wider font-mono">Strategy Intake Sheet</span>
                  </div>

                  {/* High Performance Shopify Statement Banner */}
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-xs leading-relaxed flex gap-3 text-[#4a4a4a]">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-[#1a1a1a] block mb-0.5">High-Performance Guarantee:</strong>
                      We design & build <span className="text-primary font-semibold font-bold">only high-performing Shopify stores</span> with speed-accelerated, conversion-focused product pages that are mathematically optimized to increase your ROAS.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Brand Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#4a4a4a] uppercase tracking-wider font-semibold">Brand / Shop Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Wheels Co"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        className="bg-white border border-black/[0.1] text-[#1a1a1a] text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    {/* Contact Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#4a4a4a] uppercase tracking-wider font-semibold">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pankaj Singh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white border border-black/[0.1] text-[#1a1a1a] text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#4a4a4a] uppercase tracking-wider font-semibold">Phone Number (WhatsApp)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +91 9917780656"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white border border-black/[0.1] text-[#1a1a1a] text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#4a4a4a] uppercase tracking-wider font-semibold">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. growth@salepxl.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white border border-black/[0.1] text-[#1a1a1a] text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Category Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-[#4a4a4a] uppercase tracking-wider font-semibold">Project Category</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* New Store card */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, projectCategory: "new-store" })}
                        className={`p-4 rounded-xl border text-left flex flex-col gap-2.5 transition-all relative overflow-hidden cursor-pointer ${
                          formData.projectCategory === "new-store"
                            ? "bg-primary/10 border-primary text-[#1a1a1a]"
                            : "bg-white border-black/[0.1] text-[#4a4a4a] hover:border-black/20 hover:text-[#1a1a1a]"
                        }`}
                      >
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="text-xs font-bold text-[#1a1a1a]">New Store</h4>
                          <p className="text-[10px] leading-snug mt-1 opacity-80">Full high-performing custom Shopify setup.</p>
                        </div>
                      </button>

                      {/* CRO Revamp card */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, projectCategory: "cro-revamp" })}
                        className={`p-4 rounded-xl border text-left flex flex-col gap-2.5 transition-all relative overflow-hidden cursor-pointer ${
                          formData.projectCategory === "cro-revamp"
                            ? "bg-primary/10 border-primary text-[#1a1a1a]"
                            : "bg-white border-black/[0.1] text-[#4a4a4a] hover:border-black/20 hover:text-[#1a1a1a]"
                        }`}
                      >
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="text-xs font-bold text-[#1a1a1a]">Store CRO Revamp</h4>
                          <p className="text-[10px] leading-snug mt-1 opacity-80">Optimize product page speed & conversion rate.</p>
                        </div>
                      </button>

                      {/* Dropshipping Store card */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, projectCategory: "dropshipping-store" })}
                        className={`p-4 rounded-xl border text-left flex flex-col gap-2.5 transition-all relative overflow-hidden cursor-pointer ${
                          formData.projectCategory === "dropshipping-store"
                            ? "bg-primary/10 border-primary text-[#1a1a1a]"
                            : "bg-white border-black/[0.1] text-[#4a4a4a] hover:border-black/20 hover:text-[#1a1a1a]"
                        }`}
                      >
                        <Rocket className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="text-xs font-bold text-[#1a1a1a]">Dropshipping Store</h4>
                          <p className="text-[10px] leading-snug mt-1 opacity-80">Scale-ready layout pre-configured to sell.</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Project Budget Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-[#4a4a4a] uppercase tracking-wider font-semibold">Estimated Project Budget</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { value: "under-1500", label: "Under $1,500", detail: "Under ₹1.2L" },
                        { value: "1500-3500", label: "$1,500 - $3,500", detail: "₹1.2L - ₹3L" },
                        { value: "3500-7500", label: "$3,500 - $7,500", detail: "₹3L - ₹6L" },
                        { value: "7500-plus", label: "$7,500+", detail: "₹6L+" },
                      ].map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectBudget: item.value })}
                          className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                            formData.projectBudget === item.value
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-white border-black/[0.1] text-[#4a4a4a] hover:border-black/20 hover:text-[#1a1a1a]"
                          }`}
                        >
                          <span className="text-xs font-bold">{item.label}</span>
                          <span className="text-[9px] opacity-80 mt-0.5">{item.detail}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Monthly Shopify Revenue */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#4a4a4a] uppercase tracking-wider font-semibold">Shopify Monthly Revenue</label>
                      <select
                        required
                        value={formData.revenueBracket}
                        onChange={(e) => setFormData({ ...formData, revenueBracket: e.target.value })}
                        className="bg-white border border-black/[0.1] text-[#1a1a1a] text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                      >
                        <option value="">Select Range</option>
                        <option value="under-1">Under ₹1 Lakh</option>
                        <option value="1-5">₹1 Lakh - ₹5 Lakhs</option>
                        <option value="5-15">₹5 Lakhs - ₹15 Lakhs</option>
                        <option value="15-plus">₹15 Lakhs+ / Month</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Detail */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-[#4a4a4a] uppercase tracking-wider font-semibold">Tell us about your product or growth targets</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. We want to scale our conversion rate and prepare a brand-new storefront launch..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white border border-black/[0.1] text-[#1a1a1a] text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-[#2a6350] disabled:opacity-50 transition-all font-bold cursor-pointer hover:shadow-[0_8px_24px_rgba(55,126,98,0.25)]"
                  >
                    {isSubmitting ? (
                      <span>Queueing Booking Request...</span>
                    ) : (
                      <>
                        <span>Submit Strategy Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center flex flex-col gap-5 py-8 items-center"
                >
                  <span className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 text-primary flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(55,126,98,0.25)] animate-bounce">
                    <Check className="w-6 h-6" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-[#1a1a1a]">Strategy Request Queued</h3>
                    <p className="text-xs text-[#4a4a4a] max-w-sm mx-auto leading-relaxed">
                      Thank you for submitting, <span className="text-[#1a1a1a] font-semibold">{formData.name}</span>. We will analyze <span className="text-[#1a1a1a] font-semibold">{formData.brandName}</span>'s parameters for a <span className="text-primary font-bold">
                        {formData.projectCategory === "new-store" && "New Shopify Store Build"}
                        {formData.projectCategory === "cro-revamp" && "Shopify CRO Revamp"}
                        {formData.projectCategory === "dropshipping-store" && "Dropshipping Store Setup"}
                      </span> and contact you within 12 hours.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-5 py-2.5 rounded-xl border border-black/[0.08] text-[10px] font-bold text-[#4a4a4a] uppercase tracking-wider hover:bg-black/[0.02] transition-all bg-white"
                  >
                    Schedule Another Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}


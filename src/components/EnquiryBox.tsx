"use client";

import React, { useState } from "react";
import { Check, ArrowRight, ChevronLeft, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnquiryBox() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brandName: "",
    projectCategory: "",
    platform: "Shopify",
    productsCount: "",
    timeline: "",
    budgetRange: "",
    projectDetails: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Full Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Business Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    } else if (currentStep === 2) {
      if (!formData.projectCategory) newErrors.projectCategory = "Please select what you need";
      if (!formData.productsCount) newErrors.productsCount = "Please select the number of products";
    } else if (currentStep === 3) {
      if (!formData.timeline) newErrors.timeline = "Please select a timeline";
      if (!formData.budgetRange) newErrors.budgetRange = "Please select your budget";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      brandName: "",
      projectCategory: "",
      platform: "Shopify",
      productsCount: "",
      timeline: "",
      budgetRange: "",
      projectDetails: ""
    });
    setStep(1);
    setSubmitted(false);
  };

  const inputClasses = (hasError: boolean) =>
    `w-full bg-white/[0.02] border ${
      hasError ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-primary"
    } text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 ${
      hasError ? "focus:ring-red-500/20" : "focus:ring-primary/20"
    } transition-all placeholder:text-[#7a7a7a]`;

  const selectClasses = (hasError: boolean) =>
    `w-full bg-white/[0.02] border ${
      hasError ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-primary"
    } text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 ${
      hasError ? "focus:ring-red-500/20" : "focus:ring-primary/20"
    } transition-all appearance-none cursor-pointer pr-10`;

  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl glass-card shadow-2xl relative overflow-hidden flex flex-col justify-center">
      {/* Absolute glow backgrounds */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/2 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col text-left">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Tell Us About Your Project</h3>
              <p className="text-xs text-[#8e8e93] mt-1 font-medium">Free Shopify strategy assessment</p>
            </div>

            {/* Steps Progress Tracker */}
            <div className="flex items-center justify-between gap-1 mb-8">
              {/* Step 1 */}
              <div
                onClick={() => step > 1 && setStep(1)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-wider font-bold transition-all ${
                  step > 1 ? "cursor-pointer bg-white/[0.02]" : "cursor-default"
                } ${
                  step === 1
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-white/[0.05] text-[#8e8e93]"
                }`}
              >
                {step > 1 ? (
                  <Check className="w-3 h-3 text-primary shrink-0" />
                ) : (
                  <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] shrink-0 ${step === 1 ? "bg-primary text-white" : "bg-[#8e8e93]/20 text-[#8e8e93]"}`}>
                    1
                  </span>
                )}
                <span>Contact</span>
              </div>

              {/* Line divider */}
              <div className="flex-grow h-[1px] bg-white/[0.05] min-w-[10px]" />

              {/* Step 2 */}
              <div
                onClick={() => step > 2 && setStep(2)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-wider font-bold transition-all ${
                  step > 2 ? "cursor-pointer bg-white/[0.02]" : "cursor-default"
                } ${
                  step === 2
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-white/[0.05] text-[#8e8e93]"
                }`}
              >
                {step > 2 ? (
                  <Check className="w-3 h-3 text-primary shrink-0" />
                ) : (
                  <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] shrink-0 ${step === 2 ? "bg-primary text-white" : "bg-[#8e8e93]/20 text-[#8e8e93]"}`}>
                    2
                  </span>
                )}
                <span>Project</span>
              </div>

              {/* Line divider */}
              <div className="flex-grow h-[1px] bg-white/[0.05] min-w-[10px]" />

              {/* Step 3 */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-default ${
                  step === 3
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-white/[0.05] text-[#8e8e93]"
                }`}
              >
                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] shrink-0 ${step === 3 ? "bg-primary text-white" : "bg-[#8e8e93]/20 text-[#8e8e93]"}`}>
                  3
                </span>
                <span>Timeline</span>
              </div>
            </div>

            {/* Step Content Rendering */}
            <div className="min-h-[220px] flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Name Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Pankaj Singh"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        className={inputClasses(!!errors.name)}
                      />
                      {errors.name && <span className="text-[10px] text-red-500 font-medium">{errors.name}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Business Email *</label>
                      <input
                        type="email"
                        placeholder="e.g. growth@salepxl.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        className={inputClasses(!!errors.email)}
                      />
                      {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email}</span>}
                    </div>

                    {/* Phone Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Phone Number *</label>
                      <input
                        type="text"
                        placeholder="e.g. +91 9917780656"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        className={inputClasses(!!errors.phone)}
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 font-medium">{errors.phone}</span>}
                    </div>

                    {/* Brand Name Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Brand Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. The Wheels Co"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        className={inputClasses(false)}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-4"
                  >
                    {/* What do you need? */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">What do you need? *</label>
                      <div className="relative">
                        <select
                          value={formData.projectCategory}
                          onChange={(e) => {
                            setFormData({ ...formData, projectCategory: e.target.value });
                            if (errors.projectCategory) setErrors({ ...errors, projectCategory: "" });
                          }}
                          className={selectClasses(!!errors.projectCategory)}
                        >
                          <option value="" className="bg-[#121214] text-white">Select Option</option>
                          <option value="New Shopify Store" className="bg-[#121214] text-white">New Shopify Store</option>
                          <option value="Shopify Store Redesign" className="bg-[#121214] text-white">Shopify Store Redesign</option>
                          <option value="CRO Optimization" className="bg-[#121214] text-white">CRO Optimization</option>
                          <option value="Dropshipping Store" className="bg-[#121214] text-white">Dropshipping Store</option>
                          <option value="Custom Shopify Development" className="bg-[#121214] text-white">Custom Shopify Development</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93] pointer-events-none" />
                      </div>
                      {errors.projectCategory && <span className="text-[10px] text-red-500 font-medium">{errors.projectCategory}</span>}
                    </div>

                    {/* Platform Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Platform</label>
                      <input
                        type="text"
                        value={formData.platform}
                        readOnly
                        disabled
                        className="w-full bg-white/[0.02] border border-white/[0.08] text-[#8e8e93] text-xs rounded-xl px-4 py-3 cursor-not-allowed select-none"
                      />
                    </div>

                    {/* Number of Products */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Number of Products *</label>
                      <div className="relative">
                        <select
                          value={formData.productsCount}
                          onChange={(e) => {
                            setFormData({ ...formData, productsCount: e.target.value });
                            if (errors.productsCount) setErrors({ ...errors, productsCount: "" });
                          }}
                          className={selectClasses(!!errors.productsCount)}
                        >
                          <option value="" className="bg-[#121214] text-white">Select Range</option>
                          <option value="1–50" className="bg-[#121214] text-white">1–50</option>
                          <option value="51–200" className="bg-[#121214] text-white">51–200</option>
                          <option value="201–500" className="bg-[#121214] text-white">201–500</option>
                          <option value="500+" className="bg-[#121214] text-white">500+</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93] pointer-events-none" />
                      </div>
                      {errors.productsCount && <span className="text-[10px] text-red-500 font-medium">{errors.productsCount}</span>}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Timeline Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">When do you want to start? *</label>
                      <div className="relative">
                        <select
                          value={formData.timeline}
                          onChange={(e) => {
                            setFormData({ ...formData, timeline: e.target.value });
                            if (errors.timeline) setErrors({ ...errors, timeline: "" });
                          }}
                          className={selectClasses(!!errors.timeline)}
                        >
                          <option value="" className="bg-[#121214] text-white">Select Timeline</option>
                          <option value="ASAP" className="bg-[#121214] text-white">ASAP</option>
                          <option value="Within 1 Week" className="bg-[#121214] text-white">Within 1 Week</option>
                          <option value="Within 2 Weeks" className="bg-[#121214] text-white">Within 2 Weeks</option>
                          <option value="Within 1 Month" className="bg-[#121214] text-white">Within 1 Month</option>
                          <option value="Just Exploring" className="bg-[#121214] text-white">Just Exploring</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93] pointer-events-none" />
                      </div>
                      {errors.timeline && <span className="text-[10px] text-red-500 font-medium">{errors.timeline}</span>}
                    </div>

                    {/* Budget Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Budget *</label>
                      <div className="relative">
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => {
                            setFormData({ ...formData, budgetRange: e.target.value });
                            if (errors.budgetRange) setErrors({ ...errors, budgetRange: "" });
                          }}
                          className={selectClasses(!!errors.budgetRange)}
                        >
                          <option value="" className="bg-[#121214] text-white">Select Budget Range</option>
                          <option value="Under ₹25,000" className="bg-[#121214] text-white">Under ₹25,000</option>
                          <option value="₹25,000–₹50,000" className="bg-[#121214] text-white">₹25,000–₹50,000</option>
                          <option value="Above ₹50,000" className="bg-[#121214] text-white">Above ₹50,000</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93] pointer-events-none" />
                      </div>
                      {errors.budgetRange && <span className="text-[10px] text-red-500 font-medium">{errors.budgetRange}</span>}
                    </div>

                    {/* Project Details Textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-semibold">Project details</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your business, products, design preferences, competitors, or any custom functionality you need."
                        value={formData.projectDetails}
                        onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                        className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-primary text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-[#7a7a7a] resize-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.05]">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-grow flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 text-xs font-bold text-[#8e8e93] uppercase tracking-wider hover:bg-white/[0.02] transition-all cursor-pointer bg-transparent"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-grow flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-primary hover:bg-[#2a6350] text-xs font-bold text-white uppercase tracking-wider transition-all cursor-pointer shadow-[0_8px_24px_rgba(16,185,129,0.15)]"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-grow flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-primary hover:bg-[#2a6350] disabled:opacity-50 text-xs font-bold text-white uppercase tracking-wider transition-all cursor-pointer shadow-[0_8px_24px_rgba(16,185,129,0.15)]"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <span>Get Free Consultation</span>
                  )}
                </button>
              )}
            </div>
          </form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-center flex flex-col gap-5 py-8 items-center"
          >
            <span className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 text-primary flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(16,185,129,0.15)] animate-pulse">
              <Check className="w-7 h-7" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-white">Project Details Submitted</h3>
              <p className="text-xs text-[#8e8e93] max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. We have received your project details for <span className="text-white font-semibold">{formData.brandName || "your brand"}</span>. A Shopify strategist from SalePixel will review your request and get back to you within 12 hours.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 text-xs font-bold text-[#8e8e93] uppercase tracking-wider hover:bg-white/[0.02] transition-all cursor-pointer"
            >
              Submit Another Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

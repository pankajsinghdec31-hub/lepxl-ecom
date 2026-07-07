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
    currentPlatform: "",
    projectCategory: "",
    timeline: "",
    budgetRange: "",
    projectDetails: "",
    hearAboutUs: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    } else if (currentStep === 2) {
      if (!formData.brandName.trim()) newErrors.brandName = "Brand name is required";
      if (!formData.projectCategory) newErrors.projectCategory = "Category is required";
    } else if (currentStep === 3) {
      if (!formData.timeline) newErrors.timeline = "Timeline is required";
      if (!formData.budgetRange) newErrors.budgetRange = "Budget is required";
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
      currentPlatform: "",
      projectCategory: "",
      timeline: "",
      budgetRange: "",
      projectDetails: "",
      hearAboutUs: ""
    });
    setStep(1);
    setSubmitted(false);
  };

  const inputClasses = (hasError: boolean) =>
    `w-full bg-[#111111] border ${
      hasError ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-[#00AF56]"
    } text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 ${
      hasError ? "focus:ring-red-500/20" : "focus:ring-[#00AF56]/20"
    } transition-all placeholder:text-[#4A4A4A]`;

  const selectClasses = (hasError: boolean) =>
    `w-full bg-[#111111] border ${
      hasError ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-[#00AF56]"
    } text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 ${
      hasError ? "focus:ring-red-500/20" : "focus:ring-[#00AF56]/20"
    } transition-all appearance-none cursor-pointer pr-10`;

  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl bg-[#141414] border border-white/[0.08] shadow-2xl relative overflow-hidden flex flex-col justify-center">
      {/* Absolute glow backgrounds */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00AF56]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col text-left">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Get Migration Quote</h3>
              <p className="text-xs text-[#8C8C8C] mt-1">Free BigCommerce migration assessment</p>
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
                    ? "bg-[#00AF56]/10 border-[#00AF56] text-[#00AF56]"
                    : "border-white/[0.05] text-[#8C8C8C]"
                }`}
              >
                {step > 1 ? (
                  <Check className="w-3 h-3 text-[#00AF56] shrink-0" />
                ) : (
                  <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] shrink-0 ${step === 1 ? "bg-[#00AF56] text-black" : "bg-[#8C8C8C]/20 text-[#8C8C8C]"}`}>
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
                    ? "bg-[#00AF56]/10 border-[#00AF56] text-[#00AF56]"
                    : "border-white/[0.05] text-[#8C8C8C]"
                }`}
              >
                {step > 2 ? (
                  <Check className="w-3 h-3 text-[#00AF56] shrink-0" />
                ) : (
                  <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] shrink-0 ${step === 2 ? "bg-[#00AF56] text-black" : "bg-[#8C8C8C]/20 text-[#8C8C8C]"}`}>
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
                    ? "bg-[#00AF56]/10 border-[#00AF56] text-[#00AF56]"
                    : "border-white/[0.05] text-[#8C8C8C]"
                }`}
              >
                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] shrink-0 ${step === 3 ? "bg-[#00AF56] text-black" : "bg-[#8C8C8C]/20 text-[#8C8C8C]"}`}>
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
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Your Name *</label>
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
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Email Address *</label>
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
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
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
                    {/* Brand Name Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Brand / Shop Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. The Wheels Co"
                        value={formData.brandName}
                        onChange={(e) => {
                          setFormData({ ...formData, brandName: e.target.value });
                          if (errors.brandName) setErrors({ ...errors, brandName: "" });
                        }}
                        className={inputClasses(!!errors.brandName)}
                      />
                      {errors.brandName && <span className="text-[10px] text-red-500 font-medium">{errors.brandName}</span>}
                    </div>

                    {/* Current Platform Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Current Platform</label>
                      <div className="relative">
                        <select
                          value={formData.currentPlatform}
                          onChange={(e) => setFormData({ ...formData, currentPlatform: e.target.value })}
                          className={selectClasses(false)}
                        >
                          <option value="">Select Platform</option>
                          <option value="bigcommerce">BigCommerce</option>
                          <option value="woocommerce">WooCommerce</option>
                          <option value="magento">Magento</option>
                          <option value="custom">Custom HTML/JS</option>
                          <option value="shopify">Shopify (Optimizing Existing)</option>
                          <option value="none">None / New Brand</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C8C] pointer-events-none" />
                      </div>
                    </div>

                    {/* Project Category Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Project Category *</label>
                      <div className="relative">
                        <select
                          value={formData.projectCategory}
                          onChange={(e) => {
                            setFormData({ ...formData, projectCategory: e.target.value });
                            if (errors.projectCategory) setErrors({ ...errors, projectCategory: "" });
                          }}
                          className={selectClasses(!!errors.projectCategory)}
                        >
                          <option value="">Select Category</option>
                          <option value="migration">Shopify Migration</option>
                          <option value="new-store">New Store Build</option>
                          <option value="cro-revamp">CRO & Speed Optimization</option>
                          <option value="custom-integrations">Custom App & Integrations</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C8C] pointer-events-none" />
                      </div>
                      {errors.projectCategory && <span className="text-[10px] text-red-500 font-medium">{errors.projectCategory}</span>}
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
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Timeline *</label>
                      <div className="relative">
                        <select
                          value={formData.timeline}
                          onChange={(e) => {
                            setFormData({ ...formData, timeline: e.target.value });
                            if (errors.timeline) setErrors({ ...errors, timeline: "" });
                          }}
                          className={selectClasses(!!errors.timeline)}
                        >
                          <option value="">When do you want to start?</option>
                          <option value="immediately">Immediately</option>
                          <option value="1-2-weeks">In 1-2 weeks</option>
                          <option value="1-month">In 1 month</option>
                          <option value="exploring">Just exploring options</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C8C] pointer-events-none" />
                      </div>
                      {errors.timeline && <span className="text-[10px] text-red-500 font-medium">{errors.timeline}</span>}
                    </div>

                    {/* Budget Range Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Budget Range *</label>
                      <div className="relative">
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => {
                            setFormData({ ...formData, budgetRange: e.target.value });
                            if (errors.budgetRange) setErrors({ ...errors, budgetRange: "" });
                          }}
                          className={selectClasses(!!errors.budgetRange)}
                        >
                          <option value="">Select your budget</option>
                          <option value="under-1500">Under $1,500 (Under ₹1.2L)</option>
                          <option value="1500-3500">$1,500 - $3,500 (₹1.2L - ₹3L)</option>
                          <option value="3500-7500">$3,500 - $7,500 (₹3L - ₹6L)</option>
                          <option value="7500-plus">$7,500+ (₹6L+)</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C8C] pointer-events-none" />
                      </div>
                      {errors.budgetRange && <span className="text-[10px] text-red-500 font-medium">{errors.budgetRange}</span>}
                    </div>

                    {/* Project Details Textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">Tell us more about your project</label>
                      <textarea
                        rows={2}
                        placeholder="Current challenges, goals, specific requirements..."
                        value={formData.projectDetails}
                        onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                        className="w-full bg-[#111111] border border-white/[0.08] focus:border-[#00AF56] text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#00AF56]/20 transition-all placeholder:text-[#4A4A4A] resize-none"
                      />
                    </div>

                    {/* How did you hear about us select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-semibold">How did you hear about us?</label>
                      <div className="relative">
                        <select
                          value={formData.hearAboutUs}
                          onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
                          className={selectClasses(false)}
                        >
                          <option value="">Select</option>
                          <option value="google">Google Search</option>
                          <option value="instagram">Meta / Instagram Ads</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="referral">Word of Mouth / Referral</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C8C] pointer-events-none" />
                      </div>
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
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 text-xs font-bold text-white uppercase tracking-wider hover:bg-white/[0.02] transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#00AF56] hover:bg-[#00AF56]/90 text-xs font-bold text-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(0,175,86,0.15)]"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#00AF56] hover:bg-[#00AF56]/90 disabled:opacity-50 text-xs font-bold text-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(0,175,86,0.25)]"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Get Free Consultation</span>
                    </>
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
            <span className="w-16 h-16 rounded-full bg-[#00AF56]/15 border border-[#00AF56]/30 text-[#00AF56] flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(0,175,86,0.25)] animate-pulse">
              <Check className="w-7 h-7" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-white">Migration Quote Request Queued</h3>
              <p className="text-xs text-[#8C8C8C] max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. We will analyze your brand parameters for <span className="text-white font-semibold">{formData.brandName}</span> and design a custom Shopify migration plan for you. We will contact you within 12 hours.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-3 rounded-xl border border-white/[0.08] hover:border-white/20 text-xs font-bold text-white uppercase tracking-wider hover:bg-white/[0.02] transition-all cursor-pointer"
            >
              Submit Another Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

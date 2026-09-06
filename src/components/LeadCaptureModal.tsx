"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Shield, Lock, Star, PhoneCall, Sparkles } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBudget?: string;
  defaultPlanName?: string;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  defaultBudget = "Under ₹29,999/-",
  defaultPlanName
}: LeadCaptureModalProps) {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(["New Shopify Store Build"]);
  const [brandCategory, setBrandCategory] = useState("Fashion & Apparel");
  const [storeUrl, setStoreUrl] = useState("");
  const [budget, setBudget] = useState(defaultBudget);
  const [authorized, setAuthorized] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (defaultBudget) {
      setBudget(defaultBudget);
    }
  }, [defaultBudget]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      setSelectedServices(selectedServices.filter((s) => s !== svc));
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !businessEmail.trim() || !mobileNumber.trim()) {
      setErrorMsg("Please fill in your name, email, and mobile number.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    const payload = {
      name: fullName,
      email: businessEmail,
      phone: mobileNumber,
      brandCategory: brandCategory || "General E-commerce",
      services: selectedServices.join(", "),
      storeUrl: storeUrl || "N/A",
      budgetRange: budget,
      planSelected: defaultPlanName || "General Enquiry",
      source: "pricing-connect-modal"
    };

    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (_) {
      // Fail silently
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }

    // Track Meta Pixel Lead
    try {
      const fbq = (window as any)?.fbq;
      if (typeof fbq === "function") {
        fbq("track", "Lead", {
          content_name: "Pricing Popup Connect",
          value: budget.includes("79,999") ? 80000 : 30000,
          currency: "INR"
        });
      }
    } catch (_) {}
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    setErrorMsg("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-[#0a0f14] border border-white/15 rounded-[28px] sm:rounded-[36px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 text-white my-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            /* SUCCESS STATE */
            <div className="p-8 sm:p-14 text-center flex flex-col items-center justify-center gap-5 min-h-[440px]">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-light text-white font-grotesk">
                Request Received <span className="text-emerald-400 font-normal">Successfully!</span>
              </h3>
              <p className="text-white/70 text-sm sm:text-base max-w-lg leading-relaxed font-sans">
                Thank you, <strong className="text-white">{fullName}</strong>. Our Shopify strategy specialists will review your requirements and get back to you within <span className="text-emerald-400 font-bold">2 hours</span>.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                <a
                  href="https://calendly.com/salepxl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-emerald-400 text-black text-sm font-bold uppercase tracking-wider hover:bg-emerald-300 transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Strategy Call on Calendly</span>
                </a>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-6 py-3.5 rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-all cursor-pointer border border-white/15"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE: LEFT & RIGHT COLUMNS */
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* LEFT COLUMN: BRAND DETAILS & TRUST INFO */}
              <div className="lg:col-span-5 p-6 sm:p-10 bg-gradient-to-br from-[#0c141d] to-[#060a0e] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-light text-white font-grotesk leading-snug">
                    Launch a <span className="text-emerald-400 font-normal">High-Growth</span> <br />
                    Shopify Store
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed mt-3">
                    Tell us brief about your project needs & our team will get back to you within <span className="text-white font-semibold">2 hours</span> having a clear plan to build / scale your store.
                  </p>

                  <div className="space-y-2.5 mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2.5 text-xs text-white/80 font-sans">
                      <Star className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
                      <span>Trusted by 200+ growing brands</span>
                    </div>
                    <a
                      href="https://calendly.com/salepxl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-xs text-emerald-400 hover:text-emerald-300 font-sans font-medium transition-colors"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Free strategy consultation (Calendly)</span>
                    </a>
                  </div>
                </div>

                {/* Footer Brand Logo */}
                <div className="pt-6 border-t border-white/10">
                  <img
                    src="/logo.png"
                    alt="SalePXL Logo"
                    className="h-7 w-auto object-contain invert hue-rotate-180"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE FORM */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-5">
                
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans">
                    {errorMsg}
                  </div>
                )}

                {/* Top Row Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name*"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center gap-1 text-xs font-mono text-white/60 select-none border-r border-white/15 pr-2">
                      <span>🇮🇳 +91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/15 rounded-xl pl-20 pr-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Business Email */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Business Email*"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                {/* Services Checkboxes */}
                <div>
                  <label className="text-xs font-sans text-white/70 block mb-2 font-medium">
                    Which service(s) you are interested in? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "New Shopify Store Build",
                      "Redesign Existing Store",
                      "Custom Features / App Integration",
                      "Store Migration"
                    ].map((svc) => {
                      const isChecked = selectedServices.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] sm:text-xs font-sans text-left transition-all border cursor-pointer ${
                            isChecked
                              ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-semibold"
                              : "bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                            isChecked ? "bg-emerald-500 border-emerald-500 text-black" : "border-white/30"
                          }`}>
                            {isChecked && <CheckCircle2 className="w-3 h-3 text-black stroke-[3]" />}
                          </div>
                          <span>{svc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Brand Category & Store URL (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <select
                      value={brandCategory}
                      onChange={(e) => setBrandCategory(e.target.value)}
                      className="w-full bg-[#0c141d] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Fashion & Apparel">Fashion & Apparel</option>
                      <option value="Beauty & Skincare">Beauty & Skincare</option>
                      <option value="Health & Supplements">Health & Supplements</option>
                      <option value="Electronics & Accessories">Electronics & Accessories</option>
                      <option value="Jewelry & Watches">Jewelry & Watches</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Home & Living">Home & Living</option>
                      <option value="Fitness & Sports">Fitness & Sports</option>
                      <option value="Dropshipping">Dropshipping Store</option>
                      <option value="Other">Other Brand Category</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Store Name or Website Url"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      className="w-full bg-white/[0.04] border border-emerald-500/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors shadow-[0_0_15px_rgba(34,227,154,0.05)]"
                    />
                  </div>
                </div>


                {/* Budget Selection Pills */}
                <div>
                  <label className="text-xs font-sans text-white/70 block mb-2 font-medium">
                    What is your Budget?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Under ₹29,999/-", "₹29,999/- ₹79,999/-", "₹79,999/ +"].map((bOption) => {
                      const isSel = budget === bOption;
                      return (
                        <button
                          key={bOption}
                          type="button"
                          onClick={() => setBudget(bOption)}
                          className={`py-2 px-2 rounded-xl text-[10px] sm:text-xs font-mono font-bold text-center transition-all border cursor-pointer ${
                            isSel
                              ? "bg-emerald-400 text-black border-emerald-400 shadow-[0_0_15px_rgba(34,227,154,0.3)]"
                              : "bg-white/[0.04] border-white/15 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {bOption}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Authorization Checkbox */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="auth-check"
                    checked={authorized}
                    onChange={(e) => setAuthorized(e.target.checked)}
                    className="mt-0.5 rounded border-white/30 bg-white/5 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                  />
                  <label htmlFor="auth-check" className="text-[10px] sm:text-[11px] text-white/60 font-sans cursor-pointer leading-tight">
                    I authorise SalePXL team to reach out to me to discuss about the project
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-400 text-black text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-emerald-300 transition-all duration-300 shadow-[0_4px_25px_rgba(34,227,154,0.3)] hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit</span>
                      <Sparkles className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>

                {/* Guarantee Statements */}
                <div className="space-y-1.5 pt-2 border-t border-white/10 text-[10px] sm:text-[11px] text-white/50 font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span>In just <strong className="text-white underline">2 hrs you will get a response back</strong> from our team of experts</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span>Your idea / discussion is 100% protected by our <strong className="text-white">Non Disclosure Agreement & Confidentiality Policy</strong></span>
                  </div>
                </div>

              </form>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

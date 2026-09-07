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
  defaultBudget = "₹25000",
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

  const normalizeBudget = (b: string) => {
    if (b.includes("40") || b.includes("40,000") || b.includes("40000") || b.includes("Pro")) return "₹40000";
    if (b.includes("60") || b.includes("60,000") || b.includes("60000") || b.includes("Growth")) return "₹60000";
    return "₹25000";
  };

  useEffect(() => {
    if (defaultBudget) {
      setBudget(normalizeBudget(defaultBudget));
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
      source: "pricing-connect-modal",
      name: fullName,
      email: businessEmail,
      phone: mobileNumber,
      brandCategory: brandCategory || "General E-commerce",
      brandName: brandCategory || "General E-commerce",
      service: selectedServices.join(", "),
      services: selectedServices.join(", "),
      storeUrl: storeUrl || "N/A",
      website: storeUrl || "N/A",
      budgetRange: budget,
      projectBudget: budget,
      planSelected: defaultPlanName || "General Enquiry",
      projectDetails: defaultPlanName ? `Plan Selected: ${defaultPlanName}` : "General Enquiry"
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
          value: budget.includes("80,000") || budget.includes("79,999") ? 80000 : 30000,
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
          className="relative w-full max-w-4xl bg-white border border-neutral-200 rounded-[28px] sm:rounded-[36px] shadow-2xl overflow-hidden z-10 text-neutral-900 my-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {isSuccess ? (
            /* SUCCESS STATE */
            <div className="p-8 sm:p-14 text-center flex flex-col items-center justify-center gap-5 min-h-[440px] bg-white">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-light text-neutral-900 font-grotesk">
                Request Received <span className="text-emerald-600 font-normal">Successfully!</span>
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed font-sans">
                Thank you, <strong className="text-neutral-900">{fullName}</strong>. Our Shopify strategy specialists will review your requirements and reach out to you shortly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                <a
                  href="https://calendly.com/salepxl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-[#22E39A] text-black text-sm font-bold uppercase tracking-wider hover:bg-[#1fce8b] transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Strategy Call on Calendly</span>
                </a>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-6 py-3.5 rounded-full bg-neutral-100 text-neutral-800 text-sm font-semibold hover:bg-neutral-200 transition-all cursor-pointer border border-neutral-200"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE: LEFT & RIGHT COLUMNS */
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch bg-white">
              
              {/* LEFT COLUMN: BRAND DETAILS & TRUST INFO */}
              <div className="lg:col-span-5 p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-neutral-900 to-black text-white border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between gap-3 lg:gap-6">
                <div>
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-light text-white font-grotesk leading-snug">
                    Launch a <span className="text-[#22E39A] font-normal">High-Growth</span> Shopify Store
                  </h2>
                  
                  <p className="text-[11px] sm:text-xs lg:text-sm text-neutral-300 font-sans leading-normal mt-1 sm:mt-2">
                    Tell us brief about your project needs & our team will get back to you with a clear plan to build / scale your store.
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 pt-2.5 sm:mt-4 sm:pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-neutral-200 font-sans">
                      <Star className="w-3.5 h-3.5 text-[#22E39A] fill-[#22E39A] shrink-0" />
                      <span>Trusted by 100+ brands</span>
                    </div>
                    <a
                      href="https://calendly.com/salepxl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#22E39A] hover:text-[#1fce8b] font-sans font-medium transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#22E39A] shrink-0" />
                      <span>Book A Meeting</span>
                    </a>
                  </div>
                </div>

                {/* Footer Brand Logo (Desktop only) */}
                <div className="hidden lg:block pt-6 border-t border-white/10">
                  <img
                    src="/logo.png"
                    alt="SalePixel - Shopify Agency"
                    className="h-7 w-auto object-contain invert hue-rotate-180"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE FORM (WHITE BACKGROUND) */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 p-4 sm:p-8 lg:p-10 pt-4 sm:pt-8 lg:pt-10 flex flex-col justify-between gap-4 sm:gap-5 bg-white">
                
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-sans">
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
                      className="w-full bg-neutral-50 border border-neutral-300 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center gap-1 text-xs font-mono text-neutral-500 select-none border-r border-neutral-300 pr-2">
                      <span>🇮🇳 +91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 focus:border-emerald-500 focus:bg-white rounded-xl pl-20 pr-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors"
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
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Services Checkboxes */}
                <div>
                  <label className="text-xs font-sans text-neutral-700 block mb-2 font-medium">
                    Which service(s) you are interested in? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "New Shopify Store Build",
                      "Redesign Existing Store",
                      "Custom Features & Integrations",
                      "Store Migration"
                    ].map((svc) => {
                      const isChecked = selectedServices.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[11px] sm:text-xs font-sans text-left transition-all border cursor-pointer ${
                            isChecked
                              ? "bg-emerald-50/80 border-emerald-500 text-neutral-900 font-semibold shadow-xs"
                              : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                          }`}
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 fill-emerald-100" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-neutral-300 shrink-0" />
                          )}
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
                      className="w-full bg-neutral-50 border border-neutral-300 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors appearance-none cursor-pointer"
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
                      className="w-full bg-neutral-50 border border-neutral-300 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Budget Selection Pills */}
                <div>
                  <label className="text-xs font-sans text-neutral-700 block mb-2 font-medium">
                    What is your Budget?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["₹25000", "₹40000", "₹60000"].map((bOption) => {
                      const isSel = budget === bOption;
                      return (
                        <button
                          key={bOption}
                          type="button"
                          onClick={() => setBudget(bOption)}
                          className={`py-2 px-2 rounded-xl text-[10px] sm:text-xs font-mono font-bold text-center transition-all border cursor-pointer ${
                            isSel
                              ? "bg-[#22E39A] text-black border-[#22E39A] shadow-md font-bold"
                              : "bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200"
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
                    className="mt-0.5 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="auth-check" className="text-[10px] sm:text-[11px] text-neutral-600 font-sans cursor-pointer leading-tight">
                    I authorise SalePXL team to reach out to me to discuss about the project
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#22E39A] text-black text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#1fce8b] transition-all duration-300 shadow-md hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
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

              </form>

            </div>
          )}

        </motion.div>

      </div>
    </AnimatePresence>
  );
}

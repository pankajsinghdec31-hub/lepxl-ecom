"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StartProjectForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    companyUrl: "",
    email: "",
    phone: "",
    brandCategory: "Fashion & Apparel",
    serviceType: "Custom Shopify Store",
    budgetRange: "₹40K - ₹75K",
    projectDetails: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [submitted]);

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      companyUrl: "",
      email: "",
      phone: "",
      brandCategory: "Fashion & Apparel",
      serviceType: "Custom Shopify Store",
      budgetRange: "₹40K - ₹75K",
      projectDetails: ""
    });
    if (onSuccess) {
      onSuccess();
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Your Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.serviceType) newErrors.serviceType = "Select a service type";
    if (!formData.budgetRange) newErrors.budgetRange = "Select a project budget";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "start-project-proposal",
          name: formData.name,
          storeUrl: formData.companyUrl || "N/A",
          email: formData.email,
          phone: formData.phone,
          brandCategory: formData.brandCategory || "General E-commerce",
          service: formData.serviceType,
          budgetRange: formData.budgetRange,
          projectDetails: formData.projectDetails
        }),
      });
    } catch (_) {
      // Fail silently
    } finally {
      setIsSubmitting(false);
    }

    setSubmitted(true);
    localStorage.setItem("salepxl_proposal_lead", JSON.stringify(formData));

    // Track lead in Meta Pixel
    try {
      const fbq = (window as any)?.fbq as undefined | ((...args: any[]) => void);
      if (typeof fbq === "function") {
        const numVal = formData.budgetRange.includes("1.5L") ? 150000 : 50000;
        fbq("track", "Lead", {
          content_name: formData.serviceType || "Request a Proposal",
          content_category: "Lead Form",
          value: numVal,
          currency: "INR",
        });
      }
    } catch {
      // ignore
    }
  };

  const budgetOptions = [
    "< ₹20K",
    "₹20K - ₹40K",
    "₹40K - ₹75K",
    "₹75K - ₹1.5L",
    "> ₹1.5L"
  ];

  return (
    <div className="w-full text-left relative font-sans">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10 w-full max-w-3xl mx-auto">
        
        {/* Deliverable Agency Header Badges & Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-2">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 tracking-tight font-grotesk mt-2">
            Request a <span className="text-emerald-600 font-normal">Proposal</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg leading-relaxed font-sans">
            Tell us brief about your Shopify requirements & our strategy team will analyze your project and get back to you with a custom plan.
          </p>
        </div>

        {/* Deliverable Form Fields Container (White Card Theme) */}
        <div className="flex flex-col gap-5 w-full bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-2xl">
          
          {/* Row 1: Name & Company URL (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col text-left">
              <label className="text-xs text-neutral-700 font-semibold mb-1.5 block">Your Name *</label>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full h-12 bg-neutral-50/50 border ${errors.name ? "border-red-500" : "border-neutral-200 focus:border-emerald-500 focus:bg-white"} text-neutral-900 text-sm rounded-xl px-4 outline-none transition-all placeholder:text-neutral-400`}
              />
              {errors.name && <span className="text-[11px] text-red-500 font-medium mt-1">{errors.name}</span>}
            </div>

            <div className="flex flex-col text-left">
              <label className="text-xs text-neutral-700 font-semibold mb-1.5 block">Company url *</label>
              <input
                type="text"
                name="companyUrl"
                placeholder="Company url / website"
                value={formData.companyUrl}
                onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                className="w-full h-12 bg-neutral-50/50 border border-neutral-200 focus:border-emerald-500 focus:bg-white text-neutral-900 text-sm rounded-xl px-4 outline-none transition-all placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Row 2: Work email & Phone Number (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col text-left">
              <label className="text-xs text-neutral-700 font-semibold mb-1.5 block">Work email *</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Work email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full h-12 bg-neutral-50/50 border ${errors.email ? "border-red-500" : "border-neutral-200 focus:border-emerald-500 focus:bg-white"} text-neutral-900 text-sm rounded-xl px-4 outline-none transition-all placeholder:text-neutral-400`}
              />
              {errors.email && <span className="text-[11px] text-red-500 font-medium mt-1">{errors.email}</span>}
            </div>

            <div className="flex flex-col text-left">
              <label className="text-xs text-neutral-700 font-semibold mb-1.5 block">Phone number *</label>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="Phone number *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full h-12 bg-neutral-50/50 border ${errors.phone ? "border-red-500" : "border-neutral-200 focus:border-emerald-500 focus:bg-white"} text-neutral-900 text-sm rounded-xl px-4 outline-none transition-all placeholder:text-neutral-400`}
              />
              {errors.phone && <span className="text-[11px] text-red-500 font-medium mt-1">{errors.phone}</span>}
            </div>
          </div>

          {/* Row 3: Brand Category & Service Type (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col text-left">
              <label className="text-xs text-neutral-700 font-semibold mb-1.5 block">Brand Category *</label>
              <div className="relative">
                <select
                  value={formData.brandCategory}
                  onChange={(e) => setFormData({ ...formData, brandCategory: e.target.value })}
                  className="w-full h-12 bg-neutral-50/50 border border-neutral-200 focus:border-emerald-500 focus:bg-white text-neutral-900 text-sm rounded-xl px-4 pr-10 outline-none transition-all appearance-none cursor-pointer"
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
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <label className="text-xs text-neutral-700 font-semibold mb-1.5 block">Service type *</label>
              <div className="relative">
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full h-12 bg-neutral-50/50 border border-neutral-200 focus:border-emerald-500 focus:bg-white text-neutral-900 text-sm rounded-xl px-4 pr-10 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="Custom Shopify Store">Custom Shopify Store Development</option>
                  <option value="Store Redesign & CRO">Store Redesign & Conversion Rate Optimization</option>
                  <option value="Speed & Performance Optimization">Speed & Performance Optimization</option>
                  <option value="Shopify Plus Migration">Shopify Plus Migration</option>
                  <option value="Custom Feature & API Integration">Custom Feature & API Integration</option>
                  <option value="Monthly Retainer & Support">Monthly Shopify Growth Retainer</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>


          {/* Row 5: Estimated Project Budget * (Horizontal Interactive Pills) */}
          <div className="flex flex-col text-left">
            <label className="text-xs text-neutral-700 font-semibold mb-2 block">Estimated Project Budget *</label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {budgetOptions.map((opt) => {
                const isSelected = formData.budgetRange === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData({ ...formData, budgetRange: opt })}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[#22E39A] text-black border-[#22E39A] shadow-md font-bold"
                        : "bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 6: Project Details Textarea */}
          <div className="flex flex-col text-left">
            <label className="text-xs text-neutral-700 font-semibold mb-1.5 block">Tell us more about your project...</label>
            <textarea
              rows={4}
              placeholder="Tell us more about your project..."
              value={formData.projectDetails}
              onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
              className="w-full bg-neutral-50/50 border border-neutral-200 focus:border-emerald-500 focus:bg-white text-neutral-900 text-sm rounded-xl p-4 outline-none transition-all placeholder:text-neutral-400 resize-none min-h-[110px]"
            />
          </div>

          {/* Row 7: Deliverable Agency Disclaimer */}
          <p className="text-[11px] text-neutral-500 leading-normal font-sans">
            By submitting this form, you acknowledge that the information you provide will be processed only for our internal operations. This data will not be shared with any 3rd party vendors.
          </p>

          {/* Full Width Pill Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 rounded-full text-sm font-bold uppercase tracking-wider text-black bg-[#22E39A] hover:bg-[#1fce8b] shadow-[0_4px_25px_rgba(34,227,154,0.35)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit</span>
                <Send className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>

        </div>
      </form>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {submitted && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-2xl text-center flex flex-col items-center gap-5 z-50 text-neutral-900"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-neutral-900 font-grotesk">
                  Proposal Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans px-2">
                  Thank you <strong className="text-neutral-900">{formData.name}</strong>. Our team will review your project details and reach out within 1 hour.
                </p>
              </div>

              <a
                href="https://calendly.com/salepxl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#22E39A] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#1fce8b] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <span>Book Direct Meeting on Calendly</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold hover:bg-neutral-200 transition-all border border-neutral-200 cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


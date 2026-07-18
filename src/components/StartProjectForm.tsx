"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, ChevronDown, User, Mail, Phone, ShoppingBag, Landmark, Clock, FileText, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StartProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    productsCount: "",
    photoshootAvailable: "",
    budgetRange: "",
    timeline: "",
    projectDetails: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.service) newErrors.service = "Select a service";
    if (!formData.productsCount) newErrors.productsCount = "Select products range";
    if (!formData.photoshootAvailable) newErrors.photoshootAvailable = "Photoshoot option required";
    if (!formData.budgetRange) newErrors.budgetRange = "Select budget";
    if (!formData.timeline) newErrors.timeline = "Select timeline";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Save data locally in browser context (useful for testing lead logs)
      localStorage.setItem("salepxl_hero_lead", JSON.stringify(formData));
    }
  };

  const inputClass = (hasError: boolean) => 
    `w-full h-[52px] bg-white/[0.02] border ${
      hasError 
        ? "border-red-500/30 focus:border-red-500 focus:ring-red-500/15" 
        : "border-white/10 focus:border-[#22E39A] focus:ring-[#22E39A]/15"
    } text-white text-sm rounded-xl pl-11 pr-4 transition-all duration-300 outline-none focus:ring-4 placeholder:text-white/25`;

  const selectClass = (hasError: boolean) => 
    `w-full h-[52px] bg-white/[0.02] border ${
      hasError 
        ? "border-red-500/30 focus:border-red-500 focus:ring-red-500/15" 
        : "border-white/10 focus:border-[#22E39A] focus:ring-[#22E39A]/15"
    } text-white text-sm rounded-xl pl-11 pr-10 transition-all duration-300 outline-none focus:ring-4 appearance-none cursor-pointer`;


  return (
    <div className="w-full text-left relative">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
            {/* Left Column - Info & Trust (col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div>
                <span className="text-[10px] text-[#22E39A] font-mono uppercase tracking-widest font-bold mb-3 block">
                  Partner with SalePXL
                </span>
                <h3 className="text-3xl md:text-[2.65rem] font-light text-white tracking-tight leading-[1.1] font-grotesk">
                  Start <span className="light-gradient-text font-normal">Your</span> Project
                </h3>
                <p className="text-sm text-white/60 font-light leading-relaxed mt-4">
                  Let's build a high-performance Shopify storefront. Share your project requirements below to receive a free conversion rate audit and schedule a strategy consultation.
                </p>
              </div>

              {/* Trust Indicators / Badges */}
              <div className="hidden lg:flex flex-col gap-6 border-t border-white/10 pt-8 mt-auto">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#22E39A] shrink-0">
                    <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-grotesk tracking-wide uppercase">Shopify Plus Experts</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-0.5">Certified partners designing custom high-converting storefronts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#22E39A] shrink-0">
                    <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-grotesk tracking-wide uppercase">Speed-First Philosophy</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-0.5">Optimized performance reaching 90+ Core Web Vitals score.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#22E39A] shrink-0">
                    <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-grotesk tracking-wide uppercase">Conversion Driven UI/UX</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-0.5">Minimizing purchase path friction to maximize sales value.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form Fields (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
              {/* Grid for Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col relative">
                  <label className="text-[10px] text-white/50 uppercase font-mono tracking-wider font-semibold mb-2 block">Your Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Pankaj Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`${inputClass(!!errors.name)} peer`}
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                  </div>
                  {errors.name && <span className="text-[11px] text-red-400 font-medium mt-1.5 block">{errors.name}</span>}
                </div>

                <div className="flex flex-col relative">
                  <label className="text-[10px] text-white/50 uppercase font-mono tracking-wider font-semibold mb-2 block">Business Email *</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="growth@salepxl.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`${inputClass(!!errors.email)} peer`}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                  </div>
                  {errors.email && <span className="text-[11px] text-red-400 font-medium mt-1.5 block">{errors.email}</span>}
                </div>
              </div>

              {/* Grid for Contact & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col relative">
                  <label className="text-[10px] text-white/50 uppercase font-mono tracking-wider font-semibold mb-2 block">Contact Number *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="+91 9917780656"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`${inputClass(!!errors.phone)} peer`}
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                  </div>
                  {errors.phone && <span className="text-[11px] text-red-400 font-medium mt-1.5 block">{errors.phone}</span>}
                </div>

                <div className="flex flex-col relative">
                  <label className="text-[10px] text-white/50 uppercase font-mono tracking-wider font-semibold mb-2 block">Select a Service *</label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={`${selectClass(!!errors.service)} peer`}
                    >
                      <option value="" className="bg-[#0a0a0a]">Choose Service</option>
                      <option value="New Store Design" className="bg-[#0a0a0a]">New Store Design</option>
                      <option value="Revamp" className="bg-[#0a0a0a]">Store Revamp</option>
                      <option value="CRO" className="bg-[#0a0a0a]">CRO Optimization</option>
                      <option value="Dropshipping Store" className="bg-[#0a0a0a]">Dropshipping Store</option>
                    </select>
                    <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                  </div>
                  {errors.service && <span className="text-[11px] text-red-400 font-medium mt-1.5 block">{errors.service}</span>}
                </div>
              </div>

              {/* Grid for Products & Photoshoot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col relative">
                  <label className="text-[10px] text-white/50 uppercase font-mono tracking-wider font-semibold mb-2 block">Number of Products *</label>
                  <div className="relative">
                    <select
                      value={formData.productsCount}
                      onChange={(e) => setFormData({ ...formData, productsCount: e.target.value })}
                      className={`${selectClass(!!errors.productsCount)} peer`}
                    >
                      <option value="" className="bg-[#0a0a0a]">Choose Range</option>
                      <option value="0-10" className="bg-[#0a0a0a]">0-10</option>
                      <option value="10-20" className="bg-[#0a0a0a]">10-20</option>
                      <option value="20+" className="bg-[#0a0a0a]">20+</option>
                    </select>
                    <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                  </div>
                  {errors.productsCount && <span className="text-[11px] text-red-400 font-medium mt-1.5 block">{errors.productsCount}</span>}
                </div>

                <div className="flex flex-col relative">
                  <label className="text-[10px] text-white/50 uppercase font-mono tracking-wider font-semibold mb-2 block">Photoshoot Available? *</label>
                  <div className="relative">
                    <select
                      value={formData.photoshootAvailable}
                      onChange={(e) => setFormData({ ...formData, photoshootAvailable: e.target.value })}
                      className={`${selectClass(!!errors.photoshootAvailable)} peer`}
                    >
                      <option value="" className="bg-[#0a0a0a]">Select Yes/No</option>
                      <option value="Yes" className="bg-[#0a0a0a]">Yes</option>
                      <option value="No" className="bg-[#0a0a0a]">No</option>
                    </select>
                    <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                  </div>
                  {errors.photoshootAvailable && <span className="text-[11px] text-red-400 font-medium mt-1.5 block">{errors.photoshootAvailable}</span>}
                </div>
              </div>

              {/* Grid for Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col relative">
                  <label className="text-[10px] text-white/50 uppercase font-mono tracking-wider font-semibold mb-2 block">Project Budget *</label>
                  <div className="relative">
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className={`${selectClass(!!errors.budgetRange)} peer`}
                    >
                      <option value="" className="bg-[#0a0a0a]">Select Budget</option>
                      <option value="₹20k" className="bg-[#0a0a0a]">₹20k</option>
                      <option value="₹20k to ₹40k" className="bg-[#0a0a0a]">₹20k to ₹40k</option>
                      <option value="Above ₹50k" className="bg-[#0a0a0a]">Above ₹50k</option>
                    </select>
                    <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                  </div>
                  {errors.budgetRange && <span className="text-[11px] text-red-400 font-medium mt-1.5 block">{errors.budgetRange}</span>}
                </div>

                <div className="flex flex-col relative">
                  <label className="text-[10px] text-white/50 uppercase font-mono tracking-wider font-semibold mb-2 block">Expected Timeline *</label>
                  <div className="relative">
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className={`${selectClass(!!errors.timeline)} peer`}
                    >
                      <option value="" className="bg-[#0a0a0a]">Select Timeline</option>
                      <option value="ASAP" className="bg-[#0a0a0a]">ASAP</option>
                      <option value="1 Week" className="bg-[#0a0a0a]">1 Week</option>
                      <option value="2 Weeks" className="bg-[#0a0a0a]">2 Weeks</option>
                    </select>
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                  </div>
                  {errors.timeline && <span className="text-[11px] text-red-400 font-medium mt-1.5 block">{errors.timeline}</span>}
                </div>
              </div>

              {/* Custom Brief Box */}
              <div className="flex flex-col relative">
                <label className="text-[10px] text-white/50 uppercase font-mono tracking-wider font-semibold mb-2 block">About your project or brand</label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Describe your design styling, custom features, or Shopify goals..."
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 focus:border-[#22E39A] focus:ring-[#22E39A]/15 text-white text-sm rounded-xl pl-11 pr-4 py-3.5 transition-all duration-300 outline-none focus:ring-4 placeholder:text-white/25 resize-none min-h-[100px] peer"
                  />
                  <FileText className="absolute left-4 top-4.5 w-4 h-4 text-white/30 transition-colors duration-300 peer-focus:text-[#22E39A] pointer-events-none" strokeWidth={1.75} />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[52px] rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#22E39A] hover:bg-[#34F5AE] shadow-[0_4px_20px_rgba(34,227,154,0.15)] hover:shadow-[0_8px_30px_rgba(34,227,154,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                Submit Lead <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
            {/* Left Column Info stays during success */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div>
                <span className="text-[10px] text-[#22E39A] font-mono uppercase tracking-widest font-bold mb-3 block">
                  Partner with SalePXL
                </span>
                <h3 className="text-3xl md:text-[2.65rem] font-light text-white tracking-tight leading-[1.1] font-grotesk">
                  Start <span className="light-gradient-text font-normal">Your</span> Project
                </h3>
                <p className="text-sm text-white/60 font-light leading-relaxed mt-4">
                  Let's build a high-performance Shopify storefront. Share your project requirements below to receive a free conversion rate audit and schedule a strategy consultation.
                </p>
              </div>

              {/* Trust Indicators / Badges */}
              <div className="hidden lg:flex flex-col gap-6 border-t border-white/10 pt-8 mt-auto">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#22E39A] shrink-0">
                    <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-grotesk tracking-wide uppercase">Shopify Plus Experts</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-0.5">Certified partners designing custom high-converting storefronts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#22E39A] shrink-0">
                    <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-grotesk tracking-wide uppercase">Speed-First Philosophy</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-0.5">Optimized performance reaching 90+ Core Web Vitals score.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#22E39A] shrink-0">
                    <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white font-grotesk tracking-wide uppercase">Conversion Driven UI/UX</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-0.5">Minimizing purchase path friction to maximize sales value.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Success State */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center py-16 px-6 text-center gap-6 bg-white/[0.01] border border-white/[0.04] rounded-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-[#22E39A]/10 border border-[#22E39A]/20 flex items-center justify-center text-[#22E39A]">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-light text-white tracking-tight font-grotesk">Request Received!</h3>
                  <p className="text-sm text-white/50 max-w-xs leading-relaxed font-light">
                    Thank you for reaching out. We will audit your request details and email you a calendar booking link shortly.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>


  );
}

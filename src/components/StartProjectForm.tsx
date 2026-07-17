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
    `w-full bg-white/[0.03] backdrop-blur-sm border ${
      hasError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#36F4A4]"
    } text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#36F4A4]/25 transition-all placeholder:text-white/30`;

  const selectClass = (hasError: boolean) => 
    `w-full bg-white/[0.03] backdrop-blur-sm border ${
      hasError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#36F4A4]"
    } text-white text-xs rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#36F4A4]/25 transition-all appearance-none cursor-pointer`;

  return (
    <div className="w-full text-left relative">


      <AnimatePresence mode="wait">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight uppercase font-grotesk">Start Your Project</h3>
              <p className="text-[10px] text-[#8e8e93] font-medium mt-0.5">Let's build a high-performance Shopify storefront.</p>
            </div>

            {/* Grid for Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1 relative">
                <label className="text-[9px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Your Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c]" />
                  <input
                    type="text"
                    placeholder="Pankaj Singh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass(!!errors.name)}
                  />
                </div>
                {errors.name && <span className="text-[9px] text-red-500 font-medium">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-1 relative">
                <label className="text-[9px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Business Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c]" />
                  <input
                    type="email"
                    placeholder="growth@salepxl.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass(!!errors.email)}
                  />
                </div>
                {errors.email && <span className="text-[9px] text-red-500 font-medium">{errors.email}</span>}
              </div>
            </div>

            {/* Grid for Contact & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1 relative">
                <label className="text-[9px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Contact Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c]" />
                  <input
                    type="text"
                    placeholder="+91 9917780656"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass(!!errors.phone)}
                  />
                </div>
                {errors.phone && <span className="text-[9px] text-red-500 font-medium">{errors.phone}</span>}
              </div>

              <div className="flex flex-col gap-1 relative">
                <label className="text-[9px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Select a Service *</label>
                <div className="relative">
                  <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] z-10" />
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={selectClass(!!errors.service)}
                  >
                    <option value="" className="bg-[#121214]">Choose Service</option>
                    <option value="New Store Design" className="bg-[#121214]">New Store Design</option>
                    <option value="Revamp" className="bg-[#121214]">Store Revamp</option>
                    <option value="CRO" className="bg-[#121214]">CRO Optimization</option>
                    <option value="Dropshipping Store" className="bg-[#121214]">Dropshipping Store</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] pointer-events-none" />
                </div>
                {errors.service && <span className="text-[9px] text-red-500 font-medium">{errors.service}</span>}
              </div>
            </div>

            {/* Grid for Products & Photoshoot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1 relative">
                <label className="text-[9px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Number of Products *</label>
                <div className="relative">
                  <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] z-10" />
                  <select
                    value={formData.productsCount}
                    onChange={(e) => setFormData({ ...formData, productsCount: e.target.value })}
                    className={selectClass(!!errors.productsCount)}
                  >
                    <option value="" className="bg-[#121214]">Choose Range</option>
                    <option value="0-10" className="bg-[#121214]">0-10</option>
                    <option value="10-20" className="bg-[#121214]">10-20</option>
                    <option value="20+" className="bg-[#121214]">20+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] pointer-events-none" />
                </div>
                {errors.productsCount && <span className="text-[9px] text-red-500 font-medium">{errors.productsCount}</span>}
              </div>

              <div className="flex flex-col gap-1 relative">
                <label className="text-[9px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Photoshoot Available? *</label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] z-10" />
                  <select
                    value={formData.photoshootAvailable}
                    onChange={(e) => setFormData({ ...formData, photoshootAvailable: e.target.value })}
                    className={selectClass(!!errors.photoshootAvailable)}
                  >
                    <option value="" className="bg-[#121214]">Select Yes/No</option>
                    <option value="Yes" className="bg-[#121214]">Yes</option>
                    <option value="No" className="bg-[#121214]">No</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] pointer-events-none" />
                </div>
                {errors.photoshootAvailable && <span className="text-[9px] text-red-500 font-medium">{errors.photoshootAvailable}</span>}
              </div>
            </div>

            {/* Grid for Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1 relative">
                <label className="text-[9px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Project Budget *</label>
                <div className="relative">
                  <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] z-10" />
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className={selectClass(!!errors.budgetRange)}
                  >
                    <option value="" className="bg-[#121214]">Select Budget</option>
                    <option value="₹20k" className="bg-[#121214]">₹20k</option>
                    <option value="₹20k to ₹40k" className="bg-[#121214]">₹20k to ₹40k</option>
                    <option value="Above ₹50k" className="bg-[#121214]">Above ₹50k</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] pointer-events-none" />
                </div>
                {errors.budgetRange && <span className="text-[9px] text-red-500 font-medium">{errors.budgetRange}</span>}
              </div>

              <div className="flex flex-col gap-1 relative">
                <label className="text-[9px] text-[#8e8e93] uppercase font-mono tracking-wider font-semibold">Expected Timeline *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] z-10" />
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className={selectClass(!!errors.timeline)}
                  >
                    <option value="" className="bg-[#121214]">Select Timeline</option>
                    <option value="ASAP" className="bg-[#121214]">ASAP</option>
                    <option value="1 Week" className="bg-[#121214]">1 Week</option>
                    <option value="2 Weeks" className="bg-[#121214]">2 Weeks</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5c5c5c] pointer-events-none" />
                </div>
                {errors.timeline && <span className="text-[9px] text-red-500 font-medium">{errors.timeline}</span>}
              </div>
            </div>

            {/* Custom Brief Box */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-[9px] text-[#a1a1aa] uppercase font-mono tracking-wider font-semibold">About your project or brand</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-3.5 h-3.5 text-white/40" />
                <textarea
                  rows={2}
                  placeholder="Describe your design styling, custom features, or Shopify goals..."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-[#36F4A4] text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#36F4A4]/25 transition-all placeholder:text-white/30 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#36F4A4] hover:bg-[#1de896] transition-all duration-300 neon-shadow-lime hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              Submit Lead <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center gap-4"
          >
            <CheckCircle2 className="w-16 h-16 text-[#36F4A4] animate-bounce" />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl font-bold text-white uppercase font-grotesk">Request Received!</h3>
              <p className="text-xs text-[#a1a1aa] max-w-xs leading-relaxed">
                Thank you for reaching out. We will audit your request details and email you a calendar booking link shortly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
}

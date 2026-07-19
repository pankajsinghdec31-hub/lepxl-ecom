"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, ChevronDown, User, Mail, Phone, ShoppingBag, Landmark, Clock, FileText, Camera, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StartProjectForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    productsCount: "",
    photoshootAvailable: "",
    budgetRange: "",
    timeline: "",
    projectDetails: "",
    referenceLink: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
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
      email: "",
      phone: "",
      service: "",
      productsCount: "",
      photoshootAvailable: "",
      budgetRange: "",
      timeline: "",
      projectDetails: "",
      referenceLink: ""
    });
    if (onSuccess) {
      onSuccess();
    }
  };

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
      localStorage.setItem("salepxl_hero_lead", JSON.stringify(formData));
    }
  };

  const inputClass = (hasError: boolean) => 
    `w-full h-[52px] bg-white border ${
      hasError 
        ? "border-red-500/30 focus:border-red-500 focus:ring-red-500/15" 
        : "border-neutral-200/80 focus:border-emerald-500 focus:ring-emerald-500/15"
    } text-neutral-800 text-sm rounded-xl pl-11 pr-4 transition-all duration-300 outline-none focus:ring-4 placeholder:text-neutral-400`;

  const selectClass = (hasError: boolean) => 
    `w-full h-[52px] bg-white border ${
      hasError 
        ? "border-red-500/30 focus:border-red-500 focus:ring-red-500/15" 
        : "border-neutral-200/80 focus:border-emerald-500 focus:ring-emerald-500/15"
    } text-neutral-800 text-sm rounded-xl pl-11 pr-10 transition-all duration-300 outline-none focus:ring-4 appearance-none cursor-pointer`;


  return (
    <div className="w-full text-left relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 relative z-10 font-sans w-full max-w-3xl mx-auto">
        {/* Title & Description moved inside form as a simplified top header */}
        <div className="text-center mb-8">
          <span className="text-[10px] text-emerald-700 font-sans uppercase tracking-widest font-bold mb-2 block">
            Partner with SalePXL
          </span>
          <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight leading-[1.1] font-grotesk">
            Start <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal font-sans">Your</span> Project
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed mt-2 max-w-lg mx-auto">
            Let's build a high-performance Shopify storefront. Share your project requirements below to receive a free conversion rate audit and schedule a strategy consultation.
          </p>
        </div>

        {/* Form Fields Container */}
        <div className="flex flex-col gap-6 sm:gap-8 w-full">
          {/* Grid for Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col relative text-left">
              <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">Your Name *</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Pankaj Singh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`${inputClass(!!errors.name)} peer`}
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
              </div>
              {errors.name && <span className="text-[11px] text-red-500 font-medium mt-1.5 block">{errors.name}</span>}
            </div>

            <div className="flex flex-col relative text-left">
              <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">Business Email *</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="growth@salepxl.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`${inputClass(!!errors.email)} peer`}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
              </div>
              {errors.email && <span className="text-[11px] text-red-500 font-medium mt-1.5 block">{errors.email}</span>}
            </div>
          </div>

          {/* Grid for Contact & Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col relative text-left">
              <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">Contact Number *</label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  autoComplete="tel"
                  placeholder="+91 9917780656"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`${inputClass(!!errors.phone)} peer`}
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
              </div>
              {errors.phone && <span className="text-[11px] text-red-500 font-medium mt-1.5 block">{errors.phone}</span>}
            </div>

            <div className="flex flex-col relative text-left">
              <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">Select a Service *</label>
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className={`${selectClass(!!errors.service)} peer`}
                >
                  <option value="">Choose Service</option>
                  <option value="New Store Design">New Store Design</option>
                  <option value="Revamp">Store Revamp</option>
                  <option value="CRO">CRO Optimization</option>
                  <option value="Dropshipping Store">Dropshipping Store</option>
                </select>
                <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
              </div>
              {errors.service && <span className="text-[11px] text-red-500 font-medium mt-1.5 block">{errors.service}</span>}
            </div>
          </div>

          {/* Grid for Products & Photoshoot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col relative text-left">
              <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">Number of Products *</label>
              <div className="relative">
                <select
                  value={formData.productsCount}
                  onChange={(e) => setFormData({ ...formData, productsCount: e.target.value })}
                  className={`${selectClass(!!errors.productsCount)} peer`}
                >
                  <option value="">Choose Count</option>
                  <option value="1-50">1 - 50 Products</option>
                  <option value="50-200">50 - 200 Products</option>
                  <option value="200+">200+ Products</option>
                </select>
                <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-transform duration-300 peer-focus:text-emerald-600 pointer-events-none" />
              </div>
              {errors.productsCount && <span className="text-[11px] text-red-500 font-medium mt-1.5 block">{errors.productsCount}</span>}
            </div>

            <div className="flex flex-col relative text-left">
              <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">Photoshoot Available? *</label>
              <div className="relative">
                <select
                  value={formData.photoshootAvailable}
                  onChange={(e) => setFormData({ ...formData, photoshootAvailable: e.target.value })}
                  className={`${selectClass(!!errors.photoshootAvailable)} peer`}
                >
                  <option value="">Select Yes/No</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
              </div>
              {errors.photoshootAvailable && <span className="text-[11px] text-red-500 font-medium mt-1.5 block">{errors.photoshootAvailable}</span>}
            </div>
          </div>

          {/* Grid for Budget & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col relative text-left">
              <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">Project Budget *</label>
              <div className="relative">
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className={`${selectClass(!!errors.budgetRange)} peer`}
                >
                  <option value="">Choose Budget</option>
                  <option value="Under ₹20K">Under ₹20K</option>
                  <option value="₹20K - ₹40K">₹20K - ₹40K</option>
                  <option value="Above ₹40K">Above ₹40K</option>
                </select>
                <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-transform duration-300 peer-focus:text-emerald-600 pointer-events-none" />
              </div>
              {errors.budgetRange && <span className="text-[11px] text-red-500 font-medium mt-1.5 block">{errors.budgetRange}</span>}
            </div>

            <div className="flex flex-col relative text-left">
              <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">Expected Timeline *</label>
              <div className="relative">
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className={`${selectClass(!!errors.timeline)} peer`}
                >
                  <option value="">Select Timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1 Week">1 Week</option>
                  <option value="2 Weeks">2 Weeks</option>
                </select>
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
              </div>
              {errors.timeline && <span className="text-[11px] text-red-500 font-medium mt-1.5 block">{errors.timeline}</span>}
            </div>
          </div>

          {/* Reference Website Link */}
          <div className="flex flex-col relative text-left">
            <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">Reference Website Link (Optional)</label>
            <div className="relative">
              <textarea
                rows={2}
                placeholder="e.g. https://competitor1.com, https://competitor2.com"
                value={formData.referenceLink}
                onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
                className="w-full bg-white border border-neutral-200/80 focus:border-emerald-500 focus:ring-emerald-500/15 text-neutral-800 text-sm rounded-xl pl-11 pr-4 py-3 transition-all duration-300 outline-none focus:ring-4 placeholder:text-neutral-400 resize-none peer"
              />
              <Link2 className="absolute left-4 top-4 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
            </div>
          </div>

          {/* Custom Brief Box */}
          <div className="flex flex-col relative text-left">
            <label className="text-[10px] text-neutral-500 uppercase font-sans tracking-wider font-semibold mb-2 block">About your project or brand</label>
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Describe your design styling, custom features, or Shopify goals..."
                value={formData.projectDetails}
                onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                className="w-full bg-white border border-neutral-200/80 focus:border-emerald-500 focus:ring-emerald-500/15 text-neutral-800 text-sm rounded-xl pl-11 pr-4 py-3.5 transition-all duration-300 outline-none focus:ring-4 placeholder:text-neutral-400 resize-none min-h-[100px] peer"
              />
              <FileText className="absolute left-4 top-4.5 w-4 h-4 text-neutral-400 transition-colors duration-300 peer-focus:text-emerald-600 pointer-events-none" strokeWidth={1.75} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[52px] rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            Submit Lead <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {submitted && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Cartoon Success Modal */}
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: -6, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                rotate: 0, 
                opacity: 1,
                transition: { type: "spring", damping: 12, stiffness: 100 } 
              }}
              exit={{ 
                scale: 0.8, 
                y: 50, 
                rotate: 4, 
                opacity: 0,
                transition: { duration: 0.2 }
              }}
              className="relative w-[92%] sm:w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-gradient-to-b from-white to-emerald-50 border-[5px] border-black shadow-[8px_8px_0px_0px_#000] text-center flex flex-col items-center gap-6 z-50 overflow-visible"
            >
              {/* Cartoon Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90, boxShadow: "2px 2px 0px #000" }}
                whileTap={{ scale: 0.9, rotate: -45, x: 2, y: 2, boxShadow: "0px 0px 0px #000" }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={handleClose}
                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-11 h-11 rounded-full border-4 border-black bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center shadow-[3px_3px_0px_0px_#000] cursor-pointer outline-none transition-all z-[100]"
                aria-label="Close success popup"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Animated Cartoon Checkmark */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10, delay: 0.1 }}
                className="w-20 h-20 rounded-full border-[5px] border-black bg-emerald-400 flex items-center justify-center shadow-[4px_4px_0px_0px_#000] text-white relative overflow-visible my-2"
              >
                <svg className="w-10 h-10 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>

                {/* Sparkles / floating shapes */}
                <motion.div
                  className="absolute -top-3 -left-3 text-yellow-400 text-2xl filter drop-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] font-bold select-none pointer-events-none"
                  animate={{ 
                    scale: [1, 1.25, 1],
                    rotate: [0, 15, -15, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut"
                  }}
                >
                  ★
                </motion.div>
                <motion.div
                  className="absolute top-2 -right-4 text-cyan-400 text-3xl filter drop-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] font-bold select-none pointer-events-none"
                  animate={{ 
                    scale: [0.9, 1.2, 0.9],
                    rotate: [0, -20, 20, 0],
                    y: [0, 4, 0]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2.8,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                >
                  ✦
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 text-orange-400 text-lg filter drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] font-bold select-none pointer-events-none"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    x: [0, -3, 0],
                    y: [0, -3, 0]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                >
                  ●
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-black text-black uppercase tracking-tight font-sans">
                  Request Received!
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed font-semibold px-2">
                  Thank you for reaching out. We will audit your request details and email you a calendar booking link shortly.
                </p>
              </div>

              {/* Big primary button */}
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "2px 2px 0px #000" }}
                whileTap={{ scale: 0.97, x: 2, y: 2, boxShadow: "0px 0px 0px #000" }}
                onClick={handleClose}
                className="w-full mt-2 py-4 rounded-2xl border-4 border-black bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] cursor-pointer outline-none transition-all text-xs"
              >
                Done, Let's Go! 🚀
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

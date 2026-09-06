"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  category: string;
  location: string;
  avatar: string;
  quote: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "1",
    name: "Naveen Aggarwal",
    category: "Clothing Brand",
    location: "Delhi",
    avatar: "/founder_1.jpg",
    quote: "Partnered with SalePXL to build our D2C Shopify store. Their team delivered a seamless layout that boosted our checkout conversion rate by 35% within the first month."
  },
  {
    id: "2",
    name: "Rasmeen Sethi",
    category: "Indo-Western Apparel",
    location: "Mumbai",
    avatar: "/founder_2.jpg",
    quote: "Dear SalePXL Team, while managing events, I lacked online reach. You built a Shopify store reflecting my Indo-western collections perfectly, making RS truly borderless."
  },
  {
    id: "3",
    name: "Dr. Miheer Pathak",
    category: "Beauty & Skincare",
    location: "Bangalore",
    avatar: "/founder_3.jpg",
    quote: "SalePXL built a stunning website reflecting our brand vision, with intuitive navigation and seamless checkout, driving engagement and online sales effortlessly."
  },
  {
    id: "4",
    name: "Monica Fernandes",
    category: "Jewelry & Accessories",
    location: "Jaipur",
    avatar: "/founder_4.jpg",
    quote: "Our store is now fully optimized for mobile devices and perfectly represents our brand style. The checkout flow is fast and completely frictionless."
  },
  {
    id: "5",
    name: "Malay Trivedi",
    category: "Home & Lifestyle",
    location: "Surat",
    avatar: "/founder_5.jpg",
    quote: "The SalePXL team transformed our entire Shopify UI. We saw an immediate jump in add-to-cart rates and customer trust within the first week of launch."
  },
  {
    id: "6",
    name: "Ananya Sharma",
    category: "Clothing Brand",
    location: "Mumbai",
    avatar: "/founder_6.jpg",
    quote: "Working with the SalePXL team was seamless. They understood our D2C vision and executed custom Liquid sections that elevated our store branding."
  }
];

export default function FoundersReviewsMarquee() {
  const duplicatedReviews = [...REVIEWS_DATA, ...REVIEWS_DATA];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-[#050505] via-[#070d14] to-[#050505] border-t border-white/[0.08]">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#22E39A]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 mb-12 relative z-10 text-center flex flex-col items-center">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight font-grotesk leading-tight">
          Trusted by <span className="text-[#22E39A] font-normal">100+ D2C Founders</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mt-3 font-sans leading-relaxed">
          See how high-converting Shopify stores built by SalePXL Shopify Experts drive measurable growth and revenue for D2C brands.
        </p>
      </div>

      {/* Auto-Scrolling Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Gradient Fades on Left & Right Edges */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        {/* Animated Marquee Track */}
        <motion.div
          className="flex items-stretch gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear"
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedReviews.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[320px] sm:w-[400px] shrink-0 p-6 sm:p-8 rounded-[28px] bg-[#0c141d]/90 border border-white/10 hover:border-[#22E39A]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group backdrop-blur-md"
            >
              <div>
                {/* Header Pill Inside Card */}
                <div className="flex items-center gap-3.5 p-3 rounded-full bg-white/[0.05] border border-white/10 mb-6 group-hover:border-[#22E39A]/30 transition-colors">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#22E39A] shrink-0"
                  />
                  <div className="flex flex-col text-left overflow-hidden pr-2">
                    <span className="text-sm font-bold text-white font-grotesk truncate">
                      {rev.name}
                    </span>
                    <span className="text-xs text-neutral-300 font-sans truncate">
                      {rev.category}, <span className="text-neutral-400">{rev.location}</span>
                    </span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Body Text */}
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed text-left">
                  "{rev.quote}"
                </p>
              </div>

              {/* Bottom Quote Mark Icon */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end">
                <Quote className="w-4 h-4 text-neutral-600 opacity-60" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}


"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function ThankYouPage() {
  useEffect(() => {
    // Fire conversion tracking on thank you page load
    try {
      if (typeof window !== "undefined") {
        if ((window as any).fbq) {
          (window as any).fbq("track", "Lead", {
            content_name: "Shopify Consultation Lead Confirmed",
            status: "Success",
          });
        }
        if ((window as any).gtag) {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-CONVERSION-ID",
            event_category: "Lead",
          });
        }
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "thank_you_page_loaded",
          page: "shopify_landing_thank_you",
        });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 relative overflow-hidden bg-[#050505] text-white">
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 text-center"
      >
        {/* Animated Check Icon */}
        <div className="w-20 h-20 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-[0_0_30px_rgba(34,227,154,0.3)]">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Consultation Request Confirmed</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          Thank You! Your Request Has Been Received
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
          Our senior Shopify architects are currently reviewing your details. We will reach out within <span className="text-primary font-bold">2 hours</span> with a customized strategy for your store.
        </p>

        {/* Next Steps Box */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 text-left mb-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            What Happens Next?
          </h3>
          <div className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Store Audit & Strategy Review</div>
              <div className="text-xs text-neutral-400 mt-0.5">We evaluate your current store layout, mobile UX, and conversion opportunities.</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Direct WhatsApp / Email Outreach</div>
              <div className="text-xs text-neutral-400 mt-0.5">We send a tailored proposal & deliverable breakdown directly to your WhatsApp.</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="text-sm font-semibold text-white">1-on-1 Consultation Call</div>
              <div className="text-xs text-neutral-400 mt-0.5">We walk you through line-by-line store enhancements to turn Meta Ads traffic into sales.</div>
            </div>
          </div>
        </div>

        {/* Immediate Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I%20just%20submitted%20a%20consultation%20request%20for%20my%20Shopify%20store."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("Thank You Page Instant Chat")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba5a] shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Instantly on WhatsApp</span>
          </a>

          <Link
            href="/shopify-landing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-300 active:scale-95"
          >
            <span>Back to Landing Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-white/[0.06] text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Strict Privacy Guaranteed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            <span>Fast 2-Hour Response</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname.startsWith("/shopify-landing") || pathname.startsWith("/shopify-meta-ads") || pathname === "/thank-you";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");

      // Track newsletter subscription in Meta Pixel
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Subscribe", {
          content_name: "Newsletter",
          content_category: "Footer Form",
          currency: "INR",
          value: 1.00
        });
      }
    }
  };

  if (isLandingPage) {
    return (
      <footer className="bg-brand-black border-t border-white/[0.08] relative overflow-hidden py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <Link href="/shopify-landing" className="flex items-center group select-none">
              <img 
                src="/logo.png" 
                alt="SalePixel - Shopify Agency" 
                className="h-8 w-auto object-contain invert hue-rotate-180"
              />
            </Link>
            <p className="text-xs text-[#8C8C8C] max-w-sm">
              SalePXL — High-converting Shopify store development and CRO for high-growth Meta Ads brands.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#8C8C8C]">
            <a href="mailto:helpsalepxl@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>helpsalepxl@gmail.com</span>
            </a>
            <a href="tel:+919917780656" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>+91 9917780656</span>
            </a>
            <a 
              href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I%27m%20interested%20in%20building%20a%20high-converting%20Shopify%20store.%20Can%20we%20chat%3F" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("Minimal Footer")}
              className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366] shrink-0" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#8C8C8C]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-6 pt-6 border-t border-white/[0.05] text-center text-[11px] text-[#555]">
          &copy; {new Date().getFullYear()} SalePXL. All rights reserved. Built for Meta Ads performance.
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-brand-black border-t border-white/[0.08] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-primary/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-8 relative z-10">
        
        {/* Brand Header & Contact info (Mobile & Desktop Top) */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col gap-4 max-w-sm">
            <Link
              href="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center group w-max select-none"
            >
              <img 
                src="/logo.png" 
                alt="SalePixel - Shopify Agency" 
                className="h-8 md:h-9 w-auto object-contain invert hue-rotate-180 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
            <p className="text-[#8C8C8C] text-xs sm:text-sm leading-relaxed">
              SalePXL builds conversion-focused Shopify stores for D2C brands. We combine strategic design, CRO and custom development.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 text-xs text-[#8C8C8C] pt-2 md:pt-0 border-t border-white/[0.08] md:border-0">
            <div className="flex items-center gap-2 group">
              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
              <a href="tel:+919917780656" className="hover:text-white transition-colors font-mono">
                +91 9917780656
              </a>
            </div>
            <div className="flex items-center gap-2 group">
              <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
              <a href="mailto:helpsalepxl@gmail.com" className="hover:text-white transition-colors">
                helpsalepxl@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* 2-COLUMN GRID ON MOBILE (Deliverable.agency style), 4-COLUMN ON DESKTOP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 py-8 border-t border-b border-white/[0.08] mb-8">
          
          {/* Column 1: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#8C8C8C]">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "How We Work", href: "/how-it-works" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#8C8C8C]">
              {[
                { name: "Shopify Store Build", href: "/services" },
                { name: "Custom Liquid PDPs", href: "/services" },
                { name: "CRO Optimization", href: "/services" },
                { name: "Speed Tuning", href: "/services" },
                { name: "Dropshipping Store", href: "/services" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tools & Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Resources
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#8C8C8C]">
              {[
                { name: "Shopify Audit", href: "/shopify-audit" },
                { name: "Launch Calculator", href: "/shopify-launch-calculator" },
                { name: "Blog & Insights", href: "/blog" },
                { name: "Case Studies", href: "/case-studies" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Newsletter */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6 pt-4 md:pt-0 border-t border-white/[0.06] md:border-0">
            <div>
              <h3 className="text-white text-xs font-bold tracking-wider uppercase mb-3">
                Scale Your Brand
              </h3>
              <p className="text-[#8C8C8C] text-xs leading-relaxed mb-3">
                eCommerce insights. Zero spam.
              </p>
              <form onSubmit={handleSubmit} className="relative flex items-center max-w-xs">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#101010] border border-white/[0.08] text-white text-xs rounded-full px-4 py-2.5 focus:outline-none focus:border-primary transition-colors pr-10 h-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-1 rounded-full bg-primary hover:bg-primary-hover transition-all duration-300 text-black w-7 h-7 flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-primary text-xs mt-2 font-medium">
                  Thanks for subscribing to SalePXL!
                </p>
              )}
            </div>

            <div>
              <h3 className="text-white text-xs font-bold tracking-wider uppercase mb-2">
                Legal
              </h3>
              <div className="flex items-center gap-4 text-xs text-[#8C8C8C]">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span>·</span>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8C8C8C] text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} SalePXL (SALEPXL). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

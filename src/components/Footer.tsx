"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

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
                alt="SalePXL Logo" 
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
              href="https://wa.me/919917780656" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("Minimal Footer")}
              className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
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

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
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
                alt="SalePXL Logo" 
                className="h-9 w-auto object-contain invert hue-rotate-180 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
            <p className="text-[#8C8C8C] text-sm leading-relaxed max-w-xs">
              Conversion-engineered Shopify Stores for high-growth D2C brands.
            </p>
            <div className="flex flex-col gap-3 text-xs text-[#8C8C8C]">
              <div className="flex items-center gap-2 group">
                <Phone className="w-4 h-4 text-primary premium-hover-icon" />
                <a href="tel:+919917780656" className="premium-hover-link">
                  +91 9917780656
                </a>
              </div>
              <div className="flex items-center gap-2 group">
                <Mail className="w-4 h-4 text-primary premium-hover-icon" />
                <a href="mailto:helpsalepxl@gmail.com" className="premium-hover-link">
                  helpsalepxl@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 group">
                <MapPin className="w-4 h-4 text-primary premium-hover-icon" />
                <span>Dehradun, Uttarakhand, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm text-[#8C8C8C]">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="premium-hover-link inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">
              Services
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm text-[#8C8C8C]">
              {[
                { name: "Shopify Development", href: "/services" },
                { name: "Shopify CRO Optimization", href: "/services" },
                { name: "Dropshipping Store", href: "/services" },
                { name: "Custom Shopify Development", href: "/services" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="premium-hover-link inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Call */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
                Scale Your Brand
              </h3>
              <p className="text-[#8C8C8C] text-xs leading-relaxed mb-4">
                eCommerce insights. Zero spam.
              </p>
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#101010] border border-white/[0.08] text-white text-xs rounded-full px-5 py-3 focus:outline-none focus:border-primary transition-colors pr-12 h-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-1.5 rounded-full bg-primary hover:bg-primary-hover transition-all duration-300 text-black w-8 h-8 flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <p className="text-primary text-xs mt-2 font-medium">
                  Thanks for subscribing to SalePXL!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8C8C8C] text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} SalePXL (SALEPXL). All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#8C8C8C]">
            <Link href="/privacy" className="premium-hover-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="premium-hover-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

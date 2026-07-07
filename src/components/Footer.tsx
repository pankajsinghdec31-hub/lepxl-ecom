"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#111111] border-t border-white/[0.08] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#00AF56]/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#00AF56]/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00AF56]/80 to-[#00AF56] flex items-center justify-center font-bold text-black text-lg transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(0,175,86,0.3)]">
                S
              </span>
              <span className="text-white font-semibold text-xl tracking-tight">
                Sale<span className="text-[#00AF56] font-bold">PXL</span>
              </span>
            </Link>
            <p className="text-[#8C8C8C] text-sm leading-relaxed max-w-xs">
              We help businesses launch, redesign, and optimize Shopify stores that are beautiful, trustworthy, and conversion-focused.
            </p>
            <div className="flex flex-col gap-3 text-xs text-[#8C8C8C]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00AF56]" />
                <a href="tel:+919917780656" className="hover:text-white transition-colors">
                  +91 9917780656
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00AF56]" />
                <a href="mailto:growth@salepxl.com" className="hover:text-white transition-colors">
                  growth@salepxl.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00AF56]" />
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
                  <Link href={link.href} className="hover:text-white transition-colors">
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
                  <Link href={link.href} className="hover:text-white transition-colors">
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
                Get high-converting eCommerce strategies delivered directly to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181818] border border-white/[0.08] text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#00AF56] transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-1.5 rounded-lg bg-[#00AF56] hover:bg-[#00AF56]/90 transition-colors text-black"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[#00AF56] text-xs mt-2 font-medium">
                  Thanks for subscribing to SalePXL!
                </p>
              )}
            </div>

            {/* Registration Details */}
            <div className="p-4 rounded-2xl bg-[#181818] border border-white/[0.05] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00AF56] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#8C8C8C] font-semibold uppercase tracking-wider">
                  Government Registered MSME
                </span>
                <span className="text-xs text-white font-medium">
                  SALEPXL
                </span>
                <span className="text-[10px] text-[#8C8C8C]">
                  UDYAM-UK-05-0097916
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8C8C8C] text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} SalePXL (SALEPXL). All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#8C8C8C]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

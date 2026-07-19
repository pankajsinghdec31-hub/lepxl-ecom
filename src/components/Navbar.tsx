"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Dynamically toggle body class for the homepage layout
  useEffect(() => {
    if (pathname === "/") {
      document.body.classList.add("home-page");
    } else {
      document.body.classList.remove("home-page");
    }
    return () => {
      document.body.classList.remove("home-page");
    };
  }, [pathname]);

  const isContactPage = pathname !== "/";
  const isPricingPage = pathname === "/pricing";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isPricingPage
            ? "bg-white shadow-sm border-b border-black/[0.06] py-4"
            : isScrolled
              ? isContactPage
                ? "bg-white/85 backdrop-blur-md border-b border-black/[0.06] py-4"
                : "bg-[#050505]/80 backdrop-blur-md border-b border-white/[0.08] py-4"
              : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center group select-none min-h-[44px]">
            <img 
              src="/logo.png" 
              alt="SalePXL Logo" 
              className={`h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] ${
                isContactPage ? "" : "invert hue-rotate-180"
              }`}
            />
          </Link>
 
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {NAV_LINKS.filter(l => l.name !== "Home").map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs lg:text-sm font-medium relative py-2 transition-all whitespace-nowrap ${
                    isActive 
                      ? "text-primary font-semibold" 
                      : isContactPage 
                      ? "text-black/70 hover:text-primary" 
                      : "text-white premium-hover-link"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
 
          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="https://wa.me/919917780656"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-colors ${
                isContactPage 
                  ? "text-black/60 hover:text-black" 
                  : "text-[#8e8e93] premium-hover-link"
              }`}
            >
              WhatsApp Us
            </Link>
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center px-6 h-12 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                isContactPage 
                  ? "text-white bg-black hover:bg-black/90 shadow-[0_4px_12px_rgba(0,0,0,0.1)]" 
                  : "text-black bg-white hover:bg-white/95 shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
              }`}
            >
              <span>Start Now</span>
            </Link>
          </div>
 
          {/* Mobile Menu Button & Link */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href="/contact"
              className={`text-sm font-semibold transition-colors ${
                isContactPage 
                  ? "text-black hover:text-primary" 
                  : "text-white premium-hover-link"
              }`}
            >
              Start for free
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-11 h-11 flex items-center justify-center transition-colors ${isContactPage ? "text-black" : "text-white premium-hover-icon"}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
 
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.08] px-6 py-8 md:hidden flex flex-col justify-between overflow-y-auto hide-scrollbar"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-xl font-medium block py-2 ${
                        isActive ? "text-primary" : "text-white hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="border-t border-white/[0.08] pt-4 mt-2 flex flex-col gap-4">
                <span className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-sans font-bold">Growth Tools</span>
                <Link
                  href="/shopify-audit"
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Free CRO Audit
                </Link>
                <Link
                  href="/shopify-launch-calculator"
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Shopify Launch Calculator
                </Link>
              </div>
            </div>
 
            <div className="flex flex-col gap-4 pb-12">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 btn-primary h-12 rounded-full text-sm font-bold uppercase tracking-wider text-black bg-white text-center shadow-sm"
              >
                <span>Start Now</span>
              </Link>
              <Link
                href="https://wa.me/919917780656"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 btn-secondary h-12 rounded-full text-sm font-semibold uppercase tracking-wider text-white border border-white/20 text-center"
              >
                <span>WhatsApp Us</span>
              </Link>
              <div className="text-center text-xs text-[#8e8e93] flex items-center justify-center gap-1.5 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Government Registered MSME</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

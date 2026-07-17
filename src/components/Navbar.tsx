"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Case Studies", href: "/case-studies" },
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#02090a]/80 backdrop-blur-md border-b border-white/[0.05] py-4"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg className="w-7 h-7 shrink-0" viewBox="0 0 34 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.45 10.98c-.46-1.22-1.55-2.02-2.82-2.12l-5.68-.42L18.42 2.3c-.34-1.29-1.4-2.19-2.7-2.31-1.3-.12-2.51.58-3.04 1.8L8.14 11.23l-3.32-.25c-1.32-.1-2.52.56-3.08 1.77l-1.56 3.4a2.95 2.95 0 00.17 2.98c.57.88 1.57 1.41 2.65 1.41h26.79c1.08 0 2.08-.53 2.65-1.41a2.95 2.95 0 00.17-2.98l-4.16-9.17z" fill="#95BF47"/>
              <path d="M15.72 1.02c-2.48 0-4.48 2-4.48 4.48v3.36h8.96V5.5c0-2.48-2-4.48-4.48-4.48z" fill="#5E8E3E"/>
              <path d="M6.16 36.5h19.04c2.41 0 4.37-1.96 4.37-4.37V14.18H1.79v17.95c0 2.41 1.96 4.37 4.37 4.37z" fill="#95BF47"/>
              <path d="M13.62 19.5c0-1.2.98-2.18 2.18-2.18 1.2 0 2.18.98 2.18 2.18v4.8c0 1.2-.98 2.18-2.18 2.18-1.2 0-2.18-.98-2.18-2.18v-4.8z" fill="white"/>
            </svg>
            <span className="text-white font-semibold text-xl tracking-tight lowercase">
              shopify
            </span>
          </Link>
 
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-2 ${
                    isActive ? "text-primary" : "text-white hover:text-primary"
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
              className="text-sm font-medium text-[#8e8e93] hover:text-white transition-colors"
            >
              WhatsApp Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
            >
              <span>Start Now</span>
            </Link>
          </div>
 
          {/* Mobile Menu Button & Link */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href="/contact"
              className="text-sm font-semibold text-white hover:text-[#36F4A4] transition-colors underline decoration-white hover:decoration-[#36F4A4] decoration-[1.5px] underline-offset-4"
            >
              Start for free
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-primary transition-colors"
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
            className="fixed inset-0 top-[72px] z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.05] px-6 py-8 md:hidden flex flex-col justify-between"
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
              
              <div className="border-t border-white/[0.05] pt-4 mt-2 flex flex-col gap-4">
                <span className="text-[10px] text-[#8e8e93] uppercase tracking-wider font-mono font-bold">Growth Tools</span>
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
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-white text-center hover:bg-white/90 transition-all duration-200 shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
              >
                <span>Start Now</span>
              </Link>
              <Link
                href="https://wa.me/919917780656"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white border border-white/20 text-center hover:bg-white/5 transition-all duration-200"
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

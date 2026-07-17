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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-black/[0.05] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary/80 to-primary flex items-center justify-center font-bold text-white text-lg transition-transform duration-300 group-hover:scale-105 shadow-[0_4px_12px_rgba(55,126,98,0.2)]">
              S
            </span>
            <span className="text-[#1a1a1a] font-semibold text-xl tracking-tight">
              Sale<span className="text-primary font-bold">PXL</span>
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
                    isActive ? "text-primary" : "text-[#4a4a4a] hover:text-[#1a1a1a]"
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
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-primary overflow-hidden group transition-all duration-300 hover:bg-[#2a6350] hover:shadow-[0_8px_24px_rgba(55,126,98,0.25)] hover:scale-[1.02]"
            >
              <span>Get Free Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
            className="fixed inset-0 top-[72px] z-40 bg-white border-t border-black/[0.05] px-6 py-8 md:hidden flex flex-col justify-between"
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
                        isActive ? "text-primary" : "text-[#4a4a4a] hover:text-[#1a1a1a]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="border-t border-black/[0.05] pt-4 mt-2 flex flex-col gap-4">
                <span className="text-[10px] text-[#7a7a7a] uppercase tracking-wider font-mono font-bold">Growth Tools</span>
                <Link
                  href="/shopify-audit"
                  className="text-sm font-semibold text-primary hover:text-[#2a6350] transition-colors"
                >
                  Free CRO Audit
                </Link>
                <Link
                  href="/shopify-launch-calculator"
                  className="text-sm font-semibold text-primary hover:text-[#2a6350] transition-colors"
                >
                  Shopify Launch Calculator
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-6 pb-12">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-primary text-center hover:bg-[#2a6350]"
              >
                <span>Get Free Consultation</span>
                <ArrowUpRight className="w-4.5 h-4.5" />
              </Link>
              <div className="text-center text-xs text-[#7a7a7a] flex items-center justify-center gap-1.5">
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

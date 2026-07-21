"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackWhatsAppClick, trackCTAClick } from "@/lib/analytics";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Our Process", href: "/how-it-works" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname.startsWith("/shopify-landing") || pathname.startsWith("/shopify-meta-ads") || pathname === "/thank-you";

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

  if (isLandingPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.08] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/shopify-landing" className="flex items-center group select-none min-h-[40px]">
            <img 
              src="/logo.png" 
              alt="SalePXL Logo" 
              className="h-8 sm:h-9 w-auto object-contain invert hue-rotate-180 transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <a
              href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I%20came%20from%20your%20Shopify%20landing%20page."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("Header Minimal Nav")}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-300 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="hidden xs:inline">WhatsApp</span>
            </a>

            <a
              href="#lead-form"
              onClick={() => trackCTAClick({ cta_name: "Book Strategy Call Header", cta_location: "Minimal Header" })}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-primary hover:bg-primary-hover shadow-[0_0_20px_rgba(34,227,154,0.3)] transition-all duration-300 active:scale-95 whitespace-nowrap"
            >
              Book Strategy Call
            </a>
          </div>
        </div>
      </header>
    );
  }

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
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center group select-none min-h-[44px]"
          >
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

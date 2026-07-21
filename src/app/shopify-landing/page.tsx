"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Phone,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ArrowUpRight,
  ShoppingBag,
  Smartphone,
  Code,
  Sliders,
  Star,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Layers,
  Lock,
  Clock,
  ExternalLink,
  User,
  Mail,
  Building,
  Globe,
  DollarSign,
  FileText,
  Truck,
  CreditCard,
  Camera,
  LayoutGrid
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  trackLeadEvent,
  trackWhatsAppClick,
  trackCTAClick,
  useScrollTracking
} from "@/lib/analytics";

// ─── WhatsApp SVG Logo Component ─────────────────────────────────────────
function WhatsAppLogo({ className = "w-4 h-4 fill-[#25D366]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Animated Stat Counter Component ──────────────────────────────────────
function AnimatedStatCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const match = value.match(/^([^\d]*)([\d.]+)([^\d]*)$/);
          if (!match) return;

          const prefix = match[1];
          const targetNum = parseFloat(match[2]);
          const suffix = match[3];

          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = targetNum * easeProgress;

            const formattedNum =
              targetNum % 1 === 0
                ? Math.floor(currentNum).toString()
                : currentNum.toFixed(1);

            setDisplayValue(`${prefix}${formattedNum}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref}>{displayValue}</div>;
}

// ─── 1. Portfolio Marquee Data ──────────────────────────────────────────────
const PORTFOLIO_IMAGES_ROW1 = [
  { src: "/chomp.jpg", alt: "Chomp Brand" },
  { src: "/offlimits.jpg", alt: "OffLimits" },
  { src: "/baboon.jpg", alt: "Baboon to the Moon" },
  { src: "https://jhango-images.b-cdn.net/images/ownly-club.webp", alt: "Ownly Club" },
  { src: "https://jhango-images.b-cdn.net/images/pretty-kitty.webp", alt: "Pretty Kitty" },
  { src: "https://jhango-images.b-cdn.net/images/sobo-beauty.webp", alt: "Sobo Beauty" },
  { src: "https://jhango-images.b-cdn.net/images/well-essentials.webp", alt: "Well Essentials" },
  { src: "https://jhango-images.b-cdn.net/images/wyrd-in.webp", alt: "Wyrd" },
  { src: "https://jhango-images.b-cdn.net/images/amarose.webp", alt: "Amarose" },
  { src: "https://jhango-images.b-cdn.net/images/anukiran.webp", alt: "Anukiran" },
  { src: "https://jhango-images.b-cdn.net/images/biotastic.webp", alt: "Biotastic" }
];

const PORTFOLIO_IMAGES_ROW2 = [
  { src: "/spanx.jpg", alt: "Spanx" },
  { src: "/glossier.png", alt: "Glossier" },
  { src: "https://jhango-images.b-cdn.net/images/crumbbs-in.webp", alt: "Crumbbs" },
  { src: "https://jhango-images.b-cdn.net/images/floof-and-co.webp", alt: "Floof & Co" },
  { src: "https://jhango-images.b-cdn.net/images/kaayu-world.webp", alt: "Kaayu World" },
  { src: "https://jhango-images.b-cdn.net/images/kohkayn-com.webp", alt: "Kohkayn" },
  { src: "https://jhango-images.b-cdn.net/images/newdru.webp", alt: "Newdru" },
  { src: "https://jhango-images.b-cdn.net/images/skin-basics.webp", alt: "Skin Basics" },
  { src: "https://jhango-images.b-cdn.net/images/sleep-shell-2.webp", alt: "Sleep Shell" },
  { src: "https://jhango-images.b-cdn.net/images/swadezi.webp", alt: "Swadezi" }
];

// ─── 2. Testimonial Data ─────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Monica Fernandes",
    brand: "Jewelry & Accessories",
    image: "/founder_2.jpg",
    stars: 5,
    quote: "Our store checkout is now fully setup with Razorpay, COD verification, and Shiprocket tracking. Our sales jumped from 1.2% to 3.8% instantly!",
    statVal: "+4.2%",
    statLabel: "Conversion Rate"
  },
  {
    name: "Malay Trivedi",
    brand: "Apparel & Streetwear",
    image: "/founder_4.jpg",
    stars: 5,
    quote: "The speed was amazing. Our store was live in 3 days with custom sections and slide cart upsells that doubled our average order value.",
    statVal: "3 Days",
    statLabel: "Delivery Speed"
  },
  {
    name: "James Park",
    brand: "Health & Wellness",
    image: "/founder_5.jpg",
    stars: 5,
    quote: "Their AI product photo service saved us lakhs in photography costs. They turned simple pictures into beautiful catalog photos easily!",
    statVal: "-90%",
    statLabel: "Photo Shoot Costs"
  },
  {
    name: "Deepika Nair",
    brand: "Home Decor & Furnishings",
    image: "/founder_3.jpg",
    stars: 5,
    quote: "SalePXL set up our shipping partners and payment gateways smoothly. The store looks clean and loads super fast on mobile.",
    statVal: "+3.8x",
    statLabel: "Revenue Lift"
  }
];

// ─── 3. Why Choose SalePXL Data ──────────────────────────────────────────────
const WHY_CHOOSE_ITEMS = [
  {
    title: "High-Converting Store Design",
    desc: "Clean, easy-to-use layouts designed to turn casual visitors into paying customers.",
    icon: ShoppingBag,
    tag: "More Sales"
  },
  {
    title: "Custom Drag-and-Drop Sections",
    desc: "Bespoke sections made for your brand that you can easily edit anytime.",
    icon: LayoutGrid,
    tag: "Easy Editing"
  },
  {
    title: "Payment Gateway Setup",
    desc: "Easy payment integration with Razorpay, Stripe, Paytm, and COD order verification.",
    icon: CreditCard,
    tag: "Easy Checkout"
  },
  {
    title: "Shipping Partner Integration",
    desc: "Automatic order sync with Shiprocket and Delhivery for easy tracking and shipping.",
    icon: Truck,
    tag: "Auto Shipping"
  },
  {
    title: "AI Product Photoshoots",
    desc: "Turn basic product photos into studio-quality photos, saving lakhs in camera costs.",
    icon: Camera,
    tag: "Save Money"
  },
  {
    title: "Built for Mobile Phones",
    desc: "Over 80% of buyers shop on phones. We make your store fast and easy to use on mobile.",
    icon: Smartphone,
    tag: "Mobile Ready"
  },
  {
    title: "Super Fast Load Speed",
    desc: "Sub-1.2 second load speed so buyers never leave your page out of frustration.",
    icon: Zap,
    tag: "Sub-1.2s Speed"
  },
  {
    title: "Slide Cart & Order Upsells",
    desc: "1-click cart upsells, free shipping progress bars, and bundle discounts that increase order value.",
    icon: Sliders,
    tag: "Higher Orders"
  }
];

// ─── 4. Shopify Services Data ────────────────────────────────────────────────
const SHOPIFY_SERVICES = [
  {
    title: "Custom Shopify Store Building",
    desc: "We build custom OS 2.0 Shopify stores from scratch with clean layouts, zero clutter, and fast loading speed.",
    icon: ShoppingBag,
    highlight: "Custom Shopify OS 2.0"
  },
  {
    title: "Custom Sections & Theme Design",
    desc: "Tailored drag-and-drop sections like product builders, sticky buy bars, and slide cart drawers.",
    icon: LayoutGrid,
    highlight: "Custom Sections"
  },
  {
    title: "Payment Gateway Integration",
    desc: "Setup for Razorpay, Stripe, Cashfree, Paytm, and Cash-On-Delivery (COD) verification.",
    icon: CreditCard,
    highlight: "Razorpay & Stripe"
  },
  {
    title: "Shipping Partner Integration",
    desc: "Setup with Shiprocket, Delhivery, DTDC, and Ekart for automatic shipping rates and order tracking.",
    icon: Truck,
    highlight: "Shiprocket & Delhivery"
  },
  {
    title: "AI Product Photos & Catalog Setup",
    desc: "Turn basic product photos into studio quality lifestyle images. Includes up to 20 free product listings.",
    icon: Camera,
    highlight: "AI Product Photos"
  },
  {
    title: "Shopify Speed Optimization",
    desc: "Speed optimization to get 90+ Google PageSpeed scores so your store opens instantly on mobile.",
    icon: Zap,
    highlight: "Fast Mobile Speed"
  },
  {
    title: "App Setup & Automations",
    desc: "Full setup for Klaviyo emails, WhatsApp order updates, customer reviews, and payment gateways.",
    icon: Code,
    highlight: "Complete App Setup"
  }
];

// ─── 5. FAQ Data ─────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "How long does it take to build a Shopify store?",
    a: "Our standard delivery time is 3 to 7 business days for a complete, high-converting Shopify store."
  },
  {
    q: "How do payment gateways and Cash on Delivery (COD) work?",
    a: "We set up official payment gateways like Razorpay, Stripe, and Paytm for instant payments, plus Cash on Delivery (COD) verification to prevent fake orders."
  },
  {
    q: "Which shipping services do you integrate?",
    a: "We integrate Shiprocket, Delhivery, DTDC, and other shipping partners directly into your Shopify dashboard for automatic label printing and order tracking."
  },
  {
    q: "How does the AI Product Photoshoot service work?",
    a: "Send us basic product photos, and our AI design pipeline transforms them into high-quality lifestyle photos. This saves lakhs in studio photography costs."
  },
  {
    q: "Can I easily edit my store content myself?",
    a: "Yes! We build drag-and-drop custom sections so you can easily change text, images, products, and banners anytime from your Shopify dashboard."
  },
  {
    q: "Can you transfer my store from WordPress or WooCommerce?",
    a: "Yes. We safely move your products, customers, and order history to Shopify without any downtime."
  },
  {
    q: "What support do you provide after the store is live?",
    a: "We provide 30 days of free support after launch, plus a 1-on-1 walkthrough session so you feel 100% confident managing your store."
  },
  {
    q: "What are your payment terms?",
    a: "50% advance to start work, and the remaining 50% after your store is complete and you approve it."
  }
];

export default function MetaAdsShopifyLandingPage() {
  const router = useRouter();

  // Scroll tracking hook
  useScrollTracking();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    phone: "",
    email: "",
    website: "",
    monthlyRevenue: "Under ₹1 Lakh",
    projectBudget: "Under ₹20,000",
    projectDetails: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Testimonial Auto Slider State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Why Choose SalePXL Auto Slider State
  const [whyChooseIdx, setWhyChooseIdx] = useState(0);
  const [isWhyChooseHovered, setIsWhyChooseHovered] = useState(false);

  useEffect(() => {
    if (isWhyChooseHovered) return;
    const timer = setInterval(() => {
      setWhyChooseIdx((prev) => (prev + 1) % WHY_CHOOSE_ITEMS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isWhyChooseHovered]);

  // Open FAQ State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Form Handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
    if (!formData.businessName.trim()) errors.businessName = "Business/Brand Name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required for WhatsApp updates";
    } else if (formData.phone.replace(/\D/g, "").length < 8) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.projectDetails.trim()) errors.projectDetails = "Please tell us briefly about your store goals";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const redirectPath =
      typeof window !== "undefined" && window.location.pathname.startsWith("/shopify-meta-ads")
        ? "/shopify-meta-ads/thank-you"
        : "/shopify-landing/thank-you";

    try {
      // 1. Submit lead to API
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "shopify-landing",
          name: formData.fullName,
          businessName: formData.businessName,
          phone: formData.phone,
          email: formData.email,
          website: formData.website,
          monthlyRevenue: formData.monthlyRevenue,
          projectBudget: formData.projectBudget,
          projectDetails: formData.projectDetails,
          service: "High-Converting Shopify Store Consultation"
        })
      });

      // 2. Track analytics
      trackLeadEvent({
        name: formData.fullName,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        monthlyRevenue: formData.monthlyRevenue,
        budgetRange: formData.projectBudget,
        service: "Shopify Store Development",
        source: "shopify_landing"
      });

      // 3. Redirect to Thank You page
      router.push(redirectPath);
    } catch (error) {
      console.error("[Landing Form Error]:", error);
      router.push(redirectPath);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-[#f0fdf4] to-slate-50 text-slate-900 font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Clean Interactive Background Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#05966914_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />

      {/* Hardware Accelerated Background Ambient Green Glows */}
      <motion.div
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[360px] sm:w-[650px] lg:w-[850px] h-[380px] sm:h-[550px] bg-gradient-to-tr from-emerald-300/35 via-teal-200/25 to-transparent rounded-full blur-[150px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [0, 18, 0], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[1200px] right-0 w-[320px] sm:w-[550px] h-[450px] bg-gradient-to-bl from-emerald-300/30 via-teal-100/20 to-transparent rounded-full blur-[160px] pointer-events-none z-0"
      />

      {/* ─── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative pt-8 sm:pt-16 lg:pt-20 pb-12 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4 sm:mb-5 shadow-sm max-w-full text-center"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">⚡ High-Converting Shopify Store Agency</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[22px] xs:text-[28px] sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2] mb-4 sm:mb-6"
          >
            We Build High-Converting Shopify Stores{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
              That Scale Your Brand
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-7 sm:mb-8 font-medium px-1"
          >
            Get a fast, beautiful Shopify store with custom sections, payment gateways (Razorpay, Stripe), fast shipping integration (Shiprocket), and AI product photos.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-9 sm:mb-14 w-full"
          >
            <a
              href="#lead-form"
              onClick={() => trackCTAClick({ cta_name: "Get Project Quote Hero", cta_location: "Hero Primary" })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-[0_8px_30px_rgba(16,185,129,0.35)] active:scale-95 transition-all duration-300 group cursor-pointer"
            >
              <span>Get Free Project Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I%20need%20a%20high-converting%20Shopify%20store%20built."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("Hero Secondary CTA")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-emerald-50/60 border border-emerald-200 shadow-sm active:scale-95 transition-all duration-300"
            >
              <WhatsAppLogo className="w-4 h-4 fill-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

          {/* 4 Key Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto pt-5 border-t border-emerald-100"
          >
            {[
              { val: "100+", label: "Stores Built", desc: "Real Client Results" },
              { val: "Shopify", label: "Official Experts", desc: "OS 2.0 Certified" },
              { val: "Easy", label: "Payments & Shipping", desc: "Razorpay & Shiprocket" },
              { val: "Sub-1.2s", label: "Fast Mobile Speed", desc: "90+ PageSpeed score" }
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/90 border border-emerald-100 rounded-2xl p-3.5 sm:p-4 text-center hover:border-emerald-300 hover:shadow-[0_10px_25px_rgba(16,185,129,0.12)] transition-all duration-300 shadow-sm"
              >
                <div className="text-base sm:text-2xl font-extrabold text-emerald-600 font-mono mb-0.5">
                  <AnimatedStatCounter value={badge.val} />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {badge.label}
                </div>
                <div className="text-[9px] sm:text-[11px] text-slate-500 mt-0.5">
                  {badge.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Showcase Grid Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="mt-8 sm:mt-14 relative max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-emerald-200/80 bg-white p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {/* Feature 1: Custom Sections */}
              <div className="bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 border border-emerald-100 hover:border-emerald-400 rounded-2xl p-4 flex flex-col justify-between space-y-2.5 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(16,185,129,0.12)] group">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Custom Sections</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">Easy drag-and-drop sections, product builders, and cart drawers.</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200 w-fit">✓ Easy Editing</span>
              </div>

              {/* Feature 2: Payment Gateways */}
              <div className="bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 border border-emerald-100 hover:border-emerald-400 rounded-2xl p-4 flex flex-col justify-between space-y-2.5 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(16,185,129,0.12)] group">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Payment Setup</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">Razorpay, Stripe, Cashfree, Paytm, and COD options.</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200 w-fit">✓ Easy Payments</span>
              </div>

              {/* Feature 3: Shipping Integration */}
              <div className="bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 border border-emerald-100 hover:border-emerald-400 rounded-2xl p-4 flex flex-col justify-between space-y-2.5 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(16,185,129,0.12)] group">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Shipping Partners</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">Shiprocket, Delhivery, DTDC, and automatic order tracking.</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200 w-fit">✓ Auto Shipping</span>
              </div>

              {/* Feature 4: AI Photoshoots */}
              <div className="bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 border border-emerald-100 hover:border-emerald-400 rounded-2xl p-4 flex flex-col justify-between space-y-2.5 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(16,185,129,0.12)] group">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">AI Product Photos</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">Turn simple photos into studio quality shots + 20 free listings.</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200 w-fit">✓ Save Photo Costs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. WHY SALEPXL SECTION ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 border-t border-emerald-100">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 block font-mono">
            Why Choose SalePXL
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why E-Commerce Brands Choose SalePXL
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            We fix slow load times, poor mobile design, and complicated checkout steps so you get more sales.
          </p>
        </motion.div>

        {/* Auto Sliding Showcase Cards */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsWhyChooseHovered(true)}
          onMouseLeave={() => setIsWhyChooseHovered(false)}
        >
          {/* Controls: Prev & Next Buttons */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="text-xs text-slate-500 font-mono">
              Features Showcase <span className="text-emerald-600 font-bold">{whyChooseIdx + 1}</span> / {WHY_CHOOSE_ITEMS.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setWhyChooseIdx((prev) => (prev === 0 ? WHY_CHOOSE_ITEMS.length - 1 : prev - 1))
                }
                className="w-8 h-8 rounded-full bg-white hover:bg-emerald-50 border border-emerald-200 flex items-center justify-center text-slate-800 transition-colors shadow-sm cursor-pointer"
                aria-label="Previous feature"
              >
                <ChevronLeft className="w-4 h-4 text-emerald-700" />
              </button>
              <button
                onClick={() =>
                  setWhyChooseIdx((prev) => (prev + 1) % WHY_CHOOSE_ITEMS.length)
                }
                className="w-8 h-8 rounded-full bg-white hover:bg-emerald-50 border border-emerald-200 flex items-center justify-center text-slate-800 transition-colors shadow-sm cursor-pointer"
                aria-label="Next feature"
              >
                <ChevronRight className="w-4 h-4 text-emerald-700" />
              </button>
            </div>
          </div>

          {/* Active Card Slider View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[0, 1].map((offset) => {
              const itemIdx = (whyChooseIdx + offset) % WHY_CHOOSE_ITEMS.length;
              const item = WHY_CHOOSE_ITEMS[itemIdx];
              const IconComp = item.icon;
              return (
                <AnimatePresence key={`${itemIdx}-${offset}`} mode="wait">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white border border-emerald-200/80 hover:border-emerald-400 rounded-2xl p-6 sm:p-8 text-left transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.12)] min-h-[200px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              );
            })}
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {WHY_CHOOSE_ITEMS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setWhyChooseIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === whyChooseIdx
                    ? "w-6 bg-emerald-600"
                    : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. SHOPIFY PORTFOLIO MARQUEE SHOWCASE ───────────────────────────── */}
      <section className="py-14 sm:py-20 relative overflow-hidden bg-gradient-to-b from-white via-[#f0fdf4]/50 to-white border-t border-emerald-100 z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="max-w-[1360px] mx-auto px-4 sm:px-6 mb-10 text-center"
        >
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 font-mono block mb-2">
            Our Portfolio
          </span>
          <h2 className="text-2.5xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight font-sans">
            Shopify Stores <span className="text-emerald-600 font-normal">We've</span> Built & <span className="text-slate-900 font-bold">Transformed</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto mt-2">
            Real Shopify stores built for fast mobile speed, easy shopping, and higher sales.
          </p>
        </motion.div>

        {/* Row 1 Marquee */}
        <div className="marquee-container marquee-pause mb-5 sm:mb-6">
          <div className="marquee-content" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW1.map((img, idx) => (
              <div key={idx} className="premium-hover-image-container flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[280px] rounded-[20px] sm:rounded-[24px] border border-slate-200 hover:border-emerald-400 shadow-md bg-white">
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="premium-hover-image w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW1.map((img, idx) => (
              <div key={idx + "-dup"} className="premium-hover-image-container flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[280px] rounded-[20px] sm:rounded-[24px] border border-slate-200 hover:border-emerald-400 shadow-md bg-white">
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="premium-hover-image w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Marquee - Reverse */}
        <div className="marquee-container marquee-pause">
          <div className="marquee-content-reverse" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW2.map((img, idx) => (
              <div key={idx} className="premium-hover-image-container flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[280px] rounded-[20px] sm:rounded-[24px] border border-slate-200 hover:border-emerald-400 shadow-md bg-white">
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="premium-hover-image w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="marquee-content-reverse" aria-hidden="true" style={{ "--marquee-speed": "45s" } as React.CSSProperties}>
            {PORTFOLIO_IMAGES_ROW2.map((img, idx) => (
              <div key={idx + "-dup"} className="premium-hover-image-container flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[280px] rounded-[20px] sm:rounded-[24px] border border-slate-200 hover:border-emerald-400 shadow-md bg-white">
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="premium-hover-image w-full display-block object-cover object-top select-none pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 px-4">
          <a
            href="#lead-form"
            onClick={() => trackCTAClick({ cta_name: "Build Your Store Portfolio Section", cta_location: "Marquee Portfolio" })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-[0_6px_25px_rgba(16,185,129,0.3)] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>Build Your High-Converting Store</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800 bg-white border border-slate-200 hover:bg-emerald-50 shadow-sm active:scale-95 transition-all duration-300"
          >
            <span>View Full Portfolio</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </Link>
        </div>
      </section>

      {/* ─── 4. OUR PROCESS SECTION (5-Step Conversion Process) ──────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 border-t border-emerald-100">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 block font-mono">
            How It Works
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our 5-Step Store Building Process
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            How we help your store turn visitors into happy customers.
          </p>
        </motion.div>

        {/* Process Flow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 relative">
          {[
            {
              step: "01",
              title: "Store Visit",
              desc: "Buyers land on your fast, mobile-friendly store homepage.",
              metric: "Sub-1.2s Speed"
            },
            {
              step: "02",
              title: "Build Trust",
              desc: "Show customer reviews, star ratings, and secure badges.",
              metric: "High Trust"
            },
            {
              step: "03",
              title: "Easy Shopping",
              desc: "Simple product navigation, custom sections, and clear cart.",
              metric: "Easy UX"
            },
            {
              step: "04",
              title: "Quick Checkout",
              desc: "Easy payment with Razorpay, Stripe, or Cash on Delivery.",
              metric: "Quick Sales"
            },
            {
              step: "05",
              title: "Happy Customers",
              desc: "Automatic shipping tracking updates and repeat buyers.",
              metric: "Brand Growth"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white/90 border border-emerald-100 hover:border-emerald-400 rounded-2xl p-5 text-left relative group transition-all duration-300 shadow-sm hover:shadow-[0_10px_25px_rgba(16,185,129,0.12)]"
            >
              <div className="text-2.5xl sm:text-3xl font-black font-mono text-emerald-500/30 group-hover:text-emerald-600 transition-colors mb-2.5">
                {item.step}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {item.desc}
              </p>
              <div className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
                {item.metric}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS SECTION ────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 border-t border-emerald-100">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 block font-mono">
            Client Reviews
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What E-Commerce Founders Say About Us
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            See how we helped 100+ brands build better Shopify stores.
          </p>
        </motion.div>

        {/* Testimonial Auto Slider Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {TESTIMONIALS.map((t, idx) => {
              if (idx !== activeTestimonialIdx) return null;
              return (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-gradient-to-b from-white via-emerald-50/40 to-white border border-emerald-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(16,185,129,0.08)] text-left"
                >
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.stars)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      ))}
                    </div>

                    <p className="text-sm sm:text-lg lg:text-xl text-slate-800 leading-relaxed font-medium italic">
                      "{t.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <img
                        src={t.image}
                        alt={t.name}
                        loading="lazy"
                        decoding="async"
                        className="w-10 h-10 rounded-full object-cover border border-emerald-300 shrink-0 shadow-sm"
                      />
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">{t.name}</h4>
                        <p className="text-xs text-slate-500">{t.brand}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Testimonial Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {TESTIMONIALS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveTestimonialIdx(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeTestimonialIdx
                    ? "w-7 sm:w-8 bg-emerald-600"
                    : "w-2 sm:w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. SERVICES SECTION ────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 border-t border-emerald-100">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 block font-mono">
            What We Do
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Shopify Development Services
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            Everything you need to launch, redesign, and grow your online store.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SHOPIFY_SERVICES.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-emerald-100 hover:border-emerald-400 rounded-2xl p-5 sm:p-7 flex flex-col justify-between text-left transition-all duration-300 group shadow-sm hover:shadow-[0_15px_35px_rgba(16,185,129,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 truncate max-w-[150px]">
                      {srv.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                <a
                  href="#lead-form"
                  onClick={() => trackCTAClick({ cta_name: `Service ${srv.title}`, cta_location: "Services Grid" })}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-800 uppercase tracking-wider transition-colors pt-4 border-t border-slate-100 cursor-pointer"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── 7. LEAD CAPTURE FORM SECTION ───────────────────────────────────── */}
      <section
        id="lead-form"
        className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-4xl mx-auto relative z-10 scroll-mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-b from-white via-emerald-50/60 to-slate-50 border border-emerald-200 rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(16,185,129,0.12)] relative overflow-hidden text-left"
        >
          {/* Top Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

          {/* Form Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 block font-mono">
              Get Started Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get Your Custom Shopify Store Proposal
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Fill out your project details below. Our team will review your brand and send you a custom store plan within 2 hours.
            </p>
          </div>

          {/* Lead Capture Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name <span className="text-emerald-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Pankaj Singh"
                    className={`w-full bg-white border ${
                      formErrors.fullName ? "border-red-500" : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    } rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all min-h-[48px] sm:min-h-[52px] text-[16px] sm:text-sm shadow-sm`}
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.fullName}</p>
                )}
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Business / Brand Name <span className="text-emerald-600">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g., Pilgrim Skincare"
                    className={`w-full bg-white border ${
                      formErrors.businessName ? "border-red-500" : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    } rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all min-h-[48px] sm:min-h-[52px] text-[16px] sm:text-sm shadow-sm`}
                  />
                </div>
                {formErrors.businessName && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.businessName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Phone Number (for WhatsApp) <span className="text-emerald-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9917780656"
                    className={`w-full bg-white border ${
                      formErrors.phone ? "border-red-500" : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    } rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all min-h-[48px] sm:min-h-[52px] text-[16px] sm:text-sm shadow-sm`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.phone}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Business Email <span className="text-emerald-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="pankaj@yourbrand.com"
                    className={`w-full bg-white border ${
                      formErrors.email ? "border-red-500" : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    } rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all min-h-[48px] sm:min-h-[52px] text-[16px] sm:text-sm shadow-sm`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.email}</p>
                )}
              </div>

              {/* Website (Optional) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Existing Website (Optional)
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourbrand.com"
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all min-h-[48px] sm:min-h-[52px] text-[16px] sm:text-sm shadow-sm"
                  />
                </div>
              </div>
            </div>


            {/* Project Budget Range */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Project Budget Range
              </label>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {[
                  "Under ₹20,000",
                  "₹20k - ₹30k",
                  "₹30k - ₹50k"
                ].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, projectBudget: b }))}
                    className={`py-3 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 active:scale-95 cursor-pointer ${
                      formData.projectBudget === b
                        ? "bg-emerald-500 text-white border-emerald-500 font-bold shadow-[0_4px_15px_rgba(16,185,129,0.35)]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Tell us about your project */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Tell Us About Your Project <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                <textarea
                  name="projectDetails"
                  rows={3}
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  placeholder="Tell us about your brand products, target audience, and main goals for your Shopify store..."
                  className={`w-full bg-white border ${
                    formErrors.projectDetails ? "border-red-500" : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  } rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-[16px] sm:text-sm shadow-sm`}
                />
              </div>
              {formErrors.projectDetails && (
                <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.projectDetails}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-[0_8px_30px_rgba(16,185,129,0.35)] active:scale-98 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Details...</span>
                </>
              ) : (
                <>
                  <span>Get My Store Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Privacy note */}
            <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>100% Confidential. Your data is never shared.</span>
            </p>
          </form>
        </motion.div>
      </section>

      {/* ─── 8. WHATSAPP CTA SECTION ────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 border border-emerald-400/40 rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-14 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(16,185,129,0.25)] text-white"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-5 text-white shadow-lg backdrop-blur-md">
            <WhatsAppLogo className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Have Questions About Your Shopify Store?
          </h2>

          <p className="text-xs sm:text-base text-emerald-100 max-w-2xl mx-auto mb-7 leading-relaxed font-medium">
            Message us on WhatsApp to discuss your project, get pricing, and ask any questions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I%20need%20help%20choosing%20the%20right%20Shopify%20solution%20for%20my%20brand."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("Large WhatsApp CTA Section")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-950 bg-white hover:bg-emerald-50 shadow-lg active:scale-95 transition-all duration-300"
            >
              <WhatsAppLogo className="w-4 h-4 fill-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="#lead-form"
              onClick={() => trackCTAClick({ cta_name: "Book Consultation WhatsApp Banner", cta_location: "WhatsApp Section" })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold text-white bg-black/20 hover:bg-black/30 border border-white/20 active:scale-95 transition-all duration-300"
            >
              <span>Book Strategy Call</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ─── 9. FAQ SECTION ─────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-4xl mx-auto relative z-10 border-t border-emerald-100">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 block font-mono">
            Got Questions?
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Simple answers to common questions about building your Shopify store.
          </p>
        </motion.div>

        <div className="space-y-3.5 sm:space-y-4 text-left">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={`bg-white border ${
                  isOpen ? "border-emerald-400 shadow-[0_8px_25px_rgba(16,185,129,0.1)]" : "border-slate-200"
                } rounded-2xl overflow-hidden transition-all duration-300 shadow-sm`}
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-lg font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-emerald-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-emerald-100" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="px-4 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── 10. FINAL CTA SECTION ──────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 border-t border-emerald-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 border border-emerald-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-14 lg:p-16 text-center relative overflow-hidden shadow-2xl text-white"
        >
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono block">
              Start Building Your Store Today
            </span>

            <h2 className="text-2.5xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Build Your Shopify Store?
            </h2>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Stop losing customers to slow, low-converting templates. We build fast, high-converting stores that help your brand grow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <a
                href="#lead-form"
                onClick={() => trackCTAClick({ cta_name: "Book Consultation Final CTA", cta_location: "Final Banner" })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Book Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919917780656?text=Hi%20SalePXL%2C%20I'm%20ready%20to%20build%20a%20Shopify%20store%20that%20converts."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("Final CTA Section")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 active:scale-95 transition-all duration-300"
              >
                <WhatsAppLogo className="w-4 h-4 fill-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

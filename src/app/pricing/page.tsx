"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MID = "M22TBYDYBWYC8";
const UPI_ID = `${MID}@ybl`;

function phonepeLink(amount: number, planName: string) {
  const note = encodeURIComponent(`SalePxl ${planName} Plan`);
  const pa = encodeURIComponent(UPI_ID);
  const pn = encodeURIComponent("SalePxl");
  return `upi://pay?pa=${pa}&pn=${pn}&am=${amount}&cu=INR&tn=${note}`;
}

const PLANS = [
  {
    id: "standard",
    name: "Standard",
    price: 20000,
    badge: null as null | string,
    tagline: "Perfect for launching your first store",
    color: "#60a5fa",
    colorMuted: "rgba(96,165,250,0.07)",
    colorBorder: "rgba(96,165,250,0.14)",
    features: [
      { text: "Premium store design", included: true },
      { text: "Fully custom sections", included: true },
      { text: "Products upload up to 20", included: true },
      { text: "Payment gateway integration", included: true },
      { text: "Shipping integration", included: true },
      { text: "Mobile-first responsive", included: true },
      { text: "AI product photography", included: false },
      { text: "Promo videos", included: false },
      { text: "WhatsApp automation", included: false },
      { text: "AOV booster apps", included: false },
      { text: "Email setup", included: false },
      { text: "Ad account & pixel setup", included: false },
      { text: "Branding kit", included: false },
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 30000,
    badge: "Most Popular" as null | string,
    tagline: "For brands serious about growth",
    color: "#22e39a",
    colorMuted: "rgba(34,227,154,0.07)",
    colorBorder: "rgba(34,227,154,0.18)",
    features: [
      { text: "Premium store design", included: true },
      { text: "Fully custom website", included: true },
      { text: "Products upload up to 30", included: true },
      { text: "Payment gateway integration", included: true },
      { text: "Shipping integration", included: true },
      { text: "Mobile-first responsive", included: true },
      { text: "AI product photography", included: true },
      { text: "3 promo videos for website", included: true },
      { text: "WhatsApp automation", included: false },
      { text: "AOV booster apps", included: false },
      { text: "Email setup", included: false },
      { text: "Ad account & pixel setup", included: false },
      { text: "Branding kit", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 50000,
    badge: "Complete Package" as null | string,
    tagline: "Full-stack store built to dominate",
    color: "#a78bfa",
    colorMuted: "rgba(167,139,250,0.07)",
    colorBorder: "rgba(167,139,250,0.16)",
    features: [
      { text: "Premium store design", included: true },
      { text: "Fully custom website", included: true },
      { text: "Products upload up to 50", included: true },
      { text: "Payment gateway integration", included: true },
      { text: "Shipping integration", included: true },
      { text: "Mobile-first responsive", included: true },
      { text: "AI product photography", included: true },
      { text: "5 promo videos for website", included: true },
      { text: "WhatsApp automation", included: true },
      { text: "AOV booster apps", included: true },
      { text: "Email setup", included: true },
      { text: "Ad account & pixel setup", included: true },
      { text: "Branding kit", included: true },
    ],
  },
];

const INCLUDES = [
  { icon: "⚡", title: "Lightning Fast", desc: "Sub-1.5s mobile load. 99/100 PageSpeed on every store." },
  { icon: "📱", title: "Mobile-First Design", desc: "Over 80% of D2C traffic is mobile. Every pixel optimised for touch." },
  { icon: "🔒", title: "Secure Checkout", desc: "SSL, trust badges, PhonePe / UPI / Razorpay built in." },
  { icon: "🚢", title: "Shipping Ready", desc: "Shiprocket, Delhivery or custom shipping configured from day 1." },
  { icon: "🎨", title: "Brand Design", desc: "Typography, palette, and visual language aligned to your brand." },
  { icon: "🤖", title: "AI Product Shoots", desc: "Advanced & Elite plans include AI product photography." },
  { icon: "📹", title: "Promo Videos", desc: "Brand videos for your website and social channels." },
  { icon: "📞", title: "15-Day Support", desc: "Post-launch bug fixes and tweaks at no extra charge." },
];

const FAQS = [
  { q: "How long does a store take to build?", a: "Standard stores are delivered in 7–10 working days. Advanced in 12–15 days. Elite in 18–22 days, depending on content readiness." },
  { q: "Is payment required upfront?", a: "We take 50% advance to begin work and the remaining 50% before final handover." },
  { q: "Do you provide post-launch support?", a: "Yes — all plans include 15 days of free support after launch to fix any issues." },
  { q: "Can I upgrade my plan later?", a: "Absolutely. You can upgrade from Standard → Advanced or Elite by paying the difference at any time." },
  { q: "What payment methods do you accept?", a: "UPI (PhonePe, GPay, Paytm), bank transfer, and all major credit/debit cards via PhonePe gateway." },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [payingPlan, setPayingPlan] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleBuyNow = (plan: typeof PLANS[number]) => {
    setPayingPlan(plan.id);
    const link = phonepeLink(plan.price, plan.name);
    if (/android|iphone|ipad|ipod/i.test(navigator.userAgent)) {
      window.location.href = link;
    } else {
      const encoded = encodeURIComponent(link);
      window.open(
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`,
        "_blank",
        "width=380,height=440,top=100,left=100"
      );
    }
    setTimeout(() => setPayingPlan(null), 3000);
  };

  const copyUPI = () => {
    navigator.clipboard?.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#070707] text-white overflow-x-hidden -mt-24 font-grotesk">

      {/* HERO */}
      <section className="relative pt-44 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full bg-emerald-500/[0.04] blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
          
          {/* Page Header */}
          <div className="text-center max-w-4xl mx-auto flex flex-col gap-5">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-5">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#22e39a] mb-2">Transparent Pricing</p>
              <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight font-grotesk">
                One Price.<br />
                Everything <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-normal font-sans">Included.</span>
              </h1>
              <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto font-sans">
                No hidden fees. No monthly retainers. Pick your plan, pay via PhonePe or UPI, and we start building your store the next day.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2.5 mt-7"
          >
            {["No Hidden Fees", "15-Day Support", "50% Advance Only", "UPI / PhonePe Accepted"].map((b, i) => (
              <span key={i} className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-white/35">{b}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="px-6 pb-24">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {PLANS.map((plan, i) => {
              const isPopular = plan.badge === "Most Popular";
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col rounded-3xl overflow-hidden"
                  style={{
                    border: `1px solid ${plan.colorBorder}`,
                    background: isPopular
                      ? `linear-gradient(145deg, ${plan.colorMuted}, rgba(9,9,9,0.99))`
                      : "rgba(9,9,9,0.97)",
                    boxShadow: isPopular ? `0 0 80px rgba(34,227,154,0.06)` : "none",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)` }} />
                  {plan.badge && (
                    <div className="absolute top-5 right-5">
                      <span className="text-[8px] font-mono font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border" style={{ background: `${plan.color}12`, borderColor: `${plan.color}30`, color: plan.color }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-8 sm:p-9">
                    <div className="mb-7">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-2" style={{ color: plan.color }}>{plan.name}</p>
                      <div className="flex items-end gap-1.5 mb-2">
                        <span className="text-4xl sm:text-5xl font-bold text-white font-grotesk tracking-tight">₹{(plan.price / 1000).toFixed(0)}k</span>
                        <span className="text-white/25 text-sm font-light mb-1.5">one-time</span>
                      </div>
                      <p className="text-xs text-white/40 font-light">{plan.tagline}</p>
                    </div>

                    <ul className="flex flex-col gap-2.5 flex-1 mb-8">
                      {plan.features.map((feat, fi) => (
                        <li key={fi} className="flex items-center gap-3">
                          {feat.included ? (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${plan.color}14`, border: `1px solid ${plan.color}28` }}>
                              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={plan.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-white/[0.02] border border-white/[0.05]">
                              <svg width="7" height="7" viewBox="0 0 8 8" fill="none"><path d="M2 2l4 4M6 2L2 6" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            </div>
                          )}
                          <span className={`text-[13px] font-sans leading-snug ${feat.included ? "text-white/72" : "text-white/18 line-through"}`}>{feat.text}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-2.5">
                      <button
                        onClick={() => handleBuyNow(plan)}
                        disabled={payingPlan === plan.id}
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer disabled:opacity-60 active:scale-[0.98]"
                        style={
                          isPopular
                            ? { background: plan.color, color: "#000", boxShadow: `0 0 28px ${plan.color}30` }
                            : { background: `${plan.color}10`, color: plan.color, border: `1px solid ${plan.color}28` }
                        }
                      >
                        {payingPlan === plan.id ? (
                          <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round"/></svg>Opening PhonePe...</>
                        ) : (
                          <>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z"/></svg>
                            Buy Now — ₹{plan.price.toLocaleString("en-IN")}
                          </>
                        )}
                      </button>
                      <p className="text-center text-[9px] text-white/20 font-mono">Pay via PhonePe · GPay · Paytm · Any UPI</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* UPI ID strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 px-6 py-4 rounded-2xl border border-white/[0.05] bg-white/[0.015] max-w-md mx-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.75"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.75"/></svg>
              </div>
              <div>
                <p className="text-[8px] font-mono font-bold uppercase tracking-widest text-white/20 mb-0.5">UPI / PhonePe ID</p>
                <p className="text-sm font-mono font-bold text-white">{UPI_ID}</p>
              </div>
            </div>
            <button onClick={copyUPI} className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-primary/15 hover:border-primary/30 text-primary/70 hover:text-primary transition-all cursor-pointer">
              {copied ? "✓ Copied!" : <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/></svg>
                Copy UPI
              </>}
            </button>
          </motion.div>
        </div>
      </section>


      {/* FAQ */}
      <section className="px-6 py-20 border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-primary mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-grotesk">Common <span className="light-gradient-text font-normal">questions</span></h2>
          </motion.div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.32, delay: i * 0.07 }}
                className="rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden"
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group">
                  <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors pr-4">{faq.q}</span>
                  <div className="w-7 h-7 rounded-full border border-white/[0.07] flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2 5h6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-white/42 font-light leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 border-t border-white/[0.04]">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="w-2 h-2 rounded-full bg-primary mx-auto mb-6 animate-pulse shadow-[0_0_12px_rgba(34,227,154,0.8)]" />
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-grotesk mb-4">
              Still deciding?<br /><span className="light-gradient-text font-normal">Talk</span> to us first.
            </h2>
            <p className="text-white/40 text-base font-light mb-8">
              WhatsApp us your brand details and we&apos;ll recommend the right plan — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919917780656?text=Hi%20SalePxl%2C%20I%20want%20to%20know%20more%20about%20your%20pricing%20plans"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-primary text-black text-sm font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-[0_0_30px_rgba(34,227,154,0.2)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.558 4.14 1.535 5.878L.057 23.569a.75.75 0 00.918.918l5.69-1.479A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.99 0-3.851-.548-5.444-1.5l-.39-.232-4.04 1.05 1.07-3.913-.253-.402A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                WhatsApp Us
              </a>
              <a
                href="mailto:helpsalepxl@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border border-white/10 bg-white/[0.03] text-white/65 text-sm font-semibold hover:bg-white/[0.06] hover:text-white transition-all cursor-pointer"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}

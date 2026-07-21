"use client";

import { useEffect } from "react";

// Types for tracking data
export interface LeadEventParams {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  monthlyRevenue?: string;
  budgetRange?: string;
  service?: string;
  source?: string;
}

export interface CTAEventParams {
  cta_name: string;
  cta_location: string;
  destination_url?: string;
}

// 1️⃣ Safe accessor for window tracking objects
function getFBQ() {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    return (window as any).fbq;
  }
  return null;
}

function getGtag() {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    return (window as any).gtag;
  }
  return null;
}

function pushDataLayer(eventObj: Record<string, any>) {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(eventObj);
  }
}

// 2️⃣ Lead Event Tracking (Meta Pixel, GA4, GTM, CAPI)
export function trackLeadEvent(params: LeadEventParams) {
  // Meta Pixel
  const fbq = getFBQ();
  if (fbq) {
    fbq("track", "Lead", {
      content_name: params.service || "Shopify Store Consultation",
      content_category: "Landing Page Lead",
      value: params.budgetRange || "Standard",
      currency: "INR",
    });
    fbq("track", "Contact", {
      content_name: params.businessName || params.name || "Meta Ads Visitor",
    });
  }

  // GA4
  const gtag = getGtag();
  if (gtag) {
    gtag("event", "generate_lead", {
      value: params.budgetRange,
      currency: "INR",
      lead_source: params.source || "meta_ads_landing",
      service: params.service || "Shopify Development",
    });
  }

  // GTM DataLayer
  pushDataLayer({
    event: "lead_form_submitted",
    lead_source: params.source || "shopify_landing_meta",
    user_business: params.businessName,
    monthly_revenue: params.monthlyRevenue,
    budget_range: params.budgetRange,
    timestamp: new Date().toISOString(),
  });

  // Conversion API (CAPI Payload Dispatcher)
  try {
    if (typeof window !== "undefined" && window.navigator && window.navigator.sendBeacon) {
      const capiData = JSON.stringify({
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_data: {
          em: params.email ? [params.email.trim().toLowerCase()] : undefined,
          ph: params.phone ? [params.phone.replace(/\D/g, "")] : undefined,
          fn: params.name ? [params.name.split(" ")[0]] : undefined,
        },
        custom_data: {
          content_name: params.service || "Shopify Consultation",
          currency: "INR",
          value: params.budgetRange,
        },
      });
      const blob = new Blob([capiData], { type: "application/json" });
      window.navigator.sendBeacon("/api/meta-capi", blob);
    }
  } catch (err) {
    // Fail silently so user experience is uninterrupted
  }
}

// 3️⃣ WhatsApp Click Tracking
export function trackWhatsAppClick(location: string = "Hero CTA") {
  const fbq = getFBQ();
  if (fbq) {
    fbq("trackCustom", "WhatsAppClick", { click_location: location });
    fbq("track", "Contact", { method: "WhatsApp", location });
  }

  const gtag = getGtag();
  if (gtag) {
    gtag("event", "whatsapp_click", {
      event_category: "Engagement",
      event_label: location,
    });
  }

  pushDataLayer({
    event: "whatsapp_clicked",
    click_location: location,
    timestamp: new Date().toISOString(),
  });
}

// 4️⃣ CTA Button Click Tracking
export function trackCTAClick(params: CTAEventParams) {
  const fbq = getFBQ();
  if (fbq) {
    fbq("trackCustom", "CTAClick", {
      cta_name: params.cta_name,
      cta_location: params.cta_location,
    });
  }

  const gtag = getGtag();
  if (gtag) {
    gtag("event", "cta_click", {
      cta_name: params.cta_name,
      cta_location: params.cta_location,
    });
  }

  pushDataLayer({
    event: "cta_clicked",
    cta_name: params.cta_name,
    cta_location: params.cta_location,
    timestamp: new Date().toISOString(),
  });
}

// 5️⃣ Scroll Depth Tracking Hook / Listener
export function useScrollTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const trackedDepths = new Set<number>();
    const checkpoints = [25, 50, 75, 90];

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScroll = window.scrollY;
      const scrollPercent = Math.round((currentScroll / scrollHeight) * 100);

      checkpoints.forEach((checkpoint) => {
        if (scrollPercent >= checkpoint && !trackedDepths.has(checkpoint)) {
          trackedDepths.add(checkpoint);

          // Meta Pixel
          const fbq = getFBQ();
          if (fbq) {
            fbq("trackCustom", "ScrollDepth", { depth: checkpoint });
          }

          // GA4
          const gtag = getGtag();
          if (gtag) {
            gtag("event", "scroll_depth", {
              depth_percentage: checkpoint,
            });
          }

          // GTM DataLayer
          pushDataLayer({
            event: "scroll_depth",
            depth_percentage: checkpoint,
            page_path: window.location.pathname,
          });
        }
      });
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
}

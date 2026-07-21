import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SalePXL",
  description: "Privacy Policy for SalePXL Shopify Design & Development Agency.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-white font-sans">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
      <p className="text-sm text-neutral-400 mb-8">Last updated: July 2026</p>

      <div className="space-y-6 text-neutral-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
          <p>
            When you request a consultation or communicate with SalePXL, we collect personal details such as your name, business name, email address, phone number, website URL, and project requirements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
          <p>
            We use your information exclusively to prepare project estimates, schedule strategy consultations, provide Shopify development services, and send project updates via email or WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Tracking & Analytics</h2>
          <p>
            Our landing pages use standard analytics tools including Meta Pixel and Google Analytics to measure ad campaign efficiency, conversion rates, and site usage patterns. No sensitive personal payment data is stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, contact us at{" "}
            <a href="mailto:helpsalepxl@gmail.com" className="text-primary underline">
              helpsalepxl@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

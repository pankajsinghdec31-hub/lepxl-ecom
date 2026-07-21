import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | SalePXL",
  description: "Terms & Conditions for SalePXL Shopify Design & Development Agency.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-white font-sans">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">Terms & Conditions</h1>
      <p className="text-sm text-neutral-400 mb-8">Last updated: July 2026</p>

      <div className="space-y-6 text-neutral-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Scope of Services</h2>
          <p>
            SalePXL provides custom Shopify store design, development, store redesigns, CRO optimizations, and migration services for e-commerce brands under agreed project scope documents.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Payment Terms</h2>
          <p>
            Standard payment structure requires a 50% advance deposit prior to project commencement, with the remaining 50% due upon project completion and final client review before store transfer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Post-Launch Support</h2>
          <p>
            All custom store builds include up to 30 days of post-launch technical support for minor layout adjustments, bug fixes, and operational guidance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Intellectual Property</h2>
          <p>
            Upon receipt of full payment, all custom store theme assets, custom code, and graphic deliverables belong entirely to the client.
          </p>
        </section>
      </div>
    </div>
  );
}

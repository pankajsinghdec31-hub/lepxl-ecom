"use client";

import React from "react";
import StartProjectForm from "@/components/StartProjectForm";

export default function ContactPage() {
  return (
    <div className="relative pt-32 sm:pt-40 pb-16 sm:pb-28 px-4 sm:px-6 text-left min-h-screen bg-[#050505] overflow-hidden -mt-24 font-grotesk text-white">
      {/* Background decoration glow */}
      <div className="absolute top-[15%] right-[-10%] w-[600px] h-[600px] bg-[#22E39A]/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-10%] w-[600px] h-[600px] bg-[#1fce8b]/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Booking Form Card (Renders the unified StartProjectForm with deliverable.agency layout) */}
        <div className="w-full">
          <StartProjectForm />
        </div>

      </div>
    </div>
  );
}


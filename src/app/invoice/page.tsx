"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface InvoiceItem {
  description: string;
  qty: number;
  rate: number;
}

export default function InvoiceGenerator() {
  // Generate a random invoice number on load
  const [invoiceNo, setInvoiceNo] = useState("");
  useEffect(() => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    setInvoiceNo(`SP-${dateStr}-${rand}`);
  }, []);

  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "Shopify Store Design & Development (Standard Plan)", qty: 1, rate: 20000 }
  ]);

  const [paymentStatus, setPaymentStatus] = useState<"Paid" | "Pending">("Paid");
  const [paymentMethod, setPaymentMethod] = useState("PhonePe / UPI");
  const [notes, setNotes] = useState("Thank you for choosing SalePixel. We look forward to building your successful Shopify store!");

  const handleSelectPlan = (planName: string, price: number) => {
    setItems([
      {
        description: `Shopify Store Design & Development (${planName} Plan)`,
        qty: 1,
        rate: price
      }
    ]);
  };

  const handleAddItem = () => {
    setItems([...items, { description: "", qty: 1, rate: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === "description" ? value : Number(value)
    };
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const total = subtotal; // No GST

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white pt-28 pb-16 px-4 sm:px-6 relative overflow-hidden print:bg-white print:text-black print:p-0 print:pt-0">
      
      {/* Background glow - hidden during print */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/[0.02] blur-[120px] pointer-events-none print:hidden" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/[0.01] blur-[120px] pointer-events-none print:hidden" />

      <div className="max-w-[1360px] mx-auto print:max-w-full">
        
        {/* Title / Description */}
        <div className="mb-8 print:hidden">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary mb-2">
            Internal Operations Tool
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-grotesk tracking-tight">
            Invoice Generator
          </h1>
          <p className="text-white/45 text-sm font-light mt-1.5">
            Fill in the client details on the left, check the live preview on the right, and click "Print / Save PDF" to generate the final invoice without GST.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:block">
          
          {/* ── FORM CONTROL PANEL (Left) ── */}
          <div className="lg:col-span-5 bg-[#121214] border border-white/[0.06] rounded-2xl p-6 sm:p-7 space-y-6 print:hidden">
            
            {/* Quick Templates */}
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-2.5">
                Quick Select Plan Template
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Standard", price: 20000 },
                  { name: "Advanced", price: 30000 },
                  { name: "Elite", price: 50000 },
                ].map((plan) => (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => handleSelectPlan(plan.name, plan.price)}
                    className="py-2.5 px-3 bg-white/[0.03] hover:bg-primary/10 border border-white/10 hover:border-primary/30 text-xs font-semibold rounded-xl text-center transition-all cursor-pointer"
                  >
                    {plan.name} (₹{plan.price / 1000}k)
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-white/[0.06]" />

            {/* Client Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-grotesk tracking-wide text-white/90">Client Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">Client Name *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">Company Name (Optional)</label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="Acme D2C Brands"
                    className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 99999 99999"
                    className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>
              </div>
            </div>

            <hr className="border-white/[0.06]" />

            {/* Invoice Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-grotesk tracking-wide text-white/90">Invoice Details</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">Invoice #</label>
                  <input
                    type="text"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                    className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">Status</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-2 py-2.5 focus:outline-none focus:border-primary transition-colors text-white"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">Invoice Date</label>
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>
              </div>
            </div>

            <hr className="border-white/[0.06]" />

            {/* Line Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-grotesk tracking-wide text-white/90">Line Items</h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-[10px] font-mono font-bold text-primary hover:underline cursor-pointer"
                >
                  + Add Custom Item
                </button>
              </div>
              
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-[#18181b] p-3.5 rounded-xl border border-white/[0.04]">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                        placeholder="Item / Service Description"
                        className="w-full bg-black/40 border border-white/[0.08] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-white"
                      />
                      <div className="flex gap-2">
                        <div className="w-20">
                          <label className="text-[7px] font-mono uppercase text-white/30 block mb-0.5">Qty</label>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                            className="w-full bg-black/40 border border-white/[0.08] text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-primary text-white"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-[7px] font-mono uppercase text-white/30 block mb-0.5">Rate (₹)</label>
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                            className="w-full bg-black/40 border border-white/[0.08] text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-primary text-white"
                          />
                        </div>
                      </div>
                    </div>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-red-400 hover:text-red-300 p-1.5 transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-white/[0.06]" />

            {/* Terms & Payment Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">Payment Method</label>
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  placeholder="PhonePe / UPI"
                  className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-white"
                />
              </div>
              <div>
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 block mb-1.5">Notes & Terms</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-[#18181b] border border-white/[0.08] text-xs rounded-xl px-4 py-2 focus:outline-none focus:border-primary transition-colors text-white resize-none"
                />
              </div>
            </div>

            {/* Print Action Trigger */}
            <button
              type="button"
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-black font-bold text-sm hover:bg-primary-hover shadow-[0_0_30px_rgba(34,227,154,0.15)] transition-all cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
              Print / Save as PDF
            </button>

          </div>


          {/* ── LIVE PREVIEW SHEET (Right) ── */}
          <div className="lg:col-span-7 bg-white text-black p-8 sm:p-12 rounded-2xl shadow-2xl min-h-[820px] flex flex-col justify-between border border-neutral-200 font-sans print:border-none print:shadow-none print:p-0 print:m-0 print:min-h-0 print:rounded-none">
            
            <div>
              {/* Header: Company & Invoice info */}
              <div className="flex justify-between items-start gap-4 mb-10 pb-8 border-b border-neutral-100">
                <div>
                  <h2 className="text-2xl font-bold font-grotesk tracking-tight text-neutral-900">SalePixel</h2>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed max-w-xs font-light">
                    Dehradun, Uttarakhand, India<br />
                    helpsalepxl@gmail.com · +91 9917780656
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-light uppercase tracking-widest text-neutral-400 font-grotesk block mb-1">INVOICE</span>
                  <span className="text-xs font-mono font-bold text-neutral-700 block">{invoiceNo || "SP-XXXXX"}</span>
                  {paymentStatus === "Paid" && (
                    <span className="inline-block mt-3 px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 font-bold font-mono text-[9px] uppercase tracking-wider border border-emerald-100/50">
                      Paid / Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Addresses Grid */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-2">Billed To</span>
                  <p className="text-xs font-bold text-neutral-800">{clientName || "— Client Name —"}</p>
                  {clientCompany && <p className="text-[11px] text-neutral-600 font-medium mt-0.5">{clientCompany}</p>}
                  {(clientEmail || clientPhone) && (
                    <p className="text-[10px] text-neutral-400 mt-1.5 leading-relaxed">
                      {clientEmail && <span>{clientEmail}<br /></span>}
                      {clientPhone && <span>{clientPhone}</span>}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-2">Invoice Dates</span>
                  <div className="text-xs text-neutral-700 space-y-1.5">
                    <div>
                      <span className="text-[10px] font-medium text-neutral-400 mr-2">Issued:</span>
                      <span className="font-medium text-neutral-800">
                        {invoiceDate ? new Date(invoiceDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-neutral-400 mr-2">Due Date:</span>
                      <span className="font-medium text-neutral-800">
                        {dueDate ? new Date(dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-3 text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400">Description</th>
                      <th className="py-3 text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400 text-center w-12">Qty</th>
                      <th className="py-3 text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400 text-right w-24">Rate</th>
                      <th className="py-3 text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400 text-right w-28">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-b border-neutral-100">
                        <td className="py-4 text-xs font-semibold text-neutral-800 max-w-sm leading-relaxed">
                          {item.description || "— Custom Service / Shopify Store Plan —"}
                        </td>
                        <td className="py-4 text-xs text-neutral-600 text-center font-mono">{item.qty}</td>
                        <td className="py-4 text-xs text-neutral-600 text-right font-mono">₹{item.rate.toLocaleString("en-IN")}</td>
                        <td className="py-4 text-xs font-bold text-neutral-800 text-right font-mono">
                          ₹{(item.qty * item.rate).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="flex justify-end mb-10">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-500 py-1">
                    <span>Subtotal:</span>
                    <span className="font-mono font-semibold text-neutral-800">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 py-1 text-[11px] italic">
                    <span>Tax (GST 0% - Exempt):</span>
                    <span className="font-mono">₹0</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-3 text-sm font-bold text-neutral-900">
                    <span>Total Amount:</span>
                    <span className="font-mono text-base text-neutral-950">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Footer terms */}
            <div className="border-t border-neutral-100 pt-6 mt-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                <div>
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Payment Details</span>
                  <div className="text-[10px] text-neutral-500 space-y-0.5 leading-relaxed font-light">
                    <p><span className="font-medium text-neutral-600">Method:</span> {paymentMethod}</p>
                    <p><span className="font-medium text-neutral-600">Company UPI ID:</span> M22TBYDYBWYC8@ybl</p>
                    <p><span className="font-medium text-neutral-600">Merchant Name:</span> SalePxl / SalePixel</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[9px] leading-relaxed text-neutral-400 italic font-light">
                    {notes}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Styled css for print layout overrides */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }
          header, footer, nav, .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}

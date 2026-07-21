import { NextRequest, NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LeadPayload {
  source: "start-project" | "enquiry-box" | "shopify-audit" | "shopify-landing" | string;
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  website?: string;
  monthlyRevenue?: string;
  projectBudget?: string;
  service?: string;
  budgetRange?: string;
  timeline?: string;
  productsCount?: string;
  photoshootAvailable?: string;
  projectDetails?: string;
  referenceLink?: string;
  brandName?: string;
  projectCategory?: string;
  platform?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  storeUrl?: string;
  revenueLeakage?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function row(label: string, value?: string | number) {
  if (!value && value !== 0) return "";
  return `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#6b7280;background:#f9fafb;width:160px;border-bottom:1px solid #f0f0f0;">${label}</td>
      <td style="padding:8px 12px;color:#111827;background:#ffffff;border-bottom:1px solid #f0f0f0;">${value}</td>
    </tr>`;
}

function buildEmailHtml(data: LeadPayload): string {
  const sourceLabel =
    data.source === "shopify-landing"
      ? "🎯 Meta Ads Shopify Landing Lead"
      : data.source === "start-project"
      ? "🚀 Start Project Form"
      : data.source === "enquiry-box"
      ? "📬 Enquiry Box"
      : "🔍 Shopify Growth Audit";

  const name = data.name || data.contactName || "Unknown";
  const email = data.email || data.contactEmail || "—";
  const phone = data.phone || data.contactPhone || "—";
  const whatsappPhone = phone.replace(/\D/g, "");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f3f4f6;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#059669,#0d9488);padding:32px 28px;">
      <p style="margin:0 0 6px;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:2px;text-transform:uppercase;">New Lead &middot; SalePXL</p>
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">${sourceLabel}</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
    </div>
    <div style="background:#ecfdf5;padding:20px 28px;border-bottom:1px solid #d1fae5;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="font-size:13px;color:#065f46;"><strong>Name: ${name}</strong></td>
          <td style="font-size:13px;color:#065f46;text-align:right;"><a href="mailto:${email}" style="color:#059669;">${email}</a></td>
        </tr>
        <tr>
          <td colspan="2" style="font-size:13px;color:#065f46;padding-top:4px;">Phone: <a href="tel:${phone}" style="color:#059669;">${phone}</a></td>
        </tr>
      </table>
    </div>
    <div style="padding:24px 28px 0;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">Lead Details</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #f0f0f0;">
        ${row("Source", sourceLabel)}
        ${row("Business / Brand", data.businessName || data.brandName)}
        ${row("Website", data.website || data.storeUrl)}
        ${row("Monthly Revenue", data.monthlyRevenue)}
        ${row("Project Budget", data.projectBudget || data.budgetRange)}
        ${row("Service", data.service || data.projectCategory)}
        ${row("Timeline", data.timeline)}
        ${row("Products Count", data.productsCount)}
        ${row("Photoshoot Available", data.photoshootAvailable)}
        ${row("Platform", data.platform)}
        ${row("Revenue Leakage", data.revenueLeakage !== undefined ? "Rs " + Number(data.revenueLeakage).toLocaleString("en-IN") : undefined)}
        ${row("Reference Links", data.referenceLink)}
        ${row("Project Details", data.projectDetails)}
      </table>
    </div>
    <div style="padding:24px 28px;">
      <a href="https://wa.me/${whatsappPhone}" style="display:inline-block;padding:12px 24px;background:#059669;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;margin-right:12px;">WhatsApp ${name.split(" ")[0]}</a>
      <a href="mailto:${email}?subject=SalePXL%20Your%20Project%20Enquiry" style="display:inline-block;padding:12px 24px;background:#111827;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Reply via Email</a>
    </div>
    <div style="padding:16px 28px;background:#f9fafb;border-top:1px solid #f0f0f0;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">SalePXL lead capture system &mdash; salepxl.com</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── API Route ────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const data: LeadPayload = await req.json();

    const name = data.name || data.contactName || "Anonymous";
    const email = data.email || data.contactEmail || "";
    const phone = data.phone || data.contactPhone || "";

    // 1️⃣ Send email via Gmail SMTP (only if credentials are configured)
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;

    if (gmailUser && gmailPass && notifyEmail) {
      try {
        // Dynamic import to avoid build errors when package is absent
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.default.createTransport({
          service: "gmail",
          auth: { user: gmailUser, pass: gmailPass },
        });

        await transporter.sendMail({
          from: `"SalePXL Leads" <${gmailUser}>`,
          to: notifyEmail,
          subject: `New Lead: ${name} — ${data.service || data.projectCategory || data.source}`,
          html: buildEmailHtml(data),
        });
      } catch (emailErr) {
        console.error("[submit-lead] Email error:", emailErr);
        // Continue — don't fail the whole request if email fails
      }
    }

    // 2️⃣ Send to Google Sheets webhook (if configured)
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith("https://script.google.com")) {
      try {
        const sheetPayload = {
          timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          source: data.source,
          name,
          email,
          phone,
          service: data.service || data.projectCategory || "",
          budgetRange: data.budgetRange || "",
          timeline: data.timeline || "",
          productsCount: data.productsCount || "",
          photoshootAvailable: data.photoshootAvailable || "",
          brandName: data.brandName || "",
          platform: data.platform || "",
          storeUrl: data.storeUrl || "",
          revenueLeakage: data.revenueLeakage || "",
          referenceLink: data.referenceLink || "",
          projectDetails: data.projectDetails || "",
        };

        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetPayload),
        });
      } catch (sheetErr) {
        console.error("[submit-lead] Sheets error:", sheetErr);
        // Continue — don't fail the whole request if sheets fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[submit-lead] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process lead" },
      { status: 500 }
    );
  }
}

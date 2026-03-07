import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createTransport } from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

function emailHtml(firstName: string, lastName: string, email: string, amount: string, anonymous: string) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "N/A";
  const rows = `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#6b7280;font-weight:600;width:40%;border-bottom:1px solid #f3f4f6;">Full Name</td>
      <td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${fullName}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#6b7280;font-weight:600;width:40%;border-bottom:1px solid #f3f4f6;">Email</td>
      <td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${email}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#6b7280;font-weight:600;width:40%;border-bottom:1px solid #f3f4f6;">Donation Amount</td>
      <td style="padding:10px 16px;font-size:14px;color:#111827;font-weight:700;border-bottom:1px solid #f3f4f6;">$${amount} CAD</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#6b7280;font-weight:600;width:40%;border-bottom:1px solid #f3f4f6;">Payment Status</td>
      <td style="padding:10px 16px;border-bottom:1px solid #f3f4f6;"><span style="background:#dcfce7;color:#16a34a;font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px;">PAID ✓</span></td>
    </tr>
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#6b7280;font-weight:600;width:40%;">Anonymous</td>
      <td style="padding:10px 16px;font-size:14px;color:#111827;">${anonymous === "true" ? "Yes" : "No"}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <tr>
          <td style="background:#2cdd9b;padding:28px 32px;">
            <p style="margin:0;font-size:15px;color:#ffffff;font-weight:700;">Oromo Cultural Resettlement Services Society</p>
            <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;">New Donation Received</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px 0;">
            <span style="display:inline-block;background:#2cdd9b18;color:#2cdd9b;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">Stripe Payment — Confirmed</span>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 16px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #f3f4f6;">
              ${rows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;text-align:center;border-top:1px solid #f3f4f6;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">Payment processed securely via Stripe.</p>
            <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} Oromo Cultural Resettlement Services Society</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

const sentSessions = new Set<string>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const { firstName, lastName, email, amount, anonymous } = session.metadata || {};

    if (!sentSessions.has(sessionId)) {
      sentSessions.add(sessionId);
      try {
        const transporter = createTransport({
          host: process.env.SMTP_HOST || "smtpout.secureserver.net",
          port: Number(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail(({
          from: process.env.SMTP_FROM || `"Oromo Cultural" <${process.env.SMTP_USER}>`,
          to: process.env.DONATION_TO_EMAIL || process.env.SMTP_USER,
          subject: "💚 New Donation Received (Payment Confirmed)",
          html: emailHtml(firstName || "", lastName || "", email || session.customer_email || "", amount || "", anonymous || "false"),
        } as any));
      } catch (emailErr) {
        console.error("Failed to send donation notification email", emailErr);
      }
    }

    return NextResponse.json({
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || session.customer_email || "",
      amount: amount || "",
      anonymous: anonymous === "true",
    });
  } catch (error: any) {
    console.error("Stripe session error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

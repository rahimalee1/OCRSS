import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

function field(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#6b7280;font-weight:600;width:40%;border-bottom:1px solid #f3f4f6;">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${value}</td>
    </tr>`;
}

function emailHtml(title: string, badge: string, color: string, rows: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <!-- Header -->
        <tr>
          <td style="background:${color};padding:28px 32px;">
            <p style="margin:0;font-size:15px;color:#ffffff;font-weight:700;letter-spacing:0.5px;">Oromo Cultural Resettlement Services Society</p>
            <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;">${title}</h1>
          </td>
        </tr>
        <!-- Badge -->
        <tr>
          <td style="padding:16px 32px 0;">
            <span style="display:inline-block;background:${color}18;color:${color};font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;letter-spacing:0.5px;">${badge}</span>
          </td>
        </tr>
        <!-- Fields -->
        <tr>
          <td style="padding:16px 16px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #f3f4f6;">
              ${rows}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;text-align:center;border-top:1px solid #f3f4f6;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">This is an automated message from your website contact form.</p>
            <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} Oromo Cultural Resettlement Services Society</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      amount,
      anonymous,
    }: {
      firstName: string;
      lastName?: string;
      email: string;
      amount: string;
      anonymous?: boolean;
    } = body;

    if (!firstName || !email || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Missing SMTP_USER or SMTP_PASS environment variables");
      return NextResponse.json(
        { error: "Email is not configured on the server." },
        { status: 500 },
      );
    }

    const transporter = createTransport({
      host: process.env.SMTP_HOST || "smtpout.secureserver.net",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const rows =
      field("Full Name", fullName || "N/A") +
      field("Email", email) +
      field("Donation Amount", `$${amount}`) +
      field("Anonymous", anonymous ? "Yes" : "No");

    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        `"Oromo Cultural" <${process.env.SMTP_USER || "no-reply@example.com"}>`,
      to: process.env.DONATION_TO_EMAIL || process.env.SMTP_USER,
      subject: "💚 New Donation Submission",
      html: emailHtml("New Donation Submission", "Donation Form", "#2cdd9b", rows),
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Donation email error", error);
    return NextResponse.json(
      {
        error: "Failed to send donation email",
        detail: error?.message ?? "Unknown error",
      },
      { status: 500 },
    );
  }
}

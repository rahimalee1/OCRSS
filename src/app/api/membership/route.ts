import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

function field(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#6b7280;font-weight:600;width:40%;border-bottom:1px solid #f3f4f6;">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${value}</td>
    </tr>`;
}

function section(title: string, rows: string) {
  return `
    <tr>
      <td colspan="2" style="padding:16px 16px 4px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#9ca3af;">${title}</td>
    </tr>
    ${rows}`;
}

function emailHtml(title: string, badge: string, color: string, rows: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <tr>
          <td style="background:${color};padding:28px 32px;">
            <p style="margin:0;font-size:15px;color:#ffffff;font-weight:700;letter-spacing:0.5px;">Oromo Cultural Resettlement Services Society</p>
            <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;">${title}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px 0;">
            <span style="display:inline-block;background:${color}18;color:${color};font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;letter-spacing:0.5px;">${badge}</span>
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
            <p style="margin:0;font-size:12px;color:#9ca3af;">This is an automated message from your website membership form.</p>
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
      middleName,
      lastName,
      age,
      gender,
      address,
      city,
      province,
      zip,
      email,
      phone,
      officePhone,
      homePhone,
      education,
      employment,
      maritalStatus,
      children,
      familySize,
    } = body as Record<string, string>;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields (first name, last name, email)" },
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

    const rows =
      section("Personal Information",
        field("First Name", firstName) +
        field("Middle Name", middleName || "N/A") +
        field("Last Name", lastName) +
        field("Age", age || "N/A") +
        field("Gender", gender || "N/A") +
        field("Marital Status", maritalStatus || "N/A") +
        field("Children", children || "N/A") +
        field("Family Size", familySize || "N/A")
      ) +
      section("Contact Details",
        field("Email", email) +
        field("Phone Number", phone || "N/A") +
        field("Office Phone", officePhone || "N/A") +
        field("Home Phone", homePhone || "N/A")
      ) +
      section("Address",
        field("Address", address || "N/A") +
        field("City", city || "N/A") +
        field("Province / State", province || "N/A") +
        field("Postal / Zip Code", zip || "N/A")
      ) +
      section("Background",
        field("Education", education || "N/A") +
        field("Employment", employment || "N/A")
      );

    await transporter.sendMail(({
      from:
        process.env.SMTP_FROM ||
        `"Oromo Cultural" <${process.env.SMTP_USER || "no-reply@example.com"}>`,
      to: process.env.MEMBERSHIP_TO_EMAIL || process.env.DONATION_TO_EMAIL || process.env.SMTP_USER,
      subject: "🤝 New Membership Submission",
      html: emailHtml("New Membership Submission", "Membership Form", "#8b5cf6", rows),
    } as any));

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Membership email error", error);
    return NextResponse.json(
      {
        error: "Failed to send membership email",
        detail: error?.message ?? "Unknown error",
      },
      { status: 500 },
    );
  }
}

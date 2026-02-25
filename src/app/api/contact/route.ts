import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      subject,
      message,
    } = body as Record<string, string>;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, message)" },
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
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const lines = [
      "New contact form submission:",
      "",
      `Name: ${name}`,
      `Phone: ${phone || "N/A"}`,
      `Email: ${email}`,
      `Subject: ${subject || "N/A"}`,
      "",
      "Message:",
      message,
    ];

    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        `"Oromo Cultural" <${process.env.SMTP_USER || "no-reply@example.com"}>`,
      to:
        process.env.CONTACT_TO_EMAIL ||
        process.env.DONATION_TO_EMAIL ||
        process.env.SMTP_USER,
      subject: subject || "New Contact Submission",
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Contact email error", error);
    return NextResponse.json(
      {
        error: "Failed to send contact email",
        detail: error?.message ?? "Unknown error",
      },
      { status: 500 },
    );
  }
}


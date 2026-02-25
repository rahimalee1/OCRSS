import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

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
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    const messageLines = [
      "New donation form submission:",
      "",
      `Name: ${fullName || "N/A"}`,
      `Email: ${email}`,
      `Amount: ${amount}`,
      `Anonymous: ${anonymous ? "Yes" : "No"}`,
    ];

    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        `"Oromo Cultural" <${process.env.SMTP_USER || "no-reply@example.com"}>`,
      to: process.env.DONATION_TO_EMAIL || "rahimgilal1@gmail.com",
      subject: "New Donation Submission",
      text: messageLines.join("\n"),
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


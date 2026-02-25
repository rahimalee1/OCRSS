import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

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
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const lines = [
      "New membership form submission:",
      "",
      `First Name: ${firstName}`,
      `Middle Name: ${middleName || "N/A"}`,
      `Last Name: ${lastName}`,
      `Age: ${age || "N/A"}`,
      `Gender: ${gender || "N/A"}`,
      `Address: ${address || "N/A"}`,
      `City: ${city || "N/A"}`,
      `Province / State: ${province || "N/A"}`,
      `Postal / Zip Code: ${zip || "N/A"}`,
      `Email: ${email}`,
      `Phone Number: ${phone || "N/A"}`,
      `Office Phone: ${officePhone || "N/A"}`,
      `Home Phone: ${homePhone || "N/A"}`,
      `Educational: ${education || "N/A"}`,
      `Job / Employment: ${employment || "N/A"}`,
      `Marital Status: ${maritalStatus || "N/A"}`,
      `Children: ${children || "N/A"}`,
    ];

    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        `"Oromo Cultural" <${process.env.SMTP_USER || "no-reply@example.com"}>`,
      to: process.env.MEMBERSHIP_TO_EMAIL || process.env.DONATION_TO_EMAIL || process.env.SMTP_USER,
      subject: "New Membership Submission",
      text: lines.join("\n"),
    });

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


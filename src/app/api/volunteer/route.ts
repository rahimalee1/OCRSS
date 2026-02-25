import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      phone,
      email,
      dob,
      gender,
      address,
      city,
      state,
      zip,
      availableDays,
      availableTime,
      shiftLength,
      availabilityStart,
      availabilityEnd,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
      previousExperience,
      skills,
      languages,
      workType,
      backgroundCheckConsent,
      liabilityWaiver,
      mediaRelease,
      motivation,
      futureCommunicationConsent,
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
      "New volunteer form submission:",
      "",
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `Phone Number: ${phone || "N/A"}`,
      `Email: ${email}`,
      `Date of Birth: ${dob || "N/A"}`,
      `Gender / Sex: ${gender || "N/A"}`,
      `Address: ${address || "N/A"}`,
      `City: ${city || "N/A"}`,
      `State / Province: ${state || "N/A"}`,
      `Zip / Postal Code: ${zip || "N/A"}`,
      "",
      "Availability:",
      `Days Available: ${availableDays || "N/A"}`,
      `Available Time: ${availableTime || "N/A"}`,
      `Preferred Shift Length: ${shiftLength || "N/A"}`,
      `Availability Start Date: ${availabilityStart || "N/A"}`,
      `Availability End Date: ${availabilityEnd || "N/A"}`,
      "",
      "Emergency Contact:",
      `Name: ${emergencyName || "N/A"}`,
      `Relationship: ${emergencyRelationship || "N/A"}`,
      `Phone: ${emergencyPhone || "N/A"}`,
      "",
      "Experience & Skills:",
      `Previous Volunteer Experience: ${previousExperience || "N/A"}`,
      `Relevant Skills / Qualifications: ${skills || "N/A"}`,
      `Languages Spoken: ${languages || "N/A"}`,
      "",
      "Interests & Preferences:",
      `Type of Work Interested In: ${workType || "N/A"}`,
      "",
      "Background & Consent:",
      `Consent to Background Check: ${backgroundCheckConsent || "N/A"}`,
      `Liability Waiver / Assumption of Risk: ${liabilityWaiver || "N/A"}`,
      `Photo / Media Release: ${mediaRelease || "N/A"}`,
      `Motivation: ${motivation || "N/A"}`,
      `Consent for Future Communication: ${futureCommunicationConsent || "N/A"}`,
    ];

    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        `"Oromo Cultural" <${process.env.SMTP_USER || "no-reply@example.com"}>`,
      to:
        process.env.VOLUNTEER_TO_EMAIL ||
        process.env.MEMBERSHIP_TO_EMAIL ||
        process.env.DONATION_TO_EMAIL ||
        process.env.SMTP_USER,
      subject: "New Volunteer Submission",
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Volunteer email error", error);
    return NextResponse.json(
      {
        error: "Failed to send volunteer email",
        detail: error?.message ?? "Unknown error",
      },
      { status: 500 },
    );
  }
}


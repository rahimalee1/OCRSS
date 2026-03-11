import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "@/app/api/auth/auth-options";
import { getAdminCredentials, getAdminEmail, updateAdminEmail } from "@/app/lib/admin-credentials";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = await getAdminEmail();
    if (!session?.user?.email || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const body = await request.json();
    const { currentPassword, newEmail } = body as { currentPassword?: string; newEmail?: string };
    if (typeof currentPassword !== "string" || typeof newEmail !== "string") {
      return NextResponse.json({ error: "Current password and new email are required." }, { status: 400 });
    }

    const nextEmail = newEmail.trim().toLowerCase();
    if (!nextEmail.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const creds = await getAdminCredentials();
    const ok = await bcrypt.compare(currentPassword, creds.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    await updateAdminEmail(nextEmail);
    return NextResponse.json({ success: true, email: nextEmail });
  } catch (err) {
    console.error("Admin email update error:", err);
    return NextResponse.json({ error: "Failed to update admin email." }, { status: 500 });
  }
}


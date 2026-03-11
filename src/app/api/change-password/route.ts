import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "@/app/api/auth/auth-options";
import { getAdminCredentials, getAdminEmail, updateAdminPasswordHash } from "@/app/lib/admin-credentials";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = await getAdminEmail();
    if (!session?.user?.email || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body as { currentPassword?: string; newPassword?: string };

    if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
      return NextResponse.json({ error: "Current password and new password are required." }, { status: 400 });
    }

    const creds = await getAdminCredentials();
    const valid = await bcrypt.compare(currentPassword, creds.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await updateAdminPasswordHash(newHash);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json({ error: "Failed to change password. Please try again." }, { status: 500 });
  }
}

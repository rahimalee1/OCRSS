import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { put } from "@vercel/blob";
import { authOptions } from "@/app/api/auth/auth-options";
import { getAdminCredentials, getAdminEmail, updateAdminAvatarUrl } from "@/app/lib/admin-credentials";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = await getAdminEmail();
    if (!session?.user?.email || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Blob storage not configured." }, { status: 503 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const currentPassword = formData.get("currentPassword") as string | null;

    if (!file || !file.size) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (!currentPassword) {
      return NextResponse.json({ error: "Current password is required." }, { status: 400 });
    }

    const creds = await getAdminCredentials();
    const ok = await bcrypt.compare(currentPassword, creds.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const pathname = `images/admin-avatar-${Date.now()}.${ext}`;
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
      token,
    });

    await updateAdminAvatarUrl(blob.url);
    return NextResponse.json({ success: true, url: blob.url });
  } catch (err) {
    console.error("Admin avatar upload error:", err);
    return NextResponse.json({ error: "Failed to upload avatar." }, { status: 500 });
  }
}


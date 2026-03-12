import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { put } from "@vercel/blob";
import { authOptions } from "@/app/api/auth/auth-options";
import { getAdminCredentials, getAdminEmail, updateAdminAvatarUrl } from "@/app/lib/admin-credentials";
import { getCloudinary } from "@/app/lib/cloudinary";

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

    const cloudinary = getCloudinary();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const publicIdBase = `admin-avatar-${Date.now()}`;

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "admin",
          public_id: publicIdBase,
          overwrite: true,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            return reject(error ?? new Error("Cloudinary upload failed"));
          }
          resolve({ secure_url: result.secure_url });
        }
      );

      uploadStream.end(buffer);
    });

    await updateAdminAvatarUrl(uploadResult.secure_url);
    return NextResponse.json({ success: true, url: uploadResult.secure_url });
  } catch (err) {
    console.error("Admin avatar upload error:", err);
    return NextResponse.json({ error: "Failed to upload avatar." }, { status: 500 });
  }
}


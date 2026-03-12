import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";
import {
  getDefaultSiteImages,
  type SiteImagesConfig,
  type SiteImageKey,
  getSiteImages,
} from "@/app/lib/site-images";
import { saveSiteImagesConfigToCloudinary } from "@/app/lib/site-images-cloudinary";
import { getAdminEmail } from "@/app/lib/admin-credentials";
import { getCloudinary } from "@/app/lib/cloudinary";
const VALID_KEYS: SiteImageKey[] = [
  "homeHero",
  "donateBanner",
  "aboutBanner",
  "aboutUs",
  "aboutCtaBg",
  "servicesBanner",
  "contactBanner",
  "contactFormImage",
  "eventsBanner",
  "volunteerBg",
];

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = await getAdminEmail();
    if (!session?.user?.email || session.user.email !== adminEmail) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const key = formData.get("key") as string | null;
    const file = formData.get("file") as File | null;

    if (!key || !VALID_KEYS.includes(key as SiteImageKey)) {
      return NextResponse.json(
        { error: "Invalid or missing image key." },
        { status: 400 }
      );
    }
    if (!file || !file.size) {
      return NextResponse.json(
        { error: "No file provided or file is empty." },
        { status: 400 }
      );
    }

    const cloudinary = getCloudinary();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const publicIdBase = `${key}-${Date.now()}`;

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "site-images",
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

    const current = await getSiteImages();
    const fullConfig: SiteImagesConfig = { ...current, [key]: uploadResult.secure_url };
    await saveSiteImagesConfigToCloudinary(fullConfig);
    return NextResponse.json({ url: uploadResult.secure_url, key, config: fullConfig });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}

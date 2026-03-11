import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put, list } from "@vercel/blob";
import { authOptions } from "@/app/api/auth/auth-options";
import {
  getDefaultSiteImages,
  type SiteImagesConfig,
  type SiteImageKey,
} from "@/app/lib/site-images";
import { getAdminEmail } from "@/app/lib/admin-credentials";

const CONFIG_PATHNAME = "config/site-images.json";
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

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Blob storage not configured (BLOB_READ_WRITE_TOKEN)." },
        { status: 503 }
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

    const pathname = `images/${key}-${Date.now()}.${file.name.split(".").pop() || "jpg"}`;
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
      token,
    });

    let config: SiteImagesConfig = getDefaultSiteImages();
    const { blobs } = await list({ prefix: "config/", token });
    const configBlob = blobs.find((b) => b.pathname === CONFIG_PATHNAME);
    if (configBlob?.url) {
      const res = await fetch(configBlob.url);
      if (res.ok) {
        config = (await res.json()) as SiteImagesConfig;
      }
    }

    config[key as SiteImageKey] = blob.url;

    await put(CONFIG_PATHNAME, JSON.stringify(config, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
      allowOverwrite: true,
      token,
    });

    return NextResponse.json({ url: blob.url, key });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}

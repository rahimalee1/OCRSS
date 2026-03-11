import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put } from "@vercel/blob";
import { authOptions } from "@/app/api/auth/auth-options";
import { getDefaultSiteContact, type SiteContactConfig } from "@/app/lib/site-contact";
import { getAdminEmail } from "@/app/lib/admin-credentials";

const CONFIG_PATHNAME = "config/site-contact.json";
const VALID_KEYS: (keyof SiteContactConfig)[] = ["email", "phone", "address"];

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = await getAdminEmail();
    if (!session?.user?.email || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Blob storage not configured (BLOB_READ_WRITE_TOKEN)." }, { status: 503 });
    }

    const body = (await request.json()) as Partial<SiteContactConfig>;

    const filtered: Partial<SiteContactConfig> = {};
    for (const key of VALID_KEYS) {
      if (typeof body[key] === "string") {
        filtered[key] = body[key].trim();
      }
    }

    if (Object.keys(filtered).length === 0) {
      return NextResponse.json({ error: "No valid fields provided." }, { status: 400 });
    }

    const defaults = getDefaultSiteContact();

    let existing: Partial<SiteContactConfig> = {};
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: "config/", token });
      const configBlob = blobs.find((b) => b.pathname === CONFIG_PATHNAME);
      if (configBlob?.url) {
        const res = await fetch(configBlob.url);
        if (res.ok) {
          existing = (await res.json()) as Partial<SiteContactConfig>;
        }
      }
    } catch { /* use defaults */ }

    const merged: SiteContactConfig = { ...defaults, ...existing, ...filtered };

    await put(CONFIG_PATHNAME, JSON.stringify(merged, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
      allowOverwrite: true,
      token,
    });

    return NextResponse.json({ success: true, data: merged });
  } catch (err) {
    console.error("Update contact error:", err);
    return NextResponse.json({ error: "Failed to update contact info. Please try again." }, { status: 500 });
  }
}

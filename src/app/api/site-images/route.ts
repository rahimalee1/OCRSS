import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
import { getDefaultSiteImages, type SiteImagesConfig } from "@/app/lib/site-images";

const CONFIG_PATHNAME = "config/site-images.json";

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(getDefaultSiteImages());
    }
    const { blobs } = await list({ prefix: "config/" });
    const configBlob = blobs.find((b) => b.pathname === CONFIG_PATHNAME);
    if (!configBlob?.url) {
      return NextResponse.json(getDefaultSiteImages());
    }
    const res = await fetch(configBlob.url);
    if (!res.ok) {
      return NextResponse.json(getDefaultSiteImages());
    }
    const data = (await res.json()) as Partial<SiteImagesConfig>;
    const defaults = getDefaultSiteImages();
    return NextResponse.json({ ...defaults, ...data });
  } catch {
    return NextResponse.json(getDefaultSiteImages());
  }
}

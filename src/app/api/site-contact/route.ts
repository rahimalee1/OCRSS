import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
import { getDefaultSiteContact, type SiteContactConfig } from "@/app/lib/site-contact";

const CONFIG_PATHNAME = "config/site-contact.json";

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(getDefaultSiteContact());
    }
    const { blobs } = await list({ prefix: "config/" });
    const configBlob = blobs.find((b) => b.pathname === CONFIG_PATHNAME);
    if (!configBlob?.url) {
      return NextResponse.json(getDefaultSiteContact());
    }
    const res = await fetch(configBlob.url);
    if (!res.ok) {
      return NextResponse.json(getDefaultSiteContact());
    }
    const data = (await res.json()) as Partial<SiteContactConfig>;
    const defaults = getDefaultSiteContact();
    return NextResponse.json({ ...defaults, ...data });
  } catch {
    return NextResponse.json(getDefaultSiteContact());
  }
}

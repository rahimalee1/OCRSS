import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";
import { getDefaultSiteContact, type SiteContactConfig, setSiteContact } from "@/app/lib/site-contact";
import { getAdminEmail } from "@/app/lib/admin-credentials";

const VALID_KEYS: (keyof SiteContactConfig)[] = ["email", "phone", "address"];

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const adminEmail = await getAdminEmail();
    if (!session?.user?.email || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
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
    setSiteContact(filtered);
    const merged: SiteContactConfig = { ...defaults, ...filtered };

    return NextResponse.json({ success: true, data: merged });
  } catch (err) {
    console.error("Update contact error:", err);
    return NextResponse.json({ error: "Failed to update contact info. Please try again." }, { status: 500 });
  }
}

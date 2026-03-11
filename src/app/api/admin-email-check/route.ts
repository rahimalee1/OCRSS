import { NextResponse } from "next/server";
import { getAdminEmail } from "@/app/lib/admin-credentials";

export async function GET() {
  const adminEmail = await getAdminEmail();
  return NextResponse.json({ adminEmail });
}


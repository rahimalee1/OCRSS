import { NextResponse } from "next/server";
import { getSiteContact } from "@/app/lib/site-contact";

export async function GET() {
  const contact = await getSiteContact();
  return NextResponse.json(contact);
}

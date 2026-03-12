import { NextResponse } from "next/server";
import { getSiteImages } from "@/app/lib/site-images";

export async function GET() {
  const images = await getSiteImages();
  return NextResponse.json(images);
}

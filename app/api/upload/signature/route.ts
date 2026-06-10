import { NextRequest, NextResponse } from "next/server";
import { cloudinary, allowedUploadMimeTypes } from "@/lib/cloudinary";
import { requireUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const user = await requireUser();
  const limited = await rateLimit(`upload:${user.id}`, 30, 60);
  if (!limited.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  const body = await request.json() as { mimeType?: string; bytes?: number };
  if (!body.mimeType || !allowedUploadMimeTypes.has(body.mimeType) || !body.bytes || body.bytes > 25_000_000) return NextResponse.json({ error: "Unsupported file" }, { status: 400 });
  const timestamp = Math.round(Date.now() / 1000);
  const folder = `studenthub/${user.id}`;
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, process.env.CLOUDINARY_API_SECRET!);
  return NextResponse.json({ timestamp, folder, signature, apiKey: process.env.CLOUDINARY_API_KEY, cloudName: process.env.CLOUDINARY_CLOUD_NAME });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { apiError } from "@/lib/api";
import { profileSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireUser();
    const limited = await rateLimit(`profile:${user.id}`, 20, 60);
    if (!limited.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    const input = profileSchema.parse(await request.json());
    const { username, name, ...profileData } = input;
    const updated = await prisma.user.update({ where: { id: user.id }, data: { username, name, profile: { upsert: { create: profileData, update: profileData } } }, include: { profile: true } });
    return NextResponse.json({ profile: updated });
  } catch (error) { return apiError(error); }
}

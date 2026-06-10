import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { apiError } from "@/lib/api";
import { teamRequestSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  const teamRequests = await prisma.teamRequest.findMany({ where: { status: "OPEN" }, include: { creator: true, members: true, community: true }, orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ teamRequests });
}
export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const limited = await rateLimit(`team:${user.id}`, 15, 60);
    if (!limited.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    const input = teamRequestSchema.parse(await request.json());
    const teamRequest = await prisma.teamRequest.create({ data: { ...input, creatorId: user.id, members: { create: { userId: user.id, role: "Founder", acceptedAt: new Date() } } } });
    return NextResponse.json({ teamRequest }, { status: 201 });
  } catch (error) { return apiError(error); }
}

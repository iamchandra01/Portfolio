import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { apiError } from "@/lib/api";
import { projectSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  const projects = await prisma.project.findMany({ include: { author: true, reactions: true, comments: true }, orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ projects });
}
export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const limited = await rateLimit(`project:${user.id}`, 15, 60);
    if (!limited.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    const input = projectSchema.parse(await request.json());
    const project = await prisma.project.create({ data: { ...input, authorId: user.id } });
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) { return apiError(error); }
}

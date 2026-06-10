import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { apiError } from "@/lib/api";
import { noteSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject") ?? undefined;
  const semester = searchParams.get("semester") ?? undefined;
  const notes = await prisma.note.findMany({ where: { subject, semester }, include: { author: true, attachments: true, reactions: true }, orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ notes });
}
export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const limited = await rateLimit(`note:${user.id}`, 20, 60);
    if (!limited.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    const input = noteSchema.parse(await request.json());
    const note = await prisma.note.create({ data: { ...input, authorId: user.id } });
    return NextResponse.json({ note }, { status: 201 });
  } catch (error) { return apiError(error); }
}

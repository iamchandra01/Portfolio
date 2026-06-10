import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { apiError } from "@/lib/api";
import { messageSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(_: NextRequest, { params }: { params: Promise<{ communityId: string }> }) {
  const { communityId } = await params;
  const messages = await prisma.message.findMany({ where: { channel: { communityId }, deletedAt: null }, include: { author: true, attachments: true, reactions: true, replies: true }, orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ messages: messages.reverse() });
}
export async function POST(request: NextRequest, { params }: { params: Promise<{ communityId: string }> }) {
  try {
    const user = await requireUser();
    const { communityId } = await params;
    const limited = await rateLimit(`message:${user.id}`, 60, 60);
    if (!limited.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    const input = messageSchema.parse(await request.json());
    const channel = await prisma.channel.findFirstOrThrow({ where: { communityId }, orderBy: { position: "asc" } });
    const message = await prisma.message.create({ data: { channelId: channel.id, authorId: user.id, content: input.content, parentId: input.parentId, attachments: { create: input.attachments } }, include: { author: true, attachments: true } });
    return NextResponse.json({ message }, { status: 201 });
  } catch (error) { return apiError(error); }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const user = await requireUser();
  const notifications = await prisma.notification.findMany({ where: { recipientId: user.id }, include: { actor: true }, orderBy: { createdAt: "desc" }, take: 30 });
  return NextResponse.json({ notifications });
}

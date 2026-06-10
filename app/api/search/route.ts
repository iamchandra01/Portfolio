import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { searchSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  await requireUser();
  const { q } = searchSchema.parse({ q: new URL(request.url).searchParams.get("q") ?? "" });
  const [users, communities, projects, notes] = await Promise.all([
    prisma.user.findMany({ where: { OR: [{ name: { contains: q, mode: "insensitive" } }, { username: { contains: q, mode: "insensitive" } }] }, take: 10 }),
    prisma.community.findMany({ where: { OR: [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] }, take: 10 }),
    prisma.project.findMany({ where: { OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] }, take: 10 }),
    prisma.note.findMany({ where: { OR: [{ title: { contains: q, mode: "insensitive" } }, { subject: { contains: q, mode: "insensitive" } }] }, take: 10 })
  ]);
  return NextResponse.json({ users, communities, projects, notes });
}

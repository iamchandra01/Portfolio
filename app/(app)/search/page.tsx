import { Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireUser();
  const { q = "" } = await searchParams;
  const query = q.trim();
  const [users, communities, projects, notes] = query ? await Promise.all([
    prisma.user.findMany({ where: { OR: [{ name: { contains: query, mode: "insensitive" } }, { username: { contains: query, mode: "insensitive" } }] }, take: 8 }),
    prisma.community.findMany({ where: { OR: [{ name: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }] }, take: 8 }),
    prisma.project.findMany({ where: { OR: [{ title: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }] }, take: 8 }),
    prisma.note.findMany({ where: { OR: [{ title: { contains: query, mode: "insensitive" } }, { subject: { contains: query, mode: "insensitive" } }] }, take: 8 })
  ]) : [[], [], [], []];
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Global search</h1><p className="text-muted-foreground">Search users, communities, projects, and notes from one fast interface.</p></div><form className="relative"><Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" /><Input name="q" defaultValue={query} placeholder="Search StudentHub..." className="pl-11" /></form><div className="grid gap-4 lg:grid-cols-2">{[["Users", users.map((u) => `@${u.username} — ${u.name}`)], ["Communities", communities.map((c) => c.name)], ["Projects", projects.map((p) => p.title)], ["Notes", notes.map((n) => `${n.title} · ${n.subject}`)]].map(([title, items]) => <Card key={title as string} className="p-5"><h2 className="font-semibold">{title as string}</h2><div className="mt-4 space-y-2">{(items as string[]).length ? (items as string[]).map((item) => <p key={item} className="rounded-xl bg-muted p-3 text-sm">{item}</p>) : <p className="text-sm text-muted-foreground">No results</p>}</div></Card>)}</div></div>;
}

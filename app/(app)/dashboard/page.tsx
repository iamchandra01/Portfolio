import { BookOpen, Code2, MessageSquareText, UsersRound } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { StatCard } from "@/components/features/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  await requireUser();
  const [users, notes, projects, teams, communities] = await Promise.all([prisma.user.count(), prisma.note.count(), prisma.project.count(), prisma.teamRequest.count({ where: { status: "OPEN" } }), prisma.community.findMany({ include: { channels: true }, orderBy: { createdAt: "asc" } })]);
  return <div className="space-y-8"><div><h1 className="text-3xl font-bold tracking-tight">Dashboard</h1><p className="text-muted-foreground">Your command center for student communities, notes, projects, and teams.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Students" value={users.toString()} icon={UsersRound} /><StatCard label="Notes" value={notes.toString()} icon={BookOpen} /><StatCard label="Projects" value={projects.toString()} icon={Code2} /><StatCard label="Open teams" value={teams.toString()} icon={MessageSquareText} /></div><Card><CardHeader><CardTitle>Default communities</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{communities.map((community) => <a key={community.id} href={`/communities/${community.slug}`} className="rounded-2xl border p-4 transition hover:bg-accent"><p className="font-semibold">{community.name}</p><p className="mt-1 text-sm text-muted-foreground">{community.channels.length} channels · {community.description}</p></a>)}</CardContent></Card></div>;
}

import { Role } from "@prisma/client";
import { Shield } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { StatCard } from "@/components/features/stat-card";
import { Card } from "@/components/ui/card";

export default async function AdminPage() {
  await requireRole([Role.ADMIN, Role.MODERATOR]);
  const [users, reports, communities, messages] = await Promise.all([prisma.user.count(), prisma.report.count({ where: { status: { in: ["OPEN", "REVIEWING"] } } }), prisma.community.count(), prisma.message.count()]);
  const recentReports = await prisma.report.findMany({ include: { reporter: true, community: true }, orderBy: { createdAt: "desc" }, take: 10 });
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Admin panel</h1><p className="text-muted-foreground">Manage users, communities, reports, moderation, bans, and platform analytics.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Users" value={users.toString()} icon={Shield} /><StatCard label="Open reports" value={reports.toString()} icon={Shield} /><StatCard label="Communities" value={communities.toString()} icon={Shield} /><StatCard label="Messages" value={messages.toString()} icon={Shield} /></div><Card className="p-5"><h2 className="font-semibold">Recent reports</h2><div className="mt-4 space-y-2">{recentReports.length ? recentReports.map((report) => <div key={report.id} className="rounded-xl border p-3 text-sm"><p className="font-medium">{report.targetType} · {report.status}</p><p className="text-muted-foreground">{report.reason}</p></div>) : <p className="text-sm text-muted-foreground">No reports awaiting moderation.</p>}</div></Card></div>;
}

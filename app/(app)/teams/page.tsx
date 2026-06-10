import { UsersRound } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default async function TeamsPage() {
  await requireUser();
  const requests = await prisma.teamRequest.findMany({ where: { status: "OPEN" }, include: { creator: true, members: true, community: true }, orderBy: { createdAt: "desc" }, take: 30 });
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Team finder</h1><p className="text-muted-foreground">Find frontend developers, AI engineers, UI designers, open-source contributors, and hackathon teammates.</p></div>{requests.length ? <div className="grid gap-4 lg:grid-cols-2">{requests.map((request) => <Card key={request.id} className="p-5"><p className="text-xs text-muted-foreground">{request.community?.name ?? "StudentHub"} · by {request.creator.name}</p><h2 className="mt-2 text-xl font-semibold">{request.title}</h2><p className="mt-2 text-sm text-muted-foreground">{request.description}</p><div className="mt-4 flex flex-wrap gap-2">{[...request.rolesNeeded, ...request.skillsNeeded].map((item) => <Badge key={item}>{item}</Badge>)}</div><Button className="mt-5">Request to join</Button></Card>)}</div> : <EmptyState icon={UsersRound} title="No open team requests" description="Create the first role-based team request for a hackathon, startup idea, open-source initiative, or campus club." />}</div>;
}

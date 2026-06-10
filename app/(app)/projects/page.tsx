import { Code2, ExternalLink, Github } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default async function ProjectsPage() {
  await requireUser();
  const projects = await prisma.project.findMany({ include: { author: true, reactions: true, comments: true, bookmarks: true }, orderBy: { createdAt: "desc" }, take: 30 });
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Project showcase</h1><p className="text-muted-foreground">Discover student-built products, open-source work, and hackathon demos.</p></div>{projects.length ? <div className="grid gap-4 lg:grid-cols-2">{projects.map((project) => <Card key={project.id} className="p-5"><p className="text-xs text-muted-foreground">by {project.author.name}</p><h2 className="mt-2 text-xl font-semibold">{project.title}</h2><p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{project.description}</p><div className="mt-4 flex flex-wrap gap-2">{project.techStack.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div><div className="mt-5 flex flex-wrap gap-2"><Button asChild variant="outline" size="sm"><a href={project.githubUrl ?? "#"} aria-disabled={!project.githubUrl}><Github className="size-4" />GitHub</a></Button><Button asChild variant="outline" size="sm"><a href={project.demoUrl ?? "#"} aria-disabled={!project.demoUrl}><ExternalLink className="size-4" />Demo</a></Button><Badge>{project.reactions.length} likes</Badge><Badge>{project.comments.length} comments</Badge><Badge>{project.bookmarks.length} saves</Badge></div></Card>)}</div> : <EmptyState icon={Code2} title="No projects published" description="Use the project API to publish the first real student project with GitHub links, demo links, images, and tech stack metadata." />}</div>;
}

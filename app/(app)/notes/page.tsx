import { BookOpen, Download } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default async function NotesPage({ searchParams }: { searchParams: Promise<{ subject?: string; semester?: string }> }) {
  await requireUser();
  const filters = await searchParams;
  const notes = await prisma.note.findMany({ where: { subject: filters.subject, semester: filters.semester }, include: { author: true, attachments: true, reactions: true, bookmarks: true }, orderBy: { createdAt: "desc" }, take: 30 });
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Notes platform</h1><p className="text-muted-foreground">Upload, search, upvote, bookmark, and download validated academic resources.</p></div>{notes.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{notes.map((note) => <Card key={note.id} className="p-5"><div className="flex items-start justify-between"><div><h2 className="font-semibold">{note.title}</h2><p className="mt-1 text-sm text-muted-foreground">{note.description}</p></div><BookOpen className="size-5 text-primary" /></div><div className="mt-4 flex flex-wrap gap-2"><Badge>{note.subject}</Badge><Badge>{note.semester}</Badge><Badge>{note.reactions.length} upvotes</Badge></div><Button className="mt-5 w-full" variant="outline"><Download className="size-4" />{note.downloadCount} downloads</Button></Card>)}</div> : <EmptyState icon={BookOpen} title="No notes found" description="Upload real PDFs, PPTs, DOCX files, or images through Cloudinary-backed upload flows to populate this library." />}</div>;
}

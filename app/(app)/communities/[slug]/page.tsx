import { notFound } from "next/navigation";
import { Hash, Pin } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await requireUser();
  const { slug } = await params;
  const community = await prisma.community.findUnique({ where: { slug }, include: { channels: { orderBy: { position: "asc" }, include: { messages: { where: { deletedAt: null }, include: { author: true, attachments: true, reactions: true }, orderBy: { createdAt: "desc" }, take: 25 } } }, members: { where: { userId: user.id } } } });
  if (!community) notFound();
  const active = community.channels[0];
  return <div className="grid gap-6 xl:grid-cols-[18rem_1fr]"><Card className="h-fit p-4"><h1 className="px-2 text-xl font-bold">{community.name}</h1><p className="px-2 pb-4 text-sm text-muted-foreground">{community.description}</p><div className="space-y-1">{community.channels.map((channel) => <a key={channel.id} href={`#${channel.slug}`} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent"><Hash className="size-4" />{channel.name}</a>)}</div></Card><section className="space-y-4"><div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold">#{active?.name ?? "community"}</h2><p className="text-sm text-muted-foreground">Real-time channel messages with mentions, replies, pins, files, and read receipts.</p></div></div>{active?.messages.length ? active.messages.map((message) => <Card key={message.id} className="p-4"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold">{message.author.name}</p><p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{message.content}</p></div>{message.pinnedAt ? <Pin className="size-4 text-primary" /> : null}</div></Card>) : <EmptyState icon={Hash} title="No messages yet" description="Start the first secure conversation in this channel through the message API or real-time Socket.IO client." />}</section></div>;
}

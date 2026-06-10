import Image from "next/image";
import { notFound } from "next/navigation";
import { Github, Linkedin, Link as LinkIcon } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { initials } from "@/lib/utils";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await prisma.user.findUnique({ where: { username }, include: { profile: true, projects: { take: 6, orderBy: { createdAt: "desc" } }, notes: { take: 6, orderBy: { createdAt: "desc" } }, followers: true, following: true } });
  if (!user) notFound();
  return <div className="space-y-6"><Card className="overflow-hidden"><div className="h-44 bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400">{user.profile?.bannerUrl ? <Image src={user.profile.bannerUrl} alt="Profile banner" width={1600} height={400} className="h-full w-full object-cover" /> : null}</div><div className="p-6"><div className="-mt-16 mb-4 grid size-24 place-items-center overflow-hidden rounded-3xl border-4 border-card bg-primary text-2xl font-bold text-primary-foreground">{user.imageUrl ? <Image src={user.imageUrl} alt={user.name} width={96} height={96} className="size-full object-cover" /> : initials(user.name)}</div><h1 className="text-3xl font-bold">{user.name}</h1><p className="text-muted-foreground">@{user.username} · {user.profile?.college ?? "College not set"}</p><p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">{user.profile?.bio ?? "This student has not added a bio yet."}</p><div className="mt-4 flex flex-wrap gap-2">{user.profile?.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}</div><div className="mt-5 flex gap-2"><Button>Follow</Button>{user.profile?.linkedinUrl ? <Button asChild variant="outline" size="icon"><a href={user.profile.linkedinUrl}><Linkedin className="size-4" /></a></Button> : null}{user.profile?.githubUrl ? <Button asChild variant="outline" size="icon"><a href={user.profile.githubUrl}><Github className="size-4" /></a></Button> : null}{user.profile?.portfolioUrl ? <Button asChild variant="outline" size="icon"><a href={user.profile.portfolioUrl}><LinkIcon className="size-4" /></a></Button> : null}</div></div></Card><div className="grid gap-4 md:grid-cols-3"><Card className="p-5"><p className="text-2xl font-bold">{user.followers.length}</p><p className="text-sm text-muted-foreground">Followers</p></Card><Card className="p-5"><p className="text-2xl font-bold">{user.following.length}</p><p className="text-sm text-muted-foreground">Following</p></Card><Card className="p-5"><p className="text-2xl font-bold">{user.projects.length}</p><p className="text-sm text-muted-foreground">Projects</p></Card></div></div>;
}

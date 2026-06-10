import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function requireUser() {
  const { userId } = await auth();
  if (!userId) throw new Response("Unauthorized", { status: 401 });
  const clerkUser = await currentUser();
  if (!clerkUser?.primaryEmailAddress?.emailAddress) throw new Response("Missing email", { status: 400 });
  const email = clerkUser.primaryEmailAddress.emailAddress;
  const baseUsername = slugify(clerkUser.username ?? email.split("@")[0] ?? "student");
  return prisma.user.upsert({
    where: { clerkId: userId },
    update: { email, imageUrl: clerkUser.imageUrl, name: clerkUser.fullName ?? baseUsername },
    create: { clerkId: userId, email, username: `${baseUsername}-${userId.slice(-5)}`, name: clerkUser.fullName ?? baseUsername, imageUrl: clerkUser.imageUrl, profile: { create: {} } },
    include: { profile: true }
  });
}

export async function requireRole(roles: Role[]) {
  const user = await requireUser();
  if (!roles.includes(user.role)) throw new Response("Forbidden", { status: 403 });
  return user;
}

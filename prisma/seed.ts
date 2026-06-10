import { PrismaClient, CommunityKind } from "@prisma/client";

const prisma = new PrismaClient();

const communities = [
  { slug: "general", name: "General", kind: CommunityKind.GENERAL, icon: "Sparkles", channels: ["general-chat", "introductions", "random"] },
  { slug: "academics", name: "Academics", kind: CommunityKind.ACADEMICS, icon: "GraduationCap", channels: ["notes-resources", "assignments", "doubts", "exam-discussion"] },
  { slug: "technology", name: "Technology", kind: CommunityKind.TECHNOLOGY, icon: "Code2", channels: ["coding-help", "web-development", "app-development", "ai-ml", "dsa", "open-source", "hackathons"] },
  { slug: "career", name: "Career", kind: CommunityKind.CAREER, icon: "BriefcaseBusiness", channels: ["internships", "placements", "resume-reviews", "career-guidance"] },
  { slug: "college-hub", name: "College Hub", kind: CommunityKind.COLLEGE_HUB, icon: "Building2", channels: ["events", "clubs", "scholarships", "lost-found"] },
  { slug: "gaming", name: "Gaming", kind: CommunityKind.GAMING, icon: "Gamepad2", channels: ["gaming-discussions"] }
];

async function main() {
  for (const community of communities) {
    await prisma.community.upsert({
      where: { slug: community.slug },
      update: {},
      create: {
        slug: community.slug,
        name: community.name,
        kind: community.kind,
        icon: community.icon,
        isDefault: true,
        description: `${community.name} space for student collaboration and discovery.`,
        channels: { create: community.channels.map((slug, position) => ({ slug, position, name: slug.split("-").map((p) => p[0]!.toUpperCase() + p.slice(1)).join(" ") })) }
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());

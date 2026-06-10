import { z } from "zod";

const url = z.string().url().max(300).optional().or(z.literal(""));
export const profileSchema = z.object({
  username: z.string().min(3).max(32).regex(/^[a-z0-9-]+$/), name: z.string().min(2).max(80), bio: z.string().max(500).optional(), college: z.string().max(120).optional(), degree: z.string().max(120).optional(), year: z.string().max(40).optional(), bannerUrl: url,
  skills: z.array(z.string().min(1).max(40)).max(30).default([]), interests: z.array(z.string().min(1).max(40)).max(30).default([]), linkedinUrl: url, githubUrl: url, instagramUrl: url, youtubeUrl: url, xUrl: url, spotifyUrl: url, redditUrl: url, portfolioUrl: url
});
export const messageSchema = z.object({ content: z.string().min(1).max(4000), parentId: z.string().cuid().optional(), attachments: z.array(z.object({ url: z.string().url(), publicId: z.string().min(1), fileName: z.string().min(1).max(180), bytes: z.number().int().positive().max(25_000_000), mimeType: z.string().min(1).max(120), type: z.enum(["IMAGE", "PDF", "PPT", "DOCX", "GIF", "OTHER"]) })).max(10).default([]) });
export const projectSchema = z.object({ title: z.string().min(3).max(120), description: z.string().min(20).max(1600), githubUrl: url, demoUrl: url, techStack: z.array(z.string().min(1).max(40)).max(24).default([]) });
export const noteSchema = z.object({ title: z.string().min(3).max(140), description: z.string().min(10).max(1000), subject: z.string().min(2).max(80), semester: z.string().min(1).max(40), communityId: z.string().cuid().optional() });
export const teamRequestSchema = z.object({ title: z.string().min(5).max(140), description: z.string().min(20).max(1600), communityId: z.string().cuid().optional(), rolesNeeded: z.array(z.string().min(2).max(60)).max(12).default([]), skillsNeeded: z.array(z.string().min(2).max(60)).max(24).default([]) });
export const searchSchema = z.object({ q: z.string().trim().min(1).max(80) });

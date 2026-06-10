# StudentHub

StudentHub is a production-oriented student community platform built with Next.js 15, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Clerk, Cloudinary, Redis, and Socket.IO.

## Features

- Premium responsive app shell with dark and light mode.
- Clerk-secured dashboard, profiles, communities, notes, projects, team finder, search, and admin pages.
- Scalable Prisma schema covering users, profiles, follows, communities, channels, messages, direct threads, attachments, reactions, notes, projects, teams, notifications, reports, bookmarks, and read receipts.
- Validated API routes with Zod and Redis-backed rate limits.
- Cloudinary signed upload endpoint with file type and size validation.
- Socket.IO realtime service for channel events, typing indicators, and notifications.

## Getting started

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run seed
npm run dev
```

## Useful commands

```bash
npm run typecheck
npm run build
npm run prisma:migrate
npm run seed
```

## Architecture

See [`docs/architecture.md`](docs/architecture.md) for system architecture, ER diagram, folder structure, API design, UI wireframe plan, security controls, and deployment notes.

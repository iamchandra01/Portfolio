import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/communities(.*)", "/profile(.*)", "/projects(.*)", "/notes(.*)", "/teams(.*)", "/search(.*)", "/admin(.*)", "/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
  const response = NextResponse.next();
  response.headers.set("X-DNS-Prefetch-Control", "on");
  return response;
});

export const config = { matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ico|woff2?|ttf|map)).*)", "/(api|trpc)(.*)"] };

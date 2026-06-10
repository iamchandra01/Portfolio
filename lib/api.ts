import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiError(error: unknown) {
  if (error instanceof Response) return new NextResponse(error.body, { status: error.status });
  if (error instanceof ZodError) return NextResponse.json({ error: "Validation failed", issues: error.flatten() }, { status: 422 });
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

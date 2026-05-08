import { NextRequest, NextResponse } from "next/server";
import { HttpError } from "./mock-backend";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function proxy(
  req: NextRequest,
  targetPath: string,
): Promise<Response> {
  const url = new URL(targetPath, BASE);
  url.search = req.nextUrl.search;

  let body: BodyInit | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.text();
  }

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": req.headers.get("content-type") ?? "application/json",
      },
      body,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      {
        error: "backend_unreachable",
        detail: "Cannot reach the LogoMesh backend.",
      },
      { status: 502 },
    );
  }

  const buf = await upstream.arrayBuffer();
  return new Response(buf, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export function errorResponse(e: unknown): Response {
  if (e instanceof HttpError) {
    return NextResponse.json(
      { error: e.message, detail: e.detail },
      { status: e.status },
    );
  }
  return NextResponse.json(
    {
      error: "internal_error",
      detail: e instanceof Error ? e.message : String(e),
    },
    { status: 500 },
  );
}

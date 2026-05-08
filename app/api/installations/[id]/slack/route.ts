import { NextRequest, NextResponse } from "next/server";
import { isMockEnabled, mockBackend } from "@/lib/mock-backend";
import { errorResponse, proxy } from "@/lib/proxy";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  if (isMockEnabled()) {
    try {
      const body = (await req.json()) as { webhook_url?: string };
      const data = await mockBackend.setSlack(id, body.webhook_url ?? "");
      return NextResponse.json(data);
    } catch (e) {
      return errorResponse(e);
    }
  }
  return proxy(req, `/api/installations/${id}/slack`);
}

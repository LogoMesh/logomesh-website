import { NextRequest, NextResponse } from "next/server";
import { isMockEnabled, mockBackend } from "@/lib/mock-backend";
import { errorResponse, proxy } from "@/lib/proxy";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const limitParam = req.nextUrl.searchParams.get("limit");
  const limit = Math.min(Math.max(Number(limitParam) || 20, 1), 100);
  if (isMockEnabled()) {
    try {
      const data = await mockBackend.listRuns(id, limit);
      return NextResponse.json(data);
    } catch (e) {
      return errorResponse(e);
    }
  }
  return proxy(req, `/api/installations/${id}/runs`);
}

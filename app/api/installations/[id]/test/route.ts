import { NextRequest, NextResponse } from "next/server";
import { isMockEnabled, mockBackend } from "@/lib/mock-backend";
import { errorResponse, proxy } from "@/lib/proxy";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  if (isMockEnabled()) {
    try {
      const data = await mockBackend.fireTest(id);
      return NextResponse.json(data, { status: 202 });
    } catch (e) {
      return errorResponse(e);
    }
  }
  return proxy(req, `/api/installations/${id}/test`);
}

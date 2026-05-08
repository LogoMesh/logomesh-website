import { NextRequest, NextResponse } from "next/server";
import { isMockEnabled, mockBackend } from "@/lib/mock-backend";
import { errorResponse, proxy } from "@/lib/proxy";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  if (isMockEnabled()) {
    try {
      const data = await mockBackend.getInstallation(id);
      return NextResponse.json(data);
    } catch (e) {
      return errorResponse(e);
    }
  }
  return proxy(req, `/api/installations/${id}`);
}

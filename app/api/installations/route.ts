import { NextRequest, NextResponse } from "next/server";
import { isMockEnabled, mockBackend } from "@/lib/mock-backend";
import { errorResponse, proxy } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  if (isMockEnabled()) {
    try {
      const data = await mockBackend.createInstallation();
      return NextResponse.json(data, { status: 201 });
    } catch (e) {
      return errorResponse(e);
    }
  }
  return proxy(req, "/api/installations");
}

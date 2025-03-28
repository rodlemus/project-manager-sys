import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const body: { user_id: string } = await request.json();
  return NextResponse.json(body);
}

import { NextRequest, NextResponse } from "next/server";
import { getMessagesByProject } from "@/app/home/projects/queries/getMessages";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const { data, isSuccess, error } = await getMessagesByProject(projectId);

    if (!isSuccess) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Error en API getMessagesByProject:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

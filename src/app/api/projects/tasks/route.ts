import { NextResponse } from "next/server";
import { getTaskByProject } from "@/app/home/projects/queries/getTasksPerProyect";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
  }

  const { tasks, error } = await getTaskByProject(projectId);

  if (error) {
    return NextResponse.json({ error: "Error retrieving tasks" }, { status: 500 });
  }

  return NextResponse.json(tasks, { status: 200 });
}

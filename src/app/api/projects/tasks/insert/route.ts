import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabaseClient = await createClient();
    
    const { title, user_designated_for_id, project_id, status } = await req.json();

    if (!title || !user_designated_for_id || !project_id || !status) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const validStatuses = ["pendiente", "en progreso", "bloqueado", "en revision", "completado"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Estado inválido" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseClient
      .from("tasks")
      .insert([{ title, user_designated_for_id, project_id, status }])
      .select();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al insertar tarea", details: error },
      { status: 500 }
    );
  }
}

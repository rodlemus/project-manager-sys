import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUserDataWithId } from "@/app/actions/getUserData"; // Importamos la función

export async function POST(req: NextRequest) {
  try {
    const supabaseClient = await createClient();
    const body = await req.json();
    const { project_id, title, content, parent_id } = body;

    // Obtener el usuario autenticado
    const user = await getUserDataWithId();
    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    const creator_id = user.id;

    // Validar que todos los datos obligatorios estén presentes
    if (!project_id || !creator_id || !content) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    // Obtener el nombre del usuario (creator_id) de la tabla users_info
    const { data: userData, error: userError } = await supabaseClient
      .from("users_info")
      .select("name")
      .eq("id", creator_id)
      .single();

    if (userError) {
      return NextResponse.json(
        { error: "Error al obtener el nombre del usuario" },
        { status: 500 }
      );
    }

    // Insertar mensaje en la base de datos
    const { data, error } = await supabaseClient
      .from("project_messages")
      .insert([
        {
          project_id,
          creator_id,
          title: title?.trim() || null,
          content,
          parent_id: parent_id || null,
        },
      ])
      .select();

    console.log("📢 Respuesta de supabase: ", { data, error });

    if (error) throw error;

    // Devolver los datos del mensaje con el nombre del creador
    return NextResponse.json(
      {
        message: "Mensaje insertado correctamente",
        data: data.map((msg: any) => ({
          ...msg,
          creator_name: userData.name, // aqui agregamos el nombre de quien escribio el mensaje
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json(
      { error: "Error al insertar mensaje" },
      { status: 500 }
    );
  }
}

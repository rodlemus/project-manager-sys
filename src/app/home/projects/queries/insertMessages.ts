import { createClient } from "@/utils/supabase/server";
import { getUserDataWithId } from "@/app/actions/getUserData";

export const insertMessage = async (projectId: string, title: string, content: string, parentId: string | null = null) => {
  "use server";

  try {
    // Obtener información del usuario autenticado
    const userInfo = await getUserDataWithId();

    if (!userInfo) {
      return { success: false, error: "Usuario no autenticado" };
    }

    const supabase = await createClient();

    // Insertar el mensaje en la base de datos
    const { data, error } = await supabase.from("project_messages").insert([
      {
        project_id: projectId,
        creator_id: userInfo.id,
        title,
        content,
        parent_id: parentId,
      },
    ]).select();

    if (error) {
      console.error("❌ Error al insertar mensaje:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, message: "Mensaje insertado correctamente", data };
  } catch (error) {
    console.error("❌ Error en insertMessage:", error);
    return { success: false, error: "Error interno del servidor" };
  }
};

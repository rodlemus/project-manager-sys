// queries/deleteProjects.ts
import { createClient } from "@/utils/supabase/server";

// METODO PARA ELIMINAR UN PROYECTO
export const deleteProject = async (projectId: string): Promise<boolean> => {
  "use server";

  try {
    const supabaseClient = await createClient();

    // Eliminar el registro de proyecto en la base de datos
    const { error } = await supabaseClient
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      throw new Error(error.message);
    }

    return true; // Si la eliminación es exitosa
  } catch (error) {
    console.error(error);
    return false; // Si ocurrió un error
  }
};

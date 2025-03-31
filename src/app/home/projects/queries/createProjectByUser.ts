import { createClient } from "@/utils/supabase/server";
import { getUserDataWithId } from "@/app/actions/getUserData";

export interface CreateProjectResponse {
  error: string | null;
  isSuccess: boolean;
}

// Adaptamos la función para que acepte FormData
export const createProjectByUser = async (formData: FormData): Promise<CreateProjectResponse> => {
  "use server";

  try {
    const userInfo = await getUserDataWithId();
    if (!userInfo) {
      return { error: "Usuario no autenticado", isSuccess: false };
    }

    const supabaseClient = await createClient();

    // Extraemos el nombre del proyecto del FormData
    const projectName = formData.get("name_project") as string;

    // Validamos que el nombre del proyecto no esté vacío
    if (!projectName) {
      return { error: "El nombre del proyecto es obligatorio", isSuccess: false };
    }

    // Insertamos el nuevo proyecto
    const { data: project, error: projectError } = await supabaseClient
      .from("projects")
      .insert([{ name: projectName }])
      .select("id")
      .single(); // Obtenemos el id del nuevo proyecto

    if (projectError) {
      throw new Error(projectError.message);
    }

    // Ahora insertamos el usuario en project_users
    const { error: userError } = await supabaseClient
      .from("project_users")
      .insert([{ project_id: project.id, user_id: userInfo.id }]);

    if (userError) {
      throw new Error(userError.message);
    }

    return { isSuccess: true, error: null };
  } catch (error) {
    console.error(error);
    return {
      error: "Error al crear el proyecto",
      isSuccess: false,
    };
  }
};

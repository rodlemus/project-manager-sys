import { createClient } from "@/utils/supabase/server";
import { getUserDataWithId } from "@/app/actions/getUserData";

export interface UpdateProjectResponse {
  error: string | null;
  isSuccess: boolean;
}

export const updateProjectByUser = async (
  projectId: string, 
  formData: FormData
): Promise<UpdateProjectResponse> => {
  "use server";

  try {
    const userInfo = await getUserDataWithId();
    if (!userInfo) {
      return { error: "Usuario no autenticado", isSuccess: false };
    }

    const projectName = formData.get("name_project") as string;

    const supabaseClient = await createClient();

    // Actualizamos el proyecto
    const { error: projectError } = await supabaseClient
      .from("projects")
      .update({ name: projectName })
      .eq("id", projectId);

    if (projectError) {
      throw new Error(projectError.message);
    }

    return { isSuccess: true, error: null };
  } catch (error) {
    console.error(error);
    return {
      error: "Error al actualizar el proyecto",
      isSuccess: false,
    };
  }
};

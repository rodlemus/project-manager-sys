import { createClient } from "@/utils/supabase/server";
import { getUserDataWithId } from "@/app/actions/getUserData";

export const deleteProjectByUser = async (projectId: string): Promise<boolean> => {
  "use server";

  try {
    const userInfo = await getUserDataWithId();
    if (!userInfo) {
      return false;
    }

    const supabaseClient = await createClient();

    // Iniciar transacción
    const { error: userProjectError } = await supabaseClient
      .from("project_users")
      .delete()
      .eq("project_id", projectId);

    if (userProjectError) {
      throw new Error(userProjectError.message);
    }

    const { error: projectError } = await supabaseClient
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (projectError) {
      throw new Error(projectError.message);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

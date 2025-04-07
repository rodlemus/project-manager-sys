import { createClient } from "@/utils/supabase/server";
import { getUserDataWithId } from "@/app/actions/getUserData";

// Función para obtener los proyectos del usuario
export const getProjects = async () => {
  "use server";

  try {
    const userInfo = await getUserDataWithId();
    console.log("🔍 Usuario autenticado:", userInfo);

    const supabaseClient = await createClient();

    if (!userInfo) {
      return { data: [], isSuccess: false, error: "Usuario no autenticado" };
    }

    if (userInfo.roleName === "ADMIN") {
      const { data: projects, error } = await supabaseClient
        .from("projects")
        .select("id, name, created_at");

      if (error) throw new Error(error.message);

      return { data: projects, isSuccess: true };
    }

    // Si no es ADMIN, buscar proyectos en los que está involucrado
    const { data: projectUsers, error: projectUserError } = await supabaseClient
      .from("project_users")
      .select("project_id")
      .eq("user_id", userInfo.id);

    console.log("🔗 Proyectos asignados:", projectUsers);

    if (projectUserError) {
      console.error(
        "❌ Error al obtener project_users:",
        projectUserError.message
      );
    }

    if (!projectUsers?.length) return { data: [], isSuccess: true };

    const projectIds = projectUsers.map(
      (projectUser) => projectUser.project_id
    );
    console.log("📌 IDs de proyectos:", projectIds);

    const { data: projects, error: fetchError } = await supabaseClient
      .from("projects")
      .select("id, name")
      .in("id", projectIds);

    console.log("📁 Proyectos obtenidos:", projects);

    if (fetchError) throw new Error(fetchError.message);

    return { data: projects, isSuccess: true };
  } catch (error) {
    console.error("❌ Error en getProjects:", error);
    return {
      data: [],
      error: "Error al obtener los proyectos",
      isSuccess: false,
    };
  }
};

// Definimos una interfaz que nos ayude a definir los valores de userInfo
interface UserInfo {
  id: string,
  name: string,
  roleName: string
}

// Funcion para obtener la informacion del usuario activo
export const getUserData = async () => {
  try {
    const userInfo = await getUserDataWithId();
    if (!userInfo) {
      return { userInfo: null, isSuccess: false };
    }

    return { userInfo: userInfo as UserInfo, isSuccess: true }; // Asignamos el tipo explícitamente
  } catch (error) {
    console.error("❌ Error al obtener los datos del usuario:", error);
    return { userInfo: null, isSuccess: false };
  }
};

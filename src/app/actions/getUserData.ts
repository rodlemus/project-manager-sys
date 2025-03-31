import { createClient } from "@/utils/supabase/server";

export const getUserData = async () => {
  const supabaseClient = await createClient();
  const userGetData = await supabaseClient.auth.getUser();
  if (!userGetData.data.user) {
    return null;
  }
  // obtenemos el role_id del usuario
  const userRole = await supabaseClient
    .from("users_info")
    .select("id, name, state, role:user_roles!user_id(id,user_id, role_id)")
    .eq("id", userGetData.data.user.id)
    .limit(1);
  if (userRole.data !== null && userRole.data.length > 0) {
    const userData = userRole.data[0];
    const roleName = await supabaseClient
      .from("roles")
      .select("name")
      .eq("id", userData.role[0].role_id);

    // con el role_id obtenemos el name del rol
    if (roleName.data !== null && roleName.data.length > 0) {
      const user = {
        name: userData.name,
        roleName: roleName.data[0].name,
      };
      return user;
    }
  }
  return null;
};

export const getUserDataWithId = async () => {
  const supabaseClient = await createClient();
  const userGetData = await supabaseClient.auth.getUser();
  if (!userGetData.data.user) {
    return null;
  }

  // obtenemos el role_id y id del usuario
  const userRole = await supabaseClient
    .from("users_info")
    .select("id, name, state, role:user_roles!user_id(id,user_id, role_id)")
    .eq("id", userGetData.data.user.id)
    .limit(1);

  if (userRole.data !== null && userRole.data.length > 0) {
    const userData = userRole.data[0];
    console.log(userData)
    const roleName = await supabaseClient
      .from("roles")
      .select("name")
      .eq("id", userData.role[0].role_id);

    // Verificamos si roleName está disponible antes de usarlo
    if (roleName.data !== null && roleName.data.length > 0) {
      const user = {
        id: userData.id ?? "",  // Incluimos el id del usuario
        name: userData.name,
        roleName: roleName.data[0].name || "",  // Asignamos una cadena vacía si roleName es undefined
      };
      return user;
    }
  }
  return null;
};

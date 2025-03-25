import { createClient } from "@/utils/supabase/server";

export const getUsersAdmin = async () => {
  const supabase = await createClient();
  const userAuth = await supabase.auth.getUser();
  if (userAuth.data.user) {
    const { data, error } = await supabase
      .from("users_info")
      .select(
        "id, name, state, role:user_roles!user_id(id,user_id, name:roles!role_id(id,name))"
      )
      .neq("id", userAuth.data.user.id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } else {
    throw new Error("No se ha podido obtener la información del usuario");
  }
};

export const getRoleByUserId = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users_info")
    .select(
      "id, name, state, user_roles:user_roles!user_id(id,user_id, role:roles!role_id(id,name))"
    )
    .eq("id", id);
  
    if (data) {
      return data[0].user_roles[0].role.name
    }
  
  return null;
};

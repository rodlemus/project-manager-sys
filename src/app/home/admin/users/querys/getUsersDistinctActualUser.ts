import { createClient } from "@/utils/supabase/server";

export interface UsersTableData {
  id:string;
  name:string;
  state: boolean;
  role: {
      id:string;
      user_id:string;
      name:{
          id:string;
          name:string;
      }
  }[]
}
// solicita los usuarios distintintos del usuario actual
// son los usuarios que aparecen en la tabla del modulo /admin/users
export const getUsersDistinctActualUser = async ():Promise<UsersTableData[]> => {
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


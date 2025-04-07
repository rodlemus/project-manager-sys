import { createClient } from "@/utils/supabase/client";

export interface UsersTableData {
  id: string;
  username: string;
  state: boolean;
  role:string;
}
// solicita los usuarios distintintos del usuario actual
// son los usuarios que aparecen en la tabla del modulo /admin/users
export const getUsersDistinctActualUser = async (): Promise<
  UsersTableData[]
> => {
  const supabase = await createClient();
  const userAuth = await supabase.auth.getUser();
  if (userAuth.data.user) {
    const { data, error } =  await supabase.rpc("admin_get_users");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } else {
    throw new Error("No se ha podido obtener la información del usuario");
  }
};

import { createClient } from "@/utils/supabase/server";

//retorna el name del role del usuario segun su ID
export const getRoleNameByUserId = async (id: string) => {
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
  
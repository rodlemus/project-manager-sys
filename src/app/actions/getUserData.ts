import { createClient } from "@/utils/supabase/server";

export const getUserData = async () =>{
    "use server"
    const supabaseClient = await createClient();
    await supabaseClient.auth.getUser();
    
    // obtenemos el role_id del usuario
    const userRole = await supabaseClient.from("users_info").select("id, name, state, role:user_roles!user_id(id,user_id, role_id)").limit(1)
    if (userRole.data !== null && userRole.data.length > 0) {
        const userData = userRole.data[0]
        const roleName = await supabaseClient.from("roles").select("name").eq("id",userData.role[0].role_id)
        
        // con el role_id obtenemos el name del rol
        if (roleName.data !== null  && roleName.data.length >0) {
            const user = {
                name: userData.name,
                roleName: roleName.data[0].name
            }
            return user
        }
    }
    return null
}
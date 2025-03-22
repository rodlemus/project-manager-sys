import { createClient } from "@/utils/supabase/server";

export const useUserPermissions = async () =>{
    const supabaseClient = await createClient();
    const user = await supabaseClient.auth.getUser();
    if (user.error) {
        console.log("ERROR GET USER AUTH")
    }

    const response = await supabaseClient.from('users_info')
    .select('id, user:user_roles!user_id( user_role_permissions(permission_id), user_id, role_id)')
    if (response.error) {
        console.error('Error obteniendo usuarios:', response.error);
        return;
      }
      
      // Extraer todos los permission_id únicos
      const permissionIds = response.data.flatMap(user =>
        user.user.flatMap(role => 
          role.user_role_permissions.map(p => p.permission_id)
        )
      );

      
      if (permissionIds.length === 0) {
        console.log('No hay permisos asociados.');
        return;
      }
      
      const { data: permissions, error: permissionsError } = await supabaseClient
        .from('permissions')
        .select()
        .in('id', permissionIds);  
      
      if (permissionsError) {
        console.error('Error obteniendo permisos:', permissionsError);
        return;
      }
    const permissionsName = permissions.map((permission) => permission.name);
    return permissionsName
}
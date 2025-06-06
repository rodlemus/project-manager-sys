import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// en donde se quiera implementar se le pasaran los permisos requeridos
// y se obtendran los permisos del usuario
// asi al modificar los permisos desde la base de datos, se reflejaran en la aplicacion
export const useUserPermissions = async (
  requiredPermission: string
): Promise<boolean> => {
  const supabaseClient = await createClient();

  // obtenemos todos los ids de los permisos que tiene el usuario
  // se hace un innner join, iniciadno desde la tabla users_info, luego se hace un join con la tabla user_roles
  // y luego con la tabla user_role_permissions
  const response = await supabaseClient
    .from("users_info")
    .select(
      "id, role_id:user_roles!user_id( user_role_permissions(permission_id), user_id, role_id)"
    );

  if (response.error) {
    console.error("Error obteniendo usuarios:", response.error);
    supabaseClient.auth.signOut();
    redirect("/auth/signin");
  }

  // Extraer todos los permission_id
  const permissionIds = response.data.flatMap((data) =>
    data.role_id.flatMap((role) =>
      role.user_role_permissions.map((p) => p.permission_id)
    )
  );

  //no hay permisos asignados
  if (permissionIds.length === 0) {
    return false;
  }

  const { data: permissions, error: permissionsError } = await supabaseClient
    .from("permissions")
    .select()
    .in("id", permissionIds);

  if (permissionsError) {
    console.error("Error obteniendo permisos:", permissionsError);
    return false;
  }
  const permissionsName = permissions.map((permission) => permission.name);
  const userHavePermission = permissionsName.includes(requiredPermission);
  return userHavePermission;
};

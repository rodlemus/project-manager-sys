import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const getUserPermissions = async (userId: string) => {
  const supbaseClient = await createClient();

  return useQuery({
    queryKey: ["getUserPermissions"],
    queryFn: async () => {
      const { data, error } = await supbaseClient.rpc(
        "admin_get_user_permissions",
        {
          a_user_id: userId,
        }
      );
      if (error) {
        return [];
      }
      return data;
    },
  });
};

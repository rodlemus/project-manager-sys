"use client";

import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const PermissionInputCheckBox = ({
  userId,
  permissionId,
  initialState,
}: {
  initialState: boolean;
  userId: string;
  permissionId: string;
}) => {
  const queryClient = useQueryClient();
  const [isSelected, setIsSelected] = useState(initialState);
  const mutation = useMutation({
    mutationFn: async () => {
      const supabaseClient = await createClient();
      // el checboxk esta vacio y es llenado
      if (isSelected) {
        const { data, error } = await supabaseClient.rpc(
          "admin_add_permission",
          {
            a_user_id: userId,
            a_permission_id: permissionId,
          }
        );

        if (error) {
          return null;
        }
        console.log(data,error)
        return data;
      }
      
      // de uno llenado a vacio
      const { data, error } = await supabaseClient.rpc(
        "admin_remove_permission",
        {
          a_user_id: userId,
          a_permission_id: permissionId,
        }
      );

      if (error) {
        return null;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return (
    <input
      type="checkbox"
      checked={isSelected}
      onChange={(e) => {
        mutation.mutate();
        setIsSelected((prev) => !prev);
      }}
      className="w-5 h-5 accent-blue-500 cursor-pointer"
    />
  );
};

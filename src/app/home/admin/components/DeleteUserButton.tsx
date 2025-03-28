"use client";
import CustomButton from "@/custom-components/Button/CustomButton";
import { useDeleteUserById } from "../users/querys/deleteUserById";
import { useMutation } from "@tanstack/react-query";

export const DeleteUserButton =   ({ user_id }: { user_id: string }) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await fetch("/home/admin/users/delete", {
        method: "DELETE",
        body: JSON.stringify({
          user_id,
        }),
      });
      return await result.json();
    },
  })
  
  return (
    <CustomButton
      onClick={()=>{
        mutation.mutate();
      }}
      text="Eliminar"
      type="button"
      width="w-full"
      className="bg-red-600 hover:bg-red-500/90 transition duration-300 p-2 rounded cursor-pointer"
    />
  );
};

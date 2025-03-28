import { useQuery } from "@tanstack/react-query";

export const useDeleteUserById = (user_id: string) => {
  return useQuery({
    queryKey: ["deleteUserId"],
    queryFn: async () => {
      const result = await fetch("/home/admin/users/delete", {
        method: "DELETE",
        body: JSON.stringify({
          user_id,
        }),
      });
      return await result.json();
    },
  });
};

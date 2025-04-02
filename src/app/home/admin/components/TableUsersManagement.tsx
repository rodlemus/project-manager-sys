"use client";
import { useQuery } from "@tanstack/react-query";
import { ChangeUserStateButton } from "./ChangeUserStateButton";
import {
  getUsersDistinctActualUser,
  UsersTableData,
} from "../users/querys/getUsersDistinctActualUser";
import { EditPermissionsButton } from "./EditPermissionsButton";

export const TableUsersManagement = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsersDistinctActualUser();
    },
  });
  return (
    <table className="w-full">
      <thead className="text-black">
        <tr>
          {/* <th>ID</th> */}
          <th>Nombre</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((user) => {
            return (
              <tr key={user.id} className="border-b border-gray-400 pb-1">
                {/* <td className="text-center capitalize text-black">
              {user.id}
            </td> */}
                <td className="text-center capitalize text-black">
                  {user.username}
                </td>
                <td className="text-center capitalize text-black">
                  {user.role}
                </td>
                <td className="text-center capitalize text-black">
                  {user.state ? "ACTIVE" : "INACTIVE"}
                </td>
                <td className="w-full flex justify-center gap-2 py-2">
                  <EditPermissionsButton
                    userId={user.id}
                    name={user.username}
                  />
                  <ChangeUserStateButton
                    user_id={user.id}
                    state={!user.state}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

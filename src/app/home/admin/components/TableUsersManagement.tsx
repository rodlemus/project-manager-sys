"use client"
import { useQuery } from "@tanstack/react-query";
import { DeleteUserButton } from "./DeleteUserButton";
import { getUsersDistinctActualUser, UsersTableData } from "../users/querys/getUsersDistinctActualUser";


export const TableUsersManagement = () =>{
    const {data} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          return await getUsersDistinctActualUser()
        },
    }) 
    return <table className="w-full">
    <thead className="text-black">
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Rol</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {data && data.map((user) => {
        return (
          <tr key={user.id} className="border-b border-gray-400 pb-1">
            <td className="text-center capitalize text-black">
              {user.id}
            </td>
            <td className="text-center capitalize text-black">
              {user.name}
            </td>
            <td className="text-center capitalize text-black">
              {user.role[0].name.name}
            </td>
            <td className="text-center capitalize text-black">
              {user.state ? "ACTIVE" : "INACTIVE"}
            </td>
            <td className="w-full flex justify-center gap-2 py-2">
              <button className="bg-blue-600 hover:bg-blue-500/90 transition duration-300 p-2 rounded cursor-pointer">
                Editar
              </button>

              <DeleteUserButton user_id={user.id}/>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
}
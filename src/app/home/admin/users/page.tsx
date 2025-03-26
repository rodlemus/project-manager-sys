import CustomLabelInput from "@/custom-components/CustomLabelInput/CustomLabelInput";
import { getUsersAdmin } from "./actions/getUsers";
import CustomModalWithButton from "../../../../custom-components/modal-button/CustomModalWithButton";
import { adminCreateNewUser } from "./actions/createNewUser";
import CustomButton from "@/custom-components/Button/CustomButton";

export default async function UsersPage() {
  const users = await getUsersAdmin();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">Usuarios</h2>
      <p className="text-gray-600 mt-2">
        Aquí puedes gestionar toda la información de los usuarios.
      </p>
      <div className="w-full pt-2 flex flex-row-reverse">
        <CustomModalWithButton showAcceptButton={false}>
          <form
            action={async (event) => {
              "use server";
              adminCreateNewUser(event);
            }}
            className="flex flex-col items-center justify-items-center space-y-2"
          >
            <CustomLabelInput
              label="Nombre: "
              type="text"
              placeholder=""
              name="name"
            />
            <CustomLabelInput
              label="Correo: "
              type="email"
              placeholder=""
              name="email"
            />
            <CustomLabelInput
              label="Contraseña: "
              type="password"
              placeholder=""
              name="password"
            />
            <CustomButton text="Crear Usuario" type="submit" width="w-1/2" />
          </form>
        </CustomModalWithButton>
      </div>
      <div className="mt-4">
        <table className="w-full">
          <thead className="text-black">
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} className="border-b border-gray-400 pb-1">
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
                    <button className="bg-blue-500 p-2 rounded">Editar</button>
                    <button className="bg-red-500 p-2 rounded">Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import CustomLabelInput from "@/custom-components/CustomLabelInput/CustomLabelInput";
import CustomModalForm from "../../../../custom-components/modal-button/CustomModalWithButton";
import { adminCreateNewUser } from "./querys/createNewUser";

import { redirect } from "next/navigation";
import { TableUsersManagement } from "../components/TableUsersManagement";

export default async function UsersPage() {
  const actionNewUser = async (formdata: FormData) => {
    "use server";
    const result = await adminCreateNewUser(formdata);
    redirect("/home/admin/users");
  };

  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">Usuarios</h2>
      <p className="text-gray-600 mt-2">
        Aquí puedes gestionar toda la información de los usuarios.
      </p>
      <div className="w-full pt-2 flex flex-row-reverse">
        <CustomModalForm
          showAcceptButton={false}
          action={actionNewUser}
          textSubmitButton="Guardar"
          textOpenModalButton="Crear Usuario +"
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
        </CustomModalForm>
      </div>
      <div className="mt-4">
        <TableUsersManagement />
      </div>
    </div>
  );
}

import { getUsersAdmin } from "./users/actions/getUsers";
import ValidAdminRole from "./validAdminRole";

export default async function AdminHome() {
  const userData = await getUsersAdmin();
  console.log(userData[0].role[0].name.name);
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">
        Bienvenido al Dashboard - Admin
      </h2>
      <p className="text-gray-600 mt-2">
        Aquí puedes gestionar toda la información.
      </p>
    </div>
  );
}

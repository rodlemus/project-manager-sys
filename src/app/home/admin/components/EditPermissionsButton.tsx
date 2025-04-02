"use client";
import CustomButton from "@/custom-components/Button/CustomButton";
import CustomModal from "@/custom-components/Modal/CustomModal";
import { useModal } from "@/custom-components/Modal/ModalContext";
import { PermissionInputCheckBox } from "@/custom-components/PermissionInputCheckBox/PermissionInputCheckBox";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const EditPermissionsButton = ({ userId }: { userId: string }) => {
  const { closeModal, openModal, isOpen } = useModal();

  const { data } = useQuery({
    queryKey: ["getUserPermissions"],
    queryFn: async () => {
      const supbaseClient = await createClient();
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

  return (
    <>
      <CustomButton
        onClick={() => {
          openModal();
        }}
        text={"Editar permisos"}
        type="button"
        width="w-full"
        className="transition duration-300 p-2 rounded cursor-pointer bg-blue-600 hover:bg-blue-500/90"
      />
      <CustomModal
        showAcceptButton={false}
        title=""
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Permisos del Usuario
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-2 border border-gray-300 text-left">
                  Permiso
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  Seleccionado
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(({ id, permission, selected }) => (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="p-2 border border-gray-300 text-gray-700">
                      {permission}
                    </td>
                    <td className="p-2 border border-gray-300 text-gray-700 text-center">
                      <PermissionInputCheckBox
                        initialState={selected}
                        userId={userId}
                        permissionId={id}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CustomModal>
    </>
  );
};

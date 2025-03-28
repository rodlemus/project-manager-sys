"use client";
import CustomButton from "@/custom-components/Button/CustomButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomModal from "@/custom-components/Modal/CustomModal";
import { useModal } from "@/custom-components/Modal/ModalContext";

export const DeleteUserButton = ({ user_id }: { user_id: string }) => {
  const queryClient = useQueryClient();
  const { closeModal, openModal, isOpen } = useModal();
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <>
      <CustomButton
        onClick={async () => {
          const result = await mutation.mutateAsync();
          console.log(mutation.error, mutation.data, result);
          if (mutation.isSuccess) {
            openModal();
          }
        }}
        text="Inhabilitar"
        type="button"
        width="w-full"
        className="bg-red-600 hover:bg-red-500/90 transition duration-300 p-2 rounded cursor-pointer"
      />
      <CustomModal
        showAcceptButton={false}
        title=""
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <h1 className="text-black font-semibold text-2xl text-center">
          Usuario dado de BAJA con exito
        </h1>
      </CustomModal>
    </>
  );
};

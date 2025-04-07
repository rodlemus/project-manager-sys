"use client";
import CustomButton from "@/custom-components/Button/CustomButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomModal from "@/custom-components/Modal/CustomModal";
import { useModal } from "@/custom-components/Modal/ModalContext";
import { useEffect } from "react";

export const ChangeUserStateButton = ({
  user_id,
  state,
}: {
  user_id: string;
  state: boolean;
}) => {
  const queryClient = useQueryClient();
  const { closeModal, openModal, isOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
        const result = await fetch("/home/admin/users/update-state", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
            state,
          }),
        });
        return await result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  useEffect(() =>{
    if(mutation.isSuccess){
      openModal()
    }
  }, [mutation.isSuccess])

  return (
    <>
      <CustomButton
        onClick={() => {
          mutation.mutate()
        }}
        text={state ? "Dar de alta" : "Dar de baja"}
        type="button"
        width="w-full"
        className={
          "transition duration-300 p-2 rounded cursor-pointer " +
          (state
            ? "bg-green-600 hover:bg-green-500/90"
            : "bg-red-600 hover:bg-red-500/90")
        }
      />
      <CustomModal
        showAcceptButton={false}
        title=""
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <h1 className="text-black font-semibold text-2xl text-center">
          Usuario dado de {!state ? "ALTA" : "BAJA"} con éxito.
        </h1>
      </CustomModal>
    </>
  );
};

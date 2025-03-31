"use client";
import CustomButton from "@/custom-components/Button/CustomButton";
import CustomModal from "@/custom-components/Modal/CustomModal";
import { useModal } from "@/custom-components/Modal/ModalContext";
import { ReactNode, useState } from "react";

//Este componente ya incorpora el modal junto con el boton que lo activa, se le puede pasar cualquier input
// es una combinacion de CustomModal y CustomButton para facilitar la creacion de modales con un boton que lo dispara
export default function CustomModalForm({
  children,
  acceptFn,
  showAcceptButton = true,
  action,
  textSubmitButton,
  textOpenModalButton,
}: {
  children: ReactNode; // childrens donde pasamos los inputs que queramos en nuestro formulario
  acceptFn?: any; // hadnle que es llamado en el boton aceptar del custom modal
  textSubmitButton: string; //texto para el botn submit del formulario,
  textOpenModalButton: string;
  showAcceptButton?: boolean; // asi no renderizamos el boton aceptar para no ser redundante
  action?: string | undefined | ((formData: FormData) => void | Promise<void>); // se saca el tipado de la documentacionde nextJS
}) {
  const { closeModal, openModal, isOpen } = useModal(); // se extraen las funciones del modal context

  return (
    <>
      <CustomModal
        title="Crear Usuario"
        acceptTextButton="Aceptar"
        acceptHandler={() => {
          // verifica que sino se pasa una funcion para aceptar, no se ejecute nada
          if (acceptFn) {
            acceptFn();
          }
        }}
        showAcceptButton={showAcceptButton}
        isOpen={isOpen} // se le pasa el estado del modal
        closeModal={closeModal} // se le pasa la funcion para cerrar el modal
      >
        <form
          action={action}
          className="flex flex-col items-center justify-items-center space-y-2"
        >
          {children}
          <CustomButton
            onClick={closeModal}
            width="w-62"
            type="submit"
            text={textSubmitButton}
            className="font-semibold bg-green-700 hover:bg-green-600 transition duration-300"
          ></CustomButton>
        </form>
      </CustomModal>
      <CustomButton
        onClick={openModal}
        width="w-62"
        type="button"
        text={textOpenModalButton}
        className="font-semibold bg-green-700 hover:bg-green-600 transition duration-300"
      ></CustomButton>
    </>
  );
}

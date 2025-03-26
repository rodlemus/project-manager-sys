"use client";
import CustomButton from "@/custom-components/Button/CustomButton";
import CustomLabelInput from "@/custom-components/CustomLabelInput/CustomLabelInput";
import CustomModal from "@/custom-components/Modal/CustomModal";
import { useModal } from "@/custom-components/Modal/ModalContext";
import { ReactNode } from "react";

//Este componente ya incorpora el modal junto con el boton que lo activa, se le puede pasar cualquier estructura
//de html formulario, divs, etc.
// es una combinacion de CustomModal y CustomButton para facilitar la creacion de modales con un boton que lo dispara
export default function CustomModalWithButton({
  children,
  acceptFn,
  showAcceptButton = true,
}: {
  children: ReactNode;
  acceptFn?: any;
  showAcceptButton?: boolean;
}) {
  const { openModal } = useModal();

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
      >
        {children}
      </CustomModal>
      <CustomButton
        onClick={openModal}
        width="w-62"
        type="button"
        text="Crear Usuario +"
        className="font-semibold bg-green-700 hover:bg-green-600 transition duration-300"
      ></CustomButton>
    </>
  );
}

"use client"
import CustomButton from "@/custom-components/Button/CustomButton";
import CustomLabelInput from "@/custom-components/CustomLabelInput/CustomLabelInput";
import CustomModal from "@/custom-components/Modal/CustomModal";
import { useModal } from "@/custom-components/Modal/ModalContext";

export default function CreateUserButton() {
    const {openModal} = useModal()
    const acceptFn =  () =>{
        alert("Hola mundo")
      }
    return (
        <>
        <CustomModal title="Crear Usuario" acceptTextButton="Aceptar" acceptHandler={acceptFn}>
              <div>
                <CustomLabelInput label="Nombre: " type="text" placeholder="" name="name"/>
              </div>
            </CustomModal>
        <CustomButton onClick={openModal} width="w-62" type="button" text="Crear Usuario +" className="font-semibold bg-green-700 hover:bg-green-600 transition duration-300"></CustomButton>
        </>
    )
}
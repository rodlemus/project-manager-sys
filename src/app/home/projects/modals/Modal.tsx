"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  createProject: (
    formData: FormData
  ) => Promise<{ isSuccess: boolean; error: string | null }>;
}

const Modal: React.FC<ModalProps> = ({ createProject }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Esta función se encarga de restablecer el valor del input
  const resetForm = () => {
    const inputField = document.querySelector<HTMLInputElement>(
      'input[name="name_project"]'
    );
    if (inputField) {
      inputField.value = ""; // Aqui limpiamos el input, para que no aparezca el nombre del proyecto anterior
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);

    const result = await createProject(formData);

    if (!result.isSuccess) {
      console.error(result.error);
      return;
    }

    // Cerrar modal y refrescar la tabla
    document.getElementById("agregarModal")?.classList.add("hidden");
    router.refresh();
    location.reload();
  };

  // Restablecer el formulario cuando el modal se muestra
  useEffect(() => {
    const modal = document.getElementById("agregarModal");
    if (modal) {
      const observer = new MutationObserver(() => {
        if (!modal.classList.contains("hidden")) {
          resetForm();
        }
      });

      observer.observe(modal, { attributes: true });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      id="agregarModal"
      className="fixed hidden inset-0 flex items-center justify-center z-50 bg-gray-900/40 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            Crear Nuevo Proyecto
          </h3>
          <button
            id="closeModal"
            className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 transition-all duration-300"
            onClick={() =>
              document.getElementById("agregarModal")?.classList.add("hidden")
            }
            aria-label="Cerrar"
          >
            ✖
          </button>
        </div>

        {/* Modal Body */}
        <form ref={formRef} onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex flex-col gap-2 justify-between items-start">
            <label className="block text-md font-medium text-gray-800">
              Nombre del proyecto
            </label>
            <input
              type="text"
              name="name_project"
              className="text-gray-800 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none md:text-sm"
              placeholder="Ejemplo: Sistema de Inventario"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-medium"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

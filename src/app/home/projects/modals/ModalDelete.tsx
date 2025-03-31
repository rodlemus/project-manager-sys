"use client"

import { useRouter } from "next/navigation";

interface ModalDeleteProps {
  deleteProject: (projectId: string) => Promise<boolean>;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ deleteProject }) => {
  const router = useRouter();
    
  const handleDelete = async () => {
    const projectId =
      document.getElementById("deleteModal")?.getAttribute("data-id") || "";
  
    if (projectId === "") {
      alert("No se ha seleccionado un proyecto para eliminar.");
      return;
    }
  
    const result = await deleteProject(projectId);
  
    if (result) {
      document.getElementById("deleteModal")?.classList.add("hidden");
      router.refresh();
    }
  };

  return (
    <div
      id="deleteModal"
      className="hidden fixed inset-0 flex items-center justify-center z-50 bg-gray-900/40 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            Eliminar Proyecto
          </h3>
          <button
            id="closeModal"
            className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 transition-all duration-300"
            onClick={() =>
              document.getElementById("deleteModal")?.classList.add("hidden")
            }
            aria-label="Cerrar"
          >
            ✖
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-5 text-sm text-gray-700">
          ¿Estás seguro de que quieres eliminar este proyecto?
        </div>

        <div className="mt-5 flex justify-evenly">
          <button
            onClick={() =>
              document.getElementById("deleteModal")?.classList.add("hidden")
            }
            className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:cursor-pointer hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-lg hover:cursor-pointer hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;

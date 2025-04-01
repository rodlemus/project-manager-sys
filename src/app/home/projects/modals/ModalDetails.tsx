"use client";

import { useEffect, useState } from "react";

interface ModalDetailsProps {
  projectId: string;
  closeModal: () => void;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({ projectId, closeModal }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simula la obtención de tareas (debes reemplazar esto con la llamada real a tu API)
        const response = await fetch(`/api/projects/tasks?projectId=${projectId}`);
        const data = await response.json();
        setTasks(data || []);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Tareas del Proyecto</h2>
        {loading ? (
          <p className="text-gray-800 my-2.5">Cargando...</p>
        ) : tasks.length > 0 ? (
          <ul className="list-disc pl-5">
            {tasks.map((task) => (
              <>
                <div className="bg-blue-400 w-full flex flex-col gap-2 rounded-lg mt-2">
                  <h3 key={task.id} className="text-gray-200 font-semibold bg-slate-600 p-2 rounded-t-lg">{task.title}</h3>
                  <span className="text-right font-semibold p-3">{task.status}</span>
                </div>
              </>
            ))}
          </ul>
        ) : (
          <div className="flex justify-between items-center mt-3 mb-5">
            <p className="text-gray-800">Este proyecto no tiene tareas aún.</p>
            <button className="bg-indigo-500 p-2 text-white text-md rounded-lg hover:bg-indigo-400 hover:cursor-pointer">Agregar tarea</button>
          </div>
        )}
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalDetails;

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
        const response = await fetch(`/api/tasks?projectId=${projectId}`);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Tareas del Proyecto</h2>
        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : tasks.length > 0 ? (
          <ul className="list-disc pl-5">
            {tasks.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Este proyecto no tiene tareas aún.</p>
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

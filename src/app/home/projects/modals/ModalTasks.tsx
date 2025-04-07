"use client";

import { useState } from "react";

interface TaskModalProps {
  projectId: string;
  isOpen: boolean;
  closeModal: () => void;
  onTaskAdded: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ projectId, isOpen, closeModal, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [userDesignatedForId, setUserDesignatedForId] = useState("");
  const [status, setStatus] = useState("pendiente");
  const [loading, setLoading] = useState(false);
  const statusOptions = ["pendiente", "en progreso", "bloqueado", "en revision", "completado"];

  const handleSubmit = async () => {
    if (!title || !userDesignatedForId) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/projects/tasks/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, user_designated_for_id: userDesignatedForId, project_id: projectId, status }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la tarea.");
      }

      setTitle("");
      setUserDesignatedForId("");
      setStatus("pendiente");
      onTaskAdded(); // Actualizar las tareas cuando se agregue una nueva
      closeModal(); // Cerrar el modal
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Agregar Nueva Tarea</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg text-sm text-indigo-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Asignar a (ID del usuario)</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg text-sm text-indigo-900"
          value={userDesignatedForId}
          onChange={(e) => setUserDesignatedForId(e.target.value)}
        />

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Estado</label>
        <select
          className="w-full p-2 border rounded-lg text-sm text-indigo-900"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={closeModal} className="bg-gray-400 px-4 py-2 rounded-lg text-white hover:bg-gray-500">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="bg-indigo-500 px-4 py-2 rounded-lg text-white hover:bg-indigo-400" disabled={loading}>
            {loading ? "Guardando..." : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default TaskModal;

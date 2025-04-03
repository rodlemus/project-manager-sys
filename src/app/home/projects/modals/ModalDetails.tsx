"use client";

import { useEffect, useState } from "react";

interface ModalDetailsProps {
  projectId: string;
  closeModal: () => void;
}

interface Message {
  id: string;
  title: string;
  content: string;
  creator_id: string;
  parent_id: string | null;
  created_at: string;
  replies: Message[]; // para las respuestas anidadas
}

const ModalDetails: React.FC<ModalDetailsProps> = ({
  projectId,
  closeModal,
}) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simula la obtención de tareas (debes reemplazar esto con la llamada real a tu API)
        const response = await fetch(
          `/api/projects/tasks?projectId=${projectId}`
        );
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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `/api/projects/messages?projectId=${projectId}`
        );
        const data = await response.json();

        setMessages(data || []);
      } catch (error) {
        console.error("Error al obtener mensajes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [projectId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-9/12">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Tareas del Proyecto
        </h2>
        {loading ? (
          <p className="text-gray-800 my-2.5">Cargando...</p>
        ) : tasks.length > 0 ? (
          <div className="flex flex-row justify-between items-start gap-3.5 w-full">
            {/* Sección de tareas */}
            <ul className="flex flex-col w-1/2">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  className="bg-indigo-300 w-full flex flex-col gap-2 rounded-lg mt-2.5 hover:opacity-92 hover:cursor-pointer"
                >
                  <h3 className="text-gray-200 font-semibold bg-indigo-800 p-2 rounded-t-lg text-left">
                    {task.title}
                  </h3>
                  <span className="text-right font-semibold p-3 text-indigo-950">
                    {task.status}
                  </span>
                </button>
              ))}
            </ul>

            {/* Sección de mensajes */}
            <div className="w-1/2 flex flex-col gap-4">
              {loading ? (
                <p className="text-gray-800 my-2.5">Cargando...</p>
              ) : messages.length > 0 ? (
                <ul className="space-y-4">
                  {messages.map((message) => (
                    <li
                      key={message.id}
                      className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                    >
                      <h3 className="text-lg font-semibold text-indigo-800">
                        {message.title}
                      </h3>
                      <p className="text-gray-700 mt-2">{message.content}</p>
                      <div className="text-right text-sm text-gray-500 mt-2">
                        {new Date(message.created_at).toLocaleDateString()}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-800 text-center">
                  Este proyecto no tiene mensajes aún.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-3 mb-5">
            <p className="text-gray-800">Este proyecto no tiene tareas aún.</p>
            <button className="bg-indigo-500 p-2 text-white text-md rounded-lg hover:bg-indigo-400 hover:cursor-pointer">
              Agregar tarea
            </button>
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

// Componente para mostrar un mensaje con sus respuestas anidadas
const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <li className="border p-4 rounded-lg">
      <h3 className="font-semibold">{message.title}</h3>
      <p>{message.content}</p>
      {message.replies.length > 0 && (
        <ul className="ml-6 mt-2 border-l-2 border-gray-300 pl-3">
          {message.replies.map((reply) => (
            <MessageItem key={reply.id} message={reply} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ModalDetails;

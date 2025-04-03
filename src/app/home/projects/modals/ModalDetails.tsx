"use client";

import { useEffect, useState, useRef } from "react";

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
  creator_name: string;
  replies: Message[]; // Para respuestas anidadas
}

const ModalDetails: React.FC<ModalDetailsProps> = ({
  projectId,
  closeModal,
}) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
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

  const sendMessage = async () => {
    try {
      const response = await fetch("/api/projects/messages/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: projectId, // este project_id lo obtenemos automaticamente en el Backend
          title: title.trim() || null,
          content,
          parent_id: replyTo,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Error al enviar el mensaje");

      console.log("✅ Mensaje enviado:", data);

      // Actualizar mensajes después de enviar uno nuevo
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: data.data[0].id, // Asignamos el ID del mensaje recién creado
          title: data.data[0]?.title || "", // No mostramos nada en caso de guardar un mensaje sin titulo
          content,
          creator_id: "",
          parent_id: null,
          created_at: new Date().toISOString(),
          creator_name: "",
          replies: [],
        },
      ]);

      // Limpiar inputs
      setTitle("");
      setContent("");
      setReplyTo(null);
      setIsExpanded(false);
    } catch (error) {
      console.error("❌ Error al enviar mensaje:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".reply-box")
      ) {
        setIsExpanded(false);
        setTitle("");
        setContent("");
        setReplyTo(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/40 backdrop-blur-sm">
      <div className="max-h-[90vh] bg-white p-6 rounded-lg shadow-lg w-9/12 relative">
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
                <div className="overflow-y-auto max-h-[40vh]">
                  <ul className="space-y-4">
                    {messages.map((message) => (
                      <li
                        key={message.id}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                      >
                        <h3 className="text-lg font-semibold text-indigo-800">
                          {message.title || ""}
                        </h3>
                        <p className="text-gray-700 mt-2">{message.content}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-gray-500 mt-2">
                            <span>Enviado por: {message.creator_name}</span>
                          </div>
                          <div className="text-right text-sm text-gray-500 mt-2">
                            {new Date(message.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          className="mt-2 text-blue-500 hover:underline text-sm hover:cursor-pointer"
                          onClick={() => setReplyTo(message.id)}
                        >
                          Responder
                        </button>
                        {replyTo === message.id && (
                          <div className="reply-box mt-2 ml-6 pl-3 border-l-4 rounded-lg">
                            <textarea
                              className="w-full p-2 border rounded-lg text-sm focus:outline-none text-indigo-900"
                              rows={3}
                              placeholder="Escribe tu respuesta..."
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            <button
                              className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-400"
                              onClick={sendMessage}
                            >
                              Publicar Respuesta
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-800 text-center">
                  Este proyecto no tiene mensajes aún.
                </p>
              )}

              {/* Entrada de mensajes */}
              <div ref={inputRef} className="mt-4 p-2 border rounded-lg">
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-sm focus:outline-none text-indigo-900 font-semibold"
                  placeholder="Escribe un titulo para tu mensaje"
                  onFocus={() => setIsExpanded(true)}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {isExpanded && (
                  <div className="mt-2">
                    <textarea
                      className="w-full p-2 border text-sm rounded-lg focus:outline-none text-indigo-900"
                      rows={3}
                      placeholder="Escribe tu mensaje..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <button
                      className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-400"
                      onClick={sendMessage}
                    >
                      Publicar
                    </button>
                  </div>
                )}
              </div>
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
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 absolute left-4 bottom-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalDetails;

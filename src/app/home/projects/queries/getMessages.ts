import { createClient } from "@/utils/supabase/server";

export const getMessagesByProject = async (projectId: string) => {
  "use server";

  try {
    const supabaseClient = await createClient();

    if (!projectId) {
      return { data: [], isSuccess: false, error: "Project ID es requerido" };
    }

    // Obtener los mensajes
    const { data: messages, error: messageError } = await supabaseClient
      .from("project_messages")
      .select("id, title, content, creator_id, parent_id, created_at")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });

    if (messageError) throw new Error(messageError.message);

    // Obtener los nombres de los creadores
    const creatorIds = messages.map((msg) => msg.creator_id);
    const { data: creators, error: creatorError } = await supabaseClient
      .from("users_info")
      .select("id, name") // Usamos 'id' en lugar de 'user_id'
      .in("id", creatorIds); // Filtrar por los IDs de los creadores

    if (creatorError) throw new Error(creatorError.message);

    // Asignar el nombre del creador a cada mensaje
    const messagesWithCreator = messages.map((message) => {
      const creator = creators.find(
        (creator) => creator.id === message.creator_id
      );
      return {
        ...message,
        creator_name: creator ? creator.name : "Desconocido", // Asignamos el nombre
      };
    });

    // Construir estructura jerárquica de mensajes
    const buildMessageTree = (messages: any[]) => {
      const messageMap = new Map();
      const rootMessages = [];

      messages.forEach((msg) => {
        msg.replies = [];
        messageMap.set(msg.id, msg);
      });

      messages.forEach((msg) => {
        if (msg.parent_id) {
          const parent = messageMap.get(msg.parent_id);
          if (parent) {
            parent.replies.push(msg);
          }
        } else {
          rootMessages.push(msg);
        }
      });

      return rootMessages;
    };

    const structuredMessages = buildMessageTree(messagesWithCreator);

    return { data: structuredMessages, isSuccess: true };
  } catch (error) {
    console.error("❌ Error en getMessagesByProject:", error);
    return {
      data: [],
      error: "Error al obtener los mensajes",
      isSuccess: false,
    };
  }
};

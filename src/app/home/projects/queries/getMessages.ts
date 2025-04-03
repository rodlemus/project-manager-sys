import { createClient } from "@/utils/supabase/server";

export const getMessagesByProject = async (projectId: string) => {
  "use server";

  try {
    const supabaseClient = await createClient();

    if (!projectId) {
      return { data: [], isSuccess: false, error: "Project ID es requerido" };
    }

    const { data: messages, error } = await supabaseClient
      .from("project_messages")
      .select("id, title, content, creator_id, parent_id, created_at")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);

    console.log("📩 Mensajes obtenidos:", messages);

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

    const structuredMessages = buildMessageTree(messages);

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
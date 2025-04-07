import { createClient } from "@/utils/supabase/server";

export const getTaskByProject = async (projectId: string) => {
    const supabaseClient = await createClient();

    const { data, error } = await supabaseClient
        .from('tasks')
        .select("id, title, status")
        .eq('project_id', projectId);

    if(error) {
        console.error("Error al obtener las tareas: ", error);
        return { tasks: [], error: error.message };
    }

    return { tasks: data, error: null };
}
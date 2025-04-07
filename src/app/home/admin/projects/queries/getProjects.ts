
import { createClient } from "@/utils/supabase/server";

export const getProjects = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("projects")
        .select("id, name, created_at");

    if(error) {
        throw new Error(error.message);
    }

    return data;
};
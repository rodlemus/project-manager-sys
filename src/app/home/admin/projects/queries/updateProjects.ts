import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const updateProjectSchema = z.object({
    name: z.string().min(3, { message: "El nombre del proyecto debe contener al menos 3 letras" })
});

export interface UpdateProjectResponse {
    error: string | null;
    isSuccess: boolean;
}

// METODO PARA ACTUALIZAR UN PROYECTO
export const updateProject = async (projectId: string, formData: FormData): Promise<UpdateProjectResponse> => {
    "use server";

    try {
        const supabaseClient = await createClient();

        // validamos los datos del form
        const validFields = updateProjectSchema.safeParse({
            name: formData.get("name_project") as string
        });

        if(!validFields.success) {
            return {
                error: "Campos invalidos",
                isSuccess: false
            };
        }

        // actualizamos el registro de proyecto en la base
        const { error } = await supabaseClient
            .from("projects")
            .update({ name: validFields.data.name })
            .eq("id", projectId);

        if(error) {
            throw new Error(error.message);
        }

        return { error: null, isSuccess: true }
    } catch (error) {
        console.error(error);
        return {
            error: "Error al actualizar el proyecto",
            isSuccess: false
        };
    }
}
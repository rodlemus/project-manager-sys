import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const newProjectSchema = z.object({
    name: z.string().min(3, { message: "El nombre del proyecto debe tener al menos tres letras" })
});

export interface CreateProjectResponse {
    error: string | null;
    isSuccess: boolean;
}

export const createProject = async (formData: FormData): Promise<CreateProjectResponse> => {
    "use server";

    try {
        const supabaseClient = await createClient();

        // validamos los datos del form
        const validFields = newProjectSchema.safeParse({
            name: formData.get("name_project") as string
        });

        if(!validFields.success) {
            return {
                error: "Campos invalidos",
                isSuccess: false
            };
        }

        // Insertamos el nuevo proyecto a la base
        const { error } = await supabaseClient.from("projects").insert([{ 
            name: validFields.data.name,
            created_at: new Date().toISOString()
         }]);

         if(error) {
            throw new Error(error.message);
         }

         return { error: null, isSuccess: true };
    } catch (error) {
        console.log(error);
        return {
            error: "Error al crear el proyecto",
            isSuccess: false
        };
    }
}
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const NewUserSchema = z.object({
  email: z.string().email({ message: "Ingresa un email valido." }),
  password: z.string(),
  name: z.string()
});

export interface AdminCreateNewUserResponse {
  error: string | null;
  isSuccess: boolean;
}
export async function adminCreateNewUser(
  formData: FormData
): Promise<AdminCreateNewUserResponse> {
  "use server";

  try {
    const supabaseClient = await createClient();

    const validFields = NewUserSchema.safeParse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string
    });

    if (!validFields.success) {
      return {
        error: "Invalid fields",
        isSuccess: false,
      };
    }
    const signupResult = await supabaseClient.auth.signUp({
      email: validFields.data.email,
      password: validFields.data.password,
     options: {
      data: {
        name: validFields.data.name
      }
     }});
    if (signupResult.error) {
      throw signupResult.error
    }
    return { error: null, isSuccess: true };
  } catch (e) {
    console.log(e)
    return {
      error: "error on creating user ",
      isSuccess: false,
    };
  }
}

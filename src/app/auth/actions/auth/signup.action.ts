import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod";

const SignupSchema = z.object({
  name: z.string().max(50),
  email: z.string().email({ message: "Ingresa un email valido." }),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6)
}).refine((data) => {
  return data.password === data.passwordConfirmation
}, {
  message: "Las contraseñas no coinciden",
  path: ["passwordConfirmation"]
});

export async function signupAction(formData: FormData) {
  "use server";
  const validFields = SignupSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    passwordConfirmation: formData.get("passwordConfirmation") as string,
  });

  // there is error
  if (!validFields.success) {
    validFields.error.flatten().fieldErrors;
    return;
  }

  
  const supabase = await createClient();

  const {error} = await supabase.auth.signUp({
    email: validFields.data.email,
    password: validFields.data.password,
  })

  if (!error) {
    const {error} = await supabase.from("users_info").insert({name: validFields.data.name})
    if (error) {
      redirect('/error')
    }
    return;
  }

  revalidatePath('/auth/signin', 'layout')
  redirect('/auth/signin')
}
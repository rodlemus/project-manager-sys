import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const SigninSchema = z.object({
  email: z.string().email({ message: "Ingresa un email valido." }),
  password: z.string(),
});

export async function signinAction(formData: FormData): Promise<void> {
  "use server";
  const validFields = SigninSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validFields.success) {
    return;
  }

  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/home", "layout");
  redirect("/home");
}

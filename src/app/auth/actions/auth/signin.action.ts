import { z } from "zod";

const SigninSchema = z.object({
  email: z.string().email({ message: "Ingresa un email valido." }),
  password: z.string(),
});

export async function signinAction(params: FormData): Promise<void> {
  "use server";
  const validFields = SigninSchema.safeParse({
    email: params.get("email") as string,
    password: params.get("password") as string,
  });

  if (!validFields.success) {
    validFields.error.flatten().fieldErrors;
    return;
  }

  console.log("Valid fields", validFields.data);
  return;
}

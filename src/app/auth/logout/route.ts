import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const data = await supabase.auth.signOut();
  if (data.error) {
    redirect("/error");
  }

  return redirect("/auth/signin");
}

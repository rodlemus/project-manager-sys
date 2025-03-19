import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (!error) {
    redirect("/error");
  }
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
    const supabase = await createClient();
    const data = await supabase.auth.signOut();
    if (data.error) {
      redirect("/error");
    }
  
    return redirect("/auth/signin");
  }
  
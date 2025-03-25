import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getRoleById } from "./users/actions/getUsers";
import { NextRequest, NextResponse } from "next/server";

export default async function ValidAdminRole() {
  "use server";
  const supabaseClient = await createClient();
  const authUser = await supabaseClient.auth.getUser();
  console.log(authUser);
  if (authUser.error) {
    redirect("/auth/signin");
  }

  const role = await getRoleById(authUser.data.user.id);
  console.log("ADMIN MIDDLWARE", role);
}

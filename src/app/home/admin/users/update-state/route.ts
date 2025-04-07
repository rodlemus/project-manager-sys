import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const body: { user_id: string, state:boolean } = await request.json();
  const supabase = await createClient();
  if (
    body.user_id === "" ||
    body.user_id === undefined ||
    body.user_id === null
  ) {
    return NextResponse.json({
      message: "ID de usuario no válido",
      isSuccess: false,
    });
  }

  const { error, data } = await supabase
    .from("users_info")
    .update({ state: body.state })
    .eq("id", body.user_id);

  if (error) {
    return NextResponse.json({
      message:
        "No se ha podido dar de baja el usuario, contacte al administrador",
      isSuccess: false,
    });
  }
  console.log("data", data);
  return NextResponse.json({
    message: "Usuario dado de baja con éxito",
    isSuccess: true,
  });
}

import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { APP_ROLES } from "./utils/models";
import { getRoleNameByUserId } from "./app/home/admin/users/querys/getRoleNameByUserId";

export async function middleware(request: NextRequest) {
  // proteger la ruta admin de los demas roles
  const supabaseClient = await createClient();
  const userAuth = await supabaseClient.auth.getUser();
  if (userAuth.data.user) {
    const role = await getRoleNameByUserId(userAuth.data.user.id);

    // si un usuario intenta ingresar al modulo de adminsitrador
    if (
      role !== APP_ROLES.ADMIN &&
      request.nextUrl.pathname.startsWith("/home/admin")
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    // si el admin intenta ingresar al modulo dedicado solo para usuarios
    if (
      role === APP_ROLES.ADMIN &&
      !request.nextUrl.pathname.includes("/admin")
    ) {
      return NextResponse.redirect(new URL("/home/admin", request.url));
    }
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

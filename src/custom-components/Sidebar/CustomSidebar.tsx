"use client";
import Link from "next/link";
import { useSidebar } from "./SidebarProvider";
import { IRoute } from "@/app/home/services/getRoutesByRole";
import CustomButton from "../Button/CustomButton";
import { createClient } from "@/utils/supabase/client";

export function CustomSidebar({
  urls,
  username,
}: {
  urls: IRoute[];
  username: string;
}) {
  const ctx = useSidebar();
  return (
    <div>
      {/* Overlay: Fondo oscuro que cierra la sidebar al hacer clic */}
      {ctx?.isOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 transition-opacity duration-300"
          onClick={() => ctx?.setIsOpen(false)} // Cierra la sidebar al hacer clic fuera
        ></div>
      )}
      <aside
        className={`w-64 bg-white shadow-md p-4 fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out ${
          ctx?.isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <h1 className="text-xl font-semibold text-gray-700">
          Buen día, <span className="capitalize">{username}</span>
        </h1>
        <nav className="mt-4">
          <ul className="space-y-2">
            {urls.map((route) => {
              return (
                <li key={route.url}>
                  <a
                    href={route.url}
                    className="block p-2 text-gray-600 hover:bg-gray-200 rounded"
                  >
                    {route.name}
                  </a>
                </li>
              );
            })}
            <li>
              <CustomButton
                width="w-full"
                text="Cerrar sesión"
                type="button"
                className="cursor-pointer bg-red-600 hover:bg-red-500 transition duration-300"
                onClick={async () => {
                  const supbaseClient = await createClient();
                  const {error} = await supbaseClient.auth.signOut();
                  if (!error) {
                    window.location.href = "/auth/signin";
                  }
                }}
              />
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

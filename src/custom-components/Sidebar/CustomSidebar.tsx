"use client";
import Link from "next/link";
import { useSidebar } from "./SidebarProvider";

export function CustomSidebar() {
  const ctx = useSidebar();
  return (
    <aside className={`w-64 bg-white shadow-md p-4 ${ctx?.isOpen ? "translate-x-0" : "d-none -translate-x-full"}`}>
      <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="block p-2 text-gray-600 hover:bg-gray-200 rounded"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-2 text-gray-600 hover:bg-gray-200 rounded"
            >
              Configuración
            </a>
          </li>
          <li>
            <Link
              href="/auth/logout"
              className="block p-2 text-white hover:bg-red-600/40 rounded bg-red-600/60"
            >
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

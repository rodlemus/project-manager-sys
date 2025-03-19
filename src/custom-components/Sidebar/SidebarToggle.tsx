"use client"
import { useSidebar } from "./SidebarProvider";

export default function SidebarToggle() {
  const ctx = useSidebar();

  return (
    <button
      onClick={() => ctx?.setIsOpen(!ctx.isOpen)}
      className="bg-blue-600 text-white rounded"
    >
      {ctx?.isOpen ? "Cerrar" : "Abrir"} Sidebar
    </button>
  );
}
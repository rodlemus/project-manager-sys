"use client"
import { useSidebar } from "./SidebarProvider";

export default function SidebarToggle() {
  const ctx = useSidebar();

  return (
<button
  onClick={() => ctx?.setIsOpen(!ctx?.isOpen)}
  className="cursor-pointer relative w-10 h-10 flex flex-col justify-between p-2 bg-blue-600 text-white rounded focus:outline-none"
>
  {/* Línea superior */}
  <span
    className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
      ctx?.isOpen ? "rotate-45 translate-y-2.5" : ""
    }`}
  ></span>

  {/* Línea del medio (se oculta al abrir) */}
  <span
    className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
      ctx?.isOpen ? "opacity-0" : ""
    }`}
  ></span>

  {/* Línea inferior */}
  <span
    className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
      ctx?.isOpen ? "-rotate-45 -translate-y-2.5" : ""
    }`}
  ></span>
</button>

  );
}
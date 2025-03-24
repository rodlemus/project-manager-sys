import { CustomSidebar } from "@/custom-components/Sidebar/CustomSidebar";
import { SidebarProvider } from "@/custom-components/Sidebar/SidebarProvider";
import SidebarToggle from "@/custom-components/Sidebar/SidebarToggle";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { use } from "react";

export default function Home() {
  const data = useUserPermissions();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <CustomSidebar />
        <div className="w-full h-full">
          <div className="flex h-10 bg-black w-full items-center justify-between px-6 py-8">
            <span className="text-white font-semibold">
              Project Manager System
            </span>
            <SidebarToggle></SidebarToggle>
          </div>
          {/* Main Content */}
          <main className="flex-1 p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Bienvenido al Dashboard
            </h2>
            <p className="text-gray-600 mt-2">
              Aquí puedes gestionar toda la información.
            </p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

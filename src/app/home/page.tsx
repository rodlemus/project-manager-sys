import { CustomSidebar } from "@/custom-components/Sidebar/CustomSidebar";
import { SidebarProvider } from "@/custom-components/Sidebar/SidebarProvider";
import SidebarToggle from "@/custom-components/Sidebar/SidebarToggle";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <CustomSidebar />
        <div>
          <div>
            <span className="text-black font-semibold">
              Project Manager System
            </span>{" "}
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

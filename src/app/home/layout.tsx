import { CustomSidebar } from "@/custom-components/Sidebar/CustomSidebar";
import { SidebarProvider } from "@/custom-components/Sidebar/SidebarProvider";
import SidebarToggle from "@/custom-components/Sidebar/SidebarToggle";
import { getUserData } from "../actions/getUserData";
import { getNavbarColor } from "@/utils/navbarColor";
import { getRoutesByRole } from "./services/getRoutesByRole";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getUserData();
  const navbarColor = getNavbarColor(userInfo?.roleName || "");
  const routes = getRoutesByRole(userInfo?.roleName || "");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <CustomSidebar urls={routes} />
        <div className="w-full h-full">
          <div
            className={`flex h-10 bg-black w-full items-center justify-between px-6 py-8 ${navbarColor}`}
          >
            <span className="text-white font-semibold">
              Project Manager System
            </span>
            <SidebarToggle></SidebarToggle>
          </div>
          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

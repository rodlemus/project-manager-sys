import { APP_ROLES } from "@/utils/models";

export interface IRoute {
  name: string;
  url: string;
}
export const getRoutesByRole = (role: string): IRoute[] => {
  return role === APP_ROLES.ADMIN
    ? [
        { name: "Inicio", url: "/home" },
        { name: "Usuarios", url: "/home/admin/users" },
        { name: "Proyectos", url: "/home/admin/projects" },
        { name: "Permisos", url: "/home/admin/permissions" },
      ]
    : [{ name: "Inicio", url: "/home" }];
};

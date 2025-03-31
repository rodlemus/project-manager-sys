import { APP_ROLES } from "@/utils/models";

export interface IRoute {
  name: string;
  url: string;
}
export const getRoutesByRole = (role: string): IRoute[] => {
  if (role === APP_ROLES.ADMIN) {
    return [
      { name: "Inicio", url: "/home/admin" },
      { name: "Usuarios", url: "/home/admin/users" },
      { name: "Proyectos", url: "/home/admin/projects" },
      { name: "Permisos", url: "/home/admin/permissions" },
    ];
  }

  if (role === APP_ROLES.PROJECT_MANAGER ) {
    return [
      { name: "Inicio", url: "/home" },
      { name: "Proyectos", url: "/home/projects" }
    ];
  }

  if (role === APP_ROLES.TEAM_MEMBER ) {
    return [
      { name: "Inicio", url: "/home" },
      { name: "Proyectos", url: "/home/projects" }
    ];
  }

  if (role === APP_ROLES.CLIENT ) {
    return [
      { name: "Inicio", url: "/home" },
      { name: "Proyectos", url: "/home/projects" }
    ];
  }

  return [{ name: "Inicio", url: "/home" }];
};

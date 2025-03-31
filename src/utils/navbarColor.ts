export const getNavbarColor = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "bg-black"; 
    case "PROJECT_MANAGER":
      return "bg-blue-600";
    case "TEAM_MEMBER":
      return "bg-green-600"; 
    case "CLIENT":
      return "bg-yellow-600";
    default:
      return "bg-gray-800";
  }
};

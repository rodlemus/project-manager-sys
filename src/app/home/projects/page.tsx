import { getProjects } from "./queries/getProjectsByUser";
import { getUserData } from "./queries/getProjectsByUser";
import ProjectsClient from "./ProjectsClient";
import { createProjectByUser } from "./queries/createProjectByUser";
import { updateProjectByUser } from "./queries/updateProjectByUser";
import { deleteProjectByUser } from "./queries/removeProjectByUser";

const Projects = async () => {
  const { data: projects, isSuccess, error } = await getProjects();
  const { userInfo, isSuccess: userSuccess } = await getUserData();

  if (!userSuccess || !userInfo) {
    return <p className="text-red-500">Error: Usuario no encontrado o no autenticado.</p>;
  }

  const isProjectManager = userInfo.roleName === "PROJECT_MANAGER";

  if (!isSuccess) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <ProjectsClient
      projects={projects}
      isProjectManager={isProjectManager}
      createProject={createProjectByUser}
      updateProject={updateProjectByUser}
      deleteProject={deleteProjectByUser}
    />
  );
};

export default Projects;

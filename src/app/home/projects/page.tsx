import { getProjects, getUserData } from "./queries/getProjectsByUser";
import Modal from "./modals/Modal";
import { createProjectByUser } from "./queries/createProjectByUser";
import ModalEdit from "./modals/ModalEdit";
import { updateProjectByUser } from "./queries/updateProjectByUser";
import ModalDelete from "./modals/ModalDelete";
import { deleteProjectByUser } from "./queries/removeProjectByUser";

const Projects = async () => {
  const { data: projects, isSuccess, error } = await getProjects();
  const { userInfo, isSuccess: userSuccess } = await getUserData();

  if (!userSuccess || !userInfo) {
    return (
      <p className="text-red-500">
        Error: Usuario no encontrado o no autenticado.
      </p>
    );
  }

  const isProjectManager = userInfo.roleName === "PROJECT_MANAGER";

  if (!isSuccess) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const toggleModalScript = `
  document.getElementById("agregarBtn").addEventListener("click", () => {
    document.getElementById("agregarModal").classList.remove("hidden");
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("agregarModal").classList.add("hidden");
  });
`;

  const toggleEditModalScript = `
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.editBtn').forEach(button => {
    button.addEventListener('click', (event) => {
      const projectId = event.target.getAttribute('data-id');
      const projectName = event.target.getAttribute('data-name');
      const modal = document.getElementById('editarModal');

      if (modal) {
        modal.classList.remove('hidden');
        // Pasamos los datos al modal
        const inputField = modal.querySelector('input[name="name_project"]');
        if (inputField) {
          inputField.value = projectName; // Asignar el nombre del proyecto
        }

        // Guardar el ID del proyecto en el modal
        modal.setAttribute('data-id', projectId);
      }
    });
  });
})
`;

  const toggleDeleteModalScript = `
document.addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('deleteBtn')) {
    const projectId = event.target.getAttribute('data-id');
    const modal = document.getElementById('deleteModal');
  
    if (modal) {
      modal.classList.remove('hidden');
      modal.setAttribute('data-id', projectId);
    }
  }
});
`;

  return (
    <div className="p-6">
      <div className="flex justify-center">
        <h2 className="w-11/12 text-2xl font-semibold text-gray-800">
          Proyectos 📁
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="w-11/12 flex justify-between items-center flex-wrap">
          <p className="text-black text-md my-2">
            Aqui puedes ver y gestionar tus proyectos
          </p>
          {isProjectManager && (
            <button
              id="agregarBtn"
              className="bg-green-600 text-white text-md px-4 py-2 rounded-lg hover:bg-green-500 hover:cursor-pointer"
            >
              Nuevo Proyecto
            </button>
          )}
        </div>
      </div>

      <Modal createProject={createProjectByUser} />
      <ModalEdit updateProject={updateProjectByUser} />
      <ModalDelete deleteProject={deleteProjectByUser} />

      <script dangerouslySetInnerHTML={{ __html: toggleModalScript }}></script>
      <script
        dangerouslySetInnerHTML={{ __html: toggleEditModalScript }}
      ></script>
      <script
        dangerouslySetInnerHTML={{ __html: toggleDeleteModalScript }}
      ></script>

      {projects.length === 0 ? (
        <p className="text-gray-600 mt-2">No tienes proyectos asignados.</p>
      ) : (
        <div className="mt-6 flex justify-center">
          <table className="min-w-11/12 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-zinc-500 text-white">
              <tr>
                <th className="py-3 px-6 text-center font-semibold">Nombre</th>
                <th className="py-3 px-6 text-center font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b hover:bg-gray-100 transition-all duration-300 ease-in-out"
                >
                  <td className="py-3 px-6 text-gray-700 text-center">
                    {project.name}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-slate-500 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-slate-400"
                    >
                      Ver detalles
                    </button>
                    {isProjectManager && (
                      <>
                        <button
                          className="editBtn bg-blue-500 px-4 py-2 rounded-lg mx-4 hover:cursor-pointer hover:bg-blue-400"
                          data-id={project.id}
                          data-name={project.name}
                        >
                          Editar
                        </button>
                        <button
                          className="deleteBtn bg-red-500 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-red-400"
                          data-id={project.id}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Projects;

import { getProjects } from "./queries/getProjects";
import Modal from "./modals/Modal";
import { createProject } from "./queries/createProjects";
import ModalEdit from "./modals/ModalEdit";
import { updateProject } from "./queries/updateProjects";
import ModalDelete from "./modals/ModalDelete";
import { deleteProject } from "./queries/removeProjects";

const Projects = async () => {
  const projects = await getProjects();

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
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">Proyectos</h2>
      <div className="w-full flex justify-between items-center">
        <p className="text-gray-600 mt-2">
          Aquí puedes gestionar toda la información de los proyectos.
        </p>
        <button
          id="agregarBtn"
          className="bg-green-800 px-5 py-2 text-white rounded-lg hover:bg-green-700 hover:cursor-pointer"
        >
          Agregar Proyecto +
        </button>
      </div>

      <Modal createProject={createProject} />
      <ModalEdit updateProject={updateProject} />
      <ModalDelete deleteProject={deleteProject} />

      <script dangerouslySetInnerHTML={{ __html: toggleModalScript }}></script>
      <script
        dangerouslySetInnerHTML={{ __html: toggleEditModalScript }}
      ></script>
      <script
        dangerouslySetInnerHTML={{ __html: toggleDeleteModalScript }}
      ></script>

      <div className="mt-6">
        <table className="w-full">
          <thead className="text-black">
            <tr>
              <th>ID</th>
              <th>Nombre del Proyecto</th>
              <th>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr className="border-b border-gray-400 pb-1">
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No hay registro de Proyectos
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-400 pb-1">
                  <td className="text-center capitalize text-black">
                    {project.id}
                  </td>
                  <td className="text-center capitalize text-black">
                    {project.name}
                  </td>
                  <td className="text-center capitalize text-black">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="w-full flex justify-center gap-2 py-2">
                    <button className="bg-slate-500 p-2 rounded hover:bg-slate-400 hover:cursor-pointer">
                      Ver
                    </button>
                    <button
                      className="editBtn bg-blue-500 p-2 rounded md:mx-3 hover:bg-blue-400 hover:cursor-pointer"
                      data-id={project.id}
                      data-name={project.name}
                    >
                      Editar
                    </button>
                    <button
                      className="deleteBtn bg-red-500 p-2 rounded hover:bg-red-400 hover:cursor-pointer"
                      data-id={project.id}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;

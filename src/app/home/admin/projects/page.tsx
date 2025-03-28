import { getProjects } from "./queries/getProjects";
import { createProject } from "./queries/createProjects";
import CustomModalForm from "@/custom-components/modal-button/CustomModalWithButton";
import CustomLabelInput from "@/custom-components/CustomLabelInput/CustomLabelInput";
import { redirect } from "next/navigation";

const Projects = async () => {
    const projects = await getProjects();

    const actionNewProject = async (formData: FormData) => {
        "use server";
        const result = await createProject(formData);
        if(!result.isSuccess) {
            console.error(result.error);
        }
        redirect("/home/admin/projects"); // actualizamos la pagina para actualizar la tabla
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800">Proyectos</h2>
            <p className="text-gray-600 mt-2">
                Aquí puedes gestionar toda la información de los proyectos.
            </p>
            <div className="w-full pt-2 flex flex-row-reverse">
                <CustomModalForm
                    showAcceptButton={false} 
                    action={actionNewProject} 
                    textSubmitButton="Guardar" 
                    textOpenModalButton="Crear proyecto +">
                    <CustomLabelInput label="Nombre del Proyecto" type="text" name="name_project" placeholder="" />
                </CustomModalForm>
            </div>
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
                                <td colSpan={3} className="text-center py-4 text-gray-500">No hay registro de Proyectos</td>
                            </tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project.id} className="border-b border-gray-400 pb-1">
                                    <td className="text-center capitalize text-black">{project.id}</td>
                                    <td className="text-center capitalize text-black">{project.name}</td>
                                    <td className="text-center capitalize text-black">{new Date(project.created_at).toLocaleDateString()}</td>
                                    <td className="w-full flex justify-center gap-2 py-2">
                                        <button className="bg-blue-500 p-2 rounded">Editar</button>
                                        <button className="bg-red-500 p-2 rounded">Eliminar</button>
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
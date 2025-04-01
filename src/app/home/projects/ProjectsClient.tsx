"use client";

import { useState } from "react";
import ModalDetails from "./modals/ModalDetails";
import Modal from "./modals/Modal";
import ModalEdit from "./modals/ModalEdit";
import ModalDelete from "./modals/ModalDelete";

interface ProjectsClientProps {
  projects: any[];
  isProjectManager: boolean;
  createProject: any;
  updateProject: any;
  deleteProject: any;
}

const ProjectsClient: React.FC<ProjectsClientProps> = ({ projects, isProjectManager, createProject, updateProject, deleteProject }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectecProject, setSelectecProject] = useState<{ id: string, name: string } | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleViewDetails = (projectId: string) => {
    setSelectedProjectId(projectId);
    setModalVisible(true);
  };

  const openEditModal = (project) => {
    setSelectecProject(project);
    setEditModalVisible(true);
  }

  const openDeleteModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setDeleteModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProjectId(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-center">
        <h2 className="w-11/12 text-2xl font-semibold text-gray-800">Proyectos 📁</h2>
      </div>

      <div className="flex justify-center">
        <div className="w-11/12 flex justify-between items-center flex-wrap">
          <p className="text-black text-md my-2">Aquí puedes ver y gestionar tus proyectos</p>
          {isProjectManager && (
            <button className="bg-green-600 text-white text-md px-4 py-2 rounded-lg hover:bg-green-500 hover:cursor-pointer" onClick={() => setModalVisible(true)}>
              Nuevo Proyecto
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} createProject={createProject} />
      <ModalEdit isOpen={editModalVisible} onClose={() => setEditModalVisible(false)} projectData={selectecProject} updateProject={updateProject} />
      <ModalDelete isOpen={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} projectId={selectedProjectId} deleteProject={deleteProject} />

      {modalVisible && selectedProjectId && (
        <ModalDetails projectId={selectedProjectId} closeModal={closeModal} />
      )}

      {projects.length === 0 ? (
        <p className="text-gray-600 mt-2">No tienes proyectos asignados.</p>
      ) : (
        <div className="mt-6 flex justify-center">
          <table className="min-w-11/12 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-zinc-500 text-white">
              <tr>
                <th className="py-3 px-6 text-center font-semibold">Nombre</th>
                <th className="py-3 px-6 text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b hover:bg-gray-100 transition-all duration-300 ease-in-out">
                  <td className="py-3 px-6 text-gray-700 text-center">{project.name}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleViewDetails(project.id)}
                      className="bg-slate-500 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-slate-400"
                    >
                      Ver detalles
                    </button>

                    {isProjectManager && (
                      <>
                        <button className="editBtn bg-blue-500 px-4 py-2 rounded-lg mx-4 hover:cursor-pointer hover:bg-blue-400" onClick={() => openEditModal(project)}>
                          Editar
                        </button>
                        <button className="deleteBtn bg-red-500 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-red-400" onClick={() => openDeleteModal(project.id)}>
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

export default ProjectsClient;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddDocument from "./AddDocument";
import AddNewService from "./AddNewService";
import AddProject from "./AddProject";
import SideBarAdmin from "./SideBarAdmin";

import { Modal, Button } from "react-bootstrap";
import "../Styles/ProjectList.css";
import { allProjects, deleteProjects } from "../../redux/slices/projectSlice";

const ProjectsList = () => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  const [deletedId, setDeletedId] = useState({
    id: "",
    projet: "",
  });
  const projects = useSelector((state) => state.project?.projects);
  const [ping, setPing] = useState(false);

  const handleDeleteProject = (deletedId) => {
    dispatch(deleteProjects(deletedId.id));
    setTimeout(() => {
      dispatch(allProjects());
    }, 1000);
    setPing(!ping);
    handleCloseDelete();
  };
  const [showDelete, setShowDelete] = useState(false);
  const [showP, setShowP] = useState(false);
  const [showS, setShowS] = useState(false);
  const [showD, setShowD] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseAddProject = () => setShowP(false);
  const handleShowAddProject = () => setShowP(true);
  const handleCloseAddService = () => setShowS(false);
  const handleShowAddService = () => setShowS(true);
  const handleCloseAddDoc = () => setShowD(false);
  const handleShowAddDoc = () => setShowD(true);
  return (
    <div className="profileLayout">
      <SideBarAdmin />
      <div className="projectsWrap">
        <div className="SearchProjects">
          <h1 className="profileText">Liste des projets</h1>
          <input
            type="text"
            placeholder="Vous cherchez quel projet..."
            className="search"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="searchBtn"
            onClick={(e) => {
              setFilter(text);
            }}
          >
            Rechercher
          </button>

          {user?.isAdmin ? (
            <div className="actionBar">
              <button className="searchBtn" onClick={handleShowAddProject}>
                Ajout de projet
              </button>
              <button className="searchBtn" onClick={handleShowAddService}>
                Ajout Service
              </button>
              <button className="searchBtn" onClick={handleShowAddDoc}>
                Ajout Document
              </button>
            </div>
          ) : null}

          <div className="tableContainer">
            {user?.isAdmin ? (
              <>
                {" "}
                <Modal show={showDelete} onHide={handleCloseDelete}>
                  <Modal.Header closeButton>
                    <Modal.Title>{deletedId.projet}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    <h2>Voulez vous supprimer ce projet ?</h2>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => handleDeleteProject(deletedId)}
                      className="btn-danger btn"
                    >
                      Ok
                    </Button>
                    <Button
                      onClick={() => handleCloseDelete()}
                      className="primary "
                    >
                      Annuler
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={showP} onHide={handleCloseAddProject}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ajout de projet</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    <AddProject setShowP={setShowP} />
                  </Modal.Body>
                </Modal>
                <Modal show={showS} onHide={handleCloseAddService}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ajout nouveau service</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    <AddNewService setShowS={setShowS} />
                  </Modal.Body>
                </Modal>
                <Modal show={showD} onHide={handleCloseAddDoc}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ajout des documents</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    <AddDocument setShowD={setShowD} />
                  </Modal.Body>
                </Modal>
              </>
            ) : null}

            <table>
              <th>Titre</th>
              <th className="mobile-off">Informations</th>
              <th className="mobile-off">client</th>
              <th className="mobile-off">Services</th>
              <th className="mobile-off">Date de creation</th>
              <th>Action</th>
              {projects
                ?.filter(
                  (el) =>
                    el.projectName
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    el.createdAt.toLowerCase().includes(filter.toLowerCase())
                )
                .map((project, key) => (
                  <tr key={key}>
                    <td>{project?.projectName}</td>
                    <td className="mobile-off">{project?.infoProject}</td>
                    <td className="mobile-off">
                      {project?.id_user?.name}
                      {""} {project?.id_user?.lastName}
                    </td>
                    <td className="mobile-off">
                      {project?.services.map((el) => `${el.serviceType} `)}
                    </td>

                    <td className="mobile-off">
                      {project?.createdAt.split("T")[0]}
                    </td>
                    <td>
                      <Link to="/projetprofil" state={project}>
                        <button className="actionBtn">Voir</button>
                      </Link>
                      <button
                        onClick={() => {
                          handleShowDelete();
                          setDeletedId({
                            ...deletedId,
                            id: project._id,
                            projet: project.projectName,
                          });
                        }}
                        className="btn-danger btn ml-6"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;

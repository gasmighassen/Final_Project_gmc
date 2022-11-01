import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddDocument from "./AddDocument";
import AddNewService from "./AddNewService";
import AddProject from "./AddProject";
import SideBarAdmin from "./SideBarAdmin";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Styles/ProjectList.css";

const ProjectsList = () => {
  const user = useSelector((state) => state.user?.user);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  const projects = useSelector((state) => state.project?.projects);
  const [showP, setShowP] = useState(false);
  const [showS, setShowS] = useState(false);
  const [showD, setShowD] = useState(false);
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
              <button
                className="searchBtn"
                onClick={(e) => {
                  setFilter(text);
                }}
              >
                Rechercher
              </button>
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

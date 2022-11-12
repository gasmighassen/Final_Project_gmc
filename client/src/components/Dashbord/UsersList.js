import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";
import { Modal, Button } from "react-bootstrap";
import { usersDel, usersGet } from "../../redux/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const UsersList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  const [deletedId, setDeletedId] = useState({
    id: "",
    user: "",
  });
  const [ping, setPing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const users = useSelector((state) => state.user?.users);
  const handleDeleteProject = (deletedId) => {
    dispatch(usersDel(deletedId.id));
    setTimeout(() => {
      dispatch(usersGet());
    }, 1000);
    setPing(!ping);
    handleCloseDelete();
  };
  return (
    <div className="profileLayout">
      <SideBarAdmin />
      <div className="projectsWrap">
        <div className="SearchProjects">
          <h1 className="profileText">Liste des clients</h1>
          <div className="searchP">
            <input
              type="text"
              placeholder="Vous cherchez quel projet..."
              className="search"
              onChange={(e) => setText(e.target.value)}
            />

            <i>
              <FontAwesomeIcon
                icon={faSearch}
                onClick={(e) => {
                  setFilter(text);
                }}
              />
            </i>
          </div>

          <div className="tableContainer">
            <Modal show={showDelete} onHide={handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title>{deletedId.user}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {" "}
                <h2>Voulez vous supprimer ce client ?</h2>
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
            <table>
              <th className="mobile-off">Nom & prenom</th>
              <th className="mobile-off">Email</th>
              <th className="mobile-off">Telephone</th>
              <th>Action</th>

              {users
                ?.filter(
                  (el) =>
                    el.name.toLowerCase().includes(filter.toLowerCase()) ||
                    el.lastName.toLowerCase().includes(filter.toLowerCase())
                )
                .filter((el) => !el.isAdmin)
                .map((user, key) => (
                  <tr key={key}>
                    <td>
                      {user.name} {user.name}
                    </td>
                    <td className="mobile-off">{user.email}</td>

                    <td className="mobile-off">{user.phone}</td>
                    <td>
                      <button className="btn btn-success">Edit</button>
                      <button
                        onClick={() => {
                          handleShowDelete();
                          setDeletedId({
                            ...deletedId,
                            id: user._id,
                            user: user.name,
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
            <Link to="/adduser">Ajouter un client</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;

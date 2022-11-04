import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";

const UsersList = () => {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  const users = useSelector((state) => state.user?.users);
  return (
    <div className="profileLayout">
      <SideBarAdmin />
      <div className="projectsWrap">
        <div className="SearchProjects">
          <h1 className="profileText">Liste des clients</h1>
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
          <div className="tableContainer">
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
                      <button className="actionBtn">Voir</button>
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

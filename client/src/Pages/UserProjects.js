import React, { useEffect, useState } from "react";
import "../components/Styles/UserProjects.css";
import SideBar from "../components/SideBar";
import TableProjects from "../components/TableProjects";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProjects = () => {
  const user = useSelector((state) => state.user?.user);
  const current = user._id;
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  return (
    <div className="profileLayout">
      <SideBar />
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
        </div>
        {current ? <TableProjects filter={filter} user={current} /> : null}
      </div>
    </div>
  );
};

export default UserProjects;

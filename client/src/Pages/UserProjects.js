import React, { useEffect, useState } from "react";
import "../components/Styles/UserProjects.css";
import SideBar from "../components/SideBar";
import TableProjects from "../components/TableProjects";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

const UserProjects = () => {
  const user = useSelector((state) => state.user?.user);
  const current = user._id;
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  return (
    <div className="profileLayout">
      <SideBar logo={Logo} />
      <div className="projectsWrap">
        <div className="SearchProjects">
          <h1 className="profileText">Liste des projets</h1>
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
        </div>
        {current ? <TableProjects filter={filter} user={current} /> : null}
      </div>
    </div>
  );
};

export default UserProjects;

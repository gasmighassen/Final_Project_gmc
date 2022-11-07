import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import TableDocs from "../components/TableDocs";
import { useParams } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Document = () => {
  const user = useSelector((state) => state.user?.user);
  const params = useParams();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  return (
    <div className="profileLayout">
      <SideBar logo={Logo} />
      <div className="projectsWrap">
        <div className="SearchProjects">
          <h1 className="profileText">Liste des documents</h1>
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
        <TableDocs filter={filter} id={params.id} />
      </div>
    </div>
  );
};

export default Document;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import TableDocs from "../components/TableDocs";
import { useParams } from "react-router-dom";
const Document = () => {
  const user = useSelector((state) => state.user?.user);
  const params = useParams();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  return (
    <div className="profileLayout">
      <SideBar />
      <div className="projectsWrap">
        <div className="SearchProjects">
          <h1 className="profileText">Liste des documents</h1>
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
        <TableDocs filter={filter} id={params.id} />
      </div>
    </div>
  );
};

export default Document;

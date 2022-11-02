import React, { useState } from "react";
import TableFeeds from "../components/TableFeeds";
import SideBar from "../components/SideBar";
import SideBarAdmin from "../components/Dashbord/SideBarAdmin";
import { useSelector } from "react-redux";

function FeedBack() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  const current = useSelector((state) => state?.user?.user);
  return (
    <div className="profileLayout">
      {current?.isAdmin ? <SideBarAdmin /> : <SideBar />}

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
        <TableFeeds filter={filter} />
      </div>
    </div>
  );
}

export default FeedBack;

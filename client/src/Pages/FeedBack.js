import React, { useState } from "react";
import TableFeeds from "../components/TableFeeds";
import SideBar from "../components/SideBar";
import SideBarAdmin from "../components/Dashbord/SideBarAdmin";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function FeedBack() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
  const current = useSelector((state) => state?.user?.user);
  return (
    <div className="profileLayout">
      {current?.isAdmin ? <SideBarAdmin /> : <SideBar />}

      <div className="projectsWrap">
        <div className="SearchProjects">
          <h1 className="profileText">Liste des Feedback</h1>
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
        <TableFeeds filter={filter} />
      </div>
    </div>
  );
}

export default FeedBack;

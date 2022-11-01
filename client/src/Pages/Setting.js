import React, { useState } from "react";
import "../components/Styles/UserProjects.css";
import SideBar from "../components/SideBar";

import { useSelector } from "react-redux";

const Setting = () => {
  const user = useSelector((state) => state.user?.user);
  const projects = useSelector((state) => state.project?.projects);

  return (
    <div className="profileLayout">
      <SideBar />
    </div>
  );
};

export default Setting;

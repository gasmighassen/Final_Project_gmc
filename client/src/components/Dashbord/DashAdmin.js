import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import SideBarAdmin from "./SideBarAdmin";
import { usersGet } from "../../redux/slices/userSlice";
import { allProjects } from "../../redux/slices/projectSlice";
import ProjectsList from "./ProjectsList";

const DashAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allProjects());
    dispatch(usersGet());
  }, [dispatch]);
  return (
    <div className="profileLayout">
      <ProjectsList />
    </div>
  );
};

export default DashAdmin;

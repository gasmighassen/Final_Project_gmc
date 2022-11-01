import React, { useState } from "react";
import SideBarAdmin from "./SideBarAdmin";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProjectFiles } from "../../redux/slices/serviceSlice";
import ServiceList from "./ServiceList";
import "../Styles/ProjectProfile.css";
import ServiceFiles from "./ServiceFiles";
import SideBar from "../SideBar";
import { useEffect } from "react";

const ProjectProfile = () => {
  const user = useSelector((state) => state.user?.user);
  const [service, setService] = useState({
    _id: "634bfccc4e054e498ba29f6d",
    serviceType: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  const [ping, setPing] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const project = location.state;
  dispatch(ProjectFiles(project._id));

  useEffect(() => {
    dispatch(ProjectFiles(project._id));
  }, [ping]);

  return (
    <div className="profileLayout">
      {user?.isAdmin ? <SideBarAdmin /> : <SideBar />}

      <div className="projectsWrap">
        <ServiceList setService={setService} />

        <ServiceFiles
          setPing={setPing}
          ping={ping}
          service={service}
          project={project}
          user={user}
        />
      </div>
    </div>
  );
};

export default ProjectProfile;

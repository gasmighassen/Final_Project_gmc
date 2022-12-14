import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProjects } from "../redux/slices/projectSlice";
import Loader from "./Loader";
import "./Styles/Table.css";
import { AiOutlineEye } from "react-icons/ai";

const TableProjects = ({ filter, user }) => {
  const dispatch = useDispatch();
  const userProjects = useSelector((state) => state.project?.userProjects);
  const { isLoading } = useSelector((state) => state.project);
  console.log(isLoading);
  useEffect(() => {
    dispatch(getUserProjects(user));
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {userProjects.length === 0 ? (
            <p>pas des projets pour le moment</p>
          ) : (
            <table className="table">
              <thead>
                <th>Titre</th>
                <th className="mobile-off">Informations</th>
                <th className="mobile-off">client</th>
                <th className="mobile-off">Services</th>
                <th className="mobile-off">Date de creation</th>
                <th>Action</th>
              </thead>
              <tbody>
                {userProjects
                  ?.filter(
                    (el) =>
                      el.projectName
                        .toLowerCase()
                        .includes(filter.toLowerCase()) ||
                      el.id_user.name
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                  )
                  .map((project, i) => (
                    <tr key={i}>
                      <td>{project.projectName}</td>
                      <td>{project.infoProject}</td>
                      <td>
                        {project.id_user.name} {project.id_user.lastName}
                      </td>
                      <td>
                        {project.services.map((el, i) => (
                          <span key={i}>-{el.serviceType} </span>
                        ))}
                      </td>
                      <td>{project.createdAt.split("T")[0]}</td>
                      <td>
                        <Link to="/projetprofil" state={project}>
                          <AiOutlineEye className="tableActionBtn" />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default TableProjects;

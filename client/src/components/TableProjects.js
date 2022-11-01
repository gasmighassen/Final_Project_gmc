import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProjects } from "../redux/slices/projectSlice";
import "./Styles/Table.css";

const TableProjects = ({ filter, user }) => {
  const dispatch = useDispatch();
  const userProjects = useSelector((state) => state.project?.userProjects);

  useEffect(() => {
    dispatch(getUserProjects(user));
  }, [dispatch]);
  return (
    <div>
      {userProjects.length === 0 ? (
        <p>pas des projets pour le moment</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <td>project name</td>
              <td>project owner</td>
              <td>services</td>
              <td>creaction date</td>
              <td>action</td>
            </tr>
          </thead>
          <tbody>
            {userProjects
              ?.filter(
                (el) =>
                  el.projectName.toLowerCase().includes(filter.toLowerCase()) ||
                  el.id_user.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((project, i) => (
                <tr key={i}>
                  <td>{project.projectName}</td>
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
                      <button className="actionBtn">Voir</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableProjects;

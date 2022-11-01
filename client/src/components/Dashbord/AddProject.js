import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProject } from "../../redux/slices/projectSlice";

const AddProject = ({ setShowP }) => {
  const users = useSelector((state) => state.user?.users);
  const service = useSelector((state) => state.service?.services);
  const [project, setproject] = useState({
    projectName: "",
    services: [],
    id_user: "",
    infoProject: "",
  });

  useEffect(() => {
    setproject({ ...project, id_user: project?._id });
  }, []);
  const dispatch = useDispatch();

  return (
    <div className="projectWrap">
      <div className="content">
        <div className="user-details">
          <h5>
            Donner un titre <span className="required">*</span>
          </h5>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter un titre"
              required=""
              onChange={(e) =>
                setproject({ ...project, projectName: e.target.value })
              }
            />
          </div>
          <h5>
            Choisir le client<span className="required">*</span>
          </h5>
          <div className="input-box">
            <select
              className="userNames"
              onChange={(e) =>
                setproject({ ...project, id_user: e.target.value })
              }
            >
              {users
                .filter((el) => !el.isAdmin)
                .map((user) => (
                  <>
                    <option value={user?._id}>
                      {user?.name} {user?.lastName}
                    </option>
                  </>
                ))}
            </select>
          </div>
          <div className="serviceCheck">
            <h5>
              Choisir les services<span className="required">*</span>
            </h5>
            {service?.map((service, i) => (
              <div className="serviceChoise" key={i}>
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      setproject({
                        ...project,
                        services: [...project.services, e.target.value],
                      });
                    } else {
                      let newtab = project.services;
                      let index = newtab.indexOf(e.target.value);
                      if (index > -1) {
                        newtab.splice(index, 1);
                        setproject({ ...project, services: newtab });
                      }
                    }
                  }}
                  type="checkbox"
                  value={service._id}
                  name="service"
                />
                <label>{service.serviceType}</label>
              </div>
            ))}
          </div>{" "}
          <h5>
            Details de projet<span className="required">*</span>
          </h5>
          <div className="input-box">
            <input
              type="text"
              placeholder="Description "
              required=""
              onChange={(e) =>
                setproject({ ...project, infoProject: e.target.value })
              }
            />
          </div>
        </div>

        <div className="button">
          <button
            className="loginBtn"
            onClick={() => {
              dispatch(addProject(project));
              setShowP(false);
            }}
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;

import e from "cors";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addService } from "../../redux/slices/serviceSlice";

const AddNewService = ({ setShowS }) => {
  const dispatch = useDispatch();
  const [service, setService] = useState({
    serviceType: "",
  });
  return (
    <>
      {" "}
      <h5>
        Nom de service<span className="required">*</span>
      </h5>
      <div className="newService">
        <input
          type="text"
          onChange={(e) =>
            setService({ ...service, serviceType: e.target.value })
          }
        />
        <button
          className="loginBtn"
          onClick={() => {
            dispatch(addService(service));
            setShowS(false);
          }}
        >
          Ajout service
        </button>
      </div>
    </>
  );
};

export default AddNewService;

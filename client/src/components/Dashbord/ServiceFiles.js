import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeed,
  deleteFile,
  ProjectFiles,
} from "../../redux/slices/serviceSlice";
import "../Styles/serviceFiles.css";
import AddFiles from "./AddFiles";
import Modal from "react-bootstrap/Modal";

const ServiceFiles = ({ service, project, ping, setPing, user }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.service?.files);
  const [show, setShow] = useState(false);
  const handleDelete = (item, file) => {
    dispatch(deleteFile({ service: item?._id, file: file?._id }));
    setTimeout(() => {
      dispatch(ProjectFiles(project._id));
    }, 1000);
    setShow(!show);
  };
  const [feedback, setfeedback] = useState({
    feedback: "",
  });
  useEffect(() => {
  }, [dispatch, show]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <AddFiles
        setPing={setPing}
        ping={ping}
        service={service}
        project={project}
      />
      <div className="container">
      {items
          ?.filter(
            (item) =>
              item?.services === service?._id &&
              item?.files != null &&
              item?.files?.length > 0
          )
          .map((item, i) => (
            <>
              {item?.files?.map((file, index) => (
                <div className="card">
                <p className="date" key={i.id}>{item?.createdAt.split("T")[0]}</p>
                {user?.isAdmin && (
                    <button
                    className="btn-remove"
                      key={index?.id}
                      onClick={() => {
                        handleDelete(item, file);
                      }}
                    >
                      Supprimer</button>
                )}
                  <a href={file?.url} target="_blank"><img
                  className="img"
                  key={index?.id}
                  src={file?.url}
                  alt="Bmes_Pdf_File"
                /></a>
              </div>
              ))}
            </>
          ))}
      </div>
    </>
    
  );
};

export default ServiceFiles;

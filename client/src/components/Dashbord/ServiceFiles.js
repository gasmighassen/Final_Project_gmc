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
import Loader from "../Loader";
import { RiDeleteBin5Line } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

const ServiceFiles = ({ service, project, ping, setPing, user }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.service?.files);

  const { isLoading } = useSelector((state) => state.service);
  const [show, setShow] = useState(false);
  const handleDelete = (item, file) => {
    dispatch(deleteFile({ service: item?._id, file: file?._id }));
    setTimeout(() => {
      dispatch(ProjectFiles(project._id));
    }, 1000);
    setShow(!show);
  };
  const [toFeed, settoFeed] = useState(null);
  const [fileId, setFileId] = useState("");
  const [feed, setfeed] = useState({ feedback: "" });
  useEffect(() => {}, [dispatch, show]);
  const handleFeed = () => {
    dispatch(addFeed(fileId, feed));
  };
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
      {isLoading ? (
        <Loader />
      ) : (
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
                    <div className="cardHead">
                      {" "}
                      <p className="date" key={i.id}>
                        {item?.createdAt.split("T")[0]}
                      </p>
                      {user?.isAdmin ? (
                        <RiDeleteBin5Line
                          key={index?.id}
                          onClick={() => {
                            handleDelete(item, file);
                          }}
                          className="tableActionBtn required"
                        >
                          Supprimer
                        </RiDeleteBin5Line>
                      ) : (
                        <VscFeedback
                          className="tableActionBtn"
                          onClick={() => {
                            handleShow();
                            settoFeed(file);
                            setFileId(item._id);
                          }}
                        />
                      )}
                    </div>{" "}
                    <a href={file?.url} target="_blank">
                      <img
                        className="img"
                        key={index?.id}
                        src={file?.url}
                        alt="Bmes_Pdf_File"
                      />
                    </a>
                    <div className="cardFooter">
                      <p>{item?.description}</p>
                    </div>
                  </div>
                ))}
                {show && (
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <p>{fileId}</p>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Votre feedback</p>
                      <input
                        type="text"
                        onChange={(e) =>
                          setfeed({ ...feed, feedback: e.target.value })
                        }
                      />
                      <button onClick={() => handleFeed()}>envoyer</button>
                    </Modal.Body>
                  </Modal>
                )}
              </>
            ))}
        </div>
      )}
    </>
  );
};

export default ServiceFiles;

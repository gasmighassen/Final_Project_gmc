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
  const items = useSelector((state) => state.service?.files);
  const [show, setShow] = useState(false);
  const handleDelete = (item, file) => {
    setPing(!ping);
    dispatch(deleteFile({ service: item?._id, file: file?._id }));
  };
  const [feedback, setfeedback] = useState({
    feedback: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProjectFiles(project._id));
  }, [dispatch, ping]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="itemsList">
      <AddFiles
        setPing={setPing}
        ping={ping}
        service={service}
        project={project}
      />
      <div className="galleryBloc">
        {items
          ?.filter(
            (item) =>
              item?.services === service?._id &&
              item?.files != null &&
              item?.files?.length > 0
          )
          .map((item, i) => (
            <div className="gallery" key={i.id}>
              <p key={i.id}>{item?.createdAt.split("T")[0]}</p>
              <div className="galleryContainer">
                {item?.files?.map((file, index) => (
                  <div className="galleryItem">
                    <img key={index?.id} src={file?.url} alt="Bmes_Pdf_File" />
                    {user?.isAdmin && (
                      <button
                        key={index?.id}
                        onClick={() => {
                          handleDelete(item, file);
                        }}
                      >
                        remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p key={i.id}>{item?.description}</p>
              {!user?.isAdmin ? (
                <div className="feedContainer">
                  <button className="searchBtn" onClick={handleShow}>
                    Ajout feedback
                  </button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>votre feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {" "}
                      <textarea
                        type="text"
                        value={feedback.feedback}
                        onChange={(e) => {
                          setfeedback({
                            ...feedback,
                            feedback: e.target.value,
                          });
                        }}
                      />
                      <button
                        className="searchBtn"
                        onClick={() => {
                          dispatch(addFeed({ id: item?._id, feed: feedback }));
                          setfeedback({ ...feedback, feedback: "" });
                          setPing(!ping);
                        }}
                      >
                        envoyer
                      </button>
                    </Modal.Body>
                  </Modal>
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServiceFiles;

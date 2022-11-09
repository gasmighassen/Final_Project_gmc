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
  const handleDelete = async (item) => {
    await dispatch(deleteFile({ fileId: item?._id })).then(() => {
      dispatch(ProjectFiles(project._id));
    });
  };

  const [fileId, setFileId] = useState("");
  const [feed, setfeed] = useState({ comment: "" });
  useEffect(() => {}, [dispatch, show]);
  const handleFeed = () => {
    console.log(fileId);
    dispatch(addFeed({ fileId, feed }));
    setPing(!ping);
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
            ?.filter((item) => item?.services === service?._id && item !== null)
            ?.map((item, i) => (
              <>
                {
                  <div className="card">
                    <div className="cardHead">
                      <p className="date">{item?.createdAt.split("T")[0]}</p>
                      {user?.isAdmin ? (
                        <RiDeleteBin5Line
                          onClick={() => {
                            handleDelete(item);
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
                            setFileId(item._id);
                          }}
                        />
                      )}
                    </div>{" "}
                    <a href={item?.url} target="_blank">
                      <img
                        className="img"
                        src={item?.url}
                        alt="Bmes_Pdf_File"
                      />
                    </a>
                    <div className="cardFooter">
                      <p>{item?.description}</p>
                    </div>
                  </div>
                }
                {show && (
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <p>{}</p>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Votre feedback</p>
                      <input
                        type="text"
                        onChange={(e) =>
                          setfeed({ ...feed, comment: e.target.value })
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

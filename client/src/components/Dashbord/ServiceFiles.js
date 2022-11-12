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
  const [Image, setImage] = useState({
    imageUrl: "",
    type: "",
    feedbacks: [],
  });
  console.log(Image);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
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
                    {item?.type === "video" ? (
                      <video
                        width="320"
                        height="240"
                        onClick={() => {
                          setImage({
                            ...Image,
                            imageUrl: item?.url,
                            type: item?.type,
                            feedbacks: item?.feedback,
                          });
                          toggleModal();
                        }}
                      >
                        <source src={item.url} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        className="img"
                        src={item?.url}
                        alt="Bmes_Pdf_File"
                        onClick={() => {
                          setImage({
                            ...Image,
                            imageUrl: item?.url,
                            type: item?.type,
                            feedbacks: item?.feedback,
                          });
                          toggleModal();
                        }}
                      />
                    )}
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
      {modal && (
        <div className="modalMedia">
          <div onClick={toggleModal} className="overlay">
            {" "}
            <span className="close-modal" onClick={toggleModal}>
              X
            </span>
          </div>
          <div className="modalContent">
            {Image.type === "video" ? (
              <video width="100%" height="100%" controls>
                <source src={Image.imageUrl} type="video/mp4" />
              </video>
            ) : (
              <img src={Image.imageUrl} alt="" className="mImage" />
            )}

            <div className="feedbacks">
              {Image?.feedbacks?.map((el) => (
                <p className="feedText">{el.comment}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceFiles;

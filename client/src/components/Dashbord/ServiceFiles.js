import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeed,
  deleteFile,
  ProjectFiles,
} from "../../redux/slices/serviceSlice";
import "../Styles/serviceFiles.css";
import AddFiles from "./AddFiles";

const ServiceFiles = ({ service, project, ping, setPing, user }) => {
  const items = useSelector((state) => state.service?.files);
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
              {item?.files?.map((file, index) => (
                <>
                  <img
                    key={index?.id}
                    src={file?.url}
                    alt="Bmes_Pdf_File"
                    style={{ width: "200px", height: "200px" }}
                  />
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
                </>
              ))}
              <p key={i.id}>{item?.description}</p>
              {!user?.isAdmin ? (
                <div className="feedContainer">
                  <h3>votre feedback</h3>
                  <textarea
                    type="text"
                    value={feedback.feedback}
                    onChange={(e) => {
                      setfeedback({ ...feedback, feedback: e.target.value });
                    }}
                  />
                  <button
                    className="login-btn"
                    onClick={() => {
                      dispatch(addFeed({ id: item?._id, feed: feedback }));
                      setfeedback({ ...feedback, feedback: "" });
                      setPing(!ping);
                    }}
                  >
                    envoyer
                  </button>
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServiceFiles;

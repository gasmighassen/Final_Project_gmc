import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../redux/slices/serviceSlice";

function SendFeeds({ files }) {
  const feeds = useSelector((state) => state.service?.files);
  const dispatch = useDispatch();
  const [feedback, setfeedback] = useState("");

  return (
    <div className="feedContainer">
      <h3>votre feedback</h3>
      <textarea
        type="text"
        onChange={(e) => {
          setfeedback(e.target.value);
        }}
      />
      <button
        className="login-btn"
        onClick={() => {
          dispatch(addFeed(files, feedback));
        }}
      >
        envoyer
      </button>
    </div>
  );
}

export default SendFeeds;

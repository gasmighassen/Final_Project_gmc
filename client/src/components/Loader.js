import React from "react";
import Spinner from "react-bootstrap/Spinner";
function Loader() {
  return (
    <div className="loader">
      {" "}
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden ">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;

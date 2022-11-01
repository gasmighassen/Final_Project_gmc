import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { docUser } from "../redux/slices/documentSlice";
function TableDocs({ filter, id }) {
  const dispatch = useDispatch();
  const userDocs = useSelector((state) => state.document?.userDocs);
  useEffect(() => {
    dispatch(docUser(id));
  }, [dispatch]);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>Document Id</td>
            <td>Document</td>
            <td>Created At</td>
          </tr>
        </thead>
        <tbody>
          {userDocs.map((doc, i) => (
            <tr key={i}>
              <td>{doc._id}</td>
              <td>
                <a href={doc.docs}>
                  <img
                    src="https://e7.pngegg.com/pngimages/182/22/png-clipart-computer-icons-pdf-filename-extension-pdf-icon-angle-text-thumbnail.png"
                    alt="pdf"
                    width={"40px"}
                    height={"40px"}
                  />
                </a>
              </td>
              <td>{doc.createdAt.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDocs;

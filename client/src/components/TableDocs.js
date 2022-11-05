import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { docUser } from "../redux/slices/documentSlice";
function TableDocs({ filter, id }) {
  const dispatch = useDispatch();
  const userDocs = useSelector((state) => state.document?.userDocs);
  useEffect(() => {
    dispatch(docUser(id));
  }, [dispatch, id]);
  return (
    <div>
      <table className="table">
        <thead>
          <th>{"   "}</th>
          <th>{`Fichier (${userDocs.length})`}</th>
          <th>Date creation</th>
        </thead>
        <tbody>
          {userDocs.map((doc, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>
                <a href={doc.docs}>
                  <img className="pdfLogo" src="/img/pdf.png" alt="pdf" />
                  <p>{doc.titre}</p>
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

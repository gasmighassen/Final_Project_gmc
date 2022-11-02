import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFeeds } from "../redux/slices/serviceSlice";

function TableFeeds({ filter }) {
  const dispatch = useDispatch();
  const allfeeds = useSelector((state) => state.service?.feeds);
  console.log(allfeeds);
  useEffect(() => {
    dispatch(allFeeds());
  }, [dispatch]);
  return (
    <div>
      <table className="table">
        <thead>
          <th></th>
          <th className="mobile-off">Projet</th>
          <th className="mobile-off">Services</th>
          <th className="mobile-off">Fichier</th>
          <th className="mobile-off">Date de creation</th>

          <th className="mobile-off">Dernier feedback</th>
        </thead>
        <tbody>
          {allfeeds
            ?.filter((el) => el.feedback.length !== 1)
            .map((feeds, i) => (
              <tr>
                <td>{i}</td>
                <td>{feeds?.id_project?.projectName}</td>
                <td>{feeds?.services?.serviceType}</td>
                <td>
                  {feeds?.files
                    ?.map((el) => (
                      <img
                        className="galleryItem"
                        src={el.url}
                        width={"50px"}
                        height={"50px"}
                      />
                    ))
                    .slice(-1)}
                </td>
                <td>{feeds?.createdAt?.split("T")[0]}</td>
                <td>{feeds?.feedback.map((el) => <p>{el}</p>).slice(-1)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableFeeds;

import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addServiceFile } from "../../redux/slices/serviceSlice";
import "../Styles/AddFiles.css";

function AddFiles({ service, project, ping, setPing }) {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  let [uploadedFiles, setuploadedFiles] = useState([]);
  const [upload, setupload] = useState([]);
  const [description, setdescription] = useState("");

  const [file, setfile] = useState({
    services: service?._id,
    id_project: project._id,
    url: [],
    description: "",
    feedback: "",
  });

  useEffect(() => {
    setfile({ ...file, services: service?._id });
  }, [service, ping]);
  const bar = document.getElementById("progress-bar");
  const progressDiv = document.getElementById("progress-div");

  const handleDrop = async () => {
    progressDiv.style.display = "block";
    // Push all the axios request promise into a single array
    const uploaders = upload.map(async (file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "bmes_file"); // Replace the preset name with your own
      formData.append("api_key", "238588684128945"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      const config = {
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          bar.setAttribute("value", percentCompleted);
          bar.previousElementSibling.textContent = `${percentCompleted}%`;
          if (percentCompleted === 100) {
            bar.previousElementSibling.textContent = `Upload complete!`;
          }
        },
      };
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return await axios
        .post(
          "https://api.cloudinary.com/v1_1/dr7fhescc/upload",
          formData,
          config,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = { files: data.secure_url, id: data.asset_id }; // You should store this URL for future references in your app
          uploadedFiles.push(data);
          progressDiv.style.display = "none";
          setupload([]);
          dispatch(
            addServiceFile({
              services: service._id,
              id_project: project._id,
              url: data.secure_url,
              description: "description ici ...",
            })
          );

          return fileURL;
        });
    });
    // Once all the files are uploaded
    await axios.all(uploaders).then(async (result) => {
      setPing(!ping);
      // ... perform after upload is successful operation
    });
  };

  return (
    <div className="Addfiles">
      <span className="project-path">
        {project.projectName}/{service.serviceType}
      </span>
      {user.isAdmin ? (
        <>
          <h1>Ajout des fichiers</h1>
          <div className="addImage">
            <label for="input-upload">
              Merci de choisir une fichier
              <input
                className="input-upload"
                type="file"
                multiple
                name="image"
                accept="image/*"
                required
                onChange={(e) => {
                  setupload(Object.values(e.target.files));
                }}
              />
            </label>

            {upload[0] ? (
              <input
                className="btn-upload"
                type="button"
                value="upload"
                onClick={() => {
                  handleDrop();
                }}
              />
            ) : null}
          </div>
          <div id="progress-div" style={{ display: "none" }}>
            <label for="progress-bar">0%</label>
            <progress id="progress-bar" value="0" max="100"></progress>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AddFiles;

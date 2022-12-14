import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDoc } from "../../redux/slices/documentSlice";

function AddDocument({ setShowD }) {
  const user = useSelector((state) => state.user?.user);
  const allusers = useSelector((state) => state.user?.users);
  const dispatch = useDispatch();
  const [upload, setupload] = useState("");

  const [file, setfile] = useState({
    id_user: "",
    docs: "",
    titre: "",
  });
  useEffect(() => {
    setfile({ ...file, id_user: "" });
  }, []);
  const uploadImage = async () => {
    const form = new FormData();
    form.append("upload_preset", "bmes_file");
    form.append("file", upload);

    await axios
      .post("https://api.cloudinary.com/v1_1/dr7fhescc/upload", form)
      .then((result) => {
        dispatch(addDoc({ ...file, docs: result.data.secure_url }));
        setfile({ ...file, docs: result.data.secure_url });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {user.isAdmin ? (
        <div className="projectsWrap">
          <h5>
            Selectionner un document<span className="required">*</span>
          </h5>
          <div className="documentSelect">
            {" "}
            <select
              name="project"
              onChange={(e) => setfile({ ...file, id_user: e.target.value })}
            >
              <option selected></option>
              {allusers
                .filter((el) => !el.isAdmin)
                .map((user) => (
                  <option value={user?._id}>
                    {user.name} {user.lastName}
                  </option>
                ))}
            </select>
            <input
              type="file"
              name="image"
              accept="application/pdf,application/vnd.ms-excel"
              onChange={(e) => setupload(e.target.files[0])}
            />
            <h2>Titre de document...</h2>
            <input
              type="text"
              name="titre"
              value={file.titre}
              onChange={(e) => setfile({ ...file, titre: e.target.value })}
            />
            <input
              className="loginBtn"
              type="button"
              value="upload"
              onClick={() => {
                uploadImage();
                setShowD(false);
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AddDocument;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDoc } from "../../redux/slices/documentSlice";

function AddDocument({ setShowD }) {
  const user = useSelector((state) => state.user?.user);
  const users = useSelector((state) => state.user?.users);
  const dispatch = useDispatch();
  const [upload, setupload] = useState("");

  const [file, setfile] = useState({
    id_user: "",
    docs: "",
  });
  useEffect(() => {
    setfile({ ...file, id_user: user?._id });
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
              {users
                .filter((el) => !el.isAdmin)
                .map((el) => (
                  <option value={el._id}>{el.name}</option>
                ))}
            </select>
            <input
              type="file"
              name="image"
              accept="application/pdf,application/vnd.ms-excel"
              onChange={(e) => setupload(e.target.files[0])}
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

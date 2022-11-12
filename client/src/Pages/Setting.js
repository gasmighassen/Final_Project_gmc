import React, { useEffect, useState } from "react";
import "../components/Styles/UserProjects.css";
import SideBar from "../components/SideBar";
import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import "./../components/Styles/settings.css";
import SideBarAdmin from "../components/Dashbord/SideBarAdmin";
import Modal from "react-bootstrap/Modal";
import {
  updateUser,
  updateUserPassword,
  userCurrent,
} from "../redux/slices/userSlice";
export default function Setting() {
  const [showName, setShowName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const user = useSelector((state) => state.user?.user);

  const dispatch = useDispatch();
  const [update, setupdate] = useState({
    email: user.email,
    lastName: user.lastName,
    name: user.name,
    phone: user.number,
  });
  const [password, setpassword] = useState({ password: user.password });
  const handleChangePass = () => {
    dispatch(updateUserPassword({ id: user?._id, password }));
  };

  const handleUpdate = () => {
    dispatch(updateUser({ id: user?._id, update }));
    setping(!ping);
  };
  const [ping, setping] = useState(false);
  useEffect(() => {
    dispatch(userCurrent(user?._id));
  }, [updateUser, ping, updateUserPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdate({ ...update, [name]: value });
  };
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate({ ...update }));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleUpdate();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexNumber = RegExp("^[0-9]$");
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (specialChars.test(values.name)) {
      errors.name = "Nom contient caractéres speciaux!";
    }
    if (specialChars.test(values.lastName)) {
      errors.lastName = "Prenom contient caractéres speciaux!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!regexNumber.test(values.phone)) {
      errors.phone = "This is not a valid Phone number format!";
    }
    if (!values.phone) {
      errors.phone = "Phone is required!";
    }
    return errors;
  };

  return (
    <div className="profileLayout">
      {user?.isAdmin ? <SideBarAdmin /> : <SideBar logo={Logo} />}
      <div className="setting_container">
        <h1>Paramètres généraux du compte</h1>
        <div className="setting_form">
          <div className="info_personel">
            <h6>Nom et Prénom :</h6>
            <div className="info_details_nom">
              {" "}
              <h6 className="grey">
                {user?.name} {user?.lastName}
              </h6>
            </div>

            <button
              onClick={() => {
                setShowName(true);
              }}
            >
              Modifer
            </button>
          </div>
          <hr />
          <div className="info_contact">
            <div className="email_field">
              <h6>Email :</h6>
              <div className="info_details_email">
                <h6 className="grey">{user?.email}</h6>
              </div>

              <button
                onClick={() => {
                  setShowEmail(true);
                }}
              >
                Modifer
              </button>
            </div>
            <div className="phone_field">
              <h6>Telephone :</h6>

              <div className="info_details">
                <h6 className="grey">{user?.phone}</h6>
              </div>

              <button
                onClick={() => {
                  setShowPhone(true);
                }}
              >
                Modifer
              </button>
            </div>
          </div>
          <hr />
          <div className="change_password">
            <div className="change_password_text">
              <h6>Changer le mot de passe :</h6>
              <span>
                Nous vous conseillons d’utiliser un mot de passe sûr que vous
                n’utilisez nulle part ailleurs
              </span>
            </div>

            <button
              onClick={() => {
                setShowPass(true);
              }}
            >
              Modifer
            </button>
          </div>
        </div>
      </div>
      {showName && (
        <Modal show={showName} onHide={() => setShowName(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>{}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Nom</p>
            <input name="name" type="text" onChange={handleChange} />
            <p className="required">{formErrors.name}</p>
            <button onClick={handleSubmit}>envoyer</button>
            <p>Prenom</p>
            <input name="lastName" type="text" onChange={handleChange} />
            <p className="required">{formErrors.lastName}</p>
            <button onClick={handleSubmit}>envoyer</button>
          </Modal.Body>
        </Modal>
      )}
      {showEmail && (
        <Modal show={showEmail} onHide={() => setShowEmail(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>{}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Modifier votre adresse mail</p>
            <input name="email" type="text" onChange={handleChange} />
            <p className="required">{formErrors.email}</p>
            <button onClick={handleSubmit}>envoyer</button>
          </Modal.Body>
        </Modal>
      )}
      {showPhone && (
        <Modal show={showPhone} onHide={() => setShowPhone(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>{}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Modifier votre numero telephone</p>
            <input name="phone" type="text" onChange={handleChange} />
            <p className="required">{formErrors.phone}</p>
            <button onClick={handleSubmit}>envoyer</button>
          </Modal.Body>
        </Modal>
      )}
      {showPass && (
        <Modal show={showPass} onHide={() => setShowPass(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>{}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Modifier votre mot de passe </p>
            <input
              name="password"
              type="password"
              onChange={(e) =>
                setpassword({ ...password, password: e.target.value })
              }
            />

            <button onClick={handleChangePass}>envoyer</button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

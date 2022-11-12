import React, { useEffect, useState } from "react";
import "../components/Styles/UserProjects.css";
import SideBar from "../components/SideBar";
import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import "./../components/Styles/settings.css";
import SideBarAdmin from "../components/Dashbord/SideBarAdmin";
import Modal from "react-bootstrap/Modal";
import { updateUser, userCurrent } from "../redux/slices/userSlice";
const Setting = () => {
  const [showName, setShowName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const user = useSelector((state) => state.user?.user);
  console.log(user);
  const dispatch = useDispatch();
  const [update, setupdate] = useState({
    email: user.email,
    lastName: user.lastName,
    name: user.name,
    phone: user.number,
  });
  const [updatePass, setUpdatePass] = useState("");
  console.log(update);
  const handleUpdate = () => {
    dispatch(updateUser({ id: user?._id, update }));
    setping(!ping);
  };
  const [ping, setping] = useState(false);
  useEffect(() => {
    dispatch(userCurrent(user?._id));
  }, [updateUser, ping]);

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
            <input
              type="text"
              onChange={(e) => setupdate({ ...update, name: e.target.value })}
            />
            <p>Prenom</p>
            <input
              className="phoneNumber"
              type="number"
              onChange={(e) =>
                setupdate({ ...update, lastName: e.target.value })
              }
            />
            <button onClick={handleUpdate}>envoyer</button>
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
            <input
              type="text"
              onChange={(e) => setupdate({ ...update, email: e.target.value })}
            />

            <button onClick={handleUpdate}>envoyer</button>
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
            <input
              type="text"
              onChange={(e) => setupdate({ ...update, phone: e.target.value })}
            />

            <button onClick={handleUpdate}>envoyer</button>
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
              type="text"
              onChange={(e) => setUpdatePass(e.target.value)}
            />

            <button onClick={handleUpdate}>envoyer</button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Setting;

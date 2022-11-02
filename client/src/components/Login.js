import React, { useState } from "react";
import "./Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/slices/userSlice";
const Login = () => {
  const isAuth = localStorage.getItem("token");
  const navigate = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  return (
    <div className="loginWrap">
      {isAuth ? (
        setTimeout(() => {
          navigate("/");
        }, 100)
      ) : (
        <div className="loginForm">
          <img src="./img/logo_bmes.svg" alt="" className="logoBmes"></img>
          <h4>Merci d'entrer vous informations de connexion</h4>
          <div className="formInputs">
            <p>Email:</p>
            <input
              type="text"
              className="formTextItem"
              placeholder="email@exmaple.com"
              onChange={(e) => setlogin({ ...login, email: e.target.value })}
            />
            <p>Mot de passe:</p>
            <input
              type="password"
              className="formTextItem"
              placeholder="**************"
              onChange={(e) => setlogin({ ...login, password: e.target.value })}
            />
            <p>Mot de passe oublié ?</p>
          </div>
          <button
            className="loginBtn"
            onClick={() => {
              dispatch(userLogin(login));

              setTimeout(() => {
                navigate("/");
              }, 1000);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            Connecter
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;

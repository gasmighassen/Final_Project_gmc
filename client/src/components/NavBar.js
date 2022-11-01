import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userCurrent, logout } from "../redux/slices/userSlice";
import "./Styles/Navbar.css";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(userCurrent());
    }
  }, [dispatch, isAuth]);
  return (
    <div className="navBar">
      <div className="logoContainer">
        <img className="homeLogo" src="./img/logo_bmes2.png" alt="logo" />
      </div>

      <div className="navItems">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="actions">
        {isAuth ? (
          <>
            <button
              onClick={() => {
                navigate("/projects");
              }}
              className="signn"
            >
              Profil
            </button>
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className="log-drop"
            >
              Logout
            </button>

            {user?.isAdmin ? (
              <button
                onClick={() => {
                  navigate("/dashbord");
                }}
                className="log-drop"
              >
                Dashboard
              </button>
            ) : null}
          </>
        ) : (
          <div className="sign-bt">
            <Link className="link" to="login">
              <button className="signnn">Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

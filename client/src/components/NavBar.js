import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userCurrent, logout } from "../redux/slices/userSlice";
import "./Styles/Navbar.css";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { BsTools } from "react-icons/bs";

import { GrUserAdmin } from "react-icons/gr";
import logo from "../assets/logo.png";

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
        <img className="homeLogo" src={logo} alt="logo" />
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
            <CgProfile
              onClick={() => {
                navigate("/projects");
              }}
              className="signn"
              
          /  >
         
            <AiOutlineLogout
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className="signn"
           / >
         

            {user?.isAdmin ? (
              <BsTools
                onClick={() => {
                  navigate("/dashbord");
                }}
                className="signn"
              />
           
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

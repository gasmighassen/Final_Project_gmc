import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Styles/SideBar.css";
import { AiOutlineSetting } from "react-icons/ai";
import { BiBorderAll } from "react-icons/bi";
import { BsFiles } from "react-icons/bs";
import { MdOutlineFeedback } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

const SideBar = ({ logo = "./img/logo.png" }) => {
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="sideBar">
      <div className="sideBarFlex">
        <div className="sideBarHeader">
          <img
            src={logo}
            alt="logo"
            className="logoSideBar"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <ul className="SideBarMenu">
          <li
            className="SideBarMenuItems"
            onClick={() => {
              navigate("/projects");
            }}
          >
            <BiBorderAll />
            Mes projets
          </li>
          <li
            className="SideBarMenuItems"
            onClick={() => {
              navigate(`/document/${user?._id}`);
            }}
          >
            <BsFiles />
            Mes Documents
          </li>

          <li
            className="SideBarMenuItems"
            onClick={() => {
              navigate(`/setting/${user?._id}`);
            }}
          >
            <AiOutlineSetting />
            Paramétres
          </li>
        </ul>
      </div>
      <div className="SideBarFooter">
        <hr />
        <p>{user.name}</p>
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          className="logoutBtn"
        >
          Deconnecter
        </button>
      </div>
    </div>
  );
};

export default SideBar;

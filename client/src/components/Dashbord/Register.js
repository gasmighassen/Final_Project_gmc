import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userRegister } from "../../redux/slices/userSlice";
import "../Styles/Register.css";
import SideBarAdmin from "./SideBarAdmin";

const Register = () => {
  const [user, setuser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: 0,
    isAdmin: false,
  });
  const users = useSelector((state) => state.user?.users);
  useEffect(() => {
    setuser({ ...users, _id: users?._id });
  }, [users]);
  const dispatch = useDispatch();

  return (
    <div className="profileLayout">
      <SideBarAdmin />
      <div className="projectsWrap">
        <div className="title">Registration</div>
        <div className="content">
          <div className="form" action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Nom</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required=""
                  onChange={(e) => setuser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="input-box">
                <span className="details">Prenom</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  required=""
                  onChange={(e) =>
                    setuser({ ...user, lastName: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  required=""
                  onChange={(e) => setuser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  required=""
                  onChange={(e) => setuser({ ...user, phone: e.target.value })}
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="text"
                  placeholder="Enter your password"
                  required=""
                  onChange={(e) =>
                    setuser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="serviceCheck">
              <span className="details">Administrateur</span>

              <input
                type="checkbox"
                value={user.isAdmin}
                name="service"
                onChange={(e) => setuser({ ...user, isAdmin: !user.isAdmin })}
              />
              <label>Rendre admin</label>
            </div>
          </div>
          <div className="button">
            <input
              type="submit"
              defaultValue="Register"
              onClick={() => {
                dispatch(userRegister(user));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

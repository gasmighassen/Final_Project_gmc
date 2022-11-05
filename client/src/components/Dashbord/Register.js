import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userRegister } from "../../redux/slices/userSlice";
import "../Styles/Register.css";
import SideBarAdmin from "./SideBarAdmin";

const Register = () => {
  const dispatch = useDispatch();
  const [ping, setPing] = useState(false);
  const [user, setuser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: Number,
    isAdmin: false,
  });

  useEffect(() => {
    setuser({
      ...user,
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: Number,
      isAdmin: false,
    });
  }, [ping]);

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
                  value={user.name}
                  required=""
                  onChange={(e) => setuser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="input-box">
                <span className="details">Prenom</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={user.lastName}
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
                  value={user.email}
                  placeholder="Enter your email"
                  required=""
                  onChange={(e) => setuser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  value={user.phone}
                  placeholder="+216-000-000"
                  required=""
                  onChange={(e) => setuser({ ...user, phone: e.target.value })}
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={user.password}
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
                setPing(!ping);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

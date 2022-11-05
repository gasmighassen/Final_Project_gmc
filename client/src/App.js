import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./components/Login";
import UserProjects from "./Pages/UserProjects";
import Document from "./Pages/Document";
import Setting from "./Pages/Setting";

import { userCurrent, usersGet } from "./redux/slices/userSlice";
import { allProjects } from "./redux/slices/projectSlice";

import Main from "./Pages/Main";

import DashAdmin from "./components/Dashbord/DashAdmin";
import ProjectsList from "./components/Dashbord/ProjectsList";
import UsersList from "./components/Dashbord/UsersList";

import Register from "./components/Dashbord/Register";
import { allServices } from "./redux/slices/serviceSlice";
import ProjectProfile from "./components/Dashbord/ProjectProfile";
import FeedBack from "./Pages/FeedBack";
import Service from "./components/Service";

function App() {
  const dispatch = useDispatch();
  /* @userCurrent : get current user
@allServices : get all services 
@allProjects : get all projects
@userGet : get all users */
  useEffect(() => {
    dispatch(userCurrent());
    dispatch(allServices());
    dispatch(allProjects());
    dispatch(usersGet());
  }, [dispatch]);

  return (
    <>
      {/*@/: Route for home page 
   @login:------------Route for login page 
   @setting:----------Route for user setting page
   @document:---------Route for documents (contrat,facteur...)
   @projects:---------Route for user's projects list
   @feedback:---------Route for feedback list and form page 
   @dashbord:---------Route for dashbord admin isAdmin + isAuth verification verification required
   @allprojects:------Route for all projects liste isAdmin required
   @listeclients:-----Route for all users liste isAdmin required
   @projectprofil:----Route for a specific project
   @adduser:----------Route for registring new user isAdmin required
   */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/services" element={<Service />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/setting" element={<Setting />} />

          <Route path="/document/:id" element={<Document />} />

          <Route path="/projects" element={<UserProjects />} />

          <Route path="/feedbacks" element={<FeedBack />} />

          <Route path="/dashbord" element={<DashAdmin />} />

          <Route path="/allprojects" element={<ProjectsList />} />

          <Route path="/listeclients" element={<UsersList />} />

          <Route path="/projetprofil" element={<ProjectProfile />} />

          <Route path="/adduser" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

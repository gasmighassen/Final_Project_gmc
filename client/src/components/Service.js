import React from "react";
import "./Styles/service.css";
import { MdArchitecture } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import circles from "../assets/circles.svg";
import NavBar from "./NavBar";
const Service = () => {
  return (
    <>
      <div className="n-service" id="services">
        <h1 className="title">Nos Services</h1>
        <div className="line"></div>
        <p className="parag">
          {" "}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <div className="s-items">
          <div className="gm">
            <div className="head">
              <MdArchitecture className="icona" />
              <h1>Architecture</h1>
            </div>
            <div className="p-flex">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>

          <div className="gm">
            <div className="head">
              <FaImages className="icona" />
              <h1>Decoration Exterieur Interieur</h1>
            </div>
            <div className="p-flex">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>{" "}
          </div>

          <div className="gm">
            <div className="head">
              <BsBuilding className="icona" />
              <h1>Structure et Beton</h1>
            </div>
            <div className="p-flex">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
          <div className="gm">
            <div className="head">
              <FaTools className="icona" />
              <h1>Plomberie et Electrecité</h1>
            </div>
            <div className="p-flex">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
          <div className="gm">
            <div className="head">
              <BsPencilSquare className="icona" />
              <h1>Planning</h1>
            </div>
            <div className="p-flex">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;

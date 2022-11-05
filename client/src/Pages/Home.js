import React from "react";
import Loader from "../components/Loader";
import image from "../assets/download.jpg";
import  "../components/Styles/home.css"
import { AiOutlineArrowRight } from "react-icons/ai";
import Service from "../components/Service";

const Home = () => {
  return (
    <div className="home">
<div className="image-bg">
<div className="hero">
  <h1>

    Broad Vision<br></br>Honest Service <br></br>Great Value
  </h1>
  <p>Our goal then and now is to provide quality on time projects</p>
  <div className="grx">
  <button>Get Free Quote</button>
  <AiOutlineArrowRight className="arrow" />
</div>
</div>

</div>

    </div>
    
    
  );
};

export default Home;

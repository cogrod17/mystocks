import React from "react";
import { Link } from "react-router-dom";
import pic from "../images/landpage-pic.jpeg";
//import NavBar from "./NavBar";
// import LoginForm from "./LoginForm";
// import NewUserForm from "./NewUserForm";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <img className="landing-page-img" src={pic} alt={"landingPageImage"} />
      <div className="landing-page-content">
        <h1 className="landing-title">Up My Stock</h1>
        <br />
        <div className="landing-btns">
          <p
            onClick={() => (window.location.pathname = "/users/login")}
            className="landing-page-btn add"
          >
            Login
          </p>
          <p
            onClick={() => (window.location.pathname = "/users/create")}
            className="landing-page-btn add"
          >
            Create Account
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import history from "../history";
import pic from "../images/landpage-pic.jpeg";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-img-container">
        <img className="landing-page-img" src={pic} alt={"landingPageImage"} />
      </div>
      <div className="landing-page-content">
        <h1 className="landing-title">Up My Stock</h1>
        <br />
        <div className="landing-btns">
          <p
            onClick={() => history.push("/users/login")}
            className="landing-page-btn add"
          >
            Login
          </p>
          <p
            onClick={() => history.push("/users/create")}
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

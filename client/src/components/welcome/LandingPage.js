import React from "react";
import history from "../../history";
import Image from "./Image";

//redux
import { connect } from "react-redux";

const LandingPage = ({ token }) => {
  if (token) history.push("/home");

  return (
    <div className="landing-page">
      <Image />
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
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(LandingPage);

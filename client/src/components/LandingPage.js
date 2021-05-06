import React from "react";
import { Link } from "react-router-dom";
//import NavBar from "./NavBar";
// import LoginForm from "./LoginForm";
// import NewUserForm from "./NewUserForm";

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <br />
      <br />
      <div className="ui grid centered">
        <div className="four wide column">
          <Link to="/users/login">Login</Link>
        </div>
        <div className="four wide column">
          <Link to="/users/create">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

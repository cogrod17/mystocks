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
      <div>
        <Link to="/users/login">
          <p className="add">Login</p>
        </Link>
      </div>
      <div className="four wide column">
        <Link to="/users/create">
          <p className="add">Create Account</p>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

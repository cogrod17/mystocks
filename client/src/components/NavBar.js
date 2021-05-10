import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/home" className="btn">
        Home
      </Link>
      <Link to="/mystocks" className="btn">
        My Stocks
      </Link>
      <Link to="/search" className="btn">
        Search
      </Link>
      <Link to="/users/profile" className="btn">
        Profile
      </Link>
    </div>
  );
};

export default NavBar;

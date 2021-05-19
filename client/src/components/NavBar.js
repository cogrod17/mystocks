import React from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/home" className="btn home-btn">
        Home
      </Link>
      <Link to="/mystocks" className="btn my-stocks-btn">
        My Stocks
      </Link>
      <Link to="/search" className="btn search-btn">
        Search
      </Link>
      <Link to="/users/profile" className="btn profile-btn">
        Profile
      </Link>
      <LogoutBtn />
    </div>
  );
};

export default NavBar;

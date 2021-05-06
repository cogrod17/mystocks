import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/home" className="btn">
        Home
      </Link>
      <Link to="/watchlist" className="btn">
        WatchList
      </Link>
      <Link to="/users/profile" className="btn">
        Profile
      </Link>
    </div>
  );
};

export default NavBar;

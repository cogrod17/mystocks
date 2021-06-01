import React from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import "../../styles/NavBar.css";

///redux
import { connect } from "react-redux";

const NavBar = ({ token }) => {
  if (!token) return null;

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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(NavBar);

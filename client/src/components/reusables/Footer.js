import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

//redux
import { connect } from "react-redux";

const Footer = ({ token }) => {
  if (!token) {
    return (
      <div className="footer">
        <ul className="footer-ul">
          <li>
            <a href="https://github.com/cogrod17">Github</a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="footer">
      <ul className="footer-ul">
        <li>
          <Link to="/users/profile">Profile</Link>
        </li>
        <li>
          <a href="https://github.com/cogrod17/mystocks">Github</a>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Footer);

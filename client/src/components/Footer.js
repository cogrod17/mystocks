import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer-ul">
        <li>
          <Link to="/users/profile">Profile</Link>
        </li>
        <li>
          <a href="https://github.com/cogrod17">Github</a>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;

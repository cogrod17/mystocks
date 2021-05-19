import React, { useState } from "react";
import pic from "../images/landpage-pic.jpeg";
import axios from "axios";

import "../styles/formStyles.css";

const NewUserForm = ({ getUserInfo }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/users/create", {
        username: username,
        email: email,
        password: password,
      });

      const { user } = res.data;
      user.token = res.data.token;
      getUserInfo(user);
      window.location.pathname = "/users/profile";
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="landing-page">
      <img
        className="landing-page-img form-img"
        src={pic}
        alt={"landingPageImage"}
      />
      <div className="form-container landing">
        <h1>Create Profile</h1>
        <form onSubmit={onSubmit} className="form">
          <div className="form-box">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-box">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-box">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Password"
              required
            />
          </div>
          <button className="add">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;

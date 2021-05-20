import React, { useState } from "react";
import history from "../history";
import pic from "../images/landpage-pic.jpeg";
import axios from "axios";

import "../styles/formStyles.css";

const NewUserForm = ({ getUserInfo }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/users/create", {
        username: username,
        email: email,
        password: password,
      });

      const { user } = res.data;

      history.push("/home");
      user.token = res.data.token;
      getUserInfo(user);
    } catch (e) {
      console.log(e);
      setErrorMsg(
        "Could not create account. Is your password at least 7 characters?"
      );
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page-img-container">
        <img
          className="landing-page-img form-img"
          src={pic}
          alt={"landingPageImage"}
        />
      </div>
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
          <p>{errorMsg}</p>
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;

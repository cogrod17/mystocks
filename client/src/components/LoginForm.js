import React, { useState } from "react";
import axios from "axios";
import pic from "../images/landpage-pic.jpeg";
import "../styles/formStyles.css";

const LoginForm = ({ getUserInfo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/users/login", {
        email: email,
        password: password,
      });
      const { user, token } = res.data;

      await getUserInfo({ ...user, token });
      //this programmatically sends user to profile
      window.location.pathname = "/users/profile";
    } catch (e) {
      setErrorMessage("Incorrect username or password");
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
        <h1>Login</h1>
        <form onSubmit={onSubmit} className="form">
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
          <p>{errorMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

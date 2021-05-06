import React, { useState } from "react";
import axios from "axios";
import "../styles/formStyles.css";
import history from "../history";

const LoginForm = ({ getUserInfo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/users/login", {
        email: email,
        password: password,
      });
      const token = res.data.token;
      const user = res.data.user;
      await getUserInfo({ ...user, token });
      //this programmatically sends user to profile
      history.push("/users/profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-container">
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;

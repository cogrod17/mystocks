import React, { useState } from "react";
import axios from "axios";
import history from "../history";
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

      const { user, token } = res.data;
      await getUserInfo({ ...user, token });
      history.push("/users/profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-container">
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewUserForm;

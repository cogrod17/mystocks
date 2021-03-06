import React, { useState } from "react";
import history from "../../history";
import Image from "./Image";
import "../../styles/formStyles.css";

//redux
import { connect } from "react-redux";
import { createUser } from "../../actions";

const NewUserForm = ({ createUser, token }) => {
  if (token) history.push("/home");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    createUser(username, email, password);
  };

  return (
    <div className="landing-page">
      <Image />
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
              type="password"
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

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { createUser })(NewUserForm);

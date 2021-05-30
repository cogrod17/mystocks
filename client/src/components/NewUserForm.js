import React, { useState } from "react";
import history from "../history";
import pic from "../images/landpage-pic.jpeg";
import "../styles/formStyles.css";

//redux
import { connect } from "react-redux";
import { createUser } from "../actions";

const NewUserForm = ({ createUser, token, error }) => {
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
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button className="add">Submit</button>
          <p>{error && error.from === "create" ? error.msg : null}</p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { createUser })(NewUserForm);

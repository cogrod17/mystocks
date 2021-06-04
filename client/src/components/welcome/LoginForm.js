import React, { useState } from "react";
import history from "../../history";
import Image from "./Image";
import "../../styles/formStyles.css";

//redux
import { connect } from "react-redux";
import { logIn } from "../../actions";

const LoginForm = ({ logIn, token }) => {
  if (token) history.push("/home");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="landing-page">
      <Image />
      <div className="form-container landing">
        <h1>Login</h1>
        <form onSubmit={() => logIn(email, password)} className="form">
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
          <button
            onClick={(e) => {
              e.preventDefault();
              logIn(email, password);
            }}
            className="add"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logIn })(LoginForm);

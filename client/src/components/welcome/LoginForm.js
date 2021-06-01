import React, { useState } from "react";
import history from "../../history";
import pic from "../../images/landpage-pic.jpeg";
import "../../styles/formStyles.css";

//redux
import { connect } from "react-redux";
import { logIn } from "../../actions";

const LoginForm = ({ logIn, error, token }) => {
  if (token) history.push("/home");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <h1>Login</h1>
        <form onSubmit={logIn(email, password)} className="form">
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
          <p>{error && error.from === "login" ? error.msg : null}</p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logIn })(LoginForm);

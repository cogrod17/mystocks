import React from "react";
import "../../styles/formStyles.css";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { onUserUpdate } from "../../actions";

const renderError = ({ error, touched }) => {
  if (error && touched) {
    return <p style={{ padding: "0", margin: "0" }}>{error}</p>;
  }
};

const renderInput = ({ input, label, meta }) => {
  return (
    <div className="form-box">
      <input {...input} autoComplete="off" type="text" />
      <label>{label}</label>
      {renderError(meta)}
    </div>
  );
};

const UpdateProfile = ({ onUserUpdate, handleSubmit }) => {
  const onUpdate = (formValues) => {
    onUserUpdate(formValues);
  };

  return (
    <div className="form-container">
      <h1>Update profile</h1>
      <form onSubmit={handleSubmit(onUpdate)} className="form">
        <Field name="username" component={renderInput} label="New username" />
        <Field name="email" component={renderInput} label="New email" />
        <Field name="password" component={renderInput} label="New password" />
        <Field
          name="confirmPassword"
          component={renderInput}
          label="Confirm new password"
        />
        <button type="submit" className="add">
          Submit
        </button>
      </form>
    </div>
  );
};

const validate = (formValues) => {
  const { password, confirmPassword } = formValues;
  const error = {};

  if (password && password.length < 7)
    error.confirmPassword = "password must be at least 7 characters";

  if (password !== confirmPassword)
    error.confirmPassword = `passwords don't match`;

  if (password && !confirmPassword)
    error.confirmPassword = "confirm new password";

  return error;
};

const connectForm = reduxForm({ form: "update_form", validate })(UpdateProfile);

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { onUserUpdate })(connectForm);

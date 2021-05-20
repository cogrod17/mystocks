import React, { useState } from "react";

import history from "../history";
import axios from "axios";
import "../styles/formStyles.css";

const UpdateProfile = ({ userInfo, getUserInfo }) => {
  let [newUsername, setNewUsername] = useState(userInfo.username);
  let [newEmail, setNewEmail] = useState(userInfo.email);
  let [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [message, setMessage] = useState(null);

  const onUpdate = async (e) => {
    e.preventDefault();

    if (newUsername.length === 0) newUsername = userInfo.username;
    if (newEmail.length === 0) newEmail = userInfo.username;
    if (newPassword && newPassword.length === 0) newPassword = null;

    let sendUpdates = newPassword
      ? { username: newUsername, email: newEmail, password: newPassword }
      : { username: newUsername, email: newEmail };
    //AXIOS REQ HERE
    try {
      if (newPassword && newPassword < 7) throw new Error();
      if (newPassword !== confirmNewPassword) throw new Error();
      const res = await axios.patch(
        "http://localhost:3001/users/update",
        sendUpdates,
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      );

      getUserInfo(res.data);
      history.push("/users/profile");
    } catch (e) {
      console.log(e);
      setMessage("There was an error updating");
    }
  };

  return (
    <div className="form-container">
      <h1>Update profile</h1>
      <form onSubmit={onUpdate} className="form">
        <div className="form-box">
          <input onChange={(e) => setNewUsername(e.target.value)} type="text" />
          <label>New username</label>
        </div>
        <div className="form-box">
          <input onChange={(e) => setNewEmail(e.target.value)} type="text" />
          <label>New email</label>
        </div>
        <div className="form-box">
          <input
            onChange={(e) => {
              if (e.target.value.length === 0) setNewPassword(null);
              setNewPassword(e.target.value);
            }}
            type="text"
          />
          <label>New password (must be 7 characters)</label>
        </div>
        <div className="form-box">
          <input
            onChange={(e) => {
              if (e.target.value.length === 0) setConfirmNewPassword(null);
              setConfirmNewPassword(e.target.value);
            }}
            type="text"
          />
          <label>Confirm new password</label>
        </div>
        <p onClick={onUpdate} className="add">
          Submit
        </p>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default UpdateProfile;

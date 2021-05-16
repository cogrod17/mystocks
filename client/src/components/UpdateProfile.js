import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
//import Form from "./Form";
import history from "../history";
import axios from "axios";
import "../styles/formStyles.css";

const UpdateProfile = ({ userInfo, getUserInfo }) => {
  const [newUsername, setNewUsername] = useState(userInfo.username);
  const [newEmail, setNewEmail] = useState(userInfo.email);

  const onUpdate = async (e) => {
    e.preventDefault();
    console.log(newUsername);
    console.log(newEmail);
    //AXIOS REQ HERE
    try {
      const res = await axios.patch(
        "http://localhost:3001/users/update",
        { username: newUsername, email: newEmail },
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      );
      console.log(res.data);
      getUserInfo(res.data);
      history.push("/users/profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="form-container">
        <form onSubmit={onUpdate} className="form">
          <div className="form-box">
            <input
              onChange={(e) => setNewUsername(e.target.value)}
              type="text"
              placeholder={`${userInfo.username}`}
            />
          </div>
          <div className="form-box">
            <input
              onChange={(e) => setNewEmail(e.target.value)}
              type="text"
              placeholder={`${userInfo.email}`}
            />
          </div>
          <p className="add">Submit</p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;

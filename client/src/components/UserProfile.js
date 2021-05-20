import React, { useState } from "react";
import Modal from "./Modal";
import history from "../history";
import axios from "axios";
import pic from "../images/MiamiSkyline.jpeg";

const UserProfile = ({ userInfo, getUserInfo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const deleteAccount = async () => {
    try {
      await axios.delete("http://localhost:3001/users/profile", {
        headers: { Authorization: "Bearer " + userInfo.token },
      });

      localStorage.clear();
      window.location.pathname = "/";
      getUserInfo();
    } catch (e) {
      console.log(e + "error in catch");
    }
  };

  return (
    <div className="user-profile">
      <Modal
        message={"Delete Account?"}
        type={["confirm", "delete"]}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        action={deleteAccount}
      />
      <div className="profile-content">
        <div className="profile-info">
          <h1>{userInfo.username}</h1>
          <h3>{userInfo.email}</h3>
        </div>
        <div className="profile-btns">
          <p
            className="add profile-add "
            onClick={() => history.push("/users/update")}
          >
            Edit Profile
          </p>
          <br />
          <p className="add profile-add" onClick={() => setModalOpen(true)}>
            Delete Account
          </p>
        </div>
      </div>
      <div className="profile-pic"></div>
      <div className="user-profile-img">
        <img
          className="profile-background-img"
          src={pic}
          alt={"profile-background"}
        />
      </div>
    </div>
  );
};

export default UserProfile;

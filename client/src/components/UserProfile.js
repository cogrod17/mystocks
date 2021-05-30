import React, { useState } from "react";
import ProfilePic from "./ProfilePic";
import Modal from "./Modal";
import history from "../history";
import axios from "axios";
import pic from "../images/skyline.jpg";

//redux
import { connect } from "react-redux";
import { getUserInfo } from "../actions";

const UserProfile = ({ user, getUserInfo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const deleteAccount = async () => {
    await axios.delete("http://localhost:3001/users/profile", {
      headers: { Authorization: "Bearer " + user.token },
    });

    localStorage.clear();
    window.location.pathname = "/";
    getUserInfo();
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
          <h1>{user.username}</h1>
          <h3>{user.email}</h3>
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
      <ProfilePic userInfo={user} />
      <div className="profile-background-img-container">
        <img
          className="profile-background-img"
          src={pic}
          alt={"profile-background"}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { getUserInfo })(UserProfile);

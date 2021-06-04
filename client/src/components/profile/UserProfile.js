import React from "react";
import ProfilePic from "./ProfilePic";

import history from "../../history";
import pic1 from "../../images/skyline1.jpg";
import pic2 from "../../images/skyline2.jpg";
import pic3 from "../../images/skyline3.jpg";

//redux
import { connect } from "react-redux";
import { deleteAccount, openModal } from "../../actions";

const UserProfile = ({ user, deleteAccount, openModal }) => {
  let randomPic = () => {
    let hash = { 1: pic1, 2: pic2, 3: pic3 };
    return hash[Math.floor(Math.random() * 3) + 1];
  };

  return (
    <div className="user-profile">
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
          <p
            className="add profile-add"
            onClick={() =>
              openModal("Delete Account?", "delete", deleteAccount)
            }
          >
            Delete Account
          </p>
        </div>
      </div>
      <div className="profile-pic-container">
        <ProfilePic />
      </div>
      <div className="profile-background-img-container">
        <img
          className="profile-background-img"
          src={randomPic()}
          alt={"profile-background"}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { deleteAccount, openModal })(
  UserProfile
);

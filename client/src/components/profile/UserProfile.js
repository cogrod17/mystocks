import React, { useState } from "react";
import ProfilePic from "./ProfilePic";
import Modal from "../reusables/Modal";
import history from "../../history";
import pic from "../../images/skyline.jpg";

//redux
import { connect } from "react-redux";
import { deleteAccount } from "../../actions";

const UserProfile = ({ user, deleteAccount }) => {
  const [modalOpen, setModalOpen] = useState(false);

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
      <div className="profile-pic-container">
        <ProfilePic />
      </div>
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

export default connect(mapStateToProps, { deleteAccount })(UserProfile);

import React, { useState } from "react";
import Modal from "./Modal";
import NavBar from "./NavBar";
import Footer from "./Footer";

const UserProfile = ({ userInfo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="user-profile">
      <Modal onClose={() => setModalOpen(false)} modalOpen={modalOpen} />
      <NavBar />
      <h1>{userInfo.username}</h1>
      <p>{userInfo.favQuote}</p>
      <p>{userInfo.email}</p>
      <p>Sign Out</p>
      <button
        className="delete-button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Delete Account
      </button>

      <Footer />
    </div>
  );
};

export default UserProfile;

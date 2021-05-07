import React, { useState } from "react";
import Modal from "./Modal";
import NavBar from "./NavBar";
import Footer from "./Footer";
//import history from "../history";
import axios from "axios";

const UserProfile = ({ userInfo, getUserInfo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const deleteAccount = async () => {
    try {
      await axios.delete("http://localhost:3001/users/profile", {
        headers: { Authorization: "Bearer " + userInfo.token },
      });

      getUserInfo({});
      localStorage.removeItem("token");
      window.location.pathname = "/";
    } catch (e) {
      console.log(e + "error in catch");
    }
  };

  return (
    <div className="user-profile">
      <Modal
        onClose={() => setModalOpen(false)}
        modalOpen={modalOpen}
        deleteAccount={deleteAccount}
      />
      <NavBar />
      <h1>{userInfo.username}</h1>
      <p>{userInfo.favQuote}</p>
      <p>{userInfo.email}</p>
      <p>Sign Out</p>
      <button className="delete-button" onClick={() => setModalOpen(true)}>
        Delete Account
      </button>

      <Footer />
    </div>
  );
};

export default UserProfile;

import React from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";

const UserProfile = ({ userInfo }) => {
  return (
    <div className="user-profile">
      <NavBar />
      <h1>{userInfo.username}</h1>
      <p>{userInfo.favQuote}</p>
      <p>{userInfo.email}</p>
      <p>Sign Out</p>
      <p>Update Account</p>
      <p>Delete Account</p>
      <Footer />
    </div>
  );
};

export default UserProfile;

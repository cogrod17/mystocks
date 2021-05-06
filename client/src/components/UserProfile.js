import React from "react";
import NavBar from "./NavBar";

const UserProfile = ({ userInfo, getUserInfo }) => {
  /*
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(userInfo));
  });

  useEffect(() => {
    const user = localStorage.getItem("state");
    console.log(JSON.parse(user));
    if (user) getUserInfo(JSON.parse(user));
  }, []);
  */
  return (
    <div>
      <NavBar />
      <h1>{userInfo.username}</h1>
      <p>{userInfo.favQuote}</p>
      <p>{userInfo.email}</p>
    </div>
  );
};

export default UserProfile;

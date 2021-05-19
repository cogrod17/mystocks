import React, { useState } from "react";
import Modal from "./Modal";
import history from "../history";
import axios from "axios";

const UserProfile = ({ userInfo, getUserInfo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });

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

  const { x, y } = mouseLocation;
  return (
    <div onMouseMove={(e) => setMouseLocation({ x: e.clientX, y: e.clientY })}>
      <div className="crosshairs" style={{ left: x, top: y + 40 }}>
        {" "}
        mouse coords: {x} {y}
      </div>
      <div className="user-profile">
        <Modal
          message={"Delete Account?"}
          type={["confirm", "delete"]}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          action={deleteAccount}
        />
        <h1>
          mouse coords: {x} {y}
        </h1>
        <h1>{userInfo.username}</h1>
        <p>{userInfo.favQuote}</p>
        <p>{userInfo.email}</p>
        <p className="add" onClick={() => history.push("/users/update")}>
          Edit Profile
        </p>
        <p className="delete-button add" onClick={() => setModalOpen(true)}>
          Delete Account
        </p>
      </div>
    </div>
  );
};

export default UserProfile;

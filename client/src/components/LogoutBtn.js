import React, { useState } from "react";
import history from "../history";
import Modal from "./Modal";

const LogoutBtn = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <Modal
        message={"Logout?"}
        type={["confirm", "logout"]}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        action={onLogout}
      />
      <p onClick={() => setModalOpen(true)} className="add logout-icon">
        logout
      </p>
    </div>
  );
};

export default LogoutBtn;

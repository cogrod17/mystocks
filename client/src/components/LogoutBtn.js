import React, { useState } from "react";
import Modal from "./Modal";

//redux
import { connect } from "react-redux";
import { onLogout } from "../actions";

const LogoutBtn = ({ onLogout }) => {
  const [modalOpen, setModalOpen] = useState(false);

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

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { onLogout })(LogoutBtn);

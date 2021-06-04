import React from "react";
import { connect } from "react-redux";
import { onLogout, openModal } from "../../actions";

const LogoutBtn = ({ onLogout, openModal }) => {
  return (
    <div>
      <p
        onClick={() => {
          openModal("Logout?", "Logout", onLogout);
        }}
        className="add logout-icon"
      >
        logout
      </p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { onLogout, openModal })(LogoutBtn);

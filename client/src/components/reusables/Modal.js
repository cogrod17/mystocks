import React from "react";

import { connect } from "react-redux";
import { closeModal } from "../../actions";

const Modal = ({ modal, closeModal }) => {
  if (!modal) return null;

  const { message, type, action } = modal;

  const btn = (text) => {
    let border = text === "okay" ? "cyan solid 1px" : "none";
    return (
      <p
        onClick={closeModal}
        style={{ border }}
        className="add modal-cancel-btn"
      >
        {text}
      </p>
    );
  };

  const renderType = () => {
    if (type === "notice") {
      return <div className="modal-actions">{btn(`okay`)}</div>;
    }

    if (type !== "notice") {
      return (
        <div className="modal-actions">
          <p
            onClick={() => {
              action();
              closeModal();
            }}
            className="add modal-delete-btn"
          >
            {type}
          </p>
          {btn(`cancel`)}
        </div>
      );
    }
  };

  return (
    <div className="modal-dimmer">
      <div className="modal">
        <h1 className="modal-header">{message}</h1>
        {renderType()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal })(Modal);

/*
 const renderType = () => {
    if (type[0] === "confirm") {
      return (
        <div className="modal-actions">
          <p onClick={action} className="add modal-delete-btn">
            {type[1]}
          </p>
          <p
            onClick={() => setModalOpen(false)}
            className="add modal-cancel-btn"
          >
            cancel
          </p>
        </div>
      );
    }

    if (type[0] === "notice" || type[0] === "error") {
      return (
        <div className="modal-actions">
          <p
            style={{ border: "cyan solid 1px" }}
            onClick={() => setModalOpen(false)}
            className="add modal-cancel-btn"
          >
            Okay
          </p>
        </div>
      );
    }
  };

  

*/

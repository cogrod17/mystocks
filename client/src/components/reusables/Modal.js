import React from "react";

const Modal = ({ modalOpen, setModalOpen, action, message, type }) => {
  if (!modalOpen) return null;

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

    if (type[0] === "notice") {
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

  return (
    <div className="modal-dimmer">
      <div className="modal">
        <h1 className="modal-header">{message}</h1>
        {renderType()}
      </div>
    </div>
  );
};

export default Modal;

import React from "react";

//import ReactDOM from "react-dom";

//const modalRoot = document.querySelector("#modal");

const Modal = ({ modalOpen, onClose, deleteAccount }) => {
  if (!modalOpen) return null;

  return (
    <div className="ui dimmer modals active">
      <div className="ui modal active">
        <h1 className="header">Delete Account?</h1>
        <div className="actions">
          <button onClick={deleteAccount} className="ui inverted red button">
            Delete
          </button>
          <button onClick={onClose} className="floated right ui button cancel">
            Cancel
          </button>
        </div>
      </div>
      {/* <div className="ui modal active">
        <div className="header">
          Are you sure you want to delete your account?
        </div>
        <div className="actions">
          <button className="ui inverted red button">Delete</button>
          <button onClick={onClose} className="ui button cancel">
            Cancel
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Modal;

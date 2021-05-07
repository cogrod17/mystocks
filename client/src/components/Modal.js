import React from "react";
//import ReactDOM from "react-dom";

//const modalRoot = document.querySelector("#modal");

const Modal = ({ modalOpen, onClose }) => {
  /*
  useEffect(() => {
    modalRoot.appendChild(ModalJSX);

    return modalRoot.removeChild(ModalJSX);
  }, []); //React Hook useEffect has a missing dependency:
  */
  if (!modalOpen) return null;

  return (
    <div className="ui dimmer modals visible active">
      <div className="ui standard modal visible active">
        <div>
          <button className="ui button primary">Delete</button>
          <button onClick={onClose} className="ui button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

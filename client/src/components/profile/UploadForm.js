import React from "react";

const UploadForm = ({ onUpload, setFile }) => {
  const onChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={onUpload}>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="file"
          name="file"
          className="profile-pic-input"
        />
        <button className="add" type="button" onClick={onUpload}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;

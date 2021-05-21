import React, { useState, useRef } from "react";
import axios from "axios";

const ProfilePic = ({ userInfo }) => {
  const [file, setFile] = useState(null);
  const ref = useRef();

  const onChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onUpload = async (e) => {
    console.log(ref.current);

    const data = new FormData();
    await data.append("file", file);

    try {
      const res = await axios.post("http://localhost:3001/upload", data, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="profile-pic">
      <form ref={ref} onSubmit={onUpload}>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="file"
          name="file"
          className="profile-pic-input"
        />
        <button type="button" onClick={onUpload}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default ProfilePic;

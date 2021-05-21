import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePic = ({ userInfo }) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();

  // "/uploads/2021-05-21T14:35:04.941ZCole B. Ogrodnick.png"

  const onChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onUpload = async (e) => {
    const data = new FormData();
    await data.append("file", file);

    try {
      const res = await axios.post("http://localhost:3001/upload", data, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      console.log(res.data);
      //setImage(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let mounted = true;

    axios
      .get("http://localhost:3001/image", {
        headers: { Authorization: "Bearer " + userInfo.token },
      })
      .then((res) => {
        setImage(res.data);
      })
      .catch((e) => console.log(e));

    return () => (mounted = false);
  }, [userInfo.token]);

  if (image) {
    console.log(image);
    return (
      <div className="profile-pic">
        <img src={image} alt="profile pic" />
      </div>
    );
  }

  return (
    <div className="profile-pic">
      <form onSubmit={onUpload}>
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

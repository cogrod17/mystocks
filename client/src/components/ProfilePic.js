import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Modal from "./Modal";
import axios from "axios";

const ProfilePic = ({ userInfo }) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // "/uploads/2021-05-21T14:35:04.941ZCole B. Ogrodnick.png"

  const onChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async (e) => {
    setLoading(true);
    const data = new FormData();
    await data.append("file", file);

    try {
      const res = await axios.post("http://localhost:3001/upload", data, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });

      setImage(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (image || !userInfo.token) return;

    let mounted = true;
    console.log("running");
    axios
      .get("http://localhost:3001/image", {
        headers: { Authorization: "Bearer " + userInfo.token },
      })
      .then((res) => {
        if (mounted) {
          setImage(res.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [userInfo.token, image]);

  if (image) {
    return (
      <div className="profile-pic-container">
        <img className="profile-pic" src={image} alt="profile pic" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-pic-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-pic-container">
      <Modal
        message={"Cannot upload photo"}
        type={["notice"]}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
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

export default ProfilePic;

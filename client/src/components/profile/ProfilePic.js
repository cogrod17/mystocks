import React, { useState, useEffect } from "react";
import Loader from "../reusables/Loader";
import UploadForm from "./UploadForm";
import { server } from "../../api";

//redux
import { connect } from "react-redux";

const ProfilePic = ({ token }) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);

  const onUpload = async (e) => {
    setLoading(true);
    const data = new FormData();
    await data.append("file", file);

    try {
      const res = await server.post("/upload", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setImage(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setImage("none");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (image) return;
    let mounted = true;
    server
      .get("/image", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (mounted) {
          setImage(res.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        setImage("none");
        setLoading(false);
      });
  }, [token, image]);

  if (image === "none") {
    return <UploadForm setFile={setFile} onUpload={onUpload} />;
  }

  if (loading) return <Loader />;

  return (
    <img
      className="profile-pic"
      src={`data:image/png;base64,${image}`}
      alt="profile pic"
    />
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ProfilePic);

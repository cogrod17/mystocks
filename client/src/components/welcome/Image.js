import React from "react";
import pic from "../../images/landpage-pic.jpeg";

const Image = () => {
  return (
    <div className="landing-page-img-container">
      <img className="landing-page-img" src={pic} alt={"landingPageImage"} />
    </div>
  );
};

export default Image;

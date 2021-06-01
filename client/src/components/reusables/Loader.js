import React from "react";
import "../../styles/Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <span>↓</span>
      <span className="span-one">↓</span>
      <span className="span-two">↓</span>
      <span className="span-three">↓</span>
      <span className="span-four">↓</span>
    </div>
  );
};

export default Loader;

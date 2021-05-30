import React from "react";

const InfoSection = ({ title, info }) => {
  return (
    <div className="overview-section">
      <p className="overview-item overview-title">{title}:</p>
      <p className="overview-item overview-info">{info}</p>
    </div>
  );
};

export default InfoSection;

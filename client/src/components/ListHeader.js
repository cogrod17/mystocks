import React from "react";

const ListHeader = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div className="list-header">
        <p className="list-ticker">Ticker</p>
        <p className="list-price">Price</p>
        <p className="list-change">Change (%)</p>
      </div>
    </div>
  );
};

export default ListHeader;

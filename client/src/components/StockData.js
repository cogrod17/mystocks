import React from "react";

const StockData = ({ categories, data }) => {
  if (data && data.length === 0)
    return <p className="listitem">cannot get info</p>;

  return categories.map((item, i) => {
    let fontColor =
      item === "change" || item === "price" ? data.color : "white";

    return (
      <p key={i} className={`listitem ${item}`} style={{ color: fontColor }}>
        {data[categories[i]]}
      </p>
    );
  });
};
export default StockData;

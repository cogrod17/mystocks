import React from "react";

const StockItem = ({ categories }) => {
  const renderCategories = (categories) => {
    return categories.map((item) => {
      return <p className={`listitem ${item}`}>{item}</p>;
    });
  };

  return <div className="list-item">{renderCategories(categories)}</div>;
};

export default StockItem;

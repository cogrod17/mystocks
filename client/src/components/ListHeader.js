import React from "react";

const ListHeader = ({ title, categories }) => {
  const renderCategories = () => {
    return categories.map((category, i) => {
      return (
        <p key={i} className="listheader-category">
          {category}
        </p>
      );
    });
  };

  return (
    <div>
      <h1>{title}</h1>
      <div className="listheader">{renderCategories()}</div>
    </div>
  );
};

export default ListHeader;

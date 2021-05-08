import React from "react";

const Form = ({ title, fields }) => {
  const keys = Object.keys(fields);

  const renderFields = (fields) => {
    return keys.map((key) => {
      return (
        <div className="form-box" key={key}>
          <input type="text" placeholder={`${key}`} />
        </div>
      );
    });
  };

  return (
    <div className="form-container">
      <h1>{title}</h1>
      <form className="form">{renderFields(keys)}</form>
    </div>
  );
};

export default Form;

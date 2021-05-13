import React, { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="search">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <label>Search</label>
      </div>
    </form>
  );
};

export default SearchBar;

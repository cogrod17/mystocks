import React, { useState } from "react";
import "../../styles/SearchBar.css";

import { connect } from "react-redux";
import { onSearch } from "../../actions";

const SearchBar = (props) => {
  const { onSearch } = props;
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

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { onSearch })(SearchBar);

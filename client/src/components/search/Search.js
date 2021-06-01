import React from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = () => {
  return (
    <div className="search-container">
      <SearchBar />
      <SearchResults />
    </div>
  );
};

export default Search;

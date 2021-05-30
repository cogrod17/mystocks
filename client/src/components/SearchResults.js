import React from "react";
import Loader from "./Loader";

import { connect } from "react-redux";
import { selectStock } from "../actions";

const SearchResults = ({ selectStock, searchResults }) => {
  if (!searchResults) return null;
  if (searchResults === "loading") return <Loader />;
  if (searchResults === ["error"])
    return <div>Could not find anything for you</div>;

  return searchResults.map((item, i) => {
    return (
      <div
        key={i}
        onClick={() => selectStock(item["1. symbol"])}
        className="list-item results-item"
      >
        <div>
          <p className="listitem results-symbol">{item["1. symbol"]}</p>
          <p className="listitem results">{item["2. name"]}</p>
        </div>
      </div>
    );
  });
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { selectStock })(SearchResults);

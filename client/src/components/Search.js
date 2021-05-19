import React, { useState } from "react";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
//import SearchResults from "./SearchResults";
import alphaVantage from "../api/alphaVantage";

//here["bestMatches"][0]["1. symbol"]

const Search = ({ viewStock }) => {
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);

  const onSearch = async (term) => {
    console.log("searching for " + term);
    setLoading(true);
    try {
      //AXIOS REQUEST HERE
      const results = await alphaVantage.get("/query?", {
        params: { function: "SYMBOL_SEARCH", keywords: term },
      });
      console.log(results.data.bestMatches);
      //console.log(results.data.bestMatches[0]["1. symbol"]);

      setResults(results.data.bestMatches);
      setLoading(false);
    } catch (e) {
      setResults(["error"]);
      setLoading(false);
    }
  };

  const renderResults = (results) => {
    if (!results) return;
    if (results[0] === "error")
      return <div>Could not find anything for you :(</div>;
    console.log("rendering results");
    return results.map((item, i) => {
      return (
        <div
          key={i}
          onClick={() => viewStock(item["1. symbol"])}
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

  return (
    <div className="search-container">
      <SearchBar onSearch={onSearch} />
      {loading ? <Loader /> : renderResults(results)}
    </div>
  );
};

export default Search;

import React from "react";
import NavBar from "./NavBar";
// import Loader from "./Loader";

//Alpha Vantage
//const API_KEY = `9VTUD3XE4HKHNVBM`;

const MyStocks = () => {
  return (
    <div>
      <NavBar />
      <h1>My Stocks</h1>
      <div className="watchlist-container">
        <div className="header"></div>
      </div>
    </div>
  );
};

export default MyStocks;
